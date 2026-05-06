import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { loadUserRequest } from '../../features/auth/store/auth.slice.js'
import { useAppDispatch, useAppSelector } from '../hooks/useStore.js'

interface Props {
  children: React.ReactNode
  requireRole?: 'admin' | 'candidate'
}

export function ProtectedRoute({ children, requireRole }: Props) {
  const dispatch = useAppDispatch()
  const { user, token, loading } = useAppSelector(s => s.auth)
  const location = useLocation()

  // If we have a token but no user loaded yet, fetch the user from the API.
  // This avoids redirecting to /dashboard on page reload when the token is present.
  React.useEffect(() => {
    if (token && !user && !loading) {
      dispatch(loadUserRequest())
    }
  }, [dispatch, token, user, loading])

  // Not authenticated
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // While we're loading the user, show nothing (or a small placeholder).
  if (!user) {
    return <div />
  }

  // Role check
  if (requireRole && user.role !== requireRole) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
