import { useState } from 'react';
import LevelSelector from './level-selector';
import GameBoard from './game-board';
import GameOver from './game-over';

const WordMatchingGame = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setScore(0);
    setGameStarted(true);
    setGameOver(false);
  };

  const handleGameOver = (finalScore) => {
    setScore(finalScore);
    setGameOver(true);
    setGameStarted(false);
  };

  const handlePlayAgain = () => {
    if (selectedLevel) {
      handleLevelSelect(selectedLevel);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {!gameStarted && !gameOver && (
        <LevelSelector 
          onLevelSelect={handleLevelSelect}
        />
      )}
      
      {gameStarted && (
        <>
          <GameBoard
            selectedLevel={selectedLevel}
            onGameOver={handleGameOver}
            onScoreUpdate={setScore}
          />
        </>
      )}

      {gameOver && (
        <GameOver 
          score={score} 
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
};

export default WordMatchingGame;