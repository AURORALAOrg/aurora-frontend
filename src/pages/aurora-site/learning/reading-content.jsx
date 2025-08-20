import { useEffect, useState } from "react";
import { BookOpen, CheckCircle, Lock } from "lucide-react";

const readingTopics = [
  {
    id: "vocabulary-building",
    title: "Vocabulary Building",
    progress: 100,
    unlocked: true,
  },
  { id: "short-texts", title: "Short Texts", progress: 95, unlocked: true },
  {
    id: "comprehension",
    title: "Reading Comprehension",
    progress: 70,
    unlocked: true,
  },
  { id: "articles", title: "Articles & Essays", progress: 45, unlocked: true },
  { id: "literature", title: "Literature", progress: 15, unlocked: true },
  {
    id: "technical-reading",
    title: "Technical Reading",
    progress: 0,
    unlocked: false,
  },
  {
    id: "critical-analysis",
    title: "Critical Analysis",
    progress: 0,
    unlocked: false,
  },
  {
    id: "research-papers",
    title: "Research Papers",
    progress: 0,
    unlocked: false,
  },
];

const STORAGE_KEY = "readingProgress";

const getInitialProgress = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  // Default: first lesson unlocked, rest locked, all progress 0
  return readingTopics.map((t, i) => ({
    id: t.id,
    progress: 0,
    unlocked: i === 0,
  }));
};

const ReadingPage = () => {
  const [progressList, setProgressList] = useState(getInitialProgress());

  // Persist progress to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressList));
  }, [progressList]);

  // Simulate marking a lesson complete (for demo)
  const handleComplete = (idx) => {
    setProgressList((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, progress: 100 } : item))
    );

    setProgressList((prev) => {
      return prev.map((item, index) => {
        if (index === 0) return { ...item, unlocked: true };
        const prevCompleted = prev[index - 1].progress === 100;
        return { ...item, unlocked: prevCompleted };
      });
    });
  };

  return (
    <div className="min-h-screen bg-[#111827] text-neutral-1 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Reading Practice</h1>
          <p className="text-neutral-2">
            Build your reading skills from basic texts to complex literature
          </p>
        </div>

        <div className="space-y-3">
          {readingTopics.map((topic, idx) => {
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
                      <BookOpen className="w-5 h-5 text-green-1" />
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

export default ReadingPage;
