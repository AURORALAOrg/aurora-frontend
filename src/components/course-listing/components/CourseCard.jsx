"use client";

import { useState } from "react";
import { Lock, Play, CheckCircle, BookOpen, Clock } from "lucide-react";
import { useCourseProgress } from "@/context/CourseProgressContext";
import { CourseCompletionReward } from "./CourseCompletionReward";

export const CourseCard = ({ course, area, onCourseComplete }) => {
  const [showReward, setShowReward] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { getCourseProgress, markCourseComplete, unlockNextCourse } =
    useCourseProgress();

  const { isCompleted, isUnlocked } = getCourseProgress(course.id);

  const handleCourseAction = () => {
    if (!isUnlocked) return;

    // If course is completed, go to course
    if (isCompleted) {
      console.log("Navigate to course:", course.id);
      return;
    }

    // Simulate course completion for demo
    setShowReward(true);
    onCourseComplete(course.id);
  };

  const handleRewardClose = () => {
    setShowReward(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getFallbackImage = () => {
    // Return a gradient background as fallback
    return `linear-gradient(135deg, ${
      course.difficulty === "Beginner" ? "#3B82F6" : "#8B5CF6"
    } 0%, ${course.difficulty === "Beginner" ? "#06B6D4" : "#EC4899"} 100%)`;
  };

  return (
    <>
      <div
        className={`relative bg-gray-800/50 rounded-xl overflow-hidden border ${
          isUnlocked
            ? "border-gray-700 hover:border-gray-600"
            : "border-gray-800"
        } transition-all duration-200 ${
          isUnlocked ? "hover:shadow-lg hover:shadow-cyan-500/10" : ""
        }`}
      >
        {/* Course Image */}
        <div className="relative h-48 overflow-hidden">
          {!imageError ? (
            <img
              src={course.image}
              alt={course.title}
              className={`w-full h-full object-cover transition-all duration-200 ${
                !isUnlocked ? "grayscale brightness-50" : "hover:scale-105"
              }`}
              onError={handleImageError}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: getFallbackImage() }}
            >
              <div className="text-center text-white">
                <div className="text-4xl mb-2">📚</div>
                <div className="text-sm font-medium">{course.title}</div>
              </div>
            </div>
          )}

          {/* Lock overlay */}
          {!isUnlocked && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-center">
                <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">
                  Complete &quot;
                  {course.prerequisite}
                  &quot; first
                </p>
              </div>
            </div>
          )}

          {/* Completion badge */}
          {isCompleted && (
            <div className="absolute top-3 right-3 bg-green-500 rounded-full p-2">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          )}

          {/* Difficulty badge */}
          <div className="absolute top-3 left-3">
            <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
              {course.difficulty}
            </span>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3
              className={`text-lg font-semibold ${
                !isUnlocked ? "text-gray-500" : "text-white"
              }`}
            >
              {course.title}
            </h3>
          </div>

          <p
            className={`text-sm mb-4 ${
              !isUnlocked ? "text-gray-600" : "text-gray-300"
            }`}
          >
            {course.description}
          </p>

          {/* Course Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span className={!isUnlocked ? "text-gray-600" : "text-gray-400"}>
                {course.lessons} lessons
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className={!isUnlocked ? "text-gray-600" : "text-gray-400"}>
                {course.duration}
              </span>
            </div>
          </div>

          {/* Learning Objectives */}
          {isUnlocked && (
            <div className="mb-4">
              <p className="text-xs text-gray-400 mb-2">You&apos;ll learn:</p>
              <ul className="text-xs text-gray-300 space-y-1">
                {course.objectives.slice(0, 2).map((objective, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleCourseAction}
            disabled={!isUnlocked}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              !isUnlocked
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : isCompleted
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white hover:shadow-lg"
            }`}
          >
            {!isUnlocked ? (
              <>
                <Lock className="w-4 h-4" />
                Locked
              </>
            ) : isCompleted ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Completed
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Course
              </>
            )}
          </button>
        </div>
      </div>

      <CourseCompletionReward show={showReward} onClose={handleRewardClose} />
    </>
  );
};
