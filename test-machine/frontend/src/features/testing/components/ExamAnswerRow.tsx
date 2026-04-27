import { MarkdownContent } from '../../../shared/components/UI/MarkdownContent.js'
import type { ExamAnswer, Question } from '../../../shared/types/index.js'

interface ExamAnswerRowProps {
  question: Question;
  answer: ExamAnswer | undefined;
}

export function ExamAnswerRow({ question, answer }: ExamAnswerRowProps) {
  const isCorrect = answer?.isCorrect ?? false
  return (
    <div className={`card border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
      <div className="flex items-start justify-between mb-2">
        <span className="badge">{question.topic}</span>
        <span className={`text-sm font-medium ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
          {isCorrect ? 'Correct' : 'Incorrect'}
        </span>
      </div>
      <MarkdownContent content={question.prompt} className="text-white text-sm mb-3" />
      <div className="grid grid-cols-1 gap-4 text-sm mt-4">
        <div className="space-y-1">
          <span className="text-slate-400 block text-xs uppercase tracking-wider font-semibold">Your answer:</span>
          <div className={`p-3 rounded bg-slate-950/50 border ${isCorrect ? 'border-green-900/50' : 'border-red-900/50'}`}>
            <MarkdownContent 
              content={answer?.userAnswer || ''} 
              className={`font-mono ${isCorrect ? 'text-green-400' : 'text-red-400'}`} 
            />
            {!answer?.userAnswer && <em className="text-slate-500">No answer</em>}
          </div>
        </div>
        {!isCorrect && (
          <div className="space-y-1">
            <span className="text-slate-400 block text-xs uppercase tracking-wider font-semibold">Correct answer:</span>
            <div className="p-3 rounded bg-slate-950/50 border border-green-900/50">
              <MarkdownContent content={question.answer} className="text-green-400 font-mono" />
            </div>
          </div>
        )}
      </div>
      {question.explanation && (
        <p className="text-slate-400 text-xs mt-3 border-t border-slate-700 pt-3">{question.explanation}</p>
      )}
    </div>
  )
}
