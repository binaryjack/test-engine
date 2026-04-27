import React from 'react'
import { MarkdownContent } from '../../shared/components/UI/MarkdownContent.js'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useStore.js'
import type { Difficulty, QuestionType } from '../../shared/types/index.js'
import { createQuestionRequest, deleteQuestionRequest, loadQuestionsRequest, loadTechnologiesRequest } from './store/admin.slice.js'

const TYPES: QuestionType[] = ['mcq', 'theory', 'coding', 'debug']
const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard']
const DIFFICULTY_MAP: Record<Difficulty, number> = { easy: 2, medium: 3, hard: 5 }

export function AdminQuestionsPage() {
  const dispatch = useAppDispatch()
  const { questions, technologies, loading } = useAppSelector(s => s.admin)

  const [filterTech, setFilterTech] = React.useState('')
  const [filterLevel, setFilterLevel] = React.useState('')
  const [showForm, setShowForm] = React.useState(false)

  // Form state
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [form, setForm] = React.useState({
    technologyId: '', level: '', topic: '', subtopic: '', type: 'mcq' as QuestionType,
    prompt: '', options: '', answer: '', difficulty: 'medium' as Difficulty,
    estimatedTime: 120, explanation: ''
  })

  React.useEffect(() => {
    dispatch(loadTechnologiesRequest())
    dispatch(loadQuestionsRequest(undefined))
  }, [dispatch])

  const handleFilter = () => {
    dispatch(loadQuestionsRequest({ technologyId: filterTech || undefined, level: filterLevel || undefined }))
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const options = form.type === 'mcq'
      ? form.options.split('\n').map(s => s.trim()).filter(Boolean)
      : undefined
    const payload = {
      technologyId: form.technologyId,
      level: form.level,
      topic: form.topic,
      subtopic: form.subtopic || undefined,
      type: form.type,
      prompt: form.prompt,
      options,
      answer: form.answer,
      difficulty: DIFFICULTY_MAP[form.difficulty as Difficulty] ?? 3,
      estimatedTime: form.estimatedTime,
      explanation: form.explanation || undefined
    }
    if (editingId) {
      // Update existing question
      dispatch({ type: 'admin/updateQuestionRequest', payload: { id: editingId, data: payload } })
    } else {
      dispatch(createQuestionRequest(payload))
    }
    setShowForm(false)
    setEditingId(null)
  }

  const selectedTech = technologies.find(t => t.id === form.technologyId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Questions</h1>
        <button className="btn-primary text-sm" onClick={() => { if (showForm) setEditingId(null); setShowForm(v => !v) }}>
          {showForm ? 'Cancel' : '+ Add Question'}
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <select className="input w-48" value={filterTech} onChange={e => setFilterTech(e.target.value)}>
          <option value="">All technologies</option>
          {technologies.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <input className="input w-32" placeholder="Level" value={filterLevel} onChange={e => setFilterLevel(e.target.value)} />
        <button className="btn-secondary text-sm" onClick={handleFilter}>Filter</button>
      </div>

      {/* Create form */}
      {showForm && (
        <form onSubmit={handleCreate} className="card space-y-4">
          <h2 className="font-medium text-white">{editingId ? 'Edit Question' : 'New Question'}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Technology</label>
              <select className="input" value={form.technologyId}
                onChange={e => setForm(f => ({ ...f, technologyId: e.target.value, level: '' }))} required>
                <option value="">Select…</option>
                {technologies.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Level</label>
              <select className="input" value={form.level}
                onChange={e => setForm(f => ({ ...f, level: e.target.value }))} required>
                <option value="">Select…</option>
                {(selectedTech?.levels ?? []).map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Topic</label>
              <input className="input" value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))} required />
            </div>
            <div>
              <label className="label">Type</label>
              <select className="input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as QuestionType }))}>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Difficulty</label>
              <select className="input" value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value as Difficulty }))}>
                {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Est. Time (seconds)</label>
              <input type="number" className="input" value={form.estimatedTime}
                onChange={e => setForm(f => ({ ...f, estimatedTime: Number(e.target.value) }))} min={10} />
            </div>
          </div>
          <div>
            <label className="label">Prompt</label>
            <textarea className="input font-mono text-sm" rows={4} value={form.prompt}
              onChange={e => setForm(f => ({ ...f, prompt: e.target.value }))} required />
          </div>
          {form.type === 'mcq' && (
            <div>
              <label className="label">Options (one per line)</label>
              <textarea className="input font-mono text-sm" rows={4} value={form.options}
                onChange={e => setForm(f => ({ ...f, options: e.target.value }))} />
            </div>
          )}
          <div>
            <label className="label">Answer</label>
            <input className="input" value={form.answer} onChange={e => setForm(f => ({ ...f, answer: e.target.value }))} required />
          </div>
          <div>
            <label className="label">Explanation (optional)</label>
            <textarea className="input text-sm" rows={3} value={form.explanation}
              onChange={e => setForm(f => ({ ...f, explanation: e.target.value }))} />
          </div>
          <button type="submit" className="btn-primary text-sm" disabled={loading}>{editingId ? 'Update Question' : 'Create Question'}</button>
        </form>
      )}

      {/* Table */}
      <div className="card overflow-x-auto">
        <p className="text-slate-400 text-sm mb-3">{questions.length} questions</p>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-slate-700 text-slate-400">
              <th className="pb-2 pr-4">Prompt</th>
              <th className="pb-2 pr-4">Topic</th>
              <th className="pb-2 pr-4">Level</th>
              <th className="pb-2 pr-4">Type</th>
              <th className="pb-2 pr-4">Difficulty</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {questions.map(q => (
              <tr key={q.id} className="border-b border-slate-800">
                <td className="py-2 pr-4 max-w-md">
                  <MarkdownContent content={q.prompt} className="text-white line-clamp-2 text-xs" />
                </td>
                <td className="py-2 pr-4 text-slate-400 whitespace-nowrap">{q.topic}</td>
                <td className="py-2 pr-4"><span className="badge badge-mid">{q.level}</span></td>
                <td className="py-2 pr-4 text-slate-400">{q.type}</td>
                <td className="py-2 pr-4 text-slate-400">{q.difficulty}</td>
                <td className="py-2">
                  <div className="flex gap-2">
                    <button
                      className="btn-secondary text-xs"
                      onClick={() => {
                          // Populate form and show it for editing
                          const revMap: Record<number, Difficulty> = { 2: 'easy', 3: 'medium', 5: 'hard' }
                          setForm({
                            technologyId: q.technologyId,
                            level: q.level,
                            topic: q.topic,
                            subtopic: q.subtopic ?? '',
                            type: q.type as QuestionType,
                            prompt: q.prompt,
                            options: q.options ? q.options.join('\n') : '',
                            answer: q.answer,
                            difficulty: revMap[q.difficulty] ?? 'medium',
                            estimatedTime: q.estimatedTime,
                            explanation: q.explanation ?? ''
                          })
                          setEditingId(q.id)
                          setShowForm(true)
                        }}
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger text-xs"
                      onClick={() => { if (confirm('Delete this question?')) dispatch(deleteQuestionRequest(q.id)) }}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
