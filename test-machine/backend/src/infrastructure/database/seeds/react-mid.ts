import { QuestionBuilder } from "../utils/question-builder"
import { MCQ_MID } from "./presets"

// --- Topic Presets ---
const hooks = new QuestionBuilder().inherits(MCQ_MID).setTopic('Hooks');
const useStatePreset = new QuestionBuilder().inherits(hooks).setSubtopic('useState');
const useEffectPreset = new QuestionBuilder().inherits(hooks).setSubtopic('useEffect');
const useMemoPreset = new QuestionBuilder().inherits(hooks).setSubtopic('useMemo');
const useCallbackPreset = new QuestionBuilder().inherits(hooks).setSubtopic('useCallback');
const useRefPreset = new QuestionBuilder().inherits(hooks).setSubtopic('useRef');
const useContextPreset = new QuestionBuilder().inherits(hooks).setSubtopic('useContext');
const useReducerPreset = new QuestionBuilder().inherits(hooks).setSubtopic('useReducer');

const patterns = new QuestionBuilder().inherits(MCQ_MID).setTopic('Component Patterns');
const events = new QuestionBuilder().inherits(MCQ_MID).setTopic('Events');
const forms = new QuestionBuilder().inherits(MCQ_MID).setTopic('Forms');
const rendering = new QuestionBuilder().inherits(MCQ_MID).setTopic('Rendering');
const props = new QuestionBuilder().inherits(MCQ_MID).setTopic('Props');
const performance = new QuestionBuilder().inherits(MCQ_MID).setTopic('Performance');
const stateManagement = new QuestionBuilder().inherits(MCQ_MID).setTopic('State Management');
const customHooks = new QuestionBuilder().inherits(MCQ_MID).setTopic('Custom Hooks');
const errorHandling = new QuestionBuilder().inherits(MCQ_MID).setTopic('Error Handling');
const portals = new QuestionBuilder().inherits(MCQ_MID).setTopic('Portals');
const suspense = new QuestionBuilder().inherits(MCQ_MID).setTopic('Suspense');
const react19 = new QuestionBuilder().inherits(MCQ_MID).setTopic('React 19');
const testing = new QuestionBuilder().inherits(MCQ_MID).setTopic('Testing');
const a11y = new QuestionBuilder().inherits(MCQ_MID).setTopic('Accessibility');
const typescript = new QuestionBuilder().inherits(MCQ_MID).setTopic('TypeScript');
const internals = new QuestionBuilder().inherits(MCQ_MID).setTopic('Internals');
const tooling = new QuestionBuilder().inherits(MCQ_MID).setTopic('Tooling');

export const reactMidQuestions = [
  // Hooks - useState
  new QuestionBuilder()
    .inherits(useStatePreset)
    .setPrompt('What does useState return?')
    .setOptions(['A single state value', 'A tuple of [currentState, updaterFunction]', 'A Promise', 'An object'])
    .setAnswer('A tuple of [currentState, updaterFunction]')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('useState returns a tuple: the current state value and a setter function.')
    .setReferences(['https://react.dev/reference/react/useState']),

  new QuestionBuilder()
    .inherits(useStatePreset)
    .setPrompt('Given the following state:\n```tsx\nconst [count, setCount] = useState(0)\n```\nWhat happens when you call `setCount(count + 1)` inside an event handler that fires twice rapidly?')
    .setOptions(['count increments by 2', 'count increments by 1 because state batching uses stale closure values', 'count increments by 1 because React deduplicates updates', 'A re-render error is thrown'])
    .setAnswer('count increments by 1 because state batching uses stale closure values')
    .setDifficulty(3)
    .setEstimatedTime(90)
    .setExplanation('setCount(count + 1) uses the closed-over count value. Use functional form to avoid this.')
    .setReferences(['https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state']),

  new QuestionBuilder()
    .inherits(useStatePreset)
    .setPrompt('Which of the following correctly initializes state lazily in React?')
    .setOptions(['useState(expensiveComputation())', 'useState(() => expensiveComputation())', 'useLazyState(expensiveComputation)', 'useState(null); useEffect(...)'])
    .setAnswer('useState(() => expensiveComputation())')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Passing an initializer function to useState ensures it only runs once on mount.')
    .setReferences(['https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state']),

  new QuestionBuilder()
    .inherits(useStatePreset)
    .setPrompt('Which statement about setState in a functional component is TRUE?')
    .setOptions(['Calling setState always causes synchronous re-render', 'Setting state to same value always re-renders', 'React may batch multiple setState calls', 'setState replaces the entire state tree'])
    .setAnswer('React may batch multiple setState calls into a single re-render')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('React batches state updates to optimize performance.')
    .setReferences(['https://react.dev/learn/queueing-a-series-of-state-updates']),

  // Hooks - useEffect
  new QuestionBuilder()
    .inherits(useEffectPreset)
    .setPrompt('What is the purpose of the cleanup function returned by useEffect?')
    .setOptions(['Reset state', 'Cancel or undo side effects before next run/unmount', 'Prevent first render', 'Run synchronously'])
    .setAnswer('Cancel or undo side effects before next run/unmount')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('The cleanup function runs before unmount and before the effect re-runs.')
    .setReferences(['https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development']),

  new QuestionBuilder()
    .inherits(useEffectPreset)
    .setPrompt('A useEffect with an empty dependency array [] runs:')
    .setOptions(['On every render', 'Only on mount and unmount', 'Only when re-renders due to parent changes', 'Never'])
    .setAnswer('Only on mount and unmount')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('An empty dependency array tells React the effect has no dependencies.')
    .setReferences(['https://react.dev/reference/react/useEffect#parameters']),

  new QuestionBuilder()
    .inherits(useEffectPreset)
    .setPrompt('In React Strict Mode (development), why does useEffect fire twice on mount?')
    .setOptions(['Bug in React', 'React remounts to verify cleanup functions work', 'Strict Mode runs effects twice', 'Enables concurrent features'])
    .setAnswer('React mounts, unmounts, then remounts to verify cleanup functions work correctly')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('React remounts components in development to help detect missing cleanups.')
    .setReferences(['https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development']),

  new QuestionBuilder()
    .inherits(useEffectPreset)
    .setPrompt('Which pattern correctly fetches data and avoids a state update after unmount?')
    .setOptions(['useEffect(() => { fetch().then(...) })', 'useEffect(() => { let mounted = true; ...; return () => mounted = false })', 'useEffect(async () => ...)', 'useEffect(() => ..., [])'])
    .setAnswer('useEffect(() => {\n  let mounted = true;\n  fetch(url).then(res => {\n    if (mounted) setState(res)\n  });\n  return () => { mounted = false }\n}, [url])')
    .setDifficulty(3)
    .setEstimatedTime(90)
    .setExplanation('The mounted flag pattern prevents setting state on an unmounted component.')
    .setReferences(['https://react.dev/learn/you-might-not-need-an-effect#fetching-data']),

  // Hooks - useMemo/useCallback
  new QuestionBuilder()
    .inherits(useMemoPreset)
    .setPrompt('What does useMemo return?')
    .setOptions(['Memoized callback', 'Memoized result of a computation', 'Ref object', 'Promise'])
    .setAnswer('The memoized result of a computation')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('useMemo caches the return value of a computation.')
    .setReferences(['https://react.dev/reference/react/useMemo']),

  new QuestionBuilder()
    .inherits(useCallbackPreset)
    .setPrompt('When is useCallback MOST useful?')
    .setOptions(['Whenever you define a function', 'When passing stable callback to memoized child', 'To memoize expensive calculation', 'To run once on mount'])
    .setAnswer('When passing a stable callback reference to a memoized child to prevent unnecessary re-renders')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('useCallback is primarily useful when combined with React.memo on child components.')
    .setReferences(['https://react.dev/reference/react/useCallback#should-you-add-usecallback-everywhere']),

  // Hooks - useRef
  new QuestionBuilder()
    .inherits(useRefPreset)
    .setPrompt('Which of the following is a valid use case for useRef?')
    .setOptions(['Triggering re-render', 'Replacing useState', 'Storing mutable value that persists without re-renders', 'Running code after render'])
    .setAnswer('Storing a mutable value that persists across renders without triggering re-renders')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('useRef stores a mutable value that does not cause re-renders.')
    .setReferences(['https://react.dev/reference/react/useRef']),

  new QuestionBuilder()
    .inherits(useRefPreset)
    .setPrompt('When can you safely read or write to a DOM ref created with useRef?')
    .setOptions(['During render', 'In component body before return', 'After mount — inside useEffect or event handlers', 'During SSR'])
    .setAnswer('After the component mounts — inside useEffect or event handlers')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('React attaches DOM nodes to refs after the component renders and commits.')
    .setReferences(['https://react.dev/learn/manipulating-the-dom-with-refs#when-react-attaches-the-refs']),

  // Hooks - useContext
  new QuestionBuilder()
    .inherits(useContextPreset)
    .setPrompt('A component using useContext(ThemeContext) will re-render when:')
    .setOptions(['Any state changes', 'Provider re-renders regardless of value', 'Context value changes', 'Own state changes'])
    .setAnswer('The context value changes (using Object.is comparison)')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('useContext causes a re-render only when the context value changes.')
    .setReferences(['https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions']),

  new QuestionBuilder()
    .inherits(useContextPreset)
    .setPrompt('What value does useContext return when no Provider is found in the tree?')
    .setOptions(['null', 'undefined', 'Default value from createContext()', 'Throws error'])
    .setAnswer('The default value provided to createContext()')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('useContext returns the defaultValue passed to createContext.')
    .setReferences(['https://react.dev/reference/react/useContext#usage']),

  // Hooks - useReducer
  new QuestionBuilder()
    .inherits(useReducerPreset)
    .setPrompt('When should you prefer useReducer over useState?')
    .setOptions(['Primitive value state', 'Complex state logic with multiple sub-values', 'Data fetching', 'Always'])
    .setAnswer('When next state depends on the previous state and involves multiple sub-values')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('useReducer is preferred for complex state logic.')
    .setReferences(['https://react.dev/learn/extracting-state-logic-into-a-reducer']),

  // Component Patterns
  new QuestionBuilder()
    .inherits(patterns)
    .setSubtopic('Controlled vs Uncontrolled')
    .setPrompt('What is a "controlled component" in React?')
    .setOptions(['Wrapped in React.memo', 'Form element driven by React state', 'Cannot receive props', 'Rendered inside Portal'])
    .setAnswer('A form element whose value is driven by React state')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('A controlled component has its form data handled by React state.')
    .setReferences(['https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components']),

  new QuestionBuilder()
    .inherits(patterns)
    .setSubtopic('Lifting State')
    .setPrompt('Two sibling components need to share the same state. What is the React-recommended approach?')
    .setOptions(['localStorage', 'Global variable', 'Lift state up to common ancestor', 'useRef'])
    .setAnswer('Lift the state up to their closest common ancestor and pass it down via props')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('"Lifting state up" means moving shared state to the closest common ancestor.')
    .setReferences(['https://react.dev/learn/sharing-state-between-components']),

  new QuestionBuilder()
    .inherits(patterns)
    .setSubtopic('Composition')
    .setPrompt('What is the children prop in React?')
    .setOptions(['Lifecycle method', 'JSX elements passed between opening and closing tags', 'Hook for child access', 'Added by React for tracking hierarchy'])
    .setAnswer('A special prop containing JSX elements passed between the opening and closing tags of a component')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('The children prop holds whatever JSX is placed between component tags.')
    .setReferences(['https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children']),

  new QuestionBuilder()
    .inherits(patterns)
    .setSubtopic('React.memo')
    .setPrompt('What does React.memo do?')
    .setOptions(['Memoizes expensive calculation', 'Prevents functional component re-render if props unchanged', 'Caches component instances', 'Replaces shouldComponentUpdate'])
    .setAnswer('Prevents a functional component from re-rendering if its props have not changed (shallow comparison)')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('React.memo skips re-rendering when props are shallowly equal.')
    .setReferences(['https://react.dev/reference/react/memo']),

  new QuestionBuilder()
    .inherits(patterns)
    .setSubtopic('Forwarding Refs')
    .setPrompt('Why would you use React.forwardRef?')
    .setOptions(['Share state', 'Allow parent access to DOM node inside child via ref', 'Forward props without destructuring', 'Avoid prop drilling'])
    .setAnswer('To allow a parent to access a DOM node inside a child component via a ref')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('forwardRef lets a component expose a DOM node to its parent via the ref prop.')
    .setReferences(['https://react.dev/reference/react/forwardRef']),

  new QuestionBuilder()
    .inherits(patterns)
    .setSubtopic('Keys')
    .setPrompt('What is the correct way to use keys in lists?')
    .setOptions(['Array index', 'Stable, unique identifier from data', 'Optional', 'Math.random()'])
    .setAnswer('Use a stable, unique identifier from the data (e.g., item.id)')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('Keys must be stable, unique among siblings, and not derived from indexes if reordering.')
    .setReferences(['https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key']),

  new QuestionBuilder()
    .inherits(patterns)
    .setSubtopic('Keys')
    .setPrompt('A developer uses array index as a key on a list of form inputs. When an item is deleted from the middle, what bug might occur?')
    .setOptions(['Wrong item removed', 'Duplicate key error', 'Input values shift', 'Fails to re-render'])
    .setAnswer('Input values shift: the deleted item\'s value appears in the next input')
    .setDifficulty(3)
    .setEstimatedTime(90)
    .setExplanation('React reuses DOM nodes by position when using index as key.')
    .setReferences(['https://react.dev/learn/rendering-lists#why-does-react-need-keys']),

  // Events
  new QuestionBuilder()
    .inherits(events)
    .setSubtopic('Synthetic Events')
    .setPrompt('What is the correct way to prevent the default browser behavior in a React event handler?')
    .setOptions(['return false', 'Call event.preventDefault()', 'Set event.cancel = true', 'Call event.stopPropagation()'])
    .setAnswer('Call event.preventDefault()')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('In React, you must call event.preventDefault() explicitly.')
    .setReferences(['https://react.dev/learn/responding-to-events#preventing-default-behavior']),

  new QuestionBuilder()
    .inherits(events)
    .setSubtopic('Event Bubbling')
    .setPrompt('What does event.stopPropagation() do?')
    .setOptions(['Prevents event from reaching target', 'Stops event from bubbling up to parent elements', 'Prevents default browser action', 'Removes listener'])
    .setAnswer('Stops the event from bubbling up to parent elements')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('stopPropagation() stops the event from bubbling up the DOM tree.')
    .setReferences(['https://react.dev/learn/responding-to-events#stopping-propagation']),

  // Forms
  new QuestionBuilder()
    .inherits(forms)
    .setSubtopic('Controlled inputs')
    .setPrompt('You have an input with value prop but no onChange. What happens?')
    .setOptions(['Read-only', 'Works normally but warns', 'Becomes uncontrolled', 'Throws error'])
    .setAnswer('The input becomes read-only and the user cannot type in it')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('A controlled input with a value prop but no onChange becomes read-only.')
    .setReferences(['https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable']),

  new QuestionBuilder()
    .inherits(forms)
    .setSubtopic('Form submission')
    .setPrompt('How do you handle form submission in React without a page reload?')
    .setOptions(['Add action=""', 'Handle onSubmit and call event.preventDefault()', 'Use onAction', 'Add type="button"'])
    .setAnswer('Handle the `onSubmit` event and call `event.preventDefault()`')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Attach an onSubmit handler and call event.preventDefault().')
    .setReferences(['https://react.dev/learn/reacting-to-input-with-state']),

  // Rendering
  new QuestionBuilder()
    .inherits(rendering)
    .setSubtopic('Conditional Rendering')
    .setPrompt('What does this JSX render when count = 0?\n```tsx\n{count && <Spinner />}\n```')
    .setOptions(['Nothing', 'The number 0', '<Spinner />', 'null'])
    .setAnswer('The number `0` is rendered to the DOM')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('In JS, 0 && expr evaluates to 0. React renders 0 as text.')
    .setReferences(['https://react.dev/learn/conditional-rendering#logical-and-operator-']),

  new QuestionBuilder()
    .inherits(rendering)
    .setSubtopic('Lists')
    .setPrompt('What does React render when a component returns null?')
    .setOptions(['Empty div', 'Text "null"', 'Nothing', 'Error boundary fallback'])
    .setAnswer('Nothing — the component renders no DOM output')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Returning null from a component is a valid way to render nothing.')
    .setReferences(['https://react.dev/learn/conditional-rendering#conditionally-returning-nothing-with-null']),

  // Props
  new QuestionBuilder()
    .inherits(props)
    .setSubtopic('Prop drilling')
    .setPrompt('What is "prop drilling" and why is it a problem?')
    .setOptions(['Too many props warning', 'Passing props through intermediate components that don\'t use them', 'Dot notation drilling', 'Optimization technique'])
    .setAnswer('Passing props through many intermediate components that do not use them, causing maintenance burden')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('Prop drilling occurs when data must be passed through many layers.')
    .setReferences(['https://react.dev/learn/passing-data-deeply-with-context']),

  new QuestionBuilder()
    .inherits(props)
    .setSubtopic('Default props')
    .setPrompt('How do you define default prop values in a modern functional component?')
    .setOptions(['Component.defaultProps', 'Default parameter values in function destructuring', 'Both preferred', 'defaultProps hook'])
    .setAnswer('Using default parameter values in function destructuring: `function Btn({ color = "red" })`')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Modern React uses JavaScript default parameter values.')
    .setReferences(['https://react.dev/reference/react/Component#static-defaultprops']),

  // Performance
  new QuestionBuilder()
    .inherits(performance)
    .setSubtopic('Reconciliation')
    .setPrompt('What is React reconciliation?')
    .setOptions(['Merging updates', 'Diffing Virtual DOM to update real DOM efficiently', 'Async loading', 'Sync context'])
    .setAnswer('The algorithm React uses to diff the virtual DOM and update the real DOM efficiently')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('Reconciliation is React\'s diffing algorithm.')
    .setReferences(['https://react.dev/learn/preserving-and-resetting-state']),

  new QuestionBuilder()
    .inherits(performance)
    .setSubtopic('Code splitting')
    .setPrompt('Which React API enables lazy loading of a component?')
    .setOptions(['React.suspend()', 'React.lazy() with Suspense', 'React.defer()', 'React.async()'])
    .setAnswer('React.lazy() with Suspense')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('React.lazy() lets you defer loading a component until rendered.')
    .setReferences(['https://react.dev/reference/react/lazy']),

  new QuestionBuilder()
    .inherits(performance)
    .setSubtopic('Memoization')
    .setPrompt('What is the primary purpose of useMemo in React?')
    .setOptions(['Cache DOM nodes', 'Memoize expensive computation results', 'Prevent all re-renders', 'Replace useEffect'])
    .setAnswer('Memoize an expensive computation result until dependencies change')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('useMemo caches the result of a function.')
    .setReferences(['https://react.dev/reference/react/useMemo']),

  // State Management
  new QuestionBuilder()
    .inherits(stateManagement)
    .setSubtopic('Immutability')
    .setPrompt('Why should you treat React state as immutable?')
    .setOptions(['JS objects are frozen', 'React compares state by reference', 'Mutations cause memory leaks', 'Convention only'])
    .setAnswer('React compares state by reference — mutating state directly prevents React from detecting changes and triggering re-renders')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('React uses Object.is to compare state.')
    .setReferences(['https://react.dev/learn/updating-objects-in-state#why-is-mutating-state-not-recommended-in-react']),

  new QuestionBuilder()
    .inherits(stateManagement)
    .setSubtopic('Immutability')
    .setPrompt('How do you correctly update a nested object in React state?')
    .setOptions(['state.user.name = "Alice"', 'setState({ ...state, user: { ...state.user, name: "Alice" } })', 'Object.assign', 'useState allows mutation'])
    .setAnswer('```jsx\nsetState({ ...state, user: { ...state.user, name: "Alice" } })\n```')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('You must create a new object at every level you want to update.')
    .setReferences(['https://react.dev/learn/updating-objects-in-state#copying-objects-with-the-spread-syntax']),

  new QuestionBuilder()
    .inherits(stateManagement)
    .setSubtopic('Derived state')
    .setPrompt('You have items in state and need to show filtered items. What is the best approach?')
    .setOptions(['Separate state with useEffect', 'Compute directly during render', 'Store in ref', 'useReducer'])
    .setAnswer('Compute filtered items directly during render from the items state')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Derived state should be calculated during render.')
    .setReferences(['https://react.dev/learn/you-might-not-need-an-effect#caching-expensive-calculations']),

  // Custom Hooks
  new QuestionBuilder()
    .inherits(customHooks)
    .setSubtopic('Naming convention')
    .setPrompt('What is the naming requirement for a custom hook?')
    .setOptions(['Ends with Hook', 'Starts with use', 'Exported from hooks.ts', 'None'])
    .setAnswer('It must start with "use" (e.g., useFetchData)')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('React requires custom hooks to start with "use".')
    .setReferences(['https://react.dev/learn/reusing-logic-with-custom-hooks#hook-names-always-start-with-use']),

  // Error Handling
  new QuestionBuilder()
    .inherits(errorHandling)
    .setSubtopic('Error Boundaries')
    .setPrompt('Error Boundaries in React can catch errors thrown in:')
    .setOptions(['Event handlers, async code, render', 'Render methods, lifecycle methods, constructors of children', 'Only event handlers', 'Only async'])
    .setAnswer('Render methods, lifecycle methods, and constructors of child components')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Error Boundaries catch errors during rendering, lifecycle, and constructors.')
    .setReferences(['https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary']),

  // Portals
  new QuestionBuilder()
    .inherits(portals)
    .setSubtopic('createPortal')
    .setPrompt('What is a React Portal used for?')
    .setOptions(['Separate window', 'Render into different DOM node outside parent hierarchy', 'Lazy-loaded routes', 'Teleport state'])
    .setAnswer('Rendering children into a different DOM node outside the parent component\'s DOM hierarchy')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('Portals render JSX into a different DOM node.')
    .setReferences(['https://react-dom/createPortal']),

  // React 19
  new QuestionBuilder()
    .inherits(react19)
    .setSubtopic('use hook')
    .setPrompt('In React 19, the use hook can be called:')
    .setOptions(['Only top level', 'Inside conditionals, loops, after early returns', 'Only Server Components', 'Only Context'])
    .setAnswer('Inside conditionals, loops, and after early returns — it is not a hook in the traditional sense')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('The use() hook in React 19 can be called conditionally.')
    .setReferences(['https://react.dev/reference/react/use']),

  new QuestionBuilder()
    .inherits(react19)
    .setSubtopic('Actions')
    .setPrompt('What are React 19 Actions and useActionState?')
    .setOptions(['Redux action creators', 'Pattern for handling async transitions from forms', 'WebSocket handlers', 'Replacement for useReducer'])
    .setAnswer('A pattern for handling async transitions from form submissions, with built-in pending/error state management')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('React 19 Actions allow forms to have async action functions.')
    .setReferences(['https://react.dev/reference/react/useActionState']),

  // Accessibility
  new QuestionBuilder()
    .inherits(a11y)
    .setSubtopic('ARIA')
    .setPrompt('You render a loading spinner. What ARIA attribute should it have?')
    .setOptions(['aria-disabled', 'role="status" with aria-live="polite"', 'tabindex', 'aria-hidden'])
    .setAnswer('role="status" with aria-live="polite" or aria-label describing the loading state')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Spinners should have role="status" so screen readers announce it.')
    .setReferences(['https://www.w3.org/WAI/ARIA/apg/patterns/spinners/']),

  // Tooling
  new QuestionBuilder()
    .inherits(tooling)
    .setSubtopic('Vite')
    .setPrompt('What command creates a new Vite + React + TypeScript project?')
    .setOptions(['create-react-app', 'npm create vite@latest -- --template react-ts', 'npx react-scripts', 'npm install vite react'])
    .setAnswer('npm create vite@latest my-app -- --template react-ts')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('The official Vite scaffolding command is npm create vite@latest.')
    .setReferences(['https://vitejs.dev/guide/#scaffolding-your-first-vite-project'])
];
