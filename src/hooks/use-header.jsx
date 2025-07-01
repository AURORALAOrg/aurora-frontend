import { useState, useEffect, useRef } from "react";
import { useWallet } from "@/context/WalletContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import PracticeDropdown from "@/components/ui/practice-drop-down.jsx";

const useHeader = (onMenuClick) => {
   const { address } = useWallet();
   const { user, logout, isAuthenticated, isLoadingUser } = useAuth();
   const navigate = useNavigate();
   const searchRef = useRef(null);

   const [isOpen, setIsOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const [filteredOptions, setFilteredOptions] = useState([]);
   const [showFiltered, setShowFiltered] = useState(false);
   const [showProfileMenu, setShowProfileMenu] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   const learningOptions = [
      "grammar",
      "vocabulary",
      "speaking",
      "listening",
      "reading",
      "games",
      "courses",
      "practicesystem",
      "challenges",
      "achievements",
   ];

   const routeMap = {
   skills: "/skills",
   grammar: "/grammar",
   vocabulary: "/vocabulary",
   "business english": "/business-english",
   community: "/community",
   settings: "/settings",
   notifications: "/notifications",
   speaking: "/speaking",
   listening: "/listening",
   reading: "/reading",
   games: "/games",
   challenges: "/challenges",
   "question creator": "/question-creator",
   login: "/login",
   signup: "/signup",
   "course-listing": "/course-listing",
   "practicesystem": "/practiceSystem",
   analytics: "/analytics",
   categories: "/categories",
   leaderboard: "/leaderboard"
};

   const handleNavClick = (key) => {
      if (typeof key === 'string' && key.startsWith('/')) {
         navigate(key);
         setIsMobileMenuOpen(false);
         return;
      }
      const normalizedKey = key.trim().toLowerCase();
      const path = routeMap[normalizedKey];
      if (path) {
         navigate(path);
         setIsMobileMenuOpen(false);
      } else {
         console.warn("❗Ruta inválida desde Header:", key, `(normalizada: ${normalizedKey})`);
      }
   };

   const handleSearchChange = (e) => {
      setShowFiltered(true);
      const query = e.target.value.toLowerCase();
      setSearchQuery(e.target.value);
      const filtered = learningOptions.filter((opt) => opt.toLowerCase().includes(query));
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

   const handleHomeClick = () => {
      navigate("/");
   };

   const handleMenuToggle = (event) => {
      if (onMenuClick && typeof onMenuClick === "function") {
         onMenuClick(event);
      }
   };

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (searchRef.current && !searchRef.current.contains(event.target)) {
            setShowFiltered(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   useEffect(() => {
      document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
      return () => {
         document.body.style.overflow = "auto";
      };
   }, [isMobileMenuOpen]);

   return {
      address,
      user,
      logout,
      isAuthenticated,
      isLoadingUser,
      isOpen,
      setIsOpen,
      searchQuery,
      setSearchQuery,
      filteredOptions,
      showFiltered,
      setShowFiltered,
      showProfileMenu,
      PracticeDropdown,
      setShowProfileMenu,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      handleSearchChange,
      handleSearchOptionClick,
      handleMenuToggle,
      handleNavClick,
      handleHomeClick,
      searchRef,
      navigate
   };
};

export default useHeader;
