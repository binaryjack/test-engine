import { MarkdownContent } from '../../../shared/components/UI/MarkdownContent.js'
import type { Question } from '../../../shared/types/index.js'

// Helper to shuffle array
function shuffleArray<T>(arr: T[], seed: string): T[] {
  const copy = [...arr]
  // Use question ID as seed for consistent shuffling per question
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0 // Convert to 32bit integer
  }
  hash = Math.abs(hash) // Prevent negative hashes which cause negative array indices
  // Fisher-Yates shuffle with seeded random
  for (let i = copy.length - 1; i > 0; i--) {
    hash = (hash * 9301 + 49297) % 233280
    const j = Math.floor((hash / 233280) * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

interface ExamQuestionFormProps {
  question: Question;
  currentAnswer: string;
  onAnswer: (answer: string) => void;
}

export function ExamQuestionForm({ question, currentAnswer, onAnswer }: ExamQuestionFormProps) {
  const isMcq = question.type === 'mcq' && question.options;
  const isTextAnswer = ['theory', 'coding', 'debug'].includes(question.type);

  return (
    <div className="card h-full flex flex-col min-h-0 space-y-4">
      <div className="shrink-0">
        <MarkdownContent content={question.prompt} className="text-white leading-relaxed" />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
        {isMcq && question.options && (
          <div className="space-y-2 pb-4">
            {shuffleArray(question.options, question.id).map((opt, i) => {
              const match = opt.match(/^(\d+),\s*(.*)/s);
              const id = match ? match[1] : opt;
              const text = match ? match[2] : opt;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onAnswer(id)}
                  className={`w-full text-left px-4 py-3 rounded border transition-colors text-sm flex items-start ${
                    currentAnswer === id
                      ? 'border-primary-500 bg-primary-900/40 text-white'
                      : 'border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  <span className="font-mono mr-2 text-slate-500 shrink-0">{String.fromCharCode(65 + i)}.</span>
                  <MarkdownContent content={text} className="flex-1" />
                </button>
              );
            })}
          </div>
        )}

        {isTextAnswer && (
          <div className="h-full flex flex-col pb-4">
            <label className="label text-xs shrink-0">Your Answer</label>
            <textarea
              className="input font-mono text-sm resize-none flex-1"
              value={currentAnswer}
              onChange={e => onAnswer(e.target.value)}
              placeholder={question.type === 'coding' ? 'Write your code here…' : 'Type your answer…'}
            />
          </div>
        )}
      </div>
    </div>
  )
}
