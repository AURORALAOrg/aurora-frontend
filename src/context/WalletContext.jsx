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
import logger from "@/lib/logger";

// Stellar testnet server
const stellarServer = new Horizon.Server("https://horizon-testnet.stellar.org");

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
export const WalletProvider = ({ children }) => {
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
      logger.wallet("Funding testnet account", { publicKey });
      const response = await fetch(`https://friendbot.stellar.org?addr=${publicKey}`);
      if (response.ok) {
        logger.wallet("Account funded successfully");
        return true;
      } else {
        logger.error("Failed to fund account");
        return false;
      }
    } catch (error) {
      logger.error("Error funding account", error);
      return false;
    }
  };

  const fetchBalances = async (publicKey, autoFund = false) => {
    try {
      logger.wallet("Fetching balances", { publicKey });
      const account = await stellarServer.loadAccount(publicKey);
      setBalances(account.balances);
      logger.wallet("Balances fetched successfully", account.balances);
    } catch (error) {
      logger.error("Error fetching balances", error);
      
      // If account doesn't exist (404), it means the account is not funded yet
      if (error.response?.status === 404 || error.name === 'NotFoundError') {
        logger.wallet("Account not found - account needs to be funded first");
        
        // Auto-fund if requested (testnet only)
        if (autoFund) {
          logger.wallet("Attempting to auto-fund testnet account");
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
        logger.error("Unexpected error", error);
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
            logger.wallet("Connected wallet", { address, type: option.id });

            localStorage.setItem("stellar_wallet_address", address);
            localStorage.setItem("stellar_wallet_id", option.id);

            await fetchBalances(address);
          } catch (error) {
            logger.error("Error setting wallet", error);
          } finally {
            setIsConnecting(false);
          }
        },
        onClosed: (err) => {
          if (err) {
            logger.error("Modal closed with error", err);
          }
          setIsConnecting(false);
        },
        modalTitle: "Connect Your Stellar Wallet",
        notAvailableText: "Selected wallet is not available",
      });
    } catch (error) {
      logger.error("Error connecting wallet", error);
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
      logger.error("Rabbit connection error", error);
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
    logger.wallet("Wallet disconnected");
  };

  // Sign transaction
  const signTransaction = async (transaction) => {
    if (!walletAddress || !walletType) {
      throw new Error("No wallet connected");
    }

    try {
      // Handle different transaction formats
      let transactionXDR;
      logger.transaction("Analyzing transaction format", { 
        type: typeof transaction, 
        hasToXDR: !!(transaction && typeof transaction.toXDR === 'function'),
        hasBuilt: !!(transaction && transaction.built),
        keys: transaction ? Object.keys(transaction) : []
      });

      if (typeof transaction === 'string') {
        // Already XDR string
        transactionXDR = transaction;
      } else if (transaction && typeof transaction.toXDR === 'function') {
        // Transaction object
        transactionXDR = transaction.toXDR();
      } else if (transaction && transaction.built && typeof transaction.built.toXDR === 'function') {
        // Soroban contract transaction object
        transactionXDR = transaction.built.toXDR();
      } else {
        logger.error("Unknown transaction format", transaction);
        throw new Error(`Invalid transaction format. Type: ${typeof transaction}, hasToXDR: ${!!(transaction && typeof transaction.toXDR === 'function')}, hasBuilt: ${!!(transaction && transaction.built)}`);
      }

      if (walletType === "rabbit") {
        if (!window.rabet) {
          throw new Error("Rabbit wallet not installed");
        }
        const { xdr } = await window.rabet.sign(transactionXDR, "testnet");
        return xdr;
      } else {
        logger.wallet("Available kit methods", Object.getOwnPropertyNames(kit).filter(name => typeof kit[name] === 'function'));
        
        // Try different methods that might be available
        if (typeof kit.signTransaction === 'function') {
          logger.wallet("Using kit.signTransaction from WalletContext");
          const result = await kit.signTransaction(transactionXDR, {
            publicKey: walletAddress,
            network: WalletNetwork.TESTNET,
          });
          logger.wallet("WalletContext kit.signTransaction result", result);
          const signedXdr = result.signedXDR || result.signedTxXdr || result.xdr || result;
          logger.wallet("WalletContext extracted XDR", { 
            type: typeof signedXdr, 
            length: signedXdr ? signedXdr.length : 0,
            preview: signedXdr ? signedXdr.substring(0, 100) + '...' : 'null'
          });
          
          // Validate XDR format
          if (typeof signedXdr !== 'string' || !signedXdr.trim()) {
            throw new Error(`Invalid XDR format from WalletContext kit.signTransaction. Got: ${typeof signedXdr}, value: ${signedXdr}`);
          }
          
          return signedXdr;
        } else if (typeof kit.signTx === 'function') {
          logger.wallet("Using kit.signTx from WalletContext");
          const result = await kit.signTx({
            xdr: transactionXDR,
            publicKeys: [walletAddress],
            network: WalletNetwork.TESTNET,
          });
          logger.wallet("WalletContext kit.signTx result", result);
          const signedXdr = result.signedXDR || result.signedTxXdr || result.xdr || result;
          logger.wallet("WalletContext extracted XDR", { 
            type: typeof signedXdr, 
            length: signedXdr ? signedXdr.length : 0,
            preview: signedXdr ? signedXdr.substring(0, 100) + '...' : 'null'
          });
          
          // Validate XDR format
          if (typeof signedXdr !== 'string' || !signedXdr.trim()) {
            throw new Error(`Invalid XDR format from WalletContext kit.signTx. Got: ${typeof signedXdr}, value: ${signedXdr}`);
          }
          
          return signedXdr;
        } else {
          throw new Error(`Wallet kit signing method not found. Available methods: ${Object.getOwnPropertyNames(kit).filter(name => typeof kit[name] === 'function').join(', ')}`);
        }
      }
    } catch (error) {
      logger.error("Transaction signing error", error);
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
    isReady: !!walletAddress && !isConnecting, // Add isReady property
    balances,
    connectWallet,
    connectRabbit,
    disconnectWallet,
    signTransaction,
    walletKit: kit, // Also add walletKit for compatibility
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};