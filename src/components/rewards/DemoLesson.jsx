"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle, XCircle } from "lucide-react";

const demoQuestions = [
  { question: "What is 2 + 2?", correct: "4", options: ["3", "4", "5"] },
  {
    question: "What is the capital of France?",
    correct: "Paris",
    options: ["London", "Paris", "Berlin"],
  },
  { question: "What is 5 × 3?", correct: "15", options: ["12", "15", "18"] },
];

export const DemoLesson = ({ awardPoints }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [lessonActive, setLessonActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const startLesson = () => {
    setLessonActive(true);
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const answerQuestion = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === demoQuestions[currentQuestion].correct;

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      awardPoints("CORRECT_ANSWER");
    }

    // Auto-advance after showing result
    setTimeout(() => {
      if (currentQuestion < demoQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Lesson completed
        awardPoints("LESSON_COMPLETION");

        // Perfect lesson bonus
        if (correctAnswers + (isCorrect ? 1 : 0) === demoQuestions.length) {
          setTimeout(() => awardPoints("PERFECT_LESSON"), 1000);
        }

        setLessonActive(false);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 1500);
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          Demo Lesson
        </CardTitle>
        <CardDescription className="text-slate-400">
          Experience the points system with this interactive lesson
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!lessonActive ? (
          <div className="text-center py-8">
            <div className="mb-4">
              <div className="text-slate-300 mb-2">Earn points for:</div>
              <div className="text-sm text-slate-400 space-y-1">
                <div>• +10 XP per correct answer</div>
                <div>• +50 XP for lesson completion</div>
                <div>• +100 XP bonus for perfect score</div>
              </div>
            </div>
            <Button
              onClick={startLesson}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-semibold px-8 py-3 rounded-xl"
            >
              Start Lesson
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className="text-slate-300 border-slate-600"
              >
                Question {currentQuestion + 1} of {demoQuestions.length}
              </Badge>
              <div className="text-sm text-slate-400">
                Correct: {correctAnswers}/
                {currentQuestion + (showResult ? 1 : 0)}
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-xl text-white mb-6 text-center font-medium">
                {demoQuestions[currentQuestion].question}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {demoQuestions[currentQuestion].options.map((option, index) => {
                  const isCorrect =
                    option === demoQuestions[currentQuestion].correct;
                  const isSelected = option === selectedAnswer;

                  let buttonClass =
                    "bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-slate-500";

                  if (showResult && isSelected) {
                    buttonClass = isCorrect
                      ? "bg-emerald-500 border-emerald-500 text-slate-900"
                      : "bg-red-500 border-red-500 text-white";
                  } else if (showResult && isCorrect) {
                    buttonClass =
                      "bg-emerald-500 border-emerald-500 text-slate-900";
                  }

                  return (
                    <Button
                      key={index}
                      onClick={() => !showResult && answerQuestion(option)}
                      variant="outline"
                      disabled={showResult}
                      className={`${buttonClass} w-full py-3 text-left justify-start relative transition-all duration-200`}
                    >
                      <span className="flex items-center gap-2">
                        {showResult &&
                          isSelected &&
                          (isCorrect ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          ))}
                        {showResult && !isSelected && isCorrect && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        {option}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
