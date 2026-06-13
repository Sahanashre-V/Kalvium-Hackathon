import { useNavigate } from 'react-router-dom'
import ClickCard from '../components/ClickCard'
import ProgressBar from '../components/ProgressBar'
import PageHeader from '../components/PageHeader'
import ModeProgressCard from '../components/ModeProgressCard'
import StatCard from '../components/StatCard'
import TopicCard from '../components/TopicCard'
import { useLearningMode } from '../context/LearningModeContext'
import dashboardStats from '../data/dashboardStats.json'
import { useTopic } from '../context/TopicContext'
import { getRoadmapTopics, getTopicStats } from '../data/learningData'
import { LEARNING_MODES, MODE_META, getLessonCompletionStats, getModeUsagePercentages } from '../data/adaptiveLearning'
import { getLessonPath, getTopicFromTopicId } from '../data/topics'
import { getStoredAssessment, getStoredQuiz } from '../utils/storage'

function DashboardPage() {
  const navigate = useNavigate()
  const { selectedTopic, selectedLesson } = useTopic()
  const { currentMode, modeUsage, modeProgress } = useLearningMode()
  const assessment = getStoredAssessment()
  const quiz = getStoredQuiz()
  const profile = getTopicStats(selectedTopic)
  const roadmap = getRoadmapTopics(selectedTopic)
  const currentTopic = assessment?.topic || selectedTopic
  const currentLesson = selectedLesson || quiz?.concept || roadmap.find((step) => step.status === 'Recommended')?.lessonId
  const accuracy = quiz?.accuracy || assessment?.readiness || 86
  const completedTopics = roadmap.filter((step) => step.status === 'Completed').length
  const modeSummary = getLessonCompletionStats(modeProgress)
  const modeUsagePercentages = getModeUsagePercentages(modeUsage)
  const usageEntries = LEARNING_MODES.map((mode) => ({
    mode,
    value: modeUsagePercentages[mode] || 0,
    label: MODE_META[mode].label,
    icon: MODE_META[mode].icon,
  }))

  const stats = [
    {
      label: 'Topics Completed',
      value: String(completedTopics),
      delta: `${Math.max(0, roadmap.length - completedTopics)} topics remaining`,
    },
    {
      label: 'Quiz Accuracy',
      value: `${accuracy}%`,
      delta: 'Latest quiz result',
    },
    {
      label: 'Current Topic',
      value: currentTopic,
      delta: currentLesson ? `Next: ${currentLesson.replaceAll('-', ' ')}` : 'Ready to continue',
    },
    {
      label: 'Mastery Score',
      value: `${profile.roadmapCompletion}/100`,
      delta: profile.readinessLevel,
    },
  ]

  return (
    <div className="space-y-8 pb-8 pt-4">
      <PageHeader
        backTo="/roadmap"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Roadmap', to: '/roadmap' },
          { label: 'Dashboard' },
        ]}
        title="Learning progress"
        description="A polished overview for the demo: progress, recent activity, and the next best topic."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            delta={stat.delta}
            icon={<span className="text-lg">↗</span>}
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4 md:grid-cols-2">
          <ModeProgressCard
            title="Read progress"
            value={`${modeSummary.readProgress}%`}
            details="Structured concept reading completed"
            icon="📖"
            progress={modeSummary.readProgress}
            accent="cyan"
          />
          <ModeProgressCard
            title="Watch completion"
            value={`${modeSummary.videosWatchedProgress}%`}
            details={`${modeSummary.videosWatched} videos watched`}
            icon="🎥"
            progress={modeSummary.videosWatchedProgress}
            accent="amber"
          />
          <ModeProgressCard
            title="Practice completion"
            value={`${modeSummary.practiceCompletion}%`}
            details="Hands-on challenges completed"
            icon="🧩"
            progress={modeSummary.practiceCompletion}
            accent="emerald"
          />
          <ModeProgressCard
            title="Revision completion"
            value={`${modeSummary.revisionCompletion}%`}
            details="Fast summary cards reviewed"
            icon="⚡"
            progress={modeSummary.revisionCompletion}
            accent="rose"
          />
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
            Preferred learning style
          </p>
          <div className="mt-4 rounded-3xl border border-cyan-300/15 bg-cyan-400/8 p-5">
            <p className="text-xl font-semibold text-white">
              {MODE_META[currentMode].icon} {MODE_META[currentMode].shortLabel}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              This is the mode currently guiding your learning sessions and dashboard tracking.
            </p>
            <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs text-slate-200">
              Videos watched: {modeSummary.videosWatched}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
              Learning mode usage
            </p>
            <div className="mt-4 space-y-4">
              {usageEntries.map((entry) => (
                <div key={entry.mode}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>
                      {entry.icon} {entry.label}
                    </span>
                    <span>{entry.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 transition-all duration-300"
                      style={{ width: `${entry.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                Overall learning progress
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">{profile.roadmapCompletion}%</p>
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
              Current topic: {currentTopic}
            </div>
          </div>
          <ProgressBar value={profile.roadmapCompletion} className="mt-6" />
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
            Recommended next topic
          </p>
          <div className="mt-4 grid gap-4">
            {roadmap
              .filter((step) => step.status !== 'Completed')
              .slice(0, 2)
              .map((item) => (
                <TopicCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  status={item.status}
                  onClick={() => navigate(getLessonPath(selectedTopic, item.lessonId))}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
          Recent activity
        </p>
        <div className="mt-4 grid gap-3">
          {dashboardStats.recentActivity.map((activity) => (
            <ClickCard
              key={activity.label}
              to={getLessonPath(getTopicFromTopicId(activity.topicId), activity.lessonId)}
              ariaLabel={`Open lesson ${activity.label}`}
              className="border border-white/10 bg-slate-950/25 p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">{activity.label}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">
                    Open lesson
                  </p>
                </div>
                <span className="text-sm text-cyan-200">→</span>
              </div>
            </ClickCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
