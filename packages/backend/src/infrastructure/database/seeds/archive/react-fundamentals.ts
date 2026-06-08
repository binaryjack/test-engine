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
    options: ['`{ expression }`', '`( expression )`', '`<% expression %>`', '`${expression}`'],
    answer: '`{ expression }`',
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
    options: ['`useLocal`', '```jsx\n useState```', '```jsx\n useEffect```', '```jsx useMemo```'],
    answer: '```jsx\n useState```',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: '```jsx\n useState``` returns a state value and a setter function to update it inside function components.',
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
    options: ['`return false`', 'call `event.preventDefault()`', 'set `form.noAuto = true`', 'wrap handler in `try/catch`'],
    answer: 'call `event.preventDefault()`',
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
    prompt: 'What is the use of React.Fragment (```jsx\n <>...</>```)?',
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
      'Use `defaultValue` and no `onChange`',
      'Set the input `value` prop from state and update state in `onChange`',
      'Only read the DOM value when submitting the form',
      'Wrap the input in ```jsx\n React.memo```'
    ],
    answer: 'Set the input `value` prop from state and update state in `onChange`',
    difficulty: 'easy',
    estimatedTime: 45,
    explanation: 'A controlled input sets its `value` from state and updates state in an `onChange` handler so React owns the input value.',
    references: ['https://react.dev/learn/forms']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'JSX',
    subtopic: 'Expressions',
    type: 'mcq',
    prompt: 'In JSX, how do you embed a JavaScript expression inside markup?',
    options: ['`[ expression ]`', '`{{ expression }}`', '`{ expression }`', '`( expression )`'],
    answer: '`{ expression }`',
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
      '```jsx\nfunction MyComponent() { return <div /> }\n```',
      '```jsx\nconst MyComponent = <div />\n```',
      '```jsx\ncomponent MyComponent() => <div />\n```',
      '```jsx\nMyComponent() => { <div /> }\n```'
    ],
    answer: '```jsx\nfunction MyComponent() { return <div /> }\n```',
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
    prompt: 'How do you pass a prop called ```jsx\n title``` with value ```jsx\n "Hello"``` to a component```jsx\n Header```?',
    options: [
      '```jsx\n<Header props={{ title: "Hello" }} />\n```',
      '```jsx\n<Header title="Hello" />\n```',
      '```jsx\n<Header {title: "Hello"} />\n```',
      '```jsx\n<Header :title="Hello" />\n```'
    ],
    answer: '```jsx\n<Header title="Hello" />\n```',
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
    options: ['```jsx\n useEffect```', '```jsx\n useState```', '```jsx useMemo```', '```jsx useRef```'],
    answer: '```jsx\n useState```',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: '```jsx\n useState``` is the primary hook for adding local state to function components.',
    references: ['https://react.dev/learn/state-a-components-memory']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'State',
    subtopic: 'Initial value',
    type: 'mcq',
    prompt: "You have this code:\n```jsx\nfunction Counter() {\n  const [count, setCount] = useState(0)\n  return <button>{count}</button>\n}\n```\nWhat is the initial value of `count`?",
    options: ['`undefined`', '`null`', '`0`', '`NaN`'],
    answer: '`0`',
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
      '```jsx\n<button onclick={handleClick}>Click</button>\n```',
      '```jsx\n<button onClick="handleClick()">Click</button>\n```',
      '```jsx\n<button onClick={handleClick}>Click</button>\n```',
      '```jsx\n<button click={handleClick}>Click</button>\n```'
    ],
    answer: '```jsx\n<button onClick={handleClick}>Click</button>\n```',
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
      '`if/else` directly inside JSX',
      'The `?:` ternary operator or `&&` short-circuiting',
      '`switch/case` inside JSX tags',
      '`try/catch` inside JSX'
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
  {
    level: 'FUNDAMENTALS',
    topic: 'JSX',
    subtopic: 'Children',
    type: 'mcq',
    prompt: "What does JSX compile into?",
    options: [
      'HTML',
      'Browser DOM nodes',
      'JavaScript function calls (e.g., `React.createElement`)', 
      'JSON'
    ],
    answer: 'JavaScript function calls (e.g., `React.createElement`)', 
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'JSX is syntactic sugar for `React.createElement` calls.',
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
  }
]
