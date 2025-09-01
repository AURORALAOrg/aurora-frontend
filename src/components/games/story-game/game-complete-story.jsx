import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaArrowLeft, FaSyncAlt } from "react-icons/fa";
import StoryRenderer from "./story-renderer";
import DraggableWord from "./draggable-word";
import CompletionScreen from "./completion-screen";

const GameCompleteStory = ({
  storyText,
  wordOptions,
  correctAnswers,
  onGoBack,
  onRestart,
  onComplete,
}) => {
  const [answers, setAnswers] = useState(Array(correctAnswers.length).fill(""));
  const [score, setScore] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (answers.every((answer) => answer !== "")) {
      const calculatedScore = answers.filter(
        (answer, index) => answer === correctAnswers[index]
      ).length;
      setScore(calculatedScore);
      setCompleted(true);
      if (onComplete) onComplete(calculatedScore);
    }
  }, [answers, correctAnswers, onComplete]);

  const handleDrop = (index, word) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = word;
      return newAnswers;
    });
  };

  const restartGame = () => {
    setAnswers(Array(correctAnswers.length).fill(""));
    setScore(null);
    setCompleted(false);
    if (onRestart) onRestart();
  };

  if (completed) {
    return (
      <CompletionScreen
        score={score}
        total={correctAnswers.length}
        onRestart={restartGame}
      />
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative p-6 bg-white min-h-screen flex flex-col items-center rounded-lg shadow-lg">
        <button
          className="absolute top-4 left-4 text-blue-500 hover:text-blue-700"
          onClick={onGoBack}
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-2xl font-bold mb-4">Complete the Story</h2>
        <p className="text-gray-600 mb-6">
          Drag and drop the words to complete the story
        </p>
        <div className="bg-gray-100 p-4 rounded shadow-md mb-6 w-full max-w-2xl text-center">
          <StoryRenderer
            storyText={storyText}
            answers={answers}
            onDrop={handleDrop}
          />
        </div>
        <div className="flex items-center gap-4 justify-center">
          <div className="flex flex-wrap gap-4">
            {wordOptions.map((word, index) => (
              <DraggableWord key={index} word={word} disabled={answers.includes(word)} />
            ))}
          </div>
          <button
            className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-300 transition-transform transform active:scale-95"
            onClick={restartGame}
          >
            <FaSyncAlt className="text-xl" />
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default GameCompleteStory;
