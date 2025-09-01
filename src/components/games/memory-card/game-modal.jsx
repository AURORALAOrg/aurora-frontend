import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const GameModal = ({ moves, onPlayAgain }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-4 text-tertiary">
          Congratulations! 🎉
        </h2>
        <p className="text-center mb-6">
          You completed the game in {moves} moves
        </p>
        <div className="flex gap-4">
          <button
            onClick={onPlayAgain}
            className="flex items-center justify-center w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.97,16L5,19C4.67,19.3 4.23,19.5 3.75,19.5A1.75,1.75 0 0,1 2,17.75V17.5L3,10.12C3.21,7.81 5.14,6 7.5,6H16.5C18.86,6 20.79,7.81 21,10.12L22,17.5V17.75A1.75,1.75 0 0,1 20.25,19.5C19.77,19.5 19.33,19.3 19,19L16.03,16H7.97M7,8V10H5V12H7V14H9V12H11V10H9V8H7M15.5,9A1.5,1.5 0 0,0 14,10.5A1.5,1.5 0 0,0 15.5,12A1.5,1.5 0 0,0 17,10.5A1.5,1.5 0 0,0 15.5,9M18.5,11A1.5,1.5 0 0,0 17,12.5A1.5,1.5 0 0,0 18.5,14A1.5,1.5 0 0,0 20,12.5A1.5,1.5 0 0,0 18.5,11Z"/>
          </svg> Play Again
          </button>
          <button
            onClick={() => navigate('/games/memory-card')}
            className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Back to Levels
          </button>
        </div>
      </div>
    </div>
  );
};

GameModal.propTypes = {
  moves: PropTypes.number.isRequired,
  onPlayAgain: PropTypes.func.isRequired
};

export default GameModal; 