import { useState, useEffect } from 'react';
import { grammarLessons } from '@/data/grammerLessons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import LessonCard from '@/components/grammer-component/LessonCard';
import ExerciseComponent from '@/components/grammer-component/ExerciseComponent';

const GrammarCourse = () => {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [lessonScores, setLessonScores] = useState({});
  const [exerciseAnswers, setExerciseAnswers] = useState({});
  const [showResults, setShowResults] = useState({});
  const [completedLessons, setCompletedLessons] = useState([]);

  const lessons = Object.keys(grammarLessons);
  const lessonData = currentLesson ? grammarLessons[currentLesson] : null;

  // Initialize states for current lesson
  useEffect(() => {
    if (currentLesson && lessonData) {
      if (!exerciseAnswers[currentLesson]) {
        setExerciseAnswers(prev => ({
          ...prev,
          [currentLesson]: new Array(lessonData.exercises.length).fill(-1),
        }));
      }
      if (!showResults[currentLesson]) {
        setShowResults(prev => ({
          ...prev,
          [currentLesson]: new Array(lessonData.exercises.length).fill(false),
        }));
      }
    }
  }, [currentLesson, lessonData]);

  const handleLessonStart = (lessonKey) => {
    setCurrentLesson(lessonKey);
    setCurrentExercise(0);
  };

  const handleAnswer = (isCorrect) => {
    if (!currentLesson || !lessonData) return;

    // Update show results for current exercise
    setShowResults(prev => ({
      ...prev,
      [currentLesson]: prev[currentLesson]?.map((result, idx) =>
        idx === currentExercise ? true : result
      ) || [],
    }));

    // Update score
    if (isCorrect) {
      setLessonScores(prev => ({
        ...prev,
        [currentLesson]: (prev[currentLesson] || 0) + 1,
      }));
    }
  };

  const nextExercise = () => {
    if (!lessonData) return;

    if (currentExercise < lessonData.exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
    } else {
      // Lesson completed
      if (!completedLessons.includes(currentLesson)) {
        setCompletedLessons(prev => [...prev, currentLesson]);
      }
      setCurrentLesson(null);
      setCurrentExercise(0);
    }
  };

  const isLessonActive = (lessonIndex) => {
    return lessonIndex === 0 || completedLessons.includes(lessons[lessonIndex - 1]);
  };

  const getOverallProgress = () => {
    const totalLessons = lessons.length;
    const completed = completedLessons.length;
    return Math.round((completed / totalLessons) * 100);
  };

  const getTotalScore = () => {
    return Object.values(lessonScores).reduce((sum, score) => sum + score, 0);
  };

  const getTotalExercises = () => {
    return Object.values(grammarLessons).reduce((sum, lesson) => sum + lesson.exercises.length, 0);
  };

  // Course overview
  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Basic Sentence Structure Course</h1>
            <p className="text-xl text-gray-300 mb-6">
              Master English grammar foundations with 4 comprehensive lessons
            </p>

            {/* Progress Overview */}
            <Card className="bg-gray-800 border-gray-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>Overall Progress</span>
                      <span>{completedLessons.length}/{lessons.length} lessons completed</span>
                    </div>
                    <Progress value={getOverallProgress()} className="h-2" />
                  </div>

                  {completedLessons.length > 0 && (
                    <div className="text-center">
                      <p className="text-lg text-green-400">
                        Total Score: {getTotalScore()}/{getTotalExercises()}
                        ({Math.round((getTotalScore() / getTotalExercises()) * 100)}%)
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lesson Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {lessons.map((lessonKey, index) => {
              const lesson = grammarLessons[lessonKey];
              const isCompleted = completedLessons.includes(lessonKey);
              const isActive = isLessonActive(index);

              return (
                <LessonCard
                  key={lessonKey}
                  lessonNumber={index + 1}
                  title={lesson.title}
                  description={lesson.description}
                  isCompleted={isCompleted}
                  isActive={isActive}
                  score={lessonScores[lessonKey]}
                  totalExercises={lesson.exercises.length}
                  onStart={() => handleLessonStart(lessonKey)}
                />
              );
            })}
          </div>

          {/* Course Completion */}
          {completedLessons.length === lessons.length && (
            <Card className="bg-green-800 border-green-600 mt-8">
              <CardHeader>
                <CardTitle className="text-white text-center">🎉 Congratulations!</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-green-100 text-lg mb-4">
                  You have completed the Basic Sentence Structure Course!
                </p>
                <p className="text-green-200">
                  Final Score: {getTotalScore()}/{getTotalExercises()}
                  ({Math.round((getTotalScore() / getTotalExercises()) * 100)}%)
                </p>
                <Badge className="mt-4 bg-green-600 text-white text-lg px-4 py-2">
                  Course Completed ✓
                </Badge>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // Lesson view
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Lesson Header */}
        <div className="mb-8">
          <Button
            onClick={() => setCurrentLesson(null)}
            variant="outline"
            className="mb-4 text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            ← Back to Course Overview
          </Button>

          <h1 className="text-3xl font-bold mb-2">{lessonData?.title}</h1>
          <p className="text-gray-300 text-lg mb-4">{lessonData?.description}</p>

          {/* Progress */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-300">
              Exercise {currentExercise + 1} of {lessonData?.exercises.length}
            </span>
            <span className="text-gray-300">
              Score: {lessonScores[currentLesson] || 0}/{lessonData?.exercises.length}
            </span>
          </div>
          <Progress
            value={((currentExercise + 1) / (lessonData?.exercises.length || 1)) * 100}
            className="h-2 mb-6"
          />
        </div>

        {/* Lesson Content */}
        {currentExercise === 0 && (
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Lesson Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">{lessonData?.content.explanation}</p>
              <div>
                <h4 className="text-white font-semibold mb-2">Examples:</h4>
                <ul className="text-gray-300 space-y-1">
                  {lessonData?.content.examples.map((example, idx) => (
                    <li key={idx} className="text-sm">• {example}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Exercise */}
        {lessonData && (
          <ExerciseComponent
            exercise={lessonData.exercises[currentExercise]}
            exerciseIndex={currentExercise}
            onAnswer={handleAnswer}
            showResult={showResults[currentLesson]?.[currentExercise] || false}
            selectedAnswer={exerciseAnswers[currentLesson]?.[currentExercise] || null}
          />
        )}

        {/* Navigation */}
        {showResults[currentLesson]?.[currentExercise] && (
          <div className="text-center">
            <Button
              onClick={nextExercise}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
            >
              {currentExercise < (lessonData?.exercises.length || 0) - 1 ? 'Next Exercise' : 'Complete Lesson'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrammarCourse;
