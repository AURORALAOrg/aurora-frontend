"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import LevelSelector from "./LevelSelector"
import { questionsApi } from "@/services/questionsApi"

const QuizGame = () => {
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState(0)

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
      // Fetch questions for the selected level - get random questions by not specifying type
      const response = await questionsApi.getAllQuestions({
        englishLevel: level,
      })

      if (response.data && response.data.length > 0) {
        // Shuffle questions to make them random
        const shuffledQuestions = [...response.data].sort(() => Math.random() - 0.5)
        setQuestions(shuffledQuestions)
        setCurrentQuestionIndex(0)
        setScore(0)
        setAnsweredQuestions(0)
        setShowAnswer(false)
      } else {
        setError("No questions available for this level.")
        setQuestions([])
      }
    } catch (err) {
      setError("Failed to fetch questions. Please try again.")
      console.error("Error fetching questions:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSubmit = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = selectedAnswer === currentQuestion.content.correctAnswer

    if (isCorrect) {
      setScore(score + 1)
    }

    setAnsweredQuestions(answeredQuestions + 1)
    setShowAnswer(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setShowAnswer(false)
    }
  }

  const handleRestart = () => {
    setSelectedLevel(null)
    setQuestions([])
    setCurrentQuestionIndex(0)
    setScore(0)
    setAnsweredQuestions(0)
    setShowAnswer(false)
  }

  const renderQuestion = () => {
    if (questions.length === 0) return null

    const question = questions[currentQuestionIndex]
    const content = question.content

    // Handle different question types
    switch (question.metadata?.type) {
      case "multiple-choice":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{content.question}</h3>

            {!showAnswer && (
              <div className="space-y-2">
                {/* Combine correct and wrong answers, then shuffle */}
                {[content.correctAnswer, ...(content.wrongAnswers || [])]
                  .sort(() => Math.random() - 0.5)
                  .map((answer, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start bg-transparent"
                      onClick={() => handleAnswerSubmit(answer)}
                    >
                      {answer}
                    </Button>
                  ))}
              </div>
            )}

            {showAnswer && (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-semibold text-green-800">Correct Answer: {content.correctAnswer}</p>
                  {content.explanation && <p className="mt-2 text-green-700">{content.explanation}</p>}
                </div>
              </div>
            )}
          </div>
        )

      case "sentence-builder":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Complete Sentence</h3>
            <p className="text-gray-600">Target: {content.sentence}</p>

            {!showAnswer && (
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => handleAnswerSubmit(content.sentence)}
              >
                Show Answer
              </Button>
            )}

            {showAnswer && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-semibold text-blue-800">Sentence: {content.sentence}</p>
                  {content.explanation && <p className="mt-2 text-blue-700">{content.explanation}</p>}
                </div>
              </div>
            )}
          </div>
        )

      case "fill-in-blanks":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Fill in the Blanks</h3>
            <p className="text-gray-600">{content.sentence}</p>
            {content.hint && <p className="text-sm text-gray-500">Hint: {content.hint}</p>}

            {!showAnswer && (
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => handleAnswerSubmit(content.correctAnswer)}
              >
                Show Answer
              </Button>
            )}

            {showAnswer && (
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="font-semibold text-purple-800">Answer: {content.correctAnswer}</p>
                  {content.explanation && <p className="mt-2 text-purple-700">{content.explanation}</p>}
                </div>
              </div>
            )}
          </div>
        )

      default:
        return <div className="text-center text-gray-500">Unsupported question type: {question.metadata?.type}</div>
    }
  }

  // Show level selector if no level is selected
  if (!selectedLevel) {
    return <LevelSelector onLevelSelect={setSelectedLevel} />
  }

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
        <p>Loading questions for level {selectedLevel}...</p>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => setSelectedLevel(null)}>Back to Level Selection</Button>
      </div>
    )
  }

  // Show completion state
  if (answeredQuestions === questions.length && questions.length > 0) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <Card className="max-w-2xl mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-center">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-green-600">{percentage}%</div>
          <p>
            You scored {score} out of {questions.length} questions correct!
          </p>
          <p className="text-sm text-gray-600">Level: {selectedLevel}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={handleRestart}>Try Different Level</Button>
            <Button variant="outline" onClick={() => fetchQuestionsForLevel(selectedLevel)}>
              Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Show main game interface
  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>English Practice - Level {selectedLevel}</CardTitle>
          <div className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
        <div className="text-sm text-gray-600">
          Score: {score}/{answeredQuestions}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderQuestion()}

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleRestart}>
            Change Level
          </Button>

          {showAnswer && currentQuestionIndex < questions.length - 1 && (
            <Button onClick={handleNextQuestion}>Next Question</Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default QuizGame
