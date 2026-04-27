import { format } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useStore.js'
import { deleteExamRequest } from '../testing/store/exam.slice.js'
import { loadHistoryRequest, loadStatsRequest } from './store/analytics.slice.js'

export function DashboardPage() {
  const dispatch = useAppDispatch()
  const { stats, history, loading } = useAppSelector(s => s.analytics)
  const { loading: examLoading } = useAppSelector(s => s.exam)
  const { user } = useAppSelector(s => s.auth)

  React.useEffect(() => {
    dispatch(loadStatsRequest())
    dispatch(loadHistoryRequest())
  }, [dispatch])

  // Reload history/stats if an exam was deleted
  const [lastExamCount, setLastExamCount] = React.useState(history.length)
  React.useEffect(() => {
    if (history.length !== lastExamCount) {
      setLastExamCount(history.length)
    }
  }, [history.length, lastExamCount])

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this exam attempt? This cannot be undone.')) {
      dispatch(deleteExamRequest(id))
    }
  }

  // Separate exams into completed with all correct, and those with potential retakes
  const completedExams = history.filter(s => s.submittedAt)
  const examsWithFailedQuestions = completedExams.filter(s => (s.score ?? 0) < 100)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.displayName ?? user?.email}
        </h1>
        <p className="text-slate-400 mt-1">Track your progress and start new exams</p>
      </div>

      {/* Stats row */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-400">{stats.totalExams}</div>
            <div className="text-slate-400 text-sm mt-1">Exams Taken</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-400">{stats.avgScore}%</div>
            <div className="text-slate-400 text-sm mt-1">Average Score</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-400">{stats.bestScore}%</div>
            <div className="text-slate-400 text-sm mt-1">Best Score</div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="card flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Ready to practice?</h2>
          <p className="text-slate-400 text-sm">Choose a technology and level to start an exam</p>
        </div>
        <Link to="/exam" className="btn-primary">Start Exam</Link>
      </div>

      {/* Exams with failed questions - retake opportunity */}
      {examsWithFailedQuestions.length > 0 && (
        <div className="card border-l-4 border-l-yellow-500">
          <h2 className="text-lg font-semibold text-white mb-4">Ready to Retake?</h2>
          <p className="text-slate-400 text-sm mb-4">You have {examsWithFailedQuestions.length} exam{examsWithFailedQuestions.length !== 1 ? 's' : ''} with questions you can retake.</p>
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {examsWithFailedQuestions.map(session => (
              <div key={session.id} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                <div>
                  <span className="text-white text-sm font-medium">{session.technologyId} — {session.level}</span>
                  <span className="text-slate-400 text-xs ml-2">
                    {session.startedAt ? format(new Date(session.startedAt), 'dd MMM yyyy') : ''}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`badge ${(session.score ?? 0) >= 70 ? 'badge-senior' : 'badge-mid'}`}>
                    {session.score}%
                  </span>
                  <Link to={`/exam/results/${session.id}`} className="text-yellow-400 text-xs hover:underline">
                    View & Retake
                  </Link>
                  <button 
                    onClick={() => handleDelete(session.id)}
                    className="text-slate-500 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weaknesses */}
      {stats && stats.topicWeaknesses.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">Topics to Improve</h2>
          <div className="space-y-2">
            {stats.topicWeaknesses.slice(0, 5).map(tw => (
              <div key={tw.topic} className="flex items-center gap-3">
                <span className="text-slate-300 text-sm w-40 truncate">{tw.topic}</span>
                <div className="flex-1 bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all"
                    style={{ width: `${tw.avgScore}%` }}
                  />
                </div>
                <span className="text-slate-400 text-sm w-10 text-right">{tw.avgScore}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent exams */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Exams</h2>
        {loading && <p className="text-slate-400 text-sm">Loading…</p>}
        {!loading && history.length === 0 && (
          <p className="text-slate-400 text-sm">No exams yet. <Link to="/exam" className="text-primary-400 hover:underline">Take your first one!</Link></p>
        )}
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {history.map(session => (
            <div key={session.id} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
              <div>
                <span className="text-white text-sm font-medium">{session.technologyId} — {session.level}</span>
                <span className="text-slate-400 text-xs ml-2">
                  {session.startedAt ? format(new Date(session.startedAt), 'dd MMM yyyy') : ''}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {session.submittedAt ? (
                  <>
                    <span className={`badge ${(session.score ?? 0) >= 70 ? 'badge-senior' : 'badge-mid'}`}>
                      {session.score}%
                    </span>
                    <Link to={`/exam/results/${session.id}`} className="text-primary-400 text-xs hover:underline">
                      View
                    </Link>
                  </>
                ) : (
                  <Link to={`/exam/session/${session.id}`} className="btn-secondary text-xs">
                    Resume
                  </Link>
                )}
                <button 
                  onClick={() => handleDelete(session.id)}
                  className="text-slate-500 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
