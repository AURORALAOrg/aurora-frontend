import FillInTheBlanksQuiz from '@/components/practices/funny_practices/FillInTheBlanksQuiz.jsx';

 export default function FillInTheBlanksQuizPage() {
   return (
     <div className="min-h-screen bg-gray-50">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className="text-center mb-8">
           <h1 className="text-3xl font-bold text-gray-900 mb-2">Fill in the Blanks Challenge</h1>
           <p className="text-lg text-gray-600">
             Complete each sentence with the correct word. Use the hint button if you need help!
           </p>
         </div>

         <FillInTheBlanksQuiz />
       </div>
     </div>
   );
 }