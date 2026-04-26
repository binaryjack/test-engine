import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useStore.js'
import { ExamAnswerRow } from './components/ExamAnswerRow.js'
import { ExamScoreHeader } from './components/ExamScoreHeader.js'
import { ExamTopicBreakdown } from './components/ExamTopicBreakdown.js'
import { loadResultRequest, retakeFailedRequest } from './store/exam.slice.js'

export function ExamResultsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { result, loading, error, session } = useAppSelector(s => s.exam)

  // Load result from Redux if not already in state
  React.useEffect(() => {
    if (!result && id) {
      dispatch(loadResultRequest(id))
    }
  }, [id, result, dispatch])

  // Navigate to session once generated (e.g., from retaking failed)
  const prevSessionIdRef = React.useRef(session?.id);
  React.useEffect(() => {
    if (session && session.id !== prevSessionIdRef.current && prevSessionIdRef.current) {
      navigate(`/exam/session/${session.id}`);
    }
  }, [session, navigate]);

  // Show error toast/alert if there's an error but we still have a result
  React.useEffect(() => {
    if (error && result) {
      alert(`Error: ${error}`) // Simplest way to show the error
    }
  }, [error, result])

  if (loading && !result) return <div className="text-slate-400">Loading results…</div>
  if (error && !result) return <div className="text-red-400">Error: {error}</div>
  if (!result) return <div className="text-slate-400">No results found</div>

  const data = result
  const failedCount = data.totalQuestions - data.correctAnswers

  const handleRetakeFailed = () => {
    if (failedCount === 0) return
    const prevSessionId = data.session?.id ?? session?.id
    if (!prevSessionId) return
    
    prevSessionIdRef.current = prevSessionId
    dispatch(retakeFailedRequest(prevSessionId))
  }

  return (
    <div className="space-y-8">
      <ExamScoreHeader 
        score={data.score}
        correctAnswers={data.correctAnswers}
        totalQuestions={data.totalQuestions}
        failedCount={failedCount}
        retaking={loading}
        onRetakeFailed={handleRetakeFailed}
        onNewExam={() => navigate('/exam')}
        onDashboard={() => navigate('/dashboard')}
      />

      {Object.keys(data.breakdown).length > 0 && (
        <ExamTopicBreakdown breakdown={data.breakdown} />
      )}

      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Answer Review</h2>
        <div className="space-y-4">
          {data.questions.map(q => (
            <ExamAnswerRow
              key={q.id}
              question={q}
              answer={data.answers.find(a => a.questionId === q.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

