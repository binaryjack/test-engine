import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useStore.js'
import type { ExamAnswer, Question } from '../../shared/types/index.js'
import { loadResultRequest, generateSuccess } from './store/exam.slice.js'

function AnswerRow({ q, answer }: { q: Question; answer: ExamAnswer | undefined }) {
  const isCorrect = answer?.isCorrect ?? false
  return (
    <div className={`card border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
      <div className="flex items-start justify-between mb-2">
        <span className="badge">{q.topic}</span>
        <span className={`text-sm font-medium ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
          {isCorrect ? 'Correct' : 'Incorrect'}
        </span>
      </div>
      <p className="text-white text-sm mb-3 whitespace-pre-wrap">{q.prompt}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-slate-400">Your answer: </span>
          <span className={`font-mono ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {answer?.userAnswer || <em className="text-slate-500">No answer</em>}
          </span>
        </div>
        {!isCorrect && (
          <div>
            <span className="text-slate-400">Correct answer: </span>
            <span className="text-green-400 font-mono">{q.answer}</span>
          </div>
        )}
      </div>
      {q.explanation && (
        <p className="text-slate-400 text-xs mt-3 border-t border-slate-700 pt-3">{q.explanation}</p>
      )}
    </div>
  )
}

export function ExamResultsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { result, loading, error, session } = useAppSelector(s => s.exam)
  const { token } = useAppSelector(s => s.auth)
  const [retaking, setRetaking] = React.useState(false)

  // Load result from Redux if not already in state
  React.useEffect(() => {
    if (!result && id) {
      dispatch(loadResultRequest(id))
    }
  }, [id, result, dispatch])

  if (loading) return <div className="text-slate-400">Loading results…</div>
  if (error) return <div className="text-red-400">Error: {error}</div>
  if (!result) return <div className="text-slate-400">No results found</div>

  const data = result
  const failedCount = data.totalQuestions - data.correctAnswers
  const scoreColor = data.score >= 70 ? 'text-green-400' : data.score >= 50 ? 'text-yellow-400' : 'text-red-400'

  const handleRetakeFailed = async () => {
    if (failedCount === 0) return
    const prevSessionId = data.session?.id ?? session?.id
    if (!prevSessionId) return
    if (!token) return
    setRetaking(true)
    try {
      const response = await fetch(`/api/exams/${prevSessionId}/retake-failed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data?.id) {
          const newSession = data.data
          // Load questions for the new session
          const questionsResponse = await fetch(
            `/api/questions?technologyId=${newSession.technologyId}&level=${newSession.level}`,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          )
          
          if (questionsResponse.ok) {
            const questionsData = await questionsResponse.json()
            if (questionsData.success && questionsData.data) {
              const allQuestions = questionsData.data
              // Filter to only the questions in this session
              const sessionQuestions = allQuestions.filter((q: Question) => 
                newSession.questionIds.includes(q.id)
              )
              
              // Dispatch to load the session into Redux
              dispatch(generateSuccess({ session: newSession, questions: sessionQuestions }))
              // Navigate to new session
              navigate(`/exam/session/${newSession.id}`, { replace: true })
              return
            }
          }
        }
        setRetaking(false)
      } else {
        console.error('Failed to retake exam')
        setRetaking(false)
      }
    } catch (error) {
      console.error('Error retaking exam:', error)
      setRetaking(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Score header */}
      <div className="card text-center">
        <div className={`text-6xl font-bold ${scoreColor} mb-2`}>{data.score}%</div>
        <div className="text-slate-400">
          {data.correctAnswers} of {data.totalQuestions} correct
        </div>
        <div className="text-slate-500 text-sm mt-1">
          {data.score >= 70 ? 'Great job! You passed.' : 'Keep practicing — you\'ll get there!'}
        </div>
        <div className="flex justify-center gap-3 mt-4 flex-wrap">
          <Link to="/exam" className="btn-primary">New Exam</Link>
          {failedCount > 0 && (
            <button
              onClick={handleRetakeFailed}
              disabled={retaking}
              className="btn-secondary"
              title="Retake only the questions you got wrong"
            >
              {retaking ? 'Loading...' : `Retake ${failedCount} Failed Question${failedCount !== 1 ? 's' : ''}`}
            </button>
          )}
          <Link to="/dashboard" className="btn-secondary">Dashboard</Link>
        </div>
      </div>

      {/* Breakdown */}
      {Object.keys(data.breakdown).length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">Topic Breakdown</h2>
          <div className="space-y-2">
            {Object.entries(data.breakdown).map(([topic, stats]) => {
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
      )}

      {/* Answer review */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Answer Review</h2>
        <div className="space-y-4">
          {data.questions.map(q => (
            <AnswerRow
              key={q.id}
              q={q}
              answer={data.answers.find((a: ExamAnswer) => a.questionId === q.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
