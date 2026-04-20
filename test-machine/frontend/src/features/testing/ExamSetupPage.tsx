import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useStore.js'
import { generateRequest } from './store/exam.slice.js'
import { loadPublicTechnologiesRequest } from '../admin/store/admin.slice.js'
import { examApi } from './api/exam.api.js'

export function ExamSetupPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { session, loading, error } = useAppSelector(s => s.exam)
  const { technologies, loading: adminLoading } = useAppSelector(s => s.admin)

  const [selectedTechs, setSelectedTechs] = React.useState<string[]>([])
  const [selectedLevel, setSelectedLevel] = React.useState('')
  const [count, setCount] = React.useState(20)
  const [availableCount, setAvailableCount] = React.useState(80)

  // Load technologies from admin store on mount
  React.useEffect(() => {
    if (technologies.length === 0) {
      dispatch(loadPublicTechnologiesRequest())
    }
  }, [dispatch, technologies.length])

  // Navigate to session once generated
  React.useEffect(() => {
    if (session && !loading) navigate(`/exam/session/${session.id}`)
  }, [session, loading, navigate])

  const selectedTechObj = technologies.find(t => t.id === (selectedTechs[0] ?? ''))

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedTechs.length === 0 || !selectedLevel) return
    const payload = selectedTechs.length > 1
      ? { technologyIds: selectedTechs, level: selectedLevel, count }
      : { technologyId: selectedTechs[0], level: selectedLevel, count }
    dispatch(generateRequest(payload as any))
  }

  // Compute available questions count for slider (across selected technologies and level)
  React.useEffect(() => {
    let cancelled = false
    async function compute() {
      try {
        let total = 0
        if (selectedTechs.length === 0) {
          const res = await examApi.getQuestions(undefined, selectedLevel || undefined)
          if (res.success && res.data) total = res.data.length
        } else {
          for (const tid of selectedTechs) {
            const res = await examApi.getQuestions(tid, selectedLevel || undefined)
            if (res.success && res.data) total += res.data.length
          }
        }
        if (!cancelled) {
          setAvailableCount(total || 1)
          setCount(c => Math.min(c, total || 1))
        }
      } catch (err) {
        // ignore
      }
    }
    compute()
    return () => { cancelled = true }
  }, [selectedTechs, selectedLevel])

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
              setSelectedTechs(opts)
              setSelectedLevel('')
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
            min={1}
            max={availableCount}
            step={1}
            value={count}
            onChange={e => setCount(Number(e.target.value))}
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
