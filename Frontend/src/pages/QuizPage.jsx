import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AILoadingScreen from '../components/AILoadingScreen'
import Button from '../components/Button'
import QuizCard from '../components/QuizCard'
import PageHeader from '../components/PageHeader'
import { useTopic } from '../context/TopicContext'
import { getDefaultLessonForTopic, getLesson, getQuizSet } from '../data/learningData'
import { getLessonPath } from '../data/topics'
import { setStoredQuiz } from '../utils/storage'

function QuizPage() {
  const navigate = useNavigate()
  const {
    selectedTopic,
    selectedLesson,
    isLessonCheckpointComplete,
  } = useTopic()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [answers, setAnswers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [completed, setCompleted] = useState(false)
  const [finalScore, setFinalScore] = useState(null)

  const lessonId = selectedLesson || getDefaultLessonForTopic(selectedTopic)
  const lesson = getLesson(selectedTopic, lessonId)
  const quizUnlocked = isLessonCheckpointComplete(selectedTopic, lessonId)
  const quizzes = useMemo(() => getQuizSet(selectedTopic, lessonId), [selectedTopic, lessonId])
  const question = quizzes[currentIndex]
  const hasAnswered = selectedIndex !== null
  const isCorrect = hasAnswered && selectedIndex === question.correctIndex

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1200)
    return () => window.clearTimeout(timer)
  }, [lessonId, selectedTopic])

  const onSelect = (index) => {
    if (hasAnswered) return
    setSelectedIndex(index)
    setAnswers((prev) => [...prev, index === question.correctIndex])
  }

  const goNext = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex((value) => value + 1)
      setSelectedIndex(null)
      return
    }

    const correctCount = answers.filter(Boolean).length
    const accuracy = Math.round((correctCount / quizzes.length) * 100)
    setStoredQuiz({
      concept: lessonId,
      accuracy,
      completed: quizzes.length,
      correct: correctCount,
    })
    setFinalScore(accuracy)
    setCompleted(true)
  }

  if (isLoading) {
    return (
      <AILoadingScreen
        title="Generating Quiz..."
        subtitle={`Preparing fast feedback questions for ${selectedTopic} and ${lessonId}.`}
        steps={['Building questions', 'Validating answers', 'Preparing feedback', 'Ready to quiz']}
      />
    )
  }

  if (!quizUnlocked) {
    return (
      <div className="space-y-8 pb-8 pt-4">
        <PageHeader
          backTo={getLessonPath(selectedTopic, lessonId)}
          breadcrumbs={[
            { label: 'Home', to: '/' },
            { label: 'Roadmap', to: '/roadmap' },
            { label: lesson.title, to: getLessonPath(selectedTopic, lessonId) },
            { label: 'Quiz' },
          ]}
          title="Quiz locked"
          description="The quiz unlocks only after you read the lesson and answer the mini checkpoint correctly."
        />
        <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <p className="text-sm leading-7 text-slate-300">
            You can return to the lesson, finish the checkpoint, and then continue into the quiz experience.
          </p>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => navigate(getLessonPath(selectedTopic, lessonId))}>Go To Lesson</Button>
          </div>
        </div>
      </div>
    )
  }

  if (completed) {
    return (
      <div className="space-y-8 pb-8 pt-4">
        <PageHeader
          backTo={getLessonPath(selectedTopic, lessonId)}
          breadcrumbs={[
            { label: 'Home', to: '/' },
            { label: 'Roadmap', to: '/roadmap' },
            { label: lesson.title, to: getLessonPath(selectedTopic, lessonId) },
            { label: 'Quiz' },
          ]}
          title="Quiz complete"
          description="You have finished the quiz. Choose where to go next."
        />

        <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-emerald-100">
            <p className="text-lg font-semibold">Nice work.</p>
            <p className="mt-2 text-sm leading-7">
              You completed the checkpointed quiz for {lesson.title} with an accuracy of {finalScore}%.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <Button onClick={() => navigate('/dashboard', { state: { concept: lessonId, accuracy: finalScore } })}>
              Go To Dashboard
            </Button>
            <Button variant="secondary" onClick={() => navigate(getLessonPath(selectedTopic, lessonId))}>
              Review Lesson
            </Button>
            <Button variant="secondary" onClick={() => navigate('/roadmap')}>
              Continue Learning
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-8 pt-4">
      <PageHeader
        backTo={getLessonPath(selectedTopic, lessonId)}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Roadmap', to: '/roadmap' },
          { label: lesson.title, to: getLessonPath(selectedTopic, lessonId) },
          { label: 'Quiz' },
        ]}
        title={`Immediate feedback on ${selectedTopic}`}
        description="Each answer shows clear feedback so the learner can reinforce or correct their understanding instantly."
      />

      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <QuizCard
          question={question.question}
          options={question.options}
          selectedIndex={selectedIndex}
          onSelect={onSelect}
          feedback={
            hasAnswered
              ? {
                  correct: isCorrect,
                  explanation: question.explanation,
                }
              : null
          }
        />

        <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
            Progress
          </p>
          <p className="mt-3 text-4xl font-semibold text-white">
            {currentIndex + 1}/{quizzes.length}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Immediate feedback appears after the answer is selected.
          </p>

          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/25 p-5">
            <p className="text-sm text-slate-300">Current status</p>
            <p
              className={`mt-2 text-xl font-semibold ${
                hasAnswered ? (isCorrect ? 'text-emerald-300' : 'text-rose-300') : 'text-white'
              }`}
            >
              {hasAnswered ? (isCorrect ? 'Correct' : 'Incorrect') : 'Waiting for selection'}
            </p>
            {hasAnswered ? (
              <p className="mt-2 text-sm leading-6 text-slate-300">{question.explanation}</p>
            ) : null}
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={goNext} disabled={!hasAnswered} size="lg">
              {currentIndex === quizzes.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizPage
