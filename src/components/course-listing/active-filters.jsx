"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ActiveFilters({
  searchQuery,
  setSearchQuery,
  filters,
  toggleFilter,
  setFilters,
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {searchQuery && (
        <Badge className="bg-gray-700 hover:bg-transparent border-transparent text-white border-gray-700 flex items-center gap-1">
          Search: {searchQuery}
          <button
            className="h-4 w-4 flex justify-center items-center p-0 bg-transparent hover:bg-transparent border-none focus:outline-none focus:ring-0 shadow-none"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search query"
          >
            <X className="h-4 w-4" />
          </button>
        </Badge>
      )}

      {filters.subjects.map((subject) => (
        <Button
          key={subject}
          onClick={() => toggleFilter("subjects", subject)}
          className="bg-gray-800 hover:bg-gray-800 text-white border-transparent flex items-center rounded-full outline-none"
        >
          {subject}
          <X className="h-3 w-3" />
        </Button>
      ))}

      {filters.levels.map((level) => (
        <Badge
          key={level}
          variant="outline"
          className="bg-gray-800 text-white border-gray-700 flex items-center gap-1"
        >
          {level}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => toggleFilter("levels", level)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}

      {filters.durations.map((duration) => (
        <Badge
          key={duration}
          variant="outline"
          className="bg-gray-800 text-white border-gray-700 flex items-center gap-1"
        >
          {duration}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => toggleFilter("durations", duration)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}

      {(filters.priceRange[0] > 0 || filters.priceRange[1] < 100) && (
        <Badge
          variant="outline"
          className="bg-gray-800 text-white border-gray-700 flex items-center gap-1"
        >
          ${filters.priceRange[0]} - ${filters.priceRange[1]}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() =>
              setFilters((prev) => ({ ...prev, priceRange: [0, 100] }))
            }
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {filters.minRating > 0 && (
        <Badge
          variant="outline"
          className="bg-gray-800 text-white border-gray-700 flex items-center gap-1"
        >
          {filters.minRating}+ Stars
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => setFilters((prev) => ({ ...prev, minRating: 0 }))}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
    </div>
  );
}
