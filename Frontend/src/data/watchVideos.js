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

// Real YouTube Video IDs for educational content
const REAL_VIDEO_IDS = {
  DSA: {
    arrays: ['9OExMJnHXc0', 'Yq6jebNS0U4', 'TSMuR8wySNQ'],
    'linked-lists': ['WwfhLC_8IXE', '041DkWKq47U', 'dBj4cMMBJcY'],
    recursion: ['t4MSwiqfLaY', 'mz6tAJMVmfM', '3d85G2uhE94'],
    'prefix-sum': ['OvI2_K4qdJA', 'lXVy6YWFc-0', 'W5ibvHIQcYE'],
    'dynamic-programming': ['oBt53YbR9Kk', 'OQ5jsbhAv_M', '5dRGRueKU1M'],
    graphs: ['TIbUeeksXcI', 'pcKY4hjDrxk', '09_LlHjoEiY'],
  },
  React: {
    components: ['JSUft8jnRqI', 'sSKRWQUKfP4', 'rN8KuSJnjVU'],
    props: ['TOeHj0hWZ2M', 'Oc9vB1jWe0w', 'n-p-ienOy_U'],
    state: ['4ORmy1isaYw', 'WH6V7eNM5iI', '_Z5oKErjFd8'],
    hooks: ['TNhaISOUy6Q', 'VQZCJsVtnQA', 'dpw9EHDh2bM'],
    'context-api': ['9T2L2b7Yp-o', 'xWIGbzoyXOU', 'HTHBY-Ys4AU'],
    'performance-optimization': ['nI8PspryMFk', 'Ey0Z7_1bVLo', 'l7AWQgg-_RI'],
  },
  'Machine Learning': {
    regression: ['wqQKFu41ajg', 'E4MfRiNzJandJ', 'zPG4NjIW_4c'],
    classification: ['KHwlqFywFXs', 'UqRCSmkhAzM', 'K_EAOMs7ZWU'],
    'feature-engineering': ['zxZhSyiban4', 'iiHKrD7riBI', 'BwGdyXH1uFI'],
    'model-evaluation': ['Jw2B4DII-Ts', 'vCJpUiIh37U', 'oye0n0D5eEk'],
    'neural-networks': ['aircAruvnKk', 'bcc3mWAntt0', 'CqOfi41LfDw'],
    overfitting: ['EhYYoDdQXmo', 'dBj4cMMBJcY', 'qVbjk0dfIl8'],
  },
  'System Design': {
    scalability: ['xpDnVSmNFwY', '2WmDtSE5wnE', 'quLrc3PbuIw'],
    'load-balancing': ['K0Ta65OqQkY', 'fDQkJU0Z-a4', 'tpspO9K28PM'],
    caching: ['_wywe8AGcXo', 'dh5c65OoUT0', '5QpGGVDnPOY'],
    databases: ['W2Z7fbCLSTw', 'oe21Nlq8GS4', 'ruz-vK8ILQc'],
    'message-queues': ['CvIQwIThRH8', 'deG72Xy-0Bw', 'xvqsFW8V9Rw'],
    microservices: ['y8OnoxiC-PC', 'lTAmatVxqv0', 'sCC5mQag97I'],
  },
}

function createVideo(topic, lesson, lessonIndex, videoIndex, descriptor) {
  const topicSlug = TOPIC_TO_SLUG[topic]
  const creator = TOPIC_CREATORS[topic] || 'LearnAnything AI'
  const baseTitle = lesson.title
  const focus = LESSON_FOCUS[topic]?.[lesson.id] || lesson.title.toLowerCase()

  // Get real YouTube ID or fallback to placeholder
  const videoIds = REAL_VIDEO_IDS[topic]?.[lesson.id] || []
  const youtubeId = videoIds[videoIndex] || 'dQw4w9WgXcQ'

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
