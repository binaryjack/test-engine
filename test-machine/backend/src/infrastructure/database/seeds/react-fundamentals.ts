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
  }
]
