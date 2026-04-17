# Getting Started with Test Engine

Welcome! This guide will help you set up and run Test Engine locally in minutes.

## ⏱️ 5-Minute Setup

### Step 1: Prerequisites

Check you have these installed:
```bash
# Check Node.js version (need ≥18.0.0)
node --version

# Check pnpm version (need ≥8.0.0)
pnpm --version

# If pnpm not installed:
npm install -g pnpm
```

### Step 2: Clone & Install

```bash
# Clone with submodule
git clone --recurse-submodules https://github.com/your-org/test-engine.git
cd test-engine

# Install all dependencies
pnpm install
```

### Step 3: Pick Your Path

**Just want to study React?**
```bash
cd mid      # or cd senior for senior-level
pnpm dev    # Opens http://localhost:5173
```

**Want to test full-stack app?**

Terminal 1:
```bash
cd test-machine/backend
pnpm dev    # API runs on http://localhost:3001
```

Terminal 2:
```bash
cd test-machine/frontend
pnpm dev    # App runs on http://localhost:5174
```

That's it! 🎉

---

## 📚 Study Mode: Mid vs Senior

### MID-Level (Great for Intermediate Developers)

Topics covered:
- Hooks (useState, useEffect, useRef, etc.)
- Component Patterns (Render Props, HOC, Compound)
- Performance (memo, useMemo, useCallback)
- Error Handling (Error Boundaries)
- Forms (Controlled/Uncontrolled)
- Context & State Management

**How to use:**
1. Open a topic (e.g., `01-hooks/README.md`)
2. Read the README to understand concepts
3. Open `Challenge.tsx` and implement TODOs
4. Check `Solution.tsx` to see reference implementation
5. Note what you missed and re-read relevant section

**Est. time per topic:** 30-60 minutes

### SENIOR-Level (For Advanced Developers)

Topics covered:
- React 19 Actions & Server Components
- Concurrent Features (useTransition, useDeferredValue)
- React Compiler & Auto-memoization
- Advanced Patterns & Accessibility
- Testing React Applications
- Refs & Error Handling

**How to use:**
Same as MID-level, but deeper concepts.

**Est. time per topic:** 60-90 minutes

---

## 🔧 Full Stack Setup: Test Machine

The test machine simulates a real-world React + Node.js environment.

### Architecture Overview

```
┌─────────────────────────┐
│   React Frontend        │
│  Redux + Redux-Saga     │
│  (Port 5174)            │
└────────────┬────────────┘
             │ HTTP/WebSocket
             ▼
┌─────────────────────────┐
│   Express Backend       │
│   SQLite Database       │
│  (Port 3001)            │
└─────────────────────────┘
```

### Backend Setup

**Prerequisites:**
- Node.js ≥ 18.0.0
- SQLite (usually comes with Node)

**Installation:**
```bash
cd test-machine/backend

# Install dependencies
pnpm install

# Set up database
pnpm run migrate         # Run migrations
pnpm run seed            # Seed sample data (optional)

# Run development server
pnpm dev                 # Runs on http://localhost:3001

# In another terminal, run tests
pnpm test                # Watch mode
```

**Database Commands:**
```bash
# Create new migration
pnpm run migrate -- --create users

# Seed database with test data
pnpm run seed

# Reset database (careful!)
pnpm run db:reset
```

**Project Structure:**
```
backend/
├── src/
│   ├── server.ts              # App entry point
│   ├── api/                   # Route handlers
│   ├── domain/                # Business entities
│   ├── application/           # Use cases/services
│   └── infrastructure/        # Database, config
│       ├── database/
│       │   ├── migrations/
│       │   └── seeders/
│       └── config/
├── package.json
└── vitest.config.ts
```

### Frontend Setup

**Prerequisites:**
- Node.js ≥ 18.0.0
- Backend running (optional, but recommended)

**Installation:**
```bash
cd test-machine/frontend

# Install dependencies
pnpm install

# Run development server
pnpm dev                 # Runs on http://localhost:5174

# In another terminal, check types
pnpm type-check

# Run linting
pnpm lint
```

**Project Structure:**
```
frontend/
├── src/
│   ├── features/           # Feature modules
│   │   └── [feature]/
│   │       ├── components/
│   │       ├── store/
│   │       │   ├── slice.ts
│   │       │   └── saga.ts
│   │       └── api/
│   ├── shared/             # Shared utilities
│   ├── store/              # Redux setup
│   └── App.tsx
├── package.json
└── vite.config.ts
```

**Redux State Management:**

The frontend uses Redux + Redux-Saga pattern:

```tsx
// Flow: Component → Action → Saga → API → Reducer → UI

// 1. Component dispatches action
dispatch(fetchUsers());

// 2. Saga intercepts and makes API call
function* fetchUsersSaga() {
  const data = yield call(api.getUsers);
  yield put(slice.actions.setUsers(data));
}

// 3. Reducer updates state
const slice = createSlice({
  reducers: {
    setUsers: (state, action) => {
      state.items = action.payload;
    }
  }
});

// 4. Component selects from Redux
const users = useSelector(selectUsers);
```

---

## 🚀 Running Tests

### Backend Tests
```bash
cd test-machine/backend

# Run all tests
pnpm test

# Watch mode (reruns on changes)
pnpm test

# Coverage report
pnpm test:coverage

# Single test file
pnpm test auth.service.test.ts
```

### Frontend Tests (if configured)
```bash
cd test-machine/frontend

# Run tests
pnpm test

# Watch mode
pnpm test -- --watch

# Coverage
pnpm test -- --coverage
```

---

## 🐛 Common Issues & Solutions

### Issue: Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5174`

**Solution:**
```bash
# Kill process using port
# Windows:
netstat -ano | findstr :5174
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5174
kill -9 <PID>

# Or change port in vite.config.ts:
export default defineConfig({
  server: {
    port: 5175  // Changed from 5174
  }
});
```

### Issue: Node Modules Conflicts

**Error:** Dependencies not found or version conflicts

**Solution:**
```bash
# Clear cache
pnpm store prune

# Remove node_modules
rm -rf node_modules

# Reinstall
pnpm install
```

### Issue: Submodule Not Loaded

**Error:** `libs/formular-atomos` is empty

**Solution:**
```bash
# Initialize and fetch submodule
git submodule update --init --recursive

# Or clone with submodule from start
git clone --recurse-submodules https://github.com/your-org/test-engine.git
```

### Issue: TypeScript Errors

**Error:** Type errors in IDE but code runs

**Solution:**
```bash
# Check strict mode compliance
pnpm type-check

# Validate whole project
pnpm -r type-check

# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Issue: ESLint Warnings

**Error:** ESLint shows errors but app runs

**Solution:**
```bash
# Check current issues
pnpm lint

# Auto-fix fixable issues
pnpm lint -- --fix

# Check specific file
pnpm lint src/App.tsx
```

---

## 📖 Understanding the Codebase

### MID vs SENIOR Topics

**MID-Level Challenges** (`mid/src/challenges/`)
- Foundation topics all React devs need
- Covers Hooks, Components, Performance
- Good for: 2-3 years of React experience

**SENIOR-Level Challenges** (`senior/src/challenges/`)
- Advanced React 19 features
- Concurrent rendering, Server Components
- Good for: 5+ years of React experience

### How Challenges Are Structured

Each challenge has:

1. **README.md**
   - Explains the concept
   - Shows common pitfalls
   - Links to official docs
   - Exam tips

2. **Challenge.tsx**
   - Starter code with TODOs
   - Student implements these
   - Tests your understanding

3. **Solution.tsx**
   - Reference implementation
   - Shows best practices
   - Use for learning, not copying

### File Naming Conventions

```
✅ Challenge.tsx     - Challenge component
✅ Solution.tsx      - Solution component
✅ useHook.ts        - Custom hook
✅ context.ts        - React Context
✅ slice.ts          - Redux slice
✅ saga.ts           - Redux-Saga
✅ api.ts            - API calls
✅ types.ts          - TypeScript types

❌ challenge.tsx     - Wrong casing
❌ mysolution.tsx    - Wrong naming
❌ COMPONENT.tsx     - Wrong casing
```

---

## 🎯 Learning Path

### Week 1: React Fundamentals (MID-Level)
- Mon: Hooks Deep Dive (01)
- Tue: Component Patterns (02)
- Wed: Performance (03)
- Thu: Error Handling (04)
- Fri: Review & practice

### Week 2: Advanced Topics (MID-Level)
- Mon: Forms (05)
- Tue: Context & State (06)
- Wed-Fri: Practice, review, Q&A

### Week 3-4: Senior Topics (SENIOR-Level)
- React 19 Actions
- Concurrent Features
- Server Components
- Compiler & Advanced Patterns
- Testing & Accessibility

---

## 💡 Tips for Success

### Study Tips
- ✅ Read README **before** looking at code
- ✅ Try Challenge **without** peeking at Solution
- ✅ Compare your solution to the reference
- ✅ Re-read Exam Tips at the end
- ✅ Practice under time pressure (105 min limit)

### Code Tips
- ✅ Use TypeScript strict mode
- ✅ Follow Redux + Saga pattern
- ✅ Keep components small (<300 lines)
- ✅ Use meaningful variable names
- ✅ Add comments for complex logic

### Testing Tips
- ✅ Write tests as you code
- ✅ Test behavior, not implementation
- ✅ Use React Testing Library for UI
- ✅ Use Vitest for unit tests
- ✅ Aim for >80% coverage

---

## 🔗 Useful Links

### Official Resources
- [React Documentation](https://react.dev)
- [Redux Documentation](https://redux.js.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tools
- [StackBlitz](https://stackblitz.com) - Quick testing
- [CodeSandbox](https://codesandbox.io) - Shareable code
- [VS Code](https://code.visualstudio.com/) - Editor

### Extensions (Recommended for VS Code)
- **ES7+ React/Redux/React-Native Snippets**
- **Thunder Client** or **REST Client** (API testing)
- **Tailwind CSS IntelliSense** (frontend)
- **Vitest** (testing)

---

## 🎓 Next Steps

1. **Pick a topic** — Start with MID-level
2. **Read & code** — Follow the challenge workflow
3. **Compare solutions** — Learn from the reference
4. **Practice** — Redo without looking at solution
5. **Join community** — Discuss learnings

---

## ❓ Need Help?

- 📖 Check [README.md](../README.md)
- 🤝 See [CONTRIBUTING.md](../CONTRIBUTING.md) for setup issues
- 📋 Review [Copilot Instructions](./.github/copilot-instructions.xml)
- 🐛 Open a GitHub issue with details
- 💬 Start a discussion for questions

Good luck! 🚀
