"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pagination({ currentPage, totalPages, goToPage }) {
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Logic to show current page, previous and next pages
    // Always show first and last page, with ellipsis if needed
    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always add first page
      pageNumbers.push(1);

      if (currentPage <= 3) {
        // Near the start
        pageNumbers.push(2, 3, 4);
        pageNumbers.push("...");
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push("...");
        pageNumbers.push(totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        // In the middle
        pageNumbers.push("...");
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
        pageNumbers.push("...");
      }

      // Always add last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
          className="border-gray-700 text-white bg-gray-700 hover:bg-gray-800"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageNumbers().map((pageNum, index) =>
          pageNum === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center px-2 text-gray-400"
            >
              ...
            </span>
          ) : (
            <Button
              key={`page-${pageNum}`}
              variant="outline"
              size="sm"
              className={`${
                currentPage === pageNum
                  ? "bg-gray-800 text-white"
                  : "bg-transparent text-white hover:bg-gray-800"
              } border-gray-700`}
              onClick={() => goToPage(pageNum)}
            >
              {pageNum}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => goToPage(currentPage + 1)}
          className="border-gray-700 text-white bg-gray-700 hover:bg-gray-800"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
