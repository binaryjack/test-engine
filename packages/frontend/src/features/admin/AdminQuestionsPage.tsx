import React from 'react'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useStore.js'
import type { Difficulty, Question, QuestionType } from '../../shared/types/index.js'
import { QuestionFilters } from './components/QuestionFilters.js'
import { QuestionForm } from './components/QuestionForm.js'
import { QuestionTable } from './components/QuestionTable.js'
import { createQuestionRequest, deleteQuestionRequest, loadQuestionsRequest, loadTechnologiesRequest } from './store/admin.slice.js'

const DIFFICULTY_MAP: Record<Difficulty, number> = { easy: 2, medium: 3, hard: 5 }
const REVERSE_DIFFICULTY_MAP: Record<number, Difficulty> = { 2: 'easy', 3: 'medium', 5: 'hard' }

const INITIAL_FORM_STATE = {
  technologyId: '',
  level: '',
  topic: '',
  subtopic: '',
  type: 'mcq' as QuestionType,
  prompt: '',
  options: '',
  answer: '',
  difficulty: 'medium' as Difficulty,
  estimatedTime: 120,
  explanation: ''
}

export function AdminQuestionsPage() {
  const dispatch = useAppDispatch()
  const { questions, technologies, loading } = useAppSelector(s => s.admin)

  const [filterTech, setFilterTech] = React.useState('')
  const [filterLevel, setFilterLevel] = React.useState('')
  const [showForm, setShowForm] = React.useState(false)

  // Form state
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [form, setForm] = React.useState(INITIAL_FORM_STATE)

  React.useEffect(() => {
    dispatch(loadTechnologiesRequest())
    dispatch(loadQuestionsRequest(undefined))
  }, [dispatch])

  const handleFilter = () => {
    dispatch(loadQuestionsRequest({ 
      technologyId: filterTech || undefined, 
      level: filterLevel || undefined 
    }))
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
      difficulty: DIFFICULTY_MAP[form.difficulty] ?? 3,
      estimatedTime: form.estimatedTime,
      explanation: form.explanation || undefined
    }

    if (editingId) {
      dispatch({ type: 'admin/updateQuestionRequest', payload: { id: editingId, data: payload } })
    } else {
      dispatch(createQuestionRequest(payload))
    }
    
    setShowForm(false)
    setEditingId(null)
    setForm(INITIAL_FORM_STATE)
  }

  const handleEdit = (q: Question) => {
    setForm({
      technologyId: q.technologyId,
      level: q.level,
      topic: q.topic,
      subtopic: q.subtopic ?? '',
      type: q.type as QuestionType,
      prompt: q.prompt,
      options: q.options ? q.options.join('\n') : '',
      answer: q.answer,
      difficulty: REVERSE_DIFFICULTY_MAP[q.difficulty as unknown as number] ?? 'medium',
      estimatedTime: q.estimatedTime,
      explanation: q.explanation ?? ''
    })
    setEditingId(q.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this question?')) {
      dispatch(deleteQuestionRequest(id))
    }
  }

  const toggleForm = () => {
    if (showForm) {
      setEditingId(null)
      setForm(INITIAL_FORM_STATE)
    }
    setShowForm(!showForm)
  }

  return (
    <div className="flex flex-col h-full space-y-6 overflow-hidden">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-xl font-semibold text-white">Questions</h1>
        <button className="btn-primary text-sm" onClick={toggleForm}>
          {showForm ? 'Cancel' : '+ Add Question'}
        </button>
      </div>

      <div className="shrink-0">
        <QuestionFilters
          technologies={technologies}
          filterTech={filterTech}
          setFilterTech={setFilterTech}
          filterLevel={filterLevel}
          setFilterLevel={setFilterLevel}
          onFilter={handleFilter}
        />
      </div>

      <div className="flex-1 overflow-hidden">
        {showForm ? (
          <div className="overflow-y-auto h-full pr-1 custom-scrollbar">
            <QuestionForm
              editingId={editingId}
              form={form}
              setForm={setForm}
              technologies={technologies}
              onSubmit={handleCreate}
              loading={loading}
            />
          </div>
        ) : (
          <QuestionTable
            questions={questions}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        )}
      </div>
    </div>
  )
}
