import React, { useState, useRef } from "react";

type NavDesktopProps = {
   onNavClick: (key: string) => void;
};

const practiceOptions = [
   { label: "Sentence Builder", path: "/practice/sentence-builder" },
   { label: "Idiom Challenge", path: "/practice/idiom-challenge" },
   //   { label: "Drag and Drop", path: "/practice/drag-drop-sentence-builder" },
   { label: "Multiple Choice", path: "/practice/quiz" },
   { label: "Fill in the Blanks", path: "/practice/fill-in-the-blanks" },
];

const NavDesktop = ({ onNavClick }: NavDesktopProps) => {
   const items = ["course-listing", "practiceSystem", "analytics", "categories", "community"];

   const displayMap = {
      "course-listing": "Courses",
      "practiceSystem": "Practices",
      analytics: "Analytics",
      categories: "Resources",
      community: "Community",
   };

   const [showPracticeDropdown, setShowPracticeDropdown] = useState(false);
   const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
   const practiceDropdownRef = useRef<HTMLDivElement>(null);
   const communityDropdownRef = useRef<HTMLDivElement>(null);

   // Cerrar el dropdown al hacer click fuera
   React.useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (practiceDropdownRef.current && !practiceDropdownRef.current.contains(event.target as Node)) {
            setShowPracticeDropdown(false);
         }
         if (communityDropdownRef.current && !communityDropdownRef.current.contains(event.target as Node)) {
            setShowCommunityDropdown(false);
         }
      }
      if (showPracticeDropdown || showCommunityDropdown) {
         document.addEventListener("mousedown", handleClickOutside);
      } else {
         document.removeEventListener("mousedown", handleClickOutside);
      }
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, [showPracticeDropdown, showCommunityDropdown]);

   return (
      <nav className="hidden md:flex items-center space-x-6">
         {items.map((item) =>
            item === "practiceSystem" ? (
               <div
                  key={item}
                  className="relative"
                  onMouseEnter={() => setShowPracticeDropdown(true)}
                  onMouseLeave={() => setShowPracticeDropdown(false)}
                  ref={practiceDropdownRef}
               >
                  <button
                     className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                  >
                     {displayMap[item]}
                  </button>
                  {showPracticeDropdown && (
                     <div className="absolute left-0 top-8 w-64 bg-[#181c23] border border-[#23272f] rounded-lg shadow-lg z-50 animate-fade-in">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-[#23272f]">
                           <span className="font-semibold text-white">Prácticas</span>
                           <button onClick={() => setShowPracticeDropdown(false)} className="text-gray-400 hover:text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                           </button>
                        </div>
                        <div className="max-h-80 overflow-y-auto divide-y divide-[#23272f]">
                           {practiceOptions.map((opt) => (
                              <button
                                 key={opt.path}
                                 onClick={() => { setShowPracticeDropdown(false); onNavClick(opt.path); }}
                                 className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-[#23272f] transition-colors"
                              >
                                 {opt.label}
                              </button>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            ) : item === "community" ? (
               <div
                  key={item}
                  className="relative"
                  onMouseEnter={() => setShowCommunityDropdown(true)}
                  onMouseLeave={() => setShowCommunityDropdown(false)}
                  ref={communityDropdownRef}
               >
                  <button
                     className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                  >
                     {displayMap[item]}
                  </button>
                  {showCommunityDropdown && (
                     <div className="absolute left-0 top-8 w-48 bg-[#181c23] border border-[#23272f] rounded-lg shadow-lg z-50 animate-fade-in">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-[#23272f]">
                           <span className="font-semibold text-white">Community</span>
                           <button onClick={() => setShowCommunityDropdown(false)} className="text-gray-400 hover:text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                           </button>
                        </div>
                        <div className="max-h-80 overflow-y-auto divide-y divide-[#23272f]">
                           <button
                              onClick={() => { setShowCommunityDropdown(false); onNavClick("community"); }}
                              className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-[#23272f] transition-colors"
                           >
                              Community Home
                           </button>
                           <button
                              onClick={() => { setShowCommunityDropdown(false); onNavClick("leaderboard"); }}
                              className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-[#23272f] transition-colors flex items-center gap-2"
                           >
                              Leaderboard
                           </button>
                        </div>
                     </div>
                  )}
               </div>
            ) : (
               <button
                  key={item}
                  onClick={() => onNavClick(item)}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
               >
                  {displayMap[item]}
               </button>
            )
         )}
      </nav>
   );
};

export default NavDesktop;