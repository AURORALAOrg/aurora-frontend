import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/layout/ui/progress";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import LevelSelector from "./LevelSelector";
import { questionsApi } from "@/services/questionsApi";

const SENTENCES_DATA = [
  {
    sentence: "She has been studying for hours",
    words: ["She", "has", "been", "studying", "for", "hours"].map((word) => ({ id: uuidv4(), word })),
    explanation:
      "This sentence uses the present perfect continuous tense to describe an ongoing action.\n\n• Subject (She)\n• Auxiliary verbs (has been)\n• Main verb (studying)\n• Time expression (for hours)",
  },
  // {
  //   sentence: "I have been working all day",
  //   words: ["I", "have", "been", "working", "all", "day"].map(word => ({ id: uuidv4(), word })),
  //   explanation: "This sentence uses the present perfect continuous tense.\n\n• Subject (I)\n• Auxiliary verbs (have been)\n• Main verb (working)\n• Time expression (all day)"
  // },
  // {
  //   sentence: "They have been playing soccer since morning",
  //   words: ["They", "have", "been", "playing", "soccer", "since", "morning"].map(word => ({ id: uuidv4(), word })),
  //   explanation: "This sentence uses the present perfect continuous tense to describe an ongoing action.\n\n• Subject (They)\n• Auxiliary verbs (have been)\n• Main verb (playing)\n• Time expression (since morning)"
  // },
  // {
  //   sentence: "We have been waiting for the bus for an hour",
  //   words: ["We", "have", "been", "waiting", "for", "the", "bus", "for", "an", "hour"].map(word => ({ id: uuidv4(), word })),
  //   explanation: "This sentence uses the present perfect continuous tense to describe an ongoing action.\n\n• Subject (We)\n• Auxiliary verbs (have been)\n• Main verb (waiting)\n• Time expression (for an hour)"
  // },
  // {
  //   sentence: "He has been reading that book all day",
  //   words: ["He", "has", "been", "reading", "that", "book", "all", "day"].map(word => ({ id: uuidv4(), word })),
  //   explanation: "This sentence uses the present perfect continuous tense to describe an ongoing action.\n\n• Subject (He)\n• Auxiliary verbs (has been)\n• Main verb (reading)\n• Time expression (all day)"
  // }
];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const DraggableWord = ({ word, id }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "word",
    item: { word, id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`px-4 py-2 m-1 border rounded bg-white cursor-pointer ${isDragging ? "opacity-50" : "opacity-100"}`}>
      {word}
    </div>
  );
};

DraggableWord.propTypes = {
  word: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

const DropZone = ({ sentence, onDrop, onRemove }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "word",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  return (
    <div
      ref={drop}
      className={`w-full min-h-16 border-2 border-dashed rounded flex flex-wrap items-center p-4 ${
        isOver ? "border-primary bg-primary/10" : "border-gray-300"
      }`}
    >
      {sentence.map(({ word, id }) => (
        <div key={id} className="px-4 py-2 m-1 border rounded bg-gray-200 cursor-pointer" onClick={() => onRemove(id)}>
          {word}
        </div>
      ))}
      {sentence.length === 0 && <span className="text-gray-400">Drop words here to build your sentence</span>}
    </div>
  );
};

DropZone.propTypes = {
  sentence: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDrop: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const DragDropSentenceBuilder = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sentence, setSentence] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [progress, setProgress] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isCheckEnabled, setIsCheckEnabled] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resultsDisplayed, setResultsDisplayed] = useState(false);
  const [isResetDisabled, setIsResetDisabled] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedLevel) {
      setLoading(true);
      setError(null);
      setTimeout(async () => {
        const response = await questionsApi.getAllQuestions({ englishLevel: selectedLevel, type: "sentence-builder" });
        setQuestions(response.data);
        setCurrentIndex(0);
        setSentence([]);
        setAvailableWords(shuffleArray([...response.data[0].words]));
        setProgress(0);
        setFeedback(null);
        setShowNext(false);
        setShowResults(false);
        setResultsDisplayed(false);
        setIsResetDisabled(false);
        setCorrectAnswers(0);
        setLoading(false);
      }, 500);
    }
  }, [selectedLevel]);

  useEffect(() => {
    setSentence([]);
    if (questions.length) setAvailableWords(shuffleArray([...questions[currentIndex].words]));
    setFeedback(null);
    setShowNext(false);
    setIsResetDisabled(false);
  }, [currentIndex, questions]);

  useEffect(() => {
    if (questions.length) setIsCheckEnabled(sentence.length === questions[currentIndex].words.length);
  }, [sentence, currentIndex, questions]);

  const handleDrop = ({ word, id }) => {
    setSentence((prev) => {
      if (!prev.some((w) => w.id === id) && availableWords.some((w) => w.id === id)) {
        const newSentence = [...prev, { word, id }];
        setAvailableWords((prevWords) => prevWords.filter((w) => w.id !== id));
        return newSentence;
      }
      return prev;
    });
  };

  const handleRemove = (id) => {
    setSentence((prev) => prev.filter((w) => w.id !== id));
    setAvailableWords((prev) => {
      const wordToReturn = questions[currentIndex].words.find((w) => w.id === id);
      return wordToReturn ? [...prev, wordToReturn] : prev;
    });
    setFeedback(null);
    setShowNext(false);
  };

  const checkAnswer = () => {
    const userSentence = sentence.map((w) => w.word).join(" ");
    const correctSentence = questions[currentIndex].sentence;
    if (userSentence === correctSentence) {
      setFeedback({ correct: true, message: questions[currentIndex].explanation });
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setFeedback({ correct: false, message: "Incorrect. Try again!" });
    }
    setProgress(((currentIndex + 1) / questions.length) * 100);
    if (currentIndex === questions.length - 1) {
      setShowResults(true);
    } else {
      setShowNext(true);
    }
    setIsResetDisabled(true);
  };

  const nextSentence = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsResetDisabled(false);
    }
  };

  const resetExercise = () => {
    setSentence([]);
    setAvailableWords(shuffleArray([...questions[currentIndex].words]));
    setFeedback(null);
    setShowNext(false);
    setShowResults(false);
    setResultsDisplayed(false);
  };

  const handleShowResults = () => {
    setResultsDisplayed(true);
  };

  if (!selectedLevel) {
    return <LevelSelector onLevelSelect={setSelectedLevel} />;
  }
  if (loading) {
    return <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">Loading questions...</div>;
  }
  if (error) {
    return <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">{error}</div>;
  }
  if (!questions.length) {
    return <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">No questions available for this level.</div>;
  }

  if (resultsDisplayed) {
    const percentage = (correctAnswers / questions.length) * 100;
    return (
      <DndProvider backend={HTML5Backend}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-center font-bold">Exercise Complete!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600 text-center font-extrabold text-6xl">{`${percentage}%`}</p>
            <p className="mt-3 text-center">{`You got ${correctAnswers} out of ${questions.length} sentences correct!`}</p>
            <div className="mt-3 flex justify-between w-full">
              <Button variant="outline" onClick={() => setResultsDisplayed(false)}>
                Back
              </Button>
              <Button className="rounded-lg" onClick={() => navigate("/")}>
                Main Menu
              </Button>
            </div>
          </CardContent>
        </Card>
      </DndProvider>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex flex-row justify-between mb-3">
            <CardTitle>Sentence Builder</CardTitle>
            <div className="text-sm text-gray-500">
              {currentIndex + 1} of {questions.length}
            </div>
          </div>
          <Progress value={progress} className="w-full h-2 bg-gray-200" />
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-medium">Sentence Type: Present perfect continuous</p>
            <p className="text-sm text-gray-600">Drag and drop the words to form a correct sentence.</p>
          </div>
          <DropZone sentence={sentence} onDrop={handleDrop} onRemove={handleRemove} />
          <div className="mt-6 flex flex-wrap p-4 bg-gray-50 rounded-lg">
            {availableWords.map(({ word, id }) => (
              <DraggableWord key={id} word={word} id={id} />
            ))}
          </div>
          {feedback && feedback.correct && (
            <div className="p-4 mt-4 border-l-4 border-green-500 bg-green-50 rounded-md text-green-700">
              <p className="font-semibold">✔ Grammar Explanation:</p>
              <p className="mt-2">
                <strong>{feedback.message.split("\n\n")[0]}</strong>
              </p>
              <ul className="list-none">
                {feedback.message
                  .split("\n\n")
                  .slice(1)
                  .map((item, index) => (
                    <li key={index}>
                      <pre className="font-light">{item}</pre>
                    </li>
                  ))}
              </ul>
            </div>
          )}
          {feedback && !feedback.correct && (
            <div className="p-3 mt-4 border rounded-lg bg-red-50 border-red-200 text-red-600">
              <p>{feedback.message}</p>
            </div>
          )}
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={resetExercise} disabled={isResetDisabled}>
              Reset
            </Button>
            <Button
              className="rounded-lg"
              disabled={!isCheckEnabled}
              onClick={showResults ? handleShowResults : showNext ? nextSentence : checkAnswer}
            >
              {showResults ? "Show Results" : showNext ? "Next" : "Check Answer"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </DndProvider>
  );
};
export default DragDropSentenceBuilder;