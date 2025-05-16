"use client";

import useHeader from "@/hooks/use-header";
import Logo from "./logo";
import NavDesktop from "./nav-desktop";
import NavMobile from "./nav-mobile";
import SearchBar from "./search-bar";
import AuthButtons from "./auth-buttons";
import MobileTopButtons from "./mobile-top-buttons";
import { Lightbulb, LineChart, Bell, Settings } from "lucide-react";

const Header = ({ onMenuClick }) => {
   const header = useHeader(onMenuClick);

   return (
      <>
         <header className="sticky top-0 bg-[#0d1117] text-white z-50">
            <div className="container mx-auto px-3 sm:px-4 flex items-center justify-between h-16">
               <div className="flex items-center space-x-4">
                  <MobileTopButtons {...header} />
                  <button
                     onClick={header.handleMenuToggle}
                     className="p-2 rounded-full hover:bg-[#1f2937] transition-colors"
                     aria-label="Open sidebar"
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-white"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
                        />
                     </svg>
                  </button>
                  <Logo onClickHome={header.handleHomeClick} />
               </div>
               <NavDesktop onNavClick={header.handleNavClick} />
               <div className="flex items-center space-x-3">
                  <SearchBar {...header} />
                  <div className="hidden md:flex items-center space-x-2 bg-gray-800 px-2 py-1 rounded-full">
                     <span className="text-xs text-gray-400">💡 Daily</span>
                     <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#00b8d4] to-[#34d399]" style={{ width: "50%" }}></div>
                     </div>
                     <Lightbulb size={16} className="text-yellow-400" />
                  </div>
                  <button className="p-1 rounded-full hover:bg-[#1f2937]">
                     <LineChart size={20} className="text-gray-300" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-[#1f2937]">
                     <Settings size={20} className="text-gray-300" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-[#1f2937]">
                     <Bell size={20} className="text-gray-300" />
                  </button>
                  <AuthButtons {...header} />
               </div>
            </div>
            {header.isOpen && <SearchBar mobile {...header} />}
         </header>
         {header.isMobileMenuOpen && <NavMobile {...header} />}
      </>
   );
};

export default Header;
