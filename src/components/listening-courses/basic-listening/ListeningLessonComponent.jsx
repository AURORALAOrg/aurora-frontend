import { useState, useRef } from 'react';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, BookOpen, Lightbulb, AlertTriangle, Play, Pause, Volume2, Headphones, Home } from 'lucide-react';
import audioService from '../../../services/audioService';

const ListeningLessonComponent = ({ lessonData, onComplete, onNext, onPrevious, lessonNumber, totalLessons, onBackToCourse }) => {
  const [currentSection, setCurrentSection] = useState('theory');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState({});
  const [currentAudio, setCurrentAudio] = useState(null);
  const audioRef = useRef(null);

  const sections = ['theory', 'examples', 'exercises', 'common-mistakes'];

  const handleAnswerSelect = (exerciseIndex, questionIndex, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [`${exerciseIndex}-${questionIndex}`]: answer
    }));
  };

  const handleAudioPlay = (audioUrl, exerciseIndex, questionIndex) => {
    const audioKey = `${exerciseIndex}-${questionIndex}`;
    
    // Stop current audio if playing
    if (currentAudio && currentAudio !== audioKey) {
      setIsPlaying(prev => ({ ...prev, [currentAudio]: false }));
      audioService.stopAll();
    }
    
    // Toggle current audio
    if (isPlaying[audioKey]) {
      setIsPlaying(prev => ({ ...prev, [audioKey]: false }));
      audioService.stopAll();
    } else {
      setIsPlaying(prev => ({ ...prev, [audioKey]: true }));
      setCurrentAudio(audioKey);
      
      // Use mock audio service
      const audio = audioService.createAudio(audioUrl);
      audio.onended = () => {
        setIsPlaying(prev => ({ ...prev, [audioKey]: false }));
      };
      
      audio.onerror = () => {
        console.error('Audio playback error');
        setIsPlaying(prev => ({ ...prev, [audioKey]: false }));
      };
      
      audio.play();
    }
  };

  const handleExerciseComplete = () => {
    let currentScore = 0;
    const totalQuestions = lessonData.exercises.reduce((total, exercise) => total + exercise.questions.length, 0);

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

    // Call onComplete callback to mark lesson as completed
    if (onComplete) {
      onComplete(currentScore, totalQuestions);
    }
  };

  const resetExercise = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setIsPlaying({});
    audioService.stopAll();
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
          <Headphones className="inline w-5 h-5 mr-2" />
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
          Listening Examples
        </h3>
        <div className="space-y-4">
          {lessonData.content.examples.map((category, index) => (
            <div key={index} className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]">
              <h4 className="font-medium text-neutral-1 mb-3">{category.category}</h4>
              <div className="space-y-2">
                {category.sentences.map((sentence, idx) => (
                  <div key={idx} className="text-neutral-2 p-2 bg-dark-blue-4 rounded flex items-center justify-between">
                    <span>{sentence.text}</span>
                    {sentence.audioUrl && (
                      <button
                        onClick={() => handleAudioPlay(sentence.audioUrl, 'example', idx)}
                        className="p-2 rounded-lg bg-light-blue-1/20 hover:bg-light-blue-1/30 transition-colors"
                      >
                        {isPlaying[`example-${idx}`] ? (
                          <Pause className="w-4 h-4 text-light-blue-1" />
                        ) : (
                          <Play className="w-4 h-4 text-light-blue-1" />
                        )}
                      </button>
                    )}
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
          <Headphones className="inline w-5 h-5 mr-2" />
          Listening Practice Exercises
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
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-medium text-neutral-1">
                          {questionIndex + 1}. {question.question}
                        </p>
                        {question.audioUrl && (
                          <button
                            onClick={() => handleAudioPlay(question.audioUrl, exerciseIndex, questionIndex)}
                            className="p-2 rounded-lg bg-light-blue-1/20 hover:bg-light-blue-1/30 transition-colors"
                          >
                            {isPlaying[`${exerciseIndex}-${questionIndex}`] ? (
                              <Pause className="w-4 h-4 text-light-blue-1" />
                            ) : (
                              <Play className="w-4 h-4 text-light-blue-1" />
                            )}
                          </button>
                        )}
                      </div>
                      
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
            
            <div className="flex justify-between items-center pt-4">
              <div className="text-sm text-neutral-2">
                Progress: {getProgressPercentage()}% ({Object.keys(selectedAnswers).length} of {
                  lessonData.exercises.reduce((total, exercise) => total + exercise.questions.length, 0)
                } questions answered)
              </div>
              <button
                onClick={handleExerciseComplete}
                disabled={getProgressPercentage() < 100}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  getProgressPercentage() === 100
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-neutral-600 text-neutral-400 cursor-not-allowed'
                }`}
              >
                Complete Exercise
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-dark-blue-5 p-6 rounded-lg border border-[#1f2937]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-neutral-1 mb-2">Lesson Completed! 🎉</h4>
              <p className="text-neutral-2 mb-4">
                You scored {score} out of {
                  lessonData.exercises.reduce((total, exercise) => total + exercise.questions.length, 0)
                } questions correctly.
              </p>
              <div className="text-2xl font-bold text-green-400">
                {Math.round((score / lessonData.exercises.reduce((total, exercise) => total + exercise.questions.length, 0)) * 100)}%
              </div>
              <p className="text-sm text-green-400 mt-2">
                ✅ Lesson marked as completed
              </p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={onBackToCourse}
                className="px-4 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg transition-colors"
              >
                Back to Course
              </button>
              <button
                onClick={resetExercise}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
              {onNext && (
                <button
                  onClick={onNext}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Next Lesson
                </button>
              )}
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
          Common Listening Mistakes
        </h3>
        <div className="space-y-4">
          {lessonData.content.commonMistakes.map((mistake, index) => (
            <div key={index} className="bg-dark-blue-5 p-4 rounded-lg border border-[#1f2937]">
              <h4 className="font-medium text-neutral-1 mb-2">{mistake.title}</h4>
              <p className="text-sm text-neutral-2 mb-2">{mistake.description}</p>
              <div className="text-sm text-red-300">
                <strong>How to avoid:</strong> {mistake.solution}
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
    <div className="min-h-screen bg-[#111827] text-neutral-1 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-neutral-1 mb-2">
                Lesson {lessonNumber}: {lessonData.title}
              </h1>
              <p className="text-neutral-2">{lessonData.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-neutral-3">Lesson {lessonNumber} of {totalLessons}</div>
              <div className="text-sm text-neutral-3">{lessonData.estimatedTime}</div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {sections.map((section, index) => (
                <button
                  key={section}
                  onClick={() => setCurrentSection(section)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentSection === section
                      ? 'bg-light-blue-1 text-white'
                      : 'bg-dark-blue-4 text-neutral-2 hover:bg-dark-blue-3'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={onBackToCourse}
                className="flex items-center px-4 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Course
              </button>
              {onPrevious && (
                <button
                  onClick={onPrevious}
                  className="flex items-center px-4 py-2 bg-dark-blue-4 hover:bg-dark-blue-3 text-neutral-1 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>
              )}
              {onNext && currentSection === 'exercises' && showResults && (
                <button
                  onClick={onNext}
                  className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-dark-blue-5 rounded-lg p-6 border border-[#1f2937]">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default ListeningLessonComponent;
