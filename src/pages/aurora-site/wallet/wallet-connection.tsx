"use client";

import type React from "react";
import { useState } from "react";
import { Brain } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Define types for Starknet window object
declare global {
  interface Window {
    starknet?: {
      enable: () => Promise<any>;
      account: any;
    };
  }
}

const WalletConnection: React.FC = () => {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const checkWalletInstalled = (): boolean => {
    return typeof window.starknet !== "undefined";
  };

  const connectWallet = async (): Promise<void> => {
    setIsConnecting(true);
    setError(null);

    try {
      // Check if Starknet is available
      if (!checkWalletInstalled()) {
        throw new Error(
          "Please install a Starknet wallet extension (like ArgentX or Braavos)"
        );
      }

      // Request wallet connection
      const starknet = await window.starknet?.enable();

      // Get the connected account
      const account = await window.starknet?.account;

      if (!account) {
        throw new Error("No account selected in wallet");
      }

      // Store the wallet address in localStorage (optional)
      localStorage.setItem("walletAddress", account.address);

      // Navigate to learning content
      router.push("/learning-content");
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      setError(error.message || "Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 p-8">
        {/* Left Content */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">AURORA</h1>
          </div>

          <p className="text-blue-100 text-lg max-w-md">
            Welcome to AURORA - your AI-powered English learning companion.
            Connect your Starknet wallet to start your personalized learning
            journey.
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <Button
            onClick={connectWallet}
            disabled={isConnecting}
            className={`bg-white text-blue-600 px-6 py-3 rounded-lg font-medium 
              hover:bg-blue-50 transition-colors inline-flex items-center gap-2
              ${isConnecting ? "opacity-75 cursor-not-allowed" : ""}`}
          >
            {isConnecting ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                Connecting...
              </>
            ) : (
              "Connect Wallet"
            )}
          </Button>
        </div>

        {/* Right Content - Circular Image */}
        <div className="relative w-full md:w-1/2 flex justify-center items-center">
          {/* Background circles */}
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full opacity-20"></div>
          <div className="absolute w-80 h-80 bg-blue-400 rounded-full opacity-20"></div>

          {/* Main image circle */}
          <div className="relative w-64 h-64 rounded-full overflow-hidden bg-blue-700 flex items-center justify-center">
            <img
              src="/assets/aurora.jpg"
              alt="AI Assistant"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Decorative dots */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-blue-200 rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Additional decorative elements */}
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-500 rounded-lg opacity-10 transform rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnection;
