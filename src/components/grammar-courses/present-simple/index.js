import { lesson1Data } from './lessons/lesson1';
import { lesson2Data } from './lessons/lesson2';
import { lesson3Data } from './lessons/lesson3';
import { lesson4Data } from './lessons/lesson4';
import { lesson5Data } from './lessons/lesson5';

export const presentSimpleCourse = {
  id: "present-simple",
  title: "Present Simple Tense",
  description: "Master the present simple tense with comprehensive lessons covering formation, usage, and common mistakes.",
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
      "Understand present simple formation for all subjects",
      "Master negative and question forms",
      "Learn to use frequency adverbs and time expressions",
      "Describe daily routines and habits effectively",
      "Distinguish between present simple and present continuous"
    ],
    skills: [
      "Grammar accuracy",
      "Sentence formation",
      "Contextual usage",
      "Error recognition and correction"
    ],
    prerequisites: [
      "Basic understanding of English sentence structure",
      "Knowledge of basic verb forms",
      "Familiarity with subject-verb agreement concepts"
    ]
  },
  totalExercises: 25,
  totalQuestions: 50
};

export default presentSimpleCourse; 