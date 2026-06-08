
interface ExamTopicBreakdownProps {
  breakdown: Record<string, { correct: number; total: number }>;
}

export function ExamTopicBreakdown({ breakdown }: ExamTopicBreakdownProps) {
  if (Object.keys(breakdown).length === 0) return null

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-white mb-4">Topic Breakdown</h2>
      <div className="space-y-2">
        {Object.entries(breakdown).map(([topic, stats]) => {
          const pct = Math.round((stats.correct / stats.total) * 100)
          return (
            <div key={topic} className="flex items-center gap-3">
              <span className="text-slate-300 text-sm w-40 truncate">{topic}</span>
              <div className="flex-1 bg-slate-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${pct >= 70 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-slate-400 text-sm w-16 text-right">{stats.correct}/{stats.total}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
