import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AILoadingScreen from '../components/AILoadingScreen'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import PageHeader from '../components/PageHeader'
import { useTopic } from '../context/TopicContext'
import { useLearningMode } from '../context/LearningModeContext'
import { MODE_META, PREFERENCE_OPTIONS, recommendLearningMode } from '../data/adaptiveLearning'
import { getTopicStats } from '../data/learningData'
import { getStoredAssessment } from '../utils/storage'

function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { selectedTopic } = useTopic()
  const { currentMode, setCurrentMode, setRecommendedMode, recommendedMode, acceptRecommendedMode } =
    useLearningMode()
  const [isLoading, setIsLoading] = useState(true)

  const stored = getStoredAssessment()
  const profile = useMemo(() => getTopicStats(selectedTopic), [selectedTopic])
  const results = useMemo(
    () =>
      location.state || stored || {
        topic: selectedTopic,
        readiness: 74,
        readinessLevel: profile.readinessLevel,
        strengths: profile.strengths,
        needsImprovement: profile.needsImprovement,
        weakAreas: profile.weakAreas,
      },
    [location.state, stored, profile.needsImprovement, profile.readinessLevel, profile.strengths, profile.weakAreas, selectedTopic],
  )
  const recommendation = useMemo(() => recommendLearningMode(results), [results])

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1200)
    return () => window.clearTimeout(timer)
  }, [selectedTopic])

  useEffect(() => {
    setRecommendedMode(recommendation.mode)
  }, [recommendation.mode, setRecommendedMode])

  if (isLoading) {
    return (
      <AILoadingScreen
        title="Analyzing Your Knowledge..."
        subtitle={`Synthesizing assessment results for ${selectedTopic} into a learning plan.`}
        steps={['Reading answers', 'Finding strengths', 'Mapping weak areas', 'Building roadmap']}
      />
    )
  }

  return (
    <div className="space-y-8 pb-8 pt-4">
      <PageHeader
        backTo="/assessment"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Assessment', to: '/assessment' },
          { label: 'Results' },
        ]}
        title="Knowledge analysis"
        description="The score summarizes what the learner already understands and where the roadmap should focus next."
      />

      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
            Strengths
          </p>
          <div className="mt-4 grid gap-3">
            {results.strengths.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-emerald-100"
              >
                ✓ {item}
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
            Needs improvement
          </p>
          <div className="mt-4 grid gap-3">
            {results.needsImprovement.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-amber-100"
              >
                ⚠ {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
            Knowledge gaps
          </p>
          <div className="mt-4 grid gap-3">
            {results.weakAreas.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-rose-100"
              >
                ✗ {item}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/25 p-5">
            <p className="text-sm text-slate-300">Readiness score</p>
            <p className="mt-2 text-4xl font-semibold text-white">{results.readiness}%</p>
            <p className="mt-2 text-sm text-slate-400">{results.readinessLevel}</p>
            <ProgressBar value={results.readiness} className="mt-4" />
          </div>

          <div className="mt-6 rounded-[1.75rem] border border-cyan-300/15 bg-cyan-400/8 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
              Recommended learning style
            </p>
            <div className="mt-3 flex flex-col gap-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/25 p-4">
                <p className="text-sm font-semibold text-white">
                  {MODE_META[recommendation.mode]?.icon} {MODE_META[recommendation.mode]?.shortLabel}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{recommendation.reason}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" onClick={acceptRecommendedMode}>
                  Accept Recommendation
                </Button>
                <span className="rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs text-slate-300">
                  Selected: {MODE_META[currentMode]?.label}
                </span>
                <span className="rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs text-slate-300">
                  Suggested: {MODE_META[recommendedMode]?.label}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
              Choose your learning style
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {PREFERENCE_OPTIONS.map((item) => {
                const active = currentMode === item.mode
                return (
                  <button
                    key={item.mode}
                    type="button"
                    onClick={() => setCurrentMode(item.mode)}
                    className={`rounded-3xl border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300/80 focus-visible:outline-offset-2 ${
                      active
                        ? 'border-cyan-300/30 bg-cyan-400/12 text-white'
                        : 'border-white/10 bg-slate-950/25 text-slate-300 hover:border-cyan-300/20 hover:bg-white/8'
                    }`}
                  >
                    <p className="text-sm font-semibold text-white">
                      {MODE_META[item.mode]?.icon} {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={() => navigate('/roadmap')} size="lg">
              Continue To Roadmap
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage
