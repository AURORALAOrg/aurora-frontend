import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle, RefreshCw, Home, BookOpen } from "lucide-react";
import { conversationAssessments } from "@/data/conversation-assessments";

/**
 * AssessmentSelector component
 *
 * This component displays a list of available conversation assessments
 * and allows the user to select one to take.
 */
const AssessmentSelector = ({ onSelectAssessment }) => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-neutral-1">
          Basic Conversation Assessments
        </h1>
        <p className="text-neutral-2">
          Test your knowledge with these mini-assessments for our Basic
          Conversation courses.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {conversationAssessments.map((assessment) => (
          <Card
            key={assessment.id}
            className="hover:shadow-lg transition-shadow bg-dark-blue-5 border-2 border-[#1f2937]"
          >
            <CardHeader>
              <CardTitle className="text-neutral-1">
                {assessment.title}
              </CardTitle>
              <CardDescription className="text-neutral-2">
                {assessment.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-2 mb-2">
                <span className="font-semibold text-neutral-1">
                  {assessment.questions.length}
                </span>{" "}
                questions
              </p>
              <p className="text-sm text-neutral-3">
                Tests real-world conversation scenarios
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => onSelectAssessment(assessment)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Start Assessment
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

/**
 * AssessmentQuiz component
 *
 * This component displays the actual assessment questions and handles
 * user interaction, scoring, and feedback.
 */
const AssessmentQuiz = ({ assessment, onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [attempts, setAttempts] = useState(assessment.questions.map(() => 0));

  const handleAnswer = (option) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);
    const question = assessment.questions[currentQuestion];

    // Track the attempt
    const newAttempts = [...attempts];
    newAttempts[currentQuestion] += 1;
    setAttempts(newAttempts);

    if (option === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const handleTryAgain = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setAttempts(assessment.questions.map(() => 0));
  };

  const handleRetryQuestion = () => {
    // Only allow retry if they got it wrong
    if (
      selectedAnswer !== assessment.questions[currentQuestion].correctAnswer
    ) {
      setSelectedAnswer(null);
    }
  };

  const currentQuestionData = assessment.questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto px-4">
      {showResults ? (
        <Card className="p-6 bg-dark-blue-5 border-2 border-[#1f2937]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-neutral-1">
              Assessment Complete!
            </CardTitle>
            <CardDescription className="text-xl mt-2">
              {score === assessment.questions.length ? (
                <span className="text-green-400 font-bold">Perfect Score!</span>
              ) : score >= assessment.questions.length * 0.8 ? (
                <span className="text-green-400 font-bold">Great job!</span>
              ) : score >= assessment.questions.length * 0.6 ? (
                <span className="text-amber-400 font-bold">Good effort!</span>
              ) : (
                <span className="text-red-400 font-bold">Keep practicing!</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold mb-4 text-blue-400">
                Score: {Math.round((score / assessment.questions.length) * 100)}
                %
              </p>
              <p className="text-neutral-2 mb-8">
                You answered {score} out of {assessment.questions.length}{" "}
                questions correctly.
              </p>
            </div>

            <div className="mt-6 border-t border-[#1f2937] pt-4">
              <h3 className="font-bold mb-2 text-neutral-1">
                Areas to Review:
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                {assessment.questions.map((q, idx) => {
                  const attemptCount = attempts[idx];
                  const needsReview = attemptCount > 1;
                  return needsReview ? (
                    <li key={idx} className="text-neutral-2">
                      Question {idx + 1}: {q.question}{" "}
                      <span className="text-red-400">
                        ({attemptCount} attempts)
                      </span>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleTryAgain}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="flex items-center border-[#1f2937] text-neutral-1 hover:bg-[#1f2937]"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              All Assessments
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="p-6 bg-dark-blue-5 border-2 border-[#1f2937]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-neutral-1">
                {assessment.title}
              </CardTitle>
              <span className="text-blue-400 font-medium">
                Question {currentQuestion + 1}/{assessment.questions.length}
              </span>
            </div>
            <div className="w-full h-2 bg-[#1f2937] rounded-full mt-2">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{
                  width: `${
                    (currentQuestion / assessment.questions.length) * 100
                  }%`,
                }}
              />
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2 text-neutral-1">
                {currentQuestionData.question}
              </h2>
              {currentQuestionData.context && (
                <p className="text-neutral-2 italic mb-4">
                  {currentQuestionData.context}
                </p>
              )}
            </div>

            <div className="space-y-3">
              {currentQuestionData.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={!!selectedAnswer}
                  className={`w-full text-left p-3 rounded-md border ${
                    selectedAnswer
                      ? option === currentQuestionData.correctAnswer
                        ? "bg-green-900/30 border-green-500 text-neutral-1"
                        : option === selectedAnswer
                        ? "bg-red-900/30 border-red-500 text-neutral-1"
                        : "bg-[#1f2937] border-[#374151] text-neutral-2"
                      : "bg-[#1f2937] border-[#374151] text-neutral-2 hover:bg-[#374151]"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {selectedAnswer &&
                      option === currentQuestionData.correctAnswer && (
                        <CheckCircle className="text-green-500 h-5 w-5" />
                      )}
                    {selectedAnswer &&
                      option === selectedAnswer &&
                      option !== currentQuestionData.correctAnswer && (
                        <XCircle className="text-red-500 h-5 w-5" />
                      )}
                  </div>
                </button>
              ))}
            </div>

            {selectedAnswer && (
              <div
                className={`mt-4 p-3 rounded-lg ${
                  selectedAnswer === currentQuestionData.correctAnswer
                    ? "bg-green-900/20 border border-green-500"
                    : "bg-red-900/20 border border-red-500"
                }`}
              >
                <p
                  className={`font-medium ${
                    selectedAnswer === currentQuestionData.correctAnswer
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {selectedAnswer === currentQuestionData.correctAnswer
                    ? "Correct!"
                    : "Not quite right."}
                </p>
                <p className="text-sm mt-1 text-neutral-2">
                  {currentQuestionData.explanation}
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            {selectedAnswer &&
              selectedAnswer !== currentQuestionData.correctAnswer && (
                <Button
                  onClick={handleRetryQuestion}
                  variant="outline"
                  className="flex items-center border-[#374151] text-neutral-1 hover:bg-[#1f2937]"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              )}
            <div className="ml-auto">
              <Button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {currentQuestion < assessment.questions.length - 1
                  ? "Next Question"
                  : "See Results"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

/**
 * ConversationAssessment component
 *
 * This is the main component that manages the state and flow between
 * selecting an assessment and taking the assessment.
 */
const ConversationAssessment = () => {
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const handleSelectAssessment = (assessment) => {
    setSelectedAssessment(assessment);
  };

  const handleComplete = () => {
    setSelectedAssessment(null);
  };

  return (
    <div className="min-h-screen bg-[#111827] py-12">
      {selectedAssessment ? (
        <AssessmentQuiz
          assessment={selectedAssessment}
          onComplete={handleComplete}
          onBack={() => setSelectedAssessment(null)}
        />
      ) : (
        <AssessmentSelector onSelectAssessment={handleSelectAssessment} />
      )}
    </div>
  );
};

export default ConversationAssessment;
