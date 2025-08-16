import React, { useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle, Play, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import presentSimpleCourse from '@/components/grammar-courses/present-simple';
import LessonComponent from '@/components/grammar-courses/present-simple/LessonComponent';

const PresentSimpleCoursePage = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const handleLessonComplete = (lessonIndex) => {
    if (!completedLessons.includes(lessonIndex)) {
      setCompletedLessons([...completedLessons, lessonIndex]);
    }
  };

  const handleNextLesson = () => {
    if (currentLesson < presentSimpleCourse.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
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
    return Math.round((completedLessons.length / presentSimpleCourse.lessons.length) * 100);
  };

  if (courseCompleted) {
    return (
      <div className="min-h-screen bg-[#111827] text-neutral-1 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-8 mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-400 mb-4">Course Completed!</h1>
            <p className="text-neutral-2 mb-6">
              Congratulations! You have successfully completed the Present Simple Tense course.
            </p>
            <div className="bg-dark-blue-5 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-neutral-1 mb-4">What you've learned:</h2>
              <ul className="text-left space-y-2 text-neutral-2">
                {presentSimpleCourse.courseOverview.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-x-4">
              <Link
                to="/grammar"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Grammar
              </Link>
              <button
                onClick={() => {
                  setCourseCompleted(false);
                  setCurrentLesson(0);
                  setCompletedLessons([]);
                }}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                style={{ backgroundColor: '#059669', color: 'white' }}
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
              to="/grammar"
              className="flex items-center text-neutral-2 hover:text-neutral-1 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Grammar
            </Link>
            <div className="text-sm text-neutral-2">
              Progress: {getProgressPercentage()}%
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{presentSimpleCourse.title}</h1>
          <p className="text-neutral-2 mb-4">{presentSimpleCourse.description}</p>
          
          {/* Course Progress */}
          <div className="flex items-center space-x-4 text-sm text-neutral-2">
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              {presentSimpleCourse.lessons.length} lessons
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              {completedLessons.length} completed
            </div>
            <div className="flex items-center">
              <span className="mr-2">⏱️</span>
              {presentSimpleCourse.estimatedTime}
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Navigation */}
      <div className="bg-dark-blue-4 border-b border-[#1f2937] p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-2 overflow-x-auto">
            {presentSimpleCourse.lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLesson(index)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  currentLesson === index
                    ? 'bg-light-blue-1 text-white'
                    : completedLessons.includes(index)
                    ? 'bg-green-600 text-white'
                    : 'bg-dark-blue-5 text-neutral-2 hover:text-neutral-1'
                }`}
              >
                {completedLessons.includes(index) ? (
                  <CheckCircle className="w-4 h-4 mr-2" />
                ) : (
                  <span className="w-4 h-4 mr-2 text-center">{index + 1}</span>
                )}
                {lesson.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <LessonComponent
            lessonData={presentSimpleCourse.lessons[currentLesson].data}
            lessonNumber={currentLesson + 1}
            totalLessons={presentSimpleCourse.lessons.length}
            onComplete={handleCourseComplete}
            onNext={handleNextLesson}
            onPrevious={handlePreviousLesson}
          />
        </div>
      </div>

      {/* Course Overview Sidebar */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 w-64 bg-dark-blue-5 rounded-lg border border-[#1f2937] p-4 hidden lg:block">
        <h3 className="font-semibold text-neutral-1 mb-4">Course Overview</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-neutral-2 mb-2">Objectives</h4>
            <ul className="text-xs text-neutral-3 space-y-1">
              {presentSimpleCourse.courseOverview.objectives.slice(0, 3).map((objective, index) => (
                <li key={index}>• {objective}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-neutral-2 mb-2">Skills</h4>
            <div className="flex flex-wrap gap-1">
              {presentSimpleCourse.courseOverview.skills.map((skill, index) => (
                <span key={index} className="text-xs bg-dark-blue-4 text-neutral-2 px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-neutral-2 mb-2">Stats</h4>
            <div className="text-xs text-neutral-3 space-y-1">
              <div>• {presentSimpleCourse.totalExercises} exercises</div>
              <div>• {presentSimpleCourse.totalQuestions} questions</div>
              <div>• {presentSimpleCourse.lessons.length} lessons</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentSimpleCoursePage; 