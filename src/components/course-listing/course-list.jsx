"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "./course-card";
import CourseSkeletons from "./course-skeleton";

export default function CourseList({
  isLoading,
  filteredCourses,
  currentCourses,
  viewMode,
  currentPage,
  itemsPerPage,
  clearFilters,
}) {
  if (isLoading) {
    return <CourseSkeletons viewMode={viewMode} count={itemsPerPage} />;
  }

  if (filteredCourses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
          <Search className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No courses found</h3>
        <p className="text-gray-400 max-w-md mx-auto mb-6">
          We couldn&#39;t find any courses matching your criteria. Try adjusting
          your filters or search query.
        </p>
        <Button
          onClick={clearFilters}
          className="bg-[#00C2CB] hover:bg-[#00A8B0]"
        >
          Clear all filters
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Course results status */}
      <div className="text-gray-400 text-sm mb-4">
        Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
        {Math.min(currentPage * itemsPerPage, filteredCourses.length)} of{" "}
        {filteredCourses.length} courses
      </div>

      <div
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        } gap-6`}
      >
        {currentCourses.map((course) => (
          <CourseCard key={course.id} course={course} viewMode={viewMode} />
        ))}
      </div>
    </>
  );
}
