"use client";

import { useState, useMemo } from "react";
import { CheckCircle, XCircle, Info, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface IdiomQuestion {
  idiom: string;
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
  tips: string[];
}

export default function IdiomChallenge() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const baseQuestions: IdiomQuestion[] = [
    {
      idiom: "Break a leg",
      sentence: `"My daughter has her first piano recital tonight. I told her to break a leg!"`,
      options: [
        "A wish for bad luck",
        "A wish for good luck",
        "A warning about injury",
        "A dancing instruction",
      ],
      correct: 1,
      explanation:
        "This idiom is used to wish someone good luck, especially before a performance.",
      tips: [
        "Commonly used in performing arts",
        "Never meant literally",
        "Shows support and encouragement",
      ],
    },
    {
      idiom: "Hit the sack",
      sentence: `"I'm exhausted. It's time for me to hit the sack."`,
      options: [
        "To go to bed",
        "To work hard",
        "To get angry",
        "To start a fight",
      ],
      correct: 0,
      explanation:
        "This idiom means to go to bed or sleep. It originates from soldiers who used to fill sacks with hay to create makeshift beds.",
      tips: ["Commonly used to express tiredness", "Informal context"],
    },
    {
      idiom: "Spill the beans",
      sentence: `"He accidentally spilled the beans about the surprise party."`,
      options: [
        "To ruin a dish",
        "To share a secret",
        "To create a mess",
        "To apologize",
      ],
      correct: 1,
      explanation:
        "This idiom means to reveal a secret or confidential information.",
      tips: ["Used in informal settings", "Associated with secrets"],
    },
  ];

  const questions = useMemo(() => {
    const result: IdiomQuestion[] = [];
    while (result.length < 10) {
      const shuffled = [...baseQuestions].sort(() => Math.random() - 0.5);
      for (const q of shuffled) {
        if (result.length === 0 || result[result.length - 1].idiom !== q.idiom)
          result.push(q);
        if (result.length === 10) break;
      }
    }
    return result;
  }, []);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setIsCorrect(index === questions[currentQuestion].correct);
    if (index === questions[currentQuestion].correct)
      setCorrectAnswers((prev) => prev + 1);
    setProgress(((currentQuestion + 1) / questions.length) * 100);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setCurrentQuestion(0);
    setIsCorrect(null);
    setProgress(0);
    setCorrectAnswers(0);
  };

  const calculateScore = () =>
    Math.round((correctAnswers / questions.length) * 100);

  const question = questions[currentQuestion];

  const finalScore = calculateScore();
  const scoreColor = finalScore >= 70 ? "text-green-500" : "text-destructive";

  return (
    <Card className="max-w-xl mx-auto shadow-md">
      {selectedAnswer !== null && currentQuestion === questions.length - 1 ? (
        <CardContent className="text-center space-y-12 p-6">
          <CardTitle className="text-4xl font-bold mt-6">
            Challenge Complete!
          </CardTitle>
          <p className={cn("text-6xl font-bold", scoreColor)}>{finalScore}%</p>
          <p className="text-xl text-muted-foreground">
            You got <span className="font-bold">{correctAnswers}</span> out of{" "}
            <span className="font-bold">{questions.length}</span> idioms
            correct!
          </p>
          <div className="flex justify-between mt-16">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </Button>
            <Button asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" /> Main Menu
              </Link>
            </Button>
          </div>
        </CardContent>
      ) : (
        <>
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl font-bold">
                Idiom Challenge
              </CardTitle>
              <span className="text-muted-foreground text-sm">
                {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2 mt-4" />
          </CardHeader>
          <CardContent className="p-6">
            <Card className="bg-muted/50 mb-6">
              <CardContent className="p-4">
                <h2 className="text-2xl font-bold mb-4">{question.idiom}</h2>
                <p className="text-base text-muted-foreground">
                  {question.sentence}
                </p>
              </CardContent>
            </Card>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={cn(
                    "w-full py-3 px-4 text-sm text-left justify-start h-auto",
                    selectedAnswer !== null
                      ? index === question.correct
                        ? "bg-green-50 text-muted-foreground"
                        : index === selectedAnswer
                        ? "bg-red-50 text-muted-foreground"
                        : "bg-muted text-muted-foreground"
                      : "bg-background hover:bg-muted"
                  )}
                  disabled={selectedAnswer !== null}
                  variant="outline"
                >
                  {selectedAnswer !== null &&
                    (index === question.correct ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 shrink-0" />
                    ) : index === selectedAnswer ? (
                      <XCircle className="w-5 h-5 text-red-600 mr-3 shrink-0" />
                    ) : (
                      <span className="w-5 h-5 mr-3 shrink-0"></span>
                    ))}
                  {option}
                </Button>
              ))}
            </div>
            {selectedAnswer !== null && (
              <Card className="mt-6 bg-blue-50 border-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <Info className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="text-xl font-bold">Explanation:</h3>
                  </div>
                  <p className="pl-7 text-sm mb-4">{question.explanation}</p>
                  <h3 className="text-xl font-bold mb-2">Usage Tips:</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {question.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </CardContent>
          {selectedAnswer !== null &&
            currentQuestion < questions.length - 1 && (
              <CardFooter className="flex justify-end">
                <Button onClick={handleNext} className="py-2 px-6">
                  Next →
                </Button>
              </CardFooter>
            )}
        </>
      )}
    </Card>
  );
}
