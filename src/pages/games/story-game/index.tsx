"use client";

import type React from "react";
import GameCompleteStory from "@/components/games/story-game/game-complete-story";

const StoryGame: React.FC = () => {
  const storyText: string =
    "Hello! My name is {0}. I am {1} years old. I live in {2} with my family. I like to eat {3} and my favorite color is {4}.";
  const wordOptions: string[] = ["Tom", "10", "pizza", "London", "blue"];
  const correctAnswers: string[] = ["Tom", "10", "London", "pizza", "blue"];

  const handleGoBack = (): void => {
    console.log("Going back...");
  };

  const handleRestart = (): void => {
    console.log("Restarting the game...");
  };

  const handleComplete = (score: number): void => {
    console.log(`Game completed with score: ${score}`);
  };

  return (
    <GameCompleteStory
      storyText={storyText}
      wordOptions={wordOptions}
      correctAnswers={correctAnswers}
      onGoBack={handleGoBack}
      onRestart={handleRestart}
      onComplete={handleComplete}
    />
  );
};

export default StoryGame;
