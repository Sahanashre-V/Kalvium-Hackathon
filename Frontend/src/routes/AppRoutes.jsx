import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import AssessmentPage from '../pages/AssessmentPage'
import ResultsPage from '../pages/ResultsPage'
import RoadmapPage from '../pages/RoadmapPage'
import LessonPage from '../pages/LessonPage'
import QuizPage from '../pages/QuizPage'
import DashboardPage from '../pages/DashboardPage'
import { useTopic } from '../context/TopicContext'
import { getLessonPath } from '../data/topics'
import { useAuth } from '../context/AuthContext'

function AppRoutes() {
  const { token } = useAuth()

  // If user is not authenticated, render only auth pages (no AppLayout)
  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  // Authenticated app (full layout)
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/assessment" element={<RequireAuth><AssessmentPage /></RequireAuth>} />
        <Route path="/results" element={<RequireAuth><ResultsPage /></RequireAuth>} />
        <Route path="/roadmap" element={<RequireAuth><RoadmapPage /></RequireAuth>} />
        <Route path="/lesson/:topicId/:lessonId" element={<RequireAuth><LessonPage /></RequireAuth>} />
        <Route path="/lesson/:lessonId" element={<RequireAuth><LegacyLessonRedirect /></RequireAuth>} />
        <Route path="/quiz" element={<RequireAuth><QuizPage /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  )
}

function LegacyLessonRedirect() {
  const { lessonId } = useParams()
  const { selectedTopic } = useTopic()
  return <Navigate to={getLessonPath(selectedTopic, lessonId)} replace />
}

function RequireAuth({ children }) {
  const { token } = useAuth()
  if (!token) return <Navigate to="/" replace />
  return children
}

function AuthRoot() {
  const { token } = useAuth()
  if (token) return <LandingPage />
  return <LoginPage />
}

export default AppRoutes
