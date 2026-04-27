import React from 'react'
import type { Difficulty, QuestionType, Technology } from '../../../shared/types/index.js'

const TYPES: QuestionType[] = ['mcq', 'theory', 'coding', 'debug']
const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard']

interface QuestionFormState {
  technologyId: string
  level: string
  topic: string
  subtopic: string
  type: QuestionType
  prompt: string
  options: string
  answer: string
  difficulty: Difficulty
  estimatedTime: number
  explanation: string
}

interface Props {
  editingId: string | null
  form: QuestionFormState
  setForm: React.Dispatch<React.SetStateAction<QuestionFormState>>
  technologies: Technology[]
  onSubmit: (e: React.FormEvent) => void
  loading: boolean
}

export function QuestionForm({
  editingId,
  form,
  setForm,
  technologies,
  onSubmit,
  loading
}: Props) {
  const selectedTech = technologies.find(t => t.id === form.technologyId)

  return (
    <form onSubmit={onSubmit} className="card space-y-4">
      <h2 className="font-medium text-white">{editingId ? 'Edit Question' : 'New Question'}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="tech-select" className="label">Technology</label>
          <select 
            id="tech-select"
            className="input" 
            value={form.technologyId}
            onChange={e => setForm(f => ({ ...f, technologyId: e.target.value, level: '' }))} 
            required
          >
            <option value="">Select…</option>
            {technologies.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="level-select" className="label">Level</label>
          <select 
            id="level-select"
            className="input" 
            value={form.level}
            onChange={e => setForm(f => ({ ...f, level: e.target.value }))} 
            required
          >
            <option value="">Select…</option>
            {(selectedTech?.levels ?? []).map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="topic-input" className="label">Topic</label>
          <input 
            id="topic-input"
            className="input" 
            value={form.topic} 
            onChange={e => setForm(f => ({ ...f, topic: e.target.value }))} 
            required 
          />
        </div>
        <div>
          <label htmlFor="type-select" className="label">Type</label>
          <select 
            id="type-select"
            className="input" 
            value={form.type} 
            onChange={e => setForm(f => ({ ...f, type: e.target.value as QuestionType }))}
          >
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="difficulty-select" className="label">Difficulty</label>
          <select 
            id="difficulty-select"
            className="input" 
            value={form.difficulty} 
            onChange={e => setForm(f => ({ ...f, difficulty: e.target.value as Difficulty }))}
          >
            {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="time-input" className="label">Est. Time (seconds)</label>
          <input 
            id="time-input"
            type="number" 
            className="input" 
            value={form.estimatedTime}
            onChange={e => setForm(f => ({ ...f, estimatedTime: Number(e.target.value) }))} 
            min={10} 
          />
        </div>
      </div>
      <div>
        <label htmlFor="prompt-area" className="label">Prompt</label>
        <textarea 
          id="prompt-area"
          className="input font-mono text-sm" 
          rows={4} 
          value={form.prompt}
          onChange={e => setForm(f => ({ ...f, prompt: e.target.value }))} 
          required 
        />
      </div>
      {form.type === 'mcq' && (
        <div>
          <label htmlFor="options-area" className="label">Options (one per line)</label>
          <textarea 
            id="options-area"
            className="input font-mono text-sm" 
            rows={4} 
            value={form.options}
            onChange={e => setForm(f => ({ ...f, options: e.target.value }))} 
          />
        </div>
      )}
      <div>
        <label htmlFor="answer-input" className="label">Answer</label>
        <input 
          id="answer-input"
          className="input" 
          value={form.answer} 
          onChange={e => setForm(f => ({ ...f, answer: e.target.value }))} 
          required 
        />
      </div>
      <div>
        <label htmlFor="explanation-area" className="label">Explanation (optional)</label>
        <textarea 
          id="explanation-area"
          className="input text-sm" 
          rows={3} 
          value={form.explanation}
          onChange={e => setForm(f => ({ ...f, explanation: e.target.value }))} 
        />
      </div>
      <button 
        type="submit" 
        className="btn-primary text-sm" 
        disabled={loading}
      >
        {editingId ? 'Update Question' : 'Create Question'}
      </button>
    </form>
  )
}
