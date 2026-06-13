import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'
import TopicCard from '../components/TopicCard'
import { useTopic } from '../context/TopicContext'
import { TOPIC_OPTIONS } from '../data/topicMeta'

const exampleTopics = [
  { title: TOPIC_OPTIONS[0], description: 'Learn patterns, complexity, and problem solving.', status: 'Completed' },
  { title: 'React', description: 'Build component-driven interfaces with confidence.', status: 'Review' },
  {
    title: 'Machine Learning',
    description: 'Understand models, metrics, and practical intuition.',
    status: 'Gap',
  },
  {
    title: 'System Design',
    description: 'Explore scalable architecture and trade-offs.',
    status: 'Recommended',
  },
]

const featureCopy = [
  {
    title: 'Adaptive assessment',
    description: 'Diagnose what a learner knows before teaching the next best step.',
  },
  {
    title: 'Personalized roadmap',
    description: 'Turn a topic into a clear learning path with strengths and gaps.',
  },
  {
    title: 'Quiz-led mastery',
    description: 'Use fast feedback loops to reinforce understanding as the learner moves.',
  },
]

function LandingPage() {
  const navigate = useNavigate()
  const { selectedTopic, setSelectedTopic, startSession } = useTopic()
  const [topic, setTopic] = useState(selectedTopic)

  const pickTopic = (value) => {
    setTopic(value)
    setSelectedTopic(value)
  }

  const startLearning = async () => {
    const resolvedTopic = TOPIC_OPTIONS.includes(topic.trim()) ? topic.trim() : selectedTopic
    const chosen = resolvedTopic || TOPIC_OPTIONS[0]
    pickTopic(chosen)
    try {
      await startSession(chosen)
    } catch (err) {
      console.error('startSession failed', err)
    }
    navigate('/assessment')
  }

  return (
    <div className="space-y-16 pb-8 pt-4">
      <section className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
            AI-Powered Personalized Learning
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
            Learn anything with a roadmap that feels hand-built for you.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            LearnAnything AI assesses current knowledge, generates a roadmap, teaches concepts step by step,
            and keeps momentum with quizzes and progress tracking.
          </p>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/6 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <label className="mb-3 block text-sm font-medium text-slate-200">
              What do you want to learn?
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={topic}
                onChange={(event) => {
                  setTopic(event.target.value)
                  const typedTopic = TOPIC_OPTIONS.find(
                    (option) => option.toLowerCase() === event.target.value.trim().toLowerCase(),
                  )
                  if (typedTopic) {
                    setSelectedTopic(typedTopic)
                  }
                }}
                placeholder="Try DSA, React, Machine Learning..."
                className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 text-white placeholder:text-slate-500 focus:border-cyan-300/40 focus:outline-none"
              />
              <Button onClick={startLearning} size="lg" className="sm:min-w-48">
                Start Learning
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {TOPIC_OPTIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => pickTopic(item)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    topic === item || selectedTopic === item
                      ? 'border-cyan-300/30 bg-cyan-400/15 text-cyan-100'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/20 hover:bg-white/8'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl"
        >
          <div className="rounded-[1.75rem] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(14,165,233,0.14),rgba(15,23,42,0.18))] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Demo flow</p>
                <p className="mt-1 text-2xl font-semibold text-white">From assessment to mastery</p>
              </div>
              <div className="rounded-2xl bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-200">
                Ready in 5 steps
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {[
                'Assess current knowledge',
                'Generate a roadmap',
                'Teach one concept',
                'Quiz for retention',
                'Track progress',
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-white/8 bg-slate-950/20 px-4 py-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/12 text-sm font-semibold text-cyan-200">
                    0{index + 1}
                  </div>
                  <p className="font-medium text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section>
        <SectionTitle
          label="Popular topics"
          title="Choose a learning path in one tap"
          description="Clickable topic chips and cards keep the demo simple while still feeling AI-guided."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {exampleTopics.map((topicItem) => (
            <TopicCard
              key={topicItem.title}
              title={topicItem.title}
              description={topicItem.description}
              status={topicItem.status}
              meta="Tap to select"
              onClick={() => {
                pickTopic(topicItem.title)
                navigate('/roadmap')
              }}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          label="Why it works"
          title="A learning experience built for momentum"
          description="A clean flow keeps the demo easy to understand while still feeling product-grade."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {featureCopy.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl"
            >
              <p className="text-lg font-semibold text-white">{feature.title}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(59,130,246,0.14),rgba(15,23,42,0.25))] p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/80">
              Ready for the demo
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Start the guided learning flow in one click.
            </h2>
          </div>
          <Button onClick={startLearning} size="lg">
            Start Learning
          </Button>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
