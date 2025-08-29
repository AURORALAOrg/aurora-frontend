import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Map as MapIcon, MessageCircle, Navigation, Car } from "lucide-react";
import { directionsCourseData, courseNavigation } from "@/data/directions-course-data";
import LessonContent from "./lesson-content";
import DirectionExercise from "./direction-exercise";
import { useToast } from "@/context/ToastContext";

export default function DirectionsCourse() {
  const { showToast } = useToast();
  const [currentLesson, setCurrentLesson] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [lessonProgress, setLessonProgress] = useState({});
  const [showOverview, setShowOverview] = useState(true);
  const timeoutIds = useRef([]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutIds.current.forEach(id => clearTimeout(id));
    };
  }, []);

  const lessonIcons = {
    1: MapIcon,
    2: MessageCircle, 
    3: Navigation,
    4: Car
  };

  const handleLessonSelect = (lessonId) => {
    setCurrentLesson(lessonId);
    setCurrentExercise(0);
    setShowOverview(false);
  };

  const handleExerciseComplete = (exerciseId, score) => {
    // Track progress - basic for now, could expand later
    setLessonProgress(prev => ({
      ...prev,
      [`lesson${currentLesson}_exercise${exerciseId}`]: score
    }));
    
    // TODO: Maybe save to localStorage or send to backend?
    console.log('Exercise completed:', exerciseId, 'Score:', score); // Debug for now
  };

  const goToNextExercise = () => {
    const currentLessonData = directionsCourseData[`lesson${currentLesson}`];
    if (currentExercise < currentLessonData.exercises.length) {
      setCurrentExercise(prev => prev + 1);
    } else {
      // TODO: Better completion modal maybe? This toast thing works for now
      showToast({
        title: "Lesson Complete!",
        description: `Done with lesson ${currentLesson}`,
        type: "success"
      });
      
      // Quick hack - auto advance after 2 seconds
      if (currentLesson < courseNavigation.totalLessons) {
        const timeoutId = setTimeout(() => {
          setCurrentLesson(prev => prev + 1);
          setCurrentExercise(0);
        }, 2000); // FIXME: Should this timing be configurable?
        timeoutIds.current.push(timeoutId);
      } else {
        const timeoutId = setTimeout(() => {
          showToast({
            title: "Course Complete!", 
            description: "Nice work!",
            type: "success"
          });
          setShowOverview(true);
        }, 2000);
        timeoutIds.current.push(timeoutId);
      }
    }
  };

  const goToPrevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(prev => prev - 1);
    }
  };

  if (showOverview) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-[#0d1117] min-h-screen">
        <div className="bg-[#2f3a4b] rounded-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00b8d4] text-white rounded-full mb-4">
              <Navigation size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {courseNavigation.title}
            </h1>
            <p className="text-lg text-[#D1D5DB]">
              {courseNavigation.description}
            </p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <span className="bg-dark-blue-5 border border-light-blue-2 text-light-blue-2 px-3 py-1 rounded-full text-sm font-medium">
                {courseNavigation.level}
              </span>
              <span className="text-neutral-5">
                {courseNavigation.totalLessons} lessons
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courseNavigation.lessons.map((lesson) => {
              const IconComponent = lessonIcons[lesson.id];
              return (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => handleLessonSelect(lesson.id)}
                  className="bg-dark-blue-5 border border-dark-blue-4 text-white p-6 rounded-lg cursor-pointer hover:border-light-blue-2 transform hover:scale-105 transition-all duration-200 w-full text-left"
                  aria-label={`Start ${lesson.title}`}
                >
                  <div className="flex items-center mb-4">
                    <IconComponent size={24} className="mr-3 text-light-blue-2" />
                    <span className="bg-[#00b8d4] text-dark-blue-2 px-2 py-1 rounded text-sm font-semibold">
                      Lesson {lesson.id}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
                  <div className="flex justify-between items-center text-neutral-5">
                    <span>{lesson.exercises} exercises</span>
                    <span>{lesson.duration}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 bg-dark-blue-5 border border-dark-blue-4 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">What You'll Learn:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-light-blue-2 rounded-full mt-2 mr-3"></div>
                <span className="text-[#D1D5DB]">Direction vocabulary and compass basics</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-light-blue-2 rounded-full mt-2 mr-3"></div>
                <span className="text-[#D1D5DB]">Polite conversation starters</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-light-blue-2 rounded-full mt-2 mr-3"></div>
                <span className="text-[#D1D5DB]">Understanding complex directions</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-light-blue-2 rounded-full mt-2 mr-3"></div>
                <span className="text-[#D1D5DB]">Transportation options and emergency help</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentLessonData = directionsCourseData[`lesson${currentLesson}`];
  const exerciseIndex = Math.max(0, currentExercise - 1);
  const currentExerciseData = currentExercise > 0 ? currentLessonData.exercises[exerciseIndex] : null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#0d1117] min-h-screen">
      <div className="bg-[#2f3a4b] rounded-xl">
        {/* Header */}
        <div className="bg-dark-blue-5 border-b border-dark-blue-4 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowOverview(true)}
              className="flex items-center text-neutral-5 hover:text-light-blue-2 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Overview
            </button>
            <div className="text-center">
              <h2 className="text-xl font-bold">{currentLessonData.title}</h2>
              <p className="text-neutral-5">{currentLessonData.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-neutral-5">Exercise</div>
              <div className="text-lg font-bold text-light-blue-2">
                {currentExercise === 0 ? "Intro" : `${currentExercise} / ${currentLessonData.exercises.length}`}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 bg-dark-blue-4 rounded-full h-2">
            <div 
              className="bg-light-blue-2 rounded-full h-2 transition-all duration-300"
              style={{ 
                width: `${(currentExercise / (currentLessonData.exercises.length + 1)) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentExercise === 0 && (
            <LessonContent 
              lesson={currentLessonData}
              onContinue={() => setCurrentExercise(1)}
            />
          )}
          
          {currentExercise > 0 && (
            <DirectionExercise
              exercise={currentExerciseData}
              onComplete={handleExerciseComplete}
              onNext={goToNextExercise}
              onPrevious={goToPrevExercise}
              canGoBack={currentExercise > 1}
              canGoForward={currentExercise < currentLessonData.exercises.length}
            />
          )}
        </div>
      </div>
    </div>
  );
}