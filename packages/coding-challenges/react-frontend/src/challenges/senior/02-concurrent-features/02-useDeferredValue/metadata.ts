export const metadata = {
  "id": "senior-02-concurrent-features-02-useDeferredValue",
  "name": "CHALLENGE 02 — useDeferredValue: Search with Stale UI",
  "level": "senior",
  "category": "02-concurrent-features",
  "slug": "02-useDeferredValue",
  "path": "senior/src/challenges/02-concurrent-features/challenges/02-useDeferredValue/Challenge.tsx",
  "requirements": [
    {
      "id": "req-1",
      "text": "Use useDeferredValue for search results to avoid blocking input",
      "completed": false
    },
    {
      "id": "req-2",
      "text": "Show a 'stale' indicator (reduced opacity) when results lag behind query",
      "completed": false
    },
    {
      "id": "req-3",
      "text": "Wrap ExpensiveSearchResults in React.memo for deferral effectiveness",
      "completed": false
    }
  ]
};