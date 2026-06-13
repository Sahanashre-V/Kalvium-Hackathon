import { getAssessmentQuestions as getAssessmentQuestionsFromBank, getQuizQuestions } from './questionBank'
import { getTopicRecord, getTopicRoadmap, getTopicLesson, getTopicLessonOrder, normalizeTopicKey, TOPIC_KEYS } from './topics'

export const topicProfiles = {
  DSA: {
    roadmapCompletion: 67,
    strengths: ['Arrays', 'Linked Lists'],
    needsImprovement: ['Recursion'],
    weakAreas: ['Dynamic Programming', 'Graphs'],
    readinessLevel: 'Building foundation',
  },
  React: {
    roadmapCompletion: 72,
    strengths: ['Components', 'Props'],
    needsImprovement: ['Hooks'],
    weakAreas: ['Context API', 'Performance Optimization'],
    readinessLevel: 'Solid start',
  },
  'Machine Learning': {
    roadmapCompletion: 58,
    strengths: ['Regression', 'Classification'],
    needsImprovement: ['Feature Engineering'],
    weakAreas: ['Model Evaluation', 'Overfitting'],
    readinessLevel: 'Early stage',
  },
  'System Design': {
    roadmapCompletion: 63,
    strengths: ['Scalability', 'Caching'],
    needsImprovement: ['Load Balancing'],
    weakAreas: ['Databases', 'Microservices'],
    readinessLevel: 'Growing confidence',
  },
}

export function getAssessmentQuestions(topic) {
  return getAssessmentQuestionsFromBank(topic)
}

export function getRoadmapTopics(topic) {
  return getTopicRoadmap(normalizeTopicKey(topic))
}

export function getLesson(topic, lessonId) {
  return getTopicLesson(normalizeTopicKey(topic), lessonId)
}

export function getQuizSet(topic, lessonId) {
  return getQuizQuestions(normalizeTopicKey(topic), lessonId)
}

export function getDefaultLessonForTopic(topic) {
  const roadmap = getTopicRoadmap(normalizeTopicKey(topic))
  return roadmap[0]?.id
}

export function getTopicStats(topic) {
  return topicProfiles[topic] || Object.values(topicProfiles)[0]
}

export function getTopicLessonOrderForTopic(topic) {
  return getTopicLessonOrder(normalizeTopicKey(topic))
}

export function getTopicRecordFor(topic) {
  return getTopicRecord(normalizeTopicKey(topic))
}
