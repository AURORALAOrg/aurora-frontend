"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import DifficultySelector from "./difficulty-selector";
import GameBoard from "./game-board";
import GameOver from "./game-over";
import { DIFFICULTY_SETTINGS } from "./mock/word-matching";

interface GameSettings {
  pairs: number;
  time: number;
}

export default function WordMatchingGame() {
  const [difficulty, setDifficulty] = useState<string>("Medium");
  const [score, setScore] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleGameStart = (selectedDifficulty: string) => {
    setDifficulty(selectedDifficulty);
    setScore(0);
    setGameStarted(true);
    setGameOver(false);
  };

  const handleGameOver = (finalScore: number) => {
    setScore(finalScore);
    setGameOver(true);
    setGameStarted(false);
  };

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardContent className="flex flex-col items-center p-6">
        {!gameStarted && !gameOver && (
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6 text-primary">
              Word Matching Game
            </h1>
            <p className="text-center mb-8 text-muted-foreground">
              Match English words with their Spanish translations. Select a
              difficulty level to begin.
            </p>
            <DifficultySelector
              onSelect={handleGameStart}
              currentDifficulty={difficulty}
            />
          </div>
        )}

        {gameStarted && (
          <GameBoard
            difficulty={difficulty}
            settings={DIFFICULTY_SETTINGS[difficulty] as GameSettings}
            onGameOver={handleGameOver}
            onScoreUpdate={setScore}
          />
        )}

        {gameOver && (
          <GameOver
            score={score}
            onPlayAgain={() => handleGameStart(difficulty)}
          />
        )}
      </CardContent>
    </Card>
  );
}
