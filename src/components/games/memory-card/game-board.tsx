"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Clock,
  Gamepad2Icon as GameController2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import GameModal from "./game-modal";
import FlipCard from "./flip-card";
import { LEVELS } from "./mock/memory-levels";

interface CardData {
  id: string;
  imageId: string;
  type: "text" | "image";
  value: string;
  flipped: boolean;
  matched: boolean;
}

interface GameBoardProps {
  levelId: string;
}

const getRandomPairs = (cards: CardData[], numPairs = 8): CardData[] => {
  const textCards = cards.filter((card) => card.type === "text");
  const shuffledTextCards = [...textCards].sort(() => Math.random() - 0.5);
  const selectedTextCards = shuffledTextCards.slice(0, numPairs);

  const selectedPairs = selectedTextCards.flatMap((textCard) => {
    const imageCard = cards.find(
      (card) => card.type === "image" && card.imageId === textCard.imageId
    );
    return imageCard ? [textCard, imageCard] : [];
  });

  return selectedPairs.sort(() => Math.random() - 0.5);
};

export default function GameBoard({ levelId }: GameBoardProps) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardData[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const levelKey = levelId.toUpperCase();
    const levelCards = LEVELS[levelKey]?.cards || [];
    const randomPairs = getRandomPairs(levelCards);
    setCards(randomPairs);
    setMoves(0);
    setMatches(0);
    setSelectedCards([]);
    setShowModal(false);
  }, [levelId]);

  const handleCardClick = (card: CardData) => {
    if (selectedCards.length < 2 && !card.flipped && !card.matched) {
      const newCards = cards.map((c) =>
        c.id === card.id ? { ...c, flipped: true } : c
      );
      setCards(newCards);

      const newSelectedCards = [...selectedCards, card];
      setSelectedCards(newSelectedCards);

      if (newSelectedCards.length === 2) {
        setMoves((prev) => prev + 1);
        checkMatch(newSelectedCards);
      }
    }
  };

  const checkMatch = (selected: CardData[]) => {
    setTimeout(() => {
      const newCards = cards.map((card) => {
        const isSelected = selected.find((s) => s.id === card.id);
        if (selected[0].imageId === selected[1].imageId) {
          return isSelected ? { ...card, matched: true, flipped: true } : card;
        } else {
          return isSelected ? { ...card, flipped: false } : card;
        }
      });

      setCards(newCards);

      if (selected[0].imageId === selected[1].imageId) {
        setMatches((prev) => {
          const newMatches = prev + 1;
          if (newMatches === 8) {
            setShowModal(true);
          }
          return newMatches;
        });
      }

      setSelectedCards([]);
    }, 1000);
  };

  const resetGame = () => {
    const levelKey = levelId.toUpperCase();
    const levelCards = LEVELS[levelKey]?.cards || [];
    const randomPairs = getRandomPairs(levelCards);
    setCards(randomPairs);
    setMoves(0);
    setMatches(0);
    setShowModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <Link
        href="/games/memory-card"
        className="text-primary hover:text-primary/80 mb-4 inline-flex items-center"
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Back to Levels
      </Link>

      <Card className="p-4 max-w-md mx-auto mb-4">
        <div className="flex justify-between mb-4">
          <div className="text-lg flex items-center text-primary">
            <Clock className="w-5 h-5 mr-2" />
            Moves: {moves}
          </div>
          <div className="text-lg flex items-center text-primary">
            <GameController2 className="w-5 h-5 mr-2" />
            Matches: {matches}/8
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {cards.map((card) => (
            <FlipCard
              key={card.id}
              card={card}
              onCardClick={handleCardClick}
              disabled={selectedCards.length === 2}
            />
          ))}
        </div>
      </Card>

      {showModal && <GameModal moves={moves} onPlayAgain={resetGame} />}
    </div>
  );
}
