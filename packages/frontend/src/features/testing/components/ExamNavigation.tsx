import type { Question } from '../../../shared/types/index.js'

interface ExamNavigationProps {
  questions: Question[];
  answers: Record<string, string>;
  currentIndex: number;
  loading: boolean;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
  onSubmit: () => void;
}

export function ExamNavigation({ questions, answers, currentIndex, loading, onPrev, onNext, onGoTo, onSubmit }: ExamNavigationProps) {
  const isLast = currentIndex === questions.length - 1;
  const totalAnswered = Object.keys(answers).length;

  return (
    <div className="flex items-center justify-between">
      <button
        className="btn-secondary"
        onClick={onPrev}
        disabled={currentIndex === 0}
      >
        Previous
      </button>

      {/* <div className="flex gap-1">
        {questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => onGoTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === currentIndex
                ? 'bg-primary-500'
                : answers[q.id]
                ? 'bg-green-600'
                : 'bg-slate-600'
            }`}
            title={`Question ${i + 1}`}
          />
        ))}
      </div> */}

      {isLast ? (
        <button
          className="btn-primary"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? 'Submitting…' : `Submit Exam (${totalAnswered}/${questions.length})`}
        </button>
      ) : (
        <button
          className="btn-primary"
          onClick={onNext}
        >
          Next
        </button>
      )}
    </div>
  )
}
