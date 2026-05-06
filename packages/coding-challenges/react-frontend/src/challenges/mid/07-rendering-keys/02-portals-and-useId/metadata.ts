export const metadata = {
  "id": "mid-07-rendering-keys-02-portals-and-useId",
  "name": "CHALLENGE — Portals & useId",
  "level": "mid",
  "category": "07-rendering-keys",
  "slug": "02-portals-and-useId",
  "path": "mid/src/challenges/07-rendering-keys/challenges/02-portals-and-useId/Challenge.tsx",
  "requirements": [
    {
      "id": "req-1",
      "text": "Build a ToastContainer that renders outside the React root via createPortal",
      "completed": false
    },
    {
      "id": "req-2",
      "text": "The toast should appear at the bottom-right of the viewport (fixed position)",
      "completed": false
    },
    {
      "id": "req-3",
      "text": "Even though the portal DOM node is outside #root, events and context work normally",
      "completed": false
    },
    {
      "id": "req-4",
      "text": "Create a `portal-root` div and append it to document.body in useEffect",
      "completed": false
    },
    {
      "id": "req-5",
      "text": "Use createPortal to render the toast into that div",
      "completed": false
    },
    {
      "id": "req-6",
      "text": "The toast auto-dismisses after 3 seconds (useEffect + setTimeout)",
      "completed": false
    },
    {
      "id": "req-7",
      "text": "Build a reusable TextInput component",
      "completed": false
    },
    {
      "id": "req-8",
      "text": "Each input must have a <label> linked via htmlFor / id",
      "completed": false
    },
    {
      "id": "req-9",
      "text": "Use useId() to generate unique, SSR-stable IDs — do NOT use Math.random()",
      "completed": false
    },
    {
      "id": "req-10",
      "text": "Add a second TextInput on the same page and verify both have unique IDs",
      "completed": false
    }
  ]
};