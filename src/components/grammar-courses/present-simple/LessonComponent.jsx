import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';

const LessonComponent = ({ lessonData, onComplete, onNext, onPrevious, lessonNumber, totalLessons }) => {
  const [currentSection, setCurrentSection] = useState('theory');
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
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
    let totalQuestions = 0;

    lessonData.exercises.forEach((exercise, exerciseIndex) => {
      exercise.questions.forEach((question, questionIndex) => {
        totalQuestions++;
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
          {lessonData.content.theory.importantNotes && (
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
              <h4 className="font-medium text-green-400 mb-2">Important Notes:</h4>
              <ul className="text-sm text-green-300 space-y-1">
                {lessonData.content.theory.importantNotes.map((note, index) => (
                  <li key={index}>• {note}</li>
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
      <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-green-400 mb-3">
          <Lightbulb className="inline w-5 h-5 mr-2" />
          Examples
        </h3>
        <div className="space-y-4">
          {lessonData.content.examples.map((category, index) => (
            <div key={index} className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]">
              <h4 className="font-medium text-neutral-1 mb-3">{category.category}</h4>
              <div className="space-y-2">
                {category.sentences.map((sentence, idx) => (
                  <div key={idx} className="text-neutral-2 p-2 bg-dark-blue-4 rounded">
                    {sentence}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderExercises = () => (
    <div className="space-y-6">
      <div className="bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-400 mb-3">
          <BookOpen className="inline w-5 h-5 mr-2" />
          Practice Exercises
        </h3>
        
        {!showResults ? (
          <div className="space-y-6">
            {lessonData.exercises.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex} className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]">
                <h4 className="font-medium text-neutral-1 mb-3">{exercise.title}</h4>
                <p className="text-sm text-neutral-2 mb-4">{exercise.instructions}</p>
                
                <div className="space-y-4">
                  {exercise.questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="border-l-4 border-light-blue-1 pl-4">
                      <p className="font-medium text-neutral-1 mb-3">
                        {questionIndex + 1}. {question.question}
                      </p>
                      
                      {question.options ? (
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <button
                              key={optionIndex}
                              onClick={() => handleAnswerSelect(exerciseIndex, questionIndex, option)}
                              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                selectedAnswers[`${exerciseIndex}-${questionIndex}`] === option
                                  ? 'bg-light-blue-1/20 border-light-blue-1'
                                  : 'bg-dark-blue-4 border-[#1f2937] hover:bg-dark-blue-3 text-neutral-1'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Type your answer..."
                            className="w-full p-3 border border-[#1f2937] rounded-lg bg-dark-blue-4 text-neutral-1 placeholder-neutral-3"
                            onChange={(e) => handleAnswerSelect(exerciseIndex, questionIndex, e.target.value)}
                            value={selectedAnswers[`${exerciseIndex}-${questionIndex}`] || ''}
                          />
                        </div>
                      )}
                      
                      {selectedAnswers[`${exerciseIndex}-${questionIndex}`] && (
                        <div className={`mt-3 p-3 rounded-lg ${
                          isAnswerCorrect(exerciseIndex, questionIndex)
                            ? 'bg-green-900/20 border border-green-500/30'
                            : 'bg-red-900/20 border border-red-500/30'
                        }`}>
                          <div className="flex items-center mb-2">
                            {isAnswerCorrect(exerciseIndex, questionIndex) ? (
                              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400 mr-2" />
                            )}
                            <span className={`font-medium ${
                              isAnswerCorrect(exerciseIndex, questionIndex)
                                ? 'text-green-400'
                                : 'text-red-400'
                            }`}>
                              {isAnswerCorrect(exerciseIndex, questionIndex) ? 'Correct!' : 'Incorrect'}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-2">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-neutral-2">
                Progress: {getProgressPercentage()}% complete
              </div>
              <button
                onClick={handleExerciseComplete}
                className="bg-light-blue-1 text-white px-6 py-2 rounded-lg hover:bg-light-blue-2 transition-colors"
              >
                Complete Exercises
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-dark-blue-5 p-6 rounded-lg border border-[#1f2937] text-center">
            <h4 className="text-xl font-semibold text-neutral-1 mb-4">Exercise Results</h4>
            <div className="text-3xl font-bold text-light-blue-1 mb-4">
              {score} / {lessonData.exercises.reduce((total, exercise) => total + exercise.questions.length, 0)}
            </div>
            <p className="text-neutral-2 mb-6">
              {score >= lessonData.exercises.reduce((total, exercise) => total + exercise.questions.length, 0) * 0.8
                ? "Excellent work! You've mastered this lesson."
                : "Good effort! Review the material and try again."}
            </p>
            <div className="space-x-4">
              <button
                onClick={resetExercise}
                className="bg-dark-blue-4 text-neutral-1 px-4 py-2 rounded-lg hover:bg-dark-blue-3 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => setCurrentSection('common-mistakes')}
                className="bg-light-blue-1 text-white px-4 py-2 rounded-lg hover:bg-light-blue-2 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCommonMistakes = () => (
    <div className="space-y-6">
      <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-red-400 mb-3">
          <AlertTriangle className="inline w-5 h-5 mr-2" />
          Common Mistakes to Avoid
        </h3>
        <div className="space-y-4">
          {lessonData.commonMistakes.map((mistake, index) => (
            <div key={index} className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]">
              <h4 className="font-medium text-red-400 mb-2">{mistake.mistake}</h4>
              <div className="space-y-2 text-sm">
                <div className="text-red-300">{mistake.example}</div>
                <div className="text-green-400">{mistake.correction}</div>
                <div className="text-neutral-2 mt-2">{mistake.explanation}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-neutral-1">{lessonData.title}</h1>
          <div className="text-sm text-neutral-2">
            Lesson {lessonNumber} of {totalLessons}
          </div>
        </div>
        <p className="text-neutral-2 mb-6">{lessonData.description}</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-neutral-1/10 rounded-full h-2 mb-6">
          <div 
            className="bg-light-blue-1 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((sections.indexOf(currentSection) + 1) / sections.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-dark-blue-4 p-1 rounded-lg">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => setCurrentSection(section)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              currentSection === section
                ? 'bg-light-blue-1 text-white shadow-sm'
                : 'bg-dark-blue-5 text-neutral-1 hover:bg-dark-blue-3'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mb-8">
        {renderSection()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={onPrevious}
          disabled={lessonNumber === 1}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            lessonNumber === 1
              ? 'bg-dark-blue-4 text-neutral-3 cursor-not-allowed'
              : 'bg-dark-blue-4 text-neutral-1 hover:bg-dark-blue-3'
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous Lesson
        </button>



        {lessonNumber === totalLessons ? (
          <button
            onClick={onComplete}
            className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
            style={{ backgroundColor: '#10b981', color: 'white' }}
          >
            Complete Course
            <CheckCircle className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex items-center px-4 py-2 bg-light-blue-1 text-white rounded-lg hover:bg-light-blue-2 transition-colors"
          >
            Next Lesson
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonComponent; 