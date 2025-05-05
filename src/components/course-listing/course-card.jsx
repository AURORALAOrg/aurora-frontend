import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function CourseCard({ course, viewMode }) {
  return (
    <Card
      className={`bg-gray-900 border-gray-800 overflow-hidden transition-all hover:border-gray-700 ${
        viewMode === "list" ? "block md:flex flex-row" : ""
      }`}
    >
      <div
        className={`${
          viewMode === "list" ? "hidden sm:block w-1/3 min-w-[200px]" : ""
        }`}
      >
        <div
          className={`relative bg-gray-800 ${
            viewMode === "list" ? "h-full w-full" : "aspect-video"
          }`}
        >
          <img
            src={course.thumbnail || "/api/placeholder/400/320"}
            alt={course.title}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className={`flex flex-col ${viewMode === "list" ? "md:w-2/3" : ""}`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Badge className="bg-gray-700 text-[#00C2CB] border-transparent hover:bg-gray-700">
                {course.subject}
              </Badge>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-[#00C2CB] text-[#00C2CB]" />
              <span className="ml-1 text-sm text-white">{course.rating}</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold mt-2 text-white">
            {course.title}
          </h3>
        </CardHeader>

        <CardContent className="pb-2">
          <p className="text-gray-400 text-sm">{course.description}</p>
          <div className="flex flex-wrap gap-2 mt-3 ">
            <Badge className="bg-gray-700 text-gray-300 border-transparent hover:bg-gray-700">
              {course.level}
            </Badge>
            <Badge className="bg-gray-700 text-gray-300 border-transparent hover:bg-gray-700">
              {course.duration}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="block sm:flex justify-between items-center pt-2 mt-auto">
          <div>
            <p className="text-[#00C2CB] font-bold">${course.price}</p>
            <p className="text-xs text-gray-400">By {course.instructor}</p>
          </div>
          <Button className="bg-[#00C2CB] hover:bg-[#00A8B0] mt-2 sm:mt-0 flex justify-center sm:block">
            Start Learning
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
