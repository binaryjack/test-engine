
interface ExamScoreHeaderProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  failedCount: number;
  retaking: boolean;
  onRetakeFailed: () => void;
  onNewExam: () => void;
  onDashboard: () => void;
  onDelete?: () => void;
}

export function ExamScoreHeader({
  score,
  correctAnswers,
  totalQuestions,
  failedCount,
  retaking,
  onRetakeFailed,
  onNewExam,
  onDashboard,
  onDelete
}: ExamScoreHeaderProps) {
  const scoreColor = score >= 70 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'

  return (
    <div className="card text-center relative group">
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors"
          title="Delete this exam attempt"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      )}
      <div className={`text-6xl font-bold ${scoreColor} mb-2`}>{score}%</div>
      <div className="text-slate-400">
        {correctAnswers} of {totalQuestions} correct
      </div>
      <div className="text-slate-500 text-sm mt-1">
        {score >= 70 ? 'Great job! You passed.' : 'Keep practicing — you\'ll get there!'}
      </div>
      <div className="flex justify-center gap-3 mt-4 flex-wrap">
        <button type="button" onClick={onNewExam} className="btn-primary">New Exam</button>
        {failedCount > 0 && (
          <button
            onClick={onRetakeFailed}
            disabled={retaking}
            className="btn-secondary"
            title="Retake only the questions you got wrong"
          >
            {retaking ? 'Loading...' : `Retake ${failedCount} Failed Question${failedCount !== 1 ? 's' : ''}`}
          </button>
        )}
        <button type="button" onClick={onDashboard} className="btn-secondary">Dashboard</button>
      </div>
    </div>
  )
}
