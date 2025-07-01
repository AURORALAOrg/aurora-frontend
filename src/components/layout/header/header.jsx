"use client";

import useHeader from "@/hooks/use-header";
import Logo from "./logo";
import NavDesktop from "./nav-desktop";
import NavMobile from "./nav-mobile";
import SearchBar from "./search-bar";
import AuthButtons from "./auth-buttons";
import MobileTopButtons from "./mobile-top-buttons";
import { Lightbulb, LineChart, Bell, Settings} from "lucide-react";
import { useRef, useState, useEffect } from "react";



const mockNotifications = [
  {
    id: "1",
    title: "New Course Available",
    message: "Introduction to Web3 Development is now available",
    timestamp: "2 hours ago",
    isRead: false,
  },
  {
    id: "2",
    title: "Assignment Due",
    message: "Your Blockchain Basics assignment is due tomorrow",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: "3",
    title: "Achievement Unlocked",
    message: "You completed Smart Contract Security module",
    timestamp: "3 days ago",
    isRead: false,
  },
];

const Header = ({ onMenuClick }) => {
   const header = useHeader(onMenuClick);
   const [showNotifications, setShowNotifications] = useState(false);
   const notificationRef = useRef(null);


   const handleSettingsClick = () => {
      header.navigate('/settings');
   };
   const handleAnalyticsClick = () => {
      header.navigate('/analytics');
   };

   // Cerrar el popover al hacer click fuera
   useEffect(() => {
     function handleClickOutside(event) {
       if (notificationRef.current && !notificationRef.current.contains(event.target)) {
         setShowNotifications(false);
       }
     }
     if (showNotifications) {
       document.addEventListener("mousedown", handleClickOutside);
     } else {
       document.removeEventListener("mousedown", handleClickOutside);
     }
     return () => document.removeEventListener("mousedown", handleClickOutside);
   }, [showNotifications]);

   return (
      <>
         <header className="sticky top-0 bg-[#0d1117] text-white z-50">
            <div className="container mx-auto  sm:px-4 flex items-center justify-between h-16">
               <div className="flex items-center space-x-4">
                  <button
                     onClick={onMenuClick}
                     className="p-2 rounded-full hover:bg-[#1f2937] transition-colors"
                     aria-label="Toggle sidebar"
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
               <div className="flex items-center space-x-3 relative">
                  <SearchBar {...header} />
                  <div className="hidden md:flex items-center space-x-2 bg-gray-800 px-2 py-1 rounded-full">
                     <span className="text-xs text-gray-400">💡 Daily</span>
                     <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#00b8d4] to-[#34d399]" style={{ width: "50%" }}></div>
                     </div>
                     <Lightbulb size={16} className="text-yellow-400" />
                  </div>
                  <button className="p-1 rounded-full hover:bg-[#1f2937]" onClick={handleAnalyticsClick} aria-label="Analytics">
                     <LineChart size={20} className="text-gray-300" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-[#1f2937]" onClick={handleSettingsClick} aria-label="Settings">
                     <Settings size={20} className="text-gray-300" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-[#1f2937]" onClick={() => setShowNotifications(!showNotifications)} aria-label="Notifications">
                     <Bell size={20} className="text-gray-300" />
                  </button>
                  {/* Notificaciones flotantes */}
                  {showNotifications && (
                    <div ref={notificationRef} className="absolute right-0 top-10 w-80 bg-[#181c23] border border-[#23272f] rounded-lg shadow-lg z-50 animate-fade-in">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-[#23272f]">
                        <span className="font-semibold text-white">Notificaciones</span>
                        <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="max-h-80 overflow-y-auto divide-y divide-[#23272f]">
                        {mockNotifications.length > 0 ? (
                          mockNotifications.map((n) => (
                            <div key={n.id} className={`px-4 py-3 ${n.isRead ? 'bg-[#23272f]' : 'bg-[#222b3a]'}`}>
                              <div className="font-medium text-white">{n.title}</div>
                              <div className="text-sm text-gray-400">{n.message}</div>
                              <div className="text-xs text-gray-500 mt-1">{n.timestamp}</div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-6 text-center text-gray-400">No notifications</div>
                        )}
                      </div>
                    </div>
                  )}
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
