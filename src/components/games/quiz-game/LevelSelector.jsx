"use client"

const englishLevels = [
  { level: "A1", description: "Beginner", color: "bg-green-50 border-green-200 text-green-700" },
  { level: "A2", description: "Elementary", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { level: "B1", description: "Intermediate", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
  { level: "B2", description: "Upper Intermediate", color: "bg-orange-50 border-orange-200 text-orange-700" },
  { level: "C1", description: "Advanced", color: "bg-red-50 border-red-200 text-red-700" },
  { level: "C2", description: "Mastery", color: "bg-purple-50 border-purple-200 text-purple-700" },
]

export default function LevelSelector({ onLevelSelect }) {
  return (
    <div className="bg-white pt-0 rounded-2xl shadow-lg text-center max-w-md mx-auto animate-popup">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-blue-500 mb-2">English Quiz</h2>
        <p className="text-gray-600 mb-8">Select Your Level</p>

        <div className="grid grid-cols-2 gap-4">
          {englishLevels.map(({ level, description, color }) => (
            <button
              key={level}
              onClick={() => onLevelSelect(level)}
              className={`p-4 border-2 rounded-xl hover:scale-105 transition-all duration-200 ${color}`}
            >
              <div className="font-bold text-xl mb-1">{level}</div>
              <div className="text-sm opacity-80">{description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
