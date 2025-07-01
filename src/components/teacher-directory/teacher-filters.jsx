import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import PropTypes from 'prop-types';


const TeacherFilters = ({ filters, setFilters }) => {
  const languageOptions = [
    "All Languages",
    "English",
    "Spanish",
    "French",
    "Mandarin",
    "Japanese",
    "Polish",
    "German",
    "Italian",
    "Portuguese",
    "Korean"
  ];

  const levelOptions = [
    "All Levels",
    "A1",
    "A2",
    "B1",
    "B2",
    "C1",
    "C2"
  ];

  const classTypeOptions = [
    "All Types",
    "1:1 Classes",
    "Group Classes"
  ];

  const availabilityOptions = [
    "Any Time",
    "Available This Week",
    "Weekend Available"
  ];

  const sortOptions = [
    "Highest Rated",
    "Most Classes",
    "Price: Low to High",
    "Price: High to Low"
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const FilterDropdown = ({ label, value, options, filterType }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between bg-[#1f2937] border border-[#374151] text-gray-300 text-sm rounded-md focus:ring-[#00b8d4] focus:border-[#00b8d4] hover:bg-[#374151] transition-colors px-4 py-2 h-auto"
          >
            {value}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-[#1f2937] border border-[#374151] rounded-lg"
          align="start"
        >
          {options.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => handleFilterChange(filterType, option)}
              className="text-gray-300 hover:bg-[#374151] focus:bg-[#374151] cursor-pointer rounded-md mx-1"
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <FilterDropdown
        label="Language"
        value={filters.language}
        options={languageOptions}
        filterType="language"
      />
      <FilterDropdown
        label="Level"
        value={filters.level}
        options={levelOptions}
        filterType="level"
      />
      <FilterDropdown
        label="Class Type"
        value={filters.classType}
        options={classTypeOptions}
        filterType="classType"
      />
      <FilterDropdown
        label="Availability"
        value={filters.availability}
        options={availabilityOptions}
        filterType="availability"
      />
      <FilterDropdown
        label="Sort by"
        value={filters.sortBy}
        options={sortOptions}
        filterType="sortBy"
      />
    </div>
  );
};

TeacherFilters.propTypes = {
  filters: PropTypes.shape({
    language: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    classType: PropTypes.string.isRequired,
    availability: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
};
  
export default TeacherFilters; 