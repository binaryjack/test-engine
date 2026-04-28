# Test Engine — React Certification Prep Platform

> **Exam Format:** 40 multiple-choice questions + 105 minutes of coding challenges  
> **Levels:** Mid-Level React Developer | Senior React Developer  
> **Platform:** Full-stack React training and testing environment

A comprehensive monorepo containing React certification preparation materials, interactive coding challenges, and a complete testing machine with backend + frontend.

---

## 📋 Quick Start

### Prerequisites
- **Node.js** ≥ 18.0.0
- **pnpm** ≥ 8.0.0

### Installation

```bash
# Clone the repository with submodules
git clone https://github.com/your-org/test-engine.git
cd test-engine

# Install all dependencies (monorepo setup)
pnpm install

# Install submodule dependencies
cd libs/formular-atomos
pnpm install
cd ../..
```

### Running the Application

#### Certificate Prep (Self-Study)
```bash
# MID-level challenges
cd mid
pnpm dev  # Runs on http://localhost:5173

# SENIOR-level challenges  
cd senior
pnpm dev  # Runs on http://localhost:5174
```

#### Test Machine (Full Stack)
```bash
# Terminal 1: Backend (API server)
cd test-machine/backend
pnpm install
pnpm dev  # Runs on http://localhost:3001

# Terminal 2: Frontend (React app)
cd test-machine/frontend
pnpm install
pnpm dev  # Runs on http://localhost:5174
```

---

## 📁 Project Structure

```
test-engine/
├── mid/                          # Mid-level React certification prep
│   ├── src/challenges/
│   │   ├── 01-hooks/
│   │   ├── 02-component-patterns/
│   │   ├── 03-performance/
│   │   ├── 04-error-handling/
│   │   ├── 05-forms/
│   │   └── 06-context-state/
│   └── package.json
│
├── senior/                       # Senior-level React certification prep
│   ├── src/challenges/
│   │   ├── 01-react-19-actions/
│   │   ├── 02-concurrent-features/
│   │   ├── 03-server-components/
│   │   ├── 04-react-compiler/
│   │   ├── 05-advanced-patterns/
│   │   ├── 06-accessibility/
│   │   └── 07-testing/
│   └── package.json
│
├── test-machine/                 # Full-stack testing environment
│   ├── backend/                  # Node.js Express API
│   │   ├── src/
│   │   │   ├── server.ts
│   │   │   ├── api/              # API routes
│   │   │   ├── domain/           # Business logic
│   │   │   ├── application/      # Use cases
│   │   │   └── infrastructure/   # Database, config
│   │   ├── package.json
│   │   └── vitest.config.ts
│   │
│   └── frontend/                 # React 19 + Redux + Saga
│       ├── src/
│       │   ├── features/         # Feature-slice pattern
│       │   ├── shared/           # Shared utilities
│       │   ├── store/            # Redux store setup
│       │   └── App.tsx
│       └── package.json
│
├── libs/formular-atomos/         # Submodule: Form components library
│   ├── packages/
│   │   └── atomos-ui-mock/
│   └── pnpm-workspace.yaml
│
├── shared/                       # Shared templates for projects
├── scripts/                      # Utility scripts
├── pnpm-workspace.yaml           # Monorepo configuration
└── package.json
```

---

## 📚 How to Use This Kit

### Study Mode (Certification Prep)

1. **Read the README** for each topic — understand concepts before coding
2. **Open the Challenge** — implement the TODOs without looking at the solution  
3. **Check the Solution** — compare, note what you missed
4. **Re-read exam tips** at the bottom of each README

You can paste challenge/solution files directly into [StackBlitz](https://stackblitz.com) or a local Vite app.

### Test Machine Mode (Full Stack Testing)

The test machine provides a complete environment to practice real-world React development:

**Backend Features:**
- RESTful API with Express
- SQLite database with migrations
- JWT authentication
- WebSocket support via Socket.io
- Comprehensive error handling
- Rate limiting and validation

**Frontend Features:**
- React 19 with TypeScript
- Redux + Redux-Saga for state management
- Monaco Editor integration for code challenges
- Real-time updates via WebSocket
- Tailwind CSS for styling
- Form components from `@formular/atomos` library

---

## 🎯 MID-Level Topics

| # | Topic | Key Concepts |
|---|-------|--------------|
| 01 | [Hooks Deep Dive](./mid/src/challenges/01-hooks/README.md) | `useState`, `useEffect`, ```jsx useRef```, ```jsx useReducer```, `useContext`, ```jsx useMemo```, ```jsx useCallback``` |
| 02 | [Component Patterns](./mid/src/challenges/02-component-patterns/README.md) | Compound, Render Props, HOC, Controlled vs Uncontrolled |
| 03 | [Performance Optimization](./mid/src/challenges/03-performance/README.md) | `memo`, ```jsx useMemo```, ```jsx useCallback```, `lazy`, code splitting |
| 04 | [Error Handling](./mid/src/challenges/04-error-handling/README.md) | Error Boundaries, Suspense fallbacks |
| 05 | [Forms](./mid/src/challenges/05-forms/README.md) | Controlled, uncontrolled, validation patterns |
| 06 | [Context & State Management](./mid/src/challenges/06-context-state/README.md) | Context API, ```jsx useReducer```, state lifting |

---

## 🚀 SENIOR-Level Topics

| # | Topic | Key Concepts |
|---|-------|--------------|
| 01 | [React 19 Actions](./senior/src/challenges/01-react-19-actions/README.md) | `useActionState`, `useOptimistic`, form actions, `use()` |
| 02 | [Concurrent Features](./senior/src/challenges/02-concurrent-features/README.md) | `useTransition`, `useDeferredValue`, `Suspense` |
| 03 | [React Server Components](./senior/src/challenges/03-server-components/README.md) | RSC, server/client boundary, serialization |
| 04 | [React Compiler](./senior/src/challenges/04-react-compiler/README.md) | Auto-memoization, rules of React |
| 05 | [Advanced Patterns](./senior/src/challenges/05-advanced-patterns/README.md) | Compound components, action props, forwarding refs |
| 06 | [Accessibility](./senior/src/challenges/06-accessibility/README.md) | ARIA, keyboard nav, focus management |
| 07 | [Testing](./senior/src/challenges/07-testing/README.md) | Unit, integration, testing hooks |

---

## 🏗️ Architecture & Development

### Code Standards (ULTRA HIGH STRICT MODE)

This project enforces strict code quality standards. See [`.github/copilot-instructions.xml`](./.github/copilot-instructions.xml) for complete rules.

**Key Requirements:**
- ✅ **TypeScript Only** — No JavaScript files allowed
- ✅ **Feature Slice Pattern** — Exact directory structure
- ✅ **No Direct API Calls** — Always use Redux + Saga  
- ✅ **Functional Components Only** — No class components
- ✅ **Type Safety** — All props and state must be typed
- ✅ **Pure Functions** — Reducers have no side effects

### Backend Architecture

The backend follows **Clean Architecture** with Clear Separation of Concerns:

```
backend/src/
├── server.ts                 # App entry point
├── api/                      # HTTP route handlers
├── application/              # Business logic / use cases
├── domain/                   # Core business entities
└── infrastructure/           # Database, config, external services
    ├── database/
    │   ├── migrations/
    │   └── seeders/
    └── ...
```

**Database Setup:**
```bash
cd test-machine/backend

# Run migrations
pnpm run migrate

# Seed database
pnpm run seed
```

### Frontend Architecture

The frontend uses **Redux + Redux-Saga** with **Feature Slice Pattern**:

```
frontend/src/
├── features/                 # Feature-organized modules
│   └── [feature]/
│       ├── components/       # Feature components
│       ├── store/
│       │   ├── slice.ts      # Redux state
│       │   └── saga.ts       # Side effects
│       └── api/
│           └── api.ts        # API calls
├── shared/                   # Shared utilities & components
├── store/                    # Redux configuration
└── App.tsx
```

---

## 🧪 Testing

### Run Tests

```bash
# Backend tests
cd test-machine/backend
pnpm test                    # Watch mode
pnpm test:coverage           # With coverage

# Frontend tests (if configured)
cd test-machine/frontend
pnpm test
```

### Test Stack
- **Backend:** Vitest + Supertest
- **Frontend:** Vitest + React Testing Library

---

## 📦 Working with Monorepo & Submodules

### Monorepo Structure

This project uses **pnpm workspaces** for seamless package management across multiple packages:

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

**Install all dependencies:**
```bash
pnpm install  # Installs across all workspaces
```

### Formular Atomos Submodule

The `libs/formular-atomos` is a Git submodule containing form components:

**Update submodule:**
```bash
git submodule update --init --recursive
```

**Working within the submodule:**
```bash
cd libs/formular-atomos
pnpm install
pnpm dev      # Run demo
pnpm build    # Build packages
```

**Available packages:**
- `@formular/atomos` — Main form components library
- `@atomos/ui` — UI component mocks

---

## 🛠️ Available Scripts

### Root Level

```bash
pnpm install              # Install all dependencies
pnpm -r dev              # Run dev mode in all packages
pnpm -r build            # Build all packages
pnpm -r test             # Test all packages
pnpm -r lint             # Lint all packages
```

### Individual Packages

```bash
cd mid                    # or senior / test-machine/frontend / test-machine/backend
pnpm dev                 # Start dev server
pnpm build               # Build for production
pnpm lint                # Check code quality
pnpm type-check          # TypeScript validation
```

---

## 📋 Exam Tips (Both Levels)

- **Read the React docs** — the exam validates React's official patterns, not library-specific ones
- **Coding challenges test real-world thinking** — understand WHY not just HOW
- **Hooks rules** — always know: no hooks inside conditions or loops
- **Re-render triggers:** state change, prop change, parent re-render, context change
- **React 19 topics** are heavily tested in Senior — `useActionState`, Actions, `useOptimistic`
- **Time management:** Practice challenges under time pressure (105 min for ~8-10 tasks)
- **Read error messages** — the exam values debugging skills, not memorization

---

## 📚 Learning Resources

- [Official React Docs](https://react.dev)
- [certificates.dev Blog](https://certificates.dev/blog?tech=react)
- [React Hooks Cheatsheet](https://certificates.dev/cheat-sheets/react-hooks-cheatsheet-part-1)
- [React Concurrent Features Cheatsheet](https://certificates.dev/cheat-sheets/react-concurrent-features-cheatsheet-part-1)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Redux Documentation](https://redux.js.org/)

---

## 🤝 Contributing

### Before You Contribute

1. **Review** [`.github/copilot-instructions.xml`](./.github/copilot-instructions.xml) — all rules are MANDATORY
2. **Code must pass:**
   - TypeScript strict mode (`tsc --noEmit`)
   - ESLint with zero warnings (`pnpm lint`)
   - All unit tests (`pnpm test`)

### Contribution Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes following code standards
3. Run validation: `pnpm lint && pnpm test && tsc --noEmit`
4. Commit with clear messages: `git commit -m "feat: add new challenge topic"`
5. Push and create a Pull Request
6. Address code review feedback

### Adding New Challenges

1. Create directory: `mid/src/challenges/[number]-[topic]/`
2. Add `README.md` with theory and exam tips
3. Add `Challenge.tsx` with TODOs
4. Add `Solution.tsx` with implementation
5. Update main README with link
6. Run `pnpm lint` to validate

---

## 🐛 Troubleshooting

### Dependencies Won't Install
```bash
# Clear pnpm cache
pnpm store prune

# Reinstall everything
rm -rf node_modules
pnpm install
```

### Submodule Issues
```bash
# Initialize/update submodules
git submodule update --init --recursive

# Check submodule status
git submodule status
```

### TypeScript Errors

```bash
# Validate TypeScript across all packages
pnpm -r type-check

# Fix auto-fixable issues
pnpm -r type-check -- --noEmit
```

### Port Already in Use

- **Frontend:** Change port in `vite.config.ts` → `server.port`
- **Backend:** Change port in `backend/src/server.ts` → `app.listen(PORT)`

---

## 📄 License

MIT

---

## 📞 Support

For questions or issues:
1. Check the [Learn section](./docs) (if available)
2. Review existing GitHub issues
3. Check individual `README.md` files in challenge folders
4. Create a new issue with clear description and steps to reproduce
