import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import LandingPage from '../pages/LandingPage'
import AssessmentPage from '../pages/AssessmentPage'
import ResultsPage from '../pages/ResultsPage'
import RoadmapPage from '../pages/RoadmapPage'
import LessonPage from '../pages/LessonPage'
import QuizPage from '../pages/QuizPage'
import DashboardPage from '../pages/DashboardPage'
import { useTopic } from '../context/TopicContext'
import { getLessonPath } from '../data/topics'

function AppRoutes() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/lesson/:topicId/:lessonId" element={<LessonPage />} />
        <Route path="/lesson/:lessonId" element={<LegacyLessonRedirect />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
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

export default AppRoutes
