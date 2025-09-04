"use client"

import { useState } from "react"
import { PiSpeakerSimpleNone } from "react-icons/pi"

const QuestionRenderer = ({ question, onAnswer, showAnswer, isCorrect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const content = question.content

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-US"
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    } else {
      alert("Speech synthesis is not supported in this browser.")
    }
  }

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer)
    onAnswer(answer)
  }

  // Reset selected answer when question changes
  if (!showAnswer && selectedAnswer) {
    setSelectedAnswer(null)
  }

  switch (question.metadata?.type) {
    case "multiple-choice":
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">{content.question}</h2>
            <div
              className="flex items-center text-[12px] space-x-3 w-fit mx-auto mb-6 text-blue-500 cursor-pointer hover:text-blue-600"
              onClick={() => speakText(content.question)}
            >
              <PiSpeakerSimpleNone />
              <span>Listen</span>
            </div>
          </div>

          {!showAnswer && (
            <div className="space-y-3">
              {[content.correctAnswer, ...(content.wrongAnswers || [])]
                .sort(() => Math.random() - 0.5)
                .map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(answer)}
                    className="w-full p-3 text-left border border-blue-500 rounded-lg hover:bg-blue-50 transition-colors bg-transparent text-gray-600"
                  >
                    {answer}
                  </button>
                ))}
            </div>
          )}

          {showAnswer && (
            <div
              className={`animate-popup p-4 rounded-lg font-semibold ${
                isCorrect ? "text-green-500 bg-green-100" : "text-red-500 bg-red-100"
              }`}
            >
              <p className="mb-2">
                {isCorrect ? "Correct!" : `Incorrect. The correct answer is: ${content.correctAnswer}`}
              </p>
              {content.explanation && <p className="text-sm opacity-80">{content.explanation}</p>}
            </div>
          )}
        </div>
      )

    case "sentence-builder":
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">Complete the Sentence</h2>
            <p className="text-gray-500 text-sm mb-4">Target: {content.sentence}</p>
            <div
              className="flex items-center text-[12px] space-x-3 w-fit mx-auto mb-6 text-blue-500 cursor-pointer hover:text-blue-600"
              onClick={() => speakText(content.sentence)}
            >
              <PiSpeakerSimpleNone />
              <span>Listen</span>
            </div>
          </div>

          {!showAnswer && (
            <button
              onClick={() => handleAnswerClick(content.sentence)}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition-colors"
            >
              Show Answer
            </button>
          )}

          {showAnswer && (
            <div className="animate-popup p-4 bg-blue-100 rounded-lg">
              <p className="font-semibold text-blue-800 mb-2">Sentence: {content.sentence}</p>
              {content.explanation && <p className="text-blue-700 text-sm">{content.explanation}</p>}
            </div>
          )}
        </div>
      )

    case "fill-in-blanks":
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">Fill in the Blanks</h2>
            <p className="text-gray-600 mb-2">{content.sentence}</p>
            {content.hint && <p className="text-gray-500 text-sm mb-4">Hint: {content.hint}</p>}
            <div
              className="flex items-center text-[12px] space-x-3 w-fit mx-auto mb-6 text-blue-500 cursor-pointer hover:text-blue-600"
              onClick={() => speakText(content.sentence)}
            >
              <PiSpeakerSimpleNone />
              <span>Listen</span>
            </div>
          </div>

          {!showAnswer && (
            <button
              onClick={() => handleAnswerClick(content.correctAnswer)}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition-colors"
            >
              Show Answer
            </button>
          )}

          {showAnswer && (
            <div className="animate-popup p-4 bg-purple-100 rounded-lg">
              <p className="font-semibold text-purple-800 mb-2">Answer: {content.correctAnswer}</p>
              {content.explanation && <p className="text-purple-700 text-sm">{content.explanation}</p>}
            </div>
          )}
        </div>
      )

    default:
      return (
        <div className="text-center text-gray-500 p-8">
          <p>Unsupported question type: {question.metadata?.type}</p>
        </div>
      )
  }
}

export default QuestionRenderer
