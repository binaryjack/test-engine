
interface ExamScoreHeaderProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  failedCount: number;
  retaking: boolean;
  onRetakeFailed: () => void;
  onNewExam: () => void;
  onDashboard: () => void;
}

export function ExamScoreHeader({
  score,
  correctAnswers,
  totalQuestions,
  failedCount,
  retaking,
  onRetakeFailed,
  onNewExam,
  onDashboard
}: ExamScoreHeaderProps) {
  const scoreColor = score >= 70 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'

  return (
    <div className="card text-center">
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
