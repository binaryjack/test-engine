import { QuestionBuilder } from "../utils/question-builder";
import { architecture, concurrent, errorHandling, observability, optimisticUI, prefetching, streamingSSR } from "./presets";



export const reactSeniorQuestions = [
  // Concurrent Features
  new QuestionBuilder()
    .inherits(concurrent)
    .setSubtopic('useTransition')
    .setPrompt('What does ```ts\nuseTransition\n``` allow you to do?')
    .setOptions(['0, Animate transitions', '1, Mark state update as non-urgent', '2, Defer network requests', '3, Batch context updates'])
    .setAnswer('1')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('```ts\nuseTransition\n``` marks state updates as non-urgent, allowing React to interrupt them.')
    .setReferences(['https://react.dev/reference/react/useTransition'])
    .build(),

  new QuestionBuilder()
    .inherits(concurrent)
    .setSubtopic('useDeferredValue')
    .setPrompt('When would you use ```ts\nuseDeferredValue\n``` instead of ```ts\nuseTransition\n```?')
    .setOptions(['0, When you control state update', '1, When you receive a value as a prop and want to defer re-renders', '2, For debouncing API calls', '3, With WebGL'])
    .setAnswer('1')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('```ts\nuseDeferredValue\n``` is for deferring re-renders based on values you do not control.')
    .setReferences(['https://react.dev/reference/react/useDeferredValue'])
    .build(),
  
  new QuestionBuilder()
    .inherits(concurrent)
    .setSubtopic('Time slicing')
    .setPrompt('What does time-slicing in React concurrent rendering enable?')
    .setOptions(['0, Rendering is split across frames to keep the UI responsive', '1, Rendering runs on a separate Web Worker thread', '2, Components render synchronously always', '3, It disables ```ts\nSuspense\n```'])
    .setAnswer('0')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Time-slicing allows React to pause rendering work and yield to the browser.')
    .setReferences(['https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react'])
    .build(),

  // Optimistic UI
  new QuestionBuilder()
    .inherits(optimisticUI)
    .setSubtopic('Consistency')
    .setPrompt('When implementing an optimistic UI update, what must you plan for if the server operation fails?')
    .setOptions(['0, Nothing', '1, Rollback the optimistic change and show an error', '2, Retry indefinitely', '3, Force a full page reload'])
    .setAnswer('1')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Optimistic updates require a rollback strategy if the server rejects the change.')
    .setReferences(['https://react.dev/reference/react/useOptimistic'])
    .build(),
  
  // Error Handling
  new QuestionBuilder()
    .inherits(errorHandling)
    .setSubtopic('Reset')
    .setPrompt('How can you allow users to retry after an Error Boundary has shown a fallback UI?')
    .setOptions(['0, Reload page', '1, Provide a reset mechanism to clear error state', '2, Wrap app in multiple boundaries', '3, Unmount and remount manually'])
    .setAnswer('1')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Error Boundaries can expose a reset method or accept a prop to clear error state.')
    .setReferences(['https://github.com/bvaughn/react-error-boundary#resetting-the-error-boundary'])
    .build(),

  // Prefetching
  new QuestionBuilder()
    .inherits(prefetching)
    .setSubtopic('Performance')
    .setPrompt('Which strategy best describes prefetching data for a likely next view?')
    .setOptions(['0, Fetch all on app load', '1, Prefetch on idle time or intent (hover)', '2, Prefetch after click', '3, Blocking prefetch'])
    .setAnswer('1')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Prefetch during idle time or on user intent to warm caches without blocking rendering.')
    .setReferences(['https://tanstack.com/query/latest/docs/guides/prefetching'])
    .build(),

  // Streaming SSR
  new QuestionBuilder()
    .inherits(streamingSSR)
    .setSubtopic('Rendering')
    .setPrompt('What advantage does streaming SSR provide for large pages?')
    .setOptions(['0, Faster client hydration by streaming critical parts first', '1, Prevents hydration', '2, Smaller client code', '3, Caches page on server'])
    .setAnswer('0')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Streaming SSR sends the shell first, then streams slower content, allowing browser to parse and hydrate early.')
    .setReferences(['https://react.dev/reference/react-dom/server/renderToPipeableStream'])
    .build(),

  // Observability
  new QuestionBuilder()
    .inherits(observability)
    .setSubtopic('Core Web Vitals')
    .setPrompt('Which metric best captures long-term interactivity experienced by users (replacing FID)?')
    .setOptions(['0, LCP', '1, CLS', '2, INP', '3, TTFB'])
    .setAnswer('2')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('INP (Interaction to Next Paint) replaced FID as the interactivity Core Web Vital.')
    .setReferences(['https://web.dev/inp/'])
    .build(),

  // Architecture
  new QuestionBuilder()
    .inherits(architecture)
    .setSubtopic('Optimistic UI')
    .setPrompt('When implementing an optimistic UI for a mutation, what must you plan for?')
    .setOptions(['0, No rollback needed', '1, A rollback strategy and error handling if the server rejects the change', '2, Always refreshing the whole page', '3, Optimistic UI only works for reads'])
    .setAnswer('1')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Optimistic updates assume success; you must revert the UI and inform the user if the server responds with an error.')
    .setReferences(['https://react.dev/reference/react/useOptimistic'])
    .build(),
];
