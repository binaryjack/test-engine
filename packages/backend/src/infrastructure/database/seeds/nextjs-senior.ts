import { QuestionBuilder } from "../utils/question-builder"
import { MCQ_SENIOR } from "./presets"

const serverComponents = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Server Components');
const edge = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Edge');
const performance = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Performance');

export const nextjsSeniorQuestions = [
    new QuestionBuilder()
        .inherits(serverComponents)
        .setSubtopic('App Router')
        .setPrompt('What is a key property of Server Components in the Next.js App Router?')
        .setOptions([
            '0, They run exclusively in the browser and can use `useState`',
            '1, They render on the server, can access backend resources, and cannot use client-only hooks like `useState` or `useEffect`',
            '2, They must be written as class components',
            '3, They are deprecated in Next.js'
        ])
        .setAnswer('1')
        .setDifficulty(5)
        .setEstimatedTime(90)
        .setExplanation('Server Components run on the server and cannot use client-side hooks like `useState`')
        .setReferences(['https://nextjs.org/docs/getting-started/react-essentials#server-and-client-components']) .build(),

    new QuestionBuilder()
        .inherits(edge)
        .setSubtopic('Edge runtime')
        .setPrompt('What distinguishes the Edge Runtime from the `Node.js` runtime?')
        .setOptions([
            '0, Edge Runtime runs on `V8 isolates` with limited `Node APIs` and very low cold starts',
            '1, Edge Runtime supports all Node native modules',
            '2, Edge Runtime is only for static files',
            '3, There is no difference'
        ])
        .setAnswer('0')
        .setDifficulty(5)
        .setEstimatedTime(90)
        .setExplanation('Edge functions run on V8 isolates offering fast cold starts, but have a restricted API surface.')
        .setReferences(['https://vercel.com/docs/concepts/functions/edge-functions']) .build(),

    new QuestionBuilder()
        .inherits(performance)
        .setSubtopic('Streaming SSR')
        .setPrompt('How does streaming SSR benefit large Next.js pages?')
        .setOptions([
            '0, It allows the server to send parts of the HTML progressively',
            '1, It caches all content on the client',
            '2, It disables hydration for the page',
            '3, It forces full-page reloads'
        ])
        .setAnswer('0')
        .setDifficulty(5)
        .setEstimatedTime(90)
        .setExplanation('Streaming SSR sends critical parts of the HTML early and streams slower content later.')
        .setReferences(['https://nextjs.org/docs/app/building-your-application/routing#streaming']) .build(),
];
