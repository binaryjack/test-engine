import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'


// Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import { QuestionInput } from "@/domain/question/question.schema"
import { getDb, queryOneSql } from '../connection'
import { extraReactQuestions, extraTypescriptQuestions } from '../seeds/archive/extra-questions'
import { reactExtraSeniorQuestions } from '../seeds/archive/react-extra-senior'
import { reactNextjsQuestions } from '../seeds/archive/react-nextjs'
import { typescriptQuestions } from '../seeds/archive/typescript'
import { reactFundamentalsQuestions } from '../seeds/react-fundamentals'
import { reactMidQuestions } from '../seeds/react-mid'
import { reactSeniorQuestions } from '../seeds/react-senior'


type Difficulty = 'easy' | 'medium' | 'hard'
type QuestionSeed = Omit<QuestionInput,  'difficulty'> & { difficulty: Difficulty }

/**
 * Converts single backtick code blocks to triple backtick JSX blocks.
 * Prevents double-formatting by using negative lookarounds.
 */
const formatCodeBlocks =  (tech: string, ...args: QuestionSeed[]): QuestionSeed[] => {

  const reactTech = queryOneSql<{ id: string }>(`SELECT id FROM technologies WHERE slug = '${tech}'`)
   
  const inlineCodeRegex = /(?<!(`{3}|`))`([^`]+)`(?!(`{3}|`))/g;
  const replacement = "```jsx\n$1\n```";

  return args.map((question) => {
    const q = { ...question };

    (Object.keys(q) as Array<keyof QuestionSeed>).forEach((key) => {
        if (['prompt', 'answer', 'explanation'].includes(key) && typeof q[key] === 'string') {   
        (q[key] as string) = (q[key] as string).replace(inlineCodeRegex, replacement) ;
      }
    });

        if (Array.isArray(q.options)) {      
            q.options = q.options.map((opt) => {
                const curretnOptions = opt 
                let output=  opt.replace(inlineCodeRegex, replacement)
                output = `${output} // ${curretnOptions}`
                return output
        });
   
    }
      q.technologyId = reactTech?.id ?? ''
    return q;
  });
};

/**
 * Prepends incremental IDs to options and synchronizes the answer property to the matching ID.
 */
const optionsAnswersMatching = (...args: QuestionSeed[]): QuestionSeed[] => {
  return args.map((question) => {
    const q = { ...question };
    let matchingId: string | null = null;

    q.options = q.options?.map((option, index) => {
      const id = index.toString();
      
      // Match raw string content before prepending ID
      if (option === q.answer) {
        matchingId = id;
      }
      
      return `${id},${option}`;
    });

    if (matchingId !== null) {
      q.answer = matchingId;
    }

    return q;
  });
}


/**
 * Groups questions by topic (technology) and level, then writes each group to a JSON file.
 * Filename format: {topic}-{level}.json (lowercase, sanitized).
 */
const sortQuestions = (...args: QuestionSeed[]): QuestionSeed[] => {
  const groups: Record<string, QuestionSeed[]> = {};

  // Grouping logic
  args.forEach((q) => {
    const tech = q.technologyId.toLowerCase().replace(/\s+/g, '-');
    const level = q.level.toLowerCase();
    const key = `${tech}-${level}`;

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(q);
  });

  // File Writing logic
  Object.entries(groups).forEach(([filename, questions]) => {
    const filePath = path.join(__dirname, `${filename}.json`);
    try {
      fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Failed to write file ${filePath}:`, error);
    }
  });

  return args;
}


export const ExecuteParsing = async  () => {
    try {
      const db = await getDb()      
   
      const seedReactList = [
            ...reactFundamentalsQuestions,
            ...reactMidQuestions,
            ...reactSeniorQuestions, 
            ...reactExtraSeniorQuestions, 
            ...reactNextjsQuestions, 
            ...extraReactQuestions
        ]
        

             
      const seedTSList = [

            ...typescriptQuestions,
            ...extraTypescriptQuestions,
    ]
    
    
    const parsedQuestionsPhase1 = formatCodeBlocks('react',...seedReactList as QuestionSeed[])
    const parsedQuestionsPhase2 = optionsAnswersMatching(...parsedQuestionsPhase1)
        sortQuestions(...parsedQuestionsPhase2)
        


            
    const parsedTSQuestionsPhase1 = formatCodeBlocks('typescript',...seedTSList as QuestionSeed[])
    const parsedTSQuestionsPhase2 = optionsAnswersMatching(...parsedTSQuestionsPhase1)
    sortQuestions(...parsedTSQuestionsPhase2)
    } catch (e) {
           console.log('ERROR WHILE PARSING QUESTIONS' ,e  )
    }
} 


ExecuteParsing()