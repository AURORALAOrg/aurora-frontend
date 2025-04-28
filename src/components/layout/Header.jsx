"use client";

import {
  Menu,
  Search,
  LogIn,
  LogOut,
  User,
  Bot,
  X,
  Wallet,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../../hooks/useWallet";
import { useAuth } from "@/context/AuthContext";
import { truncateAddress } from "../../utils/helpers";
import auroraLogo from "../../assets/auroraLogo.jpg";

const Header = ({ onMenuClick }) => {
  const { 
    address, 
    walletType, 
    isConnecting, 
    error, 
    handleConnect, 
    handleDisconnect,
    WALLET_TYPES
  } = useWallet();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const learningOptions = [
    "grammar",
    "vocabulary",
    "speaking",
    "listening",
    "reading",
    "games",
    "courses",
    "practice",
    "challenges",
    "achievements",
  ];

  const routeMap = {
    skills: "/skills",
    grammar: "/grammar",
    vocabulary: "/vocabulary",
    "business english": "/business-english",
    community: "/people",
    settings: "/settings",
    notifications: "/notifications",
    speaking: "/speaking",
    listening: "/listening",
    reading: "/reading",
    games: "/games",
    challenges: "/challenges",
    "question creator": "/question-creator",
  };

  const handleNavClick = (key) => {
    const path = {
      skills: "/skills",
      grammar: "/grammar",
      vocabulary: "/vocabulary",
      "business english": "/business-english",
      community: "/community",
      "question creator": "/question-creator",
    }[key.toLowerCase()];

    if (path) {
      navigate(path);
      setIsMobileMenuOpen(false);
    } else console.warn("❗Ruta inválida desde Header:", key);
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
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const handleMenuToggle = (event) => {
    if (onMenuClick && typeof onMenuClick === "function") {
      onMenuClick(event);
    }
  };

  const handleWalletConnect = (walletType) => {
    handleConnect(walletType);
    setShowWalletModal(false);
  };

  const renderWalletButton = () => {
    if (address) {
      return (
        <button
          onClick={handleDisconnect}
          className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:border-transparent"
        >
          <LogOut size={16} className="inline mr-1" />
          Disconnect
        </button>
      );
    }
    return (
      <button
        onClick={() => setShowWalletModal(true)}
        disabled={isConnecting}
        className="text-sm font-medium text-white bg-[#00b8d4] px-3 py-1.5 xl:px-4 xl:py-2 rounded hover:bg-[#00a5bd] transition-colors hover:border-transparent"
      >
        <LogIn size={16} className="inline mr-1" />
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  };

  return (
    <>
      <header className="border-b border-[#e5e7eb] sticky top-0 bg-white z-50">
        {error && (
          <div className="bg-red-100 text-red-800 p-2 text-center text-sm">
            {error}
          </div>
        )}
        <div className="container mx-auto px-2 sm:px-4 flex items-center justify-between h-16">
          <button
            className="p-2 rounded-full hover:bg-gray-100 mr-4 items-center hover:border-transparent"
            onClick={handleMenuToggle}
            aria-label="Menú principal"
          >
            <Bot size={24} />
          </button>

          <div
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer"
          >
            <div className="p-1 rounded">
              <img
                src={auroraLogo}
                alt="Aurora Logo"
                className="h-6 sm:h-7 md:h-8"
              />
            </div>
          </div>

          <div className="flex-1 lg:hidden"></div>

          <div className="flex items-center space-x-2 lg:hidden">
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>

            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menú de usuario"
            >
              <Menu size={20} />
            </button>
          </div>

          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {[
              "Skills",
              "Grammar",
              "Vocabulary",
              "Business English",
              "Community",
              "Question Creator",
            ].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="text-xs  font-medium text-gray-700 py-2 border-radius-none border-transparent hover:border-transparent hover:border-radius-none hover:border-b-[#00b8d4]  hover:rounded-none hover:text-[#00b8d4] focus:outline-none transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex relative w-48 xl:w-64" ref={searchRef}>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar contenido..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
              />
            </div>

            {showFiltered && filteredOptions.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white shadow-lg rounded-md z-50 max-h-60 overflow-y-auto">
                {filteredOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSearchOptionClick(option)}
                    className="text-left block w-full px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 xl:space-x-4">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2"
                >
                  <User size={16} />
                  <span className="text-sm font-medium truncate max-w-[80px] xl:max-w-[150px]">
                    {user?.username || truncateAddress(address)}
                  </span>
                </button>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <LogOut size={16} />
                  <span className="hidden xl:inline">Cerrar sesión</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:border-transparent"
                >
                  Log in
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="text-sm font-medium text-white bg-[#00b8d4] px-3 py-1.5 xl:px-4 xl:py-2 rounded hover:bg-[#00a5bd] transition-colors hover:border-transparent"
                >
                  Sign up
                </button>
                {renderWalletButton()}
                {address && (
                  <div className="text-xs text-gray-500">
                    {walletType && <span className="capitalize">{walletType}</span>}
                    <span className="ml-1">{truncateAddress(address)}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {isOpen && (
          <div
            className="lg:hidden p-4 bg-white border-t border-gray-200 transition-all duration-300"
            ref={searchRef}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar contenido..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                autoFocus
              />
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            {showFiltered && filteredOptions.length > 0 && (
              <div className="mt-2 bg-white rounded-md z-50 max-h-40 overflow-y-auto">
                {filteredOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSearchOptionClick(option)}
                    className="text-left block w-full px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 pt-16 overflow-y-auto lg:hidden">
          <div className="p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
              aria-label="Cerrar menú"
            >
              <X size={24} />
            </button>

            <nav className="flex flex-col space-y-4 mt-4">
              {[
                "Skills",
                "Grammar",
                "Vocabulary",
                "Business English",
                "Community",
                "Question Creator"
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="text-lg font-medium text-gray-700 py-2 rounded-none border-transparent hover:border-transparent hover:rounded-none hover:border-b-[#00b8d4]  hover:rounded-none hover:text-[#00b8d4] focus:outline-none transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2 py-2">
                    <User size={20} />
                    <span className="text-md font-medium">
                      {user?.username || truncateAddress(address)}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 text-md font-medium text-gray-700 hover:text-gray-900 py-2"
                  >
                    <LogOut size={20} />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-md font-medium border-transparent text-gray-700 hover:text-gray-900 hover:border-transparent border border-gray-300 rounded-md py-3"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      navigate("/signup");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-md font-medium text-white bg-[#00b8d4] py-3 rounded-md hover:bg-[#00a5bd] transition-colors"
                  >
                    Sign up
                  </button>
                  <button
                    onClick={() => {
                      handleConnect();
                      setIsMobileMenuOpen(false);
                    }}
                    disabled={isConnecting}
                    className="w-full text-md font-medium text-white bg-[#00b8d4] py-3 rounded-md hover:bg-[#00a5bd] transition-colors"
                  >
                    <LogIn size={20} className="inline mr-2" />
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                  </button>
                  
                  {address && (
                    <div className="text-sm text-gray-500 mt-2 p-2 bg-gray-50 rounded">
                      <div className="font-medium">Wallet Connected</div>
                      <div>
                        {walletType && <span className="capitalize">{walletType}</span>}
                        <span className="ml-1">{truncateAddress(address)}</span>
                      </div>
                      <button
                        onClick={() => {
                          handleDisconnect();
                          setIsMobileMenuOpen(false);
                        }}
                        className="mt-2 text-red-600 text-sm"
                      >
                        Disconnect Wallet
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showWalletModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Connect Wallet</h3>
              <button 
                onClick={() => setShowWalletModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => handleWalletConnect(WALLET_TYPES.FREIGHTER)}
                className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Wallet size={20} className="mr-3 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium">Freighter</div>
                  <div className="text-xs text-gray-500">Browser Extension</div>
                </div>
              </button>
              
              <button
                onClick={() => handleWalletConnect(WALLET_TYPES.RABBIT)}
                className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Wallet size={20} className="mr-3 text-purple-500" />
                <div className="text-left">
                  <div className="font-medium">Rabbit</div>
                  <div className="text-xs text-gray-500">Browser Extension</div>
                </div>
              </button>
              
              <button
                onClick={() => handleWalletConnect(WALLET_TYPES.LOBSTR)}
                className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Wallet size={20} className="mr-3 text-green-500" />
                <div className="text-left">
                  <div className="font-medium">Lobstr</div>
                  <div className="text-xs text-gray-500">Mobile Wallet</div>
                </div>
              </button>
            </div>
            
            <div className="mt-4 text-xs text-gray-500 text-center">
              Make sure you have one of these wallets installed
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
