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
            '0, Fetch data on every incoming request',
            '1, Fetch data once at build time and provide it as props',
            '2, Fetch data only on the client after hydration',
            '3, Replace API routes for server code'
        ])
        .setAnswer('1')
        .setDifficulty(3)
        .setEstimatedTime(60)
        .setExplanation('`getStaticProps` runs at build time and produces static HTML.')
        .setReferences(['https://nextjs.org/docs/basic-features/data-fetching/get-static-props'])
        .build(),

    new QuestionBuilder()
        .inherits(isr)
        .setSubtopic('Revalidation')
        .setPrompt('What does Incremental Static Regeneration (ISR) allow you to do in Next.js?')
        .setOptions([
            '0, Always render pages on the client only',
            '1, Regenerate static pages on-demand or after a specified interval',
            '2, Disable caching for static assets',
            '3, Run serverless functions on every page load'
        ])
        .setAnswer('1')
        .setDifficulty(3)
        .setEstimatedTime(60)
        .setExplanation('ISR lets you keep benefits of static pages while allowing updates.')
        .setReferences(['https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration']) .build(),

    new QuestionBuilder()
        .inherits(api)
        .setSubtopic('API Routes')
        .setPrompt('Where do API routes live in a Next.js `pages`-based project and what are they used for?')
        .setOptions([
            '0, In `pages/api/*` and used to implement server endpoints',
            '1, In `public/api/*` and used to serve static JSON',
            '2, In `components/api/*` and used by client components',
            '3, In the root `api` folder'
        ])
        .setAnswer('0')
        .setDifficulty(3)
        .setEstimatedTime(60)
        .setExplanation('API routes under `pages/api` provide server-side endpoints.')
        .setReferences(['https://nextjs.org/docs/api-routes/introduction']) .build(),

    new QuestionBuilder()
        .inherits(routing)
        .setSubtopic('Dynamic routes')
        .setPrompt('How do you create a dynamic route in Next.js to handle paths like `/posts/123`?')
        .setOptions([
            "0, Create `pages/posts/[id].js` or `app/posts/[id]/page.js`",
            '1, Use query parameters only',
            "2, Define routes in `next.config.js`",
            "3, Use `pages/posts/:id.js` syntax"
        ])
        .setAnswer('0')
        .setDifficulty(3)
        .setEstimatedTime(60)
        .setExplanation('`Square-bracket` filenames create dynamic route segments.')
        .setReferences(['https://nextjs.org/docs/routing/dynamic-routes']) .build(),
];
