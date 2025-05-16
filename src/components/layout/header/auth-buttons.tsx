import React from "react";
import { LogOut, User } from "lucide-react";
import { truncateAddress } from "@/utils/helpers";

const AuthButtons = ({ isAuthenticated, user, address, logout, navigate, showProfileMenu, setShowProfileMenu }) => {
   if (isAuthenticated) {
      return (
         <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center space-x-2">
               <User size={16} />
               <span className="text-sm font-medium truncate max-w-[80px] xl:max-w-[150px]">
                  {user?.username || truncateAddress(address)}
               </span>
            </button>
            <button onClick={logout} className="flex items-center space-x-1 text-sm font-medium text-gray-300 hover:text-white">
               <LogOut size={16} />
               <span className="hidden xl:inline">Logout</span>
            </button>
         </div>
      );
   }

   return (
      <div className="hidden lg:flex items-center space-x-4">
         <button onClick={() => navigate("/login")} className="text-sm font-medium text-gray-300 hover:text-white">
            Log in
         </button>
         <button
            onClick={() => navigate("/signup")}
            className="text-sm font-medium text-white bg-[#00b8d4] px-3 py-1.5 xl:px-4 xl:py-2 rounded hover:bg-[#22d3ee] transition-colors"
         >
            Sign up
         </button>
      </div>
   );
};

export default AuthButtons;
