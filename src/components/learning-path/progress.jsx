import React from 'react'

const Progress = () => {
  return (
    <div className="text-center text-gray-400">
    <h2 className="text-2xl  text-white font-semibold mb-4">Your Learning Progress</h2>
    <div className="flex justify-center mb-4">
      <svg
        className="w-12 h-12 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        aria-label="Progress chart"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    </div>
    <p className="mb-6">Track your progress. Sign in to see your vocabulary learning statistics and progress.</p>
    <div className="flex justify-center space-x-4">
      <button 
      className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400" 
      >
        Log In
      </button>
      <button 
       className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400" 
      >
        Sign Up
      </button>
    </div>
  </div>
  )
}

export default Progress
