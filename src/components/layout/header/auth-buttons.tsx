import React from "react";
import { LogOut, User, Wallet } from "lucide-react";
import { truncateAddress } from "@/utils/helpers";
import { useWallet } from "@/context/WalletContext";

const AuthButtons = ({
  isAuthenticated,
  user,
  address,
  logout,
  navigate,
  showProfileMenu,
  setShowProfileMenu,
}) => {
  const { walletAddress, isConnecting, connectWallet, disconnectWallet, balance } =
    useWallet();
  if (isAuthenticated) {
    return (
      <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
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
          className="flex items-center space-x-1 text-sm font-medium text-gray-300 hover:text-white"
        >
          <LogOut size={16} />
          <span className="hidden xl:inline">Logout</span>
        </button>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center space-x-4">
      {walletAddress ? (
        // Show login/signup when wallet is connected
        <div className="flex flex-row items-center justify-center space-x-2">
          <button
            onClick={() => navigate("/login")}
            className="text-[10px] w-full font-medium text-gray-300 hover:text-white px-3 py-2 border border-gray-600 rounded hover:border-gray-500 transition-colors"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/register")}
            className="text-[10px] w-full font-medium text-white bg-[#00b8d4] px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-[#22d3ee] transition-colors"
          >
            Sign up
          </button>
          
          {/* Show connected wallet address */}
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={disconnectWallet}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 px-3 py-2 rounded-lg font-medium text-[10px] transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/25"
              disabled={isConnecting}
              title="Click to disconnect wallet"
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden xl:inline">
                {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
              </span>
            </button>
          </div>
        </div>
      ) : (
        // Show connect wallet when no wallet is connected
        <div className="flex items-center">
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 px-4 py-2 rounded-lg font-medium text-[10px] transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;