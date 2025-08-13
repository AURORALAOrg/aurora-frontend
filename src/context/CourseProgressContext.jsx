"use client";

import { createContext, useContext, useEffect, useState } from "react";

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
  const [userProgress, setUserProgress] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("userProgress");
        if (raw) return JSON.parse(raw);
      } catch {
        console.error("Error parsing user progress from localStorage");
      }
    }
    return {
      completedCourses: [],
      points: 0,
      unlockedCourses: [],
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem("userProgress", JSON.stringify(userProgress));
    } catch {
      console.error("Error saving user progress to localStorage");
    }
  }, [userProgress]);

  const markCourseComplete = (courseId) => {
    setUserProgress((prev) => {  
           if (prev.completedCourses.includes(courseId)) return prev;  
           return {  
             ...prev,  
             completedCourses: Array.from(new Set([...prev.completedCourses, courseId])),  
             points: prev.points + 50,  
            };  
          }); 
  };

  const unlockNextCourse = (courseId) => {
    setUserProgress((prev) => {  
            if (prev.unlockedCourses.includes(courseId)) return prev;  
           return {  
             ...prev,  
             unlockedCourses: Array.from(new Set([...prev.unlockedCourses, courseId])),  
           };  
         });  
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
      percentage: courses.length  
        ? Math.round((completedInArea / courses.length) * 100)  
        : 0,  
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
