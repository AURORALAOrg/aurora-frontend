"use client";

export const NoCoursesFound = () => {
  return (
    <div className="text-center py-16">
      <div className="text-center py-16" role="status" aria-live="polite">
        <div className="text-6xl mb-6" aria-hidden="true">
          🔍
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">No courses found</h3>

        <p className="text-gray-400 max-w-md mx-auto">
          Try adjusting your search terms or filter selection to find the
          courses you&apos;re looking for
        </p>
      </div>
    </div>
  );
};
