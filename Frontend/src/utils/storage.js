const KEYS = {
  assessment: 'learnanything-assessment',
  quiz: 'learnanything-quiz',
}

export function readStoredJSON(key, fallback) {
  if (typeof window === 'undefined') return fallback

  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function writeStoredJSON(key, value) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getStoredAssessment() {
  return readStoredJSON(KEYS.assessment, null)
}

export function setStoredAssessment(value) {
  writeStoredJSON(KEYS.assessment, value)
}

export function getStoredQuiz() {
  return readStoredJSON(KEYS.quiz, null)
}

export function setStoredQuiz(value) {
  writeStoredJSON(KEYS.quiz, value)
}
