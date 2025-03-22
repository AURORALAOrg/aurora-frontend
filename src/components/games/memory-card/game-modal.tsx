"\"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Gamepad2, Trophy } from "lucide-react";

interface GameModalProps {
  moves: number;
  onPlayAgain: () => void;
}

export default function GameModal({ moves, onPlayAgain }: GameModalProps) {
  const router = useRouter();

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl flex flex-col items-center gap-2">
            <Trophy className="h-12 w-12 text-yellow-500" />
            Congratulations! 🎉
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            You completed the game in {moves} moves
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-center">
          <Button
            onClick={onPlayAgain}
            className="w-full sm:w-auto"
            variant="default"
          >
            <Gamepad2 className="w-5 h-5 mr-2" />
            Play Again
          </Button>
          <Button
            onClick={() => router.push("/games/memory-card")}
            className="w-full sm:w-auto"
            variant="outline"
          >
            Back to Levels
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
