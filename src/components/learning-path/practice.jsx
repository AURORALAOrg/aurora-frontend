import React from "react";

const Practice = () => {
  const practiceExercises = [
    {
      title: "Word Association",
      description:
        "Match related words to strengthen your vocabulary connections",
    },
    {
      title: "Fill in the Blanks",
      description: "Complete sentences with the appropriate vocabulary words",
    },
    {
      title: "Flashcards",
      description: "Review vocabulary with interactive flashcards",
    },
    {
      title: "Context Comprehension",
      description: "Understand how words are used in different contexts",
    },
  ];
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-8">
        Practice Exercises
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {practiceExercises.map((exercise, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all"
          >
            <h3 className="text-xl font-semibold mb-2">{exercise.title}</h3>
            <p className="text-gray-400 mb-4">{exercise.description}</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Start Exercise
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Practice;
