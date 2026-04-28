import { QuestionBuilder } from "../utils/question-builder"
import { MCQ_SENIOR } from "./presets"

// --- Topic Presets ---
const concurrent = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Concurrent Features');
const advancedHooks = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Advanced Hooks');
const react19 = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('React 19');
const performance = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Performance');
const architecture = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Architecture');
const testing = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Testing');
const stateManagement = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('State Management');
const errorHandling = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Error Handling');
const ssr = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('SSR');
const security = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Security');
const a11y = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Accessibility');
const i18n = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('i18n');
const dataFetching = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Data Fetching');
const devops = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('DevOps');
const webAPIs = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Web APIs');
const patterns = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Patterns');
const typescript = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('TypeScript');
const optimisticUI = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Optimistic UI');
const prefetching = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Prefetching');
const streamingSSR = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Streaming SSR');
const observability = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Observability');

export const reactSeniorQuestions = [
  // Concurrent Features
  new QuestionBuilder()
    .inherits(concurrent)
    .setSubtopic('useTransition')
    .setPrompt('What does useTransition allow you to do?')
    .setOptions(['Animate transitions', 'Mark state update as non-urgent', 'Defer network requests', 'Batch context updates'])
    .setAnswer('Mark a state update as non-urgent so it can be interrupted by more urgent updates')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('useTransition marks state updates as non-urgent, allowing React to interrupt them.')
    .setReferences(['https://react.dev/reference/react/useTransition']),

  new QuestionBuilder()
    .inherits(concurrent)
    .setSubtopic('useDeferredValue')
    .setPrompt('When would you use useDeferredValue instead of useTransition?')
    .setOptions(['When you control state update', 'When you receive a value as a prop and want to defer re-renders', 'For debouncing API calls', 'With WebGL'])
    .setAnswer('When you receive a value as a prop or from a hook you don\'t control and want to defer re-renders based on it')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('useDeferredValue is for deferring re-renders based on values you do not control.')
    .setReferences(['https://react.dev/reference/react/useDeferredValue']),
  
  new QuestionBuilder()
    .inherits(concurrent)
    .setSubtopic('Time slicing')
    .setPrompt('What does time-slicing in React concurrent rendering enable?')
    .setOptions(['Rendering is split across frames to keep the UI responsive', 'Rendering runs on a separate Web Worker thread', 'Components render synchronously always', 'It disables Suspense'])
    .setAnswer('Rendering is split across frames to keep the UI responsive')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Time-slicing allows React to pause rendering work and yield to the browser.')
    .setReferences(['https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react']),

  // Optimistic UI
  new QuestionBuilder()
    .inherits(optimisticUI)
    .setSubtopic('Consistency')
    .setPrompt('When implementing an optimistic UI update, what must you plan for if the server operation fails?')
    .setOptions(['Nothing', 'Rollback the optimistic change and show an error', 'Retry indefinitely', 'Force a full page reload'])
    .setAnswer('Rollback the optimistic change and show an error')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Optimistic updates require a rollback strategy if the server rejects the change.')
    .setReferences(['https://react.dev/reference/react/useOptimistic']),
  
  // Error Handling
  new QuestionBuilder()
    .inherits(errorHandling)
    .setSubtopic('Reset')
    .setPrompt('How can you allow users to retry after an Error Boundary has shown a fallback UI?')
    .setOptions(['Reload page', 'Provide a reset mechanism to clear error state', 'Wrap app in multiple boundaries', 'Unmount and remount manually'])
    .setAnswer('Provide a reset mechanism that calls the boundary to clear its error state')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Error Boundaries can expose a reset method or accept a prop to clear error state.')
    .setReferences(['https://github.com/bvaughn/react-error-boundary#resetting-the-error-boundary']),

  // Prefetching
  new QuestionBuilder()
    .inherits(prefetching)
    .setSubtopic('Performance')
    .setPrompt('Which strategy best describes prefetching data for a likely next view?')
    .setOptions(['Fetch all on app load', 'Prefetch on idle time or intent (hover)', 'Prefetch after click', 'Blocking prefetch'])
    .setAnswer('Prefetch only during idle time or on intent (hover) for likely navigations')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Prefetch during idle time or on user intent to warm caches without blocking rendering.')
    .setReferences(['https://tanstack.com/query/latest/docs/guides/prefetching']),

  // Streaming SSR
  new QuestionBuilder()
    .inherits(streamingSSR)
    .setSubtopic('Rendering')
    .setPrompt('What advantage does streaming SSR provide for large pages?')
    .setOptions(['Faster client hydration by streaming critical parts first', 'Prevents hydration', 'Smaller client code', 'Caches page on server'])
    .setAnswer('Faster client hydration by streaming critical parts first')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Streaming SSR sends the shell first, then streams slower content, allowing browser to parse and hydrate early.')
    .setReferences(['https://react.dev/reference/react-dom/server/renderToPipeableStream']),

  // Observability
  new QuestionBuilder()
    .inherits(observability)
    .setSubtopic('Core Web Vitals')
    .setPrompt('Which metric best captures long-term interactivity experienced by users (replacing FID)?')
    .setOptions(['LCP', 'CLS', 'INP', 'TTFB'])
    .setAnswer('INP')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('INP (Interaction to Next Paint) replaced FID as the interactivity Core Web Vital.')
    .setReferences(['https://web.dev/inp/']),

  // Architecture
  new QuestionBuilder()
    .inherits(architecture)
    .setSubtopic('Optimistic UI')
    .setPrompt('When implementing an optimistic UI for a mutation, what must you plan for?')
    .setOptions(['No rollback needed', 'A rollback strategy and error handling if the server rejects the change', 'Always refreshing the whole page', 'Optimistic UI only works for reads'])
    .setAnswer('A rollback strategy and error handling if the server rejects the change')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Optimistic updates assume success; you must revert the UI and inform the user if the server responds with an error.')
    .setReferences(['https://react.dev/reference/react/useOptimistic']),
];
