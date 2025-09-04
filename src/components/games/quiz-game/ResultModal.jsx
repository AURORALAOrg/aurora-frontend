"use client"

const ResultModal = ({ score, totalQuestions, level, onRestart, onPlayAgain }) => {
  const percentage = Math.round((score / totalQuestions) * 100)

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Excellent! 🎉"
    if (percentage >= 70) return "Great job! 👏"
    if (percentage >= 50) return "Good effort! 👍"
    return "Keep practicing! 💪"
  }

  const getPerformanceColor = () => {
    if (percentage >= 70) return "text-green-500"
    if (percentage >= 50) return "text-blue-500"
    return "text-orange-500"
  }

  return (
    <div className="bg-white pt-0 rounded-2xl shadow-lg text-center max-w-md mx-auto animate-popup">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Quiz Complete!</h2>

        <div className={`text-6xl font-bold mb-4 ${getPerformanceColor()}`}>{percentage}%</div>

        <p className="text-xl font-semibold mb-2 text-gray-700">{getPerformanceMessage()}</p>

        <p className="text-gray-600 mb-2">
          You scored {score} out of {totalQuestions} questions correct!
        </p>

        <p className="text-sm text-gray-500 mb-8">Level: {level}</p>

        <div className="space-y-3">
          <button
            onClick={onPlayAgain}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={onRestart}
            className="w-full py-3 border border-blue-500 text-blue-500 hover:bg-blue-50 rounded-lg font-bold transition-colors"
          >
            Try Different Level
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultModal
