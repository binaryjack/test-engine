
interface ExamHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  totalAnswered: number;
  difficulty: string;
  topic: string;
}

export function ExamHeader({ currentIndex, totalQuestions, totalAnswered, difficulty, topic }: ExamHeaderProps) {
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flex items-center justify-between">
      <div>
        <span className="text-slate-400 text-sm">Question {currentIndex + 1} of {totalQuestions}</span>
        <div className="w-64 bg-slate-700 rounded-full h-1.5 mt-1">
          <div
            className="bg-primary-500 h-1.5 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 text-slate-400 text-sm">
        <span>{totalAnswered}/{totalQuestions} answered</span>
        <span className={`badge ${difficulty === 'easy' ? 'badge-mid' : difficulty === 'hard' ? 'badge-senior' : 'badge'}`}>
          {difficulty}
        </span>
        <span className="badge">{topic}</span>
      </div>
    </div>
  )
}
