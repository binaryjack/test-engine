export const metadata = {
  "id": "mid-06-context-state-01-auth-context",
  "name": "CHALLENGE — Context + useReducer: Auth System",
  "level": "mid",
  "category": "06-context-state",
  "slug": "01-auth-context",
  "path": "mid/src/challenges/06-context-state/challenges/01-auth-context/Challenge.tsx",
  "requirements": [
    {
      "id": "req-1",
      "text": "AuthProvider manages auth state (user, isLoggedIn) using useReducer",
      "completed": false
    },
    {
      "id": "req-2",
      "text": "Split state and dispatch into SEPARATE contexts for performance",
      "completed": false
    },
    {
      "id": "req-3",
      "text": "Create useAuthState and useAuthDispatch custom hooks",
      "completed": false
    },
    {
      "id": "req-4",
      "text": "LoginForm should only read dispatch context",
      "completed": false
    },
    {
      "id": "req-5",
      "text": "UserProfile should only re-render when state changes",
      "completed": false
    },
    {
      "id": "req-6",
      "text": "LogoutButton should only read dispatch and not re-render on state changes",
      "completed": false
    }
  ]
};