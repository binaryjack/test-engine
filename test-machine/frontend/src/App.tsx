import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { store } from './store/index.js'

// Shared
import { AppLayout } from './shared/components/AppLayout.js'
import { ProtectedRoute } from './shared/components/ProtectedRoute.js'

// Auth
import { ForgotPasswordPage } from './features/auth/ForgotPasswordPage.js'
import { LoginPage } from './features/auth/LoginPage.js'
import { PasswordResetPage } from './features/auth/PasswordResetPage.js'
import { RegisterPage } from './features/auth/RegisterPage.js'

// Candidate
import { DashboardPage } from './features/analytics/DashboardPage.js'
import { ProfilePage } from './features/analytics/ProfilePage.js'
import { ExamResultsPage } from './features/testing/ExamResultsPage.js'
import { ExamSessionPage } from './features/testing/ExamSessionPage.js'
import { ExamSetupPage } from './features/testing/ExamSetupPage.js'

// Admin
import { AdminLayout } from './features/admin/AdminLayout.js'
import { AdminOverviewPage } from './features/admin/AdminOverviewPage.js'
import { AdminQuestionsPage } from './features/admin/AdminQuestionsPage.js'
import { AdminTechnologiesPage } from './features/admin/AdminTechnologiesPage.js'
import { AdminUsersPage } from './features/admin/AdminUsersPage.js'

function ProtectedLayout({ requireRole }: { requireRole?: 'admin' | 'candidate' }) {
  return (
    <ProtectedRoute requireRole={requireRole}>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </ProtectedRoute>
  )
}

function AdminProtectedLayout() {
  return (
    <ProtectedRoute requireRole="admin">
      <AppLayout>
        <AdminLayout />
      </AppLayout>
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<PasswordResetPage />} />

          {/* Redirect root */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Redirect root */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Protected candidate routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/exam" element={<ExamSetupPage />} />
            <Route path="/exam/session/:id" element={<ExamSessionPage />} />
            <Route path="/exam/results/:id" element={<ExamResultsPage />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<AdminProtectedLayout />}>
            <Route index element={<AdminOverviewPage />} />
            <Route path="technologies" element={<AdminTechnologiesPage />} />
            <Route path="questions" element={<AdminQuestionsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
