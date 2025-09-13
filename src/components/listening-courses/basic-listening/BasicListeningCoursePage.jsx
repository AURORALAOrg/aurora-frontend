import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Headphones, CheckCircle, Lock, RotateCcw } from 'lucide-react';
import ListeningLessonComponent from './ListeningLessonComponent';
import LessonCompletionModal from './LessonCompletionModal';
import { basicListeningCourse } from './index';
import progressService from '../../../services/progressService';

const BasicListeningCoursePage = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [courseProgress, setCourseProgress] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completionData, setCompletionData] = useState(null);

  // Find the current lesson
  const currentLesson = basicListeningCourse.lessons.find(lesson => lesson.id === lessonId);
  const lessonIndex = basicListeningCourse.lessons.findIndex(lesson => lesson.id === lessonId);

  // Load progress and redirect if needed
  useEffect(() => {
    // Redirect if lessonId is "basic-listening"
    if (lessonId === "basic-listening") {
      navigate("/listening-course", { replace: true });
      return;
    }

    // Load completed lessons from storage
    const completed = progressService.getCompletedLessons();
    setCompletedLessons(new Set(completed));
    
    // Calculate course progress
    const progress = progressService.getCourseProgress(basicListeningCourse.lessons);
    setCourseProgress(progress);
  }, [lessonId, navigate]);

  const handleLessonComplete = (lessonId, score, totalQuestions) => {
    // Mark lesson as completed in storage
    progressService.markLessonCompleted(lessonId);
    progressService.saveLessonScore(lessonId, score, totalQuestions);
    
    // Update local state
    setCompletedLessons(prev => new Set([...prev, lessonId]));
    
    // Update course progress
    const progress = progressService.getCourseProgress(basicListeningCourse.lessons);
    setCourseProgress(progress);

    // Find current lesson index
    const currentLessonIndex = basicListeningCourse.lessons.findIndex(l => l.id === lessonId);
    
    // Show completion modal
    const lesson = basicListeningCourse.lessons.find(l => l.id === lessonId);
    setCompletionData({
      lessonTitle: lesson.title,
      score,
      totalQuestions,
      hasNextLesson: currentLessonIndex < basicListeningCourse.lessons.length - 1
    });
    setShowCompletionModal(true);
  };

  const handleContinueToNextLesson = () => {
    // Find current lesson index
    const currentLessonIndex = basicListeningCourse.lessons.findIndex(l => l.id === lessonId);
    
    // Check if there's a next lesson
    if (currentLessonIndex < basicListeningCourse.lessons.length - 1) {
      const nextLesson = basicListeningCourse.lessons[currentLessonIndex + 1];
      navigate(`/listening-course/${nextLesson.id}`);
    } else {
      // If it's the last lesson, go back to course overview
      navigate('/listening-course');
    }
    
    // Close the modal
    setShowCompletionModal(false);
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all course progress?')) {
      progressService.resetProgress();
      setCompletedLessons(new Set());
      setCourseProgress(0);
    }
  };

  const handleNextLesson = () => {
    const nextIndex = lessonIndex + 1;
    if (nextIndex < basicListeningCourse.lessons.length) {
      const nextLesson = basicListeningCourse.lessons[nextIndex];
      navigate(`/listening-course/${nextLesson.id}`);
    }
  };

  const handlePreviousLesson = () => {
    const prevIndex = lessonIndex - 1;
    if (prevIndex >= 0) {
      const prevLesson = basicListeningCourse.lessons[prevIndex];
      navigate(`/listening-course/${prevLesson.id}`);
    }
  };

  const handleLessonSelect = (lessonId) => {
    navigate(`/listening-course/${lessonId}`);
  };

  const handleBackToCourse = () => {
    navigate('/listening-course');
  };

  // If no lesson is selected or invalid lessonId, show course overview
  if (!lessonId || !currentLesson) {
    return (
      <div className="min-h-screen bg-[#111827] text-neutral-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Course Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-light-blue-1/20 flex items-center justify-center">
                <Headphones className="w-6 h-6 text-light-blue-1" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-neutral-1">{basicListeningCourse.title}</h1>
                <p className="text-neutral-2">{basicListeningCourse.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">{courseProgress}%</div>
                <div className="text-sm text-neutral-3">Completed</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]">
                <div className="text-sm text-neutral-3 mb-1">Level</div>
                <div className="text-neutral-1 font-medium">{basicListeningCourse.level}</div>
              </div>
              <div className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]">
                <div className="text-sm text-neutral-3 mb-1">Estimated Time</div>
                <div className="text-neutral-1 font-medium">{basicListeningCourse.estimatedTime}</div>
              </div>
              <div className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]">
                <div className="text-sm text-neutral-3 mb-1">Total Exercises</div>
                <div className="text-neutral-1 font-medium">{basicListeningCourse.totalExercises}</div>
              </div>
              <div className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]">
                <div className="text-sm text-neutral-3 mb-1">Progress</div>
                <div className="text-neutral-1 font-medium">{courseProgress}%</div>
                <div className="h-2 w-full bg-neutral-1/10 rounded-full overflow-hidden mt-2">
                  <div 
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${courseProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Course Overview */}
          <div className="bg-dark-blue-5 rounded-lg p-6 border border-[#1f2937] mb-8">
            <h2 className="text-xl font-semibold text-neutral-1 mb-4">Course Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-neutral-1 mb-3">Objectives</h3>
                <ul className="space-y-2">
                  {basicListeningCourse.courseOverview.objectives.map((objective, index) => (
                    <li key={index} className="text-sm text-neutral-2 flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-neutral-1 mb-3">Skills You'll Develop</h3>
                <ul className="space-y-2">
                  {basicListeningCourse.courseOverview.skills.map((skill, index) => (
                    <li key={index} className="text-sm text-neutral-2 flex items-start">
                      <BookOpen className="w-4 h-4 text-light-blue-1 mr-2 mt-0.5 flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-neutral-1 mb-3">Prerequisites</h3>
              <ul className="space-y-1">
                {basicListeningCourse.courseOverview.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="text-sm text-neutral-2">• {prerequisite}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lessons List */}
          <div className="bg-dark-blue-5 rounded-lg p-6 border border-[#1f2937]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-neutral-1">Lessons</h2>
              <button
                onClick={handleResetProgress}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Progress
              </button>
            </div>
            
            <div className="space-y-3">
              {basicListeningCourse.lessons.map((lesson, index) => {
                const isCompleted = completedLessons.has(lesson.id);
                const isUnlocked = progressService.isLessonUnlocked(lesson.id, basicListeningCourse.lessons);
                
                return (
                  <div
                    key={lesson.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      isUnlocked
                        ? 'bg-dark-blue-4 border-[#1f2937] hover:bg-dark-blue-3 cursor-pointer'
                        : 'bg-dark-blue-5 border-neutral-700 cursor-not-allowed'
                    }`}
                    onClick={() => isUnlocked && handleLessonSelect(lesson.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                          isCompleted
                            ? 'bg-green-600'
                            : isUnlocked
                            ? 'bg-light-blue-1/20'
                            : 'bg-neutral-600'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : isUnlocked ? (
                            <span className="text-light-blue-1 font-medium">{index + 1}</span>
                          ) : (
                            <Lock className="w-5 h-5 text-neutral-400" />
                          )}
                        </div>
                        <div>
                          <h3 className={`font-medium ${
                            isUnlocked ? 'text-neutral-1' : 'text-neutral-3'
                          }`}>
                            {lesson.title}
                          </h3>
                          <p className={`text-sm ${
                            isUnlocked ? 'text-neutral-2' : 'text-neutral-4'
                          }`}>
                            {lesson.description}
                          </p>
                          {!isUnlocked && (
                            <p className="text-xs text-red-400 mt-1">
                              Complete previous lesson to unlock
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${
                          isUnlocked ? 'text-neutral-2' : 'text-neutral-4'
                        }`}>
                          {lesson.data.estimatedTime}
                        </span>
                        {isUnlocked && (
                          <ArrowRight className="w-4 h-4 text-neutral-3" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show lesson content
  return (
    <>
      <ListeningLessonComponent
        lessonData={currentLesson.data}
        lessonNumber={lessonIndex + 1}
        totalLessons={basicListeningCourse.lessons.length}
        onComplete={(score, totalQuestions) => handleLessonComplete(currentLesson.id, score, totalQuestions)}
        onNext={lessonIndex < basicListeningCourse.lessons.length - 1 ? handleNextLesson : null}
        onPrevious={lessonIndex > 0 ? handlePreviousLesson : null}
        onBackToCourse={handleBackToCourse}
      />
      
      <LessonCompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        lessonTitle={completionData?.lessonTitle}
        score={completionData?.score}
        totalQuestions={completionData?.totalQuestions}
        hasNextLesson={completionData?.hasNextLesson}
        onNextLesson={handleContinueToNextLesson}
        onBackToCourse={handleBackToCourse}
      />
    </>
  );
};

export default BasicListeningCoursePage;
