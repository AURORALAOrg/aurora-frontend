import { useEffect, useState } from 'react';
import { CheckCircle, Star, Trophy, ArrowRight } from 'lucide-react';

const LessonCompletionModal = ({ isOpen, onClose, lessonTitle, score, totalQuestions, hasNextLesson, onNextLesson, onBackToCourse }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowAnimation(true);
      // Auto-advance to next lesson after 3 seconds if there's a next lesson
      const timer = setTimeout(() => {
        if (hasNextLesson && onNextLesson) {
          onNextLesson();
        } else {
          onClose();
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, hasNextLesson, onNextLesson]);

  if (!isOpen) return null;

  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-blue-5 rounded-lg border border-[#1f2937] p-8 max-w-md w-full relative overflow-hidden">
        {/* Celebration animation */}
        {showAnimation && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-4 animate-bounce">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="absolute top-4 right-4 animate-bounce" style={{ animationDelay: '0.2s' }}>
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="absolute bottom-4 left-4 animate-bounce" style={{ animationDelay: '0.4s' }}>
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="absolute bottom-4 right-4 animate-bounce" style={{ animationDelay: '0.6s' }}>
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        )}

        <div className="text-center relative z-10">
          {/* Trophy icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>

          {/* Success message */}
          <h2 className="text-2xl font-bold text-neutral-1 mb-2">
            {hasNextLesson ? 'Lesson Completed!' : 'Course Completed!'}
          </h2>
          <p className="text-neutral-2 mb-4">{lessonTitle}</p>
          {!hasNextLesson && (
            <p className="text-sm text-green-400 mb-4">
              Congratulations! You have completed the entire basic listening course.
            </p>
          )}

          {/* Score display */}
          <div className="bg-dark-blue-4 rounded-lg p-4 mb-6">
            <div className="text-3xl font-bold text-green-400 mb-2">{percentage}%</div>
            <div className="text-sm text-neutral-2">
              {score} out of {totalQuestions} questions correct
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm text-green-400">Progress saved</span>
            </div>
            <p className="text-xs text-neutral-3">
              {hasNextLesson ? 'Next lesson is now available' : 'You have completed the entire course!'}
            </p>
            {hasNextLesson && (
              <p className="text-xs text-blue-400 mt-1">
                Automatically advancing in 3 seconds...
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={onBackToCourse}
              className="flex-1 px-4 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg transition-colors"
            >
              Back to Course
            </button>
            {hasNextLesson && onNextLesson && (
              <button
                onClick={onNextLesson}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Next Lesson
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCompletionModal;
