import React from 'react'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useStore.js'
import { bulkImportQuestionsRequest, loadTechnologiesRequest } from './store/admin.slice.js'
import { formatToCsv, formatToQuestionBuilder, parseCsv, parseQuestionBuilder } from './utils/bulk-parser.js'

type BulkMode = 'builder-to-csv' | 'csv-to-builder' | 'csv-to-db'

export function AdminBulkPage() {
  const dispatch = useAppDispatch()
  const { technologies, loading, error } = useAppSelector(s => s.admin)
  
  const [mode, setMode] = React.useState<BulkMode>('builder-to-csv')
  const [input, setInput] = React.useState('')
  const [output, setOutput] = React.useState('')
  
  // Selection for DB import
  const [baseTechId, setBaseTechId] = React.useState('')
  const [baseLevel, setBaseLevel] = React.useState('')

  React.useEffect(() => {
    if (technologies.length === 0) {
      dispatch(loadTechnologiesRequest())
    }
  }, [dispatch, technologies.length])

  const handleConvert = () => {
    if (!input.trim()) return
    
    try {
      if (mode === 'builder-to-csv') {
        const questions = parseQuestionBuilder(input)
        setOutput(formatToCsv(questions))
      } else if (mode === 'csv-to-builder') {
        const questions = parseCsv(input)
        setOutput(formatToQuestionBuilder(questions))
      }
    } catch (err) {
      alert('Conversion failed. Check console for details.')
      console.error(err)
    }
  }

  const handleImportToDb = () => {
    if (!baseTechId || !baseLevel) {
      alert('Please select a base Technology and Level for the import.')
      return
    }
    if (!input.trim()) return

    try {
      const parsed = parseCsv(input)
      const payload = parsed.map(q => ({
        technologyId: baseTechId,
        level: baseLevel,
        topic: q.inherits || 'General',
        subtopic: q.subtopic,
        type: 'mcq' as const,
        prompt: q.prompt,
        options: q.options,
        answer: q.answer,
        difficulty: q.difficulty,
        estimatedTime: q.estimatedTime,
        explanation: q.explanation,
        references: q.references
      }))

      if (window.confirm(`Import ${payload.length} questions to the database?`)) {
        dispatch(bulkImportQuestionsRequest(payload))
      }
    } catch (err) {
      alert('Parsing failed. Check your CSV format.')
      console.error(err)
    }
  }

  const handleDownload = () => {
    const content = output || input
    if (!content) return
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = mode === 'builder-to-csv' ? 'questions.csv' : 'questions.ts'
    a.click()
    URL.revokeObjectURL(url)
  }

  const selectedTech = technologies.find(t => t.id === baseTechId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Bulk Management Tools</h1>
        <div className="flex items-center gap-2">
          {output && (
            <button className="btn-secondary text-sm" onClick={handleDownload}>
              Download Result
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 rounded px-3 py-2 text-sm">{error}</div>
      )}

      <div className="card space-y-6">
        <div className="space-y-2">
          <label className="label">Conversion Mode</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-white">
              <input 
                type="radio" 
                className="accent-primary-500" 
                checked={mode === 'builder-to-csv'} 
                onChange={() => { setMode('builder-to-csv'); setOutput('') }} 
              />
              Builder → CSV
            </label>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-white">
              <input 
                type="radio" 
                className="accent-primary-500" 
                checked={mode === 'csv-to-builder'} 
                onChange={() => { setMode('csv-to-builder'); setOutput('') }} 
              />
              CSV → Builder
            </label>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-white">
              <input 
                type="radio" 
                className="accent-primary-500" 
                checked={mode === 'csv-to-db'} 
                onChange={() => { setMode('csv-to-db'); setOutput('') }} 
              />
              CSV → Database
            </label>
          </div>
        </div>

        {mode === 'csv-to-db' && (
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-900/50 rounded border border-slate-700">
            <div>
              <label htmlFor="base-tech-select" className="label">Target Technology</label>
              <select 
                id="base-tech-select"
                className="input" 
                value={baseTechId} 
                onChange={e => setBaseTechId(e.target.value)}
              >
                <option value="">Select...</option>
                {technologies.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="base-level-select" className="label">Target Level</label>
              <select 
                id="base-level-select"
                className="input" 
                value={baseLevel} 
                onChange={e => setBaseLevel(e.target.value)}
              >
                <option value="">Select...</option>
                {selectedTech?.levels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <p className="col-span-2 text-[10px] text-slate-500 italic">
              Note: The 'inherits' column will be used as the 'Topic' field.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label htmlFor="bulk-input" className="label">Input Area</label>
            <textarea 
              id="bulk-input"
              className="input h-64 font-mono text-xs custom-scrollbar" 
              placeholder={mode === 'builder-to-csv' ? 'Paste QuestionBuilder() code here...' : 'inherits | subtopic | prompt | options | answer | difficulty | estimatedTime | explanation | references'}
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            {mode === 'csv-to-db' ? (
              <button 
                className="btn-primary flex-1" 
                onClick={handleImportToDb}
                disabled={loading}
              >
                {loading ? 'Importing...' : 'Import to Database'}
              </button>
            ) : (
              <button 
                className="btn-primary flex-1" 
                onClick={handleConvert}
              >
                Convert
              </button>
            )}
            <button className="btn-secondary px-6" onClick={() => { setInput(''); setOutput('') }}>
              Clear
            </button>
          </div>

          {output && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <label htmlFor="bulk-output" className="label">Result Area</label>
              <textarea 
                id="bulk-output"
                className="input h-64 font-mono text-xs custom-scrollbar bg-slate-900/30" 
                value={output} 
                readOnly 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
