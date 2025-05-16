import React from "react";

type NavDesktopProps = {
   onNavClick: (key: string) => void;
};

const NavDesktop = ({ onNavClick }: NavDesktopProps) => {
   const items = ["course-listing", "practiceSystem", "analytics", "categories", "community"];

   const displayMap = {
      "course-listing": "Courses",
      "practiceSystem": "Practices",
      analytics: "Analytics",
      categories: "Resources",
      community: "Community",
   };

   return (
      <nav className="hidden md:flex items-center space-x-6">
         {items.map((item) => (
            <button
               key={item}
               onClick={() => onNavClick(item)}
               className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
            >
               {displayMap[item]}
            </button>
         ))}
      </nav>
   );
};

export default NavDesktop;
