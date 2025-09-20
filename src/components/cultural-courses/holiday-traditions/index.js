import { lesson1Data } from "./lessons/lesson1";
import { lesson2Data } from "./lessons/lesson2";
import { lesson3Data } from "./lessons/lesson3";
import { lesson4Data } from "./lessons/lesson4";

// Calculate totals dynamically from lesson data
const calculateTotals = () => {
  const lessonDataArray = [lesson1Data, lesson2Data, lesson3Data, lesson4Data];

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

export const holidayTraditionsCourse = {
  id: "holiday-traditions",
  title: "Holiday Traditions",
  description:
    "Explore major holidays in English-speaking countries with cultural vocabulary, traditions, and appropriate greetings for conversational knowledge.",
  level: "Beginner to Intermediate",
  estimatedTime: "2-3 hours",
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
    {
      id: "lesson-4",
      title: lesson4Data.title,
      description: lesson4Data.description,
      data: lesson4Data,
      order: 4,
      unlocked: true,
    },
  ],
  courseOverview: {
    objectives: [
      "Understand major holidays in English-speaking countries and their cultural significance",
      "Master holiday-related vocabulary and traditions for each celebration",
      "Learn appropriate greetings and expressions for different holidays",
      "Develop cross-cultural awareness through holiday comparisons",
      "Practice conversation topics related to holiday celebrations",
      "Recognize cultural differences in holiday celebrations across countries",
    ],
    skills: [
      "Holiday vocabulary mastery",
      "Cultural awareness and sensitivity",
      "Appropriate greeting usage",
      "Cross-cultural communication",
      "Conversation skills for holiday topics",
      "Understanding of cultural traditions",
    ],
    prerequisites: [
      "Basic English language skills",
      "Interest in cultural learning",
      "Desire to improve conversational English",
    ],
  },
  totalExercises,
  totalQuestions,
};

export default holidayTraditionsCourse;
