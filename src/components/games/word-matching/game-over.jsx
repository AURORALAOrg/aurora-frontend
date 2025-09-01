import React from 'react';
import { Trophy, RotateCcw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GameOver = ({ score, onPlayAgain }) => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/games/world-matching'); // Or wherever your games category page is
  };

  return (
    <div className="bg-gray-800 rounded-xl p-8 w-full max-w-md mx-auto text-center shadow-lg border border-gray-700">
      {/* Trophy Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center">
          <Trophy className="w-12 h-12 text-blue-500" />
        </div>
      </div>

      {/* Game Over Text */}
      <h2 className="text-2xl font-bold text-white mb-2">Game Over!</h2>
      
      {/* Score Display */}
      <div className="mb-6">
        <p className="text-gray-400 mb-2">Your Score</p>
        <p className="text-4xl font-bold text-blue-500">{score}</p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onPlayAgain}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>

        <button
          onClick={handleReturn}
          className="w-full bg-gray-700 text-gray-200 py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Return to Levels
        </button>
      </div>

      {/* Optional: High Score or Achievement Message */}
      {score > 500 && (
        <div className="mt-6 p-4 bg-green-500/20 rounded-lg">
          <p className="text-green-400 font-medium">
            Congratulations! You're doing great! 🎉
          </p>
        </div>
      )}
    </div>
  );
};

export default GameOver;