"use client"

import { IoMdArrowRoundBack } from "react-icons/io"

const ProgressHeader = ({ onBack, currentQuestion, totalQuestions, score, moves }) => {
  return (
    <div className="flex items-center justify-between border-b mb-5 p-6 text-sm">
      <IoMdArrowRoundBack className="fill-blue-500 cursor-pointer text-xl" onClick={onBack} />
      <span className="text-blue-500 space-x-4">
        <span>
          Score:{" "}
          <span className="font-extrabold text-[15px] ml-1">
            {score}/{moves}
          </span>
        </span>
        <span>
          Questions:
          <span className="font-extrabold text-[15px] ml-1">
            {currentQuestion}/{totalQuestions}
          </span>
        </span>
      </span>
    </div>
  )
}

export default ProgressHeader
