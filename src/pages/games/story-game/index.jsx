import { useState, useEffect } from "react";
import LevelSelector from "@/components/practices/funny_practices/LevelSelector";
import MultiChoiceStoryGame from "@/components/games/story-game/multi-choice-story-game";
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

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffleQuestionsInStories = (stories) => {
    return stories.map((story) => ({
      ...story,
      questions: shuffleArray(story.questions || []),
    }));
  };

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await questionsApi.getAllQuestions({
        englishLevel: selectedLevel,
        type: "story_game",
      });

      const questionsData = response.data || response.questions || response;

      if (
        questionsData &&
        Array.isArray(questionsData) &&
        questionsData.length > 0
      ) {
        const normalizeQuestions = (qs = []) =>
          qs.map((q) => ({
            question: q?.question ?? q?.text ?? "",
            options: q?.options ?? q?.choices ?? [],
            // Always return a numeric index for scoring:
            correct:
              typeof q?.correct === "number"
                ? q.correct
                : typeof q?.correctIndex === "number"
                ? q.correctIndex
                : typeof q?.correct_answer_index === "number"
                ? q.correct_answer_index
                : (q?.options ?? q?.choices)?.indexOf(q?.correct) ?? 0,
            explanation: q?.explanation ?? q?.note ?? "",
          }));

        const transformedQuestions = questionsData.map((item) => ({
          storyText: item?.content?.story ?? item?.story ?? "",
          questions: normalizeQuestions(
            item?.content?.questions ?? item?.questions
          ),
          metadata: item?.metadata ?? {},
          gameMetadata: item?.gameMetadata ?? {},
        }));

        const shuffledStories = shuffleArray([...transformedQuestions]);
        const storiesWithShuffledQuestions =
          shuffleQuestionsInStories(shuffledStories);

        setQuestions(storiesWithShuffledQuestions);
        setCurrentIndex(0);
        setGameStarted(true);
      } else {
        setError(
          `No stories available for level ${selectedLevel}. Please check if questions are properly imported in the backend.`
        );
      }
    } catch (err) {
      setError(
        `Failed to load stories: ${
          err.message
        }. Make sure your backend server is running at ${
          import.meta.env.VITE_API_BASE_URL
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setGameStarted(false);
    setSelectedLevel(null);
    setQuestions([]);
    setCurrentIndex(0);
    setError(null);
  };

  const handleRestart = () => {
    setQuestions((prev) =>
      prev.map((story, idx) =>
        idx === currentIndex
          ? { ...story, questions: shuffleArray(story.questions || []) }
          : story
      )
    );
  };

  const handleComplete = () => {
    // Add score saving logic here if needed
  };

  const handleNextStory = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">
          Loading stories for level {selectedLevel}...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
        <div className="text-red-500 mb-4 text-4xl">⚠️</div>
        <p className="text-red-600 mb-4">{error}</p>
        <div className="space-y-2">
          <button
            onClick={() => {
              setError(null);
              if (selectedLevel) {
                fetchQuestions();
              }
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mr-2"
          >
            Retry
          </button>
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
      </div>
    );
  }

  if (!selectedLevel) {
    return <LevelSelector onLevelSelect={setSelectedLevel} />;
  }

  if (!questions.length && selectedLevel && !loading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
        <p className="text-gray-600 mb-4">
          No stories available for level {selectedLevel}.
        </p>
        <div className="space-y-2">
          <button
            onClick={() => fetchQuestions()}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mr-2"
          >
            Retry
          </button>
          <button
            onClick={() => setSelectedLevel(null)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Choose Different Level
          </button>
        </div>
      </div>
    );
  }

  if (gameStarted && questions[currentIndex]) {
    const currentQuestion = questions[currentIndex];

    return (
      <MultiChoiceStoryGame
        storyText={currentQuestion.storyText}
        questions={currentQuestion.questions}
        onGoBack={handleGoBack}
        onRestart={handleRestart}
        onComplete={handleComplete}
        onNext={handleNextStory}
        currentStory={currentIndex + 1}
        totalStories={questions.length}
      />
    );
  }

  return null;
};

export default StoryGame;
