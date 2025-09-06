import { useEffect, useState } from "react";
import { FileText, CheckCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const grammarTopics = [
  {
    id: "present-simple",
    title: "Present Simple",
    progress: 100,
    unlocked: true,
  },
  { id: "past-simple", title: "Past Simple", progress: 0, unlocked: true },
  {
    id: "present-continuous",
    title: "Present Continuous",
    progress: 75,
    unlocked: true,
  },
  {
    id: "articles",
    title: "Articles (A/An/The)",
    progress: 30,
    unlocked: true,
  },
  { id: "plural-nouns", title: "Plural Nouns", progress: 0, unlocked: true },
  {
    id: "basic-pronouns",
    title: "Basic Pronouns",
    progress: 0,
    unlocked: false,
  },
  {
    id: "subject-verb",
    title: "Subject-Verb Agreement",
    progress: 0,
    unlocked: false,
  },
  {
    id: "possessive-adj",
    title: "Possessive Adjectives",
    progress: 0,
    unlocked: false,
  },
  {
    id: "prepositions",
    title: "Prepositions of Place",
    progress: 0,
    unlocked: false,
  },
];

const STORAGE_KEY = "grammarProgress";

const getInitialProgress = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  // Default: first lesson unlocked, rest locked, all progress 0
  return grammarTopics.map((topic, index) => ({
    id: topic.id,
    progress: 0,
    unlocked: index === 0,
  }));
};

const GrammarPage = () => {
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
          <h1 className="text-3xl font-bold mb-2">Grammar</h1>
          <p className="text-neutral-2">
            Master the building blocks of language through structured lessons
            and exercises
          </p>
        </div>

        <div className="space-y-3">
          {progressList.map((item, idx) => {
            const topic = grammarTopics[idx];
            return (
              <div
                key={item.id}
                className={`bg-dark-blue-5 rounded-lg p-4 border-2 border-[#1f2937] relative ${
                  !item.unlocked ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-dark-blue-4 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-light-blue-1" />
                    </div>
                    <span className="text-neutral-1 font-medium">
                      {topic.title}
                    </span>
                  </div>
                  {item.unlocked ? (
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.progress === 100
                          ? "bg-green/20"
                          : "bg-light-blue-1/20"
                      }`}
                    >
                      <CheckCircle
                        className={`w-5 h-5 ${
                          item.progress === 100
                            ? "text-green"
                            : "text-light-blue-1"
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
                        ? "bg-light-blue-1"
                        : ""
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-neutral-2">
                    {item.progress}%
                  </span>
                  {/* Only show navigation if unlocked */}
                  {item.unlocked && topic.id === "past-simple" && (
                    <Link
                      to="/past-simple-course"
                      className="text-xs bg-light-blue-1 text-white px-3 py-1 rounded hover:bg-light-blue-2 transition-colors"
                    >
                      Start Course
                    </Link>
                  )}
                </div>
                {/* Demo button to mark complete */}
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

export default GrammarPage;
