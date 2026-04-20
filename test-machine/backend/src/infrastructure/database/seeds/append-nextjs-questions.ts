import { getDb, queryOneSql } from '../connection.js'
import { migrate } from '../schema.js'
import { seed } from '../seed.js'
import { createQuestion } from '../../../domain/question/question.service.js'
import { reactNextjsQuestions } from './react-nextjs.js'
import type { QuestionInput } from '../../domain/question/question.schema.js'

const DIFFICULTY_MAP: Record<string, number> = { easy: 2, medium: 3, hard: 5 }

function normalise(q: Record<string, unknown>): QuestionInput {
  return { ...q, difficulty: DIFFICULTY_MAP[q.difficulty as string] ?? 3 } as QuestionInput
}

async function main() {
  console.log('[append-nextjs] Initialising database...')
  await getDb()
  await migrate()
  await seed()

  const reactTech = queryOneSql<{ id: string }>(
    `SELECT id FROM technologies WHERE slug = 'react'`
  )

  if (!reactTech) throw new Error('React technology not found — run base seed first')

  const reactId = reactTech.id

  console.log(`[append-nextjs] Seeding ${reactNextjsQuestions.length} Next.js questions (React)...`)
  let ok = 0
  for (const q of reactNextjsQuestions) {
    try {
      createQuestion(normalise({ ...q, technologyId: reactId }))
      ok++
    } catch (e) {
      console.warn(`[append-nextjs] WARN: ${(e as Error).message} — "${(q.prompt as string).slice(0, 60)}"`)
    }
  }
  console.log(`[append-nextjs] ✓ Next.js: ${ok}/${reactNextjsQuestions.length} inserted`)

  const finalReact = queryOneSql<{ cnt: number }>(
    `SELECT COUNT(*) as cnt FROM questions WHERE technologyId = ?`,
    [reactId]
  )
  const total = queryOneSql<{ cnt: number }>(`SELECT COUNT(*) as cnt FROM questions`)

  console.log(`\n[append-nextjs] ── Summary ──────────────────────────────`)
  console.log(`  React questions : ${finalReact?.cnt ?? 0}`)
  console.log(`  Total questions : ${total?.cnt ?? 0}`)
  console.log('[append-nextjs] Done ✓')
}

main().catch((err) => {
  console.error('[append-nextjs] Fatal error:', err)
  process.exit(1)
})
