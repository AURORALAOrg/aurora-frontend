// src/pages/PlacementTest.js
import { placementQuestions } from "@/components/placementQuestion/placementQuestion";
import { useState, useEffect, useRef } from "react";
const PlacementTest = () => {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [answers, setAnswers] = useState([]); // track user answers
    const audioRef = useRef(null);

    // Flatten all categories into one array
    const categoryKeys = Object.keys(placementQuestions);
    const questions = categoryKeys.flatMap((cat) => placementQuestions[cat]);

    const q = questions[current];

    const handleAnswer = (idx) => {
        // Save user answer
        setAnswers((prev) => [...prev, idx]);

        // Update score
        if (idx === q.answer) {
            setScore((s) => s + 1);
        }

        // Go to next or finish
        if (current + 1 < questions.length) {
            setCurrent((c) => c + 1);
        } else {
            setFinished(true);
        }
    };

    // Auto-play audio
    useEffect(() => {
        if (audioRef.current) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch((err) => {
                    console.log("Autoplay blocked:", err);
                });
            }
        }
    }, [current]);

    // Function to determine level
    const getLevel = (score) => {
        if (score >= 18) {
            return {
                level: "Advanced Beginner",
                note: "You can start with intermediate lessons."
            };
        } else if (score >= 14) {
            return {
                level: "True Beginner",
                note: "Start from the beginning but at a faster pace."
            };
        } else if (score >= 10) {
            return {
                level: "Basic Beginner",
                note: "Standard pace recommended."
            };
        } else {
            return {
                level: "Foundation Needed",
                note: "Extra support and slower pace recommended."
            };
        }
    };

    if (finished) {
        const { level, note } = getLevel(score);

        return (
            <div className="min-h-screen bg-gray-900 text-white p-8">
                <h1 className="text-4xl font-bold text-center mb-6">Placement Test</h1>
                <div className="max-w-3xl mx-auto text-left bg-gray-800 p-6 rounded-lg shadow-lg">
                    {/* Summary */}
                    <h2 className="text-3xl font-bold mb-4">Test Completed!</h2>
                    <p className="text-xl mb-2">
                        Your score: {score} / {questions.length}
                    </p>
                    <p className="text-2xl font-semibold text-green-400">
                        Level: {level}
                    </p>
                    <p className="text-lg mt-2 text-gray-300">{note}</p>
                    {/* Recommendations */}
                    <div className="mt-8 p-4 bg-gray-700 rounded-lg">
                        <h3 className="text-xl font-bold mb-2">📘 Recommended Next Steps</h3>
                        {level === "Advanced Beginner" && (
                            <p>We recommend starting with <strong>Intermediate Module 1: Everyday Conversations</strong>.</p>
                        )}
                        {level === "True Beginner" && (
                            <p>We recommend starting with <strong>Beginner Fast-Track Module</strong>.</p>
                        )}
                        {level === "Basic Beginner" && (
                            <p>We recommend starting with <strong>Beginner Module 1</strong> at standard pace.</p>
                        )}
                        {level === "Foundation Needed" && (
                            <p>We recommend starting with <strong>Foundation Module: Basic Vocabulary & Greetings</strong>.</p>
                        )}
                    </div>

                    {/* Incorrect Answers Review */}
                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-3">❌ Review Incorrect Answers</h3>
                        <ul className="space-y-4">
                            {questions.map((question, idx) => {
                                const userAnswer = answers[idx];
                                if (userAnswer === question.answer) return null; // only show wrong ones
                                return (
                                    <li
                                        key={idx}
                                        className="p-4 bg-gray-700 rounded-lg shadow-md"
                                    >
                                        <p className="font-semibold mb-2">
                                            Q{idx + 1}: {question.question}
                                        </p>
                                        <p className="text-red-400">
                                            Your Answer: {question.options[userAnswer]}
                                        </p>
                                        <p className="text-green-400">
                                            Correct Answer: {question.options[question.answer]}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    // Section logic
    const questionsPerSection = 5;
    const sectionIndex = Math.floor(current / questionsPerSection); // 0 = A, 1 = B, etc.
    const questionNumberInSection = (current % questionsPerSection) + 1;
    const sectionLetter = String.fromCharCode(65 + sectionIndex); // 65 = "A"

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            {/* Header */}
            <h1 className="text-4xl font-bold text-center mb-6">Placement Test</h1>

            {/* Question box */}
            <div className="flex justify-center">
                <div className="max-w-xl w-full p-6 bg-gray-800 rounded-lg shadow-lg">
                    <div className="mb-6">
                        {/* Section + Question number */}
                        <p className="text-lg text-gray-300 mb-2">
                            Section {sectionLetter} – Question {questionNumberInSection} of{" "}
                            {questionsPerSection}
                        </p>
                        <h2 className="text-2xl font-semibold">{q.question}</h2>

                        {/* Audio */}
                        {q.audio && (
                            <audio
                                key={q.audio}
                                ref={audioRef}
                                controls
                                className="mt-4 w-full"
                            >
                                <source src={q.audio} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        )}
                    </div>

                    {/* Answer options */}
                    <div className="space-y-3">
                        {q.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                className="w-full py-3 px-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlacementTest;
