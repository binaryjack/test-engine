import { getDb, queryOneSql } from '../connection.js'
import { migrate } from '../schema.js'
import { seed } from '../seed.js'
import { createQuestion } from '../../../domain/question/question.service.js'
import { extraReactQuestions, extraTypescriptQuestions } from './extra-questions.js'
import type { QuestionInput } from '../../domain/question/question.schema.js'

const DIFFICULTY_MAP: Record<string, number> = { easy: 2, medium: 3, hard: 5 }

function normalise(q: Record<string, unknown>): QuestionInput {
  return { ...q, difficulty: DIFFICULTY_MAP[q.difficulty as string] ?? 3 } as QuestionInput
}

async function main() {
  console.log('[append-extra] Initialising database...')
  await getDb()
  await migrate()
  await seed()

  const reactTech = queryOneSql<{ id: string }>(
    `SELECT id FROM technologies WHERE slug = 'react'`
  )
  const tsTech = queryOneSql<{ id: string }>(
    `SELECT id FROM technologies WHERE slug = 'typescript'`
  )

  if (!reactTech || !tsTech) throw new Error('Required technology not found — run base seed first')

  const reactId = reactTech.id
  const tsId = tsTech.id

  console.log(`[append-extra] Seeding ${extraReactQuestions.length} extra React questions...`)
  let reactOk = 0
  for (const q of extraReactQuestions) {
    try {
      createQuestion(normalise({ ...q, technologyId: reactId }))
      reactOk++
    } catch (e) {
      console.warn(`[append-extra] WARN React: ${(e as Error).message} — "${(q.prompt as string).slice(0, 60)}"`)
    }
  }
  console.log(`[append-extra] ✓ React: ${reactOk}/${extraReactQuestions.length} inserted`)

  console.log(`[append-extra] Seeding ${extraTypescriptQuestions.length} extra TypeScript questions...`)
  let tsOk = 0
  for (const q of extraTypescriptQuestions) {
    try {
      createQuestion(normalise({ ...q, technologyId: tsId }))
      tsOk++
    } catch (e) {
      console.warn(`[append-extra] WARN TS: ${(e as Error).message} — "${(q.prompt as string).slice(0, 60)}"`)
    }
  }
  console.log(`[append-extra] ✓ TypeScript: ${tsOk}/${extraTypescriptQuestions.length} inserted`)

  const finalReact = queryOneSql<{ cnt: number }>(
    `SELECT COUNT(*) as cnt FROM questions WHERE technologyId = ?`,
    [reactId]
  )
  const finalTs = queryOneSql<{ cnt: number }>(
    `SELECT COUNT(*) as cnt FROM questions WHERE technologyId = ?`,
    [tsId]
  )
  const total = queryOneSql<{ cnt: number }>(`SELECT COUNT(*) as cnt FROM questions`)

  console.log(`\n[append-extra] ── Summary ──────────────────────────────`)
  console.log(`  React questions : ${finalReact?.cnt ?? 0}`)
  console.log(`  TypeScript qs   : ${finalTs?.cnt ?? 0}`)
  console.log(`  Total questions : ${total?.cnt ?? 0}`)
  console.log('[append-extra] Done ✓')
}

main().catch((err) => {
  console.error('[append-extra] Fatal error:', err)
  process.exit(1)
})
