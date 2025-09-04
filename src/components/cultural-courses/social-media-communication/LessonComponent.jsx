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
    if (totalQuestions === 0) return 0;
    const answeredQuestions = Object.keys(selectedAnswers).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const renderTheory = () => (
    <div className="space-y-6">
      <div className="bg-dark-blue-4 border-l-4 border-light-blue-1 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-light-blue-1 mb-3">
          <BookOpen className="inline w-5 h-5 mr-2" />
          {lessonData.content.theory.title}
        </h3>
        <div className="space-y-4">
          {lessonData.content.theory.rules.map((rule, index) => (
            <div
              key={index}
              className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]"
            >
              <h4 className="font-medium text-neutral-1 mb-2">{rule.rule}</h4>
              <div className="text-sm text-neutral-2">
                <strong>Examples:</strong>
                <ul className="mt-1 ml-4">
                  {rule.examples.map((example, idx) => (
                    <li key={idx} className="italic">
                      • {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          {lessonData.content.theory.exceptions && (
            <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
              <h4 className="font-medium text-yellow-400 mb-2">
                Important Exceptions:
              </h4>
              <ul className="text-sm text-yellow-300 space-y-1">
                {lessonData.content.theory.exceptions.map(
                  (exception, index) => (
                    <li key={index}>• {exception}</li>
                  )
                )}
              </ul>
            </div>
          )}
          {lessonData.content.theory.importantNotes && (
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
              <h4 className="font-medium text-green-400 mb-2">
                Important Notes:
              </h4>
              <ul className="text-sm text-green-300 space-y-1">
                {lessonData.content.theory.importantNotes.map((note, index) => (
                  <li key={index}>• {note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderExamples = () => (
    <div className="space-y-6">
      <div className="bg-dark-blue-4 border-l-4 border-purple-500 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-400 mb-3">
          <Lightbulb className="inline w-5 h-5 mr-2" />
          Examples
        </h3>
        <div className="space-y-6">
          {lessonData.content.examples.map((category, index) => (
            <div
              key={index}
              className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]"
            >
              <h4 className="font-medium text-neutral-1 mb-2">
                {category.category}
              </h4>
              <ul className="space-y-2">
                {category.sentences.map((sentence, idx) => (
                  <li key={idx} className="text-neutral-2">
                    <span className="text-sm">• {sentence}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {lessonData.content.commonMistakes && (
        <div className="bg-dark-blue-4 border-l-4 border-red-500 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-red-400 mb-3">
            <AlertTriangle className="inline w-5 h-5 mr-2" />
            Common Mistakes
          </h3>
          <div className="space-y-4">
            {lessonData.content.commonMistakes.map((mistake, index) => (
              <div
                key={index}
                className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]"
              >
                <h4 className="font-medium text-red-400 mb-2">
                  ✘ {mistake.incorrect}
                </h4>
                <p className="text-sm text-neutral-2 mb-2">
                  {mistake.explanation}
                </p>
                <h4 className="font-medium text-green-400">
                  ✓ {mistake.correct}
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderExercises = () => (
    <div className="space-y-6">
      {!showResults ? (
        <>
          <div className="mb-4">
            <div className="h-2 w-full bg-neutral-1/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-light-blue-1 transition-all"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <div className="mt-1 text-right text-sm text-neutral-2">
              {getProgressPercentage()}% Complete
            </div>
          </div>

          {exercises.map((exercise, exerciseIndex) => (
            <div
              key={exerciseIndex}
              className="bg-dark-blue-4 border-l-4 border-amber-500 p-4 rounded-lg"
            >
              <h3 className="text-lg font-semibold text-amber-400 mb-1">
                {exercise.title}
              </h3>
              <p className="text-sm text-neutral-2 mb-4">
                {exercise.instructions}
              </p>

              <div className="space-y-6">
                {exercise.questions.map((question, questionIndex) => (
                  <div
                    key={questionIndex}
                    className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]"
                  >
                    <h4 className="font-medium text-neutral-1 mb-3">
                      {question.question}
                    </h4>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          className={`w-full text-left p-3 rounded-md transition-all ${
                            selectedAnswers[
                              `${exerciseIndex}-${questionIndex}`
                            ] === option
                              ? "bg-light-blue-1/20 border border-light-blue-1"
                              : "bg-dark-blue-4 border border-[#1f2937] hover:border-light-blue-1/50"
                          }`}
                          onClick={() =>
                            handleAnswerSelect(
                              exerciseIndex,
                              questionIndex,
                              option
                            )
                          }
                        >
                          <span className="text-sm text-neutral-1">
                            {option}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end mt-6">
            <button
              className="px-6 py-3 bg-light-blue-1 text-white font-medium rounded-lg hover:bg-light-blue-2 transition-colors"
              onClick={handleExerciseComplete}
              disabled={getProgressPercentage() < 100}
            >
              {getProgressPercentage() < 100
                ? `Answer all questions to continue`
                : `Check Answers`}
            </button>
          </div>
        </>
      ) : (
        <div className="bg-dark-blue-4 p-6 rounded-lg">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-neutral-1 mb-2">
              Your Score: {score}/{totalQuestions}
            </h3>
            <p className="text-neutral-2">
              {totalQuestions === 0
                ? "No questions available."
                : score === totalQuestions
                ? "Perfect score! Excellent work!"
                : score >= totalQuestions * 0.7
                ? "Great job! You've got a good understanding of this topic."
                : "Keep practicing! You're making progress."}
            </p>
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
                    const isCorrect = isAnswerCorrect(
                      exerciseIndex,
                      questionIndex
                    );

                    return (
                      <div
                        key={questionIndex}
                        className="bg-dark-blue-4 p-4 rounded-lg"
                      >
                        <div className="flex items-start">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                          )}
                          <div>
                            <h4 className="font-medium text-neutral-1 mb-1">
                              {question.question}
                            </h4>
                            <p className="text-sm text-neutral-2 mb-2">
                              Your answer:{" "}
                              <span
                                className={
                                  isCorrect ? "text-green-500" : "text-red-500"
                                }
                              >
                                {selectedAnswer || "Not answered"}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-green-500 mb-2">
                                Correct answer: {question.correctAnswer}
                              </p>
                            )}
                            <p className="text-sm text-neutral-2 bg-dark-blue-5 p-2 rounded border border-[#1f2937]">
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

          <div className="flex justify-between mt-6">
            <button
              className="px-6 py-3 bg-dark-blue-3 text-neutral-1 font-medium rounded-lg hover:bg-dark-blue-2 transition-colors"
              onClick={resetExercise}
            >
              Try Again
            </button>

            <button
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => {
                if (lessonNumber < totalLessons) {
                  onNext();
                } else {
                  onComplete();
                }
              }}
            >
              {lessonNumber < totalLessons ? "Next Lesson" : "Complete Course"}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-1 mb-2">
          Lesson {lessonNumber}: {lessonData.title}
        </h2>
        <p className="text-neutral-2">{lessonData.description}</p>
      </div>

      <div className="flex mb-6 border-b border-[#1f2937]">
        {sections.map((section) => (
          <button
            key={section}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              currentSection === section
                ? "text-light-blue-1 border-b-2 border-light-blue-1"
                : "text-neutral-2 hover:text-neutral-1"
            }`}
            onClick={() => setCurrentSection(section)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      <div className="mb-6">
        {currentSection === "theory" && renderTheory()}
        {currentSection === "examples" && renderExamples()}
        {currentSection === "exercises" && renderExercises()}
      </div>

      <div className="flex justify-between mt-8">
        <button
          className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
            lessonNumber > 1
              ? "border-[#1f2937] text-neutral-1 hover:bg-dark-blue-3"
              : "border-[#1f2937]/30 text-neutral-3 cursor-not-allowed"
          }`}
          onClick={onPrevious}
          disabled={lessonNumber <= 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous Lesson
        </button>

        {currentSection !== "exercises" && (
          <button
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              lessonNumber < totalLessons
                ? "bg-light-blue-1 text-white hover:bg-light-blue-2"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            onClick={lessonNumber < totalLessons ? onNext : onComplete}
          >
            {lessonNumber < totalLessons ? "Next Lesson" : "Complete Course"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonComponent;
