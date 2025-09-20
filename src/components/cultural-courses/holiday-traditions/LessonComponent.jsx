import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";

const LessonComponent = ({
  lessonData,
  onComplete,
  onNext,
  onPrevious,
  lessonNumber,
  totalLessons,
}) => {
  const [currentSection, setCurrentSection] = useState("theory");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const exercises = Array.isArray(lessonData?.exercises)
    ? lessonData.exercises
    : [];
  const totalQuestions = exercises.reduce(
    (total, ex) => total + (ex.questions?.length || 0),
    0
  );

  const sections = ["theory", "examples", "exercises"];

  const handleAnswerSelect = (exerciseIndex, questionIndex, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [`${exerciseIndex}-${questionIndex}`]: answer,
    }));
  };

  const handleExerciseComplete = () => {
    let currentScore = 0;

    exercises.forEach((exercise, exerciseIndex) => {
      (exercise.questions || []).forEach((question, questionIndex) => {
        const selectedAnswer =
          selectedAnswers[`${exerciseIndex}-${questionIndex}`];
        if (selectedAnswer === question.correctAnswer) {
          currentScore++;
        }
      });
    });

    setScore(currentScore);
    setShowResults(true);
  };

  const resetExercise = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const isAnswerCorrect = (exerciseIndex, questionIndex) => {
    const selectedAnswer = selectedAnswers[`${exerciseIndex}-${questionIndex}`];
    const exercise = exercises[exerciseIndex];
    const question = exercise?.questions?.[questionIndex];
    return selectedAnswer === question?.correctAnswer;
  };

  const getProgressPercentage = () => {
    const answeredQuestions = Object.keys(selectedAnswers).length;
    return totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
  };

  const getScorePercentage = () => {
    return totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  };

  const isAllAnswered = () => {
    return Object.keys(selectedAnswers).length === totalQuestions;
  };

  const renderTheory = () => (
    <div className="space-y-6">
      <div className="bg-dark-blue-5 p-6 rounded-lg border border-[#1f2937]">
        <h3 className="text-xl font-semibold text-neutral-1 mb-4">
          {lessonData?.content?.theory?.title}
        </h3>

        <div className="space-y-6">
          {lessonData?.content?.theory?.rules?.map((rule, index) => (
            <div key={index} className="space-y-3">
              <h4 className="text-lg font-medium text-neutral-1">
                {rule.rule}
              </h4>
              <ul className="space-y-2 ml-4">
                {rule.examples?.map((example, exampleIndex) => (
                  <li
                    key={exampleIndex}
                    className="text-neutral-2 flex items-start space-x-2"
                  >
                    <span className="text-primary-500 mt-1">•</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {lessonData?.content?.theory?.importantNotes && (
          <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="w-5 h-5 text-blue-400" />
              <h4 className="text-lg font-medium text-blue-300">
                Important Notes
              </h4>
            </div>
            <ul className="space-y-2">
              {lessonData.content.theory.importantNotes.map((note, index) => (
                <li
                  key={index}
                  className="text-blue-200 flex items-start space-x-2"
                >
                  <span className="text-blue-400 mt-1">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  const renderExamples = () => (
    <div className="space-y-6">
      {lessonData?.content?.examples?.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className="bg-dark-blue-5 p-6 rounded-lg border border-[#1f2937]"
        >
          <h3 className="text-xl font-semibold text-neutral-1 mb-4">
            {category.category}
          </h3>

          <div className="space-y-4">
            {category.examples?.map((example, exampleIndex) => (
              <div
                key={exampleIndex}
                className="bg-dark-blue-4 p-4 rounded-lg border border-[#374151]"
              >
                <div className="text-sm text-neutral-3 mb-2">
                  {example.context}
                </div>
                <div className="text-neutral-1 whitespace-pre-line">
                  {example.dialogue}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderExercises = () => (
    <div className="space-y-6">
      {!showResults ? (
        <>
          <div className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-1">
                Exercises ({totalQuestions} questions)
              </h3>
              <div className="text-sm text-neutral-2">
                Progress: {Math.round(getProgressPercentage())}%
              </div>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleExerciseComplete}
                disabled={!isAllAnswered()}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isAllAnswered()
                    ? "bg-primary-500 hover:bg-primary-600 text-white"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                Complete Exercise
              </button>
              <button
                onClick={resetExercise}
                className="px-4 py-2 rounded-lg font-medium bg-gray-600 hover:bg-gray-700 text-neutral-1 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {exercises.map((exercise, exerciseIndex) => (
              <div
                key={exerciseIndex}
                className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]"
              >
                <h3 className="text-lg font-semibold text-neutral-1 mb-3">
                  {exercise?.title || "Exercise"}
                </h3>

                <div className="space-y-4">
                  {(exercise.questions || []).map((question, questionIndex) => {
                    const selectedAnswer =
                      selectedAnswers[`${exerciseIndex}-${questionIndex}`];

                    return (
                      <div
                        key={questionIndex}
                        className="bg-dark-blue-4 p-4 rounded-lg"
                      >
                        <h4 className="text-neutral-1 font-medium mb-3">
                          {question.question}
                        </h4>

                        <div className="space-y-2">
                          {question.options?.map((option, optionIndex) => (
                            <label
                              key={optionIndex}
                              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                selectedAnswer === option
                                  ? "bg-primary-500/20 border-primary-500"
                                  : "bg-dark-blue-3 hover:bg-dark-blue-2 border-transparent"
                              } border`}
                            >
                              <input
                                type="radio"
                                name={`${exerciseIndex}-${questionIndex}`}
                                value={option}
                                checked={selectedAnswer === option}
                                onChange={() =>
                                  handleAnswerSelect(
                                    exerciseIndex,
                                    questionIndex,
                                    option
                                  )
                                }
                                className="w-4 h-4 text-primary-500"
                              />
                              <span className="text-neutral-1">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="bg-dark-blue-5 p-6 rounded-lg border border-[#1f2937] text-center">
            <div className="mb-4">
              {getScorePercentage() >= 70 ? (
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              ) : (
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              )}
            </div>

            <h3 className="text-2xl font-bold text-neutral-1 mb-2">
              Exercise Complete!
            </h3>
            <p className="text-neutral-2 mb-4">
              You scored {score} out of {totalQuestions} questions (
              {Math.round(getScorePercentage())}%)
            </p>

            <div className="flex justify-center space-x-4">
              <button
                onClick={resetExercise}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-neutral-1 rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onComplete}
                className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
              >
                Continue
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {exercises.map((exercise, exerciseIndex) => (
              <div
                key={exerciseIndex}
                className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]"
              >
                <h3 className="text-lg font-semibold text-neutral-1 mb-3">
                  {exercise?.title || "Exercise"} - Review
                </h3>

                <div className="space-y-4">
                  {(exercise.questions || []).map((question, questionIndex) => {
                    const selectedAnswer =
                      selectedAnswers[`${exerciseIndex}-${questionIndex}`];
                    const isCorrect = isAnswerCorrect(
                      exerciseIndex,
                      questionIndex
                    );

                    return (
                      <div
                        key={questionIndex}
                        className="bg-dark-blue-4 p-4 rounded-lg"
                      >
                        <div className="flex items-start space-x-3 mb-3">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <h4 className="text-neutral-1 font-medium mb-2">
                              {question.question}
                            </h4>
                            <p className="text-neutral-2 text-sm mb-2">
                              Your answer: {selectedAnswer}
                            </p>
                            <p className="text-neutral-2 text-sm mb-2">
                              Correct answer: {question.correctAnswer}
                            </p>
                            <p className="text-neutral-3 text-sm">
                              {question.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-neutral-1">
            {lessonData?.title}
          </h1>
          <div className="text-sm text-neutral-2">
            Lesson {lessonNumber} of {totalLessons}
          </div>
        </div>
        <p className="text-neutral-2">{lessonData?.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex space-x-1 bg-dark-blue-5 p-1 rounded-lg">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setCurrentSection(section)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                currentSection === section
                  ? "bg-primary-500 text-white"
                  : "text-neutral-2 hover:text-neutral-1 hover:bg-dark-blue-4"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        {currentSection === "theory" && renderTheory()}
        {currentSection === "examples" && renderExamples()}
        {currentSection === "exercises" && renderExercises()}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          disabled={lessonNumber === 1}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            lessonNumber === 1
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gray-600 hover:bg-gray-700 text-neutral-1"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={onNext}
          disabled={lessonNumber === totalLessons}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            lessonNumber === totalLessons
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-primary-500 hover:bg-primary-600 text-white"
          }`}
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default LessonComponent;
