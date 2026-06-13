// This file shows the expanded quiz questions structure
// It needs to replace the QUIZ_QUESTIONS in questionBank.js with more questions per lesson

const EXPANDED_QUIZ_QUESTIONS_EXAMPLE = {
  DSA: {
    arrays: [
      // Currently has 1-2, should have 5+
      {
        id: 1,
        topic: 'DSA',
        lessonId: 'arrays',
        tags: ['arrays'],
        difficulty: 'Easy',
        question: 'What is the fastest way to read the 10th element from an array?',
        options: ['Loop until index 10', 'Direct index access', 'Binary search', 'Stack pop'],
        correctIndex: 1,
        explanation: 'Arrays support direct access by index, which makes reading a specific element fast.',
      },
      {
        id: 2,
        topic: 'DSA',
        lessonId: 'arrays',
        tags: ['arrays', 'complexity'],
        difficulty: 'Easy',
        question: 'What is the time complexity of accessing an element at index 5 in an array?',
        options: ['O(log n)', 'O(1)', 'O(n)', 'O(n²)'],
        correctIndex: 1,
        explanation: 'Index-based access is constant time because position maps directly to memory.',
      },
      {
        id: 3,
        topic: 'DSA',
        lessonId: 'arrays',
        tags: ['arrays', 'iteration'],
        difficulty: 'Medium',
        question: 'Which operation is usually slower on arrays than on linked lists?',
        options: ['Accessing first element', 'Appending at end', 'Inserting in the middle', 'Reading the last element'],
        correctIndex: 2,
        explanation: 'Inserting in the middle requires shifting elements, which is slower in arrays than linked lists.',
      },
      {
        id: 4,
        topic: 'DSA',
        lessonId: 'arrays',
        tags: ['arrays', 'memory'],
        difficulty: 'Medium',
        question: 'How are arrays stored in memory?',
        options: ['Randomly scattered', 'Contiguous blocks', 'Only in cache', 'In a linked fashion'],
        correctIndex: 1,
        explanation: 'Arrays store elements in contiguous memory locations, enabling fast index access.',
      },
      {
        id: 5,
        topic: 'DSA',
        lessonId: 'arrays',
        tags: ['arrays', 'operations'],
        difficulty: 'Hard',
        question: 'What is the time complexity of removing an element from the middle of an array?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctIndex: 2,
        explanation: 'Removing from the middle requires shifting all subsequent elements, making it O(n).',
      },
      {
        id: 6,
        topic: 'DSA',
        lessonId: 'arrays',
        tags: ['arrays', 'sorting'],
        difficulty: 'Hard',
        question: 'Why are arrays efficient for storing sorted sequences?',
        options: ['Binary search on sorted data', 'Memory allocation is faster', 'Sorting is built-in', 'Cache locality'],
        correctIndex: 0,
        explanation: 'Arrays enable binary search on sorted data because of fast random access by index.',
      },
    ],
  },
}

// Note: The same pattern should be applied to all lessons in all topics
// Each lesson should have 5-6 questions with varying difficulty levels
// This will ensure users see proper quiz content and progression
