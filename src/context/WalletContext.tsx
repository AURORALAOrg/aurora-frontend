"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { connect, disconnect } from "starknetkit";

// Definición de tipos para StarknetKit
interface StarknetWallet {
  isConnected: boolean;
  selectedAddress: string;
  // Añadir otras propiedades del wallet según sea necesario
}

interface ConnectResponse {
  wallet: StarknetWallet | null;
}

// Definición del tipo para el contexto
interface WalletContextType {
  address: string;
  wallet: StarknetWallet | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

// Creación del contexto con un valor inicial
const WalletContext = createContext<WalletContextType>({
  address: "",
  wallet: null,
  connectWallet: async () => {},
  disconnectWallet: async () => {},
});

// Props para el componente provider
interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [address, setAddress] = useState<string>("");
  const [wallet, setWallet] = useState<StarknetWallet | null>(null);

  useEffect(() => {
    const autoConnect = async (): Promise<void> => {
      try {
        const { wallet: connectedWallet }: ConnectResponse = await connect({
          modalMode: "neverAsk",
          dappName: "AURORA",
        });

        if (connectedWallet?.isConnected) {
          setWallet(connectedWallet);
          setAddress(connectedWallet.selectedAddress);
        }
      } catch (error) {
        console.error("Auto-connect error:", error);
      }
    };

    autoConnect();
  }, []);

  const connectWallet = async (): Promise<void> => {
    try {
      const { wallet: newWallet }: ConnectResponse = await connect({
        modalMode: "alwaysAsk",
        dappName: "AURORA",
        modalTheme: "dark",
      });

      if (newWallet) {
        setWallet(newWallet);
        setAddress(newWallet.selectedAddress);
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  const disconnectWallet = async (): Promise<void> => {
    try {
      await disconnect({ clearLastWallet: true });
      setWallet(null);
      setAddress("");
    } catch (error) {
      console.error("Disconnection error:", error);
    }
  };

  return (
    <WalletContext.Provider
      value={{ address, wallet, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
