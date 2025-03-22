"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CardData {
  id: string;
  imageId: string;
  type: "text" | "image";
  value: string;
  flipped: boolean;
  matched: boolean;
}

interface FlipCardProps {
  card: CardData;
  onCardClick: (card: CardData) => void;
  disabled: boolean;
}

export default function FlipCard({
  card,
  onCardClick,
  disabled,
}: FlipCardProps) {
  const handleClick = () => {
    if (!disabled && !card.flipped && !card.matched) {
      onCardClick(card);
    }
  };

  return (
    <div
      className="aspect-square [perspective:1000px] cursor-pointer w-full max-w-[150px] mx-auto"
      onClick={handleClick}
    >
      <div
        className={cn(
          "relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d]",
          card.flipped && "[transform:rotateY(180deg)]"
        )}
      >
        <Card className="absolute inset-0">
          <CardContent className="h-full w-full p-0 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl bg-primary rounded-xl">
            ?
          </CardContent>
        </Card>

        <Card className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <CardContent className="h-full w-full p-2 flex items-center justify-center bg-white rounded-xl">
            {card.type === "text" ? (
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-center">
                {card.value}
              </span>
            ) : (
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                {card.value}
              </span>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
