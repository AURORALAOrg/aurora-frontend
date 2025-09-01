import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const WordScrambleDifficultySelector = ({ onSelectDifficulty }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleSelect = (level) => {
    setSelectedLevel(level);
    onSelectDifficulty(level);
  };

  return (
    <div className="bg-white text-white p-6 rounded-2xl min-w-[350px] mx-auto text-center shadow-lg animate-popup">
      <div className="flex items-center justify-between border-b mb-5 px-0 py-2 text-sm">
        <Link to={"/games"}>
          <IoMdArrowRoundBack className="fill-blue-500 cursor-pointer" />
        </Link>
      </div>
      <h2 className="text-xl md:text-[2rem] mb-8 text-blue-500 font-extrabold">
        Select Difficulty Level
      </h2>
      <button
        className={`block w-full py-2 md:py-3 mb-2 md:rounded-xl text-base md:text-lg font-bold transition ${
          selectedLevel === "A1"
            ? "bg-blue-700"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={() => handleSelect("A1")}
      >
        Beginner (A1)
      </button>
      <button
        className={`block w-full py-2 md:py-3 mb-2 md:rounded-xl text-base md:text-lg font-bold transition ${
          selectedLevel === "A2"
            ? "bg-blue-700"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={() => handleSelect("A2")}
      >
        Elementary (A2)
      </button>
      <button
        className={`block w-full py-2 md:py-3 md:rounded-xl text-base md:text-lg font-bold transition ${
          selectedLevel === "B1"
            ? "bg-blue-700"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={() => handleSelect("B1")}
      >
        Intermediate (B1)
      </button>
    </div>
  );
};

export default WordScrambleDifficultySelector;
