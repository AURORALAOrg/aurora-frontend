import React from 'react';
// import WordMatchingGame from '../../../components/games/word-matching/word-matching-game';
import WordMatchingGame from '@/components/Games/word-matching/word-matching-game';

const MatchingGamePage = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-black">Word Matching Game</h1>
          <p className="text-gray-400">Test your vocabulary by matching pairs of words</p>
          <p className="text-gray-400">Please select the level.</p>
        </div>
        <WordMatchingGame />
      </div>
    </div>
  );
};

export default MatchingGamePage;