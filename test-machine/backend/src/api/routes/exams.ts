import { Router } from 'express'
import { z } from 'zod'
import * as examService from '../../domain/exam/exam.service.js'
import { authenticate, AuthRequest } from '../middleware/authenticate.js'

export const examsRouter: Router = Router()

const GenerateSchema = z.object({
  technologyId: z.string().uuid().optional(),
  technologyIds: z.array(z.string().uuid()).optional(),
  level: z.string().min(1),
  mode: z.number().int().min(1).max(2).default(1),
  count: z.number().int().min(1).max(100).optional(),
  seed: z.number().int().optional()
}).refine(data => !!data.technologyId || (Array.isArray(data.technologyIds) && data.technologyIds.length > 0), {
  message: 'technologyId or technologyIds is required'
})

examsRouter.post('/generate', authenticate, (req: AuthRequest, res) => {
  const result = GenerateSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ success: false, error: result.error.issues[0].message })
    return
  }
  try {
    const payload = result.data
    const session = examService.generateExam({ userId: req.user!.sub, ...payload })
    res.status(201).json({ success: true, data: session })
  } catch (err: unknown) {
    const e = err as Error & { status?: number }
    res.status(e.status ?? 500).json({ success: false, error: e.message })
  }
})

examsRouter.get('/:id', authenticate, (req: AuthRequest, res) => {
  const session = examService.getSession(req.params.id as string)
  if (!session) {
    res.status(404).json({ success: false, error: 'Exam session not found' })
    return
  }
  if (session.userId !== req.user!.sub && req.user!.role !== 'admin') {
    res.status(403).json({ success: false, error: 'Forbidden' })
    return
  }
  res.json({ success: true, data: session })
})

const SubmitSchema = z.object({
  answers: z.array(z.object({
    questionId: z.string(),
    userAnswer: z.string(),
    timeSpent: z.number().int().optional()
  }))
})

examsRouter.post('/:id/submit', authenticate, (req: AuthRequest, res) => {
  const result = SubmitSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ success: false, error: result.error.issues[0].message })
    return
  }
  try {
    const examResult = examService.submitExam(req.params.id as string, req.user!.sub, result.data)
    res.json({ success: true, data: examResult })
  } catch (err: unknown) {
    const e = err as Error & { status?: number }
    res.status(e.status ?? 500).json({ success: false, error: e.message })
  }
})

examsRouter.get('/:id/results', authenticate, (req: AuthRequest, res) => {
  try {
    const examResult = examService.getResults(req.params.id as string, req.user!.sub)
    res.json({ success: true, data: examResult })
  } catch (err: unknown) {
    const e = err as Error & { status?: number }
    res.status(e.status ?? 500).json({ success: false, error: e.message })
  }
})

examsRouter.delete('/:id', authenticate, (req: AuthRequest, res) => {
  try {
    examService.deleteExam(req.params.id as string, req.user!.sub, req.user!.role)
    res.json({ success: true })
  } catch (err: unknown) {
    const e = err as Error & { status?: number }
    res.status(e.status ?? 500).json({ success: false, error: e.message })
  }
})

examsRouter.post('/:id/retake', authenticate, async (req: AuthRequest, res) => {
  const { failedQuestionIds } = req.body;

  if (!failedQuestionIds || !Array.isArray(failedQuestionIds)) {
    res.status(400).json({ success: false, error: 'Failed to provide a valid array of failed question IDs.' });
    return;
  }
  
  try {
    // The backend service now handles generating the new session from the provided IDs
    const session = await examService.generateRetakeExamFromIds(req.user!.sub, failedQuestionIds);
    res.status(201).json({ success: true, data: session });
  } catch (err: unknown) {
    const e = err as Error & { status?: number };
    res.status(e.status ?? 500).json({ success: false, error: e.message });
  }
});
