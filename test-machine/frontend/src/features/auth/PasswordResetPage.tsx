import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function PasswordResetPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState(() => sessionStorage.getItem('resetEmail') || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  if (!email) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="card w-full max-w-sm">
          <h1 className="text-2xl font-bold text-white mb-6">Error</h1>
          <p className="text-slate-400 mb-4">
            Please request a password reset first.
          </p>
          <Link 
            to="/forgot-password" 
            className="block text-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded transition-colors w-full"
          >
            Request Password Reset
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      })
      
      if (response.ok) {
        console.log('Password reset successful')
        setSuccess(true)
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to reset password')
      }
    } catch (error) {
      console.error('Error resetting password:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="card w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white mb-6">Set New Password</h1>
        
        {success ? (
          <div className="space-y-4">
            <div className="bg-green-900/50 border border-green-700 text-green-200 rounded px-4 py-3 text-sm">
              ✓ Password has been successfully reset
            </div>
            <p className="text-slate-400 text-sm">
              Redirecting to login page...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 rounded px-3 py-2 text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="label" htmlFor="password">New Password</label>
              <input
                id="password"
                type="password"
                className="input"
                placeholder="Enter new password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <p className="text-slate-400 text-xs mt-1">Minimum 8 characters</p>
            </div>

            <div>
              <label className="label" htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                className="input"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Resetting…' : 'Reset Password'}
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
