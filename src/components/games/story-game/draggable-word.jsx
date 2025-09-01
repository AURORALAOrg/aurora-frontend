import React from "react";
import { useDrag } from "react-dnd";

const DraggableWord = ({ word, disabled }) => {
  const [, drag] = useDrag(() => ({
    type: "word",
    item: { word },
    canDrag: !disabled,
  }));

  return (
    <div
      ref={!disabled ? drag : null}
      className={`px-4 py-2 rounded shadow-md text-center font-bold ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
      }`}
    >
      {word}
    </div>
  );
};

export default DraggableWord;
