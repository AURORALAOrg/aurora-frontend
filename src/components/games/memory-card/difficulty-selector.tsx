"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEVELS } from "./mock/memory-levels";

export default function DifficultySelector() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/games"
        className="text-primary hover:text-primary-dark mb-2 inline-flex items-center"
      >
        <ChevronLeft className="w-6 h-6 mr-2" />
        Back to Games
      </Link>

      <h1 className="text-3xl font-bold text-center mb-2 text-primary">
        Memory Card Game
      </h1>

      <p className="text-center mb-8 text-primary max-w-md mx-auto">
        This game is designed to help you improve your memory and concentration,
        the more you play, the better you will get.
      </p>

      <h2 className="text-2xl text-center mb-12 text-primary font-bold">
        Select Difficulty Level
      </h2>

      <div className="max-w-xs mx-auto space-y-4">
        {Object.values(LEVELS).map((level) => (
          <Button
            key={level.id}
            asChild
            variant="default"
            className="w-full p-4 text-center"
          >
            <Link href={`/games/memory-card/${level.id}`}>
              {level.name} ({level.label})
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
