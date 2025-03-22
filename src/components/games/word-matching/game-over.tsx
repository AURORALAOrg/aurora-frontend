"use client";

import { useRouter } from "next/navigation";
import { Trophy, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface GameOverProps {
  score: number;
  onPlayAgain: () => void;
}

export default function GameOver({ score, onPlayAgain }: GameOverProps) {
  const router = useRouter();

  const handleReturn = () => {
    router.push("/games/world-matching");
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border bg-card">
      <CardContent className="pt-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">Game Over!</h2>

        <div className="mb-6">
          <p className="text-muted-foreground mb-2">Your Score</p>
          <p className="text-4xl font-bold text-primary">{score}</p>
        </div>

        {score > 500 && (
          <div className="mt-6 p-4 bg-green-500/20 rounded-lg">
            <p className="text-green-500 font-medium">
              Congratulations! You're doing great! 🎉
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pb-6">
        <Button onClick={onPlayAgain} className="w-full" variant="default">
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </Button>

        <Button onClick={handleReturn} className="w-full" variant="outline">
          <Home className="w-5 h-5 mr-2" />
          Return to Levels
        </Button>
      </CardFooter>
    </Card>
  );
}
