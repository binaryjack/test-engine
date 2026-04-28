import { QuestionBuilder } from "../utils/question-builder"
import { MCQ_MID } from "./presets"

const dataFetching = new QuestionBuilder().inherits(MCQ_MID).setTopic('Data Fetching');
const isr = new QuestionBuilder().inherits(MCQ_MID).setTopic('ISR');
const api = new QuestionBuilder().inherits(MCQ_MID).setTopic('API');
const routing = new QuestionBuilder().inherits(MCQ_MID).setTopic('Routing');

export const nextjsMidQuestions = [
    new QuestionBuilder()
        .inherits(dataFetching)
        .setSubtopic('getStaticProps')
        .setPrompt('What is the purpose of `getStaticProps` in the Next.js `pages` router?')
        .setOptions([
            'Fetch data on every incoming request',
            'Fetch data once at build time and provide it as props',
            'Fetch data only on the client after hydration',
            'Replace API routes for server code'
        ])
        .setAnswer('Fetch data once at build time and provide it as props')
        .setDifficulty(3)
        .setEstimatedTime(60)
        .setExplanation('`getStaticProps` runs at build time and produces static HTML.')
        .setReferences(['https://nextjs.org/docs/basic-features/data-fetching/get-static-props']),

    new QuestionBuilder()
        .inherits(isr)
        .setSubtopic('Revalidation')
        .setPrompt('What does Incremental Static Regeneration (ISR) allow you to do in Next.js?')
        .setOptions([
            'Always render pages on the client only',
            'Regenerate static pages on-demand or after a specified interval',
            'Disable caching for static assets',
            'Run serverless functions on every page load'
        ])
        .setAnswer('Regenerate static pages on-demand or after a specified interval')
        .setDifficulty(3)
        .setEstimatedTime(60)
        .setExplanation('ISR lets you keep benefits of static pages while allowing updates.')
        .setReferences(['https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration']),

    new QuestionBuilder()
        .inherits(api)
        .setSubtopic('API Routes')
        .setPrompt('Where do API routes live in a Next.js `pages`-based project and what are they used for?')
        .setOptions([
            'In `pages/api/*` and used to implement server endpoints',
            'In `public/api/*` and used to serve static JSON',
            'In `components/api/*` and used by client components',
            'In the root `api` folder'
        ])
        .setAnswer('In `pages/api/*` and used to implement server endpoints (serverless functions)')
        .setDifficulty(3)
        .setEstimatedTime(60)
        .setExplanation('API routes under `pages/api` provide server-side endpoints.')
        .setReferences(['https://nextjs.org/docs/api-routes/introduction']),

    new QuestionBuilder()
        .inherits(routing)
        .setSubtopic('Dynamic routes')
        .setPrompt('How do you create a dynamic route in Next.js to handle paths like `/posts/123`?')
        .setOptions([
            'Create `pages/posts/[id].js` or `app/posts/[id]/page.js`',
            'Use query parameters only',
            'Define routes in next.config.js',
            'Use `pages/posts/:id.js` syntax'
        ])
        .setAnswer('Create `pages/posts/[id].js` or `app/posts/[id]/page.js`')
        .setDifficulty(3)
        .setEstimatedTime(60)
        .setExplanation('Square-bracket filenames create dynamic route segments.')
        .setReferences(['https://nextjs.org/docs/routing/dynamic-routes']),
];
