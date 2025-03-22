"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GAME_SETTINGS, WORD_PAIRS } from "./mock/word-matching";
import LanguageCard from "./card";
import ScoreDisplay from "./score-display";

interface CardData {
  id: number;
  word: string;
  language: "en" | "es";
  uniqueId: number;
}

interface GameBoardProps {
  difficulty: string;
  settings: {
    pairs: number;
    time: number;
  };
  onGameOver: (score: number) => void;
  onScoreUpdate: (score: number) => void;
}

export default function GameBoard({
  difficulty,
  settings,
  onGameOver,
  onScoreUpdate,
}: GameBoardProps) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(settings.time);
  const [score, setScore] = useState(0);

  const initializeGame = () => {
    const selectedPairs = [...WORD_PAIRS]
      .sort(() => Math.random() - 0.5)
      .slice(0, settings.pairs);

    const gameCards = selectedPairs
      .flatMap((pair) => [
        { id: pair.id, word: pair.wordEn, language: "en" as const },
        { id: pair.id, word: pair.wordEs, language: "es" as const },
      ])
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        uniqueId: index,
      }));

    setCards(gameCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setTimeLeft(settings.time);
    setScore(0);
  };

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2) return;

    if (matchedPairs.includes(cards[index].id) || flippedCards.includes(index))
      return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.id === secondCard.id) {
        setMatchedPairs([...matchedPairs, firstCard.id]);
        setFlippedCards([]);

        const newScore = score + GAME_SETTINGS.POINTS.MATCH;
        setScore(newScore);
        onScoreUpdate(newScore);

        if (
          matchedPairs.length > 0 &&
          (matchedPairs.length + 1) % GAME_SETTINGS.TIMING.COMBO_THRESHOLD === 0
        ) {
          const bonusScore = newScore + GAME_SETTINGS.POINTS.COMBO_BONUS;
          setScore(bonusScore);
          onScoreUpdate(bonusScore);
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, GAME_SETTINGS.TIMING.CARD_FLIP_DELAY);
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onGameOver(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    if (matchedPairs.length === settings.pairs) {
      clearInterval(timer);
      onGameOver(score);
    }

    return () => clearInterval(timer);
  }, [timeLeft, matchedPairs.length, score, settings.pairs, onGameOver]);

  useEffect(() => {
    initializeGame();
  }, [difficulty, settings.pairs, settings.time]);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-7xl mx-auto">
      <ScoreDisplay score={score} timeLeft={timeLeft} />
      <Card className="w-full">
        <CardContent className="flex flex-col items-center gap-4 p-8">
          <div className="text-xl font-bold text-foreground mb-4">
            Time Left: {timeLeft}s
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full justify-items-center">
            {cards.map((card, index) => (
              <LanguageCard
                key={card.uniqueId}
                card={card}
                isFlipped={flippedCards.includes(index)}
                isMatched={matchedPairs.includes(card.id)}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
