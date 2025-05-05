import React from 'react'

const SavedWork= ({setActiveTab}) => {
  return (
    <div className="text-center text-gray-400">
    <h2 className="text-2xl font-semibold mb-4">Your Saved Words</h2>
    <div className="flex justify-center mb-4">
      <svg
        className="w-12 h-12 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-5-7 5V5z"
        />
      </svg>
    </div>
    <p className="mb-6">No saved words yet. Start exploring and save words to review later.</p>
    <button
      onClick={() => setActiveTab('Categories')}
      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
    >
      Explore Categories
    </button>
  </div>
  )
}

export default SavedWork;
