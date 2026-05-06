import { QuestionBuilder } from "../utils/question-builder";
import { components, events, fragments, jsx, lists, props, state, tooling } from "./presets";


export const reactFundamentalsQuestions = [
  // JSX
  new QuestionBuilder()
    .inherits(jsx)
    .setSubtopic('Syntax')
    .setPrompt("Which attribute should you use in JSX to set an element's CSS class?")
    .setOptions(['0, ```ts\nclass\n```', '1, ```ts\nclassName\n```', '2, ```ts\nclassList\n```', '3, ```ts\ncssClass\n```'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('JSX uses ```ts\nclassName\n``` instead of ```ts\nclass\n``` because ```ts\nclass\n``` is a reserved word in JavaScript.')
    .setReferences(['https://react.dev/learn/rendering-elements'])
    .build(),

  new QuestionBuilder()
    .inherits(jsx)
    .setSubtopic('Expressions')
    .setPrompt('How do you embed a JavaScript expression inside JSX markup?')
    .setOptions(['0, ```tsx\n{ expression }\n```', '1, ```tsx\n( expression )\n```', '2, ```tsx\n<% expression %>\n```', '3, ```tsx\n${expression}\n```'])
    .setAnswer('0')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Wrap any JavaScript expression in curly braces inside JSX.')
    .setReferences(['https://react.dev/learn/rendering-elements#using-expressions-in-jsx'])
    .build(),

  new QuestionBuilder()
    .inherits(jsx)
    .setSubtopic('Children')
    .setPrompt("What does JSX compile into?")
    .setOptions(['0, HTML', '1, Browser DOM nodes', '2, JavaScript function calls (e.g., ```ts\nReact.createElement\n```)', '3, JSON'])
    .setAnswer('2')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('JSX is syntactic sugar for ```ts\nReact.createElement\n``` calls.')
    .setReferences(['https://react.dev/learn/writing-markup-with-jsx'])
    .build(),

  // Components
  new QuestionBuilder()
    .inherits(components)
    .setSubtopic('Function components')
    .setPrompt('What should a React function component return?')
    .setOptions(['0, A ```ts\nPromise\n```', '1, A JSX element or ```ts\nnull\n```', '2, A DOM node object', '3, A React hook'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Function components return JSX or ```ts\nnull\n```.')
    .setReferences(['https://react.dev/learn/function-components'])
    .build(),

  new QuestionBuilder()
    .inherits(components)
    .setSubtopic('Exports')
    .setPrompt('What is the difference between a default export and a named export for a React component?')
    .setOptions([
      '0, Default export requires braces when importing',
      '1, Named export allows a single default per file',
      '2, Default export can be imported without braces, named exports require braces',
      '3, Named exports are private to the module'
    ])
    .setAnswer('2')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Default exports are imported without curly braces; named exports must be imported using their exported name inside braces.')
    .setReferences(['https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export'])
    .build(),

  // State
  new QuestionBuilder()
    .inherits(state)
    .setSubtopic('useState')
    .setPrompt('Which hook adds local state to a functional component?')
    .setOptions(['0, ```ts\nuseLocal\n```', '1, ```ts\nuseState\n```', '2, ```ts\nuseEffect\n```', '3, ```ts\nuseMemo\n```'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('```ts\nuseState\n``` returns a state value and a setter function.')
    .setReferences(['https://react.dev/reference/react/useState'])
    .build(),

  new QuestionBuilder()
    .inherits(state)
    .setSubtopic('Initial value')
    .setPrompt("You have this code:\n```jsx\nconst [count, setCount] = useState(0)\n```\nWhat is the initial value of count?")
    .setOptions(['0, ```ts\nundefined\n```', '1, ```ts\nnull\n```', '2, `0`', '3, ```ts\nNaN\n```'])
    .setAnswer('2')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('The argument passed to ```ts\nuseState\n``` is the initial value.')
    .setReferences(['https://react.dev/learn/state-a-components-memory'])
    .build(),

  // Props
  new QuestionBuilder()
    .inherits(props)
    .setSubtopic('Passing data')
    .setPrompt('How do you pass data from a parent component to a child component?')
    .setOptions(['0, Using props', '1, Using ```ts\nlocalStorage\n```', '2, Using refs', '3, Using CSS variables'])
    .setAnswer('0')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Props are the standard way to pass data from parent to child.')
    .setReferences(['https://react.dev/learn/passing-data-to-a-component'])
    .build(),

  new QuestionBuilder()
    .inherits(props)
    .setSubtopic('Read-only')
    .setPrompt("Why are props considered read-only in React?")
    .setOptions([
      '0, Because React freezes all objects',
      '1, Because mutating props breaks unidirectional data flow',
      '2, Because props are stored in the DOM',
      '3, Because props are global variables'
    ])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Props represent external input and should not be mutated.')
    .setReferences(['https://react.dev/learn/passing-props-to-a-component'])
    .build(),

  // Lists
  new QuestionBuilder()
    .inherits(lists)
    .setSubtopic('Keys')
    .setPrompt('What is the purpose of the ```ts\nkey\n``` prop when rendering lists in React?')
    .setOptions(['0, Style list items', '1, Track identity of list items for reconciliation', '2, Set tab order', '3, Provide a unique id'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Keys help React identify which items changed, were added, or removed.')
    .setReferences(['https://react.dev/learn/rendering-lists#keys'])
    .build(),

  // Events
  new QuestionBuilder()
    .inherits(events)
    .setSubtopic('Form handling')
    .setPrompt('How do you prevent a form from performing a full page reload in a React ```ts\nonSubmit\n``` handler?')
    .setOptions(['0, ```ts\nreturn false\n```', '1, call ```ts\nevent.preventDefault()\n```', '2, set ```ts\nform.noAuto = true\n```', '3, wrap handler in ```ts\ntry/catch\n```'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Call ```ts\nevent.preventDefault()\n``` to stop the browser from submitting the form.')
    .setReferences(['https://react.dev/learn/handling-events'])
    .build(),

  // Fragments
  new QuestionBuilder()
    .inherits(fragments)
    .setSubtopic('Grouping elements')
    .setPrompt('What is the use of ```tsx\nReact.Fragment\n``` (`<>...</>`)?')
    .setOptions(['0, Wrap multiple elements without adding an extra DOM node', '1, Create a portal', '2, Lazy-load components', '3, Memoize children'])
    .setAnswer('0')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Fragments let you return multiple elements without an unnecessary wrapper element.')
    .setReferences(['https://react.dev/learn/fragments'])
    .build(),

  // Tooling
  new QuestionBuilder()
    .inherits(tooling)
    .setSubtopic('File extensions')
    .setPrompt('Which file extension is used for React components written with TypeScript and JSX?')
    .setOptions(['0, ```ts\n.ts\n```', '1, ```ts\n.tsx\n```', '2, ```ts\n.jsx\n```', '3, ```ts\n.js\n```'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('TypeScript + JSX files use the ```ts\n.tsx\n``` extension.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/jsx.html'])
    .build()
];
