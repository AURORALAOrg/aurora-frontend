import React, { useState } from "react";
import Categories from "@/components/learning-path/categories";
import Practice from "@/components/learning-path/practice";
import Progress from "@/components/learning-path/progress";
import SavedWork from "@/components/learning-path/saved-work";
import LanguageSkills from "@/components/learning-path/language-skills";

import { Folder, Bookmark, Repeat2, TrendingUp } from "lucide-react";

const VocabularySection = () => {
  const [activeTab, setActiveTab] = useState("Categories");

  const renderContent = () => {
    switch (activeTab) {
      case "Categories":
        return (
          <div
            role="tabpanel"
            id="categories-panel"
            aria-labelledby="categories-tab"
          >
            <h2 className="text-3xl font-semibold text-center mb-8">
              Vocabulary Categories
            </h2>
            <Categories />
          </div>
        );
      case "Saved Words":
        return (
          <div
            role="tabpanel"
            id="saved-words-panel"
            aria-labelledby="saved-words-tab"
          >
            <SavedWork setActiveTab={setActiveTab} />
          </div>
        );
      case "Practice":
        return (
          <div
            className="text-center text-gray-400"
            role="tabpanel"
            id="practice-panel"
            aria-labelledby="practice-tab"
          >
            <Practice />
          </div>
        );
      case "Progress":
        return (
          <div
            className="text-center text-gray-400"
            role="tabpanel"
            id="progress-panel"
            aria-labelledby="progress-tab"
          >
            <Progress />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#111827] min-h-screen text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Vocabulary Builder</h1>
          <p className="text-white text-xl max-w-3xl mx-auto">
            Expand your vocabulary with our AI-powered learning system that
            adapts to your level and learning style.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search for words..."
            className="w-full max-w-md p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

              {/* Tabs */}
              <div className="mb-10 w-full">
        <div className="flex justify-center">
          <div className="flex bg-[#374151] rounded-lg overflow-hidden max-w-xl w-full">
            {[
              { name: "Categories", icon: <Folder className="w-4 h-4 mr-1" /> },
              { name: "Saved Words", icon: <Bookmark className="w-4 h-4 mr-1" /> },
              { name: "Practice", icon: <Repeat2 className="w-4 h-4 mr-1" /> },
              { name: "Progress", icon: <TrendingUp className="w-4 h-4 mr-1" /> },
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center justify-center px-4 py-2 text-sm font-medium w-full transition-colors duration-200 ${
                  activeTab === tab.name
                    ? "bg-[#1f2937] text-white"
                    : "text-gray-300 hover:bg-[#4a5462] hover:text-white"
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>


        {/* Content */}
        {renderContent()}

        {/* Language Skills */}
        <div className="mt-20">
          <LanguageSkills />
        </div>
      </div>
    </div>
  );
};

export default VocabularySection;
