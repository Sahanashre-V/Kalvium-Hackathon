export const TOPIC_OPTIONS = ['DSA', 'React', 'Machine Learning', 'System Design']

export const TOPIC_TO_DEFAULT_LESSON = {
  DSA: 'arrays',
  React: 'jsx',
  'Machine Learning': 'regression',
  'System Design': 'scalability',
}

export const TOPIC_TO_SLUG = {
  DSA: 'dsa',
  React: 'react',
  'Machine Learning': 'machine-learning',
  'System Design': 'system-design',
}

export const SLUG_TO_TOPIC = Object.fromEntries(
  Object.entries(TOPIC_TO_SLUG).map(([topic, slug]) => [slug, topic]),
)

export const DEFAULT_TOPIC = TOPIC_OPTIONS[0]
