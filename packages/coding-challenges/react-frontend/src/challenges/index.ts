export interface ChallengeMetadata {
  id: string;
  name: string;
  level: 'beginner' | 'mid' | 'senior';
  category: string;
  requirements: { id: string; text: string; completed: boolean }[];
  path: string;
  estimatedTime: number; // in minutes
}

export const challengeRegistry: ChallengeMetadata[] = [
  {
    "id": "mid-07-rendering-keys-02-portals-and-useId",
    "name": "Portals & useId",
    "level": "mid",
    "category": "Rendering Keys",
    "path": "mid/07-rendering-keys/02-portals-and-useId",
    "estimatedTime": 45,
    "requirements": [
      { "id": "req-1", "text": "Build a ToastContainer that renders outside the React root via createPortal", "completed": false },
      { "id": "req-2", "text": "The toast should appear at the bottom-right of the viewport (fixed position)", "completed": false },
      { "id": "req-3", "text": "Even though the portal DOM node is outside #root, events and context work normally", "completed": false },
      { "id": "req-4", "text": "Create a `portal-root` div and append it to document.body in useEffect", "completed": false },
      { "id": "req-5", "text": "Use createPortal to render the toast into that div", "completed": false },
      { "id": "req-6", "text": "The toast auto-dismisses after 3 seconds (useEffect + setTimeout)", "completed": false },
      { "id": "req-7", "text": "Build a reusable TextInput component", "completed": false },
      { "id": "req-8", "text": "Each input must have a <label> linked via htmlFor / id", "completed": false },
      { "id": "req-9", "text": "Use useId() to generate unique, SSR-stable IDs — do NOT use Math.random()", "completed": false },
      { "id": "req-10", "text": "Add a second TextInput on the same page and verify both have unique IDs", "completed": false }
    ]
  },
  {
    "id": "senior-08-refs-and-errors-01-error-boundary-reset",
    "name": "Error Boundary with Reset",
    "level": "senior",
    "category": "Refs and Errors",
    "path": "senior/08-refs-and-errors/01-error-boundary-reset",
    "estimatedTime": 60,
    "requirements": [
      { "id": "req-1", "text": "Implement ErrorBoundary class component with state: { hasError: boolean; error: Error | null }", "completed": false },
      { "id": "req-2", "text": "Implement getDerivedStateFromError to return hasError: true", "completed": false },
      { "id": "req-3", "text": "Implement componentDidCatch to log error + componentStack", "completed": false },
      { "id": "req-4", "text": "Render children or call fallback render prop", "completed": false },
      { "id": "req-5", "text": "Implement reset strategy using setState and parent resetKey", "completed": false },
      { "id": "req-6", "text": "Force remount of wrapped component using resetKey as `key`", "completed": false },
      { "id": "req-7", "text": "Build BuggyCounter that crashes on count >= 5", "completed": false },
      { "id": "req-8", "text": "Show manual handling for async errors in AsyncErrorWidget", "completed": false },
      { "id": "req-9", "text": "Show manual handling for event errors in EventErrorWidget", "completed": false }
    ]
  },
  {
    "id": "mid-07-rendering-keys-01-keys-and-rendering",
    "name": "Keys & Rendering Pitfalls",
    "level": "mid",
    "category": "Rendering Keys",
    "path": "mid/07-rendering-keys/01-keys-and-rendering",
    "estimatedTime": 30,
    "requirements": [
      { "id": "req-1", "text": "Fix the todo list key bug by replacing array index with item.id", "completed": false },
      { "id": "req-2", "text": "Fix the 0 && rendering bug so nothing renders when count is 0", "completed": false },
      { "id": "req-3", "text": "Replace derived state + useEffect with direct inline computation for active user filtering", "completed": false }
    ]
  },
  {
    "id": "senior-07-testing-02-test-async-component",
    "name": "Test Async Component",
    "level": "senior",
    "category": "Testing",
    "path": "senior/07-testing/02-test-async-component",
    "estimatedTime": 45,
    "requirements": [
      { "id": "req-1", "text": "Mock global.fetch or vi.mock the api module", "completed": false },
      { "id": "req-2", "text": "Test that loading state shows while fetch is in progress", "completed": false },
      { "id": "req-3", "text": "Test that user names appear after successful fetch", "completed": false },
      { "id": "req-4", "text": "Test that error message shows when fetch fails", "completed": false },
      { "id": "req-5", "text": "Test 'retry' button resets to loading and fetches again", "completed": false },
      { "id": "req-6", "text": "Use findBy* for elements that appear after async ops", "completed": false },
      { "id": "req-7", "text": "Use queryBy* to assert elements are GONE", "completed": false }
    ]
  },
  {
    "id": "mid-06-context-state-01-auth-context",
    "name": "Auth System (Context + Reducer)",
    "level": "mid",
    "category": "Context and State",
    "path": "mid/06-context-state/01-auth-context",
    "estimatedTime": 60,
    "requirements": [
      { "id": "req-1", "text": "AuthProvider manages auth state (user, isLoggedIn) using useReducer", "completed": false },
      { "id": "req-2", "text": "Split state and dispatch into SEPARATE contexts for performance", "completed": false },
      { "id": "req-3", "text": "Create useAuthState and useAuthDispatch custom hooks", "completed": false },
      { "id": "req-4", "text": "LoginForm should only read dispatch context", "completed": false },
      { "id": "req-5", "text": "UserProfile should only re-render when state changes", "completed": false },
      { "id": "req-6", "text": "LogoutButton should only read dispatch and not re-render on state changes", "completed": false }
    ]
  },
  {
    "id": "senior-07-testing-01-test-counter-hook",
    "name": "Test Custom Hook (useCounter)",
    "level": "senior",
    "category": "Testing",
    "path": "senior/07-testing/01-test-counter-hook",
    "estimatedTime": 30,
    "requirements": [
      { "id": "req-1", "text": "Test that initial count equals the argument", "completed": false },
      { "id": "req-2", "text": "Test that increment() increases count by 1", "completed": false },
      { "id": "req-3", "text": "Test that decrement() decreases count by 1", "completed": false },
      { "id": "req-4", "text": "Test that reset() sets count back to initial value", "completed": false },
      { "id": "req-5", "text": "Test that count never goes below min boundary", "completed": false },
      { "id": "req-6", "text": "Test that count never goes above max boundary", "completed": false },
      { "id": "req-7", "text": "Test the Counter component renders count and all buttons", "completed": false },
      { "id": "req-8", "text": "Test that clicking the buttons updates the displayed count", "completed": false }
    ]
  },
  {
    "id": "mid-05-forms-01-controlled-form",
    "name": "Controlled Contact Form",
    "level": "mid",
    "category": "Forms",
    "path": "mid/05-forms/01-controlled-form",
    "estimatedTime": 40,
    "requirements": [
      { "id": "req-1", "text": "Fields: name (required), email (required, valid), message (required, min 20 chars)", "completed": false },
      { "id": "req-2", "text": "Validation happens on blur (when user leaves a field)", "completed": false },
      { "id": "req-3", "text": "Errors show only for fields that have been touched", "completed": false },
      { "id": "req-4", "text": "Submit button disabled until all fields are valid", "completed": false },
      { "id": "req-5", "text": "On submit: show success message and reset form", "completed": false }
    ]
  },
  {
    "id": "senior-06-accessibility-01-accessible-modal",
    "name": "Accessible Modal",
    "level": "senior",
    "category": "Accessibility",
    "path": "senior/06-accessibility/01-accessible-modal",
    "estimatedTime": 60,
    "requirements": [
      { "id": "req-1", "text": "Add role=\"dialog\", aria-modal=\"true\", and aria-labelledby", "completed": false },
      { "id": "req-2", "text": "Move focus to first focusable element when modal opens", "completed": false },
      { "id": "req-3", "text": "Trap focus inside modal using Tab / Shift+Tab", "completed": false },
      { "id": "req-4", "text": "Close modal on Escape key press", "completed": false },
      { "id": "req-5", "text": "Return focus to trigger button when modal closes", "completed": false },
      { "id": "req-6", "text": "Close modal on backdrop click without affecting inner clicks", "completed": false }
    ]
  },
  {
    "id": "mid-01-hooks-07-custom-hooks",
    "name": "Custom Hooks (useLocalStorage)",
    "level": "mid",
    "category": "Hooks",
    "path": "mid/01-hooks/07-custom-hooks",
    "estimatedTime": 45,
    "requirements": [
      { "id": "req-1", "text": "Implement useLocalStorage with generic T, JSON serialization, and fallback", "completed": false },
      { "id": "req-2", "text": "Keep localStorage in sync when the value changes", "completed": false },
      { "id": "req-3", "text": "Implement useDebounce to delay value updates", "completed": false },
      { "id": "req-4", "text": "Use both hooks together in a persisted search component", "completed": false }
    ]
  },
  {
    "id": "mid-01-hooks-06-useMemo-useCallback",
    "name": "List Optimization (Memoization)",
    "level": "mid",
    "category": "Hooks",
    "path": "mid/01-hooks/06-useMemo-useCallback",
    "estimatedTime": 30,
    "requirements": [
      { "id": "req-1", "text": "Memoize the filtered list calculation with useMemo", "completed": false },
      { "id": "req-2", "text": "Memoize the onDelete handler with useCallback", "completed": false },
      { "id": "req-3", "text": "Wrap ListItem with React.memo to prevent unnecessary re-renders", "completed": false },
      { "id": "req-4", "text": "Verify Parent counter increment does NOT cause list re-renders", "completed": false }
    ]
  },
  {
    "id": "senior-03-use-api",
    "name": "use() API & Suspense",
    "level": "senior",
    "category": "React 19",
    "path": "senior/03-use-api/03-use-api",
    "estimatedTime": 45,
    "requirements": [
      { "id": "req-1", "text": "Implement fetchUser(id) function returning a Promise<User>", "completed": false },
      { "id": "req-2", "text": "Use the use() hook in UserCard to read userPromise data", "completed": false },
      { "id": "req-3", "text": "Wrap UserCard in Suspense with a skeleton fallback", "completed": false },
      { "id": "req-4", "text": "Add outer ErrorBoundary to catch rejected promises", "completed": false },
      { "id": "req-5", "text": "Implement button to change the promise and fetch a different user", "completed": false }
    ]
  },
  {
    "id": "mid-04-error-handling-01-error-boundary",
    "name": "Error Boundary with Recovery",
    "level": "mid",
    "category": "Error Handling",
    "path": "mid/04-error-handling/01-error-boundary",
    "estimatedTime": 45,
    "requirements": [
      { "id": "req-1", "text": "Implement ErrorBoundary class component with custom fallback and onReset props", "completed": false },
      { "id": "req-2", "text": "Build BuggyCounter that throws when count reaches 3", "completed": false },
      { "id": "req-3", "text": "Wrap BuggyCounter in ErrorBoundary with recovery UI", "completed": false },
      { "id": "req-4", "text": "Add a second ErrorBoundary wrapping an async error case handled via state", "completed": false }
    ]
  },
  {
    "id": "senior-02-useOptimistic",
    "name": "useOptimistic: Like Button",
    "level": "senior",
    "category": "React 19",
    "path": "senior/02-useOptimistic/02-useOptimistic",
    "estimatedTime": 30,
    "requirements": [
      { "id": "req-1", "text": "Clicking Like updates count IMMEDIATELY using useOptimistic", "completed": false },
      { "id": "req-2", "text": "Perform API call with 1s delay in background", "completed": false },
      { "id": "req-3", "text": "Handle automatic ROLLBACK on 30% failure chance", "completed": false },
      { "id": "req-4", "text": "Show 'saving...' indicator while action is pending", "completed": false },
      { "id": "req-5", "text": "Toggle like state between liked and unliked", "completed": false }
    ]
  },
  {
    "id": "mid-01-hooks-05-useContext-theme",
    "name": "Theme System (useContext)",
    "level": "mid",
    "category": "Hooks",
    "path": "mid/01-hooks/05-useContext-theme",
    "estimatedTime": 30,
    "requirements": [
      { "id": "req-1", "text": "Create ThemeContext providing theme ('light'|'dark') and toggleTheme()", "completed": false },
      { "id": "req-2", "text": "Implement ThemeProvider with managed state", "completed": false },
      { "id": "req-3", "text": "Create useTheme custom hook with safety check", "completed": false },
      { "id": "req-4", "text": "Build ThemeToggle button using the hook", "completed": false },
      { "id": "req-5", "text": "Build ThemedCard applying styles based on theme context", "completed": false }
    ]
  },
  {
    "id": "senior-05-advanced-patterns-03-useImperativeHandle",
    "name": "Custom Ref API (useImperativeHandle)",
    "level": "senior",
    "category": "Advanced Patterns",
    "path": "senior/05-advanced-patterns/03-useImperativeHandle",
    "estimatedTime": 45,
    "requirements": [
      { "id": "req-1", "text": "Implement ValidatedInput using forwardRef and useImperativeHandle", "completed": false },
      { "id": "req-2", "text": "Expose focus(), validate(), and reset() methods through the ref", "completed": false },
      { "id": "req-3", "text": "Implement internal input validation with error UI", "completed": false },
      { "id": "req-4", "text": "Call validate() on all fields from parent form on Submit", "completed": false },
      { "id": "req-5", "text": "Call reset() on all fields from parent form on Reset", "completed": false }
    ]
  },
  {
    "id": "senior-05-advanced-patterns-01-compound-tabs",
    "name": "Advanced Tabs (Compound Components)",
    "level": "senior",
    "category": "Advanced Patterns",
    "path": "senior/05-advanced-patterns/01-compound-tabs",
    "estimatedTime": 60,
    "requirements": [
      { "id": "req-1", "text": "Implement Tabs root component with Context for state management", "completed": false },
      { "id": "req-2", "text": "Implement Tabs.List with role=\"tablist\"", "completed": false },
      { "id": "req-3", "text": "Implement Tabs.Tab with accessibility roles and keyboard navigation", "completed": false },
      { "id": "req-4", "text": "Implement Tabs.Panel that renders only when active", "completed": false },
      { "id": "req-5", "text": "Enable ArrowLeft / ArrowRight keyboard navigation between tabs", "completed": false }
    ]
  },
  {
    "id": "senior-05-advanced-patterns-02-generic-table",
    "name": "Generic Data Table",
    "level": "senior",
    "category": "Advanced Patterns",
    "path": "senior/05-advanced-patterns/02-generic-table",
    "estimatedTime": 90,
    "requirements": [
      { "id": "req-1", "text": "Build a generic DataTable<T> with typed columns and accessors", "completed": false },
      { "id": "req-2", "text": "Implement column sorting (asc/desc) with visual indicators", "completed": false },
      { "id": "req-3", "text": "Support row actions via callbacks (delete / edit)", "completed": false },
      { "id": "req-4", "text": "Render <table> structure using thead/tbody and column definitions", "completed": false },
      { "id": "req-5", "text": "Handle empty data states within the table", "completed": false }
    ]
  },
  {
    "id": "mid-01-hooks-04-useReducer-cart",
    "name": "Shopping Cart (useReducer)",
    "level": "mid",
    "category": "Hooks",
    "path": "mid/01-hooks/04-useReducer-cart",
    "estimatedTime": 45,
    "requirements": [
      { "id": "req-1", "text": "Implement ADD_ITEM (increase quantity if exists)", "completed": false },
      { "id": "req-2", "text": "Implement REMOVE_ITEM (remove completely)", "completed": false },
      { "id": "req-3", "text": "Implement UPDATE_QUANTITY (remove if 0)", "completed": false },
      { "id": "req-4", "text": "Implement CLEAR_CART", "completed": false },
      { "id": "req-5", "text": "Display cart list with controls, total price, and item count badge", "completed": false }
    ]
  },
  {
    "id": "mid-03-performance-02-lazy-loading",
    "name": "Route-based Code Splitting",
    "level": "mid",
    "category": "Performance",
    "path": "mid/03-performance/02-lazy-loading",
    "estimatedTime": 30,
    "requirements": [
      { "id": "req-1", "text": "Convert page components to use React.lazy() imports", "completed": false },
      { "id": "req-2", "text": "Wrap routes with Suspense and a 'Loading page...' fallback", "completed": false },
      { "id": "req-3", "text": "Ensure Suspense is used at routing level, not per-page", "completed": false },
      { "id": "req-4", "text": "Verify separate network chunks in DevTools", "completed": false }
    ]
  },
  {
    "id": "mid-03-performance-01-memo-optimization",
    "name": "Performance Optimization (React.memo)",
    "level": "mid",
    "category": "Performance",
    "path": "mid/03-performance/01-memo-optimization",
    "estimatedTime": 45,
    "requirements": [
      { "id": "req-1", "text": "Wrap ProductCard and FilterBar with React.memo", "completed": false },
      { "id": "req-2", "text": "Memoize onAddToCart and onFilterChange callbacks with useCallback", "completed": false },
      { "id": "req-3", "text": "Memoize filteredProducts calculation with useMemo", "completed": false },
      { "id": "req-4", "text": "Verify performance improvements using React DevTools Profiler", "completed": false }
    ]
  },
  {
    "id": "senior-02-concurrent-features-03-suspense-parallel",
    "name": "Parallel Suspense Boundaries",
    "level": "senior",
    "category": "Concurrent Features",
    "path": "senior/02-concurrent-features/03-suspense-parallel",
    "estimatedTime": 60,
    "requirements": [
      { "id": "req-1", "text": "Wrap each dashboard section in its OWN Suspense boundary", "completed": false },
      { "id": "req-2", "text": "Use the use() hook to read promise results in child components", "completed": false },
      { "id": "req-3", "text": "Provide individual Suspense fallbacks for each section", "completed": false },
      { "id": "req-4", "text": "Wrap sections in individual ErrorBoundaries for independent failure", "completed": false },
      { "id": "req-5", "text": "Add a way to simulate slow loading for specific sections", "completed": false }
    ]
  },
  {
    "id": "mid-01-hooks-03-useRef-focus",
    "name": "Focus Management (useRef)",
    "level": "mid",
    "category": "Hooks",
    "path": "mid/01-hooks/03-useRef-focus",
    "estimatedTime": 20,
    "requirements": [
      { "id": "req-1", "text": "Implement clear button that clears input and returns focus", "completed": false },
      { "id": "req-2", "text": "Implement external 'Focus Search' button focusing the input via ref", "completed": false },
      { "id": "req-3", "text": "Track input change count using useRef without triggering re-renders", "completed": false },
      { "id": "req-4", "text": "Show the change count state only on input blur", "completed": false }
    ]
  },
  {
    "id": "senior-02-concurrent-features-02-useDeferredValue",
    "name": "Search with Stale UI (useDeferredValue)",
    "level": "senior",
    "category": "Concurrent Features",
    "path": "senior/02-concurrent-features/02-useDeferredValue",
    "estimatedTime": 45,
    "requirements": [
      { "id": "req-1", "text": "Use useDeferredValue for search results to avoid blocking input", "completed": false },
      { "id": "req-2", "text": "Show a 'stale' indicator (reduced opacity) when results lag behind query", "completed": false },
      { "id": "req-3", "text": "Wrap ExpensiveSearchResults in React.memo for deferral effectiveness", "completed": false }
    ]
  },
  {
    "id": "senior-02-concurrent-features-01-useTransition",
    "name": "Smooth Tab Navigation (useTransition)",
    "level": "senior",
    "category": "Concurrent Features",
    "path": "senior/02-concurrent-features/01-useTransition",
    "estimatedTime": 45,
    "requirements": [
      { "id": "req-1", "text": "Wrap expensive tab changes in startTransition", "completed": false },
      { "id": "req-2", "text": "Use isPending to show a visual indicator on active tab", "completed": false },
      { "id": "req-3", "text": "Apply opacity to content while a transition is pending", "completed": false },
      { "id": "req-4", "text": "Verify search input remains responsive during tab transitions", "completed": false }
    ]
  },
  {
    "id": "mid-02-component-patterns-02-render-props",
    "name": "Generic Data Fetcher (Render Props)",
    "level": "mid",
    "category": "Component Patterns",
    "path": "mid/02-component-patterns/02-render-props",
    "estimatedTime": 45,
    "requirements": [
      { "id": "req-1", "text": "Accept url string and render function prop", "completed": false },
      { "id": "req-2", "text": "Fetch data from URL and handle loading/error states", "completed": false },
      { "id": "req-3", "text": "Pass fetch state to render function for UI control", "completed": false },
      { "id": "req-4", "text": "Reuse fetcher for different UIs (users and posts)", "completed": false }
    ]
  },
  {
    "id": "senior-04-react-compiler-01-auto-memoization",
    "name": "React Compiler Auto Memoization",
    "level": "senior",
    "category": "React 19",
    "path": "senior/04-react-compiler/01-auto-memoization",
    "estimatedTime": 30,
    "requirements": [
      { "id": "req-1", "text": "Apply manual memoization (React.memo, useMemo, useCallback) to slow component", "completed": false },
      { "id": "req-2", "text": "Identify and fix hidden Rules of React violation", "completed": false },
      { "id": "req-3", "text": "Analyze which optimizations the compiler handles automatically", "completed": false }
    ]
  },
  {
    "id": "senior-01-useActionState",
    "name": "Async Form Submission (useActionState)",
    "level": "senior",
    "category": "React 19",
    "path": "senior/01-useActionState/01-useActionState",
    "estimatedTime": 45,
    "requirements": [
      { "id": "req-1", "text": "Build 'Create Post' form with title and body validation", "completed": false },
      { "id": "req-2", "text": "Use useActionState to manage async submission and errors", "completed": false },
      { "id": "req-3", "text": "Show isPending state during simulated API call", "completed": false },
      { "id": "req-4", "text": "Implement form reset after successful submission", "completed": false }
    ]
  },
  {
    "id": "mid-02-component-patterns-01-compound-components",
    "name": "Accordion (Compound Components)",
    "level": "mid",
    "category": "Component Patterns",
    "path": "mid/02-component-patterns/01-compound-components",
    "estimatedTime": 60,
    "requirements": [
      { "id": "req-1", "text": "Implement Accordion ensuring only one panel is open at a time", "completed": false },
      { "id": "req-2", "text": "Manage active panel state at Accordion level using Context", "completed": false },
      { "id": "req-3", "text": "Attach Item, Trigger, and Panel sub-components to Accordion", "completed": false },
      { "id": "req-4", "text": "Add ARIA attributes (aria-expanded, role=\"region\") for accessibility", "completed": false }
    ]
  },
  {
    "id": "mid-01-hooks-02-useEffect-data-fetching",
    "name": "Data Fetching with Cleanup (useEffect)",
    "level": "mid",
    "category": "Hooks",
    "path": "mid/01-hooks/02-useEffect-data-fetching",
    "estimatedTime": 30,
    "requirements": [
      { "id": "req-1", "text": "Fetch user data from API based on userId prop", "completed": false },
      { "id": "req-2", "text": "Implement loading and error states for the fetch", "completed": false },
      { "id": "req-3", "text": "Use AbortController in cleanup to cancel previous fetches", "completed": false },
      { "id": "req-4", "text": "Display name, email, and company name from fetched data", "completed": false }
    ]
  },
  {
    "id": "mid-01-hooks-01-useState-form",
    "name": "useState: Smart Form",
    "level": "mid",
    "category": "Hooks",
    "path": "mid/01-hooks/01-useState-form",
    "estimatedTime": 30,
    "requirements": [
      { "id": "req-1", "text": "Fields: name, email, password, confirmPassword", "completed": false },
      { "id": "req-2", "text": "Show a character count under the name field (max 50 chars)", "completed": false },
      { "id": "req-3", "text": "Show a password strength indicator (weak | medium | strong)", "completed": false },
      { "id": "req-4", "text": "Disable the submit button if passwords don't match", "completed": false },
      { "id": "req-5", "text": "On submit, log form data and reset the form", "completed": false }
    ]
  }
];
