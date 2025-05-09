import React, {useEffect, useRef, useState} from "react";
import "../../App.css";
import {useNavigate} from "react-router-dom";
const PracticeDropdown = () => {
   const [dropdown, setDropdown] = useState(false);
   const navigate = useNavigate();

   const handleNavClick = (key) => {
      const displayToPath = {
         "Sentence Builder": "/practice/sentence-builder",
         "Word matching": "/games/word-matching/",
         "Memory Card": "/games/memory-card",
         "Story Game": "/story-game",
         "Drag and Drop": "/practice/drag-drop-sentence-builder",
         "Idiom Challenge": "/practice/idiom-challenge",
         "Multiple Choice": "/practice/quiz",
         "Fill in the Blanks":"/practice/fill-in-the-blanks",
      };
      const path = displayToPath[key];

      if (path) {
         navigate(path);
      } else console.warn("❗Ruta inválida desde Header:", key);
   };
   const dropdownRef = useRef(null);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdown(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);
   return (
      <div className="relative " ref={dropdownRef}>
         <button
            className="md:text-xs  font-medium text-gray-700 py-2 border-radius-none border-transparent hover:border-transparent hover:border-radius-none hover:border-b-[#00b8d4]  hover:rounded-none hover:text-[#00b8d4] focus:outline-none transition-colors duration-200"
            onClick={() => setDropdown(!dropdown)}
         >
            Practice
         </button>
         {dropdown && (
            <div className="absolute bg-white top-12 -left-6 w-48 h-52 rounded-md border overflow-y-auto hide-scrollbar transition-all duration-300 z-10">
               <ul className="p-4 flex flex-col justify-start items-start gap-2 overflow-y-auto hide-scrollbar font-medium text-gray-600">
                  {["Sentence Builder", "Word matching", "Memory Card", "Story Game", "Drag and Drop", "Idiom Challenge", "Multiple Choice", "Fill in the Blanks"].map((item) => (
                     <button
                        key={item}
                        onClick={() => handleNavClick(item)}
                        className="text-xs font-medium text-gray-700 py-2 border-radius-none border-transparent hover:border-transparent hover:border-radius-none hover:border-b-[#00b8d4]  hover:rounded-none hover:text-[#00b8d4] focus:outline-none transition-colors duration-200"
                     >
                        {item}
                     </button>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
};

export default PracticeDropdown;
