// contexts/WalletContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  XBULL_ID,
} from "@creit.tech/stellar-wallets-kit";
import { Horizon } from "@stellar/stellar-sdk";
import logger from "@/lib/logger";
import {
  WalletState,
  AssetBalance,
  WalletType,
  StellarNetwork,
  SignTransactionParams,
  SignTransactionResult,
  WalletConnectionOptions,
  WalletOption,
} from "@/types/wallet-types";
import { WalletProviderProps } from "@/types/component-types";

// Define the wallet context interface
interface WalletContextType extends WalletState {
  connectWallet: () => Promise<void>;
  connectRabbit: () => Promise<void>;
  disconnectWallet: () => void;
  signTransaction: (transaction: string | object) => Promise<string>;
  fetchBalances: (publicKey: string, autoFund?: boolean) => Promise<void>;
  fundTestnetAccount: (publicKey: string) => Promise<boolean>;
  walletKit: StellarWalletsKit;
}

// Stellar testnet server
const stellarServer = new Horizon.Server("https://horizon-testnet.stellar.org");

// Create context with default undefined value
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Custom hook to use wallet context
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

// Declare rabbit wallet for TypeScript
declare global {
  interface Window {
    rabet?: {
      connect: () => Promise<{ publicKey: string; network: string }>;
      sign: (xdr: string, network: string) => Promise<{ xdr: string }>;
    };
  }
}

// Provider component
export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<WalletType | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [balances, setBalances] = useState<AssetBalance[] | null>(null);

  // Initialize Stellar Wallet Kit
  const kit = new StellarWalletsKit({
    network: WalletNetwork.TESTNET,
    selectedWalletId: XBULL_ID,
    modules: allowAllModules(),
  });

  const fundTestnetAccount = async (publicKey: string): Promise<boolean> => {
    try {
      logger.wallet("Funding testnet account", { publicKey });
      const response = await fetch(
        `https://friendbot.stellar.org?addr=${publicKey}`
      );
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

  const fetchBalances = async (
    publicKey: string,
    autoFund = false
  ): Promise<void> => {
    try {
      logger.wallet("Fetching balances", { publicKey });
      const account = await stellarServer.loadAccount(publicKey);
      setBalances(account.balances as AssetBalance[]);
      logger.wallet("Balances fetched successfully", account.balances);
    } catch (error: any) {
      logger.error("Error fetching balances", error);

      // If account doesn't exist (404), it means the account is not funded yet
      if (error.response?.status === 404 || error.name === "NotFoundError") {
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
            unfunded: true,
          },
        ]);
      } else {
        logger.error("Unexpected error", error);
        setBalances([]);
      }
    }
  };

  const connectWallet = async (): Promise<void> => {
    if (isConnecting) return;

    setIsConnecting(true);
    try {
      await kit.openModal({
        onWalletSelected: async (option: WalletOption) => {
          try {
            await kit.setWallet(option.id);
            const { address } = await kit.getAddress();
            setWalletAddress(address);
            setWalletType(option.id as WalletType);
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
        onClosed: (err?: Error) => {
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
  const connectRabbit = async (): Promise<void> => {
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
  const disconnectWallet = (): void => {
    setWalletAddress(null);
    setWalletType(null);
    setBalances(null);
    localStorage.removeItem("stellar_wallet_address");
    localStorage.removeItem("stellar_wallet_id");
    logger.wallet("Wallet disconnected");
  };

  // Sign transaction
  const signTransaction = async (
    transaction: string | object
  ): Promise<string> => {
    if (!walletAddress || !walletType) {
      throw new Error("No wallet connected");
    }

    try {
      // Handle different transaction formats
      let transactionXDR: string;
      logger.transaction("Analyzing transaction format", {
        type: typeof transaction,
        hasToXDR: !!(
          transaction && typeof (transaction as any).toXDR === "function"
        ),
        hasBuilt: !!(transaction && (transaction as any).built),
        keys: transaction ? Object.keys(transaction as object) : [],
      });

      if (typeof transaction === "string") {
        // Already XDR string
        transactionXDR = transaction;
      } else if (
        transaction &&
        typeof (transaction as any).toXDR === "function"
      ) {
        // Transaction object
        transactionXDR = (transaction as any).toXDR();
      } else if (
        transaction &&
        (transaction as any).built &&
        typeof (transaction as any).built.toXDR === "function"
      ) {
        // Soroban contract transaction object
        transactionXDR = (transaction as any).built.toXDR();
      } else {
        logger.error("Unknown transaction format", transaction);
        throw new Error(
          `Invalid transaction format. Type: ${typeof transaction}, hasToXDR: ${!!(
            transaction && typeof (transaction as any).toXDR === "function"
          )}, hasBuilt: ${!!(transaction && (transaction as any).built)}`
        );
      }

      if (walletType === "rabbit") {
        if (!window.rabet) {
          throw new Error("Rabbit wallet not installed");
        }
        const { xdr } = await window.rabet.sign(transactionXDR, "testnet");
        return xdr;
      } else {
        logger.wallet(
          "Available kit methods",
          Object.getOwnPropertyNames(kit).filter(
            (name) => typeof (kit as any)[name] === "function"
          )
        );

        // Try different methods that might be available
        if (typeof (kit as any).signTransaction === "function") {
          logger.wallet("Using kit.signTransaction from WalletContext");
          const result = (await (kit as any).signTransaction(transactionXDR, {
            publicKey: walletAddress,
            network: WalletNetwork.TESTNET,
          })) as SignTransactionResult;

          logger.wallet("WalletContext kit.signTransaction result", result);
          const signedXdr =
            result.signedXDR || result.signedTxXdr || result.xdr || result;
          logger.wallet("WalletContext extracted XDR", {
            type: typeof signedXdr,
            length: signedXdr ? signedXdr.length : 0,
            preview: signedXdr ? signedXdr.substring(0, 100) + "..." : "null",
          });

          // Validate XDR format
          if (typeof signedXdr !== "string" || !signedXdr.trim()) {
            throw new Error(
              `Invalid XDR format from WalletContext kit.signTransaction. Got: ${typeof signedXdr}, value: ${signedXdr}`
            );
          }

          return signedXdr;
        } else if (typeof (kit as any).signTx === "function") {
          logger.wallet("Using kit.signTx from WalletContext");
          const result = (await (kit as any).signTx({
            xdr: transactionXDR,
            publicKeys: [walletAddress],
            network: WalletNetwork.TESTNET,
          })) as SignTransactionResult;

          logger.wallet("WalletContext kit.signTx result", result);
          const signedXdr =
            result.signedXDR || result.signedTxXdr || result.xdr || result;
          logger.wallet("WalletContext extracted XDR", {
            type: typeof signedXdr,
            length: signedXdr ? signedXdr.length : 0,
            preview: signedXdr ? signedXdr.substring(0, 100) + "..." : "null",
          });

          // Validate XDR format
          if (typeof signedXdr !== "string" || !signedXdr.trim()) {
            throw new Error(
              `Invalid XDR format from WalletContext kit.signTx. Got: ${typeof signedXdr}, value: ${signedXdr}`
            );
          }

          return signedXdr;
        } else {
          throw new Error(
            `Wallet kit signing method not found. Available methods: ${Object.getOwnPropertyNames(
              kit
            )
              .filter((name) => typeof (kit as any)[name] === "function")
              .join(", ")}`
          );
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
      setWalletType(savedWalletId as WalletType);
      fetchBalances(savedAddress);
    }
  }, []);

  const value: WalletContextType = {
    walletAddress,
    walletType,
    isConnecting,
    isReady: !!walletAddress && !isConnecting,
    balances,
    connectWallet,
    connectRabbit,
    disconnectWallet,
    signTransaction,
    fetchBalances,
    fundTestnetAccount,
    walletKit: kit,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
