import { Router } from 'express'
import { listAllUsers } from '../../domain/auth/auth.service.js'
import { getQuestionStats } from '../../domain/question/question.service.js'
import { querySql } from '../../infrastructure/database/connection.js'
import { runFullSeed } from '../../infrastructure/database/seed-database.js'
import { authenticate, AuthRequest, requireRole } from '../middleware/authenticate.js'

export const adminRouter: Router = Router()

adminRouter.use(authenticate, requireRole('admin'))

/**
 * POST /api/admin/seed/:reseedAll
 * Trigger a full database reseed. Destructive if reseedAll=1.
 */
adminRouter.post('/seed/:reseedAll', async (req: AuthRequest, res) => {
  const { reseedAll } = req.params

  try {
    if (reseedAll === '1') {
      const stats = await runFullSeed()
      res.json({ 
        success: true, 
        message: 'Database reseeded successfully', 
        data: stats 
      })
    } else {
      res.status(400).json({ success: false, error: 'Invalid reseed parameter. Use /seed/1 for destructive reseed.' })
    }
  } catch (error) {
    console.error('[admin-api] Seed failed:', error)
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message 
    })
  }
})

adminRouter.get('/stats', (_req, res) => {
  const questionStats = getQuestionStats()
  const totalQuestions = questionStats.reduce((sum, s) => sum + s.count, 0)

  const sessionCount = querySql<{ count: number }>(
    'SELECT COUNT(*) as count FROM exam_sessions WHERE submittedAt IS NOT NULL'
  )[0].count

  const userCount = querySql<{ count: number }>(
    "SELECT COUNT(*) as count FROM users WHERE role = 'candidate'"
  )[0].count

  res.json({
    success: true,
    data: {
      totalQuestions,
      sessionCount,
      candidateCount: userCount,
      byTopicLevel: questionStats
    }
  })
})

adminRouter.get('/users', (_req, res) => {
  const users = listAllUsers()
  res.json({ success: true, data: users })
})
