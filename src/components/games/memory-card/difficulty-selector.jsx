import React from 'react';
import { Link } from 'react-router-dom';
import { LEVELS } from './mock-data-memory-card/memory-levels';

const DifficultySelector = () => {
  return (
    <div className="container mx-auto px-4">
      <Link to="/games" className="text-primary hover:text-primary-dark mb-2 inline-flex items-center">
        <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Games
      </Link>

      <h1 className="text-3xl font-bold text-center mb-2 text-primary">Memory Card Game</h1>

      <p className="text-center mb-8 text-primary max-w-md mx-auto">
        This game is designed to help you improve your memory and concentration, the more you play, the better you will get.
      </p>

      <h2 className="text-2xl text-center mb-12 text-primary font-bold">Select Difficulty Level</h2>

      <div className="max-w-xs mx-auto space-y-4">
        {Object.values(LEVELS).map((level) => (
          <Link
            key={level.id}
            to={`/games/memory-card/${level.id}`}
            className="block w-full p-4 text-center bg-primary text-white hover:text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            {level.name} ({level.label})
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector; 