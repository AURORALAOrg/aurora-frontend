// "use client";

// import {
//   Bell,
//   Menu,
//   Search,
//   Settings,
//   LogIn,
//   LogOut,
//   BookOpen,
//   Lightbulb,
//   Award,
//   User,
// } from "lucide-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useWallet } from "../../context/WalletContext";
// import { useAuth } from "@/context/AuthContext";
// import { truncateAddress } from "../../utils/helpers";
// import ConnectWalletButton from "./ui/connect-wallet-button";

// const Header = ({ onMenuClick }) => {
//   const { address } = useWallet();
//   const { user, logout, isAuthenticated, isLoadingUser } = useAuth();
//   const navigate = useNavigate();

//   const [notifications, setNotifications] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredOptions, setFilteredOptions] = useState([]);
//   const [showFiltered, setShowFiltered] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);

//   const unreadCount = notifications.filter((n) => !n.isRead).length;

//   const learningOptions = [
//     "grammar",
//     "vocabulary",
//     "speaking",
//     "listening",
//     "reading",
//     "games",
//     "courses",
//     "practice",
//     "challenges",
//     "achievements",
//   ];

//   const routeMap = {
//     courses: "/learning-content",
//     practice: "/practiceSystem",
//     resources: "/categories",
//     community: "/people",
//     achievements: "/certifications-obtained",
//     settings: "/settings",
//     notifications: "/notifications",
//   };

//   const handleNavClick = (key) => {
//     const path = routeMap[key.toLowerCase()];
//     if (path) navigate(path);
//     else console.warn("❗Ruta inválida desde Header:", key);
//   };

//   const handleSearchChange = (e) => {
//     setShowFiltered(true);
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(e.target.value);
//     const filtered = learningOptions.filter((opt) =>
//       opt.toLowerCase().includes(query)
//     );
//     setFilteredOptions(filtered);
//   };

//   const markAllAsRead = () => {
//     setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//   };

//   return (
//     <header className="h-16 border-b border-blue-100 bg-white px-6 shadow-sm">
//       <div className="flex items-center justify-between h-full max-w-[1440px] mx-auto">
//         {/* Left Section */}
//         <div className="flex items-center">
//           <button
//             className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg mr-4"
//             onClick={onMenuClick}
//             aria-label="Menu"
//           >
//             <Menu className="h-5 w-5" />
//           </button>

//           <div className="flex items-center">
//             <BookOpen className="h-7 w-7 text-blue-500 mr-2" />
//             <span className="text-xl font-bold text-blue-700 hidden sm:inline">
//               Aurora
//             </span>
//           </div>

//           <nav className="hidden md:flex ml-8 space-x-6">
//             {["Courses", "Practice", "Resources", "Community"].map((item) => (
//               <button
//                 key={item}
//                 onClick={() => handleNavClick(item)}
//                 className="text-sm font-medium text-gray-600 hover:text-blue-600"
//               >
//                 {item}
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* Search */}
//         <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg mx-4">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="h-4 w-4 text-blue-400" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search..."
//             className="block w-full pl-10 pr-3 py-2 border border-blue-100 rounded-full bg-blue-50 text-sm"
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//           {showFiltered && searchQuery.length > 0 && (
//             <div className="absolute top-full left-0 w-full mt-1 bg-white border border-blue-100 rounded-lg shadow-lg z-10">
//               {filteredOptions.length > 0 ? (
//                 filteredOptions.map((option, index) => (
//                   <div
//                     key={index}
//                     className="px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
//                     onClick={() => {
//                       setSearchQuery("");
//                       setShowFiltered(false);
//                       navigate(`/${option}`);
//                     }}
//                   >
//                     {option.charAt(0).toUpperCase() + option.slice(1)}
//                   </div>
//                 ))
//               ) : (
//                 <div className="px-4 py-3 text-gray-500 text-center">
//                   No results for &quot;{searchQuery}&quot;
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center space-x-3">
//           {/* Progress */}
//           <div className="hidden md:flex items-center mr-2">
//             <div className="w-8 h-8 bg-blue-100 flex items-center justify-center rounded-full">
//               <Lightbulb className="h-4 w-4 text-blue-500" />
//             </div>
//             <div className="ml-2">
//               <div className="text-xs text-gray-500">Daily Progress</div>
//               <div className="w-24 h-2 bg-gray-200 mt-1 rounded-full">
//                 <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
//               </div>
//             </div>
//           </div>

//           {/* Achievements */}
//           <button
//             className="hidden sm:flex h-9 w-9 bg-blue-100 text-blue-600 rounded-full items-center justify-center"
//             onClick={() => handleNavClick("achievements")}
//           >
//             <Award className="h-5 w-5" />
//           </button>

//           {/* Notifications */}
//           <div className="relative">
//             <button
//               className="h-9 w-9 bg-blue-100 text-blue-600 rounded-full relative flex items-center justify-center"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               <Bell className="h-5 w-5" />
//               {unreadCount > 0 && (
//                 <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
//                   {unreadCount}
//                 </span>
//               )}
//             </button>
//             {isOpen && (
//               <div className="absolute right-0 mt-2 w-80 bg-white border border-blue-100 rounded-lg shadow-lg z-50">
//                 <div className="flex justify-between px-4 py-3 border-b bg-blue-50">
//                   <span className="font-semibold text-blue-700">
//                     Notifications
//                   </span>
//                   <button
//                     onClick={markAllAsRead}
//                     className="text-xs text-blue-600 hover:text-blue-800"
//                   >
//                     Mark all as read
//                   </button>
//                 </div>
//                 <div className="max-h-80 overflow-y-auto">
//                   {notifications.length === 0 ? (
//                     <div className="px-4 py-6 text-gray-500 text-center">
//                       No notifications
//                     </div>
//                   ) : (
//                     notifications.map((n) => (
//                       <div
//                         key={n.id}
//                         className={`px-4 py-3 border-b hover:bg-blue-50 cursor-pointer ${
//                           !n.isRead ? "bg-blue-50" : ""
//                         }`}
//                         onClick={() => handleNavClick("notifications")}
//                       >
//                         <p
//                           className={`text-sm ${
//                             !n.isRead ? "font-semibold" : ""
//                           }`}
//                         >
//                           {n.title}
//                         </p>
//                         <p className="text-xs text-gray-600">{n.message}</p>
//                         <span className="text-xs text-gray-400">
//                           {n.timestamp}
//                         </span>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Settings */}
//           <button
//             onClick={() => handleNavClick("settings")}
//             className="h-9 w-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"
//           >
//             <Settings className="h-5 w-5" />
//           </button>

//           {/* Auth/Profile */}
//           {!isAuthenticated && !isLoadingUser ? (
//             <button
//               onClick={() => navigate("/login")}
//               className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm"
//             >
//               <LogIn className="h-4 w-4" />
//               <span className="text-sm font-medium">Login</span>
//             </button>
//           ) : (
//             <div className="relative">
//               <button
//                 onClick={() => setShowProfileMenu(!showProfileMenu)}
//                 className="h-9 w-9 rounded-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center"
//               >
//                 <User className="h-5 w-5" />
//               </button>
//               {showProfileMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white border border-blue-100 rounded-lg shadow-lg z-50">
//                   <div className="px-4 py-3 border-b">
//                     <p className="text-sm font-medium text-gray-700">
//                       {user?.firstName}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
//                   </div>
//                   <div className="py-1">
//                     <button
//                       onClick={() => navigate("/profile")}
//                       className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 w-full text-left"
//                     >
//                       Your Profile
//                     </button>
//                     <button
//                       onClick={() => navigate("/learning-path")}
//                       className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 w-full text-left"
//                     >
//                       Learning Path
//                     </button>
//                   </div>
//                   {address && (
//                     <div className="px-4 py-2 border-t border-blue-100">
//                       <div className="flex items-center space-x-2 text-xs text-gray-500">
//                         <span>Wallet:</span>
//                         <span className="font-medium">
//                           {truncateAddress(address)}
//                         </span>
//                       </div>
//                     </div>
//                   )}
//                   <div className="border-t">
//                     <button
//                       onClick={() => {
//                         logout();
//                         setShowProfileMenu(false);
//                       }}
//                       className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
//                     >
//                       <LogOut className="h-4 w-4" />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           <div className="hidden sm:block">
//             <ConnectWalletButton />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

"use client";

import { MenuIcon, ArrowRightCircleIcon, UserCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../../context/WalletContext";
import { useAuth } from "@/context/AuthContext";
import AuroraIcon from "@/assets/Aurora_word.png";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  {
    label: "Skills",
    path: "/learning-content",
  },
  {
    label: "Grammar",
    path: "/learning-content",
  },
  {
    label: "Vocabulary",
    path: "/practiceSystem",
  },
  {
    label: "Business English",
    path: "/learning-content",
  },
  {
    label: "Community",
    path: "/people",
  },
];
const DropDownMenu = ({ children, user, handleNavClick }) => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      {user ? (
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Games</DropdownMenuItem>
            <DropdownMenuItem>Practice</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Aurora</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate("/login")}>
              Log In
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/register")}>
              Sign Up
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {navLinks.map((link) => (
              <DropdownMenuItem
                onClick={() => handleNavClick(link.path)}
                key={link.label}
              >
                {link.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};
const Header = ({ onMenuClick }) => {
  const { address } = useWallet();
  const { user, logout, isAuthenticated, isLoadingUser } = useAuth();
  const navigate = useNavigate();

  const handleNavClick = (key) => {
    const link = navLinks.find((link) => link.path === key);
    if (link) navigate(link.path);
    else console.warn("❗Ruta inválida desde Header:", key);
  };

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (window.innerWidth > 1024) {
      setIsDesktop(true);
    }
    const setDesktop = () => {
      if (window.innerWidth > 1024) {
        setIsDesktop(true);
        return;
      }
      setIsDesktop(false);
    };
    window.addEventListener("resize", setDesktop);
  }, []);

  return (
    <header className="w-full h-[60px] sm:h-[80px] flex flex-row justify-center items-center sticky top-0 z-40 bg-white/70 backdrop-blur-md backdrop-contrast-100 px-5 py-2">
      <div className=" flex flex-row  w-full h-full sm:justify-around justify-between">
        <div className="flex flex-col justify-center items-center">
          <button
            className="bg-transparent border-none px-0 py-0 focus:outline-none"
            onClick={() => onMenuClick()}
          >
            <ArrowRightCircleIcon className="w-8 h-8 text-gray-700" />
          </button>
        </div>
        <img src={AuroraIcon} className=" h-full w-auto"></img>
        <div className="sm:flex gap-x-8 justify-center items-center hidden ">
          {navLinks.map(({ path, label }) => (
            <button
              onClick={() => handleNavClick(path)}
              key={label}
              className="text-black font-medium cursor-pointer outline-none border-none bg-transparent ppx-0 py-0 focus:outline-none mx-0 "
            >
              {label}
            </button>
          ))}
        </div>
        {isDesktop ? (
          <div className="flex gap-x-4 justify-center items-center ">
            {!isAuthenticated && !isLoadingUser ? (
              <>
                <Button variant={"outline"} onClick={() => navigate("/login")}>
                  Log In
                </Button>
                <Button
                  className="bg-sky-500 text-white hidden sm:block"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <DropDownMenu user={user} handle>
                  <Button variant={"outline"} className="bg-transparent">
                    <UserCircleIcon className="w-6 h-6" />
                  </Button>
                </DropDownMenu>
              </>
            )}
          </div>
        ) : (
          <div className="flex gap-x-4 justify-center items-center ">
            <DropDownMenu user={user} handleNavClick={handleNavClick}>
              <Button variant={"outline"} className="bg-transparent">
                <MenuIcon className="w-6 h-6" />
              </Button>
            </DropDownMenu>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
