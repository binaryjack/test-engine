import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useStore.js'
import { generateRequest } from './store/exam.slice.js'
import { loadTechnologiesRequest } from '../admin/store/admin.slice.js'

export function ExamSetupPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { session, loading, error } = useAppSelector(s => s.exam)
  const { technologies, loading: adminLoading } = useAppSelector(s => s.admin)

  const [selectedTech, setSelectedTech] = React.useState('')
  const [selectedLevel, setSelectedLevel] = React.useState('')
  const [count, setCount] = React.useState(20)

  // Load technologies from admin store on mount
  React.useEffect(() => {
    if (technologies.length === 0) {
      dispatch(loadTechnologiesRequest())
    }
  }, [dispatch, technologies.length])

  // Navigate to session once generated
  React.useEffect(() => {
    if (session && !loading) navigate(`/exam/session/${session.id}`)
  }, [session, loading, navigate])

  const selectedTechObj = technologies.find(t => t.id === selectedTech)

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTech || !selectedLevel) return
    dispatch(generateRequest({ technologyId: selectedTech, level: selectedLevel, count }))
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">New Exam</h1>
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 rounded px-3 py-2 text-sm">{error}</div>
      )}
      <form onSubmit={handleStart} className="card space-y-5">
        <div>
          <label className="label">Technology</label>
          <select
            className="input"
            value={selectedTech}
            onChange={e => { setSelectedTech(e.target.value); setSelectedLevel('') }}
            required
            disabled={adminLoading || technologies.length === 0}
          >
            <option value="">{adminLoading ? 'Loading…' : 'Select technology…'}</option>
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
                  onClick={() => setSelectedLevel(level)}
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
          <label className="label">Number of Questions: {count}</label>
          <input
            type="range"
            min={5}
            max={80}
            step={5}
            value={count}
            onChange={e => setCount(Number(e.target.value))}
            className="w-full accent-primary-500"
          />
          <div className="flex justify-between text-slate-500 text-xs mt-1">
            <span>5</span><span>80</span>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading || adminLoading || !selectedTech || !selectedLevel}
        >
          {loading ? 'Generating…' : 'Start Exam'}
        </button>
      </form>
    </div>
  )
}
