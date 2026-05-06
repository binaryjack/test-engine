export const metadata = {
  "id": "senior-08-refs-and-errors-01-error-boundary-reset",
  "name": "CHALLENGE — Error Boundary with componentDidCatch + Reset",
  "level": "senior",
  "category": "08-refs-and-errors",
  "slug": "01-error-boundary-reset",
  "path": "senior/src/challenges/08-refs-and-errors/challenges/01-error-boundary-reset/Challenge.tsx",
  "requirements": [
    {
      "id": "req-1",
      "text": "Implement ErrorBoundary class component with state: { hasError: boolean; error: Error | null }",
      "completed": false
    },
    {
      "id": "req-2",
      "text": "Implement getDerivedStateFromError to return hasError: true",
      "completed": false
    },
    {
      "id": "req-3",
      "text": "Implement componentDidCatch to log error + componentStack",
      "completed": false
    },
    {
      "id": "req-4",
      "text": "Render children or call fallback render prop",
      "completed": false
    },
    {
      "id": "req-5",
      "text": "Implement reset strategy using setState and parent resetKey",
      "completed": false
    },
    {
      "id": "req-6",
      "text": "Force remount of wrapped component using resetKey as `key`",
      "completed": false
    },
    {
      "id": "req-7",
      "text": "Build BuggyCounter that crashes on count >= 5",
      "completed": false
    },
    {
      "id": "req-8",
      "text": "Show manual handling for async errors in AsyncErrorWidget",
      "completed": false
    },
    {
      "id": "req-9",
      "text": "Show manual handling for event errors in EventErrorWidget",
      "completed": false
    }
  ]
};