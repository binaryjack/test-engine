import React from 'react'

interface ExamSetupFormProps {
  technologies: { id: string; name: string; levels: string[] }[];
  loading: boolean;
  adminLoading: boolean;
  selectedTechs: string[];
  selectedLevel: string;
  count: number;
  availableCount: number;
  mode: number;
  onTechChange: (techs: string[]) => void;
  onLevelChange: (level: string) => void;
  onCountChange: (count: number) => void;
  onModeChange: (mode: number) => void;
  onSubmit: () => void;
  error: string | null;
}

export function ExamSetupForm({
  technologies,
  loading,
  adminLoading,
  selectedTechs,
  selectedLevel,
  count,
  availableCount,
  mode,
  onTechChange,
  onLevelChange,
  onCountChange,
  onModeChange,
  onSubmit,
  error
}: ExamSetupFormProps) {
  const selectedTechObj = technologies.find(t => t.id === (selectedTechs[0] ?? ''))

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">New Exam</h1>
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 rounded px-3 py-2 text-sm">{error}</div>
      )}
      <form onSubmit={handleStart} className="card space-y-5">
        <div>
          <label className="label">Technologies (hold Ctrl/Cmd to multi-select)</label>
          <select
            className="input h-36"
            multiple
            value={selectedTechs}
            onChange={e => {
              const opts = Array.from(e.target.selectedOptions).map(o => o.value)
              onTechChange(opts)
            }}
            required
            disabled={adminLoading || technologies.length === 0}
          >
            {technologies.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {selectedTechObj && selectedTechObj.levels.length > 0 && (
          <div>
            <label className="label">Level</label>
            <div className="flex flex-wrap gap-2">
              {selectedTechObj.levels.map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => onLevelChange(level)}
                  className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${
                    selectedLevel === level
                      ? 'bg-primary-600 border-primary-500 text-white'
                      : 'border-slate-600 text-slate-300 hover:border-primary-500 hover:text-primary-400'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="label">Session Mode</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onModeChange(1)}
              className={`flex flex-col items-center p-3 rounded border transition-all ${
                mode === 1 
                  ? 'bg-primary-900/40 border-primary-500 text-white' 
                  : 'border-slate-700 text-slate-400 hover:border-slate-500'
              }`}
            >
              <span className="text-sm font-bold">Practice</span>
              <span className="text-[10px] text-slate-500">No timer, untimed</span>
            </button>
            <button
              type="button"
              onClick={() => onModeChange(2)}
              className={`flex flex-col items-center p-3 rounded border transition-all ${
                mode === 2 
                  ? 'bg-primary-900/40 border-primary-500 text-white' 
                  : 'border-slate-700 text-slate-400 hover:border-slate-500'
              }`}
            >
              <span className="text-sm font-bold">Exam</span>
              <span className="text-[10px] text-slate-500">Time-boxed session</span>
            </button>
          </div>
        </div>

        <div>
          <label className="label">Number of Questions: {count}</label>
          <input
            type="range"
            min={1}
            max={availableCount}
            step={1}
            value={count}
            onChange={e => onCountChange(Number(e.target.value))}
            className="w-full accent-primary-500"
          />
          <div className="flex justify-between text-slate-500 text-xs mt-1">
            <span>1</span><span>{availableCount}</span>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading || adminLoading || selectedTechs.length === 0 || !selectedLevel}
        >
          {loading ? 'Generating…' : 'Start Exam'}
        </button>
      </form>
    </div>
  )
}
