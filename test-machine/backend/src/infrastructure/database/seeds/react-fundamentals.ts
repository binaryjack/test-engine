import { QuestionInput } from "@/domain/question/question.schema"


type Difficulty = 'easy' | 'medium' | 'hard'
type QuestionSeed = Omit<QuestionInput, 'technologyId' | 'difficulty'> & { difficulty: Difficulty }

export const reactFundamentalsQuestions: QuestionSeed[] = [
  {
    level: 'FUNDAMENTALS',
    topic: 'JSX',
    subtopic: 'Syntax',
    type: 'mcq',
    prompt: "Which attribute should you use in JSX to set an element's CSS class?",
    options: ['class', 'className', 'classList', 'cssClass'],
    answer: 'className',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'JSX uses `className` instead of `class` because `class` is a reserved word in JavaScript.',
    references: ['https://react.dev/learn/rendering-elements']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'JSX',
    subtopic: 'Expressions',
    type: 'mcq',
    prompt: 'How do you embed a JavaScript expression inside JSX markup?',
    options: ['{ expression }', '( expression )', '<% expression %>', '${expression}'],
    answer: '{ expression }',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'Wrap any JavaScript expression in curly braces inside JSX to evaluate it and insert the result into the output.',
    references: ['https://react.dev/learn/rendering-elements#using-expressions-in-jsx']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'Components',
    subtopic: 'Function components',
    type: 'mcq',
    prompt: 'What should a React function component return?',
    options: ['A Promise', 'A JSX element or null', 'A DOM node object', 'A React hook'],
    answer: 'A JSX element or null',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'Function components return JSX (which describes the UI) or null to render nothing.',
    references: ['https://react.dev/learn/function-components']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'State',
    subtopic: 'useState',
    type: 'mcq',
    prompt: 'Which hook adds local state to a functional component?',
    options: ['useLocal', 'useState', 'useEffect', 'useMemo'],
    answer: 'useState',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'useState returns a state value and a setter function to update it inside function components.',
    references: ['https://react.dev/reference/react/useState']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'Props',
    subtopic: 'Passing data',
    type: 'mcq',
    prompt: 'How do you pass data from a parent component to a child component?',
    options: ['Using props', 'Using localStorage', 'Using refs', 'Using CSS variables'],
    answer: 'Using props',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'Props are the standard way to pass data from a parent to a child in React — they are read-only in the child.',
    references: ['https://react.dev/learn/passing-data-to-a-component']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'Lists',
    subtopic: 'Keys',
    type: 'mcq',
    prompt: 'What is the purpose of the `key` prop when rendering lists in React?',
    options: ['Style list items', 'Track identity of list items for reconciliation', 'Set tab order', 'Provide a unique id to the DOM element'],
    answer: 'Track identity of list items for reconciliation',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'Keys help React identify which items changed, were added, or removed; they must be stable and unique among siblings.',
    references: ['https://react.dev/learn/rendering-lists#keys']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'Events',
    subtopic: 'Form handling',
    type: 'mcq',
    prompt: 'How do you prevent a form from performing a full page reload in a React onSubmit handler?',
    options: ['return false', 'call event.preventDefault()', 'set form.noAuto = true', 'wrap handler in try/catch'],
    answer: 'call event.preventDefault()',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'Call `event.preventDefault()` in the onSubmit handler to stop the browser from submitting the form and reloading the page.',
    references: ['https://react.dev/learn/handling-events']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'Fragments',
    subtopic: 'Grouping elements',
    type: 'mcq',
    prompt: 'What is the use of React.Fragment (`<>...</>`)?',
    options: ['Wrap multiple elements without adding an extra DOM node', 'Create a portal', 'Lazy-load components', 'Memoize children'],
    answer: 'Wrap multiple elements without adding an extra DOM node',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'Fragments let you return multiple elements from a component without adding an unnecessary wrapper element to the DOM.',
    references: ['https://react.dev/learn/fragments']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'Controlled inputs',
    subtopic: 'Form state',
    type: 'mcq',
    prompt: 'Which pattern makes an input controlled by React state?',
    options: [
      'Use defaultValue and no onChange',
      'Set the input value prop from state and update state in onChange',
      'Only read the DOM value when submitting the form',
      'Wrap the input in React.memo'
    ],
    answer: 'Set the input value prop from state and update state in onChange',
    difficulty: 'easy',
    estimatedTime: 45,
    explanation: 'A controlled input sets its `value` from state and updates state in an `onChange` handler so React owns the input value.',
    references: ['https://react.dev/learn/forms']
  }, 
  {
    level: 'FUNDAMENTALS',
    topic: 'JSX',
    subtopic: 'Syntax',
    type: 'mcq',
    prompt: "Which attribute should you use in JSX to set an element's CSS class?",
    options: ['class', 'className', 'classList', 'cssClass'],
    answer: 'className',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'JSX uses `className` instead of `class` because `class` is a reserved word in JavaScript.',
    references: ['https://react.dev/learn/writing-markup-with-jsx']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'JSX',
    subtopic: 'Expressions',
    type: 'mcq',
    prompt: 'In JSX, how do you embed a JavaScript expression inside markup?',
    options: ['[ expression ]', '{{ expression }}', '{ expression }', '( expression )'],
    answer: '{ expression }',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'JSX uses single curly braces `{}` to embed JavaScript expressions inside markup.',
    references: ['https://react.dev/learn/javascript-in-jsx-with-curly-braces']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'Components',
    subtopic: 'Function components',
    type: 'mcq',
    prompt: 'What is the correct way to define a basic React function component?',
    options: [
      'function MyComponent() { return <div /> }',
      'const MyComponent = <div />',
      'component MyComponent() => <div />',
      'MyComponent() => { <div /> }'
    ],
    answer: 'function MyComponent() { return <div /> }',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'A React function component is a plain JavaScript function that returns JSX.',
    references: ['https://react.dev/learn/your-first-component']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'Props',
    subtopic: 'Passing props',
    type: 'mcq',
    prompt: 'How do you pass a prop called `title` with value `"Hello"` to a component `Header`?',
    options: [
      '<Header props={{ title: "Hello" }} />',
      '<Header title="Hello" />',
      '<Header {title: "Hello"} />',
      '<Header :title="Hello" />'
    ],
    answer: '<Header title="Hello" />',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'Props are passed as attributes on JSX elements, e.g. `<Header title="Hello" />`.',
    references: ['https://react.dev/learn/passing-props-to-a-component']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'State',
    subtopic: 'useState basics',
    type: 'mcq',
    prompt: 'Which hook is used to add local state to a function component?',
    options: ['useEffect', 'useState', 'useMemo', 'useRef'],
    answer: 'useState',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: '`useState` is the primary hook for adding local state to function components.',
    references: ['https://react.dev/learn/state-a-components-memory']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'State',
    subtopic: 'Initial value',
    type: 'mcq',
    prompt: "You have this component:\n\nYou have this code:\n```jsx\nfunction Counter() {\n  const [count, setCount] = useState(0)\n  return <button>{count}</button>\n}\n```\nWhat is the initial value of `count`?",
    options: ['undefined', 'null', '0', 'NaN'],
    answer: '0',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'The argument passed to `useState(0)` is used as the initial state value.',
    references: ['https://react.dev/learn/state-a-components-memory']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'Events',
    subtopic: 'Event handlers',
    type: 'mcq',
    prompt: 'How do you correctly attach a click handler to a button in JSX?',
    options: [
      '<button onclick={handleClick}>Click</button>',
      '<button onClick="handleClick()">Click</button>',
      '<button onClick={handleClick}>Click</button>',
      '<button click={handleClick}>Click</button>'
    ],
    answer: '<button onClick={handleClick}>Click</button>',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'React uses camelCase event names and expects a function reference, not a string.',
    references: ['https://react.dev/learn/responding-to-events']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'Lists',
    subtopic: 'Keys',
    type: 'mcq',
    prompt: 'Why are `key` props important when rendering lists in React?',
    options: [
      'They improve CSS performance.',
      'They help React identify which items changed, were added, or removed.',
      'They are required for TypeScript to compile.',
      'They prevent all re-renders.'
    ],
    answer: 'They help React identify which items changed, were added, or removed.',
    difficulty: 'easy',
    estimatedTime: 40,
    explanation: 'Keys give React a stable identity for each list item, improving reconciliation correctness.',
    references: ['https://react.dev/learn/rendering-lists']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'Conditional rendering',
    subtopic: 'Basic patterns',
    type: 'mcq',
    prompt: 'Which JSX pattern is commonly used for simple conditional rendering?',
    options: [
      'if/else directly inside JSX',
      'The `?:` ternary operator or `&&` short-circuiting',
      'switch/case inside JSX tags',
      'try/catch inside JSX'
    ],
    answer: 'The `?:` ternary operator or `&&` short-circuiting',
    difficulty: 'easy',
    estimatedTime: 40,
    explanation: 'JSX is an expression; ternary and `&&` are idiomatic for inline conditional rendering.',
    references: ['https://react.dev/learn/conditional-rendering']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'Tooling',
    subtopic: 'File extensions',
    type: 'mcq',
    prompt: 'Which file extension is typically used for React components written with TypeScript and JSX?',
    options: ['.ts', '.tsx', '.jsx', '.js'],
    answer: '.tsx',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'TypeScript + JSX files use the `.tsx` extension so the compiler recognizes JSX syntax in TS files.',
    references: ['https://www.typescriptlang.org/docs/handbook/jsx.html']
  },

  // MID LEVEL

  {
    level: 'MID',
    topic: 'State',
    subtopic: 'Functional updates',
    type: 'mcq',
    prompt: "You have this component:\n\nYou have this code:\n```jsx\nfunction Counter() {\n  const [count, setCount] = useState(0)\n\n  function handleClick() {\n    setCount(count + 1)\n    setCount(count + 1)\n  }\n\n  return <button onClick={handleClick}>{count}</button>\n}\n```\nYou click once. What value is displayed?",
    options: ['0', '1', '2', 'It depends on React version'],
    answer: '1',
    difficulty: 'medium',
    estimatedTime: 60,
    explanation: 'Both updates use the same stale `count` value (0). React batches them and the final state is 1.',
    references: ['https://react.dev/learn/queueing-a-series-of-state-updates']
  },
  {
    level: 'MID',
    topic: 'State',
    subtopic: 'Functional updates',
    type: 'mcq',
    prompt: "You have this code:\n\nYou have this code:\n```jsx\nfunction Counter() {\n  const [count, setCount] = useState(0)\n\n  function handleClick() {\n    setCount(c => c + 1)\n    setCount(c => c + 1)\n  }\n\n  return <button onClick={handleClick}>{count}</button>\n}\n```\nYou click once. What value is displayed?",
    options: ['0', '1', '2', '3'],
    answer: '2',
    difficulty: 'medium',
    estimatedTime: 60,
    explanation: 'Functional updates read the latest queued state, so two increments from 0 result in 2.',
    references: ['https://react.dev/learn/queueing-a-series-of-state-updates']
  },
  {
    level: 'MID',
    topic: 'Effects',
    subtopic: 'Dependencies',
    type: 'mcq',
    prompt: "You have this code:\n\nYou have this code:\n```jsx\nfunction Search({ query }) {\n  useEffect(() => {\n    fetch(`/api/search?q=${query}`)\n  }, [])\n\n  return <div>Searching for {query}</div>\n}\n```\nWhat is the main bug?",
    options: [
      'The effect should not call fetch.',
      'The dependency array should include `query`.',
      '`useEffect` cannot be used in function components.',
      'The JSX is invalid.'
    ],
    answer: 'The dependency array should include `query`.',
    difficulty: 'medium',
    estimatedTime: 60,
    explanation: 'With an empty dependency array, the effect only runs once and ignores future `query` changes.',
    references: ['https://react.dev/learn/synchronizing-with-effects']
  },
  {
    level: 'MID',
    topic: 'Effects',
    subtopic: 'Cleanup',
    type: 'mcq',
    prompt: "You have this code:\n\nYou have this code:\n```jsx\nfunction Chat({ roomId }) {\n  useEffect(() => {\n    const connection = connectToRoom(roomId)\n    connection.connect()\n  }, [roomId])\n\n  return <div>Room: {roomId}</div>\n}\n```\nWhat is missing?",
    options: [
      'A dependency array.',
      'A cleanup function to disconnect when the room changes or unmounts.',
      'A second effect for logging.',
      'Nothing, this is correct.'
    ],
    answer: 'A cleanup function to disconnect when the room changes or unmounts.',
    difficulty: 'medium',
    estimatedTime: 60,
    explanation: 'Effects that subscribe or connect to external systems should return a cleanup to avoid leaks.',
    references: ['https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed']
  },
  {
    level: 'MID',
    topic: 'Forms',
    subtopic: 'Controlled inputs',
    type: 'mcq',
    prompt: "You have this code:\n\nYou have this code:\n```jsx\nfunction NameForm() {\n  const [name, setName] = useState('')\n\n  return (\n    <input value={name} onChange={e => setName(e.target.value)} />\n  )\n}\n```\nWhat kind of input is this?",
    options: ['Uncontrolled', 'Controlled', 'Read-only', 'Invalid'],
    answer: 'Controlled',
    difficulty: 'medium',
    estimatedTime: 40,
    explanation: 'The input value is fully driven by React state, making it a controlled component.',
    references: ['https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components']
  },
  {
    level: 'MID',
    topic: 'Lists',
    subtopic: 'Key anti-patterns',
    type: 'mcq',
    prompt: 'Which `key` choice is most likely to cause subtle bugs when reordering a list?',
    options: [
      'A stable unique ID from the backend.',
      'The array index.',
      'A UUID generated once and stored with the item.',
      'A database primary key.'
    ],
    answer: 'The array index.',
    difficulty: 'medium',
    estimatedTime: 50,
    explanation: 'Using the index as key breaks identity when items are reordered, causing incorrect preservation of state.',
    references: ['https://react.dev/learn/rendering-lists#where-to-get-your-key']
  },
  {
    level: 'MID',
    topic: 'Performance',
    subtopic: 'useMemo basics',
    type: 'mcq',
    prompt: 'What is the primary purpose of `useMemo`?',
    options: [
      'To replace all state logic.',
      'To memoize expensive computations based on dependencies.',
      'To prevent all re-renders.',
      'To manage side effects.'
    ],
    answer: 'To memoize expensive computations based on dependencies.',
    difficulty: 'medium',
    estimatedTime: 50,
    explanation: '`useMemo` caches the result of a computation until its dependencies change.',
    references: ['https://react.dev/reference/react/useMemo']
  },
  {
    level: 'MID',
    topic: 'Performance',
    subtopic: 'useCallback basics',
    type: 'mcq',
    prompt: 'Why would you use `useCallback` around an event handler?',
    options: [
      'To make the handler run faster.',
      'To keep the same function reference between renders when dependencies do not change.',
      'To automatically batch state updates.',
      'To avoid writing `useEffect`.'
    ],
    answer: 'To keep the same function reference between renders when dependencies do not change.',
    difficulty: 'medium',
    estimatedTime: 50,
    explanation: '`useCallback` memoizes the function identity, which can help with referential equality checks in children.',
    references: ['https://react.dev/reference/react/useCallback']
  },
  {
    level: 'MID',
    topic: 'TypeScript',
    subtopic: 'Props typing',
    type: 'mcq',
    prompt: "You have this component:\n\nYou have this code:\n```tsx\ntype ButtonProps = {\n  label: string\n  onClick: () => void\n}\n\nfunction Button({ label, onClick }: ButtonProps) {\n  return <button onClick={onClick}>{label}</button>\n}\n```\nWhat is true about this typing?",
    options: [
      '`label` is optional.',
      '`onClick` must be a function with no parameters and no return value.',
      '`onClick` can accept any arguments.',
      'The component cannot be used in JSX.'
    ],
    answer: '`onClick` must be a function with no parameters and no return value.',
    difficulty: 'medium',
    estimatedTime: 60,
    explanation: 'The type `() => void` describes a function with no parameters and no meaningful return value.',
    references: ['https://www.typescriptlang.org/docs/handbook/2/functions.html']
  },

  // ADVANCED

  {
    level: 'ADVANCED',
    topic: 'Rendering',
    subtopic: 'Batched updates',
    type: 'mcq',
    prompt: "You have this code:\n\nYou have this code:\n```jsx\nfunction Counter() {\n  const [count, setCount] = useState(0)\n\n  function handleClick() {\n    setTimeout(() => {\n      setCount(count + 1)\n      setCount(count + 1)\n    }, 0)\n  }\n\n  return <button onClick={handleClick}>{count}</button>\n}\n```\nIn React 18, after one click, what value is displayed?",
    options: ['0', '1', '2', 'It is non-deterministic'],
    answer: '1',
    difficulty: 'hard',
    estimatedTime: 90,
    explanation: 'Inside the timeout, both updates capture the same stale `count` value (0). In React 18, updates in many async contexts are still batched, so the final state is 1.',
    references: ['https://react.dev/learn/queueing-a-series-of-state-updates']
  },
  {
    level: 'ADVANCED',
    topic: 'Rendering',
    subtopic: 'Functional vs non-functional updates',
    type: 'mcq',
    prompt: "You have this code:\n\nYou have this code:\n```jsx\nfunction Counter() {\n  const [count, setCount] = useState(0)\n\n  function handleClick() {\n    setTimeout(() => {\n      setCount(c => c + 1)\n      setCount(c => c + 1)\n    }, 0)\n  }\n\n  return <button onClick={handleClick}>{count}</button>\n}\n```\nIn React 18, after one click, what value is displayed?",
    options: ['0', '1', '2', '3'],
    answer: '2',
    difficulty: 'hard',
    estimatedTime: 90,
    explanation: 'Functional updates always read the latest queued state, even in async contexts, so two increments from 0 result in 2.',
    references: ['https://react.dev/learn/queueing-a-series-of-state-updates']
  },
  {
    level: 'ADVANCED',
    topic: 'Effects',
    subtopic: 'Double invocation in StrictMode',
    type: 'theory',
    prompt: "You have this code:\n\nYou have this code:\n```jsx\nfunction Logger() {\n  useEffect(() => {\n    console.log('effect')\n    return () => console.log('cleanup')\n  }, [])\n\n  return null\n}\n```\nIn development with React StrictMode enabled, how many times can `effect` and `cleanup` be logged on initial mount, and why?",
    options: null,
    answer: 'In development StrictMode, React intentionally mounts, unmounts, and remounts components to surface unsafe effects. So `effect` can run twice and `cleanup` once on initial mount, even though there is only one real user-visible mount.',
    difficulty: 'hard',
    estimatedTime: 120,
    explanation: 'React 18 StrictMode double-invokes effects in development to help detect side-effect bugs. This does not happen in production.',
    references: ['https://react.dev/reference/react/StrictMode']
  },
  {
    level: 'ADVANCED',
    topic: 'Performance',
    subtopic: 'useMemo misuse',
    type: 'mcq',
    prompt: 'Which of the following is a good rule of thumb for using `useMemo`?',
    options: [
      'Wrap every computation in `useMemo`.',
      'Only use `useMemo` when a computation is expensive and its dependencies change infrequently.',
      'Use `useMemo` to prevent all re-renders.',
      'Use `useMemo` instead of `useState`.'
    ],
    answer: 'Only use `useMemo` when a computation is expensive and its dependencies change infrequently.',
    difficulty: 'medium',
    estimatedTime: 60,
    explanation: '`useMemo` itself has overhead; it is most useful when it avoids a significantly more expensive computation.',
    references: ['https://react.dev/reference/react/useMemo']
  },
  {
    level: 'ADVANCED',
    topic: 'Architecture',
    subtopic: 'State colocation',
    type: 'theory',
    prompt: 'Explain the concept of state colocation in React and why it improves maintainability and performance.',
    options: null,
    answer: 'State colocation means keeping state as close as possible to the components that actually use it. This reduces unnecessary prop drilling, avoids global overreach, minimizes re-renders of unrelated parts of the tree, and makes the data flow easier to reason about.',
    difficulty: 'medium',
    estimatedTime: 90,
    explanation: 'Colocating state prevents over-centralization and keeps components focused on the data they truly own.',
    references: ['https://react.dev/learn/sharing-state-between-components']
  },
  {
    level: 'ADVANCED',
    topic: 'TypeScript',
    subtopic: 'Optional parameters',
    type: 'mcq',
    prompt: "You have this TypeScript function type:\n\nYou have this code:\n```ts\ntype Handler = (url: string, source?: string) => void\n```\nWhich statement is correct?",
    options: [
      'This is invalid because optional parameters must be first.',
      'This is valid; optional parameters must come after required ones.',
      'This is invalid because functions cannot have optional parameters.',
      'This is only valid in JavaScript, not TypeScript.'
    ],
    answer: 'This is valid; optional parameters must come after required ones.',
    difficulty: 'medium',
    estimatedTime: 60,
    explanation: 'TypeScript requires optional parameters to come after required ones, and this signature respects that rule.',
    references: ['https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters']
  },
  {
    level: 'ADVANCED',
    topic: 'TypeScript',
    subtopic: 'Callback typing',
    type: 'mcq',
    prompt: "You have this prop type:\n\nYou have this code:\n```ts\ntype Props = {\n  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void\n}\n```\nWhich usage is type-safe?",
    options: [
      '<button onClick={() => onClick("test")}>Click</button>',
      '<button onClick={onClick}>Click</button>',
      '<button onClick={(e: string) => onClick(e)}>Click</button>',
      '<button onClick={onClick(123)}>Click</button>'
    ],
    answer: '<button onClick={onClick}>Click</button>',
    difficulty: 'hard',
    estimatedTime: 70,
    explanation: 'The prop expects a function that receives a MouseEvent; passing `onClick` directly matches that signature.',
    references: ['https://react.dev/reference/react-dom/components/button']
  },

  // SENIOR

  {
    level: 'SENIOR',
    topic: 'Rendering internals',
    subtopic: 'Reconciliation',
    type: 'theory',
    prompt: 'Describe how React uses keys during reconciliation when rendering lists, and what can go wrong if keys are unstable or derived from array indices.',
    options: null,
    answer: 'React uses keys to match elements between renders. If keys are stable and unique, React can preserve state and DOM nodes correctly. If keys are unstable or based on indices, reordering or inserting items can cause React to associate the wrong state with the wrong item, leading to subtle UI bugs and incorrect behavior.',
    difficulty: 'hard',
    estimatedTime: 120,
    explanation: 'Keys are an identity mechanism for React’s diffing algorithm; unstable keys break that identity.',
    references: ['https://react.dev/learn/rendering-lists#where-to-get-your-key']
  },
  {
    level: 'SENIOR',
    topic: 'Concurrency',
    subtopic: 'Transitions',
    type: 'mcq',
    prompt: "You have this code:\n\nYou have this code:\n```jsx\nfunction SearchPage() {\n  const [query, setQuery] = useState('')\n  const [isPending, startTransition] = useTransition()\n\n  function handleChange(e) {\n    const value = e.target.value\n    setQuery(value)\n    startTransition(() => {\n      // expensive filtering based on value\n    })\n  }\n\n  return (\n    <>\n      <input value={query} onChange={handleChange} />\n      {isPending && <span>Loading…</span>}\n    </>\n  )\n}\n```\nWhat is the purpose of `startTransition` here?",
    options: [
      'To make the input controlled.',
      'To mark the expensive update as low priority so the input stays responsive.',
      'To prevent the effect from running.',
      'To batch all state updates forever.'
    ],
    answer: 'To mark the expensive update as low priority so the input stays responsive.',
    difficulty: 'hard',
    estimatedTime: 90,
    explanation: '`startTransition` tells React that the wrapped updates are non-urgent, allowing urgent updates like typing to stay responsive.',
    references: ['https://react.dev/reference/react/useTransition']
  },
  {
    level: 'SENIOR',
    topic: 'Architecture',
    subtopic: 'Legacy refactor',
    type: 'debug',
    prompt: "You have this legacy component:\n\nYou have this code:\n```jsx\nfunction Chat({ roomId }) {\n  const [messages, setMessages] = useState([])\n\n  useEffect(() => {\n    const connection = connect(roomId)\n    connection.onMessage(msg => {\n      messages.push(msg)\n      setMessages(messages)\n    })\n  }, [])\n\n  return (\n    <ul>\n      {messages.map((m, index) => (\n        <li key={index}>{m.text}</li>\n      ))}\n    </ul>\n  )\n}\n```\nIdentify at least two serious issues and describe how to fix them.",
    options: null,
    answer: 'First, the effect has an empty dependency array but uses `roomId` and `messages`, which can lead to stale values and incorrect behavior when `roomId` changes. Second, it mutates `messages` with `messages.push(msg)` and then calls `setMessages(messages)`, which reuses the same array reference. Fixes: include `roomId` in the dependency array, use functional updates like `setMessages(prev => [...prev, msg])`, and add a cleanup to unsubscribe or disconnect when the room changes or unmounts.',
    difficulty: 'hard',
    estimatedTime: 150,
    explanation: 'This snippet combines stale closures, mutation, missing cleanup, and index keys—classic legacy pitfalls.',
    references: ['https://react.dev/learn/synchronizing-with-effects', 'https://react.dev/learn/updating-arrays-in-state']
  },
  {
    level: 'SENIOR',
    topic: 'State management',
    subtopic: 'Derived state',
    type: 'mcq',
    prompt: "You have this code:\n\nYou have this code:\n```jsx\nfunction Cart({ items }) {\n  const [total, setTotal] = useState(0)\n\n  useEffect(() => {\n    let sum = 0\n    for (const item of items) {\n      sum += item.price\n    }\n    setTotal(sum)\n  }, [items])\n\n  return <div>Total: {total}</div>\n}\n```\nWhat is a better pattern for `total`?",
    options: [
      'Keep it in state as shown.',
      'Compute it directly during render from `items`.',
      'Store it in a ref.',
      'Move it to context.'
    ],
    answer: 'Compute it directly during render from `items`.',
    difficulty: 'medium',
    estimatedTime: 80,
    explanation: 'Total is fully derivable from `items`; storing it in state risks inconsistencies and is unnecessary.',
    references: ['https://react.dev/learn/choosing-the-state-structure#avoid-duplication-in-state']
  },
  {
    level: 'SENIOR',
    topic: 'TypeScript',
    subtopic: 'Discriminated unions for UI state',
    type: 'theory',
    prompt: 'Explain how discriminated unions in TypeScript can be used to model complex UI states (e.g., "idle", "loading", "success", "error") in a React component, and why this is safer than using multiple loosely related booleans.',
    options: null,
    answer: 'Discriminated unions let you define a single `state` object with a `status` field (e.g., "idle" | "loading" | "success" | "error") and associated data for each case. In React, this ensures that only valid combinations of status and data exist at compile time. It avoids impossible states like `isLoading && hasError && data != null` and makes exhaustive handling in render logic easier and safer.',
    difficulty: 'hard',
    estimatedTime: 120,
    explanation: 'Discriminated unions encode UI state as a closed set of variants, which TypeScript can check exhaustively.',
    references: ['https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'JSX',
    subtopic: 'Children',
    type: 'mcq',
    prompt: "What does JSX compile into?",
    options: [
      'HTML',
      'Browser DOM nodes',
      'JavaScript function calls (e.g., React.createElement)',
      'JSON'
    ],
    answer: 'JavaScript function calls (e.g., React.createElement)',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'JSX is syntactic sugar for React.createElement calls.',
    references: ['https://react.dev/learn/writing-markup-with-jsx']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'Props',
    subtopic: 'Read-only',
    type: 'mcq',
    prompt: "Why are props considered read-only in React?",
    options: [
      'Because React freezes all objects',
      'Because mutating props breaks unidirectional data flow',
      'Because props are stored in the DOM',
      'Because props are global variables'
    ],
    answer: 'Because mutating props breaks unidirectional data flow',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'Props must not be mutated; they represent external input.',
    references: ['https://react.dev/learn/passing-props-to-a-component']
  },
  {
    level: 'MID',
    topic: 'State',
    subtopic: 'Functional updates',
    type: 'mcq',
    prompt: "You have this code:\n\nYou have this code:\n```jsx\nfunction Counter() {\n  const [n, setN] = useState(0)\n  const increment = () => {\n    setN(n + 1)\n    setN(prev => prev + 1)\n  }\n  return <button onClick={increment}>{n}</button>\n}\n```\nWhat is the value after one click?",
    options: ['0', '1', '2', '3'],
    answer: '2',
    difficulty: 'medium',
    estimatedTime: 40,
    explanation: 'First update uses stale n=0 → schedules 1. Second uses latest queued value → 2.',
    references: ['https://react.dev/learn/queueing-a-series-of-state-updates']
  },
  {
    level: 'MID',
    topic: 'Effects',
    subtopic: 'Dependencies',
    type: 'mcq',
    prompt: "You have this code:\n\nYou have this code:\n```jsx\nfunction Fetcher({ id }) {\n  useEffect(() => {\n    fetch(`/api/${id}`)\n  }, [])\n  return null\n}\n```\nWhat is the issue?",
    options: [
      'fetch cannot be used in effects',
      'The dependency array must include id',
      'Effects cannot return nothing',
      'This will cause an infinite loop'
    ],
    answer: 'The dependency array must include id',
    difficulty: 'medium',
    estimatedTime: 40,
    explanation: 'The effect ignores changes to id.',
    references: ['https://react.dev/learn/synchronizing-with-effects']
  },
  {
    level: 'MID',
    topic: 'Rendering',
    subtopic: 'Keys',
    type: 'mcq',
    prompt: "Which key choice is the worst for a dynamic list?",
    options: ['Database ID', 'UUID stored with item', 'Array index', 'Stable slug'],
    answer: 'Array index',
    difficulty: 'medium',
    estimatedTime: 40,
    explanation: 'Index keys break identity when items reorder.',
    references: ['https://react.dev/learn/rendering-lists']
  },
  {
    level: 'ADVANCED',
    topic: 'Effects',
    subtopic: 'Cleanup',
    type: 'mcq',
    prompt: "You have this code:\n\nYou have this code:\n```jsx\nuseEffect(() => {\n  const id = setInterval(() => console.log('tick'), 1000)\n}, [])\n```\nWhat is the problem?",
    options: [
      'Intervals cannot be used in effects',
      'Missing cleanup: clearInterval(id)',
      'The dependency array is wrong',
      'Nothing is wrong'
    ],
    answer: 'Missing cleanup: clearInterval(id)',
    difficulty: 'medium',
    estimatedTime: 40,
    explanation: 'Effects that subscribe or schedule work must clean up.',
    references: ['https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed']
  },
  {
    level: 'ADVANCED',
    topic: 'Performance',
    subtopic: 'useCallback',
    type: 'mcq',
    prompt: "When does `useCallback` help performance?",
    options: [
      'Always',
      'When child components rely on referential equality of callbacks',
      'When you want to avoid effects',
      'When you want to avoid state'
    ],
    answer: 'When child components rely on referential equality of callbacks',
    difficulty: 'medium',
    estimatedTime: 40,
    explanation: 'useCallback helps when memoized children depend on stable function references.',
    references: ['https://react.dev/reference/react/useCallback']
  },
  {
    level: 'ADVANCED',
    topic: 'Refs',
    subtopic: 'DOM access',
    type: 'mcq',
    prompt: "You have this code:\n\nYou have this code:\n```jsx\nfunction Input() {\n  const ref = useRef()\n  return <input ref={ref} />\n}\n```\nWhat does `ref.current` contain?",
    options: [
      'The input value',
      'A function',
      'The DOM element',
      'A React component instance'
    ],
    answer: 'The DOM element',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'useRef gives access to the underlying DOM node.',
    references: ['https://react.dev/reference/react/useRef']
  },
  {
    level: 'SENIOR',
    topic: 'Rendering internals',
    subtopic: 'Batched updates',
    type: 'mcq',
    prompt: "In React 18, which updates are batched by default?",
    options: [
      'Only event handlers',
      'Only async updates',
      'All updates (sync + async)',
      'No updates are batched'
    ],
    answer: 'All updates (sync + async)',
    difficulty: 'hard',
    estimatedTime: 60,
    explanation: 'React 18 introduced automatic batching for all updates.',
    references: ['https://react.dev/learn/queueing-a-series-of-state-updates#react-batches-state-updates']
  },
  {
    level: 'SENIOR',
    topic: 'Debugging',
    subtopic: 'Stale closures',
    type: 'mcq',
    prompt: "You have this code:\n\nYou have this code:\n```jsx\nfunction Example() {\n  const [count, setCount] = useState(0)\n\n  function logLater() {\n    setTimeout(() => console.log(count), 1000)\n  }\n\n  return <button onClick={logLater}>Log</button>\n}\n```\nYou click the button at count=5. What prints?",
    options: ['0', '5', 'undefined', 'It throws'],
    answer: '0',
    difficulty: 'hard',
    estimatedTime: 60,
    explanation: 'The timeout callback captures the initial stale value of count.',
    references: ['https://react.dev/learn/synchronizing-with-effects']
  },
  {
    level: 'SENIOR',
    topic: 'Rendering',
    subtopic: 'Reconciliation',
    type: 'mcq',
    prompt: "React's reconciliation algorithm primarily compares:",
    options: [
      'DOM nodes directly',
      'Virtual DOM elements and their keys',
      'Component instances',
      'Browser layout trees'
    ],
    answer: 'Virtual DOM elements and their keys',
    difficulty: 'hard',
    estimatedTime: 60,
    explanation: 'React compares element types and keys to decide whether to reuse or recreate subtrees.',
    references: ['https://react.dev/learn/render-and-commit']
  },
  {
    level: 'SENIOR',
    topic: 'Rendering',
    subtopic: 'Fiber scheduling',
    type: 'mcq',
    prompt: "What does React Fiber enable?",
    options: [
      'Server-side rendering only',
      'Interruptible rendering and prioritization',
      'Automatic memoization of all components',
      'DOM diffing without keys'
    ],
    answer: 'Interruptible rendering and prioritization',
    difficulty: 'hard',
    estimatedTime: 70,
    explanation: 'Fiber breaks work into units that can be paused, resumed, or aborted.',
    references: ['https://react.dev/learn/react-compiler#react-fiber']
  },
  {
    level: 'SENIOR',
    topic: 'Architecture',
    subtopic: 'Component boundaries',
    type: 'mcq',
    prompt: "Which component should own state in a deeply nested tree?",
    options: [
      'The root component',
      'The nearest common ancestor of components that need the state',
      'The leaf component',
      'A global context provider'
    ],
    answer: 'The nearest common ancestor of components that need the state',
    difficulty: 'medium',
    estimatedTime: 50,
    explanation: 'State should be colocated with the components that use it.',
    references: ['https://react.dev/learn/sharing-state-between-components']
  },
  {
    level: 'ARCHITECT',
    topic: 'Composition',
    subtopic: 'Tree structure',
    type: 'mcq',
    prompt: "Given this component tree:\n\n```\n<App>\n  ├─ <Header />\n  ├─ <Sidebar />\n  └─ <Content>\n       ├─ <Article />\n       └─ <Comments />\n```\nWhere should global navigation state live?",
    options: [
      '<Header />',
      '<Sidebar />',
      '<Content />',
      '<App />'
    ],
    answer: '<App />',
    difficulty: 'hard',
    estimatedTime: 70,
    explanation: 'Navigation state is shared across top-level UI regions, so it belongs at the root.',
    references: []
  },
  {
    level: 'ARCHITECT',
    topic: 'Composition',
    subtopic: 'Leaf components',
    type: 'mcq',
    prompt: "Leaf components should ideally:",
    options: [
      'Own global state',
      'Perform data fetching',
      'Be pure and stateless when possible',
      'Manage routing logic'
    ],
    answer: 'Be pure and stateless when possible',
    difficulty: 'medium',
    estimatedTime: 40,
    explanation: 'Leaf components should focus on rendering, not orchestration.',
    references: []
  },
  {
    level: 'SENIOR',
    topic: 'Rendering',
    subtopic: 'Commit phase',
    type: 'mcq',
    prompt: "Which operations occur during React's commit phase?",
    options: [
      'Diffing virtual DOM trees',
      'Scheduling updates',
      'Applying DOM mutations',
      'Computing memoized values'
    ],
    answer: 'Applying DOM mutations',
    difficulty: 'hard',
    estimatedTime: 60,
    explanation: 'The commit phase applies changes to the DOM and runs layout effects.',
    references: ['https://react.dev/learn/render-and-commit#the-commit-phase']
  },
  {
    level: 'SENIOR',
    topic: 'Rendering',
    subtopic: 'Render phase',
    type: 'mcq',
    prompt: "Which statement about the render phase is correct?",
    options: [
      'It may run multiple times before committing',
      'It always runs exactly once per update',
      'It mutates the DOM',
      'It cannot be interrupted'
    ],
    answer: 'It may run multiple times before committing',
    difficulty: 'hard',
    estimatedTime: 60,
    explanation: 'The render phase is pure and may be re-run for concurrency or debugging.',
    references: ['https://react.dev/learn/render-and-commit']
  },
  {
    level: 'ARCHITECT',
    topic: 'Composition',
    subtopic: 'Top-level components',
    type: 'mcq',
    prompt: "Which of the following is a good architectural rule for top-level components?",
    options: [
      'They should contain minimal logic and delegate to feature modules',
      'They should contain all business logic',
      'They should manage all state for the application',
      'They should render all leaf components directly'
    ],
    answer: 'They should contain minimal logic and delegate to feature modules',
    difficulty: 'hard',
    estimatedTime: 70,
    explanation: 'Top-level components should orchestrate, not implement business logic.',
    references: []
  },
  {
    level: 'ARCHITECT',
    topic: 'Composition',
    subtopic: 'Tree depth',
    type: 'mcq',
    prompt: "Deep component trees often cause:",
    options: [
      'Better performance',
      'More predictable rendering',
      'Prop drilling and unnecessary re-renders',
      'Automatic memoization'
    ],
    answer: 'Prop drilling and unnecessary re-renders',
    difficulty: 'medium',
    estimatedTime: 50,
    explanation: 'Deep trees increase coupling and reduce clarity.',
    references: []
  },
  {
    level: 'SENIOR',
    topic: 'Rendering',
    subtopic: 'Key stability',
    type: 'mcq',
    prompt: "Why must keys be stable across renders?",
    options: [
      'To improve CSS performance',
      'To allow React to preserve component state correctly',
      'To avoid hydration errors',
      'To prevent bundler warnings'
    ],
    answer: 'To allow React to preserve component state correctly',
    difficulty: 'medium',
    estimatedTime: 40,
    explanation: 'Keys determine identity; unstable keys break state continuity.',
    references: ['https://react.dev/learn/rendering-lists']
  },
  {
    level: 'ARCHITECT',
    topic: 'Composition',
    subtopic: 'Feature boundaries',
    type: 'mcq',
    prompt: "Which is the best way to structure a large React application?",
    options: [
      'By file type (components/, hooks/, utils/)',
      'By feature domain (auth/, dashboard/, profile/)',
      'By component size (small/, medium/, large/)',
      'By number of props'
    ],
    answer: 'By feature domain (auth/, dashboard/, profile/)',
    difficulty: 'hard',
    estimatedTime: 70,
    explanation: 'Feature-based architecture scales better and reduces cross-module coupling.',
    references: []
  },
  {
    level: 'SENIOR',
    topic: 'Rendering',
    subtopic: 'Fiber priorities',
    type: 'mcq',
    prompt: "What does React use to decide which updates should be processed first?",
    options: [
      'The order in which setState is called',
      'The size of the component tree',
      'Update lanes and priority levels',
      'The number of props a component has'
    ],
    answer: 'Update lanes and priority levels',
    difficulty: 'hard',
    estimatedTime: 60,
    explanation: 'React assigns updates to lanes with different priorities, enabling concurrent rendering.',
    references: []
  },
  {
    level: 'SENIOR',
    topic: 'Rendering',
    subtopic: 'Tree diffing',
    type: 'mcq',
    prompt: "React’s diffing algorithm assumes:",
    options: [
      'The entire tree must be re-rendered every time',
      'Components with the same type and key are the same node',
      'DOM nodes never change',
      'Keys are optional and rarely needed'
    ],
    answer: 'Components with the same type and key are the same node',
    difficulty: 'hard',
    estimatedTime: 60,
    explanation: 'Type + key define identity during reconciliation.',
    references: []
  },
  {
    level: 'ARCHITECT',
    topic: 'Composition',
    subtopic: 'Tree structure',
    type: 'mcq',
    prompt: "Given this UI tree:\n\n```\n<App>\n  ├─ <AuthProvider>\n  │     └─ <UserMenu />\n  ├─ <ThemeProvider>\n  │     └─ <Layout>\n  │          ├─ <Sidebar />\n  │          └─ <Content />\n  └─ <Notifications />\n```\nWhere should theme state live?",
    options: [
      '<App />',
      '<ThemeProvider />',
      '<Sidebar />',
      '<Content />'
    ],
    answer: '<ThemeProvider />',
    difficulty: 'hard',
    estimatedTime: 70,
    explanation: 'Theme state belongs in the provider that controls theme context.',
    references: []
  },
  {
    level: 'ARCHITECT',
    topic: 'Composition',
    subtopic: 'Root vs leaf responsibilities',
    type: 'mcq',
    prompt: "Which responsibility belongs to a root-level component?",
    options: [
      'Rendering low-level UI widgets',
      'Managing global providers (auth, theme, routing)',
      'Formatting dates',
      'Rendering table rows'
    ],
    answer: 'Managing global providers (auth, theme, routing)',
    difficulty: 'medium',
    estimatedTime: 50,
    explanation: 'Root components orchestrate global context and app-wide concerns.',
    references: []
  },
  {
    level: 'SENIOR',
    topic: 'Rendering',
    subtopic: 'Pure components',
    type: 'mcq',
    prompt: "A component wrapped in React.memo will re-render when:",
    options: [
      'Any parent re-renders',
      'Its props change by shallow comparison',
      'The DOM changes',
      'The component has internal state'
    ],
    answer: 'Its props change by shallow comparison',
    difficulty: 'medium',
    estimatedTime: 50,
    explanation: 'React.memo prevents re-renders unless props change shallowly.',
    references: []
  },
  {
    level: 'SENIOR',
    topic: 'Rendering',
    subtopic: 'Render phase characteristics',
    type: 'mcq',
    prompt: "Which statement about the render phase is correct?",
    options: [
      'It can mutate the DOM',
      'It must be pure and free of side effects',
      'It always runs once per update',
      'It cannot be interrupted'
    ],
    answer: 'It must be pure and free of side effects',
    difficulty: 'hard',
    estimatedTime: 60,
    explanation: 'The render phase is pure; side effects belong in the commit phase.',
    references: []
  },
  {
    level: 'ARCHITECT',
    topic: 'Composition',
    subtopic: 'Feature boundaries',
    type: 'mcq',
    prompt: "Which folder structure scales best for large React applications?",
    options: [
      'By file type (components/, hooks/, utils/)',
      'By feature domain (billing/, auth/, dashboard/)',
      'By component size (small/, medium/, large/)',
      'By number of props'
    ],
    answer: 'By feature domain (billing/, auth/, dashboard/)',
    difficulty: 'hard',
    estimatedTime: 70,
    explanation: 'Feature-based architecture reduces coupling and improves maintainability.',
    references: []
  },
  {
    level: 'SENIOR',
    topic: 'Rendering',
    subtopic: 'State granularity',
    type: 'mcq',
    prompt: "Which state structure minimizes unnecessary re-renders?",
    options: [
      'One giant state object for the entire app',
      'Deeply nested state objects',
      'Multiple small, colocated pieces of state',
      'State stored in global variables'
    ],
    answer: 'Multiple small, colocated pieces of state',
    difficulty: 'medium',
    estimatedTime: 50,
    explanation: 'Colocating state reduces the surface area of re-renders.',
    references: []
  },
  {
    level: 'ARCHITECT',
    topic: 'Composition',
    subtopic: 'Tree depth',
    type: 'mcq',
    prompt: "Deep component trees often lead to:",
    options: [
      'Better performance',
      'Simpler debugging',
      'Prop drilling and unnecessary re-renders',
      'Automatic memoization'
    ],
    answer: 'Prop drilling and unnecessary re-renders',
    difficulty: 'medium',
    estimatedTime: 50,
    explanation: 'Deep trees increase coupling and reduce clarity.',
    references: []
  },
  {
    level: 'SENIOR',
    topic: 'Rendering',
    subtopic: 'Key stability',
    type: 'mcq',
    prompt: "Why must keys be stable across renders?",
    options: [
      'To improve CSS performance',
      'To allow React to preserve component state correctly',
      'To avoid hydration errors',
      'To prevent bundler warnings'
    ],
    answer: 'To allow React to preserve component state correctly',
    difficulty: 'medium',
    estimatedTime: 40,
    explanation: 'Keys determine identity; unstable keys break state continuity.',
    references: []
  },
  {
    level: 'ARCHITECT',
    topic: 'Composition',
    subtopic: 'State ownership',
    type: 'mcq',
    prompt: "Which component should own state shared by <Sidebar /> and <Content />?\n\n```\n<App>\n  ├─ <Sidebar />\n  └─ <Content />\n```\n",
    options: [
      '<Sidebar />',
      '<Content />',
      '<App />',
      'A random leaf component'
    ],
    answer: '<App />',
    difficulty: 'medium',
    estimatedTime: 50,
    explanation: 'State belongs to the nearest common ancestor.',
    references: []
  },
  {
    level: 'SENIOR',
    topic: 'Rendering',
    subtopic: 'Concurrent rendering',
    type: 'mcq',
    prompt: "What is a key benefit of React’s concurrent rendering?",
    options: [
      'It guarantees faster rendering',
      'It allows React to pause and resume rendering work',
      'It removes the need for memoization',
      'It prevents all re-renders'
    ],
    answer: 'It allows React to pause and resume rendering work',
    difficulty: 'hard',
    estimatedTime: 60,
    explanation: 'Concurrent rendering enables interruptible work, improving responsiveness.',
    references: []
  },
  {
    level: 'SENIOR',
    topic: 'Rendering',
    subtopic: 'Transitions',
    type: 'mcq',
    prompt: "What is the purpose of `startTransition`?",
    options: [
      'To batch all updates forever',
      'To mark updates as low priority',
      'To prevent re-renders',
      'To memoize state'
    ],
    answer: 'To mark updates as low priority',
    difficulty: 'hard',
    estimatedTime: 60,
    explanation: 'Transitions allow urgent updates (like typing) to stay responsive.',
    references: []
  },
  {
    level: 'ARCHITECT',
    topic: 'Composition',
    subtopic: 'Tree architecture',
    type: 'mcq',
    prompt: "Given this tree:\n\n```\n<App>\n  ├─ <AuthProvider>\n  │     └─ <UserPanel />\n  ├─ <ThemeProvider>\n  │     └─ <Layout>\n  │          ├─ <Sidebar />\n  │          └─ <Content />\n  └─ <AnalyticsProvider />\n```\nWhere should user authentication state live?",
    options: [
      '<App />',
      '<AuthProvider />',
      '<Sidebar />',
      '<Content />'
    ],
    answer: '<AuthProvider />',
    difficulty: 'hard',
    estimatedTime: 70,
    explanation: 'Auth state belongs in the provider that exposes authentication context.',
    references: []
  },
  {
    level: 'ARCHITECT',
    topic: 'Composition',
    subtopic: 'Component boundaries',
    type: 'mcq',
    prompt: "Which is a good rule for designing component boundaries?",
    options: [
      'Group components by file type',
      'Group components by feature domain',
      'Group components by number of props',
      'Group components by visual size'
    ],
    answer: 'Group components by feature domain',
    difficulty: 'medium',
    estimatedTime: 50,
    explanation: 'Feature-based boundaries scale better and reduce coupling.',
    references: []
  },
  {
    level: 'SENIOR',
    topic: 'Rendering',
    subtopic: 'Commit phase',
    type: 'mcq',
    prompt: "Which operations occur during the commit phase?",
    options: [
      'Diffing virtual DOM trees',
      'Running layout effects and applying DOM mutations',
      'Computing memoized values',
      'Scheduling updates'
    ],
    answer: 'Running layout effects and applying DOM mutations',
    difficulty: 'hard',
    estimatedTime: 60,
    explanation: 'The commit phase applies changes to the DOM and runs layout effects.',
    references: []
  },
  {
    level: 'SENIOR',
    topic: 'Rendering',
    subtopic: 'Render phase',
    type: 'mcq',
    prompt: "Which statement about the render phase is true?",
    options: [
      'It mutates the DOM',
      'It must be pure and free of side effects',
      'It always runs once per update',
      'It cannot be interrupted'
    ],
    answer: 'It must be pure and free of side effects',
    difficulty: 'hard',
    estimatedTime: 60,
    explanation: 'The render phase is pure; side effects belong in the commit phase.',
    references: []
  },
  {
    level: 'ARCHITECT',
    topic: 'Composition',
    subtopic: 'State ownership',
    type: 'mcq',
    prompt: "Which component should own shared state between <Header /> and <Sidebar />?\n\n```\n<App>\n  ├─ <Header />\n  └─ <Sidebar />\n```\n",
    options: [
      '<Header />',
      '<Sidebar />',
      '<App />',
      'A leaf component'
    ],
    answer: '<App />',
    difficulty: 'medium',
    estimatedTime: 50,
    explanation: 'State belongs to the nearest common ancestor.',
    references: []
  },
  {
    level: 'SENIOR',
    topic: 'Rendering',
    subtopic: 'Key stability',
    type: 'mcq',
    prompt: "Why must keys be stable across renders?",
    options: [
      'To improve CSS performance',
      'To allow React to preserve component state correctly',
      'To avoid hydration errors',
      'To prevent bundler warnings'
    ],
    answer: 'To allow React to preserve component state correctly',
    difficulty: 'medium',
    estimatedTime: 40,
    explanation: 'Keys determine identity; unstable keys break state continuity.',
    references: []
  },
  {
    level: 'ARCHITECT',
    topic: 'Composition',
    subtopic: 'Tree depth',
    type: 'mcq',
    prompt: "Deep component trees often lead to:",
    options: [
      'Better performance',
      'Simpler debugging',
      'Prop drilling and unnecessary re-renders',
      'Automatic memoization'
    ],
    answer: 'Prop drilling and unnecessary re-renders',
    difficulty: 'medium',
    estimatedTime: 50,
    explanation: 'Deep trees increase coupling and reduce clarity.',
    references: []
  },
  {
    level: 'SENIOR',
    topic: 'Rendering',
    subtopic: 'State granularity',
    type: 'mcq',
    prompt: "Which state structure minimizes unnecessary re-renders?",
    options: [
      'One giant state object for the entire app',
      'Deeply nested state objects',
      'Multiple small, colocated pieces of state',
      'State stored in global variables'
    ],
    answer: 'Multiple small, colocated pieces of state',
    difficulty: 'medium',
    estimatedTime: 50,
    explanation: 'Colocating state reduces the surface area of re-renders.',
    references: []
  }
]
