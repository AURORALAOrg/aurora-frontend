"use client";

import { LogIn, LogOut, User } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useWallet } from "../../context/WalletContext"
import { useAuth } from "@/context/AuthContext"
import { truncateAddress } from "../../utils/helpers"
import ConnectWalletButton from "./ui/connect-wallet-button"
import auroraBrain from "../../assets/auroraLogo.jpg"
import { ThemeToggle } from "../ui/ThemeToggle"

const Header = ({ onMenuClick }) => {
  const { address } = useWallet()
  const { user, logout, isAuthenticated, isLoadingUser } = useAuth()
  const navigate = useNavigate()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const routeMap = {
    skills: "/skills",
    grammar: "/grammar",
    vocabulary: "/vocabulary",
    "business english": "/business-english",
    community: "/people",
    settings: "/settings",
  }

  const handleNavClick = (key) => {
    const path = routeMap[key.toLowerCase()]
    if (path) navigate(path)
    else console.warn("❗Ruta inválida desde Header:", key)
  }

  return (
    <header className="h-16 bg-background border-b border-border shadow-sm transition-colors">
      <div className="flex items-center justify-between h-full max-w-[1440px] mx-auto px-6">
        <div className="flex items-center space-x-10">
          <img
            src={auroraBrain}
            alt="Aurora Logo"
            className="h-10 w-auto"
          />
          <nav className="hidden md:flex space-x-6">
            {["Skills", "Grammar", "Vocabulary", "Business English", "Community"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {!isAuthenticated && !isLoadingUser ? (
            <div className="flex gap-3 items-center">
              <ThemeToggle />
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-1.5 border border-border rounded-md text-sm hover:bg-secondary transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-1.5 bg-blue-500 dark:bg-blue-600 text-white rounded-md text-sm hover:bg-blue-600 dark:hover:bg-blue-700 shadow-sm transition-colors"
              >
                Sign up
              </button>
            </div>
          ) : (
            <div className="relative">
              <ThemeToggle />
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="h-9 w-9 rounded-full bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800 flex items-center justify-center ml-3 transition-colors"
              >
                <User className="h-5 w-5" />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-card text-card-foreground border border-border rounded-lg shadow-lg z-50 transition-colors">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium">{user?.firstName}</p>
                    <p className="text-xs text-muted-foreground mt-1">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => navigate("/profile")}
                      className="px-4 py-2 text-sm text-foreground hover:bg-secondary w-full text-left transition-colors"
                    >
                      Your Profile
                    </button>
                    <button
                      onClick={() => navigate("/learning-path")}
                      className="px-4 py-2 text-sm text-foreground hover:bg-secondary w-full text-left transition-colors"
                    >
                      Learning Path
                    </button>
                  </div>
                  {address && (
                    <div className="px-4 py-2 border-t border-border">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>Wallet:</span>
                        <span className="font-medium">{truncateAddress(address)}</span>
                      </div>
                    </div>
                  )}
                  <div className="border-t border-border">
                    <button
                      onClick={() => {
                        logout()
                        setShowProfileMenu(false)
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="hidden sm:block">
            <ConnectWalletButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header