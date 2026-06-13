/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { DEFAULT_TOPIC, SLUG_TO_TOPIC, TOPIC_OPTIONS, TOPIC_TO_DEFAULT_LESSON } from '../data/topicMeta'
import { getTopicLessonOrderForTopic } from '../data/learningData'
import { useAuth } from './AuthContext'

const TopicContext = createContext(null)

const STORAGE_KEYS = {
  topic: 'learnanything.selectedTopic',
  lesson: 'learnanything.selectedLesson',
  checkpoints: 'learnanything.lessonCheckpoints',
  assessment: 'learnanything.currentAssessment',
}

export function getTopicFromSlug(slug) {
  return SLUG_TO_TOPIC[slug] || DEFAULT_TOPIC
}

function getStoredValue(key, fallback) {
  if (typeof window === 'undefined') return fallback

  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function setStoredValue(key, value) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getLessonCheckpointKey(topic, lessonId) {
  return `${topic}:${lessonId}`
}

export function TopicProvider({ children }) {
  const { token, authHeader } = useAuth()

  const [selectedTopic, setSelectedTopicState] = useState(() =>
    getStoredValue(STORAGE_KEYS.topic, DEFAULT_TOPIC),
  )
  const [selectedLesson, setSelectedLessonState] = useState(() => {
    const initialTopic = getStoredValue(STORAGE_KEYS.topic, DEFAULT_TOPIC)
    const storedLesson = getStoredValue(
      STORAGE_KEYS.lesson,
      TOPIC_TO_DEFAULT_LESSON[initialTopic] || TOPIC_TO_DEFAULT_LESSON[DEFAULT_TOPIC],
    )
    const fallbackLesson = TOPIC_TO_DEFAULT_LESSON[initialTopic] || TOPIC_TO_DEFAULT_LESSON[DEFAULT_TOPIC]
    const lessonOrder = getTopicLessonOrderForTopic(initialTopic)
    return lessonOrder.includes(storedLesson) ? storedLesson : fallbackLesson
  })
  const [lessonCheckpoints, setLessonCheckpointsState] = useState(() =>
    getStoredValue(STORAGE_KEYS.checkpoints, {}),
  )
  const [currentAssessment, setCurrentAssessment] = useState(() =>
    getStoredValue(STORAGE_KEYS.assessment, null),
  )

  useEffect(() => {
    setStoredValue(STORAGE_KEYS.topic, selectedTopic)
  }, [selectedTopic])

  useEffect(() => {
    setStoredValue(STORAGE_KEYS.lesson, selectedLesson)
  }, [selectedLesson])

  useEffect(() => {
    setStoredValue(STORAGE_KEYS.checkpoints, lessonCheckpoints)
  }, [lessonCheckpoints])

  useEffect(() => {
    setStoredValue(STORAGE_KEYS.assessment, currentAssessment)
  }, [currentAssessment])

  const setSelectedTopic = (topic) => {
    const normalizedTopic = TOPIC_OPTIONS.includes(topic) ? topic : DEFAULT_TOPIC
    setSelectedTopicState(normalizedTopic)
    setSelectedLessonState(TOPIC_TO_DEFAULT_LESSON[normalizedTopic])
  }

  const setSelectedLesson = (lesson) => {
    setSelectedLessonState(lesson)
  }

  const markLessonCheckpointComplete = (topic, lessonId) => {
    const checkpointKey = getLessonCheckpointKey(topic, lessonId)
    setLessonCheckpointsState((current) => ({ ...current, [checkpointKey]: true }))
  }

  const isLessonCheckpointComplete = (topic, lessonId) => {
    const checkpointKey = getLessonCheckpointKey(topic, lessonId)
    return Boolean(lessonCheckpoints[checkpointKey])
  }

  const startSession = async (topic, goal = '') => {
    const payload = { topic, goal }
    const headers = { 'Content-Type': 'application/json', ...(token ? authHeader() : {}) }
    const res = await fetch('/api/topic/select', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      setSelectedTopic(topic)
      setCurrentAssessment(null)
      return null
    }
    const data = await res.json()
    if (data.assessment_id) {
      setCurrentAssessment({ id: data.assessment_id, questions: data.questions, total: data.total_questions })
    } else {
      setCurrentAssessment(null)
    }
    setSelectedTopic(topic)
    return data
  }

  const value = {
    selectedTopic,
    selectedLesson,
    lessonCheckpoints,
    setSelectedTopic,
    setSelectedLesson,
    markLessonCheckpointComplete,
    isLessonCheckpointComplete,
    currentAssessment,
    startSession,
  }

  return <TopicContext.Provider value={value}>{children}</TopicContext.Provider>
}

export function useTopic() {
  const context = useContext(TopicContext)

  if (!context) {
    throw new Error('useTopic must be used within a TopicProvider')
  }

  return context
}
