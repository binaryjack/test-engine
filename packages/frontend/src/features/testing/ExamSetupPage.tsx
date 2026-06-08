import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useStore.js'
import { loadPublicTechnologiesRequest } from '../admin/store/admin.slice.js'
import { examApi } from './api/exam.api.js'
import { ExamSetupForm } from './components/ExamSetupForm.js'
import { clearExam, generateRequest } from './store/exam.slice.js'

export function ExamSetupPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { session, loading, error } = useAppSelector(s => s.exam)
  const { technologies, loading: adminLoading } = useAppSelector(s => s.admin)

  const [selectedTechs, setSelectedTechs] = React.useState<string[]>([])
  const [selectedConfigs, setSelectedConfigs] = React.useState<Record<string, number>>({})
  const [availableCounts, setAvailableCounts] = React.useState<Record<string, number>>({})
  const [mode, setMode] = React.useState(1)
  const [isGenerating, setIsGenerating] = React.useState(false)

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

  // Fetch available counts for each tech/level combination of selected technologies
  React.useEffect(() => {
    selectedTechs.forEach(techId => {
      const tech = technologies.find(t => t.id === techId)
      if (!tech) return
      tech.levels.forEach(async (level) => {
        const key = `${techId}:${level}`
        if (availableCounts[key] !== undefined) return
        try {
          const res = await examApi.getQuestions(techId, level)
          if (res.success && res.data) {
            setAvailableCounts(prev => ({ ...prev, [key]: res.data!.length }))
          }
        } catch (err) {
          console.error(`Failed to fetch count for ${key}`, err)
        }
      })
    })
  }, [selectedTechs, technologies, availableCounts])

  // Navigate to session once generated
  React.useEffect(() => {
    if (isGenerating && session && !loading) {
      setIsGenerating(false)
      navigate(`/exam/session/${session.id}`)
    }
  }, [isGenerating, session, loading, navigate])

  const handleStart = () => {
    const configs = Object.entries(selectedConfigs).map(([key, count]) => {
      const [technologyId, level] = key.split(':')
      return { technologyId, level, count }
    }).filter(c => c.count > 0)

    if (configs.length === 0) return

    setIsGenerating(true)
    dispatch(generateRequest({ configs, mode } as any))
  }

  const handleTechChange = (techs: string[]) => {
    setSelectedTechs(techs)
    // Clean up configs for removed technologies
    setSelectedConfigs(prev => {
      const next = { ...prev }
      Object.keys(next).forEach(key => {
        const [techId] = key.split(':')
        if (!techs.includes(techId)) {
          delete next[key]
        }
      })
      return next
    })
  }

  const handleToggleLevel = (techId: string, level: string) => {
    const key = `${techId}:${level}`
    setSelectedConfigs(prev => {
      if (key in prev) {
        const { [key]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [key]: Math.min(10, availableCounts[key] ?? 0) }
    })
  }

  const handleConfigCountChange = (techId: string, level: string, count: number) => {
    const key = `${techId}:${level}`
    setSelectedConfigs(prev => ({ ...prev, [key]: count }))
  }

  return (
    <ExamSetupForm 
      technologies={technologies}
      loading={loading}
      adminLoading={adminLoading}
      selectedTechs={selectedTechs}
      selectedConfigs={selectedConfigs}
      availableCounts={availableCounts}
      mode={mode}
      onTechChange={handleTechChange}
      onToggleLevel={handleToggleLevel}
      onConfigCountChange={handleConfigCountChange}
      onModeChange={setMode}
      onSubmit={handleStart}
      error={error}
    />
  )
}

