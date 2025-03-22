"\"use client";

import DropZone from "./drop-zone";
import { cn } from "@/lib/utils";

interface StoryRendererProps {
  storyText: string;
  answers: string[];
  onDrop: (index: number, word: string) => void;
}

export default function StoryRenderer({
  storyText,
  answers,
  onDrop,
}: StoryRendererProps) {
  const parts = storyText.split(/({\d+})/g);

  return (
    <div className="flex flex-wrap gap-2 justify-center text-lg">
      {parts.map((part, index) => {
        const match = part.match(/{\d+}/);
        if (match) {
          const placeholderIndex = Number.parseInt(
            part.replace(/[{}]/g, ""),
            10
          );
          return (
            <DropZone
              key={index}
              index={placeholderIndex}
              word={answers[placeholderIndex] || null}
              onDrop={onDrop}
            />
          );
        }

        return (
          <span key={index} className={cn("text-foreground")}>
            {part}
          </span>
        );
      })}
    </div>
  );
}
