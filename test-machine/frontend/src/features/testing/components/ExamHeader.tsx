
interface ExamHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  totalAnswered: number;
  difficulty: string;
  topic: string;
  timeLeft?: number | null;
}

export function ExamHeader({ currentIndex, totalQuestions, totalAnswered, difficulty, topic, timeLeft }: ExamHeaderProps) {
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        {timeLeft !== null && timeLeft !== undefined && (
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Time Left</span>
            <span className={`text-xl font-mono leading-none ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-primary-400'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
        <div>
          <span className="text-slate-400 text-sm">Question {currentIndex + 1} of {totalQuestions}</span>
          <div className="w-64 bg-slate-700 rounded-full h-1.5 mt-1">
            <div
              className="bg-primary-500 h-1.5 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
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
