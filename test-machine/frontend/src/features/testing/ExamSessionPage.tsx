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
    <div className="max-w-3xl mx-auto space-y-6">
      <ExamHeader 
        currentIndex={currentIndex} 
        totalQuestions={questions.length} 
        totalAnswered={totalAnswered} 
        difficulty={question.difficulty} 
        topic={question.topic} 
      />

      <ExamQuestionForm 
        question={question} 
        currentAnswer={currentAnswer} 
        onAnswer={handleAnswer} 
      />

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

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 rounded px-3 py-2 text-sm">{error}</div>
      )}
    </div>
  )
}

