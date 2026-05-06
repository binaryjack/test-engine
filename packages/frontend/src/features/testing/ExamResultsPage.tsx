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
    // Only load the result if we don't have one AND it's safe to assume the ID is correct 
    // (i.e., loading hasn't started for a new session yet, or we are on initial load)
    if (!result && id && !loading && (!session || session.id === id)) {
      dispatch(loadResultRequest(id))
    }
  }, [id, result, dispatch, loading, session])

  // Navigate to session once generated (e.g., from retaking failed)
  React.useEffect(() => {
    // If the session ID changed and it's not the same as the current result's session ID (which is 'id'),
    // navigate to the new session page ONLY if we are currently loading/transitioning, 
    // or if the old result was cleared by a successful retake.
    if (session && session.id !== id) {
      // If loading is false and a new session exists, it means the transition completed.
      if (!loading) {
        navigate(`/exam/session/${session.id}`);
      }
    }
  }, [session, id, loading, navigate]);

  // If result was deleted or transitioned away from, navigate away or show redirect message
  React.useEffect(() => {
    if (!result && !session && !loading && id) {
      // If we were viewing a result but it's gone from state (and no new session), go to dashboard
      navigate('/dashboard')
    } else if (!result && session && session.id !== id && loading === false) {
        // New session created successfully, and we are not actively navigating away yet.
        // This handles the case where retake failed completed but navigation hasn't fired yet.
        return; 
    }
  }, [result, session, loading, navigate, id])

  // Show error toast/alert if there's an error but we still have a result
  React.useEffect(() => {
    if (error && !result) { // Only show alert if no result is present to avoid redundant alerts on state change
      alert(`Error: ${error}`) 
    }
  }, [error, result])

  if (loading && !result) return <div className="text-slate-400">Loading results…</div>
  
  // NEW: Handle transition state explicitly before checking for error/no result
  if (!result && session && session.id !== id && loading === false) {
      return <div className="text-center py-20 text-lg font-semibold text-yellow-400">Redirecting to your new retake exam...</div>;
  }

  if (error && !result) return <div className="text-red-400">Error: {error}</div>
  if (!result) return <div className="text-slate-400">No results found</div>

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

