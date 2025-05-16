import React from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({
   searchQuery,
   showFiltered,
   filteredOptions,
   isOpen,
   handleSearchChange,
   handleSearchOptionClick,
   setIsOpen,
   searchRef,
   mobile = false
}) => {
   if (mobile && isOpen) {
      return (
         <div className="lg:hidden p-4 bg-[#0d1117] border-t border-[#1f2937] transition-all duration-300" ref={searchRef}>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
               </div>
               <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="bg-[#1f2937] border border-[#374151] text-gray-300 text-sm rounded-full focus:ring-[#00b8d4] focus:border-[#00b8d4] block w-full pl-10 pr-3 py-2"
                  autoFocus
               />
               <button className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => setIsOpen(false)}>
                  <X size={18} className="text-gray-400" />
               </button>
            </div>
            {showFiltered && filteredOptions.length > 0 && (
               <div className="mt-2 bg-[#1f2937] rounded-md z-50 max-h-40 overflow-y-auto">
                  {filteredOptions.map((option) => (
                     <button
                        key={option}
                        onClick={() => handleSearchOptionClick(option)}
                        className="block w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-[#374151]"
                     >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                     </button>
                  ))}
               </div>
            )}
         </div>
      );
   }

   return (
      <div className="hidden lg:flex relative w-48 xl:w-64" ref={searchRef}>
         <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
               <Search size={16} className="text-gray-400" />
            </div>
            <input
               type="text"
               value={searchQuery}
               onChange={handleSearchChange}
               placeholder="Search..."
               className="bg-[#1f2937] border border-[#374151] text-gray-300 text-sm rounded-full focus:ring-[#00b8d4] focus:border-[#00b8d4] block w-full pl-9 pr-3 py-1.5"
            />
         </div>
         {showFiltered && filteredOptions.length > 0 && (
            <div className="absolute top-full left-0 mt-1 w-full bg-[#1f2937] shadow-lg rounded-md z-50 max-h-60 overflow-y-auto">
               {filteredOptions.map((option) => (
                  <button
                     key={option}
                     onClick={() => handleSearchOptionClick(option)}
                     className="block w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-[#374151]"
                  >
                     {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
               ))}
            </div>
         )}
      </div>
   );
};

export default SearchBar;
