import React from "react";
import {
  Mic,
  CheckCircle,
  Lock,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const SpeakingPage = () => {
  const speakingTopics = [
    {
      id: "basic-pronunciation",
      title: "Basic Pronunciation",
      progress: 100,
      unlocked: true,
    },
    {
      id: "everyday-phrases",
      title: "Everyday Phrases",
      progress: 85,
      unlocked: true,
    },
    {
      id: "conversation-skills",
      title: "Conversation Skills",
      progress: 60,
      unlocked: true,
    },
    {
      id: "fluency-building",
      title: "Fluency Building",
      progress: 40,
      unlocked: true,
    },
    {
      id: "public-speaking",
      title: "Public Speaking",
      progress: 0,
      unlocked: false,
    },
    {
      id: "debate-discussion",
      title: "Debate & Discussion",
      progress: 0,
      unlocked: false,
    },
    {
      id: "presentations",
      title: "Presentations",
      progress: 0,
      unlocked: false,
    },
    {
      id: "accent-reduction",
      title: "Accent Reduction",
      progress: 0,
      unlocked: false,
    },
  ];

  const basicConversationCourses = [
    {
      id: "greetings-introductions",
      title: "Greetings & Introductions",
      progress: 100,
      unlocked: true,
    },
    {
      id: "ordering-food-drinks",
      title: "Ordering Food & Drinks",
      progress: 100,
      unlocked: true,
    },
    {
      id: "asking-directions",
      title: "Asking for Directions",
      progress: 100,
      unlocked: true,
    },
    {
      id: "small-talk-basics",
      title: "Small Talk Basics",
      progress: 90,
      unlocked: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#111827] text-neutral-1 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Speaking Practice</h1>
          <p className="text-neutral-2">
            Improve your speaking abilities from pronunciation to fluent
            conversation
          </p>
        </div>

        {/* Basic Conversation Assessment Banner */}
        <div className="mb-10 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-lg p-6 border border-blue-500/30">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold mb-2 flex items-center">
                <ClipboardCheck className="w-6 h-6 mr-2 text-blue-400" />
                Basic Conversation Assessments
              </h2>
              <p className="text-neutral-2">
                Test your knowledge with our new conversation assessments!
              </p>
            </div>
            <Link
              to="/conversation-assessment"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition-colors"
            >
              Take Assessment <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Basic Conversation Topics */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Basic Conversation</h2>
          <div className="space-y-3">
            {basicConversationCourses.map((topic) => (
              <div
                key={topic.id}
                className="bg-dark-blue-5 rounded-lg p-4 border-2 border-[#1f2937]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-dark-blue-4 flex items-center justify-center">
                      <Mic className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-neutral-1 font-medium">
                      {topic.title}
                    </span>
                  </div>
                  {topic.unlocked ? (
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        topic.progress === 100
                          ? "bg-green/20"
                          : "bg-blue-400/20"
                      }`}
                    >
                      <CheckCircle
                        className={`w-5 h-5 ${
                          topic.progress === 100
                            ? "text-green"
                            : "text-blue-400"
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
                        ? "bg-blue-400"
                        : ""
                    }`}
                    style={{ width: `${topic.progress}%` }}
                  />
                </div>
                <div className="text-right mt-1">
                  <span className="text-xs text-neutral-2">
                    {topic.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Speaking Topics */}
        <h2 className="text-xl font-bold mb-4">Advanced Speaking Practice</h2>
        <div className="space-y-3">
          {speakingTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-dark-blue-5 rounded-lg p-4 border-2 border-[#1f2937]"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-dark-blue-4 flex items-center justify-center">
                    <Mic className="w-5 h-5 text-orange-1" />
                  </div>
                  <span className="text-neutral-1 font-medium">
                    {topic.title}
                  </span>
                </div>
                {topic.unlocked ? (
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      topic.progress === 100 ? "bg-green/20" : "bg-orange-1/20"
                    }`}
                  >
                    <CheckCircle
                      className={`w-5 h-5 ${
                        topic.progress === 100 ? "text-green" : "text-orange-1"
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
                      ? "bg-orange-1"
                      : ""
                  }`}
                  style={{ width: `${topic.progress}%` }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-xs text-neutral-2">
                  {topic.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeakingPage;
