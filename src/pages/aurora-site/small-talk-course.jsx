import { useState } from "react";
import { ArrowLeft, BookOpen, CheckCircle, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { smallTalkBasicsCourse } from "@/components/cultural-courses/small-talk-basics";
import LessonComponent from "@/components/cultural-courses/small-talk-basics/LessonComponent";

const SmallTalkCoursePage = () => {
  const [currentLesson, setCurrentLesson] = useState(-1);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const handleLessonComplete = (lessonIndex = currentLesson) => {
    const idx = typeof lessonIndex === "number" ? lessonIndex : currentLesson;
    setCompletedLessons((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
  };

  const handleNextLesson = () => {
    const lastIndex = smallTalkBasicsCourse.lessons.length - 1;
    if (currentLesson === -1) {
      setCurrentLesson(0);
      return;
    }
    handleLessonComplete(currentLesson);
    if (currentLesson < lastIndex) {
      setCurrentLesson(currentLesson + 1);
    } else {
      handleCourseComplete();
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const handleCourseComplete = () => {
    setCourseCompleted(true);
    handleLessonComplete(currentLesson);
  };

  const getProgressPercentage = () => {
    const total = smallTalkBasicsCourse.lessons.length || 1;
    const uniqueCompleted = new Set(completedLessons).size;
    return Math.round((uniqueCompleted / total) * 100);
  };

  if (courseCompleted) {
    return (
      <div className="min-h-screen bg-[#111827] text-neutral-1 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-8 mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-400 mb-4">
              Course Completed!
            </h1>
            <p className="text-neutral-2 mb-6">
              Congratulations! You have successfully completed the Small Talk
              Basics course.
            </p>
            <div className="bg-dark-blue-5 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-neutral-1 mb-4">
                What you&apos;ve learned:
              </h2>
              <ul className="text-left space-y-2 text-neutral-2">
                {smallTalkBasicsCourse.courseOverview.objectives.map(
                  (objective, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      {objective}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="space-x-4">
              <Link
                to="/cultural-assessment"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cultural Assessments
              </Link>
              <button
                onClick={() => {
                  setCourseCompleted(false);
                  setCurrentLesson(-1);
                  setCompletedLessons([]);
                }}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                style={{ backgroundColor: "#059669", color: "white" }}
              >
                <Play className="w-4 h-4 mr-2" />
                Restart Course
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentLesson === -1) {
    return (
      <div className="min-h-screen bg-[#111827] text-neutral-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <Link
              to="/cultural-assessment"
              className="inline-flex items-center text-neutral-2 hover:text-neutral-1 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Cultural Assessments
            </Link>
          </div>

          <div className="bg-dark-blue-4 rounded-lg overflow-hidden mb-8">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-neutral-1 mb-2">
                {smallTalkBasicsCourse.title}
              </h1>
              <p className="text-neutral-2 mb-6">
                {smallTalkBasicsCourse.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-dark-blue-3 px-4 py-2 rounded-md">
                  <span className="text-sm text-neutral-2">Level</span>
                  <p className="text-neutral-1 font-medium">
                    {smallTalkBasicsCourse.level}
                  </p>
                </div>
                <div className="bg-dark-blue-3 px-4 py-2 rounded-md">
                  <span className="text-sm text-neutral-2">Estimated time</span>
                  <p className="text-neutral-1 font-medium">
                    {smallTalkBasicsCourse.estimatedTime}
                  </p>
                </div>
                <div className="bg-dark-blue-3 px-4 py-2 rounded-md">
                  <span className="text-sm text-neutral-2">Lessons</span>
                  <p className="text-neutral-1 font-medium">
                    {smallTalkBasicsCourse.courseOverview.stats.lessons}
                  </p>
                </div>
                <div className="bg-dark-blue-3 px-4 py-2 rounded-md">
                  <span className="text-sm text-neutral-2">Exercises</span>
                  <p className="text-neutral-1 font-medium">
                    {smallTalkBasicsCourse.courseOverview.stats.exercises}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-neutral-1 mb-2">
                    About this course
                  </h2>
                  <p className="text-neutral-2">
                    {smallTalkBasicsCourse.courseOverview.aboutCourse}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-neutral-1 mb-2">
                    Who is this for?
                  </h2>
                  <ul className="list-disc pl-5 text-neutral-2 space-y-1">
                    {smallTalkBasicsCourse.courseOverview.whoIsThisFor.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-neutral-1 mb-2">
                    What you&apos;ll learn
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {smallTalkBasicsCourse.courseOverview.whatYouWillLearn.map(
                      (item, index) => (
                        <li
                          key={index}
                          className="flex items-start text-neutral-2"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {smallTalkBasicsCourse.courseOverview.prerequisites.length >
                  0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-1 mb-2">
                      Prerequisites
                    </h2>
                    <ul className="list-disc pl-5 text-neutral-2 space-y-1">
                      {smallTalkBasicsCourse.courseOverview.prerequisites.map(
                        (item, index) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <button
                  onClick={handleNextLesson}
                  className="w-full py-3 bg-light-blue-1 text-white font-medium rounded-lg hover:bg-light-blue-2 transition-colors flex items-center justify-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Course
                </button>
              </div>
            </div>

            <div className="border-t border-[#1f2937] p-6">
              <h2 className="text-xl font-semibold text-neutral-1 mb-4">
                Course Content
              </h2>
              <div className="space-y-3">
                {smallTalkBasicsCourse.lessons.map((lesson, index) => {
                  const isCompleted = completedLessons.includes(index);
                  const isLocked =
                    !lesson.unlocked && !completedLessons.includes(index - 1);

                  return (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        isCompleted
                          ? "bg-green-900/20 border border-green-500/30"
                          : "bg-dark-blue-5 border border-[#1f2937]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          ) : (
                            <div
                              className={`w-5 h-5 rounded-full border ${
                                isLocked
                                  ? "border-neutral-3"
                                  : "border-light-blue-1"
                              } mr-3`}
                            ></div>
                          )}
                          <div>
                            <h3
                              className={`font-medium ${
                                isLocked ? "text-neutral-3" : "text-neutral-1"
                              }`}
                            >
                              {lesson.title}
                            </h3>
                            <p
                              className={`text-sm ${
                                isLocked ? "text-neutral-3" : "text-neutral-2"
                              }`}
                            >
                              {lesson.description}
                            </p>
                          </div>
                        </div>
                        {isLocked ? (
                          <BookOpen className="w-5 h-5 text-neutral-3" />
                        ) : (
                          <button
                            onClick={() => setCurrentLesson(index)}
                            className="text-light-blue-1 hover:text-light-blue-2 transition-colors text-sm"
                          >
                            {isCompleted ? "Review" : "Start"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentLessonData =
    smallTalkBasicsCourse.lessons[currentLesson]?.data || {};

  return (
    <div className="min-h-screen bg-[#111827] text-neutral-1 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <button
              onClick={() => setCurrentLesson(-1)}
              className="inline-flex items-center text-neutral-2 hover:text-neutral-1 transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Course Overview
            </button>
            <h1 className="text-2xl font-bold text-neutral-1">
              {smallTalkBasicsCourse.title}
            </h1>
          </div>
          <div className="text-right">
            <div className="text-sm text-neutral-2 mb-1">Your progress</div>
            <div className="flex items-center">
              <div className="w-32 h-2 bg-neutral-1/10 rounded-full overflow-hidden mr-2">
                <div
                  className="h-full bg-light-blue-1"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              <span className="text-sm text-neutral-2">
                {getProgressPercentage()}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-dark-blue-4 rounded-lg p-6">
          <LessonComponent
            lessonData={currentLessonData}
            onComplete={handleCourseComplete}
            onNext={handleNextLesson}
            onPrevious={handlePreviousLesson}
            lessonNumber={currentLesson + 1}
            totalLessons={smallTalkBasicsCourse.lessons.length}
          />
        </div>
      </div>
    </div>
  );
};

export default SmallTalkCoursePage;
