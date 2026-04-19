import { Router } from 'express'
import { z } from 'zod'

export const authRouter: Router = Router()

const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address')
})

authRouter.post('/forgot-password', (req, res) => {
  const result = ForgotPasswordSchema.safeParse(req.body)
  
  if (!result.success) {
    res.status(400).json({ 
      success: false, 
      error: result.error.issues[0].message 
    })
    return
  }

  try {
    // TODO: Implement actual password reset logic
    // For now, just return success to allow local testing
    console.log(`Password reset requested for: ${result.data.email}`)
    
    res.json({ 
      success: true, 
      message: 'If an account exists with this email, password reset instructions will be sent.' 
    })
  } catch (err: unknown) {
    const e = err as Error & { status?: number }
    res.status(e.status ?? 500).json({ 
      success: false, 
      error: e.message 
    })
  }
})
