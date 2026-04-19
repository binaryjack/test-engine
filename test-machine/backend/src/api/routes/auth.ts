import { Router } from 'express'
import { z } from 'zod'
import * as authService from '../../domain/auth/auth.service.js'
import { authenticate, AuthRequest } from '../middleware/authenticate.js'

export const authRouter: Router = Router()

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().min(1).max(64)
})

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

const ForgotPasswordSchema = z.object({
  email: z.string().email()
})

const ResetPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

authRouter.post('/register', async (req, res) => {
  const result = RegisterSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ success: false, error: result.error.issues[0].message })
    return
  }
  try {
    const data = await authService.register(result.data)
    res.status(201).json({ success: true, data })
  } catch (err: unknown) {
    const e = err as Error & { status?: number }
    res.status(e.status ?? 500).json({ success: false, error: e.message })
  }
})

authRouter.post('/login', async (req, res) => {
  const result = LoginSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ success: false, error: result.error.issues[0].message })
    return
  }
  try {
    const data = await authService.login(result.data)
    res.json({ success: true, data })
  } catch (err: unknown) {
    const e = err as Error & { status?: number }
    res.status(e.status ?? 500).json({ success: false, error: e.message })
  }
})

authRouter.get('/me', authenticate, (req: AuthRequest, res) => {
  try {
    const user = authService.me(req.user!.sub)
    res.json({ success: true, data: user })
  } catch (err: unknown) {
    const e = err as Error & { status?: number }
    res.status(e.status ?? 500).json({ success: false, error: e.message })
  }
})

authRouter.post('/forgot-password', (req, res) => {
  const result = ForgotPasswordSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ success: false, error: result.error.issues[0].message })
    return
  }
  try {
    // TODO: Implement actual password reset logic (email sending)
    // For now, just return success to allow local testing
    console.log(`Password reset requested for: ${result.data.email}`)
    
    res.json({ 
      success: true, 
      message: 'If an account exists with this email, password reset instructions will be sent.' 
    })
  } catch (err: unknown) {
    const e = err as Error & { status?: number }
    res.status(e.status ?? 500).json({ success: false, error: e.message })
  }
})

authRouter.post('/reset-password', async (req, res) => {
  const result = ResetPasswordSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ success: false, error: result.error.issues[0].message })
    return
  }
  try {
    // Reset password for the user with the given email
    const user = await authService.resetPasswordByEmail(result.data.email, result.data.password)
    
    res.json({ 
      success: true, 
      message: 'Password has been successfully reset.',
      data: user
    })
  } catch (err: unknown) {
    const e = err as Error & { status?: number }
    res.status(e.status ?? 500).json({ success: false, error: e.message })
  }
})
