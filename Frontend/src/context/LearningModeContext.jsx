/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LEARNING_MODES } from '../data/adaptiveLearning'
import { readStoredJSON, writeStoredJSON } from '../utils/storage'

const LearningModeContext = createContext(null)

const STORAGE_KEYS = {
  currentMode: 'learnanything.learningMode.current',
  recommendedMode: 'learnanything.learningMode.recommended',
  usage: 'learnanything.learningMode.usage',
  progress: 'learnanything.learningMode.progress',
}

function createDefaultUsage() {
  return LEARNING_MODES.reduce((accumulator, mode) => {
    accumulator[mode] = 0
    return accumulator
  }, {})
}

function createDefaultProgress() {
  return LEARNING_MODES.reduce((accumulator, mode) => {
    accumulator[mode] = {}
    return accumulator
  }, {})
}

function normalizeMode(mode) {
  return LEARNING_MODES.includes(mode) ? mode : 'read'
}

function getLessonKey(topic, lessonId) {
  return `${topic}:${lessonId}`
}

export function LearningModeProvider({ children }) {
  const [currentMode, setCurrentModeState] = useState(() =>
    normalizeMode(readStoredJSON(STORAGE_KEYS.currentMode, 'read')),
  )
  const [recommendedMode, setRecommendedModeState] = useState(() =>
    normalizeMode(readStoredJSON(STORAGE_KEYS.recommendedMode, 'mixed')),
  )
  const [modeUsage, setModeUsage] = useState(() => ({
    ...createDefaultUsage(),
    ...readStoredJSON(STORAGE_KEYS.usage, {}),
  }))
  const [modeProgress, setModeProgress] = useState(() => ({
    ...createDefaultProgress(),
    ...readStoredJSON(STORAGE_KEYS.progress, {}),
  }))

  useEffect(() => {
    writeStoredJSON(STORAGE_KEYS.currentMode, currentMode)
  }, [currentMode])

  useEffect(() => {
    writeStoredJSON(STORAGE_KEYS.recommendedMode, recommendedMode)
  }, [recommendedMode])

  useEffect(() => {
    writeStoredJSON(STORAGE_KEYS.usage, modeUsage)
  }, [modeUsage])

  useEffect(() => {
    writeStoredJSON(STORAGE_KEYS.progress, modeProgress)
  }, [modeProgress])

  const setCurrentMode = useCallback((mode) => {
    const normalized = normalizeMode(mode)
    setCurrentModeState(normalized)
    setModeUsage((current) => ({ ...current, [normalized]: (current[normalized] || 0) + 1 }))
  }, [])

  const setRecommendedMode = useCallback((mode) => {
    setRecommendedModeState(normalizeMode(mode))
  }, [])

  const acceptRecommendedMode = useCallback(() => {
    setCurrentMode(recommendedMode)
  }, [recommendedMode, setCurrentMode])

  const completeModeStep = useCallback((mode, topic, lessonId, details = {}) => {
    const normalized = normalizeMode(mode)
    const lessonKey = getLessonKey(topic, lessonId)

    setModeProgress((current) => {
      const modeEntries = current[normalized] || {}
      const existing = modeEntries[lessonKey] || {}

      return {
        ...current,
        [normalized]: {
          ...modeEntries,
          [lessonKey]: {
            ...existing,
            ...details,
            completed: true,
            completedAt: new Date().toISOString(),
          },
        },
      }
    })
  }, [])

  const markWatchedVideo = useCallback((topic, lessonId, videoId) => {
    const lessonKey = getLessonKey(topic, lessonId)
    setModeProgress((current) => {
      const modeEntries = current.watch || {}
      const existing = modeEntries[lessonKey] || { videos: [] }
      const videos = Array.from(new Set([...(existing.videos || []), videoId]))

      return {
        ...current,
        watch: {
          ...modeEntries,
          [lessonKey]: {
            ...existing,
            videos,
            completed: true,
            completedAt: new Date().toISOString(),
          },
        },
      }
    })
  }, [])

  const value = useMemo(
    () => ({
      currentMode,
      recommendedMode,
      modeUsage,
      modeProgress,
      setCurrentMode,
      setRecommendedMode,
      acceptRecommendedMode,
      completeModeStep,
      markWatchedVideo,
    }),
    [
      acceptRecommendedMode,
      completeModeStep,
      currentMode,
      markWatchedVideo,
      modeProgress,
      modeUsage,
      recommendedMode,
      setCurrentMode,
      setRecommendedMode,
    ],
  )

  return <LearningModeContext.Provider value={value}>{children}</LearningModeContext.Provider>
}

export function useLearningMode() {
  const context = useContext(LearningModeContext)

  if (!context) {
    throw new Error('useLearningMode must be used within a LearningModeProvider')
  }

  return context
}
