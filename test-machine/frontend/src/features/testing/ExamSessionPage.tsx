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

  const startRef = React.useRef<number>(Date.now())

  // If no session in store, try loading from API when URL contains a session id
  React.useEffect(() => {
    if (!id) return
    if (session && session.id === id) return
    
    dispatch(loadSessionRequest(id))
  }, [id, session, dispatch])

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

