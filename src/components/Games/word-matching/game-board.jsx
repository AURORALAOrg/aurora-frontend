import { useState, useEffect } from "react";
import { questionsApi } from "@/services/questionsApi";
import {
  GAME_SETTINGS,
  DIFFICULTY_SETTINGS,
  WORD_PAIRS,
} from "./mock-data-word-matching/word-matching";
import Card from "@/components/games/word-matching/Card";
import ScoreDisplay from "./score-display";

const levelToDifficulty = {
  A1: "Medium", // 8 pairs, 40s
  A2: "Medium", // 8 pairs, 40s
  B1: "Hard", // 12 pairs, 30s
  B2: "Hard", // 12 pairs, 30s
  C1: "Expert", // 16 pairs, 20s
  C2: "Master", // 20 pairs, 15s
};
const getDifficultySettings = (level) => {
  const difficulty = levelToDifficulty[level] || "Medium";
  return DIFFICULTY_SETTINGS[difficulty];
};

const GameBoard = ({ selectedLevel, onGameOver, onScoreUpdate }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [score, setScore] = useState(0);
  const [wordPairs, setWordPairs] = useState([]);

  const settings = getDifficultySettings(selectedLevel);

  // Initialize game with shuffled cards
  const initializeGame = () => {
    // Select random pairs based on difficulty
    const selectedPairs = [...wordPairs]
      .sort(() => Math.random() - 0.5)
      .slice(0, settings.pairs);

    // Create cards for both English and Spanish words
    const gameCards = selectedPairs
      .flatMap((pair) => [
        { id: pair.id, word: pair.wordEn, language: "en" },
        { id: pair.id, word: pair.wordEs, language: "es" },
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

  // Handle card click
  const handleCardClick = (index) => {
    // Prevent clicking if two cards are already flipped
    if (flippedCards.length === 2) return;

    // Prevent clicking already matched or flipped cards
    if (matchedPairs.includes(cards[index].id) || flippedCards.includes(index))
      return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.id === secondCard.id) {
        // Match found
        setMatchedPairs([...matchedPairs, firstCard.id]);
        setFlippedCards([]);

        // Base points for match
        const newScore = score + GAME_SETTINGS.POINTS.MATCH;
        setScore(newScore);
        onScoreUpdate(newScore);

        // Check for combo bonus
        if (
          matchedPairs.length > 0 &&
          (matchedPairs.length + 1) % GAME_SETTINGS.TIMING.COMBO_THRESHOLD === 0
        ) {
          const bonusScore = newScore + GAME_SETTINGS.POINTS.COMBO_BONUS;
          setScore(bonusScore);
          onScoreUpdate(bonusScore);
        }
      } else {
        // No match - flip cards back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, GAME_SETTINGS.TIMING.CARD_FLIP_DELAY);
      }
    }
  };

  // Fetch questions and initialize game when level changes
  useEffect(() => {
    if (selectedLevel) {
      const fetchQuestions = async () => {
        try {
          const response = await questionsApi.getAllQuestions({
            englishLevel: selectedLevel,
            type: "word-matching",
            difficulty: levelToDifficulty[selectedLevel] || "Medium",
          });

          if (response.data && response.data.length > 0) {
            // Transform API data to expected format
            const transformedPairs = response.data.map((item) => {
              const content = item.content || {};
              return {
                id: item.id,
                wordEn: content.wordEn,
                wordEs: content.wordEs,
              };
            });
            setWordPairs(transformedPairs);
          } else {
            // Fallback to mock data if no API data
            setWordPairs(WORD_PAIRS);
          }
        } catch (error) {
          console.error("Error fetching questions:", error);
          // Fallback to mock data on error
          setWordPairs(WORD_PAIRS);
        }
      };

      fetchQuestions();
    }
  }, [selectedLevel, settings.pairs]);

  // Initialize game when wordPairs change
  useEffect(() => {
    if (wordPairs.length > 0) {
      initializeGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordPairs]);

  // Update timer effect to pass the final score
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onGameOver(score); // Pass the current score when game ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Also end game if all pairs are matched
    if (matchedPairs.length === settings.pairs) {
      clearInterval(timer);
      onGameOver(score);
    }

    return () => clearInterval(timer);
  }, [timeLeft, matchedPairs.length, score, settings.pairs, onGameOver]);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-7xl mx-auto">
      <ScoreDisplay score={score} timeLeft={timeLeft} />
      <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-lg w-full">
        <div className="text-xl font-bold text-gray-900 mb-4">
          Level {selectedLevel} - Time Left: {timeLeft}s
        </div>
        <div className="grid grid-cols-4 gap-4 w-full justify-items-center">
          {cards.map((card, index) => (
            <Card
              key={card.uniqueId}
              card={card}
              isFlipped={flippedCards.includes(index)}
              isMatched={matchedPairs.includes(card.id)}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
