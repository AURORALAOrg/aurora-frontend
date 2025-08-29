import { useState } from 'react';
import AssessmentContainer from '../../../components/assessment/AssessmentContainer';
import { Card } from '../../../components/ui/card';

// Mock audio sources - replace with actual audio file paths
const mockAudioPaths = {
  introduction: '/audio/introduction.mp3',
  restaurant: '/audio/restaurant.mp3',
  accents: {
    american: '/audio/american.mp3',
    british: '/audio/british.mp3'
  },
  phoneCall: '/audio/phone-call.mp3',
  directions: '/audio/directions.mp3',
  trafficJam: '/audio/traffic-jam.mp3'
};

const listeningComprehensionQuestions = [
  {
    question: "Listen to the introduction and answer: What subjects does Jennifer teach?",
    type: "single-choice",
    audioSources: [mockAudioPaths.introduction],
    options: [
      "English and math",
      "English and history",
      "History and science",
      "English and science"
    ],
    correctAnswer: "English and history",
  },
  {
    question: "Listen to the restaurant conversation. How does the customer want the vegetables prepared?",
    type: "single-choice",
    audioSources: [mockAudioPaths.restaurant],
    options: ["Grilled", "Fried", "Steamed", "Raw"],
    correctAnswer: "Steamed",
  },
  {
    question: "Listen to both speakers. Which speaker uses British English?",
    type: "single-choice",
    audioSources: [mockAudioPaths.accents.american, mockAudioPaths.accents.british],
    options: [
      "First speaker",
      "Second speaker",
      "Both speakers",
      "Neither speaker"
    ],
    correctAnswer: "Second speaker",
  },
  {
    question: "Listen to the phone conversation. Where do they plan to meet?",
    type: "single-choice",
    audioSources: [mockAudioPaths.phoneCall],
    options: [
      "At the café",
      "At the library",
      "At Mike's house",
      "At the bookstore"
    ],
    correctAnswer: "At the library",
  },
  {
    question: "Listen to the directions. What color is the bank building?",
    type: "single-choice",
    audioSources: [mockAudioPaths.directions],
    options: ["Red", "Green", "Blue", "White"],
    correctAnswer: "Blue",
  },
  {
    question: "Listen to the speaker. How does the speaker feel?",
    type: "single-choice",
    audioSources: [mockAudioPaths.trafficJam],
    options: [
      "Happy and excited",
      "Frustrated and sarcastic",
      "Surprised and pleased",
      "Calm and relaxed"
    ],
    correctAnswer: "Frustrated and sarcastic",
  }
];

const ListeningComprehensionPage = () => {
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [results, setResults] = useState(null);

  const handleAssessmentComplete = (answers) => {
    // Calculate score and generate feedback
    const score = Object.entries(answers).reduce((acc, [index, answer]) => {
      const question = listeningComprehensionQuestions[index];
      if (answer === question.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const percentage = Math.round((score / listeningComprehensionQuestions.length) * 100);

    setResults({
      score,
      maxScore: listeningComprehensionQuestions.length,
      percentage,
      feedback: generateFeedback(percentage)
    });

    setAssessmentCompleted(true);
  };

  const generateFeedback = (percentage) => {
    if (percentage >= 90) {
      return "Excellent! Your listening comprehension skills are advanced.";
    } else if (percentage >= 70) {
      return "Good work! You have a solid foundation in listening comprehension.";
    } else if (percentage >= 50) {
      return "You're making progress! Keep practicing to improve your listening skills.";
    } else {
      return "Keep practicing! Focus on listening to different accents and speeds.";
    }
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
            <p className="text-neutral-2">{results.feedback}</p>
            {/* Add specific recommendations based on performance */}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-blue-6">
      <AssessmentContainer
        title="Basic Listening Comprehension"
        description="Test your ability to understand different contexts, accents, and speaking speeds."
        questions={listeningComprehensionQuestions}
        onComplete={handleAssessmentComplete}
      />
    </div>
  );
};

export default ListeningComprehensionPage;
