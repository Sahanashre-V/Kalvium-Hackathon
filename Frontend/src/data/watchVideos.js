import { TOPIC_LIBRARY } from './topics'
import { TOPIC_TO_SLUG } from './topicMeta'

const TOPIC_CREATORS = {
  DSA: 'DSA Course',
  React: 'React Course',
  'Machine Learning': 'Machine Learning Course',
  'System Design': 'System Design Course',
}

const COURSE_VIDEOS = {
  DSA: {
    youtubeId: 'BBpAmxU_NQo',
    title: 'DSA Complete Course Video',
    summary: 'A single DSA video used across this course for visual learning.',
  },
  React: {
    youtubeId: 'SqcY0GlETPk',
    title: 'React Complete Course Video',
    summary: 'A single React video used across this course for visual learning.',
  },
  'Machine Learning': {
    youtubeId: '7eh4d6sabA0',
    title: 'Machine Learning Complete Course Video',
    summary: 'A single machine learning video used across this course for visual learning.',
  },
  'System Design': {
    youtubeId: 'Vnm-ycSfJx4',
    title: 'System Design Complete Course Video',
    summary: 'A single system design video used across this course for visual learning.',
  },
}

function createCourseVideo(topic, lesson, lessonIndex) {
  const topicSlug = TOPIC_TO_SLUG[topic]
  const courseVideo = COURSE_VIDEOS[topic]
  const creator = TOPIC_CREATORS[topic] || 'LearnAnything AI'

  return {
    id: `${topicSlug}-${lesson.id}-course-video`,
    title: courseVideo.title,
    youtubeId: courseVideo.youtubeId,
    duration: 'Course video',
    difficulty: 'Beginner friendly',
    creator,
    thumbnailLabel: topic,
    summary: courseVideo.summary,
    lessonKey: `${topicSlug}:${lesson.id}`,
    lessonIndex,
    topic,
    lessonId: lesson.id,
  }
}

function buildLessonVideos(topic, lesson, lessonIndex) {
  return [createCourseVideo(topic, lesson, lessonIndex)]
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
