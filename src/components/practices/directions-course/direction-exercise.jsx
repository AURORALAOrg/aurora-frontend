import { useState, useEffect } from "react";
import { CheckCircle, XCircle, ArrowLeft, ArrowRight, Volume2, Map } from "lucide-react";

export default function DirectionExercise({ 
  exercise, 
  onComplete, 
  onNext, 
  onPrevious, 
  canGoBack, 
  canGoForward 
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [matchingAnswers, setMatchingAnswers] = useState({});

  // Reset state when exercise changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setMatchingAnswers({});
  }, [exercise.id]);

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    // Calculate score
    const isCorrect = answer === exercise.correctAnswer;
    onComplete(exercise.id, isCorrect ? 1 : 0);
  };

  const handleMatchingSelect = (word, meaning) => {
    setMatchingAnswers(prev => ({
      ...prev,
      [word]: meaning
    }));
  };

  const checkMatchingComplete = () => {
    const pairs = exercise.pairs;
    const allMatched = pairs.every(pair => 
      matchingAnswers[pair.word] === pair.meaning
    );
    
    if (allMatched) {
      setShowFeedback(true);
      onComplete(exercise.id, 1);
    } else {
      // TODO: Give partial credit? For now it's all or nothing
      console.log('Not all matched yet:', matchingAnswers);
    }
  };

  const renderMultipleChoice = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">
        {exercise.question}
      </h3>
      
      {exercise.mapData && (
        <div className="bg-dark-blue-5 border border-dark-blue-4 p-4 rounded-lg mb-4">
          <div className="flex items-center mb-2">
            <Map size={20} className="mr-2 text-light-blue-2" />
            <span className="font-medium text-white">Map Reference</span>
          </div>
          <div className="text-sm text-neutral-5">
            Hotel location: ({exercise.mapData.hotel?.x}, {exercise.mapData.hotel?.y})
            <br />
            Bank location: ({exercise.mapData.bank?.x}, {exercise.mapData.bank?.y})
          </div>
        </div>
      )}

      <div className="space-y-3">
        {exercise.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            disabled={showFeedback}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              showFeedback
                ? option === exercise.correctAnswer
                  ? "bg-green-900/30 border-green-500 text-green-400"
                  : option === selectedAnswer
                  ? "bg-red-900/30 border-red-500 text-red-400"
                  : "bg-dark-blue-5 border-dark-blue-4 text-neutral-5"
                : "bg-dark-blue-5 border-dark-blue-4 text-[#D1D5DB] hover:border-light-blue-2"
            }`}
          >
            <div className="flex items-center justify-between">
              {option}
              {showFeedback && option === exercise.correctAnswer && (
                <CheckCircle size={20} className="text-green-400" />
              )}
              {showFeedback && option === selectedAnswer && option !== exercise.correctAnswer && (
                <XCircle size={20} className="text-red-400" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderMatching = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">
        {exercise.question}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-[#D1D5DB] mb-3">Words:</h4>
          <div className="space-y-2">
            {exercise.pairs.map((pair, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  matchingAnswers[pair.word] === pair.meaning
                    ? "bg-green-900/30 border-green-500"
                    : "bg-dark-blue-5 border-dark-blue-4 hover:border-light-blue-2"
                }`}
              >
                <span className="text-[#D1D5DB]">{pair.word}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-[#D1D5DB] mb-3">Meanings:</h4>
          <div className="space-y-2">
            {exercise.pairs.map((pair, index) => (
              <button
                key={index}
                onClick={() => handleMatchingSelect(pair.word, pair.meaning)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  Object.values(matchingAnswers).includes(pair.meaning)
                    ? "bg-dark-blue-6 border-dark-blue-4 text-neutral-6"
                    : "bg-dark-blue-5 border-dark-blue-4 text-[#D1D5DB] hover:border-light-blue-2"
                }`}
                disabled={Object.values(matchingAnswers).includes(pair.meaning)}
              >
                {pair.meaning}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <button
          onClick={checkMatchingComplete}
          className="bg-dark-blue-5 border border-dark-blue-4 hover:border-light-blue-2 hover:text-light-blue-2 text-white px-6 py-2 rounded-lg transition-colors"
          disabled={Object.keys(matchingAnswers).length !== exercise.pairs.length}
        >
          Check Answers
        </button>
      </div>
    </div>
  );

  const renderAudioComprehension = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">
        {exercise.question}
      </h3>
      
      <div className="bg-dark-blue-5 border border-dark-blue-4 p-4 rounded-lg">
        <div className="flex items-center mb-3">
          <Volume2 size={20} className="mr-2 text-light-blue-2" />
          <span className="font-medium text-white">Audio Text:</span>
        </div>
        <p className="text-[#D1D5DB] italic"><q>{exercise.audioText}</q></p>
        <button 
          className="mt-2 text-light-blue-2 hover:text-light-blue-1 font-medium"
          onClick={() => console.log('TODO: Implement real audio playback')}
        >
          🔊 Play Audio (simulated - no real audio yet)
        </button>
      </div>

      <div className="space-y-3">
        {exercise.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            disabled={showFeedback}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              showFeedback
                ? option === exercise.correctAnswer
                  ? "bg-green-900/30 border-green-500 text-green-400"
                  : option === selectedAnswer
                  ? "bg-red-900/30 border-red-500 text-red-400"
                  : "bg-dark-blue-5 border-dark-blue-4 text-neutral-5"
                : "bg-dark-blue-5 border-dark-blue-4 text-[#D1D5DB] hover:border-light-blue-2"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  const renderDirectionFollowing = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">
        {exercise.question}
      </h3>
      
      <div className="bg-dark-blue-5 border border-dark-blue-4 p-6 rounded-lg">
        <div className="flex items-center mb-3">
          <Map size={20} className="mr-2 text-light-blue-2" />
          <span className="font-medium text-white">Interactive Map</span>
        </div>
        <div className="grid grid-cols-3 gap-2 max-w-md">
          {/* Simple map representation */}
          {exercise.landmarks?.map((landmark, index) => (
            <div 
              key={index}
              className={`p-3 text-center rounded border-2 text-sm ${
                showFeedback && landmark.name === exercise.correctAnswer
                  ? "border-green-500 bg-green-900/30 text-green-400"
                  : "border-dark-blue-4 bg-dark-blue-6 text-[#D1D5DB]"
              }`}
            >
              {landmark.name}
            </div>
          ))}
        </div>
        <p className="text-sm text-neutral-5 mt-3">
          Follow the directions step by step to find your destination.
        </p>
      </div>

      <div className="space-y-3">
        {exercise.landmarks?.map((landmark, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(landmark.name)}
            disabled={showFeedback}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              showFeedback
                ? landmark.name === exercise.correctAnswer
                  ? "bg-green-900/30 border-green-500 text-green-400"
                  : landmark.name === selectedAnswer
                  ? "bg-red-900/30 border-red-500 text-red-400"
                  : "bg-dark-blue-5 border-dark-blue-4 text-neutral-5"
                : "bg-dark-blue-5 border-dark-blue-4 text-[#D1D5DB] hover:border-light-blue-2"
            }`}
          >
            {landmark.name}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {exercise.type === "multiple-choice" && renderMultipleChoice()}
      {exercise.type === "matching" && renderMatching()}
      {exercise.type === "audio-comprehension" && renderAudioComprehension()}
      {exercise.type === "direction-following" && renderDirectionFollowing()}
      {exercise.type === "map-tracing" && renderDirectionFollowing()} {/* Similar to direction-following */}

      {/* Feedback section */}
      {showFeedback && exercise.explanation && (
        <div className={`p-4 rounded-lg border ${
          selectedAnswer === exercise.correctAnswer || Object.keys(matchingAnswers).length === exercise.pairs?.length
            ? "bg-green-900/30 border-green-500"
            : "bg-red-900/30 border-red-500"
        }`}>
          <div className="flex items-start">
            {selectedAnswer === exercise.correctAnswer || Object.keys(matchingAnswers).length === exercise.pairs?.length ? (
              <CheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" size={20} />
            ) : (
              <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={20} />
            )}
            <div>
              <p className="font-medium mb-1 text-white">
                {selectedAnswer === exercise.correctAnswer || Object.keys(matchingAnswers).length === exercise.pairs?.length 
                  ? "Correct!" 
                  : "Not quite right"}
              </p>
              <p className="text-[#D1D5DB]">{exercise.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between pt-4">
        <button
          onClick={onPrevious}
          disabled={!canGoBack}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            canGoBack
              ? "bg-dark-blue-5 border border-dark-blue-4 hover:border-light-blue-2 text-[#D1D5DB] hover:text-light-blue-2"
              : "bg-dark-blue-6 text-neutral-6 cursor-not-allowed"
          }`}
        >
          <ArrowLeft size={20} className="mr-2" />
          Previous
        </button>
        
        <button
          onClick={showFeedback && canGoForward ? onNext : () => {}}
          disabled={!showFeedback || !canGoForward}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            showFeedback && canGoForward
              ? "bg-dark-blue-5 border border-dark-blue-4 hover:border-light-blue-2 text-white hover:text-light-blue-2"
              : "bg-dark-blue-6 text-neutral-6 cursor-not-allowed"
          }`}
        >
          Next
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
}