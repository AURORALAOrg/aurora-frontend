// contexts/WalletContext.tsx
"use client";

import  { createContext, useContext, useState, useEffect,} from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  XBULL_ID,
} from "@creit.tech/stellar-wallets-kit";
import { Horizon } from "@stellar/stellar-sdk";

// Stellar testnet server
const stellarServer = new Horizon.Server("https://horizon-testnet.stellar.org");


// Types
// Create context
const WalletContext = createContext(undefined);

// Custom hook to use wallet context
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

// Provider component
export const WalletProvider= ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletType, setWalletType] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balances, setBalances] = useState(null);

  // Initialize Stellar Wallet Kit
  const kit = new StellarWalletsKit({
    network: WalletNetwork.TESTNET,
    selectedWalletId: XBULL_ID,
    modules: allowAllModules(),
  });
  
   const fundTestnetAccount = async (publicKey) => {
    try {
      console.log("Funding testnet account:", publicKey);
      const response = await fetch(`https://friendbot.stellar.org?addr=${publicKey}`);
      if (response.ok) {
        console.log("Account funded successfully!");
        return true;
      } else {
        console.error("Failed to fund account");
        return false;
      }
    } catch (error) {
      console.error("Error funding account:", error);
      return false;
    }
  };
   const fetchBalances = async (publicKey, autoFund = false) => {
    try {
      console.log("Fetching balances for:", publicKey);
      const account = await stellarServer.loadAccount(publicKey);
      setBalances(account.balances);
      console.log("Balances fetched successfully:", account.balances);
    } catch (error) {
      console.error("Error fetching balances:", error);
      
      // If account doesn't exist (404), it means the account is not funded yet
      if (error.response?.status === 404 || error.name === 'NotFoundError') {
        console.log("Account not found - account needs to be funded first");
        
        // Auto-fund if requested (testnet only)
        if (autoFund) {
          console.log("Attempting to auto-fund testnet account...");
          const funded = await fundTestnetAccount(publicKey);
          if (funded) {
            // Try fetching balances again after funding
            setTimeout(() => fetchBalances(publicKey, false), 2000);
            return;
          }
        }
        
        setBalances([
          {
            balance: "0.0000000",
            asset_type: "native",
            asset_code: "XLM",
            unfunded: true
          }
        ]);
      } else {
        console.error("Unexpected error:", error);
        setBalances([]);
      }
    }
  };

  const connectWallet = async () => {
    if (isConnecting) return;

    setIsConnecting(true);
    try {
      await kit.openModal({
        onWalletSelected: async (option) => {
          try {
            await kit.setWallet(option.id);
            const { address } = await kit.getAddress();
            setWalletAddress(address);
            setWalletType(option.id);
            console.log("Connected wallet address:", address, "Type:", option.id);

            localStorage.setItem("stellar_wallet_address", address);
            localStorage.setItem("stellar_wallet_id", option.id);

            await fetchBalances(address);
          } catch (error) {
            console.error("Error setting wallet:", error);
          } finally {
            setIsConnecting(false);
          }
        },
        onClosed: (err) => {
          if (err) {
            console.error("Modal closed with error:", err);
          }
          setIsConnecting(false);
        },
        modalTitle: "Connect Your Stellar Wallet",
        notAvailableText: "Selected wallet is not available",
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setIsConnecting(false);
    }
  };

  // Connect Rabbit
  const connectRabbit = async () => {
    if (!window.rabet) {
      alert("Please install Rabbit wallet extension.");
      return;
    }
    setIsConnecting(true);
    try {
      const { publicKey, network } = await window.rabet.connect();
      if (network !== "testnet") {
        alert("Please switch Rabbit to Testnet.");
        setIsConnecting(false);
        return;
      }
      setWalletAddress(publicKey);
      setWalletType("rabbit");
      localStorage.setItem("stellar_wallet_address", publicKey);
      localStorage.setItem("stellar_wallet_id", "rabbit");
      await fetchBalances(publicKey);
    } catch (error) {
      console.error("Rabbit connection error:", error);
      alert("Failed to connect to Rabbit wallet.");
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletType(null);
    setBalances(null);
    localStorage.removeItem("stellar_wallet_address");
    localStorage.removeItem("stellar_wallet_id");
    console.log("Wallet disconnected");
  };

  // Sign transaction
  const signTransaction = async (transaction) => {
    if (!walletAddress || !walletType) {
      throw new Error("No wallet connected");
    }

    try {
      if (walletType === "rabbit") {
        if (!window.rabet) {
          throw new Error("Rabbit wallet not installed");
        }
        const { xdr } = await window.rabet.sign(transaction.toXDR(), "testnet");
        return xdr;
      } else {
        const { signedXDR } = await kit.sign({
          xdr: transaction.toXDR(),
          publicKey: walletAddress,
          network: WalletNetwork.TESTNET,
        });
        return signedXDR;
      }
    } catch (error) {
      console.error("Transaction signing error:", error);
      throw error;
    }
  };

  // Check for previously connected wallet
  useEffect(() => {
    const savedAddress = localStorage.getItem("stellar_wallet_address");
    const savedWalletId = localStorage.getItem("stellar_wallet_id");
    if (savedAddress && savedWalletId) {
      setWalletAddress(savedAddress);
      setWalletType(savedWalletId);
      fetchBalances(savedAddress);
    }
  }, []);

  const value = {
    walletAddress,
    walletType,
    isConnecting,
    balances,
    connectWallet,
    connectRabbit,
    disconnectWallet,
    signTransaction,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};