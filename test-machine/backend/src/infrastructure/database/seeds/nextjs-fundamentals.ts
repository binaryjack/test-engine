import { QuestionBuilder } from "../utils/question-builder"
import { MCQ_FUNDAMENTALS } from "./presets"

const routing = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Routing');
const appRouter = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('App Router');
const navigation = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Navigation');
const assets = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Assets');

export const nextjsFundamentalsQuestions = [
    new QuestionBuilder()
        .inherits(routing)
        .setSubtopic('File-based routing')
        .setPrompt('In Next.js, what does file-based routing mean?')
        .setOptions([
            'You define routes with a central routes.json file',
            'Pages and folders in the `pages` or `app` directory automatically create routes',
            'You must manually register routes in _app.tsx',
            'Routes are defined only with dynamic imports'
        ])
        .setAnswer('Pages and folders in the `pages` or `app` directory automatically create routes')
        .setDifficulty(2)
        .setEstimatedTime(30)
        .setExplanation('Next.js uses the filesystem to define routes.')
        .setReferences(['https://nextjs.org/docs/routing/introduction']),

    new QuestionBuilder()
        .inherits(appRouter)
        .setSubtopic('Directories')
        .setPrompt('Which directory introduced in Next.js 13 provides the App Router and Server Components by default?')
        .setOptions(['pages', 'app', 'routes', 'components'])
        .setAnswer('app')
        .setDifficulty(2)
        .setEstimatedTime(30)
        .setExplanation('The `app/` directory provides the App Router, server components, and new conventions.')
        .setReferences(['https://nextjs.org/docs/app/building-your-application/routing']),

    new QuestionBuilder()
        .inherits(navigation)
        .setSubtopic('Client navigation')
        .setPrompt('Which component should you use for client-side navigation in Next.js?')
        .setOptions(['<a>', '<Link> from next/link', '<NavLink>', '<RouterLink>'])
        .setAnswer('<Link> from next/link')
        .setDifficulty(2)
        .setEstimatedTime(30)
        .setExplanation('Use `Link` from `next/link` for client-side transitions.')
        .setReferences(['https://nextjs.org/docs/app/api-reference/components/link']),

    new QuestionBuilder()
        .inherits(assets)
        .setSubtopic('Image optimization')
        .setPrompt('What built-in Next.js component helps optimize and serve images efficiently?')
        .setOptions(['next/asset', 'next/img', 'next/image', 'next/picture'])
        .setAnswer('next/image')
        .setDifficulty(2)
        .setEstimatedTime(30)
        .setExplanation('`next/image` provides automatic resizing, lazy loading, and optimal formats.')
        .setReferences(['https://nextjs.org/docs/app/api-reference/components/image']),
];
