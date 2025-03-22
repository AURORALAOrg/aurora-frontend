"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardData {
  id: number;
  word: string;
  language: "en" | "es";
}

interface LanguageCardProps {
  card: CardData;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export default function LanguageCard({
  card,
  isFlipped,
  isMatched,
  onClick,
}: LanguageCardProps) {
  return (
    <div className="relative" style={{ perspective: "1000px" }}>
      <motion.div
        className={cn(
          "w-48 h-20 cursor-pointer rounded-lg flex flex-col items-center justify-center",
          isMatched
            ? "bg-green-500 text-white"
            : isFlipped
            ? "bg-primary text-primary-foreground"
            : "bg-primary/10 hover:bg-primary/20"
        )}
        onClick={onClick}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          transition: { duration: 0.3 },
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front side (question mark) */}
        <div
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: isMatched ? "rotateY(180deg)" : "none",
          }}
        >
          {!isFlipped && !isMatched && (
            <span className="text-primary text-2xl font-bold">?</span>
          )}
        </div>

        <div
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: isMatched ? "none" : "rotateY(180deg)",
          }}
        >
          {(isFlipped || isMatched) && (
            <div className="flex flex-col items-center">
              <span className="text-sm mb-1">
                {card.language === "en" ? "🇺🇸" : "🇪🇸"}
              </span>
              <span className="text-center px-2 text-sm font-medium">
                {card.word}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
