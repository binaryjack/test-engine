import { createQuestion } from '../../../domain/question/question.service.js'
import { getDb, persistDb, queryOneSql } from '../connection.js'
import { migrate } from '../schema.js'
import { seed } from '../seed.js'
import { QuestionBuilder } from '../utils/question-builder.js'
import { nextjsFundamentalsQuestions } from './nextjs-fundamentals.js'
import { nextjsMidQuestions } from './nextjs-mid.js'
import { nextjsSeniorQuestions } from './nextjs-senior.js'
import { reactFundamentalsQuestions } from './react-fundamentals.js'
import { reactMidQuestions } from './react-mid.js'
import { reactSeniorQuestions } from './react-senior.js'
import { typescriptAdvancedQuestions } from './typescript-advanced.js'
import { typescriptFundamentalsQuestions } from './typescript-fundamentals.js'

async function seedBuilders(builders: QuestionBuilder[], technologyId: string, level: string) {
  console.log(`[seed-questions] Seeding ${builders.length} ${level} questions...`)
  let okCount = 0
  for (const builder of builders) {
    try {
      const question = builder.setTechnologyId(technologyId).build();
      createQuestion(question);
      okCount++
    } catch (e) {
      console.warn(`[seed-questions] WARN ${level}: ${(e as Error).message} — "${builder.build().prompt.slice(0, 60)}"`)
    }
  }
  console.log(`[seed-questions] ✓ ${level}: ${okCount}/${builders.length} inserted`)
  return okCount
}

async function main() {
  console.log('[seed-questions] Initialising database...')
  await getDb()
  await migrate()
  await seed()

  // ── Look up technology IDs ───────────────────────────────────────────────
  const reactTech = queryOneSql<{ id: string }>(`SELECT id FROM technologies WHERE slug = 'react'`)
  const tsTech = queryOneSql<{ id: string }>(`SELECT id FROM technologies WHERE slug = 'typescript'`)
  const nextjsTech = queryOneSql<{ id: string }>(`SELECT id FROM technologies WHERE slug = 'nextjs'`)

  if (!reactTech || !tsTech || !nextjsTech) {
    throw new Error('[seed-questions] Required technology not found — run base seed first')
  }

  const reactId = reactTech.id;
  const tsId = tsTech.id;
  const nextjsId = nextjsTech.id;

  console.log(`[seed-questions] React tech id: ${reactId}`)
  console.log(`[seed-questions] TypeScript tech id: ${tsId}`)
  console.log(`[seed-questions] Next.js tech id: ${nextjsId}`)

  // Clear existing questions for clean re-seed
  const db = await getDb()
  db.run(`DELETE FROM questions`);
  persistDb();
  console.log('[seed-questions] Cleared all existing questions for re-seed...')

  // Seed all questions
  await seedBuilders(reactFundamentalsQuestions, reactId, 'React FUNDAMENTALS');
  await seedBuilders(reactMidQuestions, reactId, 'React MID');
  await seedBuilders(reactSeniorQuestions, reactId, 'React SENIOR');

  await seedBuilders(typescriptFundamentalsQuestions, tsId, 'TypeScript FUNDAMENTALS');
  await seedBuilders(typescriptAdvancedQuestions, tsId, 'TypeScript ADVANCED');

  await seedBuilders(nextjsFundamentalsQuestions, nextjsId, 'Next.js FUNDAMENTALS');
  await seedBuilders(nextjsMidQuestions, nextjsId, 'Next.js MID');
  await seedBuilders(nextjsSeniorQuestions, nextjsId, 'Next.js SENIOR');

  // ── Final summary ────────────────────────────────────────────────────────
  const total = queryOneSql<{ cnt: number }>(`SELECT COUNT(*) as cnt FROM questions`)
  console.log(`\n[seed-questions] ── Summary ──────────────────────────────`)
  console.log(`  Total questions : ${total?.cnt ?? 0}`)
  console.log(`[seed-questions] Done ✓`)
}

main().catch((err) => {
  console.error('[seed-questions] Fatal error:', err)
  process.exit(1)
})
