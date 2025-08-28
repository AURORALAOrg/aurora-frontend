import { lesson1Data } from './lessons/lesson1';
import { lesson2Data } from './lessons/lesson2';
import { lesson3Data } from './lessons/lesson3';
import { lesson4Data } from './lessons/lesson4';

// Calculate totals dynamically from lesson data
const calculateTotals = () => {
  const lessonDataArray = [lesson1Data, lesson2Data, lesson3Data, lesson4Data];
  
  const totals = lessonDataArray.reduce((acc, lessonData) => {
    const exerciseCount = lessonData.exercises.length;
    const questionCount = lessonData.exercises.reduce((sum, exercise) => {
      return sum + exercise.questions.length;
    }, 0);
    
    return {
      totalExercises: acc.totalExercises + exerciseCount,
      totalQuestions: acc.totalQuestions + questionCount
    };
  }, { totalExercises: 0, totalQuestions: 0 });
  
  return totals;
};

const { totalExercises, totalQuestions } = calculateTotals();

export const basicListeningCourse = {
  id: "basic-listening",
  title: "Basic Listening Comprehension",
  description: "Master fundamental listening skills with graduated difficulty for Spanish-speaking beginners.",
  level: "Beginner",
  estimatedTime: "2-3 hours",
  lessons: [
    {
      id: "lesson-1",
      title: lesson1Data.title,
      description: lesson1Data.description,
      data: lesson1Data,
      order: 1,
      unlocked: true
    },
    {
      id: "lesson-2", 
      title: lesson2Data.title,
      description: lesson2Data.description,
      data: lesson2Data,
      order: 2,
      unlocked: true
    },
    {
      id: "lesson-3",
      title: lesson3Data.title,
      description: lesson3Data.description,
      data: lesson3Data,
      order: 3,
      unlocked: true
    },
    {
      id: "lesson-4",
      title: lesson4Data.title,
      description: lesson4Data.description,
      data: lesson4Data,
      order: 4,
      unlocked: true
    }
  ],
  courseOverview: {
    objectives: [
      "Recognize slow, clear speech patterns",
      "Understand normal conversational speed",
      "Distinguish between American and British accents",
      "Filter important information from background noise",
      "Develop real-world listening comprehension skills"
    ],
    skills: [
      "Audio comprehension",
      "Accent recognition",
      "Information filtering",
      "Context understanding",
      "Vocabulary recognition"
    ],
    prerequisites: [
      "Basic English vocabulary knowledge",
      "Familiarity with simple English phrases",
      "Ability to read basic English text"
    ]
  },
  totalExercises,
  totalQuestions
};

export default basicListeningCourse;
