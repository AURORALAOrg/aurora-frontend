import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ExerciseComponent = ({ 
  exercise, 
  exerciseIndex, 
  onAnswer, 
  showResult, 
  selectedAnswer 
}) => {
  const [userAnswer, setUserAnswer] = useState(selectedAnswer);

  const handleAnswer = (answerIndex) => {
    if (showResult) return; // Prevent changing answer after submission
    
    setUserAnswer(answerIndex);
    const isCorrect = answerIndex === exercise.answer;
    onAnswer(isCorrect);
  };

  const getExerciseTypeLabel = (type) => {
    const labels = {
      ordering: "Sentence Ordering",
      identification: "Component ID",
      creation: "Sentence Creation",
      adjective: "Adjective Placement",
      adverb: "Adverb Positioning",
      expansion: "Sentence Expansion",
      placement: "Expression Placement",
      preposition: "Preposition Selection",
      complete: "Complete Sentence",
      combining: "Sentence Combining",
      conjunction: "Conjunction Selection",
      complex: "Complex Sentence"
    };
    return labels[type] || type;
  };

  return (
    <Card className="bg-gray-800 border-gray-700 mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-white text-lg">
            Exercise {exerciseIndex + 1}
          </CardTitle>
          <Badge variant="secondary" className="bg-gray-700 text-gray-300">
            {getExerciseTypeLabel(exercise.type)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4 text-lg">{exercise.question}</p>
        
        <div className="space-y-3">
          {exercise.options.map((option, idx) => {
            let buttonClass = "w-full py-3 px-4 text-left transition-colors ";
            
            if (showResult) {
              if (idx === exercise.answer) {
                buttonClass += "bg-green-600 hover:bg-green-600 text-white"; // Correct answer
              } else if (idx === userAnswer && idx !== exercise.answer) {
                buttonClass += "bg-red-600 hover:bg-red-600 text-white"; // Wrong answer selected
              } else {
                buttonClass += "bg-gray-700 hover:bg-gray-700 text-gray-300"; // Other options
              }
            } else {
              if (idx === userAnswer) {
                buttonClass += "bg-blue-600 hover:bg-blue-700 text-white"; // Selected
              } else {
                buttonClass += "bg-gray-700 hover:bg-gray-600 text-white"; // Not selected
              }
            }

            return (
              <Button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={buttonClass}
                disabled={showResult}
                variant="ghost"
              >
                <span className="font-medium mr-2">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {option}
              </Button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center mb-2">
              {userAnswer === exercise.answer ? (
                <span className="text-green-400 font-semibold">✓ Correct!</span>
              ) : (
                <span className="text-red-400 font-semibold">✗ Incorrect</span>
              )}
            </div>
            <p className="text-gray-300 text-sm">
              <strong>Explanation:</strong> {exercise.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExerciseComponent;
