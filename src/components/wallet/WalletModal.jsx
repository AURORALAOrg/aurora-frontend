import React from 'react';
import { X, Wallet } from 'lucide-react';
import { useStellarWallet } from '@/context/StellarWalletContext';

const WalletModal = ({ isOpen, onClose }) => {
  const { handleConnect, isConnecting, WALLET_TYPES } = useStellarWallet();

  if (!isOpen) return null;

  const handleWalletSelect = async (walletType) => {
    await handleConnect(walletType);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Connect Stellar Wallet</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => handleWalletSelect(WALLET_TYPES.FREIGHTER)}
            disabled={isConnecting}
            className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Wallet size={20} className="mr-3 text-blue-500" />
            <div className="text-left">
              <div className="font-medium">Freighter</div>
              <div className="text-xs text-gray-500">Browser Extension</div>
            </div>
          </button>
          
          <button
            onClick={() => handleWalletSelect(WALLET_TYPES.RABBIT)}
            disabled={isConnecting}
            className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Wallet size={20} className="mr-3 text-purple-500" />
            <div className="text-left">
              <div className="font-medium">Rabbit</div>
              <div className="text-xs text-gray-500">Browser Extension</div>
            </div>
          </button>
          
          <button
            onClick={() => handleWalletSelect(WALLET_TYPES.LOBSTR)}
            disabled={isConnecting}
            className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Wallet size={20} className="mr-3 text-green-500" />
            <div className="text-left">
              <div className="font-medium">Lobstr</div>
              <div className="text-xs text-gray-500">Mobile Wallet</div>
            </div>
          </button>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          Make sure you have one of these wallets installed
        </div>
      </div>
    </div>
  );
};

export default WalletModal; 