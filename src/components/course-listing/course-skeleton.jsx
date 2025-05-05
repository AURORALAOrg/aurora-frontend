import { Skeleton } from "@/components/ui/skeleton";

export default function CourseSkeletons({ viewMode = "grid", count = 6 }) {
  return (
    <div
      className={`grid ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1"
      } gap-6`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
          <Skeleton className="h-48 w-full bg-gray-800" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-6 w-3/4 bg-gray-800" />
            <Skeleton className="h-4 w-full bg-gray-800" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/4 bg-gray-800" />
              <Skeleton className="h-4 w-1/4 bg-gray-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
