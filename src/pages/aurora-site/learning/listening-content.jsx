import { Headphones, CheckCircle, Lock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const listeningTopics = [
  {
    id: "basic-conversations",
    title: "Basic Conversations",
    progress: 100,
    unlocked: true,
  },
  {
    id: "everyday-dialogues",
    title: "Everyday Dialogues",
    progress: 80,
    unlocked: true,
  },
  { id: "podcasts", title: "Podcasts", progress: 65, unlocked: true },
  {
    id: "news-broadcasts",
    title: "News Broadcasts",
    progress: 45,
    unlocked: true,
  },
  { id: "interviews", title: "Interviews", progress: 20, unlocked: true },
  { id: "lectures", title: "Lectures", progress: 0, unlocked: false },
  { id: "movies-tv", title: "Movies & TV", progress: 0, unlocked: false },
  {
    id: "advanced-listening",
    title: "Advanced Listening",
    progress: 0,
    unlocked: false,
  },
];

const STORAGE_KEY = "listeningProgress";

const getInitialProgress = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  // Default: first lesson unlocked, rest locked, all progress 0
  return listeningTopics.map((t, i) => ({
    id: t.id,
    progress: 0,
    unlocked: i === 0,
  }));
};

const ListeningPage = () => {
  const [progressList, setProgressList] = useState(getInitialProgress());

  // Persist progress to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressList));
  }, [progressList]);

  // Simulate marking a lesson complete (for demo)
  const handleComplete = (idx) => {
    setProgressList((prev) => {
      const updated = prev.map((item, i) =>
        i === idx ? { ...item, progress: 100 } : item
      );
      return updated.map((item, i, arr) => ({
        ...item,
        unlocked: i === 0 ? true : arr[i - 1].progress === 100,
      }));
    });
  };

  return (
    <div className="min-h-screen bg-[#111827] text-neutral-1 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Listening Practice</h1>
          <p className="text-neutral-2">
            Enhance your listening comprehension from simple dialogues to
            complex audio
          </p>
        </div>
        {/* Featured Course */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-light-blue-1/10 to-purple-600/10 border border-light-blue-1/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-light-blue-1/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-light-blue-1" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-neutral-1">
                  Basic Listening Comprehension Course
                </h2>
                <p className="text-neutral-2">
                  Master fundamental listening skills with graduated difficulty
                  for Spanish-speaking beginners
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-sm">
                <span className="text-neutral-3">Level:</span>
                <span className="text-neutral-1 ml-2">Beginner</span>
              </div>
              <div className="text-sm">
                <span className="text-neutral-3">Duration:</span>
                <span className="text-neutral-1 ml-2">2-3 hours</span>
              </div>
              <div className="text-sm">
                <span className="text-neutral-3">Lessons:</span>
                <span className="text-neutral-1 ml-2">4 lessons</span>
              </div>
            </div>
            <Link
              to="/listening-course"
              className="inline-flex items-center gap-2 px-4 py-2 bg-light-blue-1 hover:bg-light-blue-1/80 text-white rounded-lg transition-colors"
            >
              <Headphones className="w-4 h-4" />
              Start Course
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {listeningTopics.map((topic, idx) => {
            const item = progressList[idx] || {
              progress: 0,
              unlocked: idx === 0,
            };
            return (
              <div
                key={topic.id}
                className={`bg-dark-blue-5 rounded-lg p-4 border-2 border-[#1f2937] relative ${
                  !item.unlocked ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-dark-blue-4 flex items-center justify-center">
                      <Headphones className="w-5 h-5 text-green-1" />
                    </div>
                    <span className="text-neutral-1 font-medium">
                      {topic.title}
                    </span>
                  </div>
                  {item.unlocked ? (
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.progress === 100 ? "bg-green/20" : "bg-green-1/20"
                      }`}
                    >
                      <CheckCircle
                        className={`w-5 h-5 ${
                          item.progress === 100 ? "text-green" : "text-green-1"
                        }`}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-neutral-4" />
                      <span className="text-xs text-neutral-4">
                        Complete to unlock
                      </span>
                    </div>
                  )}
                </div>
                <div className="h-2 w-full bg-neutral-1/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      item.progress === 100
                        ? "bg-green"
                        : item.progress > 0
                        ? "bg-green-1"
                        : ""
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="text-right mt-1">
                  <span className="text-xs text-neutral-2">
                    {item.progress}%
                  </span>
                </div>

                {/* Temporary button to mark complete */}
                {item.unlocked && item.progress < 100 && (
                  <button
                    className="absolute top-4 right-4 text-xs bg-light-blue-1 text-white px-2 py-1 rounded"
                    onClick={() => handleComplete(idx)}
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListeningPage;
