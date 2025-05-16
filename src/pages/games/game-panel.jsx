import React from 'react';
import { Link } from 'react-router-dom';

const GamePanel = () => {
  return (
    <div className="bg-[#111827] min-h-screen px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-white mb-4">English Learning Games</h1>
      <p className="text-center mb-10 text-gray-300">
        Choose from our selection of interactive games designed to help you improve your English skills while having fun!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {[
          {
            title: "Memory Card",
            description: "Improve your English vocabulary by matching words with their corresponding images",
            path: "/games/memory-card",
          },
          {
            title: "Word Matching",
            description: "Improve your English vocabulary by matching words to their pairs",
            path: "/games/word-matching",
          },
          {
            title: "Story Game",
            description: "Improve your English vocabulary by dragging and dropping words to complete a story",
            path: "/games/story-game",
          },
          {
            title: "Word Scramble",
            description: "Improve your English vocabulary by unscrambling words based on given hints",
            path: "/games/word-scramble",
          },
        ].map((game, index) => (
          <Link to={game.path} key={index} className="block">
            <div className="bg-[#1f2937] rounded-lg p-6 hover:shadow-xl transition-shadow group border border-[#374151]">
              <div className="w-14 h-14 rounded-lg mb-4 flex items-center justify-center shadow-lg relative bg-gradient-to-br from-indigo-500 to-purple-500 group-hover:opacity-90">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4V4z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-white mb-1">{game.title}</h2>
              <p className="text-sm text-gray-300">{game.description}</p>
            </div>
          </Link>
        ))}

        <div className="bg-[#1f2937] rounded-lg p-6 opacity-50 border border-[#374151]">
          <div className="w-14 h-14 bg-gray-600 rounded-lg mb-4"></div>
          <h2 className="text-lg font-semibold text-gray-400 mb-1">Coming Soon</h2>
          <p className="text-sm text-gray-500">New game coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default GamePanel;
