import { lesson1Data } from "./lessons/lesson1";
import { lesson2Data } from "./lessons/lesson2";
import { lesson3Data } from "./lessons/lesson3";

// Calculate totals dynamically from lesson data
const calculateTotals = () => {
  const lessonDataArray = [lesson1Data, lesson2Data, lesson3Data];

  const totals = lessonDataArray.reduce(
    (acc, lessonData) => {
      const exerciseCount = lessonData.exercises.length;
      const questionCount = lessonData.exercises.reduce((sum, exercise) => {
        return sum + exercise.questions.length;
      }, 0);

      return {
        totalExercises: acc.totalExercises + exerciseCount,
        totalQuestions: acc.totalQuestions + questionCount,
      };
    },
    { totalExercises: 0, totalQuestions: 0 }
  );

  return totals;
};

const { totalExercises, totalQuestions } = calculateTotals();

export const socialMediaCommunicationCourse = {
  id: "social-media-communication",
  title: "Social Media & Modern Communication",
  description:
    "Master digital communication skills with lessons on internet abbreviations, social media vocabulary, and online etiquette.",
  level: "Beginner to Intermediate",
  estimatedTime: "1-2 hours",
  lessons: [
    {
      id: "lesson-1",
      title: lesson1Data.title,
      description: lesson1Data.description,
      data: lesson1Data,
      order: 1,
      unlocked: true,
    },
    {
      id: "lesson-2",
      title: lesson2Data.title,
      description: lesson2Data.description,
      data: lesson2Data,
      order: 2,
      unlocked: true,
    },
    {
      id: "lesson-3",
      title: lesson3Data.title,
      description: lesson3Data.description,
      data: lesson3Data,
      order: 3,
      unlocked: true,
    },
  ],
  courseOverview: {
    objectives: [
      "Understand and properly use common internet abbreviations",
      "Master social media vocabulary across different platforms",
      "Learn appropriate digital communication etiquette",
      "Distinguish between formal and informal online communication contexts",
      "Recognize generational differences in digital communication",
    ],
    skills: [
      "Digital communication literacy",
      "Social media proficiency",
      "Online etiquette awareness",
      "Context-appropriate communication",
      "Interpretation of text-based tone",
    ],
    prerequisites: [
      "Basic English language skills",
      "Familiarity with using the internet",
      "Access to digital communication tools",
    ],
  },
  totalExercises,
  totalQuestions,
};

export default socialMediaCommunicationCourse;
