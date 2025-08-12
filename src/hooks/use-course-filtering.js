import { useState, useMemo } from "react";
import { LEARNING_AREAS } from "@/data/learning-areas";

export const useCourseFiltering = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");

  // Filter learning areas based on search and selection
  const filteredAreas = useMemo(() => {
    return Object.entries(LEARNING_AREAS).filter(([areaKey, areaData]) => {
      if (selectedArea !== "all" && areaKey !== selectedArea) return false;

      if (searchQuery) {
        const matchesArea =
          areaData.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          areaData.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCourses = areaData.courses.some(
          (course) =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return matchesArea || matchesCourses;
      }

      return true;
    });
  }, [searchQuery, selectedArea]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedArea("all");
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedArea,
    setSelectedArea,
    filteredAreas,
    clearFilters,
  };
};
