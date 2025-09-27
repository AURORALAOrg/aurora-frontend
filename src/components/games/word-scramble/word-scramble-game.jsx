
use client;
import { useState, useMemo, useCallback } from "react";
import WordScrambleDifficultySelector from "@/components/games/word-scramble/difficulty-selector";
import ResultModal from "@/components/games/word-scramble/result-modal";
import { words } from "@/lib/constants/mock-data/word-list";
import { ArrowLeft, Volume2 } from "lucide-react";


const WordScrambleGame = () => {
  const [endGame, setEndGame] = useState(false)
  const [difficulty, setDifficulty] = useState(null)
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState("")
  const [correct, setCorrect] = useState(null)
  const [moves, setMoves] = useState(0)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const scrambleWord = (word) => {
    const letters = word.split("")
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[letters[i], letters[j]] = [letters[j], letters[i]]
    }
    return letters.join("")
  }

  const convertQuestionsToWords = (apiQuestions) => {
    return apiQuestions.map((question) => {
      let word = ""
      let hint = ""

      if (question.type === "multiple-choice" && question.correctAnswer) {
        word = question.correctAnswer.toUpperCase()
        hint = question.question || "Find the correct word"
      } else if (question.sentence) {
        // Extract words from sentence for scrambling
        const words = question.sentence.split(" ").filter((w) => w.length > 3)
        word = words[Math.floor(Math.random() * words.length)].replace(/[^\w]/g, "").toUpperCase()
        hint = question.explanation || question.sentence
      } else if (question.words && question.words.length > 0) {
        word = question.words[Math.floor(Math.random() * question.words.length)].toUpperCase()
        hint = question.explanation || "Unscramble this word"
      }

      return {
        word: word || "WORD",
        scrambled: scrambleWord(word || "WORD"),
        hint: hint || "No hint available",
        level: difficulty,
      }
    })
  }

  useEffect(() => {
    if (difficulty) {
      setLoading(true)
      setError(null)

      questionsApi
        .getAllQuestions({
          englishLevel: difficulty,
        })
        .then((response) => {
          console.log("[v0] Fetched questions:", response.data)
          if (response.data && response.data.length > 0) {
            const convertedWords = convertQuestionsToWords(response.data)
            setQuestions(convertedWords)
          } else {
            setError("No questions available for this level")
          }
        })
        .catch((err) => {
          console.error("[v0] Error fetching questions:", err)
          setError("Failed to load questions")
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [difficulty])

  const currentWord = questions[index] || {
    scrambled: "N/A",
    word: "N/A",
    hint: "No hint available",
  }

  const resetGame = useCallback(() => {
    setMoves(0)
    setIndex(0)
    setEndGame(false)
    setCorrect(null)
    setInput("")
  }, [])

  const handleCheck = () => {
    if (!input) return

    if (input.toUpperCase() === currentWord.word.toUpperCase()) {
      setCorrect(true)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % questions.length)
        setInput("")
        setCorrect(null)
        setMoves((prev) => prev + 1)
      }, 1000)
    } else {
      setCorrect(false)
      setMoves((prev) => prev + 1)
    }

    if (index + 1 === questions.length) {
      setEndGame(true)
    }
  }

  const speakWord = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word)
      utterance.lang = "en-US"
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    } else {
      alert("Speech synthesis is not supported in this browser.")
    }
  }

  if (!difficulty) {
    return (
      <div className="p-6">
        <LevelSelector onLevelSelect={setDifficulty} />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-white pt-0 rounded-2xl shadow-lg text-center max-w-md mx-auto animate-popup p-6">
        <p className="text-blue-500">Loading questions...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white pt-0 rounded-2xl shadow-lg text-center max-w-md mx-auto animate-popup p-6">
        <p className="text-red-500">{error}</p>
        <button onClick={() => setDifficulty(null)} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg">
          Back to Level Selection
        </button>
      </div>
    )
  }

  return (
    <>
      {endGame ? (
        <ResultModal totalMoves={moves} startAgain={resetGame} returnToGame={() => setEndGame(false)} />
      ) : (
        <div className="bg-white pt-0 rounded-2xl shadow-lg text-center max-w-md mx-auto animate-popup">
          <div className="flex items-center justify-between border-b mb-5 p-6 text-sm">

            <IoMdArrowRoundBack className="fill-blue-500 cursor-pointer" onClick={() => setDifficulty(null)} />
            <span className="text-blue-500 space-x-2">
              Moves: <span className="font-extrabold text-[15px] ml-1"> {moves} </span>
              <span>
                Words:
                <span className="font-extrabold text-[15px] ml-1">
                  {index + 1}/{questions.length}
                </span>
              </span>
            </span>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-500">{currentWord.scrambled}</h2>
            <div
              className="flex items-center text-[12px] space-x-3 w-fit mx-auto my-5 text-blue-500 cursor-pointer"
              onClick={speakWord}
            >
              <Volume2 />
              <span>Listen</span>
            </div>
            <p className="text-gray-500 mt-2 text-sm">Hint: {currentWord.hint}</p>
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
              <p className="text-green-500 animate-popup mt-8 bg-green-100 py-2 rounded-lg font-semibold">Correct!</p>
            )}
            {correct === false && (
              <p className="text-red-500 animate-popup mt-8 bg-red-100 py-2 rounded-lg font-semibold">Try Again</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default WordScrambleGame
