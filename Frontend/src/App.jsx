import { BrowserRouter } from 'react-router-dom'
import { LearningModeProvider } from './context/LearningModeContext'
import { TopicProvider } from './context/TopicContext'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TopicProvider>
            <LearningModeProvider>
              <AppRoutes />
            </LearningModeProvider>
        </TopicProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
