import { useState } from "react";
import { Link } from "react-router-dom";
import { culturalAssessments } from "@/data/cultural-assessments";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";

/**
 * AssessmentSelector component
 *
 * This component allows users to select from available cultural assessments.
 */
const AssessmentSelector = ({ onSelectAssessment }) => {
  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-neutral-1">
          Cultural Assessments
        </h1>
        <p className="text-lg text-neutral-2">
          Test your knowledge of cultural differences and communication
          practices
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {culturalAssessments.map((assessment) => (
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
            <CardFooter className="flex justify-between items-center pt-2 border-t border-[#1f2937]">
              <div className="text-sm text-neutral-2">
                {assessment.questions.length} questions
              </div>
              <div className="space-x-2">
                {assessment.id === "social-media-communication" && (
                  <Link to="/social-media-course">
                    <Button
                      variant="outline"
                      className="border-[#00C2CB] text-[#00C2CB] hover:bg-[#00C2CB] hover:text-white"
                    >
                      Start Course
                    </Button>
                  </Link>
                )}
                <Button
                  onClick={() => onSelectAssessment(assessment)}
                  className="bg-[#00C2CB] hover:bg-[#00A8B0] text-white"
                >
                  Start Assessment
                </Button>
              </div>
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
const AssessmentQuiz = ({ assessment, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [attempts, setAttempts] = useState(assessment.questions.map(() => 0));
  const [answeredCorrectly, setAnsweredCorrectly] = useState(() =>
    assessment.questions.map(() => false)
  );

  const handleAnswer = (option) => {
    if (selectedAnswer) return;

    const qIndex = currentQuestion;
    const question = assessment.questions[qIndex];
    const isCorrect = option === question.correctAnswer;

    setSelectedAnswer(option);

    // Track the attempt
    setAttempts((prev) => {
      const next = [...prev];
      next[qIndex] += 1;
      return next;
    });

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setAnsweredCorrectly((prev) => {
        const next = [...prev];
        next[qIndex] = true;
        return next;
      });
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
    setAnsweredCorrectly(assessment.questions.map(() => false));
  };

  const handleRetryQuestion = () => {
    setSelectedAnswer(null);
  };

  if (showResults) {
    // Results screen
    const percentage = Math.round((score / assessment.questions.length) * 100);
    const getResultMessage = () => {
      if (percentage >= 90) return "Excellent! You're a cultural expert!";
      if (percentage >= 70)
        return "Good job! You have solid cultural knowledge.";
      if (percentage >= 50)
        return "Not bad. Keep learning about cultural differences!";
      return "You might want to review cultural differences more.";
    };

    return (
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="bg-dark-blue-5 border-2 border-[#1f2937]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-neutral-1">
              Assessment Complete!
            </CardTitle>
            <CardDescription className="text-xl text-neutral-2">
              Your score: {score}/{assessment.questions.length} ({percentage}%)
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-lg font-medium text-neutral-2">
                {getResultMessage()}
              </p>
            </div>

            <div className="bg-[#1f2937] rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2 text-neutral-1">
                Areas to review:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-2">
                {assessment.questions.map((q, index) => {
                  const gotItRight = answeredCorrectly[index];
                  const firstTry = gotItRight && attempts[index] === 1;
                  return (
                    <li key={q.id} className="flex items-start gap-2">
                      <span>
                        {gotItRight ? (
                          <Check className="text-green-400 h-5 w-5 mt-0.5" />
                        ) : (
                          <X className="text-red-400 h-5 w-5 mt-0.5" />
                        )}
                      </span>
                      <span>
                        <span className="font-medium">{q.question}</span>
                        <p className="text-sm text-neutral-3">
                          {firstTry ? (
                            "Correct on the first try."
                          ) : gotItRight ? (
                            "Correct after multiple attempts."
                          ) : (
                            <>Correct answer: {q.correctAnswer}</>
                          )}
                        </p>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              onClick={onBack}
              variant="outline"
              className="border-[#374151] text-neutral-1 hover:bg-[#1f2937]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Assessments
            </Button>
            <Button
              onClick={handleTryAgain}
              className="bg-[#00C2CB] hover:bg-[#00A8B0] text-white"
            >
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Quiz screen
  const currentQuestionData = assessment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <Card className="bg-dark-blue-5 border-2 border-[#1f2937]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Button
              onClick={onBack}
              variant="outline"
              size="sm"
              className="border-[#374151] text-neutral-1 hover:bg-[#1f2937]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="text-sm text-neutral-2">
              Question {currentQuestion + 1} of {assessment.questions.length}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#1f2937] h-2 rounded-full mt-4">
            <div
              className="bg-[#00C2CB] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <CardTitle className="text-xl mt-4 text-neutral-1">
            {currentQuestionData.question}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {currentQuestionData.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  selectedAnswer === option
                    ? option === currentQuestionData.correctAnswer
                      ? "default"
                      : "destructive"
                    : "outline"
                }
                className={`justify-start text-left px-4 py-6 h-auto ${
                  selectedAnswer && option === currentQuestionData.correctAnswer
                    ? "bg-green-500 hover:bg-green-600 text-white border-green-500"
                    : selectedAnswer === option
                    ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
                    : "border-[#374151] text-neutral-1 hover:bg-[#1f2937]"
                }`}
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswer(option)}
              >
                <span>{option}</span>
              </Button>
            ))}
          </div>

          {/* Feedback after answering */}
          {selectedAnswer && (
            <div className="mt-4 p-4 rounded-lg bg-[#1f2937]">
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
                Try Again
              </Button>
            )}
          {selectedAnswer && (
            <Button
              onClick={handleNext}
              className="ml-auto bg-[#00C2CB] hover:bg-[#00A8B0] text-white"
            >
              {currentQuestion < assessment.questions.length - 1
                ? "Next Question"
                : "See Results"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

const CulturalAssessment = () => {
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
          onBack={() => setSelectedAssessment(null)}
        />
      ) : (
        <AssessmentSelector onSelectAssessment={handleSelectAssessment} />
      )}
    </div>
  );
};

export default CulturalAssessment;
