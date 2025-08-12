"use client";

import { createContext, useContext, useState } from "react";

const CourseProgressContext = createContext();

export const useCourseProgress = () => {
  const context = useContext(CourseProgressContext);
  if (!context) {
    throw new Error(
      "useCourseProgress must be used within a CourseProgressProvider"
    );
  }
  return context;
};

export const CourseProgressProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState({
    completedCourses: ["greetings-intro"],
    points: 150,
    unlockedCourses: ["greetings-intro", "ordering-food"],
  });

  const markCourseComplete = (courseId) => {
    setUserProgress((prev) => ({
      ...prev,
      completedCourses: [...prev.completedCourses, courseId],
      points: prev.points + 50,
    }));
  };

  const unlockNextCourse = (courseId) => {
    setUserProgress((prev) => ({
      ...prev,
      unlockedCourses: [...prev.unlockedCourses, courseId],
    }));
  };

  const getCourseProgress = (courseId) => {
    return {
      isCompleted: userProgress.completedCourses.includes(courseId),
      isUnlocked: userProgress.unlockedCourses.includes(courseId),
    };
  };

  const getAreaProgress = (courses) => {
    const completedInArea = courses.filter((course) =>
      userProgress.completedCourses.includes(course.id)
    ).length;
    return {
      completed: completedInArea,
      total: courses.length,
      percentage: Math.round((completedInArea / courses.length) * 100),
    };
  };

  const value = {
    userProgress,
    markCourseComplete,
    unlockNextCourse,
    getCourseProgress,
    getAreaProgress,
  };

  return (
    <CourseProgressContext.Provider value={value}>
      {children}
    </CourseProgressContext.Provider>
  );
};
