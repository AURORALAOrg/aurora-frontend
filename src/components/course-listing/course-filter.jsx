"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SUBJECTS, LEVELS, DURATIONS } from "@/utils/data";

export default function CourseFilters({
  filters,
  setFilters,
  toggleFilter,
  clearFilters,
  hasActiveFilters,
}) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6 animate-in fade-in duration-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Filter</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-gray-400 hover:text-white"
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="">
          <h4 className="font-medium mb-2">Subject</h4>
          <div className="space-y-2">
            {SUBJECTS.map((subject) => (
              <div key={subject} className="md:flex items-center">
                <Checkbox
                  id={`subject-${subject}`}
                  checked={filters.subjects.includes(subject)}
                  onCheckedChange={() => toggleFilter("subjects", subject)}
                  className="border-gray-600 data-[state=checked]:bg-[#00C2CB] data-[state=checked]:border-[#00C2CB]"
                />
                <Label
                  htmlFor={`subject-${subject}`}
                  className="ml-2 text-sm font-normal"
                >
                  {subject}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Level</h4>
          <div className="space-y-2">
            {LEVELS.map((level) => (
              <div key={level} className="md:flex items-center">
                <Checkbox
                  id={`level-${level}`}
                  checked={filters.levels.includes(level)}
                  onCheckedChange={() => toggleFilter("levels", level)}
                  className="border-gray-600 data-[state=checked]:bg-[#00C2CB] data-[state=checked]:border-[#00C2CB]"
                />
                <Label
                  htmlFor={`level-${level}`}
                  className="ml-2 text-sm font-normal"
                >
                  {level}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Duration</h4>
          <div className="space-y-2">
            {DURATIONS.map((duration) => (
              <div key={duration} className="md:flex items-center">
                <Checkbox
                  id={`duration-${duration}`}
                  checked={filters.durations.includes(duration)}
                  onCheckedChange={() => toggleFilter("durations", duration)}
                  className="border-gray-600 data-[state=checked]:bg-[#00C2CB] data-[state=checked]:border-[#00C2CB]"
                />
                <Label
                  htmlFor={`duration-${duration}`}
                  className="ml-2 text-sm font-normal"
                >
                  {duration}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <h4 className="font-medium">Price Range</h4>
              <span className="text-sm text-gray-400">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </span>
            </div>
            <Slider
              defaultValue={[0, 100]}
              value={filters.priceRange}
              min={0}
              max={100}
              step={5}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, priceRange: value }))
              }
              className="my-4 bg-gray-700 accent-teal-400 rounded-full"
              aria-label="Price range"
              aria-valuetext={`$${filters.priceRange[0]} to $${filters.priceRange[1]}`}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <h4 className="font-medium">Minimum Rating</h4>
              <span className="text-sm text-gray-400">
                {filters.minRating} stars & up
              </span>
            </div>
            <Slider
              defaultValue={[0]}
              value={[filters.minRating]}
              min={0}
              max={5}
              step={0.5}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, minRating: value[0] }))
              }
              className="my-4"
              aria-label="Minimum rating filter"
              aria-valuetext={`${filters.minRating} stars or higher`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
