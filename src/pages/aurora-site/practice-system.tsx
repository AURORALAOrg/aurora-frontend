"use client";

import type React from "react";
import { useState } from "react";
import { RotateCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { web3Questions } from "@/components/practices/mock/question";
import QuestionsSection from "@/components/practices/exercies/questions-section";
import TopHeaders from "@/components/practices/exercies/top-headers";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const PracticeSystem: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [scorePercentage, setScorePercentage] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const handleNextQuestion = (selectedAnswer: string | null) => {
    if (
      Number(selectedAnswer) === web3Questions[currentQuestion].correctAnswer
    ) {
      setScore(score + 1);
    }

    if (currentQuestion < web3Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsQuizFinished(true);
    }
    setScorePercentage(
      parseFloat(((score / web3Questions.length) * 100).toFixed(2))
    );
  };

  const handleBackQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReplay = () => {
    setIsQuizFinished(false);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleBack = () => {
    setIsQuizFinished(false);
  };

  return (
    <div className="md:w-[1200px] mx-auto px-4">
      {!isQuizFinished && (
        <TopHeaders
          currentQuestion={currentQuestion}
          totalQuestion={web3Questions.length}
          scorePercentage={scorePercentage}
        />
      )}

      {isQuizFinished ? (
        <div className="flex flex-col items-center text-center py-10 w-full mt-28">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Congratulations! 🎉
          </h2>
          <p className="text-xl text-gray-700 my-3">
            Your Total Obtained Point is{" "}
            <span className="border-2 border-green-500 rounded-lg p-2 ml-2">
              {score} / {web3Questions.length}
            </span>
          </p>
          {/* replay and back button */}
          <div className="flex flex-row items-center">
            <Button
              onClick={handleBack}
              className="bg-blue-500 flex items-center mt-4 mr-6 text-white px-4 py-2 rounded-lg"
            >
              <ArrowLeft className="text-white font-bold mr-2" size={20} />
              back
            </Button>
            <Button
              onClick={handleReplay}
              className="bg-blue-500 flex items-center mt-4 text-white px-4 py-2 rounded-lg"
            >
              <RotateCw className="text-white font-bold mr-2" size={20} />
              Replay
            </Button>
          </div>
        </div>
      ) : (
        <QuestionsSection
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          question={web3Questions[currentQuestion]}
          onAnswerSelect={handleNextQuestion}
        />
      )}

      {!isQuizFinished && (
        <div className="mt-5 flex items-center justify-between w-full">
          {/* Back Button */}
          <Button
            type="button"
            onClick={handleBackQuestion}
            className="text-white bg-gradient-to-br from-blue-700 to-blue-600 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Back
          </Button>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2">
            {web3Questions.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentQuestion ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>

          {/* Next Button */}
          <Button
            type="button"
            onClick={() => handleNextQuestion(selectedAnswer)}
            className="text-white bg-gradient-to-br from-blue-700 to-blue-600 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default PracticeSystem;
