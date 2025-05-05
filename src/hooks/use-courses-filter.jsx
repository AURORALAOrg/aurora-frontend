"use client";

import { useMemo } from "react";

export function useCoursesFilter({
  courses,
  filters,
  setFilters,
  debouncedSearchQuery,
  searchQuery,
  sortOption,
}) {
  // Filter courses based on search query and filters
  const filteredCourses = useMemo(() => {
    const filtered = courses.filter((course) => {
      if (
        debouncedSearchQuery &&
        !course.title
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) &&
        !course.description
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.subjects.length > 0 &&
        !filters.subjects.includes(course.subject)
      ) {
        return false;
      }

      if (filters.levels.length > 0 && !filters.levels.includes(course.level)) {
        return false;
      }

      if (
        filters.durations.length > 0 &&
        !filters.durations.includes(course.duration)
      ) {
        return false;
      }

      if (
        course.price < filters.priceRange[0] ||
        course.price > filters.priceRange[1]
      ) {
        return false;
      }

      if (course.rating < filters.minRating) {
        return false;
      }

      return true;
    });

    // Sort filtered courses
    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        default: // featured
          return 0;
      }
    });
  }, [courses, debouncedSearchQuery, filters, sortOption]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.subjects.length > 0 ||
      filters.levels.length > 0 ||
      filters.durations.length > 0 ||
      filters.priceRange[0] > 0 ||
      filters.priceRange[1] < 100 ||
      filters.minRating > 0 ||
      searchQuery !== ""
    );
  }, [filters, searchQuery]);

  // Toggle filter function
  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const current = prev[type];
      return {
        ...prev,
        [type]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      subjects: [],
      levels: [],
      durations: [],
      priceRange: [0, 100],
      minRating: 0,
    });
  };

  return {
    filteredCourses,
    hasActiveFilters,
    toggleFilter,
    clearFilters,
  };
}
