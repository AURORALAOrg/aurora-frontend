import React from 'react';
import { DIFFICULTY_SETTINGS } from './mock-data-word-matching/word-matching';

const DifficultySelector = ({ onSelect, currentDifficulty }) => {
  return (
    <div className="flex gap-2 mb-4">
      {Object.keys(DIFFICULTY_SETTINGS).map((level) => (
        <button
          key={level}
          onClick={() => onSelect(level)}
          className={`px-4 py-2 rounded ${
            currentDifficulty === level 
              ? 'bg-blue-600 text-white hover:bg-blue-700 transition-colors' 
              : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
          }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;