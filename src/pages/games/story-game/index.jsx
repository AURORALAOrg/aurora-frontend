import React from 'react';
// import GameCompleteStory from '../../../components/games/story-game/game-complete-story';
import GameCompleteStory from '@/components/Games/story-game/game-complete-story';


const StoryGame = () => {
  const storyText =
    "Hello! My name is {0}. I am {1} years old. I live in {2} with my family. I like to eat {3} and my favorite color is {4}.";
  const wordOptions = ["Tom", "10", "pizza", "London", "blue"];
  const correctAnswers = ["Tom", "10", "London", "pizza", "blue"];

  const handleGoBack = () => {
    console.log("Going back...");
  };

  const handleRestart = () => {
    console.log("Restarting the game...");
  };

  const handleComplete = (score) => {
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
