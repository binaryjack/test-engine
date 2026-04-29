import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useStore.js'
import { ExamAnswerRow } from './components/ExamAnswerRow.js'
import { ExamScoreHeader } from './components/ExamScoreHeader.js'
import { ExamTopicBreakdown } from './components/ExamTopicBreakdown.js'
import { deleteExamRequest, loadResultRequest, retakeFailedRequest } from './store/exam.slice.js'

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
    // If the session ID changed and it's not the same as the current result's session ID (which is 'id'),
    // navigate to the new session page
    if (session && session.id !== id && !loading) {
      navigate(`/exam/session/${session.id}`);
    }
  }, [session, id, loading, navigate]);

  // If result was deleted, navigate away
  React.useEffect(() => {
    if (!result && !session && !loading && id) {
      // If we were viewing a result but it's gone from state (and no new session), go to dashboard
      navigate('/dashboard')
    }
  }, [result, session, loading, navigate, id])

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
    
    dispatch(retakeFailedRequest(prevSessionId))
  }

  const handleDelete = () => {
    if (!id) return
    if (window.confirm('Are you sure you want to delete this exam attempt? This cannot be undone.')) {
      dispatch(deleteExamRequest(id))
    }
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
        onDelete={handleDelete}
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

