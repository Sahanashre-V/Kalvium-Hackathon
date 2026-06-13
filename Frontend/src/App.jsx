import { BrowserRouter } from 'react-router-dom'
import { LearningModeProvider } from './context/LearningModeContext'
import { TopicProvider } from './context/TopicContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <TopicProvider>
        <LearningModeProvider>
          <AppRoutes />
        </LearningModeProvider>
      </TopicProvider>
    </BrowserRouter>
  )
}

export default App
