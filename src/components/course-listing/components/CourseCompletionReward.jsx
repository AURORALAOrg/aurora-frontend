"use client";

import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

export const CourseCompletionReward = ({ show, onClose }) => {
  const ctaRef = useRef(null);

  useEffect(() => {
    if (show) ctaRef.current?.focus();
  }, [show]);

  if (!show) return null;
  const closeOnEsc = (e) => {  
        if (e.key === "Escape") onClose?.();  
      };  
      
     const closeOnBackdrop = () => onClose?.();  
      const contentClick = (e) => e.stopPropagation();  

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-reward-title"
      onKeyDown={closeOnEsc}
      onClick={closeOnBackdrop}
      tabIndex={-1}
    >
      <div
        className="bg-gradient-to-br from-yellow-400 to-orange-500 p-8 rounded-2xl text-center max-w-md mx-4 animate-in zoom-in-95 duration-500"
        onClick={contentClick}
      >
        <div className="text-6xl mb-4">🎉</div>
        <h3
          id="course-reward-title"
          className="text-2xl font-bold text-white mb-2"
        >
          Congratulations!
        </h3>
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
          ref={ctaRef}
          className="bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Continue Learning
        </button>
      </div>
    </div>
  );
};
