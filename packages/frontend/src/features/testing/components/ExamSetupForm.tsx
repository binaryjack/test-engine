import React from 'react';
import { LevelSelector } from './LevelSelector.js';

interface ExamSetupFormProps {
  technologies: { id: string; name: string; levels: string[] }[];
  loading: boolean;
  adminLoading: boolean;
  selectedTechs: string[];
  selectedConfigs: Record<string, number>; // techId:level -> count
  availableCounts: Record<string, number>; // techId:level -> count
  mode: number;
  onTechChange: (techs: string[]) => void;
  onToggleLevel: (techId: string, level: string) => void;
  onConfigCountChange: (techId: string, level: string, count: number) => void;
  onModeChange: (mode: number) => void;
  onSubmit: () => void;
  error: string | null;
}

export function ExamSetupForm({
  technologies,
  loading,
  adminLoading,
  selectedTechs,
  selectedConfigs,
  availableCounts,
  mode,
  onTechChange,
  onToggleLevel,
  onConfigCountChange,
  onModeChange,
  onSubmit,
  error
}: ExamSetupFormProps) {
  const handleStart = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  const totalQuestions = Object.values(selectedConfigs).reduce((sum, c) => sum + c, 0)

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">New Mixed Exam</h1>
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 rounded px-3 py-2 text-sm">{error}</div>
      )}
      <form onSubmit={handleStart} className="card space-y-6">
        <div>
          <label className="label">1. Choose Technologies</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {technologies.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  const isSelected = selectedTechs.includes(t.id)
                  const next = isSelected 
                    ? selectedTechs.filter(id => id !== t.id)
                    : [...selectedTechs, t.id]
                  onTechChange(next)
                }}
                className={`text-left px-3 py-2 rounded border text-sm transition-all ${
                  selectedTechs.includes(t.id)
                    ? 'bg-primary-900/30 border-primary-500 text-white shadow-sm'
                    : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
          {technologies.length === 0 && !adminLoading && (
            <p className="text-xs text-slate-500 mt-2 italic">No technologies available.</p>
          )}
        </div>

        {selectedTechs.length > 0 && (
          <div className="space-y-3">
            <label className="label">2. Configure Levels & Question Counts</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedTechs.map(techId => {
                const tech = technologies.find(t => t.id === techId)
                if (!tech) return null
                return tech.levels.map(level => {
                  const configKey = `${techId}:${level}`
                  return (
                    <LevelSelector
                      key={configKey}
                      technologyName={tech.name}
                      level={level}
                      count={selectedConfigs[configKey] ?? 0}
                      availableCount={availableCounts[configKey] ?? 0}
                      isSelected={configKey in selectedConfigs}
                      onToggle={() => onToggleLevel(techId, level)}
                      onCountChange={(val) => onConfigCountChange(techId, level, val)}
                    />
                  )
                })
              })}
            </div>
          </div>
        )}

        <div>
          <label className="label">3. Session Mode</label>
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

        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">Total Selected:</span>
            <span className="text-2xl font-bold text-white">{totalQuestions} <span className="text-xs text-slate-500 font-normal">questions</span></span>
          </div>
          <button
            type="submit"
            className="btn-primary w-full py-3"
            disabled={loading || adminLoading || totalQuestions === 0}
          >
            {loading ? 'Generating Mixed Exam…' : 'Start Mixed Exam'}
          </button>
        </div>
      </form>
    </div>
  )
}
