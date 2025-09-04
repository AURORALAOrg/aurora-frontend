import { useState } from "react";
import { ArrowLeft, BookOpen, CheckCircle, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { socialMediaCommunicationCourse } from "@/components/cultural-courses/social-media-communication";
import LessonComponent from "@/components/cultural-courses/social-media-communication/LessonComponent";

const SocialMediaCoursePage = () => {
  const [currentLesson, setCurrentLesson] = useState(-1);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const handleLessonComplete = (lessonIndex = currentLesson) => {
    const idx = typeof lessonIndex === "number" ? lessonIndex : currentLesson;
    setCompletedLessons((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
  };

  const handleNextLesson = () => {
    const lastIndex = socialMediaCommunicationCourse.lessons.length - 1;
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
    const total = socialMediaCommunicationCourse.lessons.length || 1;
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
              Congratulations! You have successfully completed the Social Media
              & Modern Communication course.
            </p>
            <div className="bg-dark-blue-5 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-neutral-1 mb-4">
                What you&apos;ve learned:
              </h2>
              <ul className="text-left space-y-2 text-neutral-2">
                {socialMediaCommunicationCourse.courseOverview.objectives.map(
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

  return (
    <div className="min-h-screen bg-[#111827] text-neutral-1">
      {/* Header */}
      <div className="bg-dark-blue-5 border-b border-[#1f2937] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/cultural-assessment"
              className="flex items-center text-neutral-2 hover:text-neutral-1 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cultural Assessments
            </Link>
            <div className="text-sm text-neutral-2">
              <span className="font-medium text-neutral-1">
                {getProgressPercentage()}%
              </span>{" "}
              Complete
            </div>
          </div>
          <h1 className="text-2xl font-bold text-neutral-1 mb-1">
            {socialMediaCommunicationCourse.title}
          </h1>
          <p className="text-neutral-2 mb-4">
            {socialMediaCommunicationCourse.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="bg-dark-blue-4 px-3 py-1 rounded text-xs text-neutral-2">
              <span className="font-medium text-neutral-1">Level:</span>{" "}
              {socialMediaCommunicationCourse.level}
            </div>
            <div className="bg-dark-blue-4 px-3 py-1 rounded text-xs text-neutral-2">
              <span className="font-medium text-neutral-1">
                Estimated time:
              </span>{" "}
              {socialMediaCommunicationCourse.estimatedTime}
            </div>
            <div className="bg-dark-blue-4 px-3 py-1 rounded text-xs text-neutral-2">
              <span className="font-medium text-neutral-1">Lessons:</span>{" "}
              {socialMediaCommunicationCourse.lessons.length}
            </div>
            <div className="bg-dark-blue-4 px-3 py-1 rounded text-xs text-neutral-2">
              <span className="font-medium text-neutral-1">Exercises:</span>{" "}
              {socialMediaCommunicationCourse.totalExercises}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-light-blue-1 flex items-center justify-center mr-3 flex-shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-neutral-1">
                  {currentLesson === -1
                    ? "Course Overview"
                    : socialMediaCommunicationCourse.lessons[currentLesson]
                        .title}
                </h2>
                <span className="text-xs text-neutral-2">
                  {currentLesson === -1 ? "0" : currentLesson + 1}/
                  {socialMediaCommunicationCourse.lessons.length}
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full bg-neutral-1/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-light-blue-1"
                  style={{
                    width: `${Math.max(
                      0,
                      ((currentLesson + 1) /
                        socialMediaCommunicationCourse.lessons.length) *
                        100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {currentLesson === -1 ? (
          <div className="bg-dark-blue-5 border border-[#1f2937] rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-neutral-1 mb-4">
              Course Overview
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-neutral-1 mb-2">
                  Learning Objectives
                </h3>
                <ul className="space-y-1 text-sm text-neutral-2">
                  {socialMediaCommunicationCourse.courseOverview.objectives.map(
                    (objective, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-light-blue-1 mr-2">•</span>{" "}
                        {objective}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-neutral-1 mb-2">
                  Skills You&apos;ll Gain
                </h3>
                <ul className="space-y-1 text-sm text-neutral-2">
                  {socialMediaCommunicationCourse.courseOverview.skills.map(
                    (skill, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-light-blue-1 mr-2">•</span>{" "}
                        {skill}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-neutral-1 mb-2">
                  Prerequisites
                </h3>
                <ul className="space-y-1 text-sm text-neutral-2">
                  {socialMediaCommunicationCourse.courseOverview.prerequisites.map(
                    (prereq, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-light-blue-1 mr-2">•</span>{" "}
                        {prereq}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setCurrentLesson(0)}
                className="px-6 py-3 bg-light-blue-1 text-white rounded-lg hover:bg-light-blue-2 transition-colors"
              >
                Start First Lesson
              </button>
            </div>
          </div>
        ) : (
          <LessonComponent
            lessonData={
              socialMediaCommunicationCourse.lessons[currentLesson].data
            }
            onComplete={handleCourseComplete}
            onNext={handleNextLesson}
            onPrevious={handlePreviousLesson}
            lessonNumber={currentLesson + 1}
            totalLessons={socialMediaCommunicationCourse.lessons.length}
          />
        )}
      </div>
    </div>
  );
};

export default SocialMediaCoursePage;
