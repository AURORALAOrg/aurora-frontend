import React, { useState, useEffect } from "react";
import LevelSelector from "@/components/Games/story-game/level-selector";
import GameCompleteStory from "@/components/Games/story-game/game-complete-story";
import { questionsApi } from "@/services/questionsApi";

const StoryGame = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (selectedLevel) {
      fetchQuestions();
    }
  }, [selectedLevel]);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {      
      try {
        const response = await questionsApi.getAllQuestions({
          englishLevel: selectedLevel,
          type: "story-completion"
        });
                
        const questionsData = response.data || response.questions || response;
        
        if (questionsData && Array.isArray(questionsData) && questionsData.length > 0) {
          const shuffledQuestions = shuffleArray([...questionsData]);
          setQuestions(shuffledQuestions);
          setCurrentIndex(0);
          setGameStarted(true);
          return;
        }
      } catch (apiError) {
        console.warn("API failed, using mock data:", apiError);
      }
      
      const mockQuestionsByLevel = {
        A1: [
          {
            storyText: "The cat {0} on the mat while the dog {1} in the garden.",
            wordOptions: ["sits", "runs", "plays", "sleeps"],
            correctAnswers: ["sits", "plays"]
          },
          {
            storyText: "I {0} breakfast every morning at 7 AM and then {1} to work.",
            wordOptions: ["eat", "go", "drink", "sleep"],
            correctAnswers: ["eat", "go"]
          },
          {
            storyText: "She {0} her name and {1} in the city center.",
            wordOptions: ["likes", "lives", "works", "studies"],
            correctAnswers: ["likes", "lives"]
          },
          {
            storyText: "We {0} English every Tuesday and {1} homework on weekends.",
            wordOptions: ["study", "do", "speak", "write"],
            correctAnswers: ["study", "do"]
          },
          {
            storyText: "The sun {0} in the morning and the moon {1} at night.",
            wordOptions: ["shines", "appears", "sets", "hides"],
            correctAnswers: ["shines", "appears"]
          }
        ],
        A2: [
          {
            storyText: "Yesterday, I {0} to the store and {1} some fresh bread for dinner.",
            wordOptions: ["went", "bought", "ate", "cooked"],
            correctAnswers: ["went", "bought"]
          },
          {
            storyText: "She {0} her homework before {1} her favorite TV show.",
            wordOptions: ["finished", "watching", "started", "enjoying"],
            correctAnswers: ["finished", "watching"]
          },
          {
            storyText: "Last summer, we {0} to the beach and {1} in the warm ocean.",
            wordOptions: ["traveled", "swam", "walked", "played"],
            correctAnswers: ["traveled", "swam"]
          },
          {
            storyText: "He {0} his keys this morning and {1} late for the meeting.",
            wordOptions: ["lost", "arrived", "found", "left"],
            correctAnswers: ["lost", "arrived"]
          },
          {
            storyText: "The students {0} hard for the exam and {1} excellent results.",
            wordOptions: ["studied", "achieved", "worked", "received"],
            correctAnswers: ["studied", "achieved"]
          }
        ],
        B1: [
          {
            storyText: "If I {0} more time, I {1} learn a new language this year.",
            wordOptions: ["had", "would", "have", "will"],
            correctAnswers: ["had", "would"]
          },
          {
            storyText: "The project {0} successfully completed after the team {1} together for months.",
            wordOptions: ["was", "worked", "has", "collaborated"],
            correctAnswers: ["was", "worked"]
          },
          {
            storyText: "Despite {0} tired, she {1} to finish the marathon race.",
            wordOptions: ["feeling", "managed", "being", "succeeded"],
            correctAnswers: ["feeling", "managed"]
          },
          {
            storyText: "The company {0} expanding internationally while {1} its local operations.",
            wordOptions: ["is", "maintaining", "has", "improving"],
            correctAnswers: ["is", "maintaining"]
          },
          {
            storyText: "Before {0} his decision, he {1} advice from several experts.",
            wordOptions: ["making", "sought", "taking", "received"],
            correctAnswers: ["making", "sought"]
          }
        ],
        B2: [
          {
            storyText: "The research {0} that regular exercise {1} significantly improve mental health.",
            wordOptions: ["indicates", "can", "suggests", "will"],
            correctAnswers: ["indicates", "can"]
          },
          {
            storyText: "Having {0} the proposal thoroughly, the board {1} to approve the funding.",
            wordOptions: ["reviewed", "decided", "analyzed", "agreed"],
            correctAnswers: ["reviewed", "decided"]
          },
          {
            storyText: "The novel explores themes of identity while {0} a compelling narrative about {1} communities.",
            wordOptions: ["maintaining", "diverse", "developing", "multicultural"],
            correctAnswers: ["maintaining", "diverse"]
          },
          {
            storyText: "Scientists {0} been investigating the phenomenon, hoping to {1} its underlying mechanisms.",
            wordOptions: ["have", "understand", "are", "discover"],
            correctAnswers: ["have", "understand"]
          },
          {
            storyText: "The negotiations {0} for weeks until both parties finally {1} a compromise.",
            wordOptions: ["continued", "reached", "lasted", "achieved"],
            correctAnswers: ["continued", "reached"]
          }
        ],
        C1: [
          {
            storyText: "The policy's implementation {0} numerous unforeseen complications, {1} stakeholders to reconsider their approach.",
            wordOptions: ["encountered", "prompting", "revealed", "forcing"],
            correctAnswers: ["encountered", "prompting"]
          },
          {
            storyText: "Contemporary literature {0} to challenge conventional narratives while {1} with complex philosophical questions.",
            wordOptions: ["seeks", "grappling", "attempts", "engaging"],
            correctAnswers: ["seeks", "grappling"]
          },
          {
            storyText: "The unprecedented economic shifts have {0} traditional business models, {1} innovation across industries.",
            wordOptions: ["disrupted", "necessitating", "transformed", "spurring"],
            correctAnswers: ["disrupted", "necessitating"]
          },
          {
            storyText: "Emerging technologies {0} the potential to revolutionize healthcare, {1} ethical considerations remain paramount.",
            wordOptions: ["demonstrate", "though", "exhibit", "while"],
            correctAnswers: ["demonstrate", "though"]
          },
          {
            storyText: "The symposium {0} leading experts who {1} groundbreaking research in sustainable development.",
            wordOptions: ["convened", "presented", "assembled", "shared"],
            correctAnswers: ["convened", "presented"]
          }
        ],
        C2: [
          {
            storyText: "The intricate interplay between sociocultural factors and linguistic evolution {0} a fascinating area of study, one that {1} interdisciplinary collaboration.",
            wordOptions: ["constitutes", "necessitates", "represents", "demands"],
            correctAnswers: ["constitutes", "necessitates"]
          },
          {
            storyText: "Postmodern architecture {0} to deconstruct traditional aesthetic paradigms, {1} provocative dialogues about space and meaning.",
            wordOptions: ["endeavors", "fostering", "strives", "generating"],
            correctAnswers: ["endeavors", "fostering"]
          },
          {
            storyText: "The philosopher's treatise {0} profound insights into the nature of consciousness while {1} fundamental assumptions about reality.",
            wordOptions: ["elucidates", "challenging", "illuminates", "questioning"],
            correctAnswers: ["elucidates", "challenging"]
          },
          {
            storyText: "Quantum mechanics {0} to defy intuitive understanding, {1} physicists to embrace mathematical abstractions.",
            wordOptions: ["continues", "compelling", "persists", "forcing"],
            correctAnswers: ["continues", "compelling"]
          },
          {
            storyText: "The novelist's magnum opus {0} literary conventions while {1} a nuanced exploration of human psyche.",
            wordOptions: ["transcends", "providing", "surpasses", "offering"],
            correctAnswers: ["transcends", "providing"]
          }
        ]
      };
      
      const levelQuestions = mockQuestionsByLevel[selectedLevel] || mockQuestionsByLevel.A1;
      const shuffledQuestions = shuffleArray([...levelQuestions]);
      setQuestions(shuffledQuestions);
      setCurrentIndex(0);
      setGameStarted(true);
      
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError(`Failed to load stories: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleGoBack = () => {
    setGameStarted(false);
    setSelectedLevel(null);
    setQuestions([]);
    setCurrentIndex(0);
    setError(null);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
  };

  const handleComplete = (score) => {
    console.log(`Story completed with score: ${score}`);
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading stories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
        <div className="text-red-500 mb-4 text-4xl">⚠️</div>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => {
            setError(null);
            setSelectedLevel(null);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Back to Level Selection
        </button>
      </div>
    );
  }

  if (!selectedLevel) {
    return <LevelSelector onLevelSelect={setSelectedLevel} />;
  }

  if (!questions.length && selectedLevel && !loading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
        <p className="text-gray-600 mb-4">No stories available for level {selectedLevel}.</p>
        <button
          onClick={() => setSelectedLevel(null)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Choose Different Level
        </button>
      </div>
    );
  }

  if (gameStarted && questions[currentIndex]) {
    const currentQuestion = questions[currentIndex];
    
    return (
      <GameCompleteStory
        storyText={currentQuestion.storyText || currentQuestion.text}
        wordOptions={currentQuestion.wordOptions || currentQuestion.options}
        correctAnswers={currentQuestion.correctAnswers || currentQuestion.answers}
        onGoBack={handleGoBack}
        onRestart={handleRestart}
        onComplete={(score) => {handleComplete(score);}}
      />
    );
  }

  return null;
};

export default StoryGame;