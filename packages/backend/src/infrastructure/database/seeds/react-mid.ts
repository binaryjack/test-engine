import { QuestionBuilder } from "../utils/question-builder";
import { a11y, customHooks, errorHandling, events, forms, patterns, performance, portals, props, react19, rendering, stateManagement, tooling, useCallbackPreset, useContextPreset, useEffectPreset, useMemoPreset, useReducerPreset, useRefPreset, useStatePreset } from "./presets";



export const reactMidQuestions = [
  // Hooks - useState
  new QuestionBuilder()
    .inherits(useStatePreset)
    .setPrompt('What does ```ts\nuseState\n``` return?')
    .setOptions(['0, A single state value', '1, A tuple of ```ts\n[currentState, updaterFunction]\n```', '2, A ```ts\nPromise\n```', '3, An object'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('```ts\nuseState\n``` returns a tuple: the current state value and a setter function.')
    .setReferences(['https://react.dev/reference/react/useState'])
    .build(),

  new QuestionBuilder()
    .inherits(useStatePreset)
    .setPrompt('Given the following state:\n```tsx\nconst [count, setCount] = useState(0)\n```\nWhat happens when you call ```ts\nsetCount(count + 1)\n``` inside an event handler that fires twice rapidly?')
    .setOptions(['0, ```ts\ncount\n``` increments by 2', '1, ```ts\ncount\n``` increments by 1 because state batching uses stale closure values', '2, ```ts\ncount\n``` increments by 1 because React deduplicates updates', '3, A re-render error is thrown'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(90)
    .setExplanation('```ts\nsetCount(count + 1)\n``` uses the closed-over count value. Use functional form to avoid this.')
    .setReferences(['https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state'])
    .build(),

  new QuestionBuilder()
    .inherits(useStatePreset)
    .setPrompt('Which of the following correctly initializes state lazily in React?')
    .setOptions(['0, ```ts\nuseState(expensiveComputation())\n```', '1, ```ts\nuseState(() => expensiveComputation())\n```', '2, ```ts\nuseLazyState(expensiveComputation)\n```', '3, ```ts\nuseState(null); useEffect(...)\n```'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Passing an initializer function to ```ts\nuseState\n``` ensures it only runs once on mount.')
    .setReferences(['https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state'])
    .build(),

  new QuestionBuilder()
    .inherits(useStatePreset)
    .setPrompt('Which statement about ```ts\nsetState\n``` in a functional component is TRUE?')
    .setOptions(['0, Calling ```ts\nsetState\n``` always causes synchronous re-render', '1, Setting state to same value always re-renders', '2, React may batch multiple ```ts\nsetState\n``` calls', '3, ```ts\nsetState\n``` replaces the entire state tree'])
    .setAnswer('2')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('React batches state updates to optimize performance.')
    .setReferences(['https://react.dev/learn/queueing-a-series-of-state-updates'])
    .build(),

  // Hooks - useEffect
  new QuestionBuilder()
    .inherits(useEffectPreset)
    .setPrompt('What is the purpose of the cleanup function returned by ```ts\nuseEffect\n```?')
    .setOptions(['0, Reset state', '1, Cancel or undo side effects before next run/unmount', '2, Prevent first render', '3, Run synchronously'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('The cleanup function runs before unmount and before the effect re-runs.')
    .setReferences(['https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development'])
    .build(),

  new QuestionBuilder()
    .inherits(useEffectPreset)
    .setPrompt('A ```ts\nuseEffect\n``` with an empty dependency array ```ts\n[]\n``` runs:')
    .setOptions(['0, On every render', '1, Only on mount and unmount', '2, Only when re-renders due to parent changes', '3, Never'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('An empty dependency array tells React the effect has no dependencies.')
    .setReferences(['https://react.dev/reference/react/useEffect#parameters'])
    .build(),

  new QuestionBuilder()
    .inherits(useEffectPreset)
    .setPrompt('In React Strict Mode (development), why does ```ts\nuseEffect\n``` fire twice on mount?')
    .setOptions(['0, Bug in React', '1, React remounts to verify cleanup functions work', '2, Strict Mode runs effects twice', '3, Enables concurrent features'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('React remounts components in development to help detect missing cleanups.')
    .setReferences(['https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development'])
    .build(),

  new QuestionBuilder()
    .inherits(useEffectPreset)
    .setPrompt('Which pattern correctly fetches data and avoids a state update after unmount?')
    .setOptions(['0, ```ts\nuseEffect(() => { fetch().then(...) })\n```', '1, ```ts\nuseEffect(() => { let mounted = true; ...; return () => mounted = false })\n```', '2, ```ts\nuseEffect(async () => ...)\n```', '3, ```ts\nuseEffect(() => ..., [])\n```'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(90)
    .setExplanation('The mounted flag pattern prevents setting state on an unmounted component.')
    .setReferences(['https://react.dev/learn/you-might-not-need-an-effect#fetching-data'])
    .build(),

  // Hooks - useMemo/useCallback
  new QuestionBuilder()
    .inherits(useMemoPreset)
    .setPrompt('What does ```ts\nuseMemo\n``` return?')
    .setOptions(['0, Memoized callback', '1, Memoized result of a computation', '2, Ref object', '3, Promise'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('```ts\nuseMemo\n``` caches the return value of a computation.')
    .setReferences(['https://react.dev/reference/react/useMemo'])
    .build(),

  new QuestionBuilder()
    .inherits(useCallbackPreset)
    .setPrompt('When is ```ts\nuseCallback\n``` MOST useful?')
    .setOptions(['0, Whenever you define a function', '1, When passing stable callback to memoized child', '2, To memoize expensive calculation', '3, To run once on mount'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('```ts\nuseCallback\n``` is primarily useful when combined with ```tsx\nReact.memo\n``` on child components.')
    .setReferences(['https://react.dev/reference/react/useCallback#should-you-add-usecallback-everywhere'])
    .build(),

  // Hooks - useRef
  new QuestionBuilder()
    .inherits(useRefPreset)
    .setPrompt('Which of the following is a valid use case for ```ts\nuseRef\n```?')
    .setOptions(['0, Triggering re-render', '1, Replacing ```ts\nuseState\n```', '2, Storing mutable value that persists without re-renders', '3, Running code after render'])
    .setAnswer('2')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('```ts\nuseRef\n``` stores a mutable value that does not cause re-renders.')
    .setReferences(['https://react.dev/reference/react/useRef'])
    .build(),

  new QuestionBuilder()
    .inherits(useRefPreset)
    .setPrompt('When can you safely read or write to a DOM ref created with ```ts\nuseRef\n```?')
    .setOptions(['0, During render', '1, In component body before return', '2, After mount — inside ```ts\nuseEffect\n``` or event handlers', '3, During SSR'])
    .setAnswer('2')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('React attaches DOM nodes to refs after the component renders and commits.')
    .setReferences(['https://react.dev/learn/manipulating-the-dom-with-refs#when-react-attaches-the-refs'])
    .build(),

  // Hooks - useContext
  new QuestionBuilder()
    .inherits(useContextPreset)
    .setPrompt('A component using ```ts\nuseContext(ThemeContext)\n``` will re-render when:')
    .setOptions(['0, Any state changes', '1, Provider re-renders regardless of value', '2, Context value changes', '3, Own state changes'])
    .setAnswer('2')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('```ts\nuseContext\n``` causes a re-render only when the context value changes.')
    .setReferences(['https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions'])
    .build(),

  new QuestionBuilder()
    .inherits(useContextPreset)
    .setPrompt('What value does ```ts\nuseContext\n``` return when no Provider is found in the tree?')
    .setOptions(['0, ```ts\nnull\n```', '1, ```ts\nundefined\n```', '2, Default value from ```ts\ncreateContext()\n```', '3, Throws error'])
    .setAnswer('2')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('```ts\nuseContext\n``` returns the ```ts\ndefaultValue\n``` passed to ```ts\ncreateContext\n```.')
    .setReferences(['https://react.dev/reference/react/useContext#usage'])
    .build(),

  // Hooks - useReducer
  new QuestionBuilder()
    .inherits(useReducerPreset)
    .setPrompt('When should you prefer ```ts\nuseReducer\n``` over ```ts\nuseState\n```?')
    .setOptions(['0, Primitive value state', '1, Complex state logic with multiple sub-values', '2, Data fetching', '3, Always'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('```ts\nuseReducer\n``` is preferred for complex state logic.')
    .setReferences(['https://react.dev/learn/extracting-state-logic-into-a-reducer'])
    .build(),

  // Component Patterns
  new QuestionBuilder()
    .inherits(patterns)
    .setSubtopic('Controlled vs Uncontrolled')
    .setPrompt('What is a "controlled component" in React?')
    .setOptions(['0, Wrapped in ```tsx\nReact.memo\n```', '1, Form element driven by React state', '2, Cannot receive props', '3, Rendered inside Portal'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('A controlled component has its form data handled by React state.')
    .setReferences(['https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components'])
    .build(),

  new QuestionBuilder()
    .inherits(patterns)
    .setSubtopic('Lifting State')
    .setPrompt('Two sibling components need to share the same state. What is the React-recommended approach?')
    .setOptions(['0, ```ts\nlocalStorage\n```', '1, Global variable', '2, Lift state up to common ancestor', '3, ```ts\nuseRef\n```'])
    .setAnswer('2')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('"Lifting state up" means moving shared state to the closest common ancestor.')
    .setReferences(['https://react.dev/learn/sharing-state-between-components'])
    .build(),

  new QuestionBuilder()
    .inherits(patterns)
    .setSubtopic('Composition')
    .setPrompt('What is the ```ts\nchildren\n``` prop in React?')
    .setOptions(['0, Lifecycle method', '1, JSX elements passed between opening and closing tags', '2, Hook for child access', '3, Added by React for tracking hierarchy'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('The ```ts\nchildren\n``` prop holds whatever JSX is placed between component tags.')
    .setReferences(['https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children'])
    .build(),

  new QuestionBuilder()
    .inherits(patterns)
    .setSubtopic('React.memo')
    .setPrompt('What does ```tsx\nReact.memo\n``` do?')
    .setOptions(['0, Memoizes expensive calculation', '1, Prevents functional component re-render if props unchanged', '2, Caches component instances', '3, Replaces ```ts\nshouldComponentUpdate\n```'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('```tsx\nReact.memo\n``` skips re-rendering when props are shallowly equal.')
    .setReferences(['https://react.dev/reference/react/memo'])
    .build(),

  new QuestionBuilder()
    .inherits(patterns)
    .setSubtopic('Forwarding Refs')
    .setPrompt('Why would you use ```tsx\nReact.forwardRef\n```?')
    .setOptions(['0, Share state', '1, Allow parent access to DOM node inside child via ref', '2, Forward props without destructuring', '3, Avoid prop drilling'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('```tsx\nforwardRef\n``` lets a component expose a DOM node to its parent via the ref prop.')
    .setReferences(['https://react.dev/reference/react/forwardRef'])
    .build(),

  new QuestionBuilder()
    .inherits(patterns)
    .setSubtopic('Keys')
    .setPrompt('What is the correct way to use ```ts\nkeys\n``` in lists?')
    .setOptions(['0, Array index', '1, Stable, unique identifier from data', '2, Optional', '3, ```ts\nMath.random()\n```'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('Keys must be stable, unique among siblings, and not derived from indexes if reordering.')
    .setReferences(['https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key'])
    .build(),

  new QuestionBuilder()
    .inherits(patterns)
    .setSubtopic('Keys')
    .setPrompt('A developer uses array index as a key on a list of form inputs. When an item is deleted from the middle, what bug might occur?')
    .setOptions(['0, Wrong item removed', '1, Duplicate key error', '2, Input values shift', '3, Fails to re-render'])
    .setAnswer('2')
    .setDifficulty(3)
    .setEstimatedTime(90)
    .setExplanation('React reuses DOM nodes by position when using index as key.')
    .setReferences(['https://react.dev/learn/rendering-lists#why-does-react-need-keys'])
    .build(),

  // Events
  new QuestionBuilder()
    .inherits(events)
    .setSubtopic('Synthetic Events')
    .setPrompt('What is the correct way to prevent the default browser behavior in a React event handler?')
    .setOptions(['0, ```ts\nreturn false\n```', '1, Call ```ts\nevent.preventDefault()\n```', '2, Set ```ts\nevent.cancel = true\n```', '3, Call ```ts\nevent.stopPropagation()\n```'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('In React, you must call ```ts\nevent.preventDefault()\n``` explicitly.')
    .setReferences(['https://react.dev/learn/responding-to-events#preventing-default-behavior'])
    .build(),

  new QuestionBuilder()
    .inherits(events)
    .setSubtopic('Event Bubbling')
    .setPrompt('What does ```ts\nevent.stopPropagation()\n``` do?')
    .setOptions(['0, Prevents event from reaching target', '1, Stops event from bubbling up to parent elements', '2, Prevents default browser action', '3, Removes listener'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('```ts\nstopPropagation()\n``` stops the event from bubbling up the DOM tree.')
    .setReferences(['https://react.dev/learn/responding-to-events#stopping-propagation'])
    .build(),

  // Forms
  new QuestionBuilder()
    .inherits(forms)
    .setSubtopic('Controlled inputs')
    .setPrompt('You have an input with ```ts\nvalue\n``` prop but no ```ts\nonChange\n```. What happens?')
    .setOptions(['0, Read-only', '1, Works normally but warns', '2, Becomes uncontrolled', '3, Throws error'])
    .setAnswer('3')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('A controlled input with a ```ts\nvalue\n``` prop but no ```ts\nonChange\n``` becomes read-only.')
    .setReferences(['https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable'])
    .build(),

  new QuestionBuilder()
    .inherits(forms)
    .setSubtopic('Form submission')
    .setPrompt('How do you handle form submission in React without a page reload?')
    .setOptions(['0, Add ```ts\naction=""\n```', '1, Handle ```ts\nonSubmit\n``` and call ```ts\nevent.preventDefault()\n```', '2, Use ```ts\nonAction\n```', '3, Add ```ts\ntype="button"\n```'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Attach an ```ts\nonSubmit\n``` handler and call ```ts\nevent.preventDefault()\n```.')
    .setReferences(['https://react.dev/learn/reacting-to-input-with-state'])
    .build(),

  // Rendering
  new QuestionBuilder()
    .inherits(rendering)
    .setSubtopic('Conditional Rendering')
    .setPrompt('What does this JSX render when ```ts\ncount = 0\n```?\n```tsx\n{count && <Spinner />}\n```')
    .setOptions(['0, Nothing', '1, The number 0', '2, ```tsx\n<Spinner />\n```', '3, ```ts\nnull\n```'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('In JS, ```ts\n0 && expr\n``` evaluates to 0. React renders 0 as text.')
    .setReferences(['https://react.dev/learn/conditional-rendering#logical-and-operator-'])
    .build(),

  new QuestionBuilder()
    .inherits(rendering)
    .setSubtopic('Lists')
    .setPrompt('What does React render when a component returns ```ts\nnull\n```?')
    .setOptions(['0, Empty ```tsx\n<div>\n```', '1, Text "null"', '2, Nothing', '3, Error boundary fallback'])
    .setAnswer('2')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Returning ```ts\nnull\n``` from a component is a valid way to render nothing.')
    .setReferences(['https://react.dev/learn/conditional-rendering#conditionally-returning-nothing-with-null'])
    .build(),

  // Props
  new QuestionBuilder()
    .inherits(props)
    .setSubtopic('Prop drilling')
    .setPrompt('What is "prop drilling" and why is it a problem?')
    .setOptions(['0, Too many props warning', "1, Passing props through intermediate components that don't use them", '2, Dot notation drilling', '3, Optimization technique'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('Prop drilling occurs when data must be passed through many layers.')
    .setReferences(['https://react.dev/learn/passing-data-deeply-with-context'])
    .build(),

  new QuestionBuilder()
    .inherits(props)
    .setSubtopic('Default props')
    .setPrompt('How do you define default prop values in a modern functional component?')
    .setOptions(['0, ```ts\nComponent.defaultProps\n```', '1, Default parameter values in function destructuring', '2, Both preferred', '3, ```ts\ndefaultProps\n``` hook'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Modern React uses JavaScript default parameter values.')
    .setReferences(['https://react.dev/reference/react/Component#static-defaultprops'])
    .build(),

  // Performance
  new QuestionBuilder()
    .inherits(performance)
    .setSubtopic('Reconciliation')
    .setPrompt('What is React reconciliation?')
    .setOptions(['0, Merging updates', '1, Diffing Virtual DOM to update real DOM efficiently', '2, Async loading', '3, Sync context'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation("Reconciliation is React's diffing algorithm.")
    .setReferences(['https://react.dev/learn/preserving-and-resetting-state'])
    .build(),

  new QuestionBuilder()
    .inherits(performance)
    .setSubtopic('Code splitting')
    .setPrompt('Which React API enables lazy loading of a component?')
    .setOptions(['0, ```ts\nReact.suspend()\n```', '1, ```ts\nReact.lazy()\n``` with ```ts\nSuspense\n```', '2, ```ts\nReact.defer()\n```', '3, ```ts\nReact.async()\n```'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('```ts\nReact.lazy()\n``` lets you defer loading a component until rendered.')
    .setReferences(['https://react.dev/reference/react/lazy'])
    .build(),

  new QuestionBuilder()
    .inherits(performance)
    .setSubtopic('Memoization')
    .setPrompt('What is the primary purpose of ```ts\nuseMemo\n``` in React?')
    .setOptions(['0, Cache DOM nodes', '1, Memoize expensive computation results', '2, Prevent all re-renders', '3, Replace ```ts\nuseEffect\n```'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('```ts\nuseMemo\n``` caches the result of a function.')
    .setReferences(['https://react.dev/reference/react/useMemo'])
    .build(),

  // State Management
  new QuestionBuilder()
    .inherits(stateManagement)
    .setSubtopic('Immutability')
    .setPrompt('Why should you treat React state as immutable?')
    .setOptions(['0, JS objects are frozen', '1, React compares state by reference', '2, Mutations cause memory leaks', '3, Convention only'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('React uses ```ts\nObject.is\n``` to compare state.')
    .setReferences(['https://react.dev/learn/updating-objects-in-state#why-is-mutating-state-not-recommended-in-react'])
    .build(),

  new QuestionBuilder()
    .inherits(stateManagement)
    .setSubtopic('Immutability')
    .setPrompt('How do you correctly update a nested object in React state?')
    .setOptions(['0, ```ts\nstate.user.name = "Alice"\n```', '1, ```ts\nsetState({ ...state, user: { ...state.user, name: "Alice" } })\n```', '2, ```ts\nObject.assign\n```', '3, ```ts\nuseState\n``` allows mutation'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('You must create a new object at every level you want to update.')
    .setReferences(['https://react.dev/learn/updating-objects-in-state#copying-objects-with-the-spread-syntax'])
    .build(),

  new QuestionBuilder()
    .inherits(stateManagement)
    .setSubtopic('Derived state')
    .setPrompt('You have items in state and need to show filtered items. What is the best approach?')
    .setOptions(['0, Separate state with ```ts\nuseEffect\n```', '1, Compute directly during render', '2, Store in ```ts\nref\n```', '3, ```ts\nuseReducer\n```'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Derived state should be calculated during render.')
    .setReferences(['https://react.dev/learn/you-might-not-need-an-effect#caching-expensive-calculations'])
    .build(),

  // Custom Hooks
  new QuestionBuilder()
    .inherits(customHooks)
    .setSubtopic('Naming convention')
    .setPrompt('What is the naming requirement for a custom hook?')
    .setOptions(['0, Ends with ```ts\nHook\n```', '1, Starts with ```ts\nuse\n```', '2, Exported from ```ts\nhooks.ts\n```', '3, None'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('React requires custom hooks to start with "use".')
    .setReferences(['https://react.dev/learn/reusing-logic-with-custom-hooks#hook-names-always-start-with-use'])
    .build(),

  // Error Handling
  new QuestionBuilder()
    .inherits(errorHandling)
    .setSubtopic('Error Boundaries')
    .setPrompt('Error Boundaries in React can catch errors thrown in:')
    .setOptions(['0, Event handlers, async code, render', '1, Render methods, lifecycle methods, constructors of children', '2, Only event handlers', '3, Only async'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Error Boundaries catch errors during rendering, lifecycle, and constructors.')
    .setReferences(['https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary'])
    .build(),

  // Portals
  new QuestionBuilder()
    .inherits(portals)
    .setSubtopic('createPortal')
    .setPrompt('What is a React Portal used for?')
    .setOptions(['0, Separate window', '1, Render into different DOM node outside parent hierarchy', '2, Lazy-loaded routes', '3, Teleport state'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(45)
    .setExplanation('Portals render JSX into a different DOM node.')
    .setReferences(['https://react-dom/createPortal'])
    .build(),

  // React 19
  new QuestionBuilder()
    .inherits(react19)
    .setSubtopic('use hook')
    .setPrompt('In React 19, the ```ts\nuse\n``` hook can be called:')
    .setOptions(['0, Only top level', '1, Inside conditionals, loops, after early returns', '2, Only Server Components', '3, Only Context'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('The ```ts\nuse()\n``` hook in React 19 can be called conditionally.')
    .setReferences(['https://react.dev/reference/react/use'])
    .build(),

  new QuestionBuilder()
    .inherits(react19)
    .setSubtopic('Actions')
    .setPrompt('What are React 19 Actions and ```ts\nuseActionState\n```?')
    .setOptions(['0, Redux action creators', '1, Pattern for handling async transitions from forms', '2, WebSocket handlers', '3, Replacement for ```ts\nuseReducer\n```'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('React 19 Actions allow forms to have async action functions.')
    .setReferences(['https://react.dev/reference/react/useActionState'])
    .build(),

  // Accessibility
  new QuestionBuilder()
    .inherits(a11y)
    .setSubtopic('ARIA')
    .setPrompt('You render a loading spinner. What ARIA attribute should it have?')
    .setOptions(['0, ```ts\naria-disabled\n```', '1, ```ts\nrole="status"\n``` with ```ts\naria-live="polite"\n```', '2, ```ts\ntabindex\n```', '3, ```ts\naria-hidden\n```'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Spinners should have ```ts\nrole="status"\n``` so screen readers announce it.')
    .setReferences(['https://www.w3.org/WAI/ARIA/apg/patterns/spinners/'])
    .build(),

  // Tooling
  new QuestionBuilder()
    .inherits(tooling)
    .setSubtopic('Vite')
    .setPrompt('What command creates a new Vite + React + TypeScript project?')
    .setOptions(['0, ```ts\ncreate-react-app\n```', '1, ```ts\nnpm create vite@latest -- --template react-ts\n```', '2, ```ts\nnpx react-scripts\n```', '3, ```ts\nnpm install vite react\n```'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('The official Vite scaffolding command is ```ts\nnpm create vite@latest\n```.')
    .setReferences(['https://vitejs.dev/guide/#scaffolding-your-first-vite-project'])
    .build()
];
