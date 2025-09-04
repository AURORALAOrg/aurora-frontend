"use client"

import { useState, useEffect } from "react"
import LevelSelector from "./LevelSelector"
import ProgressHeader from "./ProgressHeader"
import QuestionRenderer from "./QuestionRenderer"
import ResultModal from "./ResultModal"
import { questionsApi } from "@/services/questionsApi"

const Games = () => {
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [isCorrect, setIsCorrect] = useState(null)

  // Fetch questions when level is selected
  useEffect(() => {
    if (selectedLevel) {
      fetchQuestionsForLevel(selectedLevel)
    }
  }, [selectedLevel])

  const fetchQuestionsForLevel = async (level) => {
    setLoading(true)
    setError(null)
    try {
      console.log("[v0] Fetching questions for level:", level)
      const response = await questionsApi.getAllQuestions({
        englishLevel: level,
      })

      console.log("[v0] API response:", response)

      if (response.data && response.data.length > 0) {
        const shuffledQuestions = [...response.data].sort(() => Math.random() - 0.5)
        setQuestions(shuffledQuestions)
        setCurrentQuestionIndex(0)
        setScore(0)
        setAnsweredQuestions(0)
        setShowAnswer(false)
        setIsCorrect(null)
      } else {
        setError("No questions available for this level.")
        setQuestions([])
      }
    } catch (err) {
      setError("Failed to fetch questions. Please try again.")
      console.error("[v0] Error fetching questions:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSubmit = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex]
    const correct = selectedAnswer === currentQuestion.content.correctAnswer

    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
    }

    setAnsweredQuestions(answeredQuestions + 1)
    setShowAnswer(true)

    // Auto advance after showing answer
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setShowAnswer(false)
        setIsCorrect(null)
      }
    }, 2000)
  }

  const handleRestart = () => {
    setSelectedLevel(null)
    setQuestions([])
    setCurrentQuestionIndex(0)
    setScore(0)
    setAnsweredQuestions(0)
    setShowAnswer(false)
    setIsCorrect(null)
  }

  const handlePlayAgain = () => {
    fetchQuestionsForLevel(selectedLevel)
  }

  // Show level selector if no level is selected
  if (!selectedLevel) {
    return <LevelSelector onLevelSelect={setSelectedLevel} />
  }

  // Show loading state
  if (loading) {
    return (
      <div className="bg-white pt-0 rounded-2xl shadow-lg text-center max-w-md mx-auto animate-popup">
        <div className="p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-blue-500 font-semibold">Loading questions for level {selectedLevel}...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-white pt-0 rounded-2xl shadow-lg text-center max-w-md mx-auto animate-popup">
        <div className="p-8">
          <p className="text-red-500 mb-6 font-semibold">{error}</p>
          <button
            onClick={() => setSelectedLevel(null)}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition-colors"
          >
            Back to Level Selection
          </button>
        </div>
      </div>
    )
  }

  // Show completion state
  if (answeredQuestions === questions.length && questions.length > 0) {
    return (
      <ResultModal
        score={score}
        totalQuestions={questions.length}
        level={selectedLevel}
        onRestart={handleRestart}
        onPlayAgain={handlePlayAgain}
      />
    )
  }

  // Show main game interface
  return (
    <div className="bg-white pt-0 rounded-2xl shadow-lg text-center max-w-md mx-auto animate-popup">
      <ProgressHeader
        onBack={handleRestart}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        score={score}
        moves={answeredQuestions}
      />

      <div className="p-6">
        {questions.length > 0 && (
          <QuestionRenderer
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswerSubmit}
            showAnswer={showAnswer}
            isCorrect={isCorrect}
          />
        )}
      </div>
    </div>
  )
}

export default Games
