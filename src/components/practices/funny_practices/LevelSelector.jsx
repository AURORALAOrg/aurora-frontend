import React from "react";

const englishLevels = [
  { level: "A1", description: "Beginner" },
  { level: "A2", description: "Elementary" },
  { level: "B1", description: "Intermediate" },
  { level: "B2", description: "Upper Intermediate" },
  { level: "C1", description: "Advanced" },
  { level: "C2", description: "Mastery" },
];

export default function LevelSelector({ onLevelSelect }) {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">Select Your English Level</h2>
      <div className="grid grid-cols-2 gap-4">
        {englishLevels.map(({ level, description }) => (
          <button
            key={level}
            onClick={() => onLevelSelect(level)}
            className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors text-left"
          >
            <div className="font-bold text-blue-600">{level}</div>
            <div className="text-sm text-gray-600">{description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
 