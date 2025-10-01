import { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';

const LessonComponent = ({ lessonData, onComplete, onNext, onPrevious, lessonNumber, totalLessons }) => {
  const [currentSection, setCurrentSection] = useState('theory');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const sections = ['theory', 'examples', 'exercises', 'common-mistakes'];

  const handleAnswerSelect = (exerciseIndex, questionIndex, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [`${exerciseIndex}-${questionIndex}`]: answer
    }));
  };

  const handleExerciseComplete = () => {
    let currentScore = 0;

    lessonData.exercises.forEach((exercise, exerciseIndex) => {
      exercise.questions.forEach((question, questionIndex) => {
        const selectedAnswer = selectedAnswers[`${exerciseIndex}-${questionIndex}`];
        if (selectedAnswer === question.correctAnswer) {
          currentScore++;
        }
      });
    });

    setScore(currentScore);
    setShowResults(true);
  };

  const resetExercise = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const isAnswerCorrect = (exerciseIndex, questionIndex) => {
    const selectedAnswer = selectedAnswers[`${exerciseIndex}-${questionIndex}`];
    const question = lessonData.exercises[exerciseIndex].questions[questionIndex];
    return selectedAnswer === question.correctAnswer;
  };

  const getProgressPercentage = () => {
    const totalQuestions = lessonData.exercises.reduce((total, exercise) => total + exercise.questions.length, 0);
    const answeredQuestions = Object.keys(selectedAnswers).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const renderTheory = () => (
    <div className="space-y-6">
      <div className="bg-dark-blue-4 border-l-4 border-light-blue-1 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-light-blue-1 mb-3">
          <BookOpen className="inline w-5 h-5 mr-2" />
          {lessonData.content.theory.title}
        </h3>
        <div className="space-y-4">
          {lessonData.content.theory.rules.map((rule, index) => (
            <div key={index} className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]">
              <h4 className="font-medium text-neutral-1 mb-2">{rule.rule}</h4>
              <div className="text-sm text-neutral-2">
                <strong>Examples:</strong>
                <ul className="mt-1 ml-4">
                  {rule.examples.map((example, idx) => (
                    <li key={idx} className="italic">• {example}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          {lessonData.content.theory.exceptions && (
            <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
              <h4 className="font-medium text-yellow-400 mb-2">Important Exceptions:</h4>
              <ul className="text-sm text-yellow-300 space-y-1">
                {lessonData.content.theory.exceptions.map((exception, index) => (
                  <li key={index}>• {exception}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderExamples = () => (
    <div className="space-y-6">
      <div className="bg-dark-blue-4 border-l-4 border-green-500 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-green-400 mb-4">
          <Lightbulb className="inline w-5 h-5 mr-2" />
          Examples in Context
        </h3>
        {lessonData.content.examples.map((category, index) => (
          <div key={index} className="mb-6">
            <h4 className="font-medium text-neutral-1 mb-3">{category.category}</h4>
            <div className="grid gap-2">
              {category.sentences.map((sentence, idx) => (
                <div key={idx} className="bg-dark-blue-5 p-3 rounded border border-[#1f2937]">
                  <p className="text-neutral-2 italic">"{sentence}"</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExercises = () => (
    <div className="space-y-6">
      <div className="bg-dark-blue-4 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-light-blue-1">Practice Exercises</h3>
          <div className="text-sm text-neutral-2">
            Progress: {getProgressPercentage()}%
          </div>
        </div>

        {lessonData.exercises.map((exercise, exerciseIndex) => (
          <div key={exerciseIndex} className="mb-8">
            <div className="mb-4">
              <h4 className="font-semibold text-neutral-1 mb-2">{exercise.title}</h4>
              <p className="text-sm text-neutral-2 mb-4">{exercise.instructions}</p>
            </div>

            <div className="space-y-4">
              {exercise.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]">
                  <p className="text-neutral-1 mb-3">{questionIndex + 1}. {question.question}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selectedAnswers[`${exerciseIndex}-${questionIndex}`] === option;
                      const isCorrect = option === question.correctAnswer;
                      const showCorrectness = showResults;
                      
                      let buttonClass = "p-3 text-left rounded border transition-colors ";
                      if (showCorrectness) {
                        if (isSelected && isCorrect) {
                          buttonClass += "bg-green-900/20 border-green-500 text-green-400";
                        } else if (isSelected && !isCorrect) {
                          buttonClass += "bg-red-900/20 border-red-500 text-red-400";
                        } else if (isCorrect) {
                          buttonClass += "bg-green-900/20 border-green-500 text-green-400";
                        } else {
                          buttonClass += "bg-dark-blue-6 border-[#1f2937] text-neutral-2";
                        }
                      } else {
                        buttonClass += isSelected 
                          ? "bg-light-blue-1/20 border-light-blue-1 text-light-blue-1"
                          : "bg-dark-blue-6 border-[#1f2937] text-neutral-2 hover:border-light-blue-1/50";
                      }

                      return (
                        <button
                          key={optionIndex}
                          onClick={() => !showResults && handleAnswerSelect(exerciseIndex, questionIndex, option)}
                          className={buttonClass}
                          disabled={showResults}
                        >
                          <div className="flex items-center">
                            {showCorrectness && (
                              <div className="mr-2">
                                {isCorrect ? (
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                ) : isSelected ? (
                                  <XCircle className="w-4 h-4 text-red-400" />
                                ) : null}
                              </div>
                            )}
                            {option}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  
                  {showResults && selectedAnswers[`${exerciseIndex}-${questionIndex}`] && (
                    <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded">
                      <p className="text-blue-300 text-sm">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center pt-4">
          {!showResults ? (
            <button
              onClick={handleExerciseComplete}
              className="px-6 py-2 bg-light-blue-1 text-white rounded-lg hover:bg-light-blue-1/80 transition-colors"
              disabled={Object.keys(selectedAnswers).length === 0}
            >
              Check Answers
            </button>
          ) : (
            <div className="flex space-x-4">
              <button
                onClick={resetExercise}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Try Again
              </button>
              <div className="flex items-center text-neutral-1">
                Score: {score}/{lessonData.exercises.reduce((total, ex) => total + ex.questions.length, 0)}
                {score >= lessonData.exercises.reduce((total, ex) => total + ex.questions.length, 0) * 0.7 && (
                  <CheckCircle className="w-5 h-5 text-green-400 ml-2" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCommonMistakes = () => (
    <div className="space-y-6">
      <div className="bg-dark-blue-4 border-l-4 border-red-500 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-red-400 mb-4">
          <AlertTriangle className="inline w-5 h-5 mr-2" />
          Common Mistakes to Avoid
        </h3>
        
        {lessonData.commonMistakes.map((mistake, index) => (
          <div key={index} className="mb-6 bg-dark-blue-5 p-4 rounded border border-[#1f2937]">
            <h4 className="font-medium text-neutral-1 mb-2">{mistake.mistake}</h4>
            <div className="space-y-2">
              <div className="text-red-400 text-sm">
                <span className="font-medium">Wrong:</span> {mistake.example}
              </div>
              <div className="text-green-400 text-sm">
                <span className="font-medium">Correct:</span> {mistake.correction}
              </div>
              <div className="text-neutral-3 text-sm">
                <span className="font-medium">Why:</span> {mistake.explanation}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentSection) {
      case 'theory':
        return renderTheory();
      case 'examples':
        return renderExamples();
      case 'exercises':
        return renderExercises();
      case 'common-mistakes':
        return renderCommonMistakes();
      default:
        return renderTheory();
    }
  };

  const sectionTitles = {
    'theory': 'Theory',
    'examples': 'Examples',
    'exercises': 'Exercises',
    'common-mistakes': 'Common Mistakes'
  };

  return (
    <div className="space-y-6">
      <div className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]">
        <h2 className="text-2xl font-bold text-neutral-1 mb-2">{lessonData.title}</h2>
        <p className="text-neutral-2 mb-4">{lessonData.description}</p>
        <div className="text-sm text-neutral-3">
          Lesson {lessonNumber} of {totalLessons}
        </div>
      </div>

      <div className="flex space-x-2 overflow-x-auto">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setCurrentSection(section)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              currentSection === section
                ? 'bg-light-blue-1 text-white'
                : 'bg-dark-blue-5 text-neutral-2 hover:text-neutral-1'
            }`}
          >
            {sectionTitles[section]}
          </button>
        ))}
      </div>

      {renderContent()}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onPrevious}
          className="flex items-center px-4 py-2 bg-dark-blue-5 text-neutral-2 rounded-lg hover:text-neutral-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous Lesson
        </button>

        <div className="flex space-x-4">
          {lessonNumber < totalLessons ? (
            <button
              onClick={onNext}
              className="flex items-center px-4 py-2 bg-light-blue-1 text-white rounded-lg hover:bg-light-blue-1/80 transition-colors"
            >
              Next Lesson
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={onComplete}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Complete Course
              <CheckCircle className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonComponent;