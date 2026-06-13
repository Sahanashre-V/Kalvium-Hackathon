import { TOPIC_LIBRARY } from './topics'
import { TOPIC_TO_SLUG } from './topicMeta'

const TOPIC_CREATORS = {
  DSA: 'Algo Academy',
  React: 'Frontend Forge',
  'Machine Learning': 'ML Visual Lab',
  'System Design': 'Architecture Academy',
}

const LESSON_FOCUS = {
  DSA: {
    arrays: 'indexing and traversal',
    'linked-lists': 'references and pointer updates',
    recursion: 'base cases and stack frames',
    'prefix-sum': 'range queries with cumulative totals',
    'dynamic-programming': 'overlapping subproblems',
    graphs: 'nodes, edges, and traversal',
  },
  React: {
    components: 'component composition',
    props: 'data flow between components',
    state: 'state updates and re-rendering',
    hooks: 'stateful logic and side effects',
    'context-api': 'shared state without prop drilling',
    'performance-optimization': 'memoization and efficient rendering',
  },
  'Machine Learning': {
    regression: 'predicting continuous values',
    classification: 'predicting categories',
    'feature-engineering': 'building better inputs',
    'model-evaluation': 'measuring generalization',
    'neural-networks': 'layered pattern learning',
    overfitting: 'memorization versus generalization',
  },
  'System Design': {
    scalability: 'handling growth',
    'load-balancing': 'spreading traffic',
    caching: 'serving data faster',
    databases: 'storing and querying data',
    'message-queues': 'decoupling asynchronous work',
    microservices: 'splitting systems into focused services',
  },
}

function createSlugHash(seed) {
  let hash = 0

  for (const character of seed) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0
  }

  return hash.toString(36).padStart(11, '0').slice(0, 11)
}

function createVideo(topic, lesson, lessonIndex, videoIndex, descriptor) {
  const topicSlug = TOPIC_TO_SLUG[topic]
  const sequence = `${lesson.id}-${videoIndex}`
  const youtubeId = createSlugHash(`${topicSlug}-${sequence}`)
  const creator = TOPIC_CREATORS[topic] || 'LearnAnything AI'
  const baseTitle = lesson.title
  const focus = LESSON_FOCUS[topic]?.[lesson.id] || lesson.title.toLowerCase()

  const titleMap = [
    `${baseTitle} Explained`,
    `${baseTitle} Deep Dive`,
    `${baseTitle} in the Real World`,
  ]

  const summaryMap = [
    `Build the foundation for ${focus}.`,
    `See how ${focus} is applied step by step.`,
    `Connect ${baseTitle.toLowerCase()} to product use cases.`,
  ]

  return {
    id: `${topicSlug}-${lesson.id}-video-${videoIndex + 1}`,
    title: titleMap[videoIndex],
    youtubeId,
    duration: descriptor.duration,
    difficulty: descriptor.difficulty,
    creator,
    thumbnailLabel: baseTitle,
    summary: summaryMap[videoIndex],
    lessonKey: `${topicSlug}:${lesson.id}`,
    lessonIndex,
    topic,
    lessonId: lesson.id,
  }
}

function buildLessonVideos(topic, lesson, lessonIndex) {
  const descriptors = [
    { duration: '6 min', difficulty: 'Beginner' },
    { duration: '9 min', difficulty: 'Intermediate' },
    { duration: '12 min', difficulty: 'Applied' },
  ]

  return descriptors.map((descriptor, videoIndex) =>
    createVideo(topic, lesson, lessonIndex, videoIndex, descriptor),
  )
}

export const WATCH_VIDEO_LIBRARY = Object.fromEntries(
  Object.entries(TOPIC_LIBRARY).map(([topic, topicRecord]) => {
    const lessonMap = Object.fromEntries(
      topicRecord.roadmap.map((lesson, lessonIndex) => [lesson.id, buildLessonVideos(topic, lesson, lessonIndex)]),
    )

    return [topic, lessonMap]
  }),
)

export function getLessonWatchVideos(topic, lessonId) {
  const lessonVideos = WATCH_VIDEO_LIBRARY[topic]?.[lessonId]

  if (lessonVideos?.length) {
    return lessonVideos
  }

  const firstLesson = TOPIC_LIBRARY[topic]?.roadmap?.[0]
  return firstLesson ? WATCH_VIDEO_LIBRARY[topic]?.[firstLesson.id] || [] : []
}

export function getWatchVideoEmbedUrl(youtubeId) {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`
}

export function getWatchThumbnailUrl(youtubeId) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
}
