import { QuestionInput } from "@/domain/question/question.schema"

type Difficulty = 'easy' | 'medium' | 'hard'
type QuestionSeed = Omit<QuestionInput, 'technologyId' | 'difficulty'> & { difficulty: Difficulty }

export const extraReactQuestions: QuestionSeed[] = [
  {
    level: 'FUNDAMENTALS',
    topic: 'Tooling',
    subtopic: 'File extensions',
    type: 'mcq',
    prompt: 'Which file extension is used for React components written with TypeScript and JSX?',
    options: ['.ts', '.tsx', '.jsx', '.js'],
    answer: '.tsx',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'TypeScript + JSX files use the .tsx extension so the compiler recognizes JSX syntax in TS files.',
    references: ['https://www.typescriptlang.org/docs/handbook/jsx.html']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'Components',
    subtopic: 'Exports',
    type: 'mcq',
    prompt: 'What is the difference between a default export and a named export for a React component?',
    options: ['Default export requires braces when importing', 'Named export allows a single default per file', 'Default export can be imported without braces, named exports require braces', 'Named exports are private to the module'],
    answer: 'Default export can be imported without braces, named exports require braces',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'Default exports are imported without curly braces; named exports must be imported using their exported name inside braces.',
    references: ['https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export']
  },
  {
    level: 'MID',
    topic: 'Performance',
    subtopic: 'Memoization',
    type: 'mcq',
    prompt: 'What is the primary purpose of ```jsx useMemo``` in React?',
    options: ['Cache DOM nodes', 'Memoize an expensive computation result until dependencies change', 'Prevent all re-renders of a component', 'Replace useEffect for data fetching'],
    answer: 'Memoize an expensive computation result until dependencies change',
    difficulty: 'medium',
    estimatedTime: 60,
    explanation: 'useMemo caches the result of a function so that the expensive computation only runs again when its dependency array changes.',
    references: ['https://react.dev/reference/react/useMemo']
  },
  {
    level: 'MID',
    topic: 'Hooks',
    subtopic: 'useCallback',
    type: 'mcq',
    prompt: 'Why would you use ```jsx useCallback``` when passing callbacks to memoized children?',
    options: ['To memoize computed values', 'To keep the same function reference between renders unless dependencies change', 'To lazy initialize state', 'To force a child to re-render'],
    answer: 'To keep the same function reference between renders unless dependencies change',
    difficulty: 'medium',
    estimatedTime: 60,
    explanation: 'useCallback returns a memoized function reference which helps prevent unnecessary re-renders of children that compare props shallowly.',
    references: ['https://react.dev/reference/react/useCallback']
  },
  {
    level: 'SENIOR',
    topic: 'Concurrent Features',
    subtopic: 'Time slicing',
    type: 'mcq',
    prompt: 'What does time-slicing in React concurrent rendering enable?',
    options: ['Rendering is split across frames to keep the UI responsive', 'Rendering runs on a separate Web Worker thread', 'Components render synchronously always', 'It disables Suspense'],
    answer: 'Rendering is split across frames to keep the UI responsive',
    difficulty: 'hard',
    estimatedTime: 90,
    explanation: 'Time-slicing allows React to pause rendering work and yield to the browser, improving responsiveness for user interactions during heavy renders.',
    references: ['https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react']
  },
  {
    level: 'SENIOR',
    topic: 'Architecture',
    subtopic: 'Optimistic UI',
    type: 'mcq',
    prompt: 'When implementing an optimistic UI for a mutation, what must you plan for?',
    options: ['No rollback needed', 'A rollback strategy and error handling if the server rejects the change', 'Always refreshing the whole page', 'Optimistic UI only works for reads'],
    answer: 'A rollback strategy and error handling if the server rejects the change',
    difficulty: 'hard',
    estimatedTime: 90,
    explanation: 'Optimistic updates assume success; you must revert the UI and inform the user if the server responds with an error.',
    references: ['https://react.dev/reference/react/useOptimistic']
  }
]

export const extraTypescriptQuestions: QuestionSeed[] = [
  {
    level: 'FUNDAMENTALS',
    topic: 'Types',
    subtopic: 'keyof',
    type: 'mcq',
    prompt: 'What does the```jsx\n keyof``` operator produce for a type```jsx\n T```?',
    options: ['A runtime list of keys', 'A union type of the property names of T', 'The type of values in T', 'An error'],
    answer: 'A union type of the property names of T',
    difficulty: 'medium',
    estimatedTime: 60,
    explanation: '`keyof T` produces a union of the keys of T (e.g., `keyof {a: number; b: string} = "a" | "b"`).',
    references: ['https://www.typescriptlang.org/docs/handbook/2/keyof-types.html']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'Utility Types',
    subtopic: 'Partial',
    type: 'mcq',
    prompt: 'What does```jsx\n Partial<T>``` do to a type T?',
    options: ['Makes all properties required', 'Makes all properties optional', 'Removes index signatures', 'Converts properties to readonly'],
    answer: 'Makes all properties optional',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: '`Partial<T>` constructs a type with all properties of T set to optional.',
    references: ['https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype']
  },
  {
    level: 'ADVANCED',
    topic: 'Generics',
    subtopic: 'infer',
    type: 'mcq',
    prompt: 'In conditional types, what does the ```jsx\n infer``` keyword allow you to do?',
    options: ['Infer a type inside the true branch from a pattern', 'Infer runtime values', 'Infer generic parameter names', 'Infer module paths'],
    answer: 'Infer a type inside the true branch from a pattern',
    difficulty: 'hard',
    estimatedTime: 90,
    explanation: 'infer lets you capture a type from inside another type in a conditional type for reuse in the true branch.',
    references: ['https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types']
  },
  {
    level: 'ADVANCED',
    topic: 'Type Narrowing',
    subtopic: 'User-defined type guards',
    type: 'mcq',
    prompt: 'What is the form of a user-defined type guard function in TypeScript?',
    options: [
      '```ts\nfunction isUser(x): boolean\n```',
      '```ts\nfunction isUser(x: unknown): x is User\n```',
      '```ts\nfunction isUser<T>(x: T): T is User\n```',
      '```ts\nfunction isUser(x): x is User\n```'
    ],
    answer: '```ts\nfunction isUser(x: unknown): x is User\n```',
    difficulty: 'hard',
    estimatedTime: 90,
    explanation: 'A user-defined type guard has a return type of the form `paramName is Type`, which TypeScript uses to narrow the type in the calling scope.',
    references: ['https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates']
  }
]
