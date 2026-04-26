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
      <p className="text-white text-sm mb-3 whitespace-pre-wrap">{question.prompt}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-slate-400">Your answer: </span>
          <span className={`font-mono ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {answer?.userAnswer || <em className="text-slate-500">No answer</em>}
          </span>
        </div>
        {!isCorrect && (
          <div>
            <span className="text-slate-400">Correct answer: </span>
            <span className="text-green-400 font-mono">{question.answer}</span>
          </div>
        )}
      </div>
      {question.explanation && (
        <p className="text-slate-400 text-xs mt-3 border-t border-slate-700 pt-3">{question.explanation}</p>
      )}
    </div>
  )
}
