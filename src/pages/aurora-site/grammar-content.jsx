import React from "react";
import { FileText, CheckCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const GrammarPage = () => {
  const grammarTopics = [
    { id: "present-simple", title: "Present Simple", progress: 100, unlocked: true },
    { id: "past-simple", title: "Past Simple", progress: 0, unlocked: true },
    { id: "present-continuous", title: "Present Continuous", progress: 75, unlocked: true },
    { id: "articles", title: "Articles (A/An/The)", progress: 30, unlocked: true },
    { id: "plural-nouns", title: "Plural Nouns", progress: 0, unlocked: true },
    { id: "basic-pronouns", title: "Basic Pronouns", progress: 0, unlocked: false },
    { id: "subject-verb", title: "Subject-Verb Agreement", progress: 0, unlocked: false },
    { id: "possessive-adj", title: "Possessive Adjectives", progress: 0, unlocked: false },
    { id: "prepositions", title: "Prepositions of Place", progress: 0, unlocked: false },
  ];

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
          {grammarTopics.map((topic) => (
            <div key={topic.id} className="bg-dark-blue-5 rounded-lg p-4 border-2 border-[#1f2937]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-dark-blue-4 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-light-blue-1" />
                  </div>
                  <span className="text-neutral-1 font-medium">{topic.title}</span>
                </div>
                {topic.unlocked ? (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    topic.progress === 100
                      ? "bg-green/20"
                      : "bg-light-blue-1/20"
                  }`}>
                    <CheckCircle
                      className={`w-5 h-5 ${
                        topic.progress === 100
                          ? "text-green"
                          : "text-light-blue-1"
                      }`}
                    />
                  </div>
                ) : (
                  <Lock className="w-5 h-5 text-neutral-4" />
                )}
              </div>
              <div className="h-2 w-full bg-neutral-1/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    topic.progress === 100
                      ? "bg-green"
                      : topic.progress > 0
                      ? "bg-light-blue-1"
                      : ""
                  }`}
                  style={{ width: `${topic.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-neutral-2">{topic.progress}%</span>
                {topic.unlocked && topic.id === "present-simple" && (
                  <Link
                    to="/present-simple-course"
                    className="text-xs bg-light-blue-1 text-white px-3 py-1 rounded hover:bg-light-blue-2 transition-colors"
                  >
                    Start Course
                  </Link>
                )}
                {topic.unlocked && topic.id === "past-simple" && (
                  <Link
                    to="/past-simple-course"
                    className="text-xs bg-light-blue-1 text-white px-3 py-1 rounded hover:bg-light-blue-2 transition-colors"
                  >
                    Start Course
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrammarPage;
