# Contributing to Test Engine

Thank you for your interest in contributing to Test Engine! This document provides detailed guidelines to ensure high-quality contributions.

## 📋 Before You Start

1. **Read the Rules** — Review [`.github/copilot-instructions.xml`](./.github/copilot-instructions.xml) thoroughly
2. **Set Up Environment** — Follow [Quick Start](#quick-start) in README.md
3. **Understand Project Structure** — Familiarize yourself with the monorepo layout
4. **Check Existing Issues** — Avoid duplicate work

## 🎯 Code Standards (ULTRA HIGH STRICT MODE)

All code must comply with **strict enforcement levels**:

### CRITICAL (Code Rejection Required)
- ❌ **JavaScript files** — TypeScript only
- ❌ **Direct API calls in components** — Must use Redux + Saga
- ❌ **Class components** — Functional components only
- ❌ **Incorrect response format** — Must match `{ success, data?, error? }`
- ❌ **Raw SQL queries** — Always use prepared statements

### HIGH (Code Review Required)
- ❌ Missing type definitions (no `any` types)
- ❌ Reducers with side effects
- ❌ Missing error handling
- ❌ Broken file structure
- ❌ ESLint warnings or errors

### MEDIUM (Should Be Fixed)
- ⚠️ Functions exceeding 50 lines
- ⚠️ Components exceeding 300 lines
- ⚠️ Complex logic without comments

### LOW (Optional)
- 💡 Naming improvements
- 💡 Code clarity suggestions

## 🏗️ Adding New Features

### For Mid/Senior Level Challenges

```bash
# 1. Create challenge directory
mkdir -p mid/src/challenges/[number]-[topic-name]/

# 2. Create required files
touch README.md Challenge.tsx Solution.tsx

# 3. Update root README with link
# Edit: README.md → add row to topic table
```

#### File Structure

**README.md** — Theory and exam tips
```markdown
# [Topic Name]

## Key Concepts
- Concept 1: explanation
- Concept 2: explanation

## Common Pitfalls
- Pitfall 1
- Pitfall 2

## Exam Tips
- Tip 1
- Tip 2
```

**Challenge.tsx** — Student tasks
```tsx
// TODO: Implement feature X
// TODO: Handle error case Y
```

**Solution.tsx** — Reference implementation
- Must be production-ready code
- Include proper error handling
- Add TypeScript types
- Use meaningful variable names

### For Backend Features

```bash
cd test-machine/backend

# Create feature structure
mkdir -p src/api/features/[feature-name]
mkdir -p src/domain/entities/[feature-name]
mkdir -p src/application/services/[feature-name]
mkdir -p src/__tests__/[feature-name]
```

**Required Files:**
- `api/features/[feature].routes.ts` — Express routes
- `domain/entities/[feature].ts` — Data models
- `application/services/[feature].service.ts` — Business logic
- `__tests__/[feature].service.test.ts` — Unit tests

### For Frontend Features

```bash
cd test-machine/frontend

# Create feature structure following Feature Slice Pattern
mkdir -p src/features/[feature-name]/{components,store,api}
```

**Required Files:**
```
src/features/[feature-name]/
├── components/
│   └── [Feature]Component.tsx
├── store/
│   ├── [feature].slice.ts      # Redux slice
│   └── [feature].saga.ts       # Side effects
├── api/
│   └── [feature].api.ts        # API calls
└── index.ts                    # Barrel export
```

**Redux Slice Pattern:**
```tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface [Feature]State {
  items: [];
  loading: boolean;
  error: string | null;
}

const initialState: [Feature]State = {
  items: [],
  loading: false,
  error: null,
};

const [feature]Slice = createSlice({
  name: '[feature]',
  initialState,
  reducers: {
    // Pure reducers only
  },
  extraReducers: (builder) => {
    // Handle async actions from saga
  },
});

export default [feature]Slice.reducer;
```

**Saga Pattern:**
```tsx
import { call, put, takeEvery } from 'redux-saga/effects';

function* [feature]Saga() {
  yield takeEvery('[feature]/fetch[Feature]', fetch[Feature]Saga);
}

function* fetch[Feature]Saga() {
  try {
    const data = yield call([feature]Api.fetch);
    yield put(slice.actions.fetchSuccess(data));
  } catch (error) {
    yield put(slice.actions.fetchError(error.message));
  }
}

export default [feature]Saga;
```

## ✅ Pre-Commit Checklist

Before pushing your code, ensure:

### TypeScript
```bash
pnpm type-check              # No type errors
tsc --noEmit                 # Strict mode passes
```

### Linting
```bash
pnpm lint                    # Zero ESLint warnings
pnpm lint -- --fix           # Auto-fix issues
```

### Testing
```bash
pnpm test                    # All tests pass
pnpm test:coverage           # Optional: check coverage
```

### For Backend Changes
```bash
cd test-machine/backend
pnpm test                    # Backend tests pass
pnpm lint                    # No linting issues
```

### For Frontend Changes
```bash
cd test-machine/frontend
pnpm lint                    # No linting issues
tsc --noEmit                 # Types correct
```

## 🔄 Git Workflow

### 1. Fork and Clone
```bash
git clone https://github.com/your-username/test-engine.git
cd test-engine
```

### 2. Create Feature Branch
```bash
# Use descriptive branch names
git checkout -b feature/add-new-challenge
git checkout -b fix/update-saga-pattern
git checkout -b docs/improve-readme
```

### 3. Commit Messages

Follow conventional commits:

```
feat: add new hook deep dive challenge
fix: correct response format in auth saga
docs: update contribution guidelines
refactor: simplify challenge component structure
test: add unit tests for user service
chore: update dependencies
```

### 4. Push and Create PR

```bash
git push origin feature/your-feature-name
```

**PR Description Template:**
```markdown
## Description
What does this PR do?

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Challenge addition

## Checklist
- [ ] TypeScript strict mode passes
- [ ] ESLint passes with zero warnings
- [ ] All tests pass
- [ ] Code follows ULTRA_HIGH strict mode rules
- [ ] Links in documentation are correct

## Related Issues
Closes #issue-number
```

## 🧪 Testing Requirements

### Backend Tests
```bash
# Write tests in __tests__ directories
# File naming: [feature].service.test.ts

import { describe, it, expect, beforeEach } from 'vitest';
import { [Feature]Service } from '../services';

describe('[Feature]Service', () => {
  it('should do something specific', () => {
    expect(true).toBe(true);
  });
});
```

### Frontend Tests (if applicable)
```bash
# Use React Testing Library
# Test user behavior, not implementation

import { render, screen } from '@testing-library/react';
import { [Component] } from './[Component]';

describe('[Component]', () => {
  it('should render correctly', () => {
    render(<[Component] />);
    expect(screen.getByText(/text/i)).toBeInTheDocument();
  });
});
```

## 📝 Documentation Standards

### Challenge README
- Clear problem statement
- Expected learning outcomes
- Common mistakes to avoid
- Exam-relevant tips
- Links to official React docs

### Code Comments
- Only for complex business logic
- Explain the WHY, not the WHAT
- Keep comments short and accurate

### Example:
```tsx
// ✅ Good: Explains purpose
// Memoizing selector prevents unnecessary re-renders
// when parent component updates but data hasn't changed
const selectUserName = (state) => state.user.name;

// ❌ Avoid: Obvious comments
// Get the user name
const selectUserName = (state) => state.user.name;
```

## 🚫 Common Mistakes to Avoid

### ❌ Mistakes
- Mixing business logic in components
- Direct fetch/axios calls outside sagas
- Untyped props/state
- Side effects in reducers
- Props drilling instead of Redux
- Hardcoded values
- `any` types anywhere
- Missing error handling
- Class components
- Committing to main branch

### ✅ Do Instead
- Use Redux + Saga for all async operations
- Keep components pure and presentational
- Define interfaces for everything
- Use pure reducers with Immer
- Use Redux + Saga for state management
- Use environment variables
- Strict TypeScript typing
- Wrap async in try-catch with error actions
- Use functional components with hooks
- Create feature branches and open PRs

## 📞 Questions?

- 📖 Read [README.md](README.md)
- 📋 Check [copilot-instructions.xml](./.github/copilot-instructions.xml)
- 🐛 Open a GitHub discussion
- 💬 Create an issue with detailed questions

## 🎉 Thank You!

Your contributions make Test Engine better for everyone learning React. We appreciate your effort and attention to code quality!
