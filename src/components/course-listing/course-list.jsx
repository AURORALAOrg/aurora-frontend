"use client";
import { useCourseProgress } from "@/context/CourseProgressContext";
import { useCourseFiltering } from "@/hooks/use-course-filtering";
import {
  LearningAreaSection,
  SearchAndFilter,
  UserStats,
  NoCoursesFound,
} from "./components";

export default function ExploreCoursesSection() {
  const { markCourseComplete } = useCourseProgress();
  const {
    searchQuery,
    setSearchQuery,
    selectedArea,
    setSelectedArea,
    filteredAreas,
  } = useCourseFiltering();

  const handleCourseComplete = (courseId) => {
    markCourseComplete(courseId);

    console.log("Course completed:", courseId);
  };

  return (
    <div className="min-h-screen bg-[#0F1624] text-white">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Master English through structured learning paths designed for
            Spanish speakers
          </p>

          {/* Search and Filter */}
          <SearchAndFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
          />

          {/* User Stats */}
          <UserStats />
        </div>

        {/* Learning Areas */}
        {filteredAreas.length > 0 ? (
          filteredAreas.map(([areaKey, areaData]) => (
            <LearningAreaSection
              key={areaKey}
              area={areaKey}
              areaData={areaData}
              onCourseComplete={handleCourseComplete}
            />
          ))
        ) : (
          <NoCoursesFound />
        )}
      </div>
    </div>
  );
}
