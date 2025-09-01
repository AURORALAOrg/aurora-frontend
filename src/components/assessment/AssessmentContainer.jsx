import { useState } from 'react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import AudioAssessment from './AudioAssessment';

const AssessmentContainer = ({
  title,
  description,
  questions,
  onComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-neutral-2">{description}</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-neutral-2 mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="bg-dark-blue-4" />
      </div>

      <AudioAssessment
        key={currentQuestionIndex}
        question={currentQuestion.question}
        audioSources={currentQuestion.audioSources}
        options={currentQuestion.options}
        type={currentQuestion.type}
        showRecording={currentQuestion.showRecording}
        onAnswer={handleAnswer}
      />

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="text-neutral-2 border-dark-blue-4"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestionIndex]}
          className="bg-light-blue-1 hover:bg-light-blue-2 text-white"
        >
          {currentQuestionIndex + 1 === questions.length ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default AssessmentContainer;
