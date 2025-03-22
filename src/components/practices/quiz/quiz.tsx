"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, XCircle, RefreshCw, Home } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  feedback: string;
}

interface QuizProps {
  questions: QuizQuestion[];
}

export default function Quiz({ questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (option: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(option);
      if (option === questions[currentQuestion].answer) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
  };

  const progressPercentage = (currentQuestion / questions.length) * 100;

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardContent className="p-6">
        {showResults ? (
          <div className="text-center">
            <h2 className="text-xl font-bold">Quiz Completed!</h2>
            <p className="text-2xl mt-2 font-bold text-primary">
              Score: {Math.round((score / questions.length) * 100)}%
            </p>
            <p className="text-muted-foreground text-lg mt-2">
              You got {score} out of {questions.length} questions right.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button onClick={handleRestart} className="flex items-center">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Return Home
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Progress value={progressPercentage} className="h-3 mb-4" />
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {questions[currentQuestion].question}
              </h2>
              <span className="text-primary font-medium">
                {currentQuestion + 1}/{questions.length}
              </span>
            </div>
            <div className="space-y-2">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  variant="outline"
                  className={cn(
                    "w-full justify-start h-auto py-2 px-4 text-left",
                    selectedAnswer
                      ? option === questions[currentQuestion].answer
                        ? "bg-green-100 border-green-500 text-green-800"
                        : option === selectedAnswer
                        ? "bg-red-100 border-red-500 text-red-800"
                        : ""
                      : ""
                  )}
                  disabled={!!selectedAnswer}
                >
                  <span className="mr-auto">{option}</span>
                  {selectedAnswer &&
                    option === questions[currentQuestion].answer && (
                      <CheckCircle className="h-5 w-5 text-green-600 ml-2" />
                    )}
                  {selectedAnswer &&
                    option === selectedAnswer &&
                    option !== questions[currentQuestion].answer && (
                      <XCircle className="h-5 w-5 text-red-600 ml-2" />
                    )}
                </Button>
              ))}
            </div>

            {selectedAnswer && (
              <Alert
                className={cn(
                  "mt-4",
                  selectedAnswer === questions[currentQuestion].answer
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-red-100 text-red-800 border-red-200"
                )}
              >
                <AlertDescription>
                  {questions[currentQuestion].feedback}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>

      {!showResults && (
        <CardFooter className="px-6 pb-6 pt-0">
          <Button
            onClick={handleNext}
            className="w-full"
            disabled={!selectedAnswer}
          >
            {currentQuestion < questions.length - 1
              ? "Next Question"
              : "Show Results"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
