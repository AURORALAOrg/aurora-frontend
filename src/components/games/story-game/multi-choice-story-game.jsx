import { useState } from 'react';
import { FaArrowLeft, FaSyncAlt } from 'react-icons/fa';
import { AiFillTrophy } from "react-icons/ai";

const MultiChoiceStoryGame = ({ 
  storyText = "", 
  questions = [], 
  onGoBack, 
  onRestart, 
  onComplete,
  onNext,
  currentStory,
  totalStories 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanations, setShowExplanations] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final score
      calculateScore();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correctAnswers++;
      }
    });
    
    const finalScore = correctAnswers;
    setScore(finalScore);
    setShowResults(true);
    onComplete(finalScore);
  };

  const handleNextStory = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setShowExplanations(false);
    onNext();
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setShowExplanations(false);
    if (onRestart) onRestart();
  };

  const isAnswered = (questionIndex) => {
    return Object.prototype.hasOwnProperty.call(selectedAnswers, questionIndex);
  };

  const canProceed = isAnswered(currentQuestionIndex);

  // No-questions fallback
  if (!Array.isArray(questions) || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-2">No questions available for this story.</h2>
        <p className="text-gray-600 mb-6">Please go back or try the next story.</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onGoBack}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Menu
          </button>
          {currentStory < totalStories && (
            <button
              onClick={handleNextStory}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Next Story
            </button>
          )}
        </div>
      </div>
    );
  }

  // Results/Completion Screen
  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 rounded-lg shadow-lg">
        <AiFillTrophy className="text-yellow-500 text-6xl mb-4" />
        <h2 className="text-2xl font-bold mb-2">Story Completed!</h2>
        <p className="text-lg text-gray-700 mb-4">
          Your Score: {score}/{questions.length}
        </p>
        <p className="text-sm text-gray-600 mb-6">
          {score === questions.length
            ? "Perfect!"
            : score >= questions.length * 0.8
            ? "Great job!"
            : "Keep practicing!"}
        </p>

        <div className="mb-6">
          <button
            onClick={() => setShowExplanations(!showExplanations)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mr-2"
          >
            {showExplanations ? 'Hide' : 'Show'} Explanations
          </button>
        </div>

        {showExplanations && (
          <div className="mb-6 space-y-4 max-w-2xl">
            <h3 className="text-lg font-semibold">Question Review:</h3>
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correct;

              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect
                      ? 'border-green-300 bg-green-50'
                      : 'border-red-300 bg-red-50'
                  }`}
                >
                  <p className="font-medium mb-2">{question.question}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    Your answer: {question.options[userAnswer]}{' '}
                    {isCorrect ? '✅' : '❌'}
                  </p>
                  {!isCorrect && (
                    <p className="text-sm text-green-600 mb-2">
                      Correct answer: {question.options[question.correct]}
                    </p>
                  )}
                  <p className="text-sm text-gray-700">
                    {question.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2 transform transition-transform active:scale-95"
            onClick={restartGame}
          >
            <FaSyncAlt /> Play Again
          </button>

          {currentStory < totalStories && (
            <button
              onClick={handleNextStory}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Next Story ({currentStory + 1}/{totalStories})
            </button>
          )}

          <button
            onClick={onGoBack}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
      <div className="relative p-4 lg:p-6 bg-white min-h-screen flex flex-col rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
          onClick={onGoBack}
        >
          <FaArrowLeft /> Back
        </button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold">Story Reading</h2>
          <p className="text-sm text-gray-600">
            Story {currentStory}/{totalStories} - Question {currentQuestionIndex + 1}/{questions.length}
          </p>
        </div>
        
        <button
          className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-300 transition-transform transform active:scale-95"
          onClick={restartGame}
        >
          <FaSyncAlt />
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Story Text */}
      <div className="bg-gray-100 p-4 lg:p-6 rounded-lg shadow-md mb-6 flex-grow max-w-3xl mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Read the story:</h3>
        <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
            {storyText}
        </p>
        </div>

      {/* Current Question */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6 mb-6 max-w-3xl mx-auto w-full">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">
        Question {currentQuestionIndex + 1}: {currentQuestion.question}
      </h4>
      
      <div className="grid grid-cols-1 gap-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={`p-3 lg:p-4 text-left rounded-lg border-2 transition-colors ${
              selectedAnswers[currentQuestionIndex] === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <span className="font-medium mr-3 text-blue-600">
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
          </button>
        ))}
      </div>
    </div>

    {/* Navigation */}
    <div className="flex justify-between items-center">
        <div>
            {currentQuestionIndex > 0 && (
            <button
                onClick={handlePreviousQuestion}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
                Previous
            </button>
            )}
        </div>

        <div className="flex items-center gap-4">
            {/* Progress dots */}
            <div className="flex space-x-2">
            {questions.map((_, index) => (
                <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                    index === currentQuestionIndex
                    ? 'bg-blue-500'
                    : isAnswered(index)
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
                ></div>
            ))}
            </div>

            <button
            onClick={handleNextQuestion}
            disabled={!canProceed}
            className={`px-6 py-2 rounded transition-colors ${
                canProceed
                ? 'bg-blue-500 text-white hover:bg-green-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
        </div>
    </div>
    </div>
  );
};

export default MultiChoiceStoryGame;