import React, { useState } from "react";

const Header = () => {
  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation links data
  const navLinks = [
    { label: "Skills", href: "/skills" },
    { label: "Grammar", href: "/grammar" },
    { label: "Vocabulary", href: "/vocabulary" },
    { label: "Business English", href: "/business-english" },
    { label: "Community", href: "/community" },
  ];

  return (
    <header className="w-full">
      <div className="container mx-auto px-4 py-3 md:py-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Logo Section */}
          <div className="flex justify-between items-center mb-4 md:mb-0">
            <a href="/" className="flex items-center">
              <img
                src="/src/assets/AURORALogo.png"
                alt="Logo"
                className="h-8 w-auto"
              />
            </a>
            
            {/* Mobile Menu Button - Only visible on mobile */}
            <button 
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  className="w-6 h-6"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  className="w-6 h-6"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
              )}
            </button>
          </div>
  
          {/* Navigation and Auth Container */}
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:justify-between md:w-[70%] `}>
            {/* Navigation Links */}
            <nav className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
              {navLinks.map((link) => (
                <div key={link.label} className="w-full md:w-auto py-2 md:py-0 text-center">
                  <NavLink {...link} />
                </div>
              ))}
            </nav>
  
            {/* Authentication Buttons */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 pb-4 md:pb-0">
              <a 
                href="/login" 
                className="w-full md:w-auto text-center text-gray-700 hover:text-gray-900 rounded border border-gray-300 px-4 py-2 transition-colors"
              >
                Log in
              </a>
              <a
                href="/signup"
                className="w-full md:w-auto text-center rounded bg-[#00B8D4] hover:bg-[#9edce6] px-4 py-2 text-white transition-colors"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ label, href, isActive = false }) => {
  return (
    <a
      href={href}
      className={`text-sm font-medium transition-colors ${
        isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
      }`}
    >
      {label}
    </a>
  );
};

export default Header;