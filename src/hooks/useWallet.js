import { useState, useCallback, useEffect } from 'react';

const WALLET_TYPES = {
  FREIGHTER: 'freighter',
  RABBIT: 'rabbit',
  LOBSTR: 'lobstr'
};

export const useWallet = () => {
  const [address, setAddress] = useState(null);
  const [walletType, setWalletType] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkWallets = async () => {
      try {
        if (window.freighter) {
          const isConnected = await window.freighter.isConnected();
          if (isConnected) {
            const publicKey = await window.freighter.getPublicKey();
            setAddress(publicKey);
            setWalletType(WALLET_TYPES.FREIGHTER);
          }
        }
        
        if (window.rabbithole) {
          const isConnected = await window.rabbithole.isConnected();
          if (isConnected) {
            const publicKey = await window.rabbithole.getPublicKey();
            setAddress(publicKey);
            setWalletType(WALLET_TYPES.RABBIT);
          }
        }
      } catch (err) {
        console.error('Error checking wallet connections:', err);
      }
    };

    checkWallets();
  }, []);

  const handleConnect = useCallback(async (preferredWallet = null) => {
    setIsConnecting(true);
    setError(null);
    
    try {
      if (preferredWallet) {
        if (preferredWallet === WALLET_TYPES.FREIGHTER && window.freighter) {
          await window.freighter.connect();
          const publicKey = await window.freighter.getPublicKey();
          setAddress(publicKey);
          setWalletType(WALLET_TYPES.FREIGHTER);
          return;
        }
        
        if (preferredWallet === WALLET_TYPES.RABBIT && window.rabbithole) {
          await window.rabbithole.connect();
          const publicKey = await window.rabbithole.getPublicKey();
          setAddress(publicKey);
          setWalletType(WALLET_TYPES.RABBIT);
          return;
        }
        
        if (preferredWallet === WALLET_TYPES.LOBSTR) {
          const stellarLink = `web+stellar:tx?xdr=`;
          window.location.href = stellarLink;
          return;
        }
      }
      
      if (window.freighter) {
        await window.freighter.connect();
        const publicKey = await window.freighter.getPublicKey();
        setAddress(publicKey);
        setWalletType(WALLET_TYPES.FREIGHTER);
        return;
      }
      
      if (window.rabbithole) {
        await window.rabbithole.connect();
        const publicKey = await window.rabbithole.getPublicKey();
        setAddress(publicKey);
        setWalletType(WALLET_TYPES.RABBIT);
        return;
      }
      
      setError('No Stellar wallets found. Please install Freighter, Rabbit, or Lobstr.');
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const handleDisconnect = useCallback(async () => {
    try {
      if (walletType === WALLET_TYPES.FREIGHTER && window.freighter) {
        await window.freighter.disconnect();
      } else if (walletType === WALLET_TYPES.RABBIT && window.rabbithole) {
        await window.rabbithole.disconnect();
      }
      
      setAddress(null);
      setWalletType(null);
    } catch (err) {
      console.error('Error disconnecting wallet:', err);
      setError(err.message || 'Failed to disconnect wallet');
    }
  }, [walletType]);

  const signTransaction = useCallback(async (transaction) => {
    if (!address || !walletType) {
      throw new Error('No wallet connected');
    }
    
    try {
      if (walletType === WALLET_TYPES.FREIGHTER && window.freighter) {
        return await window.freighter.signTransaction(transaction);
      } else if (walletType === WALLET_TYPES.RABBIT && window.rabbithole) {
        return await window.rabbithole.signTransaction(transaction);
      } else if (walletType === WALLET_TYPES.LOBSTR) {
        const stellarLink = `web+stellar:tx?xdr=${encodeURIComponent(transaction)}`;
        window.location.href = stellarLink;
        return null;
      }
      
      throw new Error('Unsupported wallet type');
    } catch (err) {
      console.error('Error signing transaction:', err);
      throw err;
    }
  }, [address, walletType]);

  return {
    address,
    walletType,
    isConnecting,
    error,
    handleConnect,
    handleDisconnect,
    signTransaction,
    WALLET_TYPES
  };
};