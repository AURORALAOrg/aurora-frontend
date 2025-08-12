"use client";

export const NoCoursesFound = () => {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-6">🔍</div>
      <h3 className="text-2xl font-semibold mb-3 text-gray-200">
        No courses found
      </h3>
      <p className="text-gray-400 max-w-md mx-auto">
        Try adjusting your search terms or filter selection to find the courses
        you&apos;re looking for
      </p>
    </div>
  );
};
