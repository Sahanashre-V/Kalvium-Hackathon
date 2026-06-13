import { TOPIC_LIBRARY } from './topics'
import { getLesson, getTopicLessonOrderForTopic, getTopicStats } from './learningData'
import { getLessonWatchVideos } from './watchVideos'

export const LEARNING_MODES = ['read', 'watch', 'practice', 'revision', 'mixed']

export const MODE_META = {
  read: { label: 'Read', icon: '📖', shortLabel: 'Read Mode' },
  watch: { label: 'Watch', icon: '🎥', shortLabel: 'Watch Mode' },
  practice: { label: 'Practice', icon: '🧩', shortLabel: 'Practice Mode' },
  revision: { label: 'Revise', icon: '⚡', shortLabel: 'Revision Mode' },
  mixed: { label: 'Mixed', icon: '🎯', shortLabel: 'Mixed Mode' },
}

export const PREFERENCE_OPTIONS = [
  {
    mode: 'read',
    title: 'Read & Understand',
    description: 'I prefer detailed explanations and structured walkthroughs.',
  },
  {
    mode: 'watch',
    title: 'Watch & Learn',
    description: 'I learn best through short visual videos and demonstrations.',
  },
  {
    mode: 'practice',
    title: 'Learn By Doing',
    description: 'I prefer exercises, checkpoints, and hands-on challenges.',
  },
  {
    mode: 'revision',
    title: 'Quick Revision',
    description: 'I want concise notes and fast summaries before interviews or exams.',
  },
  {
    mode: 'mixed',
    title: 'Mixed Learning',
    description: 'Use the best method for each concept and blend learning styles.',
  },
]

const PRACTICE_HINTS = {
  DSA: 'Focus on time complexity and the data structure that fits the problem shape.',
  React: 'Look for state updates, props flow, and when the component should re-render.',
  'Machine Learning': 'Ask whether the output is numeric, categorical, or based on pattern learning.',
  'System Design': 'Think about bottlenecks, scale, and the trade-off the system must handle.',
}

function normalizeSentence(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function getLessonKey(lesson) {
  return lesson?.id || 'lesson'
}

export function getLessonLearningPackage(topic, lessonId) {
  const lesson = getLesson(topic, lessonId)
  const topicStats = getTopicStats(topic)
  const lessonOrder = getTopicLessonOrderForTopic(topic)
  const lessonIndex = Math.max(0, lessonOrder.indexOf(getLessonKey(lesson)))

  const readContent = {
    title: lesson.title,
    duration: lesson.duration,
    summary: lesson.sections.whatIs,
    whyItMatters: lesson.sections.whyImportant,
    realWorldExample: lesson.sections.realWorldExample,
    howItWorks: lesson.sections.howItWorks,
    industryApplications: lesson.sections.industryApplications,
    keyTakeaways: lesson.sections.keyTakeaways,
    checkpoint: lesson.sections.checkpoint,
    reinforcement: lesson.sections.reinforcement,
  }

  const videos = getLessonWatchVideos(topic, lesson.id).map((video, index) => ({
    ...video,
    progress: index === 0 ? 100 : index === 1 ? 60 : 0,
    description: video.summary,
  }))

  const practiceContent = [
    {
      id: `${lesson.id}-checkpoint`,
      title: 'Mini checkpoint',
      type: 'multiple-choice',
      prompt: lesson.sections.checkpoint.question,
      options: lesson.sections.checkpoint.options,
      correctIndex: lesson.sections.checkpoint.correctIndex,
      explanation: lesson.sections.checkpoint.explanation,
      hint: lesson.sections.keyTakeaways[0],
    },
    {
      id: `${lesson.id}-scenario`,
      title: 'Scenario challenge',
      type: 'scenario',
      prompt: `${topic}: what is the most practical use of ${lesson.title.toLowerCase()} in a product team?`,
      options: [
        `${lesson.title} for the wrong problem shape`,
        `Use ${lesson.title.toLowerCase()} to solve the exact problem it fits`,
        'Ignore the concept and guess',
        'Use a random shortcut',
      ],
      correctIndex: 1,
      explanation: `The best application is to use ${lesson.title.toLowerCase()} for the kind of problem it naturally solves.`,
      hint: PRACTICE_HINTS[topic] || 'Pick the answer that matches the concept’s core strength.',
    },
  ]

  const revisionContent = {
    title: `${lesson.title} — revision notes`,
    readingTime: '1–2 min',
    summary: lesson.sections.whatIs[0],
    rule: lesson.sections.keyTakeaways[0],
    takeaways: lesson.sections.keyTakeaways.slice(0, 4),
    commonMistakes: [
      `Confusing ${lesson.title.toLowerCase()} with a nearby concept`,
      'Skipping the problem it solves',
      'Missing the one rule that makes the concept useful',
    ],
    examTip: `When revising ${lesson.title.toLowerCase()}, explain the use case before the details.`,
  }

  const mixedFlow = [
    { mode: 'read', title: 'Learn concept', description: `Start with the core idea of ${lesson.title}.` },
    { mode: 'watch', title: 'Watch a short video', description: `See ${lesson.title.toLowerCase()} in motion.` },
    { mode: 'practice', title: 'Solve a challenge', description: 'Apply the concept immediately.' },
    { mode: 'revision', title: 'Read the summary', description: 'Lock in the key points.' },
  ]

  return {
    lesson,
    lessonIndex,
    topicStats,
    readContent,
    videoContent: videos,
    watchContent: {
      videos,
      completedCount: 0,
      totalCount: videos.length,
    },
    practiceContent,
    revisionContent,
    mixedFlow,
  }
}

export function recommendLearningMode(results) {
  const readiness = results?.readiness ?? 70
  const strengths = results?.strengths?.length ?? 0
  const weakAreas = results?.weakAreas?.length ?? 0
  const needsImprovement = results?.needsImprovement?.length ?? 0

  if (needsImprovement >= 2 || weakAreas >= 3) {
    return {
      mode: 'practice',
      reason: 'You will benefit most from hands-on challenges and guided checkpoints.',
    }
  }

  if (readiness >= 85 || strengths >= 3) {
    return {
      mode: 'revision',
      reason: 'You already know the basics, so concise refreshers will keep momentum high.',
    }
  }

  if (readiness >= 70) {
    return {
      mode: 'mixed',
      reason: 'A blended path gives you depth, practice, and quick reinforcement together.',
    }
  }

  return {
    mode: 'watch',
    reason: 'Visual learning will help make the concept click faster before practice.',
  }
}

export function getModeUsagePercentages(modeUsage = {}) {
  const total = LEARNING_MODES.reduce((sum, mode) => sum + (modeUsage[mode] || 0), 0)

  return LEARNING_MODES.reduce((accumulator, mode) => {
    accumulator[mode] = total ? Math.round(((modeUsage[mode] || 0) / total) * 100) : 0
    return accumulator
  }, {})
}

export function getLessonCompletionStats(modeProgress = {}, totalLessonCount = Object.values(TOPIC_LIBRARY).reduce((sum, topic) => sum + topic.roadmap.length, 0)) {
  const readLessons = Object.keys(modeProgress.read || {}).length
  const practiceLessons = Object.keys(modeProgress.practice || {}).length
  const revisionLessons = Object.keys(modeProgress.revision || {}).length
  const watchedVideoCount = Object.values(modeProgress.watch || {}).reduce(
    (sum, lessonState) => sum + (lessonState?.videos?.length || 0),
    0,
  )
  const totalVideos = totalLessonCount * 3

  return {
    readProgress: Math.round((readLessons / totalLessonCount) * 100) || 0,
    practiceCompletion: Math.round((practiceLessons / totalLessonCount) * 100) || 0,
    revisionCompletion: Math.round((revisionLessons / totalLessonCount) * 100) || 0,
    videosWatched: watchedVideoCount,
    videosWatchedProgress: Math.round((watchedVideoCount / totalVideos) * 100) || 0,
  }
}

export function formatModeLabel(mode) {
  return MODE_META[mode]?.shortLabel || normalizeSentence(mode)
}
