export interface BulkQuestion {
  inherits: string
  subtopic: string
  prompt: string
  options: string[]
  answer: string
  difficulty: number
  estimatedTime: number
  explanation: string
  references: string[]
}

/**
 * Parses a string containing multiple QuestionBuilder() calls.
 */
export function parseQuestionBuilder(text: string): BulkQuestion[] {
  const questions: BulkQuestion[] = []
  // Matches new QuestionBuilder() blocks
  const blockRegex = /new QuestionBuilder\(\)([\s\S]*?)\.build\(\)/g
  let match

  while ((match = blockRegex.exec(text)) !== null) {
    const blockContent = match[1]
    const q: Partial<BulkQuestion> = {
      inherits: '',
      subtopic: '',
      prompt: '',
      options: [],
      answer: '',
      difficulty: 3,
      estimatedTime: 60,
      explanation: '',
      references: []
    }

    // Extract methods
    const methodRegex = /\.set(\w+)\(([\s\S]*?)\)|\.inherits\((\w+)\)/g
    let methodMatch
    while ((methodMatch = methodRegex.exec(blockContent)) !== null) {
      const [, methodName, methodValue, inheritsName] = methodMatch
      
      if (inheritsName) {
        q.inherits = inheritsName
        continue
      }

      // Clean up methodValue (remove surrounding quotes and unescape)
      let val = (methodValue || '').trim()
      if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"')) || (val.startsWith('`') && val.endsWith('`'))) {
        val = val.substring(1, val.length - 1)
      }
      
      // Basic unescape for \n and \"
      val = val.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'")

      switch (methodName) {
        case 'Subtopic': q.subtopic = val; break
        case 'Prompt': q.prompt = val; break
        case 'Answer': q.answer = val; break
        case 'Difficulty': q.difficulty = parseInt(val, 10); break
        case 'EstimatedTime': q.estimatedTime = parseInt(val, 10); break
        case 'Explanation': q.explanation = val; break
        case 'Options':
          try {
            const arrayMatch = methodValue.match(/\[([\s\S]*)\]/)
            if (arrayMatch) {
              // Split by comma but ignore commas inside quotes
              const items = arrayMatch[1].split(/,(?=(?:(?:[^'"]*['"]){2})*[^'"]*$)/)
              q.options = items.map(i => {
                let item = i.trim()
                if ((item.startsWith("'") && item.endsWith("'")) || (item.startsWith('"') && item.endsWith('"')) || (item.startsWith('`') && item.endsWith('`'))) {
                  item = item.substring(1, item.length - 1)
                }
                return item.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'")
              })
            }
          } catch (e) { console.error('Failed to parse options', e) }
          break
        case 'References':
          try {
            const arrayMatch = methodValue.match(/\[([\s\S]*)\]/)
            if (arrayMatch) {
              const items = arrayMatch[1].split(',')
              q.references = items.map(i => {
                let item = i.trim()
                if ((item.startsWith("'") && item.endsWith("'")) || (item.startsWith('"') && item.endsWith('"'))) {
                  item = item.substring(1, item.length - 1)
                }
                return item
              })
            }
          } catch (e) { console.error('Failed to parse references', e) }
          break
      }
    }
    questions.push(q as BulkQuestion)
  }

  return questions
}

/**
 * Converts questions to a pipe-separated string.
 */
export function formatToCsv(questions: BulkQuestion[]): string {
  return questions.map(q => {
    const options = (q.options || []).map(o => o.replace(/\n/g, '\\n').replace(/\|/g, '\\|')).join('; ')
    const refs = (q.references || []).join(', ')
    return [
      q.inherits,
      q.subtopic,
      (q.prompt || '').replace(/\n/g, '\\n'),
      options,
      q.answer,
      q.difficulty,
      q.estimatedTime,
      (q.explanation || '').replace(/\n/g, '\\n'),
      refs
    ].join(' | ')
  }).join('\n')
}

/**
 * Parses a pipe-separated string into questions.
 */
export function parseCsv(text: string): BulkQuestion[] {
  return text.split('\n').filter(line => line.trim()).map(line => {
    const parts = line.split(' | ').map(p => p.trim())
    const [inherits, subtopic, prompt, optionsRaw, answer, difficulty, estimatedTime, explanation, refsRaw] = parts
    
    return {
      inherits,
      subtopic: subtopic || '',
      prompt: (prompt || '').replace(/\\n/g, '\n'),
      options: optionsRaw ? optionsRaw.split('; ').map(o => o.replace(/\\n/g, '\n').replace(/\\\|/g, '|')) : [],
      answer: answer || '',
      difficulty: parseInt(difficulty, 10) || 3,
      estimatedTime: parseInt(estimatedTime, 10) || 60,
      explanation: (explanation || '').replace(/\\n/g, '\n'),
      references: refsRaw ? refsRaw.split(',').map(r => r.trim()) : []
    }
  })
}

/**
 * Converts a list of questions to QuestionBuilder() code.
 */
export function formatToQuestionBuilder(questions: BulkQuestion[]): string {
  return questions.map(q => {
    const optionsStr = q.options && q.options.length > 0 
      ? `[${q.options.map(o => `'${o.replace(/\n/g, '\\n').replace(/'/g, "\\'")}'`).join(', ')}]`
      : '[]'
    const refsStr = q.references && q.references.length > 0
      ? `[${q.references.map(r => `'${r}'`).join(', ')}]`
      : '[]'

    return `  new QuestionBuilder()
    .inherits(${q.inherits})
    .setSubtopic('${(q.subtopic || '').replace(/'/g, "\\'")}')
    .setPrompt('${(q.prompt || '').replace(/\n/g, '\\n').replace(/'/g, "\\'")}')
    .setOptions(${optionsStr})
    .setAnswer('${q.answer}')
    .setDifficulty(${q.difficulty})
    .setEstimatedTime(${q.estimatedTime})
    .setExplanation('${(q.explanation || '').replace(/\n/g, '\\n').replace(/'/g, "\\'")}')
    .setReferences(${refsStr})
    .build(),`
  }).join('\n\n')
}
