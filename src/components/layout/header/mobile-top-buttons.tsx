import React from "react";
import { Menu, Search } from "lucide-react";

const MobileTopButtons = ({ onMenuClick, setIsOpen, isOpen, setIsMobileMenuOpen, isMobileMenuOpen }) => {
   return (
      <div className="flex items-center lg:hidden space-x-2">
         <button className="p-2 rounded-full hover:bg-[#1f2937] mr-2" onClick={onMenuClick} aria-label="Main menu">
            <Menu size={20} className="text-white" />
         </button>
         <button className="p-2 rounded-full hover:bg-[#1f2937]" onClick={() => setIsOpen(!isOpen)} aria-label="Search">
            <Search size={20} />
         </button>
         <button className="p-2 rounded-full hover:bg-[#1f2937]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="User menu">
            <Menu size={20} />
         </button>
      </div>
   );
};

export default MobileTopButtons;
