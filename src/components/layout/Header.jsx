"use client";

import {
  Bell,
  Search,
  LogIn,
  User,
  LineChart,
  Settings,
  Menu,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useWallet } from "../../context/WalletContext";
import { useAuth } from "@/context/AuthContext";
import { truncateAddress } from "../../utils/helpers";
import ConnectWalletButton from "./ui/connect-wallet-button";
import auroraLogo from "../../assets/auroraLogo.jpg";

const Header = ({ onMenuClick }) => {
  const { address } = useWallet();
  const { user, logout, isAuthenticated, isLoadingUser } = useAuth();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const learningOptions = [
    "courses",
    "practices",
    "analytics",
    "resources",
    "community",
  ];

  const routeMap = {
    courses: "/courses",
    practices: "/practices",
    analytics: "/analytics",
    resources: "/resources",
    community: "/community",
  };

  const handleNavClick = (key) => {
    const path = routeMap[key.toLowerCase()];
    if (path) {
      navigate(path);
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    } else console.warn("❗Invalid route from Header:", key);
  };

  const handleSearchChange = (e) => {
    setShowFiltered(true);
    const query = e.target.value.toLowerCase();
    setSearchQuery(e.target.value);
    const filtered = learningOptions.filter((opt) =>
      opt.toLowerCase().includes(query)
    );
    setFilteredOptions(filtered);
  };

  const handleSearchOptionClick = (option) => {
    const path = routeMap[option];
    if (path) {
      navigate(path);
      setShowFiltered(false);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowFiltered(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  // Hamburger menu handler
  const handleMenuToggle = (event) => {
    if (onMenuClick && typeof onMenuClick === "function") {
      onMenuClick(event);
    }
  };

  return (
    <>
      <header className="sticky top-0 bg-[#0d1117] text-white z-50">
        <div className="container mx-auto px-2 sm:px-4 flex items-center justify-between h-14">
          {/* Left section with hamburger and logo */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-full hover:bg-[#1f2937] mr-2 items-center"
              onClick={handleMenuToggle}
              aria-label="Main menu"
            >
              <Menu size={20} className="text-white" />
            </button>

            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center cursor-pointer"
            >
              <BookOpen size={24} className="text-[#00b8d4] mr-2" />
              <span className="text-xl font-semibold text-[#00b8d4]">
                Aurora
              </span>
            </div>

            {/* Navigation for desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              {[
                "Courses",
                "Practices",
                "Analytics",
                "Resources",
                "Community",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Right section with search, auth, and actions */}
          <div className="flex items-center space-x-3">
            {/* Search bar */}
            <div className="relative w-48 lg:w-64" ref={searchRef}>
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

              {/* Search results */}
              {showFiltered && filteredOptions.length > 0 && (
                <div className="absolute top-full left-0 mt-1 w-full bg-[#1f2937] shadow-lg rounded-md z-50 max-h-60 overflow-y-auto">
                  {filteredOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSearchOptionClick(option)}
                      className="text-left block w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#374151]"
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Daily Progress */}
            <div className="hidden md:flex items-center space-x-2 mr-2 rounded-full bg-gray-800 px-2 py-1">
              <span className="text-xs text-gray-400 text-nowrap">
                Daily Progress
              </span>
              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00b8d4] to-[#34d399]"
                  style={{ width: "50%" }}
                ></div>
              </div>
              <Lightbulb size={16} className="text-yellow-400" />
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-3">
              <button className="p-1 rounded-full hover:bg-[#1f2937]">
                <span className="relative flex">
                  <span className=" inline-flex rounded-full h-2 w-2 bg-[#00b8d4] absolute right-0 top-0"></span>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-300"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
              <button className="p-1 rounded-full hover:bg-[#1f2937]">
                <LineChart size={20} className="text-gray-300" />
              </button>
              <button className="p-1 rounded-full hover:bg-[#1f2937]">
                <Settings size={20} className="text-gray-300" />
              </button>
              <button className="p-1 rounded-full hover:bg-[#1f2937]">
                <Bell size={20} className="text-gray-300" />
              </button>

              <button className="p-1 rounded-full hover:bg-[#1f2937] bg-gray-700 flex items-center justify-center">
                <User size={20} className="text-gray-300" />
              </button>
            </div>

            {/* Login button */}
            <button
              onClick={() => navigate("/login")}
              className="ml-2 flex items-center px-4 py-1.5 text-sm font-medium rounded-lg bg-[#00b8d4] text-white hover:bg-[#22d3ee] transition-colors"
            >
              <span className="mr-1">→</span>
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
          <div className="fixed left-0 top-0 h-full w-3/4 sm:w-2/3 bg-[#0d1117] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b border-[#374151]">
              <h2 className="text-lg font-semibold text-white">Menu</h2>
              <button
                className="p-2 rounded-full hover:bg-[#1f2937]"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-300"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="p-4">
              <nav className="space-y-4">
                {[
                  "Courses",
                  "Practices",
                  "Analytics",
                  "Resources",
                  "Community",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className="w-full text-left py-2 px-3 rounded-md hover:bg-[#1f2937] text-gray-300 font-medium transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
