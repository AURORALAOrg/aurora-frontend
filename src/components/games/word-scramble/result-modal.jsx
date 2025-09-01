import React from "react";
import { MdLoop } from "react-icons/md";

const ResultModal = ({ totalMoves, startAgain, returnToGame  }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md mx-auto animate-popup">
      <h3 className="text-green-500 mb-2 text-2xl font-extrabold">Congratulations! 🎉</h3>
      <p className="text-gray-700">You have completed the game in {totalMoves} moves</p>
      <div className="flex items-center w-fit space-x-4 mx-auto mt-8">
        <button onClick={startAgain} className="py-2 px-4 bg-blue-500 text-white rounded-md flex items-center space-x-1 font-bold"><MdLoop className="text-xl" /><span>Play again</span></button>
        <button onClick={returnToGame} className="py-2 px-4 bg-white border border-gray-400 text-gray-800 rounded-md font-bold">Return</button>
      </div>
    </div>
  );
};

export default ResultModal;
