import React from "react";
import DropZone from "./drop-zone";

const StoryRenderer = ({ storyText, answers, onDrop }) => {
  const parts = storyText.split(/({\d+})/g);

  return (
    <div className="flex flex-wrap gap-2 justify-center text-lg">
      {parts.map((part, index) => {
        if (part.match(/{\d+}/)) {
          const placeholderIndex = parseInt(part.replace(/[{}]/g, ""), 10);
          return (
            <DropZone
              key={index}
              index={placeholderIndex}
              word={answers[placeholderIndex]}
              onDrop={onDrop}
            />
          );
        }
        return (
          <span key={index} className="text-gray-800">
            {part}
          </span>
        );
      })}
    </div>
  );
};

export default StoryRenderer;
