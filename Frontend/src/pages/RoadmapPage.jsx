import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AILoadingScreen from '../components/AILoadingScreen'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import RoadmapCard from '../components/RoadmapCard'
import PageHeader from '../components/PageHeader'
import { useTopic } from '../context/TopicContext'
import { getRoadmapTopics } from '../data/learningData'
import { getLessonPath } from '../data/topics'

function RoadmapPage() {
  const navigate = useNavigate()
  const { selectedTopic, setSelectedLesson } = useTopic()
  const [isLoading, setIsLoading] = useState(true)

  const roadmap = useMemo(() => getRoadmapTopics(selectedTopic), [selectedTopic])
  const completedCount = roadmap.filter((step) => step.status === 'Completed').length
  const completion = Math.round((completedCount / roadmap.length) * 100)
  const recommended = roadmap.find((step) => step.status === 'Recommended') || roadmap[0]

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1200)
    return () => window.clearTimeout(timer)
  }, [selectedTopic])

  const getModuleLessonId = (step) => step?.lessonId || step?.id

  const openLesson = (stepOrLessonId) => {
    const lessonId = typeof stepOrLessonId === 'string' ? stepOrLessonId : getModuleLessonId(stepOrLessonId)
    if (!lessonId) return
    setSelectedLesson(lessonId)
    navigate(getLessonPath(selectedTopic, lessonId))
  }

  if (isLoading) {
    return (
      <AILoadingScreen
        title="Creating Personalized Roadmap..."
        subtitle={`Building a learning path for ${selectedTopic} based on assessment insights.`}
        steps={['Mapping strengths', 'Choosing priority topics', 'Ordering lessons', 'Finalizing roadmap']}
      />
    )
  }

  return (
    <div className="space-y-8 pb-8 pt-4">
      <PageHeader
        backTo="/results"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Results', to: '/results' },
          { label: 'Roadmap' },
        ]}
        title={`Vertical timeline for ${selectedTopic}`}
        description="Each card shows the learner's confidence level and the sequence of concepts to cover next."
        action={<Button onClick={() => openLesson(recommended)}>Start Learning</Button>}
      />

      <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
              Roadmap completion
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">{completion}% Complete</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/25 px-4 py-3 text-sm text-slate-200">
            Recommended next lesson: {recommended.title}
          </div>
        </div>
        <ProgressBar value={completion} className="mt-6" />
      </div>

      <div className="grid gap-4">
        {roadmap.map((step, index) => (
          <RoadmapCard
            key={step.id}
            step={index + 1}
            title={step.title}
            description={step.description}
            status={step.status}
            onClick={() => openLesson(step)}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={() => openLesson(recommended)} size="lg">
          Start Learning
        </Button>
      </div>
    </div>
  )
}

export default RoadmapPage
