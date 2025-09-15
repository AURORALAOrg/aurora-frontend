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

export const smallTalkBasicsCourse = {
  id: "small-talk-basics",
  title: "Small Talk Basics",
  description:
    "Develop casual conversation skills for social networking and everyday interactions.",
  level: "Beginner",
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
      unlocked: false,
    },
    {
      id: "lesson-3",
      title: lesson3Data.title,
      description: lesson3Data.description,
      data: lesson3Data,
      order: 3,
      unlocked: false,
    },
    {
      id: "lesson-4",
      title: lesson4Data.title,
      description: lesson4Data.description,
      data: lesson4Data,
      order: 4,
      unlocked: false,
    },
  ],
  courseOverview: {
    aboutCourse:
      "Small talk is essential for building social connections and navigating everyday interactions. This course teaches you how to start, maintain, and politely end casual conversations in various settings.",
    whoIsThisFor: [
      "English learners wanting to improve social communication skills",
      "People who find small talk challenging or awkward",
      "Professionals needing to network effectively",
      "Anyone wanting to build better interpersonal connections",
    ],
    whatYouWillLearn: [
      "Start conversations confidently with appropriate topics",
      "Maintain engaging small talk about weather, work, and hobbies",
      "Navigate cultural differences in casual conversation",
      "End conversations politely and naturally",
    ],
    objectives: [
      "Master conversation starters for different social contexts",
      "Develop confidence in discussing common small talk topics",
      "Learn culturally appropriate conversation strategies",
      "Practice natural conversation flow and polite expressions",
    ],
    prerequisites: ["Basic English conversation skills"],
    stats: {
      lessons: 4,
      exercises: totalExercises,
      questions: totalQuestions,
    },
  },
};
