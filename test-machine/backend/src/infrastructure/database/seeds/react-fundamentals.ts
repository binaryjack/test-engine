import { QuestionBuilder } from "../utils/question-builder"
import { MCQ_FUNDAMENTALS } from "./presets"

// --- Topic Presets ---
const jsx = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('JSX');
const components = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Components');
const state = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('State');
const props = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Props');
const lists = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Lists');
const events = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Events');
const fragments = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Fragments');
const forms = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Controlled inputs');
const conditionalRendering = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Conditional rendering');
const tooling = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Tooling');

export const reactFundamentalsQuestions = [
  // JSX
  new QuestionBuilder()
    .inherits(jsx)
    .setSubtopic('Syntax')
    .setPrompt("Which attribute should you use in JSX to set an element's CSS class?")
    .setOptions(['class', 'className', 'classList', 'cssClass'])
    .setAnswer('className')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('JSX uses `className` instead of `class` because `class` is a reserved word in JavaScript.')
    .setReferences(['https://react.dev/learn/rendering-elements']),

  new QuestionBuilder()
    .inherits(jsx)
    .setSubtopic('Expressions')
    .setPrompt('How do you embed a JavaScript expression inside JSX markup?')
    .setOptions(['`{ expression }`', '`( expression )`', '`<% expression %>`', '`${expression}`'])
    .setAnswer('`{ expression }`')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Wrap any JavaScript expression in curly braces inside JSX.')
    .setReferences(['https://react.dev/learn/rendering-elements#using-expressions-in-jsx']),

  new QuestionBuilder()
    .inherits(jsx)
    .setSubtopic('Children')
    .setPrompt("What does JSX compile into?")
    .setOptions(['HTML', 'Browser DOM nodes', 'JavaScript function calls (e.g., React.createElement)', 'JSON'])
    .setAnswer('JavaScript function calls (e.g., React.createElement)')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('JSX is syntactic sugar for React.createElement calls.')
    .setReferences(['https://react.dev/learn/writing-markup-with-jsx']),

  // Components
  new QuestionBuilder()
    .inherits(components)
    .setSubtopic('Function components')
    .setPrompt('What should a React function component return?')
    .setOptions(['A Promise', 'A JSX element or null', 'A DOM node object', 'A React hook'])
    .setAnswer('A JSX element or null')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Function components return JSX or null.')
    .setReferences(['https://react.dev/learn/function-components']),

  new QuestionBuilder()
    .inherits(components)
    .setSubtopic('Exports')
    .setPrompt('What is the difference between a default export and a named export for a React component?')
    .setOptions([
      'Default export requires braces when importing',
      'Named export allows a single default per file',
      'Default export can be imported without braces, named exports require braces',
      'Named exports are private to the module'
    ])
    .setAnswer('Default export can be imported without braces, named exports require braces')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Default exports are imported without curly braces; named exports must be imported using their exported name inside braces.')
    .setReferences(['https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export']),

  // State
  new QuestionBuilder()
    .inherits(state)
    .setSubtopic('useState')
    .setPrompt('Which hook adds local state to a functional component?')
    .setOptions(['useLocal', 'useState', 'useEffect', 'useMemo'])
    .setAnswer('useState')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('useState returns a state value and a setter function.')
    .setReferences(['https://react.dev/reference/react/useState']),

  new QuestionBuilder()
    .inherits(state)
    .setSubtopic('Initial value')
    .setPrompt("You have this code:\n```jsx\nconst [count, setCount] = useState(0)\n```\nWhat is the initial value of count?")
    .setOptions(['undefined', 'null', '0', 'NaN'])
    .setAnswer('0')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('The argument passed to useState is the initial value.')
    .setReferences(['https://react.dev/learn/state-a-components-memory']),

  // Props
  new QuestionBuilder()
    .inherits(props)
    .setSubtopic('Passing data')
    .setPrompt('How do you pass data from a parent component to a child component?')
    .setOptions(['Using props', 'Using localStorage', 'Using refs', 'Using CSS variables'])
    .setAnswer('Using props')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Props are the standard way to pass data from parent to child.')
    .setReferences(['https://react.dev/learn/passing-data-to-a-component']),

  new QuestionBuilder()
    .inherits(props)
    .setSubtopic('Read-only')
    .setPrompt("Why are props considered read-only in React?")
    .setOptions([
      'Because React freezes all objects',
      'Because mutating props breaks unidirectional data flow',
      'Because props are stored in the DOM',
      'Because props are global variables'
    ])
    .setAnswer('Because mutating props breaks unidirectional data flow')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Props represent external input and should not be mutated.')
    .setReferences(['https://react.dev/learn/passing-props-to-a-component']),

  // Lists
  new QuestionBuilder()
    .inherits(lists)
    .setSubtopic('Keys')
    .setPrompt('What is the purpose of the key prop when rendering lists in React?')
    .setOptions(['Style list items', 'Track identity of list items for reconciliation', 'Set tab order', 'Provide a unique id'])
    .setAnswer('Track identity of list items for reconciliation')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Keys help React identify which items changed, were added, or removed.')
    .setReferences(['https://react.dev/learn/rendering-lists#keys']),

  // Events
  new QuestionBuilder()
    .inherits(events)
    .setSubtopic('Form handling')
    .setPrompt('How do you prevent a form from performing a full page reload in a React onSubmit handler?')
    .setOptions(['return false', 'call event.preventDefault()', 'set form.noAuto = true', 'wrap handler in try/catch'])
    .setAnswer('call event.preventDefault()')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Call event.preventDefault() to stop the browser from submitting the form.')
    .setReferences(['https://react.dev/learn/handling-events']),

  // Fragments
  new QuestionBuilder()
    .inherits(fragments)
    .setSubtopic('Grouping elements')
    .setPrompt('What is the use of React.Fragment (<>...</>)?')
    .setOptions(['Wrap multiple elements without adding an extra DOM node', 'Create a portal', 'Lazy-load components', 'Memoize children'])
    .setAnswer('Wrap multiple elements without adding an extra DOM node')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Fragments let you return multiple elements without an unnecessary wrapper element.')
    .setReferences(['https://react.dev/learn/fragments']),

  // Tooling
  new QuestionBuilder()
    .inherits(tooling)
    .setSubtopic('File extensions')
    .setPrompt('Which file extension is used for React components written with TypeScript and JSX?')
    .setOptions(['.ts', '.tsx', '.jsx', '.js'])
    .setAnswer('.tsx')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('TypeScript + JSX files use the .tsx extension.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/jsx.html'])
];
