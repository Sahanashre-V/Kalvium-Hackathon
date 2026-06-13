import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AILoadingScreen from '../components/AILoadingScreen'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import PageHeader from '../components/PageHeader'
import { useTopic } from '../context/TopicContext'
import { getAssessmentQuestions, getTopicStats } from '../data/learningData'
import { setStoredAssessment } from '../utils/storage'

function AssessmentPage() {
  const navigate = useNavigate()
  const { selectedTopic, currentAssessment } = useTopic()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const questions = useMemo(() => currentAssessment?.questions || getAssessmentQuestions(selectedTopic), [currentAssessment, selectedTopic])
  const profile = useMemo(() => getTopicStats(selectedTopic), [selectedTopic])
  const currentQuestion = questions[currentIndex]
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100)

  const selectedCount = useMemo(
    () => Object.values(answers).filter((value) => value !== undefined).length,
    [answers],
  )

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1200)
    return () => window.clearTimeout(timer)
  }, [selectedTopic])

  const handleSubmit = () => {
    setIsAnalyzing(true)

    window.setTimeout(() => {
      const correctAnswers = questions.reduce(
        (count, question, index) => count + (answers[index] === question.correctIndex ? 1 : 0),
        0,
      )
      const readiness = Math.round((correctAnswers / questions.length) * 100)
      const result = {
        topic: selectedTopic,
        readiness,
        readinessLevel: profile.readinessLevel,
        strengths: profile.strengths,
        needsImprovement: profile.needsImprovement,
        weakAreas: profile.weakAreas,
      }

      setStoredAssessment(result)
      navigate('/results', { state: result })
    }, 1300)
  }

  if (isLoading || isAnalyzing) {
    return (
      <AILoadingScreen
        title={isAnalyzing ? 'Analyzing Your Knowledge...' : 'Generating Assessment...'}
        subtitle={
          isAnalyzing
            ? `We are scoring your responses for ${selectedTopic} and shaping the next learning step.`
            : `Preparing a ${selectedTopic} assessment tailored to the learner profile.`
        }
        steps={
          isAnalyzing
            ? ['Scoring answers', 'Comparing patterns', 'Building readiness insights', 'Preparing roadmap']
            : ['Loading questions', 'Matching topic level', 'Formatting options', 'Ready to start']
        }
      />
    )
  }

  return (
    <div className="space-y-8 pb-8 pt-4">
      <PageHeader
        backTo="/"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Assessment' },
        ]}
        title={`Topic selected: ${selectedTopic}`}
        description="A quick mock assessment identifies what the learner knows before the roadmap is generated."
      />

      <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-300">
              Question {currentIndex + 1} of {questions.length}
            </p>
            <p className="mt-1 text-xl font-semibold text-white">Answer the prompt below</p>
          </div>
          <ProgressBar value={progress} label="Assessment progress" className="w-full sm:max-w-sm" />
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/25 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
            Knowledge Check
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">{currentQuestion.question}</h2>
          <div className="mt-6 grid gap-3">
            {currentQuestion.options.map((option, optionIndex) => {
              const active = answers[currentIndex] === optionIndex
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }))}
                  className={`rounded-2xl border px-4 py-4 text-left text-sm font-medium transition duration-200 ${
                    active
                      ? 'border-cyan-300/30 bg-cyan-400/12 text-white'
                      : 'border-white/10 bg-white/5 text-slate-200 hover:border-cyan-300/20 hover:bg-white/8'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            {selectedCount} of {questions.length} questions answered
          </p>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => setCurrentIndex((value) => Math.max(0, value - 1))}
              disabled={currentIndex === 0}
            >
              Previous
            </Button>
            {currentIndex < questions.length - 1 ? (
              <Button
                onClick={() => setCurrentIndex((value) => Math.min(questions.length - 1, value + 1))}
                disabled={answers[currentIndex] === undefined}
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={answers[currentIndex] === undefined}>
                Submit Assessment
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssessmentPage
