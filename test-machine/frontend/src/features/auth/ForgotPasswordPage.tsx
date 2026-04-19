import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
      
      if (response.ok) {
        console.log('Password reset initiated for:', email)
        navigate('/reset-password')
      } else {
        console.error('Failed to send reset link')
      }
    } catch (error) {
      console.error('Error sending reset link:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="card w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white mb-6">Reset Password</h1>
        
        {submitted ? (
          <div className="space-y-4">
            <div className="bg-green-900/50 border border-green-700 text-green-200 rounded px-4 py-3 text-sm">
              ✓ Password reset instructions have been sent to your email
            </div>
            <p className="text-slate-400 text-sm">
              Check your inbox for further instructions to reset your password.
            </p>
            <Link 
              to="/login" 
              className="block text-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded transition-colors w-full"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <p className="text-slate-400 text-xs">
              Enter the email address associated with your account and we'll send you instructions to reset your password.
            </p>
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Sending…' : 'Send Reset Link'}
            </button>
          </form>
        )}
        
        <p className="text-slate-400 text-sm mt-4 text-center">
          Remember your password?{' '}
          <Link to="/login" className="text-primary-400 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
