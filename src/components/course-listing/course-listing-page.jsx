"use client";

import { useState, useEffect } from "react";
import { COURSES } from "@/utils/data";
import SearchBar from "./search-bar";
import ActiveFilters from "./active-filters";
import Pagination from "./pagination";
import { useDebounce } from "@/hooks/use-debounce";
import { useCoursesFilter } from "@/hooks/use-courses-filter";
import CourseFilters from "./course-filter";
import CourseList from "./course-list";

// Number of courses to display per page
const ITEMS_PER_PAGE = 6;

export default function CourseListingPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    subjects: [],
    levels: [],
    durations: [],
    priceRange: [0, 100],
    minRating: 0,
  });
  const [sortOption, setSortOption] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get filtered courses using custom hook
  const { filteredCourses, hasActiveFilters, clearFilters, toggleFilter } =
    useCoursesFilter({
      courses: COURSES,
      filters,
      setFilters,
      debouncedSearchQuery,
      searchQuery,
      sortOption,
    });

  // Calculate pagination values
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, filters, sortOption]);

  // Get current page courses
  const getCurrentCourses = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  // Show loading state when filter parameters change
  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery || sortOption) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [debouncedSearchQuery, sortOption, searchQuery]);

  // Pagination navigation
  const goToPage = (page) => {
    setCurrentPage(page);
    // Scroll to top of results when changing page
    window.scrollTo({
      top: document.getElementById("course-results").offsetTop - 100,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#0F1624] text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Explore Our Courses</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find the perfect course to match your learning goals
          </p>
        </div>

        <div className="mb-8">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            hasActiveFilters={hasActiveFilters}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            sortOption={sortOption}
            setSortOption={setSortOption}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {showFilters && (
            <CourseFilters
              filters={filters}
              setFilters={setFilters}
              toggleFilter={toggleFilter}
              clearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          )}

          {hasActiveFilters && (
            <ActiveFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filters={filters}
              toggleFilter={toggleFilter}
              setFilters={setFilters}
            />
          )}
        </div>

        <div id="course-results">
          <CourseList
            isLoading={isLoading}
            filteredCourses={filteredCourses}
            currentCourses={getCurrentCourses()}
            viewMode={viewMode}
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            clearFilters={clearFilters}
          />

          {filteredCourses.length > 0 && !isLoading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
            />
          )}
        </div>
      </main>
    </div>
  );
}
