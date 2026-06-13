const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function apiCall(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || `API error: ${response.status}`)
  }

  return response.json()
}

export const assessmentAPI = {
  generate: (sessionId) =>
    apiCall('/api/assessment/generate', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId }),
    }),

  submit: (sessionId, assessmentId, answers) =>
    apiCall('/api/assessment/submit', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId, assessment_id: assessmentId, answers }),
    }),
}

export const analysisAPI = {
  get: (sessionId) => apiCall(`/api/analysis/${sessionId}`),
}

export const roadmapAPI = {
  generate: (sessionId) =>
    apiCall('/api/roadmap/generate', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId }),
    }),
}

export const lessonAPI = {
  get: (topic, sessionId) => apiCall(`/api/lesson/${topic}?session_id=${sessionId}`),
}

export const quizAPI = {
  generate: (sessionId, topic) =>
    apiCall('/api/quiz/generate', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId, topic }),
    }),

  submit: (sessionId, quizId, answers) =>
    apiCall('/api/quiz/submit', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId, quiz_id: quizId, answers }),
    }),
}

export const dashboardAPI = {
  get: (sessionId) => apiCall(`/api/dashboard/${sessionId}`),
}

export const topicAPI = {
  select: (topic) =>
    apiCall('/api/topic/select', {
      method: 'POST',
      body: JSON.stringify({ topic }),
    }),
}
