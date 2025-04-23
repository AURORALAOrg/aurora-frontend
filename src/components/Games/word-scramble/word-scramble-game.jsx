import { useState, useMemo, useCallback } from "react";
import WordScrambleDifficultySelector from "@/components/Games/word-scramble/difficulty-selector";
import ResultModal from "@/components/Games/word-scramble/result-modal";
import { words } from "@/lib/constants/mock-data/word-list";
import { IoMdArrowRoundBack } from "react-icons/io";
import { PiSpeakerSimpleNone } from "react-icons/pi";

const WordScrambleGame = () => {
  const [endGame, setEndGame] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [correct, setCorrect] = useState(null);
  const [moves, setMoves] = useState(0);

  const filteredWords = useMemo(
    () => words.filter((word) => word.level === difficulty),
    [difficulty]
  );

  const currentWord = filteredWords[index] || {
    scrambled: "N/A",
    word: "N/A",
    hint: "No hint available",
  };

  const resetGame = useCallback(() => {
    setMoves(0);
    setIndex(0);
    setEndGame(false);
    setCorrect(null);
    setInput("");
  }, []);

  const handleCheck = () => {
    if (!input) return;

    if (input.toUpperCase() === currentWord.word.toUpperCase()) {
      setCorrect(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % filteredWords.length);
        setInput("");
        setCorrect(null);
        setMoves((prev) => prev + 1);
      }, 1000);
    } else {
      setCorrect(false);
      setMoves((prev) => prev + 1);
    }

    if (index + 1 === filteredWords.length) {
      setEndGame(true);
    }
  };

  const speakWord = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.lang = "en-US";
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis is not supported in this browser.");
    }
  };

  if (!difficulty) {
    return (
      <div className="p-6">
        <WordScrambleDifficultySelector onSelectDifficulty={setDifficulty} />
      </div>
    );
  }

  return (
    <>
      {endGame ? (
        <ResultModal
          totalMoves={moves}
          startAgain={resetGame}
          returnToGame={() => setEndGame(false)}
        />
      ) : (
        <div className="bg-white pt-0 rounded-2xl shadow-lg text-center max-w-md mx-auto animate-popup">
          <div className="flex items-center justify-between border-b mb-5 p-6 text-sm">
            <IoMdArrowRoundBack
              className="fill-blue-500 cursor-pointer"
              onClick={resetGame}
            />
            <span className="text-blue-500 space-x-2">
              Moves:{" "}
              <span className="font-extrabold text-[15px] ml-1"> {moves} </span>
              <span>
                Words:
                <span className="font-extrabold text-[15px] ml-1">
                  {index + 1}/{filteredWords.length}
                </span>
              </span>
            </span>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-500">
              {currentWord.scrambled}
            </h2>
            <div
              className="flex items-center text-[12px] space-x-3 w-fit mx-auto my-5 text-blue-500 cursor-pointer"
              onClick={speakWord}
            >
              <PiSpeakerSimpleNone />
              <span>Listen</span>
            </div>
            <p className="text-gray-500 mt-2 text-sm">
              Hint: {currentWord.hint}
            </p>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type the correct word..."
              aria-label="Word input"
              className="w-full p-2 outline-none border border-blue-500 rounded-lg mt-4 text-center bg-transparent text-gray-600 placeholder:text-gray-600"
            />
            <button
              onClick={handleCheck}
              aria-label="Check word"
              className="w-full mt-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold"
            >
              Check
            </button>
            {correct === true && (
              <p className="text-green-500 animate-popup mt-8 bg-green-100 py-2 rounded-lg font-semibold">
                Correct!
              </p>
            )}
            {correct === false && (
              <p className="text-red-500 animate-popup mt-8 bg-red-100 py-2 rounded-lg font-semibold">
                Try Again
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WordScrambleGame;
