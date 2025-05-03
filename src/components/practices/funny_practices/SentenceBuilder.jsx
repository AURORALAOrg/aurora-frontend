import { useState, useEffect } from 'react';
 import PropTypes from 'prop-types';
 import { DndProvider, useDrag, useDrop } from 'react-dnd';
 import { HTML5Backend } from 'react-dnd-html5-backend';
 import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Progress } from "@/components/layout/ui/progress";

 const SENTENCES_DATA = [
   {
     sentence: "She enjoys reading books in the quiet library",
     words: ["quiet", "She", "books", "reading", "library", "enjoys", "in", "the"],
   },
   {
     sentence: "They will travel to Japan next summer vacation",
     words: ["Japan", "will", "They", "vacation", "to", "travel", "next", "summer"],
   },
   {
     sentence: "The cat sleeps peacefully on the warm sofa",
     words: ["cat", "warm", "The", "peacefully", "sofa", "sleeps", "on", "the"],
   },
   {
     sentence: "He is learning to play the electric guitar",
     words: ["is", "electric", "He", "the", "learning", "guitar", "play", "to"],
   },
   {
     sentence: "We had a great time at the concert",
     words: ["time", "We", "concert", "great", "the", "had", "at", "a"],
   },
 ];

 const DraggableWord = ({ word, index, type, onWordReturn }) => {
   const [{ isDragging }, drag] = useDrag(() => ({
     type: 'word',
     item: { word, index, type },
     collect: (monitor) => ({
       isDragging: monitor.isDragging(),
     }),
     end: (item, monitor) => {
       const dropResult = monitor.getDropResult();
       if (!dropResult && type === 'sentence' && onWordReturn) {
         onWordReturn(word, index);
       }
     },
   }));

   return (
     <div
       ref={drag}
       style={{ opacity: isDragging ? 0.5 : 1 }}
       className={`px-4 py-2 m-1 border rounded cursor-move 
         ${type === 'available' ? 'bg-gray-50' : 'bg-white'}`}
     >
       {word}
     </div>
   );
 };

 DraggableWord.propTypes = {
   word: PropTypes.string.isRequired,
   index: PropTypes.number.isRequired,
   type: PropTypes.string.isRequired,
   onWordReturn: PropTypes.func,
 };

 const DropZone = ({ index, onDrop, word, onWordReturn }) => {
   const [{ isOver }, drop] = useDrop({
     accept: 'word',
     drop: (item) => onDrop(item.word, item.index, item.type, index),
     collect: (monitor) => ({
       isOver: monitor.isOver(),
     }),
   });

   return (
     <div
       ref={drop}
       className={`w-24 h-12 m-1 border-2 border-dashed rounded flex items-center justify-center
         ${isOver ? 'border-primary bg-primary/10' : 'border-gray-300'}
         ${word ? 'border-solid bg-white' : ''}`}
     >
       {word && (
         <DraggableWord 
           word={word} 
           index={index} 
           type="sentence" 
           onWordReturn={onWordReturn}
         />
       )}
       {!word && <span className="text-gray-400 text-sm">Drop word</span>}
     </div>
   );
 };

 DropZone.propTypes = {
   index: PropTypes.number.isRequired,
   onDrop: PropTypes.func.isRequired,
   word: PropTypes.string,
   onWordReturn: PropTypes.func.isRequired,
 };

 const INITIAL_TIME = 120;

 const SentenceBuilder = () => {
   const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
   const [sentence, setSentence] = useState(Array(8).fill(''));
   const [availableWords, setAvailableWords] = useState(SENTENCES_DATA[0].words);
   const [progress, setProgress] = useState(0);
   const [isCurrentSentenceCorrect, setIsCurrentSentenceCorrect] = useState(false);
   const [timeLeft, setTimeLeft] = useState(120);
   const [completedSentences, setCompletedSentences] = useState(new Set());
   const [isTimerActive, setIsTimerActive] = useState(true);

   useEffect(() => {
     let timer;
     if (isTimerActive && timeLeft > 0) {
       timer = setInterval(() => {
         setTimeLeft((prev) => {
           if (prev <= 1) {
             clearInterval(timer);
             setIsTimerActive(false);
             return 0;
           }
           return prev - 1;
         });
       }, 1000);
     }

     return () => {
       if (timer) {
         clearInterval(timer);
       }
     };
   }, [timeLeft, isTimerActive]);

   const checkIfSentenceIsCorrect = (newSentence) => {
     const userSentence = newSentence.filter(Boolean).join(' ');
     const correctSentence = SENTENCES_DATA[currentSentenceIndex].sentence;
     return userSentence.toLowerCase() === correctSentence.toLowerCase();
   };

   const resetForNewSentence = (sentenceIndex) => {
     setSentence(Array(8).fill(''));
     setAvailableWords(SENTENCES_DATA[sentenceIndex].words);
     setIsCurrentSentenceCorrect(false);
     setTimeLeft(INITIAL_TIME);
   };

   const handleDrop = (word, sourceIndex, sourceType, targetIndex) => {
     let newSentence = [...sentence];

     const originalWords = SENTENCES_DATA[currentSentenceIndex].words;

     if (sourceType === 'available') {
       const replacedWord = newSentence[targetIndex];

       newSentence[targetIndex] = word;

       const newAvailableWords = originalWords.filter(w => 
         w !== word && 
         !newSentence.includes(w) || 
         w === replacedWord
       );

       setAvailableWords(newAvailableWords);
     } 
     else if (sourceType === 'sentence') {
       const temp = newSentence[targetIndex];
       newSentence[targetIndex] = newSentence[sourceIndex];
       newSentence[sourceIndex] = temp;
     }

     setSentence(newSentence);

     const isCorrect = checkIfSentenceIsCorrect(newSentence);
     setIsCurrentSentenceCorrect(isCorrect);

     if (isCorrect && !completedSentences.has(currentSentenceIndex)) {
       const newCompletedSentences = new Set(completedSentences);
       newCompletedSentences.add(currentSentenceIndex);
       setCompletedSentences(newCompletedSentences);
       setProgress((newCompletedSentences.size / SENTENCES_DATA.length) * 100);
     }
   };

   const handleWordReturn = (word, index) => {
     const newSentence = [...sentence];
     newSentence[index] = '';
     setSentence(newSentence);

     const originalWords = SENTENCES_DATA[currentSentenceIndex].words;

     const newAvailableWords = originalWords.filter(w => 
       !newSentence.includes(w) || w === word
     );

     setAvailableWords(newAvailableWords);
     setIsCurrentSentenceCorrect(false);
   };

   const handleReset = () => {
     resetForNewSentence(currentSentenceIndex);
   };

   const handleNextQuestion = () => {
     if (currentSentenceIndex < SENTENCES_DATA.length - 1 && isCurrentSentenceCorrect) {
       const nextIndex = currentSentenceIndex + 1;
       setCurrentSentenceIndex(nextIndex);
       resetForNewSentence(nextIndex);
     }
   };

   const formatTime = (seconds) => {
     const mins = Math.floor(seconds / 60);
     const secs = seconds % 60;
     return `${mins}:${secs.toString().padStart(2, '0')}`;
   };

   return (
     <DndProvider backend={HTML5Backend}>
       <Card className="w-full max-w-2xl mx-auto">
         <CardHeader>
           <CardTitle>Sentence Builder</CardTitle>
           <div className="text-sm text-gray-500">
             Exercise {currentSentenceIndex + 1} of {SENTENCES_DATA.length}
           </div>
           <Progress value={progress} className="w-full h-2" />
         </CardHeader>
         <CardContent>
           <div className="mb-6">
             <p className="mb-2 font-medium">Build your sentence here:</p>
             <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg min-h-[80px]">
               {sentence.map((word, index) => (
                 <DropZone 
                   key={index} 
                   index={index} 
                   onDrop={handleDrop}
                   word={word}
                   onWordReturn={handleWordReturn}
                 />
               ))}
             </div>
           </div>

           <div className="mb-6">
             <p className="text-lg mb-2">Available words:</p>
             <div className="flex flex-wrap gap-2 min-h-[50px] p-4 bg-gray-50 rounded-lg">
               {availableWords.map((word, index) => (
                 <DraggableWord 
                   key={`available-${word}-${index}`}
                   word={word} 
                   index={index}
                   type="available"
                 />
               ))}
             </div>
           </div>

           {isCurrentSentenceCorrect && (
             <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
               <p className="text-green-600 text-center font-medium">
                 ¡Correct! Well done! 
                 {currentSentenceIndex < SENTENCES_DATA.length - 1 && 
                   " Click 'Next Question' to continue."}
               </p>
             </div>
           )}

           <div className="flex justify-between items-center mt-6">
             <div className="flex gap-4">
               <Button variant="outline" onClick={handleReset}>Reset</Button>
             </div>
             <div className="flex items-center gap-4">
               <div className="text-sm text-gray-600">Progress: {progress}%</div>
               <div className="text-sm text-gray-600">Time Left: {formatTime(timeLeft)}</div>
             </div>
           </div>
         </CardContent>
         <div className='flex justify-center m-3'>
           <Button 
             className={`w-full rounded-lg ${
               isCurrentSentenceCorrect ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'
             } text-white transition-colors`}
             onClick={handleNextQuestion}
             disabled={!isCurrentSentenceCorrect || currentSentenceIndex === SENTENCES_DATA.length - 1}
           >
             {currentSentenceIndex === SENTENCES_DATA.length - 1 ? 'Complete!' : 'Next Question'}
           </Button>
         </div>
       </Card>
     </DndProvider>
   );
 };

 export default SentenceBuilder;