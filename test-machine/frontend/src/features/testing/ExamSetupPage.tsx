import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useStore.js'
import { loadPublicTechnologiesRequest } from '../admin/store/admin.slice.js'
import { ExamSetupForm } from './components/ExamSetupForm.js'
import { calculateAvailableCountRequest, clearExam, generateRequest } from './store/exam.slice.js'

export function ExamSetupPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { session, loading, error, availableCount } = useAppSelector(s => s.exam)
  const { technologies, loading: adminLoading } = useAppSelector(s => s.admin)

  const [selectedTechs, setSelectedTechs] = React.useState<string[]>([])
  const [selectedLevel, setSelectedLevel] = React.useState('')
  const [count, setCount] = React.useState(20)

  // Clear any lingering exam state/errors when entering the setup page
  React.useEffect(() => {
    dispatch(clearExam())
  }, [dispatch])

  // Load technologies from admin store on mount
  React.useEffect(() => {
    if (technologies.length === 0) {
      dispatch(loadPublicTechnologiesRequest())
    }
  }, [dispatch, technologies.length])

  // Navigate to session once generated
  React.useEffect(() => {
    if (session && !loading) navigate(`/exam/session/${session.id}`)
  }, [session, loading, navigate])

  const handleStart = () => {
    if (selectedTechs.length === 0 || !selectedLevel) return
    const payload = selectedTechs.length > 1
      ? { technologyIds: selectedTechs, level: selectedLevel, count }
      : { technologyId: selectedTechs[0], level: selectedLevel, count }
    dispatch(generateRequest(payload as any))
  }

  // Compute available questions count
  React.useEffect(() => {
    if (selectedLevel) {
      dispatch(calculateAvailableCountRequest({ techs: selectedTechs, level: selectedLevel }))
    }
  }, [selectedTechs, selectedLevel, dispatch])

  // Adjust count if availableCount is lower than current selected count
  React.useEffect(() => {
    setCount(c => Math.min(c, availableCount || 1))
  }, [availableCount])

  const handleTechChange = (techs: string[]) => {
    setSelectedTechs(techs)
    setSelectedLevel('')
  }

  return (
    <ExamSetupForm 
      technologies={technologies}
      loading={loading}
      adminLoading={adminLoading}
      selectedTechs={selectedTechs}
      selectedLevel={selectedLevel}
      count={count}
      availableCount={availableCount}
      onTechChange={handleTechChange}
      onLevelChange={setSelectedLevel}
      onCountChange={setCount}
      onSubmit={handleStart}
      error={error}
    />
  )
}

