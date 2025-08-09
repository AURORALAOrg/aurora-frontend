import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  BookOpen,
  Globe,
  Headphones,
  ChevronRight,
  Play,
  CheckCircle,
  Lock,
  X,
} from "lucide-react";
import ProgressCircle from "@/components/ui/progress-circle";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CourseNavigation = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const closeButtonRef = useRef(null);

  // Handle keyboard events for modal accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedCourse && e.key === "Escape") {
        setSelectedCourse(null);
      }
    };

    if (selectedCourse) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus the close button when modal opens
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCourse]);

  // Course data - TODO: move to API later
  const courseAreas = [
    {
      id: "basic-conversation",
      title: "Basic Conversation",
      description:
        "Learn everyday phrases and expressions for daily communication",
      icon: <MessageCircle className="w-8 h-8" />,
      progress: 75,
      color: "from-blue-500 to-blue-600",
      lessons: [
        {
          id: 1,
          title: "Greetings and Introductions",
          completed: true,
          duration: "15 min",
        },
        {
          id: 2,
          title: "Asking for Directions",
          completed: true,
          duration: "20 min",
        },
        { id: 3, title: "Ordering Food", completed: true, duration: "18 min" },
        { id: 4, title: "Making Plans", completed: false, duration: "25 min" },
        {
          id: 5,
          title: "Shopping Conversations",
          completed: false,
          duration: "22 min",
        },
        {
          id: 6,
          title: "Emergency Situations",
          completed: false,
          duration: "30 min",
        },
      ],
    },
    {
      id: "grammar-foundations",
      title: "Grammar Foundations",
      description: "Master the essential building blocks of English grammar",
      icon: <BookOpen className="w-8 h-8" />,
      progress: 45,
      color: "from-green-500 to-green-600",
      lessons: [
        {
          id: 1,
          title: "Parts of Speech",
          completed: true,
          duration: "20 min",
        },
        { id: 2, title: "Present Tense", completed: true, duration: "25 min" },
        { id: 3, title: "Past Tense", completed: false, duration: "30 min" },
        { id: 4, title: "Future Tense", completed: false, duration: "28 min" },
        {
          id: 5,
          title: "Articles and Determiners",
          completed: false,
          duration: "22 min",
        },
        { id: 6, title: "Prepositions", completed: false, duration: "35 min" },
      ],
    },
    {
      id: "cultural-insights",
      title: "Cultural Insights",
      description: "Understand cultural context while learning language",
      icon: <Globe className="w-8 h-8" />,
      progress: 30,
      color: "from-purple-500 to-purple-600",
      lessons: [
        {
          id: 1,
          title: "Cultural Greetings",
          completed: true,
          duration: "18 min",
        },
        {
          id: 2,
          title: "Holiday Traditions",
          completed: false,
          duration: "25 min",
        },
        {
          id: 3,
          title: "Social Customs",
          completed: false,
          duration: "30 min",
        },
        {
          id: 4,
          title: "Business Etiquette",
          completed: false,
          duration: "35 min",
        },
        {
          id: 5,
          title: "Regional Dialects",
          completed: false,
          duration: "40 min",
        },
        {
          id: 6,
          title: "Cultural Taboos",
          completed: false,
          duration: "28 min",
        },
      ],
    },
    {
      id: "pronunciation-listening",
      title: "Pronunciation & Listening",
      description: "Improve your speaking clarity and listening comprehension",
      icon: <Headphones className="w-8 h-8" />,
      progress: 60,
      color: "from-orange-500 to-orange-600",
      lessons: [
        { id: 1, title: "Basic Sounds", completed: true, duration: "20 min" },
        { id: 2, title: "Word Stress", completed: true, duration: "25 min" },
        {
          id: 3,
          title: "Sentence Intonation",
          completed: true,
          duration: "30 min",
        },
        {
          id: 4,
          title: "Connected Speech",
          completed: false,
          duration: "35 min",
        },
        {
          id: 5,
          title: "Listening Comprehension",
          completed: false,
          duration: "40 min",
        },
        {
          id: 6,
          title: "Accent Reduction",
          completed: false,
          duration: "45 min",
        },
      ],
    },
  ];

  // Course interaction handlers
  const handleCourseClick = (courseId) => {
    setSelectedCourse(selectedCourse === courseId ? null : courseId);
  };

  const handleStartCourse = (courseId) => {
    // TODO: Add proper navigation to first lesson
    console.log("Starting course:", courseId);
    // For now just close modal
    setSelectedCourse(null);
  };

  const handleContinueCourse = (courseId) => {
    // TODO: Find next incomplete lesson and navigate
    console.log("Continuing course:", courseId);
    setSelectedCourse(null);
  };

  const handleLessonClick = (courseId, lessonId) => {
    // TODO: Navigate to specific lesson
    console.log("Starting lesson", lessonId, "in course", courseId);
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Course Navigation</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose your learning path and track your progress through our
            comprehensive English courses
          </p>
        </div>

        {/* Course Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {courseAreas.map((course) => (
            <Card
              key={course.id}
              className={`course-card relative bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 cursor-pointer ${
                selectedCourse === course.id ? "ring-2 ring-[#00C2CB]/20" : ""
              }`}
              onClick={() => handleCourseClick(course.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCourseClick(course.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-expanded={selectedCourse === course.id}
              aria-label={`${course.title} course - ${course.progress}% complete`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#00C2CB]/20 rounded-lg flex items-center justify-center">
                      <div className="text-[#00C2CB]">{course.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {course.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {course.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      selectedCourse === course.id ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </CardHeader>

              <CardContent className="pb-2">
                {/* Progress Section */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Progress</span>
                    <span className="text-sm font-medium text-[#00C2CB]">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-[#00C2CB]"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="block sm:flex justify-between items-center pt-2">
                <div className="flex items-center gap-2 mb-2 sm:mb-0">
                  <Badge className="bg-gray-700 text-[#00C2CB] border-transparent hover:bg-gray-700">
                    {course.progress === 0
                      ? "New"
                      : course.progress === 100
                      ? "Complete"
                      : "In Progress"}
                  </Badge>
                </div>
                {(() => {
                  // Quick button logic - could be cleaner but works
                  if (course.progress === 0) {
                    return (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartCourse(course.id);
                        }}
                        className="bg-[#00C2CB] hover:bg-[#00A8B0] flex items-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Start Course
                      </Button>
                    );
                  }

                  if (course.progress === 100) {
                    return (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContinueCourse(course.id);
                        }}
                        className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Review Course
                      </Button>
                    );
                  }

                  return (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContinueCourse(course.id);
                      }}
                      className="bg-[#00C2CB] hover:bg-[#00A8B0] flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Continue
                    </Button>
                  );
                })()}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Lessons Modal */}
        <AnimatePresence>
          {selectedCourse && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center"
              onClick={() => setSelectedCourse(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="relative w-full max-w-2xl max-h-[80vh] bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden mx-4"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  y: 20,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                <div className="p-4 border-b border-gray-700 bg-gray-800">
                  <div className="flex items-center justify-between">
                    <h4
                      id="modal-title"
                      className="text-lg font-semibold text-white"
                    >
                      {(() => {
                        // Quick way to get course data - could be optimized
                        const course = courseAreas.find(
                          (c) => c.id === selectedCourse
                        );
                        const completed =
                          course?.lessons.filter((l) => l.completed).length ||
                          0;
                        const total = course?.lessons.length || 0;
                        return `${course?.title} - Lessons (${completed}/${total})`;
                      })()}
                    </h4>
                    <Button
                      ref={closeButtonRef}
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCourse(null)}
                      className="text-gray-400 hover:text-black hover:bg-white/20"
                      aria-label="Close course lessons modal"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 space-y-2 overflow-y-auto max-h-[calc(80vh-100px)]">
                  {(() => {
                    // Get lessons for selected course
                    const course = courseAreas.find(
                      (c) => c.id === selectedCourse
                    );
                    return course?.lessons.map((lesson, index) => (
                      <motion.div
                        key={lesson.id}
                        className={`group relative overflow-hidden rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                          lesson.completed
                            ? "bg-gray-800/80 border border-gray-600/30"
                            : "bg-gray-700/50 border border-gray-600/30 hover:bg-gray-700/70"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLessonClick(selectedCourse, lesson.id);
                        }}
                        initial={{
                          opacity: 0,
                          x: -20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05,
                        }}
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                                lesson.completed
                                  ? "bg-gray-700 border border-gray-600 text-gray-300"
                                  : "bg-gray-600 text-gray-300"
                              }`}
                            >
                              {lesson.completed ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                lesson.id
                              )}
                            </div>
                            <div>
                              <h5
                                className={`font-medium text-sm ${
                                  lesson.completed ? "text-white" : "text-white"
                                }`}
                              >
                                {lesson.title}
                              </h5>
                              <p
                                className={`text-xs ${
                                  lesson.completed
                                    ? "text-gray-400"
                                    : "text-gray-400"
                                }`}
                              >
                                {lesson.completed
                                  ? "✓ Completed"
                                  : "• Not started"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`text-xs px-2 py-1 ${
                                lesson.completed
                                  ? "border-gray-600 text-gray-400"
                                  : "border-gray-600 text-gray-400"
                              }`}
                            >
                              {lesson.duration}
                            </Badge>
                            {!lesson.completed && (
                              <Lock className="w-3 h-3 text-gray-500" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ));
                  })()}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Summary - TODO: Add more detailed stats */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <h3 className="text-xl font-semibold text-white">
              Overall Progress
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {courseAreas.map((course) => (
                <div key={course.id} className="text-center">
                  <div className="mx-auto mb-2">
                    <ProgressCircle
                      progress={course.progress}
                      size={64}
                      color="from-[#00C2CB] to-[#00A8B0]"
                      showPercentage={true}
                    />
                  </div>
                  <p className="text-sm text-gray-400">{course.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseNavigation;
