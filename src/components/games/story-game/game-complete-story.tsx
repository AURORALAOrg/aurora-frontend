"use client";

import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ArrowLeft, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StoryRenderer from "./story-renderer";
import DraggableWord from "./draggable-word";
import CompletionScreen from "./completion-screen";

interface GameCompleteStoryProps {
  storyText: string;
  wordOptions: string[];
  correctAnswers: string[];
  onGoBack?: () => void;
  onRestart?: () => void;
  onComplete?: (score: number) => void;
}

export default function GameCompleteStory({
  storyText,
  wordOptions,
  correctAnswers,
  onGoBack,
  onRestart,
  onComplete,
}: GameCompleteStoryProps) {
  const [answers, setAnswers] = useState<string[]>(
    Array(correctAnswers.length).fill("")
  );
  const [score, setScore] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (answers.every((answer) => answer !== "")) {
      const calculatedScore = answers.filter(
        (answer, index) => answer === correctAnswers[index]
      ).length;
      setScore(calculatedScore);
      setCompleted(true);
      if (onComplete) onComplete(calculatedScore);
    }
  }, [answers, correctAnswers, onComplete]);

  const handleDrop = (index: number, word: string) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = word;
      return newAnswers;
    });
  };

  const restartGame = () => {
    setAnswers(Array(correctAnswers.length).fill(""));
    setScore(null);
    setCompleted(false);
    if (onRestart) onRestart();
  };

  if (completed && score !== null) {
    return (
      <CompletionScreen
        score={score}
        total={correctAnswers.length}
        onRestart={restartGame}
      />
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Card className="relative p-6 min-h-screen flex flex-col items-center shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 text-primary hover:text-primary/80"
          onClick={onGoBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <h2 className="text-2xl font-bold mb-4">Complete the Story</h2>
        <p className="text-muted-foreground mb-6">
          Drag and drop the words to complete the story
        </p>

        <Card className="bg-muted/50 p-4 rounded shadow-md mb-6 w-full max-w-2xl text-center">
          <StoryRenderer
            storyText={storyText}
            answers={answers}
            onDrop={handleDrop}
          />
        </Card>

        <div className="flex items-center gap-4 justify-center">
          <div className="flex flex-wrap gap-4">
            {wordOptions.map((word, index) => (
              <DraggableWord
                key={index}
                word={word}
                disabled={answers.includes(word)}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full"
            onClick={restartGame}
          >
            <RotateCw className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </DndProvider>
  );
}
