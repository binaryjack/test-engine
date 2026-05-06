import type { QuestionInput } from '../../domain/question/question.schema.js'
import { createQuestion } from '../../domain/question/question.service.js'
import { persistDb, queryOneSql } from './connection.js'
import { recreateDbTables } from './schema.js'
import { seed as seedBaseData } from './seed.js'

// Import seed data
import { nextjsFundamentalsQuestions } from './seeds/nextjs-fundamentals.js'
import { nextjsMidQuestions } from './seeds/nextjs-mid.js'
import { nextjsSeniorQuestions } from './seeds/nextjs-senior.js'
import { reactFundamentalsQuestions } from './seeds/react-fundamentals.js'
import { reactMidQuestions } from './seeds/react-mid.js'
import { reactSeniorQuestions } from './seeds/react-senior.js'
import { typescriptAdvancedQuestions } from './seeds/typescript-advanced.js'
import { typescriptFundamentalsQuestions } from './seeds/typescript-fundamentals.js'

const DIFFICULTY_MAP: Record<string, number> = { easy: 2, medium: 3, hard: 5 }

function normalise(q: any): QuestionInput {
  return { 
    ...q, 
    difficulty: typeof q.difficulty === 'string' ? DIFFICULTY_MAP[q.difficulty] ?? 3 : q.difficulty 
  } as QuestionInput
}


interface QuestionsList {
   techId: string, questions: QuestionInput[], label: string
}


/**
 * Main seeding engine. 
 * Performs a destructive re-seed: wipes everything and starts fresh.
 */
export async function runFullSeed() {
  console.log('[seed-engine] Initializing destructive reseed...')
  
  // 1. Wipe and re-create tables
  await recreateDbTables()
  
  // 2. Seed base data (Technologies and Admin user)
  await seedBaseData()
  
  // 3. Look up Technology IDs
  const reactTech = queryOneSql<{ id: string }>("SELECT id FROM technologies WHERE slug = 'react'")
  const tsTech = queryOneSql<{ id: string }>("SELECT id FROM technologies WHERE slug = 'typescript'")
  
  if (!reactTech || !tsTech) {
    throw new Error('[seed-engine] Base technologies not found after base seed')
  }




  // 4. Central Seed List - Developers only need to add new question sets here
  const seedList:QuestionsList [] = [
    { techId: reactTech.id, questions: nextjsMidQuestions, label: 'nextjsMidQuestions' },
    { techId: reactTech.id, questions: nextjsFundamentalsQuestions, label: 'nextjsFundamentalsQuestions' },
    { techId: reactTech.id, questions: nextjsSeniorQuestions, label: 'nextjsSeniorQuestions' },
    { techId: reactTech.id, questions: reactFundamentalsQuestions, label: 'reactFundamentalsQuestions' },
    { techId: reactTech.id, questions: reactMidQuestions, label: 'reactMidQuestions' },
    { techId: reactTech.id, questions: reactSeniorQuestions, label: 'reactSeniorQuestions' },
    { techId: tsTech.id, questions: typescriptAdvancedQuestions, label: 'typescriptAdvancedQuestions' },
    { techId: tsTech.id, questions: typescriptFundamentalsQuestions, label: 'typescriptFundamentalsQuestions' },
  ]



  // 5. Execution Loop
  let totalInserted = 0
  for (const set of seedList) {
    console.log(`[seed-engine] Appending ${set.label} (${set.questions.length} questions)...`)
    let setInserted = 0
    for (const q of set.questions) {
      try {
        createQuestion(normalise({ ...q, technologyId: set.techId }))
        setInserted++
        totalInserted++
      } catch (e) {
        console.warn(`[seed-engine] WARN: ${(e as Error).message} — "${q.prompt.slice(0, 50)}..."`)
      }
    }
    console.log(`[seed-engine] ✓ ${set.label}: ${setInserted}/${set.questions.length} inserted`)
  }

  persistDb()
  console.log(`[seed-engine] Full seed completed successfully. Total questions: ${totalInserted} ✓`)
  
  return {
    totalQuestions: totalInserted,
    timestamp: new Date().toISOString()
  }
}
