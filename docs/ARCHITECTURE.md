# Test Engine Architecture

Comprehensive guide to Test Engine's structure, design patterns, and technical decisions.

---

## 🏗️ System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Test Engine Monorepo (pnpm)                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐   ┌──────────────┐   ┌────────────────────┐  │
│  │ mid/         │   │ senior/      │   │ test-machine/      │  │
│  │              │   │              │   │                    │  │
│  │ Challenges   │   │ Challenges   │   │ ┌────────────────┐ │  │
│  │ (Learn)      │   │ (Learn)      │   │ │ backend/       │ │  │
│  │              │   │              │   │ │ (Express API)  │ │  │
│  └──────────────┘   └──────────────┘   │ └────────────────┘ │  │
│                                        │ ┌────────────────┐ │  │
│                                        │ │ frontend/      │ │  │
│                                        │ │ (React App)    │ │  │
│                                        │ └────────────────┘ │  │
│                                        └────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ libs/formular-atomos/ (Git Submodule)                   │  │
│  │ ┌──────────────────────────────────────────────────────┐│  │
│  │ │ @formular/atomos (Form Components)                  ││  │
│  │ │ @atomos/ui (UI Mocks)                              ││  │
│  │ └──────────────────────────────────────────────────────┘│  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📦 Monorepo Setup (pnpm Workspaces)

### Workspace Configuration

```yaml
# pnpm-workspace.yaml
packages:
  - 'mid'
  - 'senior'
  - 'test-machine/frontend'
  - 'test-machine/backend'
  - 'libs/formular-atomos'
  - 'libs/formular-atomos/packages/*'
```

### Benefits of This Structure

| Benefit | Explanation |
|---------|-------------|
| **Single Lock File** | One pnpm-lock.yaml for all packages |
| **Shared Dependencies** | Dependencies installed once at root |
| **Cross-Package References** | Use `workspace:*` protocol |
| **Easy Testing** | Test multiple packages simultaneously |
| **Consistent Versions** | All packages use same versions |

### Working with Workspaces

```bash
# Install all dependencies
pnpm install

# Run scripts in all workspaces
pnpm -r dev                    # Run dev in each package
pnpm -r build                  # Build all packages
pnpm -r lint                   # Lint all packages
pnpm -r test                   # Test all packages

# Run script in specific workspace
pnpm --filter test-engine-frontend dev
pnpm --filter test-engine-backend test

# Add dependency to specific package
pnpm add -F @package lodash

# Link to another package
pnpm add -F @package @formular/atomos@workspace:*
```

---

## 📚 Learning Modules (mid/ & senior/)

### Directory Structure

```
mid/                          # or senior/
├── src/
│   ├── challenges/
│   │   └── [number]-[topic]/
│   │       ├── README.md      # Theory + exam tips
│   │       ├── Challenge.tsx  # TODO: implement
│   │       └── Solution.tsx   # Reference implementation
│   ├── App.tsx
│   ├── main.tsx
│   └── app.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Challenge Files Pattern

**Challenge.tsx Structure:**
```tsx
// Contains:
// - Component stub
// - TODO comments for implementation
// - Type hints (interfaces/types)
// - Test cases in comments

export function ChallengeComponent() {
  // TODO: Implement feature X
  // TODO: Handle error case Y
  
  return null;
}
```

**Solution.tsx Structure:**
```tsx
// Contains:
// - Complete implementation
// - Error handling
// - Edge cases covered
// - Production-ready code
// - TypeScript types defined

export function ChallengeComponent() {
  // Full implementation with:
  // - Proper state management
  // - Error handling
  // - Accessibility
  // - Performance optimization
}
```

**README.md Structure:**
```markdown
# Topic Name

## Key Concepts
- Concept 1
- Concept 2

## Common Pitfalls
- Mistake 1
- Mistake 2

## Exam Tips
- Tip 1
- Tip 2

## Resources
- Links to React docs
```

### Development Tools

```bash
cd mid  # or senior

# Development
pnpm dev            # Vite dev server (http://localhost:5173)

# Building
pnpm build          # Production build
pnpm preview        # Preview production build

# Code Quality
pnpm lint           # Check for issues
pnpm type-check     # TypeScript validation
```

---

## 🔌 Backend Architecture (test-machine/backend)

### Design Pattern: Clean Architecture

```
┌─────────────────────────────────────────┐
│  HTTP Handlers (API Routes)             │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│  Application Layer (Use Cases/Services) │
│  - Business Logic                       │
│  - Orchestration                        │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│  Domain Layer (Entities/Models)         │
│  - Core business rules                  │
│  - Data models                          │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│  Infrastructure Layer                   │
│  - Database                             │
│  - External services                    │
│  - Configuration                        │
└─────────────────────────────────────────┘
```

### Directory Structure

```
backend/src/
├── server.ts                 # App entry point
├── api/                      # Express route handlers
│   └── features/
│       └── [feature]/
│           ├── [feature].controller.ts
│           └── [feature].routes.ts
├── application/              # Business logic / use cases
│   └── services/
│       └── [feature]/
│           └── [feature].service.ts
├── domain/                   # Core entities
│   └── entities/
│       └── [feature].entity.ts
├── infrastructure/           # Database, config, external services
│   ├── database/
│   │   ├── migrations/       # Schema changes
│   │   ├── seeders/          # Test data
│   │   └── database.ts       # DB setup
│   ├── config/
│   │   └── env.ts
│   └── external/             # External APIs
├── middleware/               # Express middleware
├── utils/                    # Utilities
└── __tests__/                # Tests
    └── [feature].test.ts
```

### Request Flow

```
HTTP Request
    │
    ▼
Express Middleware (Auth, Validation, etc.)
    │
    ▼
Route Handler (Controller)
    │
    ▼
Service (Business Logic)
    │
    ▼
Database Query / External API
    │
    ▼
Response Formatting
    │
    ▼
HTTP Response
```

### Response Format (MANDATORY)

All API endpoints must return this exact format:

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Examples:
// Success: { success: true, data: { id: 1, name: "John" } }
// Error:   { success: false, error: "User not found" }
```

### Database Layer

**Technologies:**
- SQLite with sql.js
- Schema migrations (TypeScript-based)
- Data seeders for test data

**Database Commands:**
```bash
# Run migrations
pnpm run migrate

# Seed test data
pnpm run seed

# Both (typical setup)
pnpm run migrate && pnpm run seed
```

**Migration Pattern:**
```typescript
// migrations/001_create_users_table.ts
export async function up(db: Database) {
  await db.run(`
    CREATE TABLE users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function down(db: Database) {
  await db.run('DROP TABLE users');
}
```

### Testing Backend

```bash
cd test-machine/backend

# Run all tests
pnpm test

# Watch mode
pnpm test -- --watch

# Single test file
pnpm test auth.service.test.ts

# Coverage report
pnpm test -- --coverage
```

**Test Pattern:**
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { UserService } from '../services/user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  it('should create a new user', async () => {
    const user = await service.createUser({
      email: 'test@example.com',
      name: 'Test User'
    });
    
    expect(user.id).toBeDefined();
    expect(user.email).toBe('test@example.com');
  });
});
```

---

## ⚛️ Frontend Architecture (test-machine/frontend)

### Design Pattern: Feature Slice Pattern + Redux-Saga

```
┌─────────────────────────────────────────┐
│  React Components (UI Layer)            │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│  Redux (State Management)               │
│  - Slices (reducers + actions)          │
│  - Selectors (state queries)            │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│  Redux-Saga (Side Effects)              │
│  - API calls                            │
│  - Async operations                     │
│  - Orchestration                        │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│  API Layer (HTTP Client)                │
│  - API calls wrapped in sagas           │
│  - Typed requests/responses             │
└─────────────────────────────────────────┘
```

### Directory Structure

```
frontend/src/
├── features/                 # Feature modules
│   └── [feature]/
│       ├── components/       # Feature-specific components
│       │   ├── [Feature]List.tsx
│       │   ├── [Feature]Form.tsx
│       │   └── index.ts
│       ├── store/            # Redux + Saga
│       │   ├── [feature].slice.ts    # Actions + Reducers
│       │   ├── [feature].saga.ts     # Side effects
│       │   └── index.ts
│       ├── api/              # API communication
│       │   ├── [feature].api.ts
│       │   └── types.ts
│       └── index.ts          # Barrel export
├── shared/                   # Shared utilities
│   ├── components/           # Shared components
│   ├── hooks/                # Custom hooks
│   ├── types/                # Global types
│   └── utils/                # Utilities
├── store/                    # Redux setup
│   ├── store.ts              # Store configuration
│   ├── sagas.ts              # Root saga
│   └── types.ts              # Redux types
├── App.tsx                   # Main component
└── main.tsx                  # Entry point
```

### Redux + Saga Pattern

**1. Create Slice (State + Actions):**

```typescript
// features/users/store/users.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Actions triggered by components
    fetchUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Saga will dispatch these
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    
    fetchUsersError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersError } = usersSlice.actions;
export default usersSlice.reducer;
```

**2. Create Saga (Side Effects):**

```typescript
// features/users/store/users.saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import * as usersApi from '../api/users.api';
import { 
  fetchUsersStart, 
  fetchUsersSuccess, 
  fetchUsersError 
} from './users.slice';

function* fetchUsersSaga() {
  try {
    const data = yield call(usersApi.fetchUsers);
    yield put(fetchUsersSuccess(data));
  } catch (error) {
    yield put(fetchUsersError(error.message));
  }
}

export function* usersSaga() {
  yield takeEvery(fetchUsersStart.type, fetchUsersSaga);
}
```

**3. Create API (HTTP Calls):**

```typescript
// features/users/api/users.api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

interface User {
  id: string;
  name: string;
  email: string;
}

export async function fetchUsers(): Promise<User[]> {
  const response = await axios.get(`${API_URL}/users`);
  if (!response.data.success) {
    throw new Error(response.data.error);
  }
  return response.data.data;
}
```

**4. Use in Component:**

```typescript
// features/users/components/UsersList.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersStart } from '../store/users.slice';

export function UsersList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsersStart());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {items.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Selector Pattern

```typescript
// features/users/store/users.selectors.ts
import { RootState } from '../../../store/store';

export const selectUsers = (state: RootState) => state.users.items;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersError = (state: RootState) => state.users.error;

// Usage in component
const users = useSelector(selectUsers);
const loading = useSelector(selectUsersLoading);
const error = useSelector(selectUsersError);
```

### Store Configuration

```typescript
// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import usersReducer from '../features/users/store/users.slice';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    users: usersReducer,
    // ... more reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Component Best Practices

```typescript
// ✅ Good: Functional component with hooks
export function UserForm() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createUserStart(name));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button type="submit">Create</button>
    </form>
  );
}

// ❌ Bad: Class component
class UserForm extends Component {
  // ...
}

// ❌ Bad: Direct API call
function UserForm() {
  const handleSubmit = () => {
    fetch('/api/users').then(...);  // ❌ NO!
  };
}
```

---

## 🔗 Git Submodule Integration

### Formular Atomos Submodule

Located at: `libs/formular-atomos/`

**Structure:**
```
libs/formular-atomos/
├── packages/
│   └── atomos-ui-mock/        # @atomos/ui package
├── src/
│   ├── index.ts               # @formular/atomos main
│   └── mocks/
│       ├── atomos-ui.tsx      # Mock UI components
│       └── formular-dev.ts    # Mock formular.dev
├── pnpm-workspace.yaml
└── package.json
```

**Exported Packages:**
- `@formular/atomos` — Main form components library
- `@atomos/ui` — UI component mocks

**Reference in Frontend:**
```typescript
// package.json
{
  "dependencies": {
    "@formular/atomos": "workspace:*",
    "@atomos/ui": "workspace:*"
  }
}

// vite.config.ts - Mock paths
resolve: {
  alias: {
    '@atomos/ui': resolve(__dirname, '../../libs/formular-atomos/src/mocks/atomos-ui.tsx'),
    'formular.dev': resolve(__dirname, '../../libs/formular-atomos/src/mocks/formular-dev.ts')
  }
}
```

### Updating Submodule

```bash
# Clone with submodule
git clone --recurse-submodules <repo-url>

# Update existing submodule
git submodule update --init --recursive

# Working in submodule
cd libs/formular-atomos
git pull origin main              # Get latest from submodule
git add package.json              # Make changes
git commit -m "Update version"
git push

# Back in main repo
cd ../..
git add libs/formular-atomos      # Point to new commit
git commit -m "Update submodule"
git push
```

---

## 📊 State Management Flow

### Complete Redux-Saga Lifecycle

```
1. User Interaction (Component)
   ↓
2. dispatch(action)
   ↓
3. Saga middleware intercepts
   ↓
4. Saga makes API call (via API layer)
   ↓
5. Success → put(successAction)
   or Error → put(errorAction)
   ↓
6. Reducer updates state
   ↓
7. Component re-renders with new state
```

### Data Flow Example

```
Component: <UsersList />
    ↓
useEffect(() => dispatch(fetchUsersStart()))
    ↓
Saga: intercepts fetchUsersStart
    ↓
Saga: yield call(usersApi.fetchUsers())
    ↓
API: axios.get('/api/users')
    ↓
Backend Response: { success: true, data: [...] }
    ↓
Saga: yield put(fetchUsersSuccess(data))
    ↓
Reducer: state.users.items = action.payload
    ↓
Component: useSelector(selectUsers) returns new data
    ↓
Component: re-renders with users list
```

---

## 🔐 Security Considerations

### Backend
- ✅ JWT authentication for endpoints
- ✅ Rate limiting on API routes
- ✅ Input validation with Zod
- ✅ Parameterized SQL queries (no raw SQL)
- ✅ CORS middleware configured
- ✅ Helmet.js for security headers

### Frontend
- ✅ TypeScript strict mode (type safety)
- ✅ Environment variables for API URLs
- ✅ Redux for centralized state
- ✅ No sensitive data in Redux (use secure storage)
- ✅ HTTPS in production

---

## 🚀 Deployment Considerations

### Backend
- Environment variables configuration
- Database migrations on deploy
- Health check endpoints
- Error monitoring
- Rate limiting

### Frontend
- Build optimization (code splitting)
- Environment configuration
- Asset optimization
- Performance monitoring
- Error tracking

---

## 📈 Performance Optimization

### Backend
- Query optimization
- Caching strategies
- Database indexing
- Connection pooling

### Frontend
- Code splitting with React.lazy
- Redux selector memoization
- Component memoization with React.memo
- Image optimization
- CSS-in-JS optimization

---

## 🧪 Testing Strategy

### Backend Tests
- Unit tests for services
- Integration tests for API routes
- Database tests with test fixtures
- Error handling tests

### Frontend Tests
- Component unit tests
- Saga tests
- Reducer tests
- API client tests
- Integration tests

---

## 📝 Code Style & Patterns

### TypeScript
- Strict mode enabled
- No `any` types
- Full type annotations
- Interfaces over types (for extension)

### Naming Conventions
- PascalCase: Components, Classes
- camelCase: Functions, Variables
- CONSTANT_CASE: Constants
- Feature names: lowercase with hyphens

### Folder Organization
- Group by feature, not by type
- Co-locate related files
- Use barrel exports (index.ts)
- Keep public API clear

---

## 🔄 Continuous Integration

Recommended checks:
```bash
pnpm lint              # ESLint
pnpm type-check        # TypeScript
pnpm test              # Unit tests
pnpm -r build          # Build all packages
```

All must pass before merge.

---

## 📚 References

- [Redux Documentation](https://redux.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Vite Documentation](https://vitejs.dev/)
