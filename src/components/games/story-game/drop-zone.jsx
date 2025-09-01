import React from "react";
import { useDrop } from "react-dnd";

const DropZone = ({ index, word, onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: "word",
    drop: (item) => onDrop(index, item.word),
  }));

  return (
    <div
      ref={drop}
      className="px-4 py-2 border-2 border-dashed border-gray-400 rounded text-center min-w-[120px] h-12 flex items-center justify-center bg-white"
    >
      {word || <span className="text-gray-400">_______</span>}
    </div>
  );
};

export default DropZone;
