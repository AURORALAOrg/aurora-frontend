"use client";

import { useCourseProgress } from "@/context/CourseProgressContext";
import { CourseCard } from "./CourseCard";

export const LearningAreaSection = ({ area, areaData, onCourseComplete }) => {
  const IconComponent = areaData.icon || (() => null); 
  const { getAreaProgress } = useCourseProgress();
  const progress = getAreaProgress(areaData.courses);

  return (
    <section className="mb-20">
      {/* Area Header */}
      <div className="relative mb-10">
        <div className="relative h-64 rounded-2xl overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-r ${areaData.color} opacity-80`}
          />

          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {areaData.title}
                    </h2>
                    <p className="text-white/90">{areaData.description}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-white h-full transition-all duration-500 ease-out"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
                <p className="text-white/90 text-sm mt-2">
                  {progress.completed} of {progress.total} courses completed (
                  {progress.percentage}%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {areaData.courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            area={area}
            onCourseComplete={onCourseComplete}
          />
        ))}
      </div>
    </section>
  );
};
