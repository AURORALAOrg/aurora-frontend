import React from 'react';
import { Timer, Star } from 'lucide-react';

const ScoreDisplay = ({ score, timeLeft }) => {
  return (
    <div className="w-full max-w-4xl mb-6">
      <div className="bg-gray-800 rounded-xl p-4 flex justify-between items-center">
        {/* Score Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <Star className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Score</p>
            <p className="text-xl font-bold text-white">{score}</p>
          </div>
        </div>

        {/* Timer Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
            <Timer className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Time Left</p>
            <p className="text-xl font-bold text-white">{timeLeft}s</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 max-w-[200px] mx-6">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${(timeLeft / 40) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Optional: Combo or Streak Display */}
      {score > 0 && score % 200 === 0 && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg animate-bounce">
          <p className="font-bold">Combo! +50</p>
        </div>
      )}
    </div>
  );
};

export default ScoreDisplay;