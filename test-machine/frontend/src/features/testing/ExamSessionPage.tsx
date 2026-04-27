import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useStore.js'
import { ExamHeader } from './components/ExamHeader.js'
import { ExamNavigation } from './components/ExamNavigation.js'
import { ExamQuestionForm } from './components/ExamQuestionForm.js'
import { goToQuestion, loadSessionRequest, nextQuestion, prevQuestion, setAnswer, submitRequest } from './store/exam.slice.js'

export function ExamSessionPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { session, questions, currentIndex, answers, loading, error, result } = useAppSelector(s => s.exam)

  const [timeLeft, setTimeLeft] = React.useState<number | null>(null)

  // If no session in store, try loading from API when URL contains a session id
  React.useEffect(() => {
    if (!id) return
    if (session && session.id === id) return
    
    dispatch(loadSessionRequest(id))
  }, [id, session, dispatch])

  // Initialize timer for Exam mode
  React.useEffect(() => {
    if (session?.mode === 2 && questions.length > 0 && timeLeft === null) {
      const totalSeconds = questions.reduce((acc, q) => acc + q.estimatedTime, 0)
      setTimeLeft(totalSeconds)
    }
  }, [session, questions, timeLeft])

  // Timer countdown
  React.useEffect(() => {
    if (timeLeft === null || timeLeft < 0) return
    
    if (timeLeft === 0) {
      // Auto-submit when time is up
      dispatch(submitRequest())
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev !== null ? prev - 1 : null))
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, dispatch])

  // Handle auto-submit on leave for Exam Mode
  React.useEffect(() => {
    if (session?.mode !== 2 || !!result) return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = '' // Standard way to show "Are you sure?" dialog
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      
      // If we are unmounting and haven't submitted yet (and we're in Exam mode), auto-submit
      // We check !result to avoid double submission when navigating to results page
      if (session?.mode === 2 && !result) {
        dispatch(submitRequest())
      }
    }
  }, [session, result, dispatch])

  const handleAnswer = (answer: string) => {
    if (questions[currentIndex]) {
      dispatch(setAnswer({ questionId: questions[currentIndex].id, answer }))
    }
  }

  // Navigate to results on submit success
  React.useEffect(() => {
    if (result && session) navigate(`/exam/results/${session.id}`)
  }, [result, session, navigate])

  if (!questions[currentIndex]) {
    return <div className="text-slate-400">Loading exam…</div>
  }

  const question = questions[currentIndex]
  const currentAnswer = answers[question.id] ?? ''
  const totalAnswered = Object.keys(answers).length

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-3xl mx-auto">
      <div className="flex-1 flex flex-col min-h-0 space-y-6">
        <div className="shrink-0">
          <ExamHeader 
            currentIndex={currentIndex} 
            totalQuestions={questions.length} 
            totalAnswered={totalAnswered} 
            difficulty={question.difficulty} 
            topic={question.topic}
            timeLeft={timeLeft}
          />
        </div>

        <div className="flex-1 min-h-0">
          <ExamQuestionForm 
            question={question} 
            currentAnswer={currentAnswer} 
            onAnswer={handleAnswer} 
          />
        </div>
      </div>

      <div className="shrink-0 pt-6 pb-2 bg-slate-950/80 backdrop-blur-sm sticky bottom-0">
        <ExamNavigation 
          questions={questions}
          answers={answers}
          currentIndex={currentIndex}
          loading={loading}
          onPrev={() => dispatch(prevQuestion())}
          onNext={() => dispatch(nextQuestion())}
          onGoTo={(i) => dispatch(goToQuestion(i))}
          onSubmit={() => dispatch(submitRequest())}
        />
      </div>

      {error && (
        <div className="mt-4 bg-red-900/50 border border-red-700 text-red-200 rounded px-3 py-2 text-sm shrink-0">{error}</div>
      )}
    </div>
  )
}

