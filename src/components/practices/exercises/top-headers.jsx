import { Plus } from "lucide-react";
import { Award } from "lucide-react";
import { Clock } from "lucide-react";




const TopHeaders = ({currentQuestion,totalQuestion,scorePercentage}) => {
  return (
    <div className="flex w-full  sm:w-full md:w-[80%] lg:w-[70%]">
      {/* current question */}
      <div className=" w-60 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 text-black   flex flex-row items-center">
          <div className="rounded-full bg-blue-300 w-10 h-10 flex items-center align-middle flex-row justify-center">
          <Plus className="text-blue-600"/>  
          </div>
          <div className="ml-5">
              <h2 className="text-sm">Current Question</h2>
              <span className="font-bold text-lg">{currentQuestion +1} of <span>{totalQuestion}</span></span>
          </div>
      </div>

      {/*scores  */}
      <div className=" md:w-60 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-white text-black flex flex-row items-center ml-4">
          <div className="rounded-full bg-green-200 w-10 h-10 flex items-center align-middle flex-row justify-center">
          <Award className="text-green-600"/>  
          </div>
          <div className="ml-5">
              <h2 className="text-sm">Score</h2>
              <span className="font-extrabold text-lg">{scorePercentage}%</span>
          </div>
      </div>

     
    </div>
  );
};

export default TopHeaders;
