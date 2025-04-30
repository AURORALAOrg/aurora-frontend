import { useWallet } from './useWallet';

/**
 * Hook for interacting with Stellar wallets
 * This is a wrapper around useWallet that provides Stellar-specific functionality
 */
export const useStellarWallet = () => {
  const wallet = useWallet();
  
  return {
    ...wallet,
    // Add any Stellar-specific functionality here
  };
}; 