import { QuestionInput } from "@/domain/question/question.schema"

type Difficulty = 'easy' | 'medium' | 'hard'
type QuestionSeed = Omit<QuestionInput, 'technologyId' | 'difficulty'> & { difficulty: Difficulty }

export const reactNextjsQuestions: QuestionSeed[] = [
  // ── Beginner / Fundamentals ───────────────────────────────────────────
  {
    level: 'FUNDAMENTALS',
    topic: 'Routing',
    subtopic: 'File-based routing',
    type: 'mcq',
    prompt: 'In Next.js, what does file-based routing mean?',
    options: [
      'You define routes with a central routes.json file',
      'Pages and folders in the `pages` or `app` directory automatically create routes',
      'You must manually register routes in _app.tsx',
      'Routes are defined only with dynamic imports'
    ],
    answer: 'Pages and folders in the `pages` or `app` directory automatically create routes',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'Next.js uses the filesystem to define routes: files under `pages/` (or `app/` for the App Router) map to URL paths automatically.',
    references: ['https://nextjs.org/docs/routing/introduction']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'App Router',
    subtopic: 'Directories',
    type: 'mcq',
    prompt: 'Which directory introduced in Next.js 13 provides the App Router and Server Components by default?',
    options: ['pages', 'app', 'routes', 'components'],
    answer: 'app',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'The `app/` directory introduced in Next.js 13 provides the App Router, server components by default, and new conventions such as layout.tsx and page.tsx.',
    references: ['https://nextjs.org/docs/app/building-your-application/routing']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'Navigation',
    subtopic: 'Client navigation',
    type: 'mcq',
    prompt: 'Which component should you use for client-side navigation in Next.js?',
    options: ['```html\n<a>\n```', '```tsx\n<Link>\n``` from next/link', '```tsx\n<NavLink>\n```', '```tsx\n<RouterLink>\n```'],
    answer: '```tsx\n<Link>\n``` from next/link',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: 'Use `Link` from `next/link` for client-side transitions; it enables prefetching and avoids full page reloads.',
    references: ['https://nextjs.org/docs/app/api-reference/components/link']
  },
  {
    level: 'FUNDAMENTALS',
    topic: 'Assets',
    subtopic: 'Image optimization',
    type: 'mcq',
    prompt: 'What built-in Next.js component helps optimize and serve images efficiently?',
    options: ['next/asset', 'next/img', 'next/image', 'next/picture'],
    answer: 'next/image',
    difficulty: 'easy',
    estimatedTime: 30,
    explanation: '`next/image` provides automatic resizing, lazy loading, and optimal formats for images in Next.js apps.',
    references: ['https://nextjs.org/docs/app/api-reference/components/image']
  },

  // ── Mid-level ─────────────────────────────────────────────────────────
  {
    level: 'MID',
    topic: 'Data Fetching',
    subtopic: 'getStaticProps',
    type: 'mcq',
    prompt: 'What is the purpose of `getStaticProps` in the Next.js `pages` router?',
    options: [
      'Fetch data on every incoming request',
      'Fetch data once at build time and provide it as props',
      'Fetch data only on the client after hydration',
      'Replace API routes for server code'
    ],
    answer: 'Fetch data once at build time and provide it as props',
    difficulty: 'medium',
    estimatedTime: 60,
    explanation: '`getStaticProps` runs at build time and produces static HTML with the returned props. It is useful for static pages that can be pre-rendered.',
    references: ['https://nextjs.org/docs/basic-features/data-fetching/get-static-props']
  },
  {
    level: 'MID',
    topic: 'ISR',
    subtopic: 'Revalidation',
    type: 'mcq',
    prompt: 'What does Incremental Static Regeneration (ISR) allow you to do in Next.js?',
    options: [
      'Always render pages on the client only',
      'Regenerate static pages on-demand or after a specified interval',
      'Disable caching for static assets',
      'Run serverless functions on every page load'
    ],
    answer: 'Regenerate static pages on-demand or after a specified interval',
    difficulty: 'medium',
    estimatedTime: 60,
    explanation: 'ISR lets you keep benefits of static pages while allowing updates: pages can be revalidated periodically or on-demand to reflect fresh content.',
    references: ['https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration']
  },
  {
    level: 'MID',
    topic: 'API',
    subtopic: 'API Routes',
    type: 'mcq',
    prompt: 'Where do API routes live in a Next.js `pages`-based project and what are they used for?',
    options: [
      'In `pages/api/*` and used to implement server endpoints (serverless functions)',
      'In `public/api/*` and used to serve static JSON',
      'In `components/api/*` and used by client components',
      'In the root `api` folder and are client-only helpers'
    ],
    answer: 'In `pages/api/*` and used to implement server endpoints (serverless functions)',
    difficulty: 'medium',
    estimatedTime: 60,
    explanation: 'API routes under `pages/api` provide server-side endpoints that run on the server (serverless or Node.js) and can be called from client code or other servers.',
    references: ['https://nextjs.org/docs/api-routes/introduction']
  },
  {
    level: 'MID',
    topic: 'Routing',
    subtopic: 'Dynamic routes',
    type: 'mcq',
    prompt: 'How do you create a dynamic route in Next.js to handle paths like `/posts/123`?',
    options: [
      'Create `pages/posts/[id].js` or `app/posts/[id]/page.js`',
      'Use query parameters only',
      'Define routes in next.config.js',
      'Use `pages/posts/:id.js` syntax'
    ],
    answer: 'Create `pages/posts/[id].js` or `app/posts/[id]/page.js`',
    difficulty: 'medium',
    estimatedTime: 60,
    explanation: 'Square-bracket filenames create dynamic route segments. In the app router you create a folder with the segment name and a `page.js` inside it.',
    references: ['https://nextjs.org/docs/routing/dynamic-routes']
  },

  // ── Senior ────────────────────────────────────────────────────────────
  {
    level: 'SENIOR',
    topic: 'Server Components',
    subtopic: 'App Router',
    type: 'mcq',
    prompt: 'What is a key property of Server Components in the Next.js App Router?',
    options: [
      'They run exclusively in the browser and can use useState',
      'They render on the server, can access backend resources, and cannot use client-only hooks like useState or useEffect',
      'They must be written as class components',
      'They are deprecated in Next.js'
    ],
    answer: 'They render on the server, can access backend resources, and cannot use client-only hooks like useState or useEffect',
    difficulty: 'hard',
    estimatedTime: 90,
    explanation: 'Server Components run on the server and can fetch data directly; they do not run in the browser and therefore cannot use client-side hooks.',
    references: ['https://nextjs.org/docs/getting-started/react-essentials#server-and-client-components']
  },
  {
    level: 'SENIOR',
    topic: 'Edge',
    subtopic: 'Edge runtime',
    type: 'mcq',
    prompt: 'What distinguishes the Edge Runtime (e.g., Vercel Edge Functions) from the Node.js runtime?',
    options: [
      'Edge Runtime runs on V8 isolates with limited Node APIs and very low cold starts',
      'Edge Runtime supports all Node native modules and long-running processes',
      'Edge Runtime is only for static files',
      'There is no difference — they are identical'
    ],
    answer: 'Edge Runtime runs on V8 isolates with limited Node APIs and very low cold starts',
    difficulty: 'hard',
    estimatedTime: 90,
    explanation: 'Edge functions run on V8 isolates (e.g., Deno-like or V8 worker) offering fast cold starts and global distribution, but they have a restricted API surface compared to Node.',
    references: ['https://vercel.com/docs/concepts/functions/edge-functions']
  },
  {
    level: 'SENIOR',
    topic: 'Performance',
    subtopic: 'Streaming SSR',
    type: 'mcq',
    prompt: 'How does streaming SSR benefit large Next.js pages?',
    options: [
      'It allows the server to send parts of the HTML progressively so the browser can start rendering sooner',
      'It caches all content on the client',
      'It disables hydration for the page',
      'It forces full-page reloads for every update'
    ],
    answer: 'It allows the server to send parts of the HTML progressively so the browser can start rendering sooner',
    difficulty: 'hard',
    estimatedTime: 90,
    explanation: 'Streaming SSR sends critical parts of the HTML early and streams slower content later (e.g., Suspense boundaries), reducing time-to-first-byte and improving perceived performance.',
    references: ['https://nextjs.org/docs/app/building-your-application/routing#streaming']
  }
]
