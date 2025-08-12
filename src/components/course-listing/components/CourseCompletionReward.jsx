"use client";

import { Sparkles } from "lucide-react";

export const CourseCompletionReward = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in-0">
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-8 rounded-2xl text-center max-w-md mx-4 animate-in zoom-in-95 duration-500">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-white mb-2">Congratulations!</h3>
        <p className="text-white/90 mb-4">
          You&apos;ve completed the course and earned 50 points!
        </p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-white" />
          <span className="text-lg font-semibold text-white">+50 Points</span>
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <button
          onClick={onClose}
          className="bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Continue Learning
        </button>
      </div>
    </div>
  );
};
