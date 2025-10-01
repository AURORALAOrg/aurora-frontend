import { lesson1Data } from './lessons/lesson1';
import { lesson2Data } from './lessons/lesson2';
import { lesson3Data } from './lessons/lesson3';
import { lesson4Data } from './lessons/lesson4';

const lessons = [lesson1Data, lesson2Data, lesson3Data, lesson4Data];
const totalExercises = lessons.reduce((total, lesson) => total + lesson.exercises.length, 0);
const totalQuestions = lessons.reduce((total, lesson) => 
  total + lesson.exercises.reduce((sum, ex) => sum + ex.questions.length, 0), 0);

export const basicPronounsArticlesCourse = {
  id: "basic-pronouns-articles",
  title: "Basic Pronouns & Articles",
  description: "Learn personal pronouns and articles (a/an/the) for beginners",
  level: "Beginner", 
  estimatedTime: "1.5-2 hours",
  lessons: lessons.map((lessonData, index) => ({
    id: `lesson-${index + 1}`,
    title: lessonData.title,
    description: lessonData.description,
    data: lessonData,
    order: index + 1,
    unlocked: true
  })),
  courseOverview: {
    objectives: [
      "Use subject and object pronouns correctly",
      "Choose 'a' and 'an' based on sound",
      "Know when to use 'the'",
      "Know when to skip articles",
      "Fix common mistakes"
    ],
    skills: ["Grammar", "Pronouns", "Articles", "Error fixing"],
    prerequisites: ["Basic sentence structure", "Know nouns and verbs"]
  },
  totalExercises,
  totalQuestions
};

export default basicPronounsArticlesCourse;