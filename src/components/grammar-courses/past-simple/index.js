import { lesson1Data } from './lessons/lesson1';
import { lesson2Data } from './lessons/lesson2';
import { lesson3Data } from './lessons/lesson3';
import { lesson4Data } from './lessons/lesson4';
import { lesson5Data } from './lessons/lesson5';

// Calculate totals dynamically from lesson data
const calculateTotals = () => {
  const lessonDataArray = [lesson1Data, lesson2Data, lesson3Data, lesson4Data, lesson5Data];
  
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

export const pastSimpleCourse = {
  id: "past-simple",
  title: "Past Simple Tense",
  description: "Master the past simple tense with comprehensive lessons covering regular/irregular verbs, questions, negatives, and storytelling applications.",
  level: "Beginner to Intermediate",
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
    },
    {
      id: "lesson-5",
      title: lesson5Data.title,
      description: lesson5Data.description,
      data: lesson5Data,
      order: 5,
      unlocked: true
    }
  ],
  courseOverview: {
    objectives: [
      "Master regular past tense formation with proper spelling rules",
      "Learn common irregular verbs and their past forms",
      "Form questions and negative sentences in past simple",
      "Use time expressions to describe past events",
      "Tell simple stories using past simple sequencing"
    ],
    skills: [
      "Grammar accuracy",
      "Verb conjugation",
      "Sentence formation",
      "Storytelling",
      "Time expression usage"
    ],
    prerequisites: [
      "Basic understanding of English sentence structure",
      "Knowledge of present simple tense",
      "Familiarity with basic verb forms"
    ]
  },
  totalExercises,
  totalQuestions
};

export default pastSimpleCourse;
