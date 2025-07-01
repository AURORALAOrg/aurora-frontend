
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { courses } from "@/data/business-english-mock-date";

// Courses Data

function CourseSection() {
  return (
    <>
      {/* Courses Section */}
      <section className="py-20 px-4 bg-[#111827]">
        <p className="text-white font-bold text-2xl lg:text-4xl text-center">
          Our Business English Courses
        </p>
        <div className=" lg:px-40 mt-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => {
              const Icon = course.icon;
              return (
                <Card
                  key={course.title + index}
                  className="bg-slate-800/50 border-none "
                >
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                       <Icon className="w-6 h-6 text-cyan-400" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 text-[18px] font-semibold mb-4 leading-relaxed">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-400 text-base font-semibold">
                        {course.level}
                      </span>
                      
                      <Button
                        size="sm"
                        className="text-cyan-500 text-base  bg-transparent hover:bg-transparent border-none shadow-none font-semibold"
                      >
                        Start Learning →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseSection;
