import React from "react";
import { X } from "lucide-react";
import { truncateAddress } from "@/utils/helpers";
import PracticeDropdown from "@/components/ui/practice-drop-down";

const NavMobile = ({ isAuthenticated, user, address, logout, onNavClick, setIsMobileMenuOpen }) => {
   const items = ["course-listing", "practiceSystem", "analytics", "categories", "community"];

   const displayMap = {
      "course-listing": "Courses",
      "practiceSystem": "Practices",
      analytics: "Analytics",
      categories: "Resources",
      community: "Community",
   };

   return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
         <div className="fixed left-0 top-0 h-full w-3/4 sm:w-2/3 bg-[#0d1117] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b border-[#374151]">
               <h2 className="text-lg font-semibold text-white">Menu</h2>
               <button className="p-2 rounded-full hover:bg-[#1f2937]" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                  <X size={20} className="text-gray-300" />
               </button>
            </div>

            <div className="p-4">
               <nav className="space-y-4">
                  {items.map((item) => (
                     <button
                        key={item}
                        onClick={() => {
                           onNavClick(item);
                           setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left py-2 px-3 rounded-md hover:bg-[#1f2937] text-gray-300 font-medium transition-colors"
                     >
                        {displayMap[item]}
                     </button>
                  ))}
                  <PracticeDropdown />
               </nav>

               <div className="mt-8 border-t border-gray-700 pt-4">
                  {isAuthenticated ? (
                     <>
                        <div className="text-sm text-gray-400 mb-2 px-3">
                           {user?.username || truncateAddress(address)}
                        </div>
                        <button
                           onClick={logout}
                           className="w-full text-left py-2 px-3 rounded-md text-gray-300 hover:bg-[#1f2937] transition-colors"
                        >
                           Logout
                        </button>
                     </>
                  ) : (
                     <>
                        <button
                           onClick={() => {
                              onNavClick("login");
                              setIsMobileMenuOpen(false);
                           }}
                           className="w-full text-left py-2 px-3 rounded-md bg-[#00b8d4] text-white hover:bg-[#22d3ee] transition-colors"
                        >
                           → Login
                        </button>
                        <button
                           onClick={() => {
                              onNavClick("signup");
                              setIsMobileMenuOpen(false);
                           }}
                           className="mt-2 w-full text-left py-2 px-3 rounded-md border border-gray-600 text-gray-300 hover:bg-[#1f2937] transition-colors"
                        >
                           Sign up
                        </button>
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default NavMobile;
