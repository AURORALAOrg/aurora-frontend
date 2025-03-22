"use client";

import { Button } from "@/components/ui/button";
import { DIFFICULTY_SETTINGS } from "./mock/word-matching";

interface DifficultySelectorProps {
  onSelect: (difficulty: string) => void;
  currentDifficulty: string | null;
}

export default function DifficultySelector({
  onSelect,
  currentDifficulty,
}: DifficultySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {Object.keys(DIFFICULTY_SETTINGS).map((level) => (
        <Button
          key={level}
          onClick={() => onSelect(level)}
          variant={currentDifficulty === level ? "default" : "outline"}
          className="transition-colors"
        >
          {level}
        </Button>
      ))}
    </div>
  );
}
