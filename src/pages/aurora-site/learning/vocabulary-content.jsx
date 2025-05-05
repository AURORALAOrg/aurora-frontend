
import React, { useState } from "react";
import Categories from "@/components/learning-path/categories";
import Practice from "@/components/learning-path/practice";
import Progress from "@/components/learning-path/progress";
import SavedWork from "@/components/learning-path/saved-work";
import LanguageSkills from "@/components/learning-path/language-skills";

import { Folder, Bookmark, Repeat2, TrendingUp } from "lucide-react";

const VocabularySection = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("Categories");

  // Render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Categories":
        return (
          <div
            role="tabpanel"
            id="categories-panel"
            aria-labelledby="categories-tab"
          >
            <h2 className="text-3xl font-semibold text-center mb-8 ">
              Vocabulary Categories
            </h2>
            <Categories />
          </div>
        );
      case "Saved Words":
        <div
          role="tabpanel"
          id="saved-words-panel"
          aria-labelledby="saved-words-tab"
        >
          <SavedWork setActiveTab={setActiveTab} />
        </div>
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
    <div className="bg-gray-900 min-h-screen text-white p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Vocabulary Builder</h1>
        <div className="w-full flex justify-center mt-3">
          <p className="text-white w-[60%] text-2xl">
            Expand your vocabulary with our AI-powered learning system that
            adapts to your level and learning style.
          </p>

        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for words..."
          className="w-full max-w-md p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="container mx-auto">
        <div className="mb-8 w-full overflow-x-auto">
          <div className="flex min-w-max md:min-w-0 md:justify-center space-x-1 md:space-x-6 bg-gray-700 container mx-auto px-2 md:px-0">
            {[
              {
                name: "Categories",
                icon: <Folder className="w-4 h-4 md:mr-2" />,
              },
              { name: "Saved Words", icon: <Bookmark className="w-4 h-4 md:mr-2" /> },
              {
                name: "Practice",
                icon: <Repeat2 className="w-4 h-4 md:mr-2" />,
              },
              {
                name: "Progress",
                icon: <TrendingUp className="w-4 h-4 md:mr-2" />,
              },
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-3 py-2 md:py-3 text-sm md:text-base whitespace-nowrap transition-colors flex items-center ${
                  activeTab === tab.name
                    ? "text-white bg-gray-800 font-medium border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-white hover:bg-gray-600"
                } rounded-t-lg md:w-full md:justify-center`}
              >
                {tab.icon}
                <span className="hidden md:inline">{tab.name}</span>
                <span className="md:hidden ml-1">{tab.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {renderContent()}
      </div>

      <div className="mb-10 mt-16">
        <LanguageSkills />
      </div>
    </div>
  );
};

export default VocabularySection;
