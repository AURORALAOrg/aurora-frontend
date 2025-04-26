import { useState } from "react";
 import { Link } from "react-router-dom";
 import { RefreshCw, Home, HelpCircle } from "lucide-react";

 // Mock data for the fill in the blanks quiz
 const mockQuestions = [
   {
     id: 1,
     question: "The capital of France is _____.",
     answer: "Paris",
     hint: "This city is known as the City of Light",
   },
   {
     id: 2,
     question: "Water boils at _____ degrees Celsius at sea level.",
     answer: "100",
     hint: "It's a round number, think about the metric system",
   },
   {
     id: 3,
     question: "The largest planet in our solar system is _____.",
     answer: "Jupiter",
     hint: "Named after the king of Roman gods",
   },
   {
     id: 4,
     question: "The chemical symbol for gold is _____.",
     answer: "Au",
     hint: "Comes from the Latin word 'aurum'",
   },
   {
     id: 5,
     question: "Shakespeare wrote 'Romeo and _____'.",
     answer: "Juliet",
     hint: "A tragic love story between two feuding families",
   },
   {
     id: 6,
     question: "The Great Wall of _____ is visible from space.",
     answer: "China",
     hint: "Located in Asia's largest country by population",
   },
   {
     id: 7,
     question: "The speed of light is approximately 300,000 kilometers per _____.",
     answer: "second",
     hint: "A basic unit of time",
   },
   {
     id: 8,
     question: "The human body has _____ pairs of chromosomes.",
     answer: "23",
     hint: "It's between 20 and 25",
   },
   {
     id: 9,
     question: "The process of plants converting sunlight to energy is called _____.",
     answer: "photosynthesis",
     hint: "Photo means light, and synthesis means putting together",
   },
   {
     id: 10,
     question: "The currency of Japan is the _____.",
     answer: "yen",
     hint: "A three-letter word that starts with 'y'",
   },
 ];

 export default function FillInTheBlanksQuiz() {
   const [answers, setAnswers] = useState(mockQuestions.map(() => ""));
   const [showHints, setShowHints] = useState(mockQuestions.map(() => false));
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [score, setScore] = useState(0);

   const handleAnswerChange = (index, value) => {
     const newAnswers = [...answers];
     newAnswers[index] = value;
     setAnswers(newAnswers);
   };

   const toggleHint = (index) => {
     const newShowHints = [...showHints];
     newShowHints[index] = !newShowHints[index];
     setShowHints(newShowHints);
   };

   const handleSubmit = () => {
     if (!isSubmitted) {
       const correctAnswers = answers.reduce((count, answer, index) => {
         return count + (answer.toLowerCase() === mockQuestions[index].answer.toLowerCase() ? 1 : 0);
       }, 0);
       setScore(correctAnswers);
       setIsSubmitted(true);
     }
   };

   const handleRestart = () => {
     setAnswers(mockQuestions.map(() => ""));
     setShowHints(mockQuestions.map(() => false));
     setIsSubmitted(false);
     setScore(0);
   };

   return (
     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
       <div className="space-y-8">
         {mockQuestions.map((question, index) => (
           <div key={question.id} className="p-4 border border-gray-200 rounded-lg">
             <div className="flex items-center justify-between mb-2">
               <h3 className="text-lg font-medium text-gray-900">
                 Question {index + 1}
               </h3>
               <button
                 onClick={() => toggleHint(index)}
                 className="px-3 py-1 bg-amber-500 text-white rounded-lg hover:bg-amber-600 flex items-center"
               >
                 <HelpCircle className="w-4 h-4 mr-1" />
                 Hint
               </button>
             </div>

             <p className="text-gray-700 mb-3">{question.question}</p>

             {showHints[index] && (
               <div className="mb-3 p-2 bg-amber-50 text-amber-800 rounded-lg">
                 <p className="text-sm">{question.hint}</p>
               </div>
             )}

             <div className="flex gap-4">
               <input
                 type="text"
                 value={answers[index]}
                 onChange={(e) => handleAnswerChange(index, e.target.value)}
                 disabled={isSubmitted}
                 placeholder="Type your answer here..."
                 className="flex-1 p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white text-gray-900 placeholder-gray-400"
               />
             </div>

             {isSubmitted && (
               <div className={`mt-2 p-2 rounded-lg ${
                 answers[index].toLowerCase() === question.answer.toLowerCase()
                   ? "bg-green-50 text-green-800"
                   : "bg-red-50 text-red-800"
               }`}>
                 <p className="text-sm">
                   {answers[index].toLowerCase() === question.answer.toLowerCase()
                     ? "Correct!"
                     : `Incorrect. The correct answer is: ${question.answer}`}
                 </p>
               </div>
             )}
           </div>
         ))}
       </div>

       <div className="mt-8 border-t pt-6">
         {isSubmitted ? (
           <div className="text-center">
             <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Results</h2>
             <p className={`text-3xl font-bold mb-4 ${
               score === mockQuestions.length
                 ? "text-emerald-600" // 100%
                 : score >= mockQuestions.length * 0.8
                 ? "text-green-600"   // 80-99%
                 : score >= mockQuestions.length * 0.6
                 ? "text-amber-600"   // 60-79%
                 : score >= mockQuestions.length * 0.4
                 ? "text-orange-600"  // 40-59%
                 : "text-red-600"     // Below 40%
             }`}>
               Score: {Math.round((score / mockQuestions.length) * 100)}%
             </p>
             <p className="text-gray-500 text-xl mb-6">
               You got {score} out of {mockQuestions.length} questions right.
             </p>
             <div className="flex justify-center gap-4">
               <button
                 onClick={handleRestart}
                 className="py-2 px-6 bg-blue-500 flex items-center text-white rounded-lg hover:bg-blue-600"
               >
                 <RefreshCw className="mr-2" />
                 Try Again
               </button>
               <Link
                 to="/"
                 className="py-2 px-6 bg-gray-500 flex items-center text-white rounded-lg hover:bg-gray-600"
               >
                 <Home className="mr-2" />
                 Return Home
               </Link>
             </div>
           </div>
         ) : (
           <div className="flex justify-center">
             <button
               onClick={handleSubmit}
               className="py-2 px-8 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg font-medium"
             >
               Submit Quiz
             </button>
           </div>
         )}
       </div>
     </div>
   );
 }  
   