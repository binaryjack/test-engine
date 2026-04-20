import type { QuestionInput } from '../../domain/question/question.schema.js'

type Difficulty = 'easy' | 'medium' | 'hard'
type QuestionSeed = Omit<QuestionInput, 'technologyId' | 'difficulty'> & { difficulty: Difficulty }

export const reactExtraSeniorQuestions: QuestionSeed[] = [
  {
    level: 'SENIOR',
    topic: 'Optimistic UI',
    subtopic: 'Consistency',
    type: 'mcq',
    prompt: 'When implementing an optimistic UI update, what must you plan for if the server operation fails?',
    options: ['Nothing — optimistic updates are final', 'Rollback the optimistic change and show an error', 'Retry indefinitely without user feedback', 'Force a full page reload'],
    answer: 'Rollback the optimistic change and show an error',
    difficulty: 'hard',
    estimatedTime: 90,
    explanation: 'Optimistic updates improve perceived performance but require a rollback strategy if the server rejects the change, plus user feedback about the failure.',
    references: ['https://react.dev/reference/react/useOptimistic']
  },
  {
    level: 'SENIOR',
    topic: 'Error Boundaries',
    subtopic: 'Reset',
    type: 'mcq',
    prompt: 'How can you allow users to retry after an Error Boundary has shown a fallback UI?',
    options: ['Reload the page always', 'Provide a reset mechanism that calls the boundary to clear its error state', 'Wrap the entire app in multiple boundaries and toggle them', 'Unmount React root and remount manually'],
    answer: 'Provide a reset mechanism that calls the boundary to clear its error state',
    difficulty: 'hard',
    estimatedTime: 90,
    explanation: 'Error Boundaries can expose a reset method or accept a prop/callback that clears error state; libraries like react-error-boundary help implement this flow safely.',
    references: ['https://github.com/bvaughn/react-error-boundary#resetting-the-error-boundary']
  },
  {
    level: 'SENIOR',
    topic: 'Prefetching',
    subtopic: 'Performance',
    type: 'mcq',
    prompt: 'Which strategy best describes prefetching data for a likely next view to improve perceived performance?',
    options: ['Always fetch everything on app load', 'Prefetch only during idle time or on intent (hover) for likely navigations', 'Prefetch only after the user clicks', 'Prefetch in a blocking synchronous call during render'],
    answer: 'Prefetch only during idle time or on intent (hover) for likely navigations',
    difficulty: 'hard',
    estimatedTime: 90,
    explanation: 'Prefetch during idle time (requestIdleCallback) or on user intent (hover/focus) warms caches without blocking critical rendering, improving perceived navigation speed.',
    references: ['https://tanstack.com/query/latest/docs/guides/prefetching']
  },
  {
    level: 'SENIOR',
    topic: 'Streaming SSR',
    subtopic: 'Rendering',
    type: 'mcq',
    prompt: 'What advantage does streaming SSR (renderToPipeableStream) provide for large pages?',
    options: ['Faster client hydration by streaming critical parts first', 'It prevents hydration entirely', 'It makes client code smaller', 'It caches the entire page on the server automatically'],
    answer: 'Faster client hydration by streaming critical parts first',
    difficulty: 'hard',
    estimatedTime: 90,
    explanation: 'Streaming SSR sends the shell and critical content first, then streams Suspense boundaries as they resolve, allowing the browser to parse and hydrate early content sooner.',
    references: ['https://react.dev/reference/react-dom/server/renderToPipeableStream']
  },
  {
    level: 'SENIOR',
    topic: 'Observability',
    subtopic: 'Core Web Vitals',
    type: 'mcq',
    prompt: 'Which metric best captures long-term interactivity experienced by users (replacing FID)?',
    options: ['LCP', 'CLS', 'INP', 'TTFB'],
    answer: 'INP',
    difficulty: 'medium',
    estimatedTime: 60,
    explanation: 'INP (Interaction to Next Paint) replaced FID as the interactivity Core Web Vital, measuring responsiveness across many interactions and taking a worst-case approach.',
    references: ['https://web.dev/inp/']
  }
]
