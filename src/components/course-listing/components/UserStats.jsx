"use client";

import { useCourseProgress } from "@/context/CourseProgressContext";

export const UserStats = () => {
  const { userProgress } = useCourseProgress();

  return (
    <div className="flex items-center justify-center gap-8 p-8 bg-gray-800/30 rounded-xl max-w-md mx-auto">
      <div className="text-center">
        <div className="text-2xl font-bold text-cyan-400">
          {userProgress.points}
        </div>
        <div className="text-sm text-gray-400">Points Earned</div>
      </div>
      <div className="w-px h-12 bg-gray-600" />
      <div className="text-center">
        <div className="text-2xl font-bold text-green-400">
          {userProgress.completedCourses.length}
        </div>
        <div className="text-sm text-gray-400">Courses Completed</div>
      </div>
    </div>
  );
};
