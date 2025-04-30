import { createContext, useContext, useEffect, useState } from 'react';
import { useWallet } from '@/hooks/useWallet';

const StellarWalletContext = createContext();

export const StellarWalletProvider = ({ children }) => {
  const { 
    address, 
    walletType, 
    isConnecting, 
    error, 
    handleConnect, 
    handleDisconnect,
    signTransaction,
    WALLET_TYPES
  } = useWallet();

  // Store wallet type in localStorage for auto-reconnect
  useEffect(() => {
    if (walletType) {
      localStorage.setItem('stellarWalletType', walletType);
    } else {
      localStorage.removeItem('stellarWalletType');
    }
  }, [walletType]);

  // Store address in localStorage
  useEffect(() => {
    if (address) {
      localStorage.setItem('stellarAddress', address);
    } else {
      localStorage.removeItem('stellarAddress');
    }
  }, [address]);

  // Auto-connect on page load if previously connected
  useEffect(() => {
    const savedWalletType = localStorage.getItem('stellarWalletType');
    const savedAddress = localStorage.getItem('stellarAddress');
    
    if (savedWalletType && savedAddress) {
      handleConnect(savedWalletType);
    }
  }, [handleConnect]);

  return (
    <StellarWalletContext.Provider 
      value={{ 
        address, 
        walletType, 
        isConnecting, 
        error, 
        handleConnect, 
        handleDisconnect,
        signTransaction,
        WALLET_TYPES
      }}
    >
      {children}
    </StellarWalletContext.Provider>
  );
};

export const useStellarWallet = () => useContext(StellarWalletContext); 