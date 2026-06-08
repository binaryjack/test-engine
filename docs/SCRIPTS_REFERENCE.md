# NPM Scripts Reference

Quick reference for all available npm/pnpm scripts in this monorepo.

---

## ⚡ Quick Start Scripts

### 🚀 Start Everything (RECOMMENDED)

```bash
# Start backend + frontend in parallel
pnpm dev

# Same thing with alias
pnpm dev:test-machine
```

**What it does:**
- Starts backend on `http://localhost:3001`
- Starts frontend on `http://localhost:5174`
- Runs both simultaneously in the same terminal
- Press `Ctrl+C` to stop both

---

## 📚 Individual Scripts

### Backend Only

```bash
# Start backend server
pnpm dev:backend

# Runs on: http://localhost:3001
```

### Frontend Only

```bash
# Start frontend app
pnpm dev:frontend

# Runs on: http://localhost:5174
```

---

## 🎯 Study Scripts (MID-Level)

### Hooks Deep Dive

```bash
pnpm start:mid-useState-form           # useState challenge
pnpm start:mid-useEffect-data-fetching # useEffect challenge
pnpm start:mid-useRef-focus            # useRef challenge
pnpm start:mid-useReducer-cart         # useReducer challenge
pnpm start:mid-useContext-theme        # useContext challenge
pnpm start:mid-useMemo-useCallback     # useMemo/useCallback
pnpm start:mid-custom-hooks            # Custom hooks challenge
```

### Component Patterns

```bash
pnpm start:mid-compound-components # Compound component pattern
pnpm start:mid-render-props        # Render props pattern
```

### Performance

```bash
pnpm start:mid-memo-optimization # React.memo optimization
pnpm start:mid-lazy-loading      # Code splitting & lazy loading
```

### Error Handling

```bash
pnpm start:mid-error-boundary # Error boundary implementation
```

### Forms

```bash
pnpm start:mid-controlled-form # Controlled form components
```

### Context & State

```bash
pnpm start:mid-auth-context # Context + state management
```

---

## 🚀 Study Scripts (SENIOR-Level)

### React 19 Actions

```bash
pnpm start:senior-useActionState  # useActionState hook
pnpm start:senior-useOptimistic   # useOptimistic hook
pnpm start:senior-use-api         # use() API
```

### Concurrent Features

```bash
pnpm start:senior-useTransition        # useTransition hook
pnpm start:senior-useDeferredValue     # useDeferredValue hook
pnpm start:senior-suspense-parallel    # Suspense parallel rendering
```

### React Compiler

```bash
pnpm start:senior-auto-memoization # Auto-memoization
```

### Advanced Patterns

```bash
pnpm start:senior-compound-tabs # Compound tabs component
pnpm start:senior-generic-table # Generic table component
```

### Accessibility

```bash
pnpm start:senior-accessible-modal # Accessible modal
```

### Testing

```bash
pnpm start:senior-test-counter-hook       # Test custom hooks
pnpm start:senior-test-async-component    # Test async components
```

---

## 🛠️ Utility Scripts

### Install All Dependencies

```bash
pnpm install:all

# Install dependencies for all packages in the monorepo
```

### Convert Challenges (Advanced)

```bash
pnpm convert:challenges

# Convert challenge format (internal use)
```

---

## 💡 Usage Examples

### Example 1: Study MID-Level Hooks

```bash
# Terminal 1: Start learning
pnpm start:mid-useState-form

# Opens http://localhost:5173 with challenge
# Read README.md
# Implement Challenge.tsx
# Check Solution.tsx
```

### Example 2: Full Stack Development (Test Machine)

```bash
# One command starts everything!
pnpm dev

# Or if that doesn't work:
# Terminal 1:
pnpm dev:backend

# Terminal 2:
pnpm dev:frontend

# Then open http://localhost:5174
```

### Example 3: Test Multiple Challenges

```bash
# Study hooks
pnpm start:mid-useState-form

# After 30 min, switch to patterns
pnpm start:mid-compound-components

# Then performance
pnpm start:mid-memo-optimization
```

---

## 🔄 Script Details

### `pnpm dev` (Main Script)

```bash
pnpm dev
# Executes: pnpm --parallel --filter 'test-engine-backend' --filter 'test-engine-frontend' dev

# What happens:
# 1. Runs in monorepo mode
# 2. Finds test-engine-backend package
# 3. Finds test-engine-frontend package
# 4. Runs 'dev' script in BOTH simultaneously
# 5. Outputs combined logs from both
```

**Advantages:**
- ✅ Single command
- ✅ Single terminal window
- ✅ Both start together
- ✅ Easy to stop (Ctrl+C stops both)

### `pnpm dev:backend`

```bash
pnpm dev:backend
# Executes: cd test-machine/backend && pnpm dev

# Starts backend server on http://localhost:3001
```

### `pnpm dev:frontend`

```bash
pnpm dev:frontend
# Executes: cd test-machine/frontend && pnpm dev

# Starts frontend on http://localhost:5174
```

---

## 📊 Script Organization

### By Purpose

```
Development:
  pnpm dev              ← Start full stack (RECOMMENDED)
  pnpm dev:backend      ← Backend only
  pnpm dev:frontend     ← Frontend only

Learning (MID):
  pnpm start:mid-*      ← All MID-level challenges

Learning (SENIOR):
  pnpm start:senior-*   ← All SENIOR-level challenges

Utility:
  pnpm install:all      ← Install all packages
  pnpm convert:challenges ← Internal use
```

### By Port

```
3001 - Backend API (pnpm dev:backend)
5173 - MID Challenges (pnpm start:mid-*)
5173 - SENIOR Challenges (pnpm start:senior-*)
5174 - Frontend App (pnpm dev:frontend)
```

---

## ⚠️ Troubleshooting

### "pnpm dev" Not Working

If `pnpm dev` doesn't work, try separate terminals:

```bash
# Terminal 1:
cd test-machine/backend
pnpm dev

# Terminal 2:
cd test-machine/frontend
pnpm dev
```

### Port Already in Use

```bash
# Find what's using the port
# Windows:
netstat -ano | findstr :3001

# Kill the process
taskkill /PID <PID> /F

# Try again
pnpm dev
```

### Script Not Found

```bash
# Make sure you're in root directory
cd /path/to/test-engine

# Install dependencies
pnpm install

# Try script again
pnpm dev
```

### "Cannot find module" Error

```bash
# Reinstall all dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Try again
pnpm dev
```

---

## 🎯 Recommended Workflows

### For Studying

```bash
# 1. Pick a challenge
pnpm start:mid-useState-form

# 2. Follow workflow:
#    - Read README.md
#    - Implement Challenge.tsx
#    - Compare Solution.tsx
#    - Practice again

# 3. Move to next challenge
pnpm start:mid-useEffect-data-fetching
```

### For Development (Test Machine)

```bash
# 1. Start everything
pnpm dev

# 2. Open browser to http://localhost:5174

# 3. Develop!

# 4. Stop with Ctrl+C
```

### For Testing Full Stack

```bash
# 1. Start full stack
pnpm dev

# 2. Frontend on http://localhost:5174
#    Backend on http://localhost:3001

# 3. Backend logs in first terminal
#    Frontend logs in same terminal

# 4. Test API integration
```

---

## 📚 See Also

- [GETTING_STARTED.md](../GETTING_STARTED.md) — Setup guide
- [CONTRIBUTING.md](../CONTRIBUTING.md) — Contribution guide
- [ARCHITECTURE.md](../ARCHITECTURE.md) — System architecture

---

## 💬 Quick Command Reference

```bash
# All in one go (RECOMMENDED!)
pnpm dev

# Or backend and frontend separately:
pnpm dev:backend    # Terminal 1
pnpm dev:frontend   # Terminal 2

# Start a specific challenge:
pnpm start:mid-useState-form

# See all available scripts:
cat package.json | grep '"start:' or '"dev'
```

---

*Last Updated: 2026-04-17*  
*For more info, see package.json*
