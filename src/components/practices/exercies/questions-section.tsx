"use client";

import type React from "react";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Question {
  number: number;
  question: string;
  options: string[];
  correctAnswer?: number;
}

interface QuestionsSectionProps {
  question: Question;
  setSelectedAnswer: (index: number | null) => void;
  selectedAnswer: number | null;
}

const QuestionsSection: React.FC<QuestionsSectionProps> = ({
  question,
  setSelectedAnswer,
  selectedAnswer,
}) => {
  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  useEffect(() => {
    setSelectedAnswer(null);
  }, [question, setSelectedAnswer]);

  return (
    <Card className="w-full mt-7">
      <CardHeader>
        <CardTitle>Question {question.number}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground font-normal font-serif mb-6">
          {question.question}
        </p>

        <RadioGroup
          value={
            selectedAnswer !== null ? selectedAnswer.toString() : undefined
          }
          onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
          className="space-y-3"
        >
          {question.options.map((answer, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 border-border border rounded-md p-3 hover:bg-accent transition-colors"
            >
              <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
              <Label
                htmlFor={`answer-${index}`}
                className="flex-grow cursor-pointer"
              >
                {answer}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default QuestionsSection;
