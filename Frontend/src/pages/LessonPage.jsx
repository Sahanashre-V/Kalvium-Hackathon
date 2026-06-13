import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AILoadingScreen from '../components/AILoadingScreen'
import Button from '../components/Button'
import LearningModeSwitcher from '../components/LearningModeSwitcher'
import PageHeader from '../components/PageHeader'
import ProgressBar from '../components/ProgressBar'
import ModeProgressCard from '../components/ModeProgressCard'
import { useLearningMode } from '../context/LearningModeContext'
import { useTopic } from '../context/TopicContext'
import { getLessonLearningPackage, MODE_META } from '../data/adaptiveLearning'
import { getLesson, getTopicLessonOrderForTopic } from '../data/learningData'
import { getLessonPath, getTopicFromTopicId } from '../data/topics'
import { getWatchThumbnailUrl, getWatchVideoEmbedUrl } from '../data/watchVideos'

const SECTION_ORDER = [
  { key: 'whatIs', title: 'What Is This Concept?' },
  { key: 'whyImportant', title: 'Why Is It Important?' },
  { key: 'realWorldExample', title: 'Real World Example' },
  { key: 'howItWorks', title: 'How It Works' },
  { key: 'industryApplications', title: 'Industry Applications' },
  { key: 'keyTakeaways', title: 'Key Takeaways' },
  { key: 'checkpoint', title: 'Mini Checkpoint' },
]

function LessonPage() {
  const navigate = useNavigate()
  const { topicId, lessonId } = useParams()
  const {
    selectedLesson,
    setSelectedTopic,
    setSelectedLesson,
    isLessonCheckpointComplete,
    markLessonCheckpointComplete,
  } = useTopic()
  const {
    currentMode,
    recommendedMode,
    setCurrentMode,
    modeProgress,
    completeModeStep,
    markWatchedVideo,
  } = useLearningMode()

  const routeTopic = getTopicFromTopicId(topicId)
  const lessonOrder = useMemo(() => getTopicLessonOrderForTopic(routeTopic), [routeTopic])
  const requestedLessonId = lessonId || selectedLesson
  const activeLessonId = lessonOrder.includes(requestedLessonId) ? requestedLessonId : lessonOrder[0]
  const lesson = useMemo(() => getLesson(routeTopic, activeLessonId), [routeTopic, activeLessonId])
  const learningPackage = useMemo(
    () => getLessonLearningPackage(routeTopic, activeLessonId),
    [routeTopic, activeLessonId],
  )
  const lessonIndex = Math.max(0, lessonOrder.indexOf(activeLessonId))
  const lessonPositionLabel = `${lessonIndex + 1} of ${lessonOrder.length}`

  return (
    <div className="space-y-6 pb-8 pt-4">
      <LearningModeSwitcher
        value={currentMode}
        recommendedMode={recommendedMode}
        onChange={setCurrentMode}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={`${routeTopic}-${activeLessonId}-${currentMode}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.24 }}
        >
          {currentMode === 'read' ? (
            <LessonExperience
              lesson={lesson}
              lessonIndex={lessonIndex}
              lessonOrder={lessonOrder}
              lessonPositionLabel={lessonPositionLabel}
              activeLessonId={activeLessonId}
              routeTopic={routeTopic}
              setSelectedLesson={setSelectedLesson}
              setSelectedTopic={setSelectedTopic}
              completeModeStep={completeModeStep}
              isLessonCheckpointComplete={isLessonCheckpointComplete}
              markLessonCheckpointComplete={markLessonCheckpointComplete}
              navigate={navigate}
            />
          ) : null}

          {currentMode === 'watch' ? (
            <WatchModeExperience
              lesson={lesson}
              lessonPositionLabel={lessonPositionLabel}
              routeTopic={routeTopic}
              activeLessonId={activeLessonId}
              packageData={learningPackage}
              modeProgress={modeProgress}
              markWatchedVideo={markWatchedVideo}
              completeModeStep={completeModeStep}
              setCurrentMode={setCurrentMode}
            />
          ) : null}

          {currentMode === 'practice' ? (
            <PracticeModeExperience
              lesson={lesson}
              lessonPositionLabel={lessonPositionLabel}
              routeTopic={routeTopic}
              activeLessonId={activeLessonId}
              packageData={learningPackage}
              modeProgress={modeProgress}
              completeModeStep={completeModeStep}
              setCurrentMode={setCurrentMode}
            />
          ) : null}

          {currentMode === 'revision' ? (
            <RevisionModeExperience
              lesson={lesson}
              lessonPositionLabel={lessonPositionLabel}
              routeTopic={routeTopic}
              activeLessonId={activeLessonId}
              packageData={learningPackage}
              modeProgress={modeProgress}
              completeModeStep={completeModeStep}
              setCurrentMode={setCurrentMode}
            />
          ) : null}

          {currentMode === 'mixed' ? (
            <MixedModeExperience
              lesson={lesson}
              lessonPositionLabel={lessonPositionLabel}
              routeTopic={routeTopic}
              activeLessonId={activeLessonId}
              packageData={learningPackage}
              modeProgress={modeProgress}
              markWatchedVideo={markWatchedVideo}
              completeModeStep={completeModeStep}
              setCurrentMode={setCurrentMode}
            />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function LessonExperience({
  lesson,
  lessonIndex,
  lessonOrder,
  lessonPositionLabel,
  activeLessonId,
  routeTopic,
  setSelectedLesson,
  setSelectedTopic,
  completeModeStep,
  isLessonCheckpointComplete,
  markLessonCheckpointComplete,
  navigate,
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [checkpointResult, setCheckpointResult] = useState(null)

  const sectionProgress = Math.round(((currentSection + 1) / SECTION_ORDER.length) * 100)
  const quizUnlocked = isLessonCheckpointComplete(routeTopic, activeLessonId)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1200)
    return () => window.clearTimeout(timer)
  }, [activeLessonId, routeTopic])

  const goToLesson = (nextIndex) => {
    const nextLessonId = lessonOrder[nextIndex]
    if (!nextLessonId) return
    setSelectedTopic(routeTopic)
    setSelectedLesson(nextLessonId)
    navigate(getLessonPath(routeTopic, nextLessonId))
  }

  const handleCheckpointSubmit = () => {
    const checkpoint = lesson.sections.checkpoint
    const isCorrect = selectedOption === checkpoint.correctIndex
    setCheckpointResult(isCorrect)

    if (isCorrect) {
      markLessonCheckpointComplete(routeTopic, activeLessonId)
    }
  }

  const goToQuiz = () => {
    setSelectedTopic(routeTopic)
    setSelectedLesson(activeLessonId)
    completeModeStep('read', routeTopic, activeLessonId, { checkpointComplete: true })
    navigate('/quiz')
  }

  const renderSection = () => {
    const section = SECTION_ORDER[currentSection]

    if (section.key === 'whatIs') {
      return (
        <SectionPanel title={section.title} icon="1">
          {lesson.sections.whatIs.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-7 text-slate-300 sm:text-base">
              {paragraph}
            </p>
          ))}
        </SectionPanel>
      )
    }

    if (section.key === 'whyImportant') {
      return (
        <SectionPanel title={section.title} icon="2">
          {lesson.sections.whyImportant.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-7 text-slate-300 sm:text-base">
              {paragraph}
            </p>
          ))}
        </SectionPanel>
      )
    }

    if (section.key === 'realWorldExample') {
      const example = lesson.sections.realWorldExample
      return (
        <SectionPanel title={section.title} icon="3">
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-cyan-300/15 bg-cyan-400/8 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
                Scenario
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">{example.title}</h3>
              <div className="mt-4 space-y-2 text-sm text-slate-200">
                <p className="font-medium text-slate-100">Input</p>
                <ul className="space-y-2">
                  {example.inputs.map((item) => (
                    <li key={item} className="rounded-2xl border border-white/8 bg-slate-950/25 px-4 py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/25 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
                Output
              </p>
              <p className="mt-3 text-base leading-7 text-slate-200">{example.output}</p>
              {lesson.sections.reinforcement?.extraExample ? (
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
                    Another example
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    {lesson.sections.reinforcement.extraExample.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {lesson.sections.reinforcement.extraExample.output}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </SectionPanel>
      )
    }

    if (section.key === 'howItWorks') {
      return (
        <SectionPanel title={section.title} icon="4">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {lesson.sections.howItWorks.map((step, index) => (
              <div key={step} className="rounded-3xl border border-white/10 bg-white/6 p-5 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/12 text-sm font-semibold text-cyan-200">
                  {index + 1}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-200">{step}</p>
              </div>
            ))}
          </div>
        </SectionPanel>
      )
    }

    if (section.key === 'industryApplications') {
      return (
        <SectionPanel title={section.title} icon="5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {lesson.sections.industryApplications.map((item) => (
              <div key={item.company} className="rounded-3xl border border-white/10 bg-white/6 p-5">
                <p className="text-sm font-semibold text-cyan-200">{item.company}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </SectionPanel>
      )
    }

    if (section.key === 'keyTakeaways') {
      return (
        <SectionPanel title={section.title} icon="6">
          <div className="grid gap-3 md:grid-cols-2">
            {lesson.sections.keyTakeaways.map((item) => (
              <div key={item} className="rounded-3xl border border-emerald-400/15 bg-emerald-400/8 p-4">
                <p className="text-sm leading-6 text-emerald-100">{item}</p>
              </div>
            ))}
          </div>
        </SectionPanel>
      )
    }

    const checkpoint = lesson.sections.checkpoint
    const failed = checkpointResult === false
    const passed = checkpointResult === true

    return (
      <SectionPanel title={section.title} icon="7">
        <div className="space-y-5">
          <div className="rounded-3xl border border-white/10 bg-slate-950/25 p-5">
            <p className="text-lg font-semibold text-white">{checkpoint.question}</p>
            <div className="mt-5 grid gap-3">
              {checkpoint.options.map((option, index) => {
                const active = selectedOption === index
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedOption(index)}
                    className={`rounded-2xl border px-4 py-4 text-left text-sm font-medium transition ${
                      active
                        ? 'border-cyan-300/30 bg-cyan-400/12 text-white'
                        : 'border-white/10 bg-white/5 text-slate-200 hover:border-cyan-300/20 hover:bg-white/8'
                    }`}
                  >
                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/8 text-xs font-semibold text-slate-300">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </button>
                )
              })}
            </div>
          </div>

          {passed ? (
            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-emerald-100">
              <p className="text-lg font-semibold">Great! You understood this concept.</p>
              <p className="mt-2 text-sm leading-6 text-emerald-50/90">
                The checkpoint is complete, and the quiz is now unlocked.
              </p>
            </div>
          ) : null}

          {failed ? (
            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-5">
                <p className="text-lg font-semibold text-amber-100">Let&apos;s reinforce the idea.</p>
                <p className="mt-3 text-sm leading-7 text-amber-50/90">
                  {lesson.sections.reinforcement.simplerExplanation}
                </p>
              </div>
              {lesson.sections.reinforcement.extraExample ? (
                <div className="rounded-3xl border border-white/10 bg-slate-950/25 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-200/80">
                    Another example
                  </p>
                  <p className="mt-3 text-sm font-semibold text-white">
                    {lesson.sections.reinforcement.extraExample.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {lesson.sections.reinforcement.extraExample.output}
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="secondary"
              onClick={() => setCheckpointResult(null)}
              disabled={selectedOption === null}
            >
              Retry
            </Button>
            <Button onClick={handleCheckpointSubmit} disabled={selectedOption === null || passed}>
              {passed ? 'Checkpoint Completed' : 'Check Answer'}
            </Button>
          </div>
        </div>
      </SectionPanel>
    )
  }

  if (isLoading) {
    return (
      <AILoadingScreen
        title="Preparing Learning Content..."
        subtitle={`Tailoring the lesson experience for ${lesson.title} inside ${routeTopic}.`}
        steps={['Loading lesson', 'Generating examples', 'Building checkpoint', 'Preparing quiz unlock']}
      />
    )
  }

  return (
    <div className="space-y-8 pb-8 pt-4">
      <PageHeader
        backTo="/roadmap"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Roadmap', to: '/roadmap' },
          { label: lesson.title },
        ]}
        title={lesson.title}
        description={`Lesson ${lessonPositionLabel} for ${routeTopic}. Complete the checkpoint to unlock the quiz.`}
      />

      <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <p className="text-sm text-cyan-300/80">Lesson {lessonPositionLabel}</p>
            <p className="text-3xl font-semibold text-white">{lesson.title}</p>
            <p className="text-sm text-slate-400">
              Section {currentSection + 1} of {SECTION_ORDER.length}
            </p>
          </div>
          <div className="w-full lg:max-w-sm">
            <ProgressBar
              value={sectionProgress}
              label={`Section ${currentSection + 1} of ${SECTION_ORDER.length}`}
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
      <motion.div
          key={`${routeTopic}-${activeLessonId}-${currentSection}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.25 }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
        <div className="text-sm text-slate-300">
          {routeTopic} lesson {lessonPositionLabel}. Use lesson navigation to move through the roadmap.
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            onClick={() => setCurrentSection((value) => Math.max(0, value - 1))}
            disabled={currentSection === 0}
          >
            Previous Section
          </Button>
          <Button
            variant="secondary"
            onClick={() => setCurrentSection((value) => Math.min(SECTION_ORDER.length - 1, value + 1))}
            disabled={currentSection === SECTION_ORDER.length - 1}
          >
            Next Section
          </Button>
          <Button
            variant="secondary"
            onClick={() => goToLesson(Math.max(0, lessonIndex - 1))}
            disabled={lessonIndex === 0}
          >
            Previous Topic
          </Button>
          <Button
            variant="secondary"
            onClick={() => goToLesson(Math.min(lessonOrder.length - 1, lessonIndex + 1))}
            disabled={lessonIndex === lessonOrder.length - 1}
          >
            Next Topic
          </Button>
          <Button onClick={goToQuiz} disabled={!quizUnlocked}>
            {quizUnlocked ? 'Continue To Quiz' : 'Complete Checkpoint First'}
          </Button>
        </div>
      </div>
    </div>
  )
}

function SectionPanel({ title, icon, children }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/12 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-300/20">
          {icon}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">{title}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function ModePageShell({ backTo = '/roadmap', breadcrumbs, title, description, children, action }) {
  return (
    <div className="space-y-8">
      <PageHeader backTo={backTo} breadcrumbs={breadcrumbs} title={title} description={description} action={action} />
      {children}
    </div>
  )
}

function WatchModeExperience({
  lesson,
  lessonPositionLabel,
  routeTopic,
  activeLessonId,
  packageData,
  modeProgress,
  markWatchedVideo,
  completeModeStep,
  setCurrentMode,
}) {
  const progressKey = `${routeTopic}:${activeLessonId}`
  const videos = packageData.watchContent?.videos || packageData.videoContent
  const persistedVideos = modeProgress.watch?.[progressKey]?.videos || []
  const [completedVideos, setCompletedVideos] = useState(persistedVideos)
  const [selectedVideoId, setSelectedVideoId] = useState(persistedVideos[0] || videos[0]?.id || null)

  const completedCount = completedVideos.length
  const progress = Math.round((completedCount / videos.length) * 100) || 0
  const completedTitles = completedVideos
    .map((videoId) => videos.find((video) => video.id === videoId)?.title || videoId)
    .filter(Boolean)
  const activeVideo = videos.find((video) => video.id === selectedVideoId) || videos[0]

  const markVideoWatched = (video) => {
    if (completedVideos.includes(video.id)) return
    const next = [...completedVideos, video.id]
    setCompletedVideos(next)
    markWatchedVideo(routeTopic, activeLessonId, video.id)

    if (next.length === videos.length) {
      completeModeStep('watch', routeTopic, activeLessonId, { videosWatched: next.length })
    }
  }

  return (
    <ModePageShell
      breadcrumbs={[
        { label: 'Home', to: '/' },
        { label: 'Roadmap', to: '/roadmap' },
        { label: lesson.title },
      ]}
      title={`${lesson.title} — Watch Mode`}
      description={`Lesson ${lessonPositionLabel} for ${routeTopic}. Watch the curated video set, track progress, and mark each video as complete.`}
      action={<div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-100">{MODE_META.watch.shortLabel}</div>}
    >
      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4">
          <ModeProgressCard
            title="Watch progress"
            value={`${progress}%`}
            details={`${completedCount} of ${videos.length} videos completed`}
            icon="🎥"
            progress={progress}
            accent="amber"
          />

          <div className="grid gap-4 md:grid-cols-2">
            {videos.map((video) => {
              const watched = completedVideos.includes(video.id)
              const active = activeVideo?.id === video.id

              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setSelectedVideoId(video.id)}
                  className={`group overflow-hidden rounded-[2rem] border text-left shadow-2xl shadow-slate-950/30 backdrop-blur-xl transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300/80 focus-visible:outline-offset-2 ${
                    active
                      ? 'border-cyan-300/30 bg-cyan-400/12'
                      : 'border-white/10 bg-white/6 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/8'
                  }`}
                >
                  <div
                    className="relative flex h-40 items-end overflow-hidden p-4"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.05), rgba(2,6,23,0.92)), linear-gradient(135deg, rgba(34,211,238,0.22), rgba(59,130,246,0.18)), url(${getWatchThumbnailUrl(video.youtubeId)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_35%)]" />
                    <div className="relative flex w-full items-end justify-between gap-3">
                      <div className="space-y-2">
                        <div className="inline-flex rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100">
                          {video.difficulty}
                        </div>
                        <h3 className="text-lg font-semibold text-white">{video.title}</h3>
                      </div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition group-hover:scale-105">
                        ▶
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                          {video.duration}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{video.summary}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                      <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1">
                        Creator: {video.creator}
                      </span>
                      <span
                        className={`rounded-full border px-3 py-1 ${
                          watched
                            ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100'
                            : 'border-white/10 bg-white/6'
                        }`}
                      >
                        {watched ? 'Watched' : 'Unwatched'}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                  Now playing
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">{activeVideo?.title}</h3>
              </div>
              <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-100">
                {activeVideo?.duration}
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/40">
              <div className="aspect-video w-full">
                <iframe
                  title={activeVideo?.title || 'Watch mode video'}
                  src={activeVideo ? getWatchVideoEmbedUrl(activeVideo.youtubeId) : 'about:blank'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              {activeVideo?.summary}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                onClick={() => activeVideo && markVideoWatched(activeVideo)}
                disabled={!activeVideo || completedVideos.includes(activeVideo.id)}
              >
                {activeVideo && completedVideos.includes(activeVideo.id) ? 'Already Watched' : 'Mark as Watched'}
              </Button>
              <Button variant="secondary" onClick={() => setCurrentMode('practice')}>
                Go To Practice Mode
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
              Completed videos
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {completedTitles.length ? (
                completedTitles.map((title) => (
                  <span
                    key={title}
                    className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-100"
                  >
                    {title}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-400">No videos watched yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModePageShell>
  )
}

function PracticeModeExperience({
  lesson,
  lessonPositionLabel,
  routeTopic,
  activeLessonId,
  packageData,
  modeProgress,
  completeModeStep,
  setCurrentMode,
}) {
  const progressKey = `${routeTopic}:${activeLessonId}`
  const persistedPracticeComplete = Boolean(modeProgress.practice?.[progressKey]?.completed)
  const [answers, setAnswers] = useState(() =>
    persistedPracticeComplete
      ? Object.fromEntries(
          packageData.practiceContent.map((challenge) => [
            challenge.id,
            { selectedIndex: challenge.correctIndex, correct: true },
          ]),
        )
      : {},
  )
  const solvedCount = Object.values(answers).filter((item) => item?.correct).length
  const progress = Math.round((solvedCount / packageData.practiceContent.length) * 100) || 0
  const allSolved = solvedCount === packageData.practiceContent.length

  const answerChallenge = (challenge, optionIndex) => {
    const next = {
      ...answers,
      [challenge.id]: {
        selectedIndex: optionIndex,
        correct: optionIndex === challenge.correctIndex,
      },
    }
    setAnswers(next)

    if (Object.values(next).filter((item) => item?.correct).length === packageData.practiceContent.length) {
      completeModeStep('practice', routeTopic, activeLessonId, {
        solvedChallenges: packageData.practiceContent.length,
      })
    }
  }

  return (
    <ModePageShell
      breadcrumbs={[
        { label: 'Home', to: '/' },
        { label: 'Roadmap', to: '/roadmap' },
        { label: lesson.title },
      ]}
      title={`${lesson.title} — Practice Mode`}
      description={`Lesson ${lessonPositionLabel} for ${routeTopic}. Solve interactive challenges with immediate feedback and hints.`}
      action={<div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-100">{MODE_META.practice.shortLabel}</div>}
    >
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4">
          {packageData.practiceContent.map((challenge) => {
            const state = answers[challenge.id]
            return (
              <div
                key={challenge.id}
                className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                  {challenge.title}
                </p>
                <p className="mt-3 text-lg font-semibold text-white">{challenge.prompt}</p>
                <div className="mt-5 grid gap-3">
                  {challenge.options.map((option, index) => {
                    const active = state?.selectedIndex === index
                    const correct = state?.correct && active
                    const incorrect = state?.selectedIndex === index && state?.correct === false
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => answerChallenge(challenge, index)}
                        className={`rounded-2xl border px-4 py-4 text-left text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300/80 focus-visible:outline-offset-2 ${
                          correct
                            ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100'
                            : incorrect
                              ? 'border-rose-400/20 bg-rose-400/10 text-rose-100'
                              : active
                                ? 'border-cyan-300/30 bg-cyan-400/12 text-white'
                                : 'border-white/10 bg-white/5 text-slate-200 hover:border-cyan-300/20 hover:bg-white/8'
                        }`}
                      >
                        <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/8 text-xs font-semibold text-slate-300">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </button>
                    )
                  })}
                </div>

                {state ? (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/25 p-4">
                    <p className={`text-sm font-semibold ${state.correct ? 'text-emerald-300' : 'text-rose-300'}`}>
                      {state.correct ? 'Correct' : 'Incorrect'}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{challenge.explanation}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-400">
                      Hint: {challenge.hint}
                    </p>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        <div className="space-y-4">
          <ModeProgressCard
            title="Practice completion"
            value={`${progress}%`}
            details={`${solvedCount} of ${packageData.practiceContent.length} challenges solved`}
            icon="🧩"
            progress={progress}
            accent="emerald"
          />

          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
              Guidance
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {allSolved
                ? 'Great work — you solved every challenge in this practice set.'
                : 'Solve every challenge to unlock the completion state for Practice Mode.'}
            </p>
            <Button className="mt-4 w-full" variant="secondary" onClick={() => setCurrentMode('revision')}>
              Go To Revision Mode
            </Button>
          </div>
        </div>
      </div>
    </ModePageShell>
  )
}

function RevisionModeExperience({
  lesson,
  lessonPositionLabel,
  routeTopic,
  activeLessonId,
  packageData,
  modeProgress,
  completeModeStep,
  setCurrentMode,
}) {
  const progressKey = `${routeTopic}:${activeLessonId}`
  const [completed, setCompleted] = useState(Boolean(modeProgress.revision?.[progressKey]?.completed))

  const handleComplete = () => {
    setCompleted(true)
    completeModeStep('revision', routeTopic, activeLessonId, { reviewed: true })
  }

  return (
    <ModePageShell
      breadcrumbs={[
        { label: 'Home', to: '/' },
        { label: 'Roadmap', to: '/roadmap' },
        { label: lesson.title },
      ]}
      title={`${lesson.title} — Revision Mode`}
      description={`Lesson ${lessonPositionLabel} for ${routeTopic}. Quickly refresh the most important points in 1–2 minutes.`}
      action={<div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-100">{MODE_META.revision.shortLabel}</div>}
    >
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
              Concept summary
            </p>
            <p className="mt-3 text-xl font-semibold text-white">{packageData.revisionContent.summary}</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{packageData.revisionContent.rule}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                3 key takeaways
              </p>
              <div className="mt-4 space-y-3">
                {packageData.revisionContent.takeaways.map((item) => (
                  <div key={item} className="rounded-2xl border border-emerald-400/15 bg-emerald-400/8 p-3 text-sm leading-6 text-emerald-100">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                Common mistakes
              </p>
              <div className="mt-4 space-y-3">
                {packageData.revisionContent.commonMistakes.map((item) => (
                  <div key={item} className="rounded-2xl border border-rose-400/15 bg-rose-400/8 p-3 text-sm leading-6 text-rose-100">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <ModeProgressCard
            title="Revision time"
            value={packageData.revisionContent.readingTime}
            details="Designed for fast pre-exam refresh"
            icon="⚡"
            accent="rose"
          />
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
              Exam tip
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{packageData.revisionContent.examTip}</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
              Completion
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {completed
                ? 'Revision mode is complete and the review has been saved.'
                : 'Tap the button once you have reviewed the summary cards.'}
            </p>
            <Button className="mt-4 w-full" onClick={handleComplete}>
              {completed ? 'Revision Complete' : 'Mark Revision Complete'}
            </Button>
            <Button className="mt-3 w-full" variant="secondary" onClick={() => setCurrentMode('read')}>
              Return To Read Mode
            </Button>
          </div>
        </div>
      </div>
    </ModePageShell>
  )
}

function MixedModeExperience({
  lesson,
  lessonPositionLabel,
  routeTopic,
  activeLessonId,
  packageData,
  modeProgress,
  markWatchedVideo,
  completeModeStep,
  setCurrentMode,
}) {
  const progressKey = `${routeTopic}:${activeLessonId}`
  const persistedMixedComplete = Boolean(modeProgress.mixed?.[progressKey]?.completed)
  const watchedProgress = modeProgress.watch?.[progressKey]?.videos?.length || 0
  const [challengeState, setChallengeState] = useState(
    persistedMixedComplete ? { selectedIndex: packageData.practiceContent[0].correctIndex, correct: true } : null,
  )
  const [watched, setWatched] = useState(watchedProgress > 0 || persistedMixedComplete)

  const handleVideo = (video) => {
    if (watched) return
    setWatched(true)
    markWatchedVideo(routeTopic, activeLessonId, video.id)
  }

  const challenge = packageData.practiceContent[0]
  const answerChallenge = (index) => {
    const correct = index === challenge.correctIndex
    setChallengeState({ selectedIndex: index, correct })
    if (correct && watched) {
      completeModeStep('mixed', routeTopic, activeLessonId, { blended: true })
    }
  }

  return (
    <ModePageShell
      breadcrumbs={[
        { label: 'Home', to: '/' },
        { label: 'Roadmap', to: '/roadmap' },
        { label: lesson.title },
      ]}
      title={`${lesson.title} — Mixed Mode`}
      description={`Lesson ${lessonPositionLabel} for ${routeTopic}. Learn concept, watch, practice, and review in one premium flow.`}
      action={<div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-100">{MODE_META.mixed.shortLabel}</div>}
    >
      <div className="grid gap-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">Learn concept</p>
            <p className="mt-3 text-xl font-semibold text-white">{packageData.readContent.summary[0]}</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {packageData.readContent.summary[1] || packageData.readContent.summary[0]}
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleVideo(packageData.videoContent[0])}
            className="rounded-[2rem] border border-white/10 bg-white/6 p-5 text-left shadow-2xl shadow-slate-950/30 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">Watch short video</p>
            <p className="mt-3 text-xl font-semibold text-white">{packageData.videoContent[0].title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{packageData.videoContent[0].description}</p>
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">Solve a challenge</p>
            <p className="mt-3 text-lg font-semibold text-white">{challenge.prompt}</p>
            <div className="mt-5 grid gap-3">
              {challenge.options.map((option, index) => {
                const active = challengeState?.selectedIndex === index
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => answerChallenge(index)}
                    className={`rounded-2xl border px-4 py-4 text-left text-sm font-medium transition ${
                      active
                        ? 'border-cyan-300/30 bg-cyan-400/12 text-white'
                        : 'border-white/10 bg-white/5 text-slate-200 hover:border-cyan-300/20 hover:bg-white/8'
                    }`}
                  >
                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/8 text-xs font-semibold text-slate-300">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </button>
                )
              })}
            </div>
            {challengeState ? (
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/25 p-4">
                <p className={`text-sm font-semibold ${challengeState.correct ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {challengeState.correct ? 'Correct' : 'Incorrect'}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{challenge.explanation}</p>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <ModeProgressCard
              title="Mixed flow"
              value={watched && challengeState?.correct ? 'Complete' : 'In progress'}
              details="Blend all four learning approaches"
              icon="🎯"
              accent="cyan"
            />
            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                Read summary
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{packageData.revisionContent.summary}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-400">
                Then watch, solve, and revise in sequence.
              </p>
            </div>
            <Button
              className="w-full"
              onClick={() => completeModeStep('mixed', routeTopic, activeLessonId, { blended: true })}
              disabled={!(watched && challengeState?.correct)}
            >
              Mark Mixed Mode Complete
            </Button>
            <Button className="w-full" variant="secondary" onClick={() => setCurrentMode('read')}>
              Return To Read Mode
            </Button>
          </div>
        </div>
      </div>
    </ModePageShell>
  )
}

export default LessonPage
