"use client";

import { Timer, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ScoreDisplayProps {
  score: number;
  timeLeft: number;
  maxTime?: number;
}

export default function ScoreDisplay({
  score,
  timeLeft,
  maxTime = 40,
}: ScoreDisplayProps) {
  const progressPercentage = (timeLeft / maxTime) * 100;

  return (
    <div className="w-full max-w-4xl mb-6 relative">
      <Card className="border-0 bg-card">
        <CardContent className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-xl font-bold text-foreground">{score}</p>
            </div>
          </div>

          <div className="flex-1 max-w-[200px] mx-6">
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Timer className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time Left</p>
              <p className="text-xl font-bold text-foreground">{timeLeft}s</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {score > 0 && score % 200 === 0 && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg animate-bounce">
          <p className="font-bold">Combo! +50</p>
        </div>
      )}
    </div>
  );
}
