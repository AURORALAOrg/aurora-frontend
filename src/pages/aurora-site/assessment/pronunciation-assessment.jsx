import { useState } from 'react';
import AssessmentContainer from '../../components/assessment/AssessmentContainer';
import { Card } from '../../components/ui/card';

// Mock audio sources - replace with actual audio file paths
const mockAudioPaths = {
  thinkVsSink: '/audio/think-vs-sink.mp3',
  veryVsBerry: '/audio/very.mp3',
  carSpanish: '/audio/car-spanish.mp3',
  carAmerican: '/audio/car-american.mp3',
  sheep: '/audio/sheep.mp3',
  fast: '/audio/fast.mp3',
};

const difficultSoundsQuestions = [
  {
    question: "Listen to these word pairs and choose which word you hear:",
    type: "single-choice",
    audioSources: [mockAudioPaths.thinkVsSink],
    options: ["think", "sink"],
    correctAnswer: "think",
  },
  {
    question: "Listen and choose the word you hear:",
    type: "single-choice",
    audioSources: [mockAudioPaths.veryVsBerry],
    options: ["very", "berry", "merry", "ferry"],
    correctAnswer: "very",
  },
  {
    question: "Listen to these words and identify which has the correct American R sound:",
    type: "single-choice",
    audioSources: [mockAudioPaths.carSpanish, mockAudioPaths.carAmerican],
    options: ["First pronunciation", "Second pronunciation"],
    correctAnswer: "Second pronunciation",
  },
  {
    question: "Listen and choose which word you hear:",
    type: "single-choice",
    audioSources: [mockAudioPaths.sheep],
    options: ["ship", "sheep", "shop", "shape"],
    correctAnswer: "sheep",
  },
  {
    question: "Listen to this word and count how many sounds you hear at the end:",
    type: "single-choice",
    audioSources: [mockAudioPaths.fast],
    options: ["1 sound", "2 sounds", "3 sounds", "4 sounds"],
    correctAnswer: "2 sounds",
  },
  {
    question: "Record yourself saying: 'I think this is thirty-three.' Compare with native speaker model.",
    type: "recording",
    audioSources: ["/audio/model-sentence.mp3"],
    showRecording: true,
    options: ["Re-record", "Submit Recording"],
    correctAnswer: null, // Will be evaluated by AI
  }
];

const PronunciationAssessmentPage = () => {
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [results, setResults] = useState(null);

  const handleAssessmentComplete = (answers) => {
    // Calculate score and generate feedback
    const score = Object.entries(answers).reduce((acc, [index, answer]) => {
      const question = difficultSoundsQuestions[index];
      if (question.correctAnswer && answer === question.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const maxScore = difficultSoundsQuestions.filter(q => q.correctAnswer).length;
    const percentage = Math.round((score / maxScore) * 100);

    setResults({
      score,
      maxScore,
      percentage
    });

    setAssessmentCompleted(true);
  };

  if (assessmentCompleted) {
    return (
      <div className="min-h-screen bg-dark-blue-6 p-6">
        <Card className="max-w-2xl mx-auto p-8 bg-dark-blue-5 border-dark-blue-4">
          <h2 className="text-2xl font-bold text-white mb-4">Assessment Complete!</h2>
          <div className="space-y-4">
            <p className="text-neutral-2">
              You scored {results.score} out of {results.maxScore} ({results.percentage}%)
            </p>
            {/* Add more detailed feedback and recommendations here */}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-blue-6">
      <AssessmentContainer
        title="Difficult Sounds for Spanish Speakers"
        description="This assessment focuses on common pronunciation challenges for Spanish speakers learning English."
        questions={difficultSoundsQuestions}
        onComplete={handleAssessmentComplete}
      />
    </div>
  );
};

export default PronunciationAssessmentPage;
