import { useState, useEffect, useRef } from "react";

const LESSONS = [
  {
    id: "L1",
    title: "Lesson 1: Basic Greetings",
    content: [
      "Hello / Hi",
      "Good morning / Good afternoon / Good evening",
      "Goodbye / See you later"
    ],
    audio: [
      { phrase: "Hello", src: "/audio/hello.mp3" },
      { phrase: "Hi", src: "/audio/hi.mp3" },
      { phrase: "Good morning", src: "/audio/goodmorning.mp3" },
      { phrase: "Good afternoon", src: "/audio/goodafternoon.mp3" },
      { phrase: "Good evening", src: "/audio/goodevening.mp3" },
      { phrase: "Goodbye", src: "/audio/goodbye.mp3" },
      { phrase: "See you later", src: "/audio/seeyoulater.mp3" }
    ],
    culturalNotes:
      "In many English-speaking cultures, 'Good morning' is used until around noon; 'Good afternoon' until early evening; 'Good evening' for later. Informal contexts commonly use 'Hi' or 'Hello'.",
    exercises: [
      {
        type: "mcq",
        prompt: 'Choose the correct greeting for 2 PM:',
        options: ["Good morning", "Good afternoon", "Good evening", "Good night"],
        answer: 1
      },
      {
        type: "mcq",
        prompt: "What do you say when leaving?",
        options: ["Hello", "Goodbye", "Please", "Thanks"],
        answer: 1
      },
      {
        type: "mcq",
        prompt: "Which greeting is most informal?",
        options: ["Good morning", "Good evening", "Hi", "Good afternoon"],
        answer: 2
      },
      {
        type: "audio_recog",
        prompt: "Listen and choose which greeting you heard.",
        options: ["Hello", "Good morning", "Goodbye"],
        answer: 0,
        audioIndex: 0
      },
      {
        type: "audio_recog",
        prompt: "Listen and identify the farewell phrase.",
        options: ["Hi", "See you later", "Good afternoon"],
        answer: 1,
        audioIndex: 6
      }
    ]
  },

  {
    id: "L2",
    title: "Lesson 2: Self Introduction - Names",
    content: ["My name is ...", "I'm ...", "Nice to meet you", "What's your name?"],
    audio: [
      { phrase: "My name is Maria", src: "/audio/my-name-is.mp3" },
      { phrase: "I'm Tom", src: "/audio/I'mTom.mp3" },
      { phrase: "Nice to meet you", src: "/audio/nice-to-meet-you.mp3" },
      { phrase: "What's your name?", src: "/audio/whatsyourname.mp3" }
    ],
    culturalNotes:
      "When introducing yourself, a handshake or a polite smile is common in many places. Use 'Nice to meet you' after being introduced.",
    exercises: [
      {
        type: "fill",
        prompt: "Complete: 'Hi, _____ name is Maria.'",
        blankCount: 1,
        answers: ["my", "My"]
      },
      {
        type: "fill",
        prompt: "Complete: '_____ (I'm / I am) Tom.'",
        blankCount: 1,
        answers: ["I'm", "I am"]
      },
      {
        type: "fill",
        prompt: "Complete: 'Nice to _____ you.'",
        blankCount: 1,
        answers: ["meet"]
      },
      {
        type: "fill",
        prompt: "Complete: '_____ your name?' (What's/What is)",
        blankCount: 1,
        answers: ["What's", "What is"]
      },
      {
        type: "mcq",
        prompt: "Which phrase asks for someone's name?",
        options: ["How old are you?", "What's your name?", "Where are you from?", "Nice to meet you"],
        answer: 1
      },
      {
        type: "mcq",
        prompt: "Choose a polite reply to 'Nice to meet you.'",
        options: ["Same here", "Me too", "Nice to meet you too", "No"],
        answer: 2
      }
    ]
  },

  {
    id: "L3",
    title: "Lesson 3: Self Introduction - Basic Info",
    content: ["Age: I'm 25 years old", "Country: I'm from Mexico", "Job: I'm a teacher"],
    audio: [
      { phrase: "I'm 25 years old", src: "/audio/im-25.mp3" },
      { phrase: "I'm from Mexico", src: "/audio/from-mexico.mp3" },
      { phrase: "I'm a teacher", src: "/audio/I'mateacher.mp3" }
    ],
    culturalNotes:
      "Asking age or salary may be considered personal in some cultures — stick to basic polite contexts when practicing.",
    exercises: [
      {
        type: "mcq",
        prompt: "How do you say your age in natural English?",
        options: [
          "I have 25 years",
          "I'm 25 years old",
          "I am 25 years",
          "My age is 25"
        ],
        answer: 1
      },
      {
        type: "mcq",
        prompt: "How to say where you are from?",
        options: ["I come Mexico", "I from Mexico", "I'm from Mexico", "I am Mexico"],
        answer: 2
      },
      {
        type: "mcq",
        prompt: "Which is the correct way to say your job?",
        options: ["I work teacher", "I'm a teacher", "I do teacher", "My job teacher"],
        answer: 1
      },
      {
        type: "sentence_build",
        prompt: "Construct: (job) 'teacher' → 'I am a teacher.'",
        answer: "I am a teacher."
      },
      {
        type: "sentence_build",
        prompt: "Construct: (age) '30' → 'I'm 30 years old.'",
        answer: "I'm 30 years old."
      },
      {
        type: "sentence_build",
        prompt: "Construct: (country) 'Canada' → 'I'm from Canada.'",
        answer: "I'm from Canada."
      }
    ]
  },

  {
    id: "L4",
    title: "Lesson 4: Asking About Others",
    content: ["Where are you from?", "What do you do?", "How old are you?", "Polite responses"],
    audio: [
      { phrase: "Where are you from?", src: "/audio/where-from.mp3" },
      { phrase: "What do you do?", src: "/audio/what-do-you-do.mp3" },
      { phrase: "How old are you?", src: "/audio/howoldareyou.mp3" },
      { phrase: "I'm from Colombia", src: "/audio/imfromcolombia.mp3" }
    ],
    culturalNotes:
      "Open questions like 'What do you do?' usually refer to work/profession. In casual contexts you might ask 'What do you do for fun?' instead.",
    exercises: [
      {
        type: "matching",
        prompt: "Match question to response",
        pairs: [
          { q: "Where are you from?", a: "I'm from Colombia" },
          { q: "What do you do?", a: "I'm a student" },
          { q: "How old are you?", a: "I'm 30 years old" },
          { q: "What's your name?", a: "My name is Sarah" }
        ]
      },
      {
        type: "audio_recog",
        prompt: "Listen and pick the question you heard.",
        options: ["Where are you from?", "How old are you?", "What is your name?"],
        answer: 0,
        audioIndex: 0
      },
      {
        type: "audio_recog",
        prompt: "Listen and identify the profession question.",
        options: ["What do you do?", "Where do you work?", "How are you?"],
        answer: 0,
        audioIndex: 1
      }
    ]
  },

  {
    id: "L5",
    title: "Lesson 5: Polite Expressions",
    content: ["Please", "Thank you", "You're welcome", "Excuse me", "I'm sorry"],
    audio: [
      { phrase: "Please", src: "/audio/please.mp3" },
      { phrase: "Thank you", src: "/audio/thank-you.mp3" },
      { phrase: "You're welcome", src: "/audio/youre-welcome.mp3" },
      { phrase: "Excuse me", src: "/audio/excuseme.mp3" },
      { phrase: "I'm sorry", src: "/audio/imsorry.mp3" }
    ],
    culturalNotes:
      "Saying 'Please' and 'Thank you' is widely appreciated. The exact formality of expressions varies by culture.",
    exercises: [
      {
        type: "mcq",
        prompt: "When someone helps you, you say:",
        options: ["Excuse me", "I'm sorry", "Thank you", "Please"],
        answer: 2
      },
      {
        type: "mcq",
        prompt: "Choose the polite request phrase:",
        options: ["Give me that", "Pass me that, please", "You there", "Now"],
        answer: 1
      },
      {
        type: "mcq",
        prompt: "What do you say when you bump into someone?",
        options: ["Thank you", "Please", "Excuse me", "You're welcome"],
        answer: 2
      },
      {
        type: "mcq",
        prompt: "Response to 'Thank you':",
        options: ["Please", "I'm sorry", "You're welcome", "Excuse me"],
        answer: 2
      },
      {
        type: "mcq",
        prompt: "When you make a mistake, you say:",
        options: ["Please", "Thank you", "Excuse me", "I'm sorry"],
        answer: 3
      },
      {
        type: "audio_recog",
        prompt: "Listen and choose the polite phrase:",
        options: ["Please", "Thank you", "Sorry"],
        answer: 1,
        audioIndex: 1
      },
      {
        type: "audio_recog",
        prompt: "Listen and identify the apology:",
        options: ["Excuse me", "I'm sorry", "Please"],
        answer: 1,
        audioIndex: 4
      },
      {
        type: "audio_recog",
        prompt: "Listen and choose the welcoming phrase:",
        options: ["Thank you", "You're welcome", "Please"],
        answer: 1,
        audioIndex: 2
      }
    ]
  }
];

export default function GreetingsCourse() {
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem("greetings_completed");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [courseFinished, setCourseFinished] = useState(false);
  const [showAudioPanel, setShowAudioPanel] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const audioRef = useRef(null);

  const lesson = LESSONS[currentLessonIdx];
  const exercise = lesson.exercises[currentExIdx];

  // Function to play specific audio
  const playAudio = (audioSrc, audioId) => {
    if (!audioRef.current) return;
    
    // Stop current audio if playing
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    
    audioRef.current.src = audioSrc;
    setCurrentlyPlaying(audioId);
    
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log("Audio play failed:", err);
        setCurrentlyPlaying(null);
      });
    }
  };

  // Handle audio end
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setCurrentlyPlaying(null);
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  // Auto-play for audio recognition exercises
  useEffect(() => {
    if (exercise && exercise.type === "audio_recog" && lesson.audio) {
      const audioIndex = exercise.audioIndex ?? 0;
      const audioItem = lesson.audio[audioIndex];
      if (audioItem) {
        setTimeout(() => {
          playAudio(audioItem.src, `${lesson.id}-${audioIndex}`);
        }, 500);
      }
    }
  }, [currentLessonIdx, currentExIdx]);

  // Persist completed lessons
  useEffect(() => {
    try {
      localStorage.setItem("greetings_completed", JSON.stringify(completedLessons));
    } catch {}
    if (completedLessons.length === LESSONS.length) {
      setCourseFinished(true);
    }
  }, [completedLessons]);

  const handleSubmitAnswer = (payload) => {
    let isCorrect = false;

    if (exercise.type === "mcq" || exercise.type === "audio_recog") {
      isCorrect = payload.selectedIndex === exercise.answer;
    } else if (exercise.type === "fill") {
      const text = (payload.text || "").trim();
      isCorrect = exercise.answers.some((a) => a.toLowerCase() === text.toLowerCase());
    } else if (exercise.type === "matching") {
      const expected = exercise.pairs.map((p) => p.a);
      isCorrect =
        Array.isArray(payload.value) &&
        payload.value.length === expected.length &&
        payload.value.every((v, i) => v === expected[i]);
    } else if (exercise.type === "sentence_build") {
      isCorrect =
        (payload.value || "").trim().toLowerCase() === exercise.answer.trim().toLowerCase();
    }

    setFeedback({
      correct: isCorrect,
      message: isCorrect ? "Correct ✅" : `Incorrect — correct: ${
        exercise.type === "mcq" || exercise.type === "audio_recog"
          ? exercise.options[exercise.answer]
          : exercise.answer || "See lesson content"
      }`
    });

    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentLessonIdx] = copy[currentLessonIdx] || [];
      copy[currentLessonIdx][currentExIdx] = { exercise, payload, correct: isCorrect };
      return copy;
    });

    setTimeout(() => {
      setFeedback(null);
      if (currentExIdx + 1 < lesson.exercises.length) {
        setCurrentExIdx((i) => i + 1);
      } else {
        setCompletedLessons((prev) => {
          if (prev.includes(lesson.id)) return prev;
          return [...prev, lesson.id];
        });
        if (currentLessonIdx + 1 < LESSONS.length) {
          setCurrentLessonIdx((i) => i + 1);
          setCurrentExIdx(0);
        } else {
          setCourseFinished(true);
        }
      }
    }, 900);
  };

  const restartCourse = () => {
    setCurrentLessonIdx(0);
    setCurrentExIdx(0);
    setAnswers([]);
    setFeedback(null);
    setCompletedLessons([]);
    setCourseFinished(false);
    setCurrentlyPlaying(null);
    try {
      localStorage.removeItem("greetings_completed");
    } catch {}
  };

  // Audio Panel Component
  const AudioPanel = () => (
    <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">🔊 Audio Pronunciation Guide</h3>
        <button
          onClick={() => setShowAudioPanel(!showAudioPanel)}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          {showAudioPanel ? 'Hide' : 'Show'} Audio Panel
        </button>
      </div>
      
      {showAudioPanel && (
        <div className="space-y-2">
          <p className="text-sm text-gray-400 mb-3">Click any phrase to hear pronunciation:</p>
          <div className="grid gap-2">
            {lesson.audio && lesson.audio.map((audioItem, index) => {
              const audioId = `${lesson.id}-${index}`;
              const isPlaying = currentlyPlaying === audioId;
              
              return (
                <button
                  key={index}
                  onClick={() => playAudio(audioItem.src, audioId)}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                    isPlaying 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  }`}
                >
                  <span className="font-medium">{audioItem.phrase}</span>
                  <span className="text-sm">
                    {isPlaying ? '🔊 Playing...' : '▶️ Play'}
                  </span>
                </button>
              );
            })}
          </div>
          
          {(!lesson.audio || lesson.audio.length === 0) && (
            <p className="text-gray-500 italic">No audio available for this lesson</p>
          )}
        </div>
      )}
    </div>
  );

  // Render exercise UI by type
  const ExerciseUI = ({ ex }) => {
    if (!ex) return null;

    if (ex.type === "mcq") {
      return (
        <div className="space-y-3">
          <p className="mb-2">{ex.prompt}</p>
          {ex.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSubmitAnswer({ selectedIndex: i })}
              className="w-full text-left py-3 px-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }

    if (ex.type === "audio_recog") {
      return (
        <div className="space-y-3">
          <p className="mb-2">{ex.prompt}</p>
          
          {/* Audio control with replay button */}
          <div className="flex items-center gap-3 mb-3 p-3 bg-gray-700 rounded-lg">
            <button
              onClick={() => {
                const audioIndex = ex.audioIndex ?? 0;
                const audioItem = lesson.audio?.[audioIndex];
                if (audioItem) {
                  playAudio(audioItem.src, `${lesson.id}-${audioIndex}-exercise`);
                }
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center gap-2"
            >
              🔊 {currentlyPlaying?.includes('exercise') ? 'Playing...' : 'Play Audio'}
            </button>
            <span className="text-sm text-gray-400">Listen carefully and select your answer</span>
          </div>
          
          {ex.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSubmitAnswer({ selectedIndex: i })}
              className="w-full text-left py-3 px-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }

    if (ex.type === "fill") {
      const [input, setInput] = useState("");
      return (
        <div className="space-y-3">
          <p className="mb-2">{ex.prompt}</p>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full py-3 px-4 bg-gray-800 rounded-lg text-white"
            placeholder="Type your answer"
          />
          <div className="flex gap-3">
            <button
              onClick={() => handleSubmitAnswer({ text: input })}
              className="py-2 px-4 bg-blue-600 rounded-lg"
            >
              Submit
            </button>
            <button
              onClick={() => setInput("")}
              className="py-2 px-4 bg-gray-700 rounded-lg"
            >
              Clear
            </button>
          </div>
        </div>
      );
    }

    if (ex.type === "matching") {
      const [matches, setMatches] = useState(Array(ex.pairs.length).fill(""));
      return (
        <div className="space-y-3">
          <p className="mb-2">{ex.prompt}</p>
          {ex.pairs.map((pair, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-1/2 p-3 bg-gray-800 rounded">{pair.q}</div>
              <select
                value={matches[i]}
                onChange={(e) =>
                  setMatches((m) => {
                    const copy = [...m];
                    copy[i] = e.target.value;
                    return copy;
                  })
                }
                className="w-1/2 py-3 px-3 bg-gray-800 rounded text-white"
              >
                <option value="">--- select ---</option>
                {ex.pairs.map((p, j) => (
                  <option key={j} value={p.a}>
                    {p.a}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <div className="flex gap-3">
            <button
              onClick={() => handleSubmitAnswer({ value: matches })}
              className="py-2 px-4 bg-blue-600 rounded-lg"
            >
              Submit Matches
            </button>
          </div>
        </div>
      );
    }

    if (ex.type === "sentence_build") {
      const [txt, setTxt] = useState("");
      return (
        <div className="space-y-3">
          <p className="mb-2">{ex.prompt}</p>
          <input
            value={txt}
            onChange={(e) => setTxt(e.target.value)}
            className="w-full py-3 px-4 bg-gray-800 rounded-lg text-white"
            placeholder="Type full sentence"
          />
          <div className="flex gap-3">
            <button
              onClick={() => handleSubmitAnswer({ value: txt })}
              className="py-2 px-4 bg-blue-600 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  if (courseFinished) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-bold text-center mb-6">Greetings & Introductions — Course Complete</h1>
        <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-3">Well done! 🎉</h2>
          <p className="mb-4">
            You completed all lessons. Completed: {completedLessons.length} / {LESSONS.length}
          </p>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Course Summary</h3>
            <ul className="list-disc pl-5 text-gray-300">
              {LESSONS.map((l) => (
                <li key={l.id} className="mb-1">
                  <strong>{l.title}</strong> — {l.content.join(" · ")}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6 p-4 bg-gray-700 rounded">
            <h3 className="text-lg font-bold">Next Steps</h3>
            <p className="mt-2">We recommend:</p>
            <ul className="list-disc pl-5 text-gray-300">
              <li>Practice greetings with 1-on-1 speaking exercises.</li>
              <li>Replay audio files and mimic pronunciation.</li>
              <li>Move to "Basic Conversations" — Intermediate Module 1 when ready.</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button onClick={restartCourse} className="py-2 px-4 bg-red-600 rounded">
              Restart Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalLessons = LESSONS.length;
  const completedCount = completedLessons.length;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Greetings & Introductions</h1>

      <div className="max-w-3xl mx-auto">
        {/* Hidden audio element */}
        <audio ref={audioRef} preload="none" />
        
        <div className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-lg text-gray-300">
                Lesson {currentLessonIdx + 1} of {totalLessons}
              </p>
              <h2 className="text-2xl font-semibold">{lesson.title}</h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Completed: {completedCount}/{totalLessons}</p>
              <p className="text-sm text-gray-400">Exercise {currentExIdx + 1} / {lesson.exercises.length}</p>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Core Phrases</h3>
            <ul className="list-disc pl-5 text-gray-300">
              {lesson.content.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>

            <div className="mt-4 p-3 bg-gray-700 rounded">
              <h4 className="font-semibold">Cultural Notes</h4>
              <p className="text-gray-300 mt-2">{lesson.culturalNotes}</p>
            </div>
          </div>

          {/* Enhanced Audio Panel */}
          <AudioPanel />

          <div className="mt-4">
            <h3 className="font-semibold mb-3">Exercise</h3>
            <ExerciseUI ex={exercise} />
            {feedback && (
              <div className={`mt-3 p-3 rounded ${feedback.correct ? "bg-green-800" : "bg-red-800"}`}>
                {feedback.message}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-gray-400">Progress: {completedCount}/{totalLessons} lessons complete</div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (currentLessonIdx > 0) {
                  setCurrentLessonIdx((i) => i - 1);
                  setCurrentExIdx(0);
                  setFeedback(null);
                  setCurrentlyPlaying(null);
                }
              }}
              disabled={currentLessonIdx === 0}
              className="py-2 px-4 bg-gray-700 rounded-lg disabled:opacity-50"
            >
              Prev Lesson
            </button>
            <button
              onClick={() => {
                setCompletedLessons((prev) => (prev.includes(lesson.id) ? prev : [...prev, lesson.id]));
                if (currentLessonIdx + 1 < LESSONS.length) {
                  setCurrentLessonIdx((i) => i + 1);
                  setCurrentExIdx(0);
                } else {
                  setCourseFinished(true);
                }
                setFeedback(null);
                setCurrentlyPlaying(null);
              }}
              className="py-2 px-4 bg-blue-600 rounded-lg"
            >
              Skip / Next Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}