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
            'They run exclusively in the browser and can use useState',
            'They render on the server, can access backend resources, and cannot use client-only hooks',
            'They must be written as class components',
            'They are deprecated in Next.js'
        ])
        .setAnswer('They render on the server, can access backend resources, and cannot use client-only hooks like useState or useEffect')
        .setDifficulty(5)
        .setEstimatedTime(90)
        .setExplanation('Server Components run on the server and cannot use client-side hooks.')
        .setReferences(['https://nextjs.org/docs/getting-started/react-essentials#server-and-client-components']),

    new QuestionBuilder()
        .inherits(edge)
        .setSubtopic('Edge runtime')
        .setPrompt('What distinguishes the Edge Runtime from the Node.js runtime?')
        .setOptions([
            'Edge Runtime runs on V8 isolates with limited Node APIs and very low cold starts',
            'Edge Runtime supports all Node native modules',
            'Edge Runtime is only for static files',
            'There is no difference'
        ])
        .setAnswer('Edge Runtime runs on V8 isolates with limited Node APIs and very low cold starts')
        .setDifficulty(5)
        .setEstimatedTime(90)
        .setExplanation('Edge functions run on V8 isolates offering fast cold starts, but have a restricted API surface.')
        .setReferences(['https://vercel.com/docs/concepts/functions/edge-functions']),

    new QuestionBuilder()
        .inherits(performance)
        .setSubtopic('Streaming SSR')
        .setPrompt('How does streaming SSR benefit large Next.js pages?')
        .setOptions([
            'It allows the server to send parts of the HTML progressively',
            'It caches all content on the client',
            'It disables hydration for the page',
            'It forces full-page reloads'
        ])
        .setAnswer('It allows the server to send parts of the HTML progressively so the browser can start rendering sooner')
        .setDifficulty(5)
        .setEstimatedTime(90)
        .setExplanation('Streaming SSR sends critical parts of the HTML early and streams slower content later.')
        .setReferences(['https://nextjs.org/docs/app/building-your-application/routing#streaming']),
];
