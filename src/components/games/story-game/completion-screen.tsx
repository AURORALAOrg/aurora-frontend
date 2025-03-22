"use client";

import { Trophy, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CompletionScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export default function CompletionScreen({
  score,
  total,
  onRestart,
}: CompletionScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <Trophy className="text-yellow-500 h-16 w-16 mb-2" />
          <CardTitle className="text-2xl font-bold">Story Completed!</CardTitle>
        </CardHeader>

        <CardContent className="text-center">
          <p className="text-lg text-muted-foreground">
            Your Score:{" "}
            <span className="font-semibold text-foreground">
              {score}/{total}
            </span>
          </p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            onClick={onRestart}
            className="px-6 py-2 flex items-center gap-2"
            variant="default"
          >
            <RotateCw className="h-4 w-4" /> Play Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
