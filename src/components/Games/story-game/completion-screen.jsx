import React from "react";
import { AiFillTrophy } from "react-icons/ai";
import { FaSyncAlt } from "react-icons/fa";

const CompletionScreen = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 rounded-lg shadow-lg">
      <AiFillTrophy className="text-yellow-500 text-6xl mb-4" />
      <h2 className="text-2xl font-bold mb-2">Story Completed!</h2>
      <p className="text-lg text-gray-700">
        Your Score: {score}/{total}
      </p>
      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2 transform transition-transform active:scale-95"
        onClick={onRestart}
      >
        <FaSyncAlt /> Play Again
      </button>
    </div>
  );
};

export default CompletionScreen;
