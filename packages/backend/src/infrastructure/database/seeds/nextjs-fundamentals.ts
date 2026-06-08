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
            '0, You define routes with a central ```ts\nroutes.json\n``` file',
            '1, Pages and folders in the ```ts\npages\n``` or ```ts\napp\n``` directory automatically create routes',
            '2, You must manually register routes in ```tsx\n_app.tsx\n```',
            '3, Routes are defined only with dynamic imports'
        ])
        .setAnswer('1')
        .setDifficulty(2)
        .setEstimatedTime(30)
        .setExplanation('Next.js uses the filesystem to define routes.')
        .setReferences(['https://nextjs.org/docs/routing/introduction']) .build(),

    new QuestionBuilder()
        .inherits(appRouter)
        .setSubtopic('Directories')
        .setPrompt('Which directory introduced in Next.js 13 provides the App Router and Server Components by default?')
        .setOptions(['0, ```ts\npages\n```', '1, ```ts\napp\n```', '2, ```ts\nroutes\n```', '3, ```ts\ncomponents\n```'])
        .setAnswer('1')
        .setDifficulty(2)
        .setEstimatedTime(30)
        .setExplanation('The ```ts\napp/\n``` directory provides the App Router, server components, and new conventions.')
        .setReferences(['https://nextjs.org/docs/app/building-your-application/routing']) .build(),

    new QuestionBuilder()
        .inherits(navigation)
        .setSubtopic('Client navigation')
        .setPrompt('Which component should you use for client-side navigation in Next.js?')
        .setOptions(['0, ```tsx\n<a>\n```', '1, ```tsx\n<Link>\n``` from ```ts\nnext/link\n```', '2, ```tsx\n<NavLink>\n```', '3, ```tsx\n<RouterLink>\n```'])
        .setAnswer('1')
        .setDifficulty(2)
        .setEstimatedTime(30)
        .setExplanation('Use ```tsx\n<Link>\n``` from ```ts\nnext/link\n``` for client-side transitions.')
        .setReferences(['https://nextjs.org/docs/app/api-reference/components/link']) .build(),

    new QuestionBuilder()
        .inherits(assets)
        .setSubtopic('Image optimization')
        .setPrompt('What built-in Next.js component helps optimize and serve images efficiently?')
        .setOptions(['0, ```ts\nnext/asset\n```', '1, ```ts\nnext/img\n```', '2, ```ts\nnext/image\n```', '3, ```ts\nnext/picture\n```'])
        .setAnswer('2')
        .setDifficulty(2)
        .setEstimatedTime(30)
        .setExplanation('```ts\nnext/image\n``` provides automatic resizing, lazy loading, and optimal formats.')
        .setReferences(['https://nextjs.org/docs/app/api-reference/components/image']) .build(),
];
