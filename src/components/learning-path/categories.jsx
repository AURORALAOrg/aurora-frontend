import React from "react";

const Categories = () => {
  const categories = [
    {
      title: "Everyday Vocabulary",
      description: "Common words and phrases for daily conversations",
      tags: ["Beginner", "Conversation", "Essential"],
    },
    {
      title: "Business & Professional",
      description: "Vocabulary for workplace and professional settings",
      tags: ["Business", "Professional", "Intermediate"],
    },
    {
      title: "Academic English",
      description: "Words and phrases for academic writing and presentations",
      tags: ["Academic", "Advanced", "Writing"],
    },
    {
      title: "Idioms & Expressions",
      description: "Common English idioms and their meanings",
      tags: ["Idioms", "Native", "Advanced"],
    },
    {
      title: "Travel & Tourism",
      description: "Essential vocabulary for travelers",
      tags: ["Travel", "Practical", "Intermediate"],
    },
    {
      title: "Technology & Digital",
      description: "Modern vocabulary for tech and digital contexts",
      tags: ["Technology", "Digital", "Modern"],
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all"
          >
            <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
            <p className="text-gray-400 mb-4">{category.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {category.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
              Start Learning
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
