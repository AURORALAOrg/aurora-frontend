import QuizComp from "@/components/practices/quiz/quiz";

const questions = [
  {
    question: "What is the past tense of 'go'?",
    options: ["goed", "gone", "going", "went"],
    answer: "went",
    feedback: "The past tense of 'go' is 'went'. It's an irregular verb.",
  },
  {
    question: "Which word is a noun?",
    options: ["run", "happy", "house", "quickly"],
    answer: "house",
    feedback: "'House' is a noun - it's a person, place, or thing.",
  },
  {
    question: "What is the plural of 'child'?",
    options: ["childs", "childes", "children", "childern"],
    answer: "children",
    feedback: "'Children' is an irregular plural form of 'child'.",
  },
  {
    question: "What is the past tense of 'eat'?",
    options: ["eated", "ate", "eaten", "eating"],
    answer: "ate",
    feedback: "The past tense of 'eat' is 'ate'. It's another irregular verb.",
  },
  {
    question: "Which word is an adjective?",
    options: ["run", "happy", "jump", "apple"],
    answer: "happy",
    feedback: "'Happy' is an adjective - it describes a feeling or quality.",
  },
  {
    question: "What is the plural of 'mouse'?",
    options: ["mouses", "mice", "mouse", "mices"],
    answer: "mice",
    feedback: "'Mice' is the correct plural form of 'mouse'.",
  },
  {
    question: "What is the comparative form of 'big'?",
    options: ["bigger", "biggest", "bigly", "big"],
    answer: "bigger",
    feedback: "'Bigger' is the comparative form of 'big'.",
  },
  {
    question: "What is the past tense of 'read'?",
    options: ["red", "readed", "reads", "read"],
    answer: "read",
    feedback:
      "The past tense of 'read' is spelled the same, but pronounced 'red'.",
  },
  {
    question: "Which word is a verb?",
    options: ["run", "quick", "house", "beautiful"],
    answer: "run",
    feedback: "'Run' is a verb because it describes an action.",
  },
  {
    question: "What is the plural of 'tooth'?",
    options: ["tooths", "teeth", "toothes", "tooth"],
    answer: "teeth",
    feedback: "'Teeth' is the plural form of 'tooth'.",
  },
  {
    question: "What is the superlative form of 'good'?",
    options: ["best", "better", "goodest", "good"],
    answer: "best",
    feedback: "The superlative form of 'good' is 'best'.",
  },
  {
    question: "What is the past tense of 'run'?",
    options: ["runed", "ran", "running", "runned"],
    answer: "ran",
    feedback: "The past tense of 'run' is 'ran'.",
  },
  {
    question: "What is the past tense of 'sing'?",
    options: ["sang", "singed", "song", "sung"],
    answer: "sang",
    feedback: "The past tense of 'sing' is 'sang'.",
  },
  {
    question: "Which word is a conjunction?",
    options: ["and", "jump", "quickly", "apple"],
    answer: "and",
    feedback: "'And' is a conjunction because it connects words or clauses.",
  },
  {
    question: "What is the plural of 'woman'?",
    options: ["womans", "womens", "woman", "women"],
    answer: "women",
    feedback: "'Women' is the correct plural form of 'woman'.",
  },
];

export default function Quiz() {
  return (
    <>
      <QuizComp questions={questions} />
    </>
  );
}
