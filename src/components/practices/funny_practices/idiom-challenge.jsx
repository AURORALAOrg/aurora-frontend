import React, { useState, useMemo } from "react";
import { CheckCircle, XCircle, Info, ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";
import LevelSelector from "./LevelSelector";
import { questionsApi } from "@/services/questionsApi";

const baseQuestions = [
  {
    idiom: "Break a leg",
    sentence: `"My daughter has her first piano recital tonight. I told her to break a leg!"`,
    options: ["A wish for bad luck", "A wish for good luck", "A warning about injury", "A dancing instruction"],
    correct: 1,
    explanation: "This idiom is used to wish someone good luck, especially before a performance.",
    tips: ["Commonly used in performing arts", "Never meant literally", "Shows support and encouragement"],
  },
  {
    idiom: "Hit the sack",
    sentence: `"I'm exhausted. It's time for me to hit the sack."`,
    options: ["To go to bed", "To work hard", "To get angry", "To start a fight"],
    correct: 0,
    explanation: "This idiom means to go to bed or sleep. It originates from soldiers who used to fill sacks with hay to create makeshift beds.",
    tips: ["Commonly used to express tiredness", "Informal context"],
  },
  {
    idiom: "Spill the beans",
    sentence: `"He accidentally spilled the beans about the surprise party."`,
    options: ["To ruin a dish", "To share a secret", "To create a mess", "To apologize"],
    correct: 1,
    explanation: "This idiom means to reveal a secret or confidential information.",
    tips: ["Used in informal settings", "Associated with secrets"],
  },
];

const IdiomChallenge = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [progress, setProgress] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuestions = async (level) => {
    setLoading(true);
    setError(null);
    try {
      const response = await questionsApi.getAllQuestions({ englishLevel: level, type: "idiom-challenge" });
      if (!response || !response.data) {
        throw new Error("Failed to fetch questions");
      }

      // Ensure we have the required data structure
      const formattedQuestions = response.data
        .map((q) => {
          const content = q.content || {};
          if (
            typeof content.idiom !== "string" ||
            typeof content.sentence !== "string" ||
            !Array.isArray(content.options) ||
            typeof content.correct !== "number" ||
            typeof content.explanation !== "string" ||
            !Array.isArray(content.tips)
          ) {
            console.warn("Malformed idiom-challenge question skipped:", q);
            return null;
          }
          return {
            id: q._id || q.id,
            idiom: content.idiom,
            sentence: content.sentence,
            options: content.options,
            correct: content.correct,
            explanation: content.explanation,
            tips: content.tips,
          };
        })
        .filter(Boolean);

      if (formattedQuestions.length === 0) {
        throw new Error("No valid questions available for this level.");
      }

      // Get unique questions by idiom
      const uniqueQuestions = Array.from(new Map(formattedQuestions.map((q) => [q.idiom, q])).values());

      if (uniqueQuestions.length < 1) {
        throw new Error(`Not enough unique questions available for level ${level}. Please add more questions.`);
      }

      // Randomize and select up to 10 questions
      const shuffled = [...uniqueQuestions].sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffled.slice(0, Math.min(10, shuffled.length));

      setQuestions(selectedQuestions);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setProgress(0);
      setCorrectAnswers(0);
    } catch (err) {
      setError(err.message || "An error occurred while fetching questions. Please try again.");
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    fetchQuestions(level);
  };

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setIsCorrect(index === questions[currentQuestion].correct);
    if (index === questions[currentQuestion].correct) setCorrectAnswers((prev) => prev + 1);
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

  const calculateScore = () => Math.round((correctAnswers / questions.length) * 100);

  if (!selectedLevel) {
    return <LevelSelector onLevelSelect={handleLevelSelect} />;
  }
  if (loading) {
    return <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">Loading questions...</div>;
  }
  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <div className="flex justify-center gap-4">
          <button onClick={() => fetchQuestions(selectedLevel)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Retry
          </button>
          <button onClick={() => setSelectedLevel(null)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            Change Level
          </button>
        </div>
      </div>
    );
  }
  if (!questions.length) {
    return <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">No questions available for this level.</div>;
  }

  const question = questions[currentQuestion];
  const finalScore = calculateScore();
  const scoreColor = finalScore >= 70 ? "text-green-500" : "text-red-500";

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-blue-600 font-bold">Level: {selectedLevel}</span>
        <button onClick={() => setSelectedLevel(null)} className="text-blue-500 underline">
          Change Level
        </button>
      </div>
      {selectedAnswer !== null && currentQuestion === questions.length - 1 ? (
        <div className="text-center space-y-12">
          <h1 className="text-4xl font-bold text-gray-900">Challenge Complete!</h1>
          <p className={`text-6xl font-bold ${scoreColor}`}>{finalScore}%</p>
          <p className="text-xl text-gray-700">
            You got <span className="font-bold">{correctAnswers}</span> out of <span className="font-bold">{questions.length}</span> idioms correct!
          </p>
          <div className="flex justify-between mt-16">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <button
              onClick={() => setSelectedLevel(null)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-blue-500 rounded-md shadow-sm transition"
            >
              Change Level
            </button>
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-[#1E293B] rounded-md shadow-sm transition"
              style={{ border: "none", color: "white" }}
            >
              <Home className="w-5 h-5" /> Main Menu
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Idiom Challenge</h1>
            <span className="text-gray-500 text-sm">
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-950 mb-4">{question.idiom}</h2>
            <p className="text-base text-gray-600">{question.sentence}</p>
          </div>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full py-3 px-4 text-sm text-left rounded-lg shadow-sm transition ${
                  selectedAnswer !== null
                    ? index === question.correct
                      ? "bg-green-50 text-gray-400"
                      : index === selectedAnswer
                      ? "bg-red-50 text-gray-400"
                      : "bg-gray-100 text-gray-400"
                    : "bg-white hover:bg-gray-100"
                } flex items-center gap-3`}
                disabled={selectedAnswer !== null}
                style={{ border: "none", cursor: selectedAnswer !== null ? "default" : "pointer" }}
              >
                {selectedAnswer !== null &&
                  (index === question.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : index === selectedAnswer ? (
                    <XCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <span className="w-5 h-5"></span>
                  ))}
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer !== null && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Info className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-xl font-bold text-black">Explanation:</h3>
              </div>
              <p className="pl-7 text-sm text-gray-950 mb-4">{question.explanation}</p>
              <h3 className="text-xl font-bold text-black mb-2">Usage Tips:</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {question.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
          {selectedAnswer !== null && currentQuestion < questions.length - 1 && (
            <div className="flex justify-end mt-4">
              <button
                onClick={handleNext}
                className="py-2 px-6 bg-[#1E293B] text-white rounded-md text-lg font-semibold hover:bg-[#111827] transition"
                style={{ border: "none" }}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default IdiomChallenge;
