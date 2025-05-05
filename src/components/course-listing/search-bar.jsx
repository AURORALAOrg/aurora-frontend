"use client";

import { Search, Filter, Grid, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  hasActiveFilters,
  showFilters,
  setShowFilters,
  sortOption,
  setSortOption,
  viewMode,
  setViewMode,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-gray-900 border-gray-700 text-white"
        />
      </div>

      <div className="flex gap-2">
        <Button
          className="bg-[#00B8D4] hover:bg-[#00B8D4]/90 text-white border-transparent hover:border-transparent"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge className="ml-2 bg-[#00C2CB]">
              {/* Count of active filters */}
            </Badge>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-[#00B8D4] hover:bg-[#00B8D4]/90 text-white border-transparent hover:border-transparent">
              Sort by
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
            <DropdownMenuRadioGroup
              value={sortOption}
              onValueChange={setSortOption}
            >
              <DropdownMenuRadioItem value="featured">
                Featured
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price-low">
                Price: Low to High
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price-high">
                Price: High to Low
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="rating">
                Highest Rated
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="newest">
                Newest
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden sm:flex border border-gray-700 rounded-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={`${
              viewMode === "grid" ? "bg-gray-800" : ""
            } text-white hover:bg-gray-800`}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("list")}
            className={`${
              viewMode === "list" ? "bg-gray-800" : ""
            } text-white hover:bg-gray-800`}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
