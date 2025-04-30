import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { StellarWalletProvider } from '@/context/StellarWalletContext';
import WalletConnection from '@/pages/aurora-site/wallet/wallet-connection';

// Mock the useStellarWallet hook
jest.mock('@/context/StellarWalletContext', () => ({
  useStellarWallet: jest.fn(),
  StellarWalletProvider: ({ children }) => <div>{children}</div>
}));

// Mock the getAccountBalance function
jest.mock('@/utils/stellar/transaction', () => ({
  getAccountBalance: jest.fn()
}));

// Import the mocked hook
import { useStellarWallet } from '@/context/StellarWalletContext';
import { getAccountBalance } from '@/utils/stellar/transaction';

describe('WalletConnection Component', () => {
  const mockHandleConnect = jest.fn();
  const mockHandleDisconnect = jest.fn();
  
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Default mock implementation
    useStellarWallet.mockReturnValue({
      address: null,
      walletType: null,
      isConnecting: false,
      error: null,
      handleConnect: mockHandleConnect,
      handleDisconnect: mockHandleDisconnect,
      WALLET_TYPES: {
        FREIGHTER: 'freighter',
        RABBIT: 'rabbit',
        LOBSTR: 'lobstr'
      }
    });
    
    getAccountBalance.mockResolvedValue([
      { asset_type: 'native', balance: '100.0000000' },
      { asset_type: 'credit_alphanum4', asset_code: 'USDC', asset_issuer: 'G...', balance: '50.0000000' }
    ]);
  });
  
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <WalletConnection />
      </BrowserRouter>
    );
  };
  
  test('renders connect wallet button when not connected', () => {
    renderComponent();
    
    const connectButton = screen.getByText('Connect Wallet');
    expect(connectButton).toBeInTheDocument();
  });
  
  test('shows wallet modal when connect button is clicked', () => {
    renderComponent();
    
    const connectButton = screen.getByText('Connect Wallet');
    fireEvent.click(connectButton);
    
    // Check if modal is displayed
    expect(screen.getByText('Connect Stellar Wallet')).toBeInTheDocument();
  });
  
  test('displays wallet info when connected', async () => {
    // Mock connected wallet state
    useStellarWallet.mockReturnValue({
      address: 'GABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
      walletType: 'freighter',
      isConnecting: false,
      error: null,
      handleConnect: mockHandleConnect,
      handleDisconnect: mockHandleDisconnect,
      WALLET_TYPES: {
        FREIGHTER: 'freighter',
        RABBIT: 'rabbit',
        LOBSTR: 'lobstr'
      }
    });
    
    renderComponent();
    
    // Check if wallet info is displayed
    expect(screen.getByText('Wallet Connected')).toBeInTheDocument();
    expect(screen.getByText(/GABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890/)).toBeInTheDocument();
    expect(screen.getByText('freighter')).toBeInTheDocument();
    
    // Check if balances are displayed
    await waitFor(() => {
      expect(screen.getByText('XLM:')).toBeInTheDocument();
      expect(screen.getByText('USDC:')).toBeInTheDocument();
    });
  });
  
  test('displays disconnect button when connected', () => {
    // Mock connected wallet state
    useStellarWallet.mockReturnValue({
      address: 'GABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
      walletType: 'freighter',
      isConnecting: false,
      error: null,
      handleConnect: mockHandleConnect,
      handleDisconnect: mockHandleDisconnect,
      WALLET_TYPES: {
        FREIGHTER: 'freighter',
        RABBIT: 'rabbit',
        LOBSTR: 'lobstr'
      }
    });
    
    renderComponent();
    
    const disconnectButton = screen.getByText('Disconnect Wallet');
    expect(disconnectButton).toBeInTheDocument();
    
    fireEvent.click(disconnectButton);
    expect(mockHandleDisconnect).toHaveBeenCalled();
  });
  
  test('displays error message when there is an error', () => {
    // Mock error state
    useStellarWallet.mockReturnValue({
      address: null,
      walletType: null,
      isConnecting: false,
      error: 'Failed to connect wallet',
      handleConnect: mockHandleConnect,
      handleDisconnect: mockHandleDisconnect,
      WALLET_TYPES: {
        FREIGHTER: 'freighter',
        RABBIT: 'rabbit',
        LOBSTR: 'lobstr'
      }
    });
    
    renderComponent();
    
    expect(screen.getByText('Failed to connect wallet')).toBeInTheDocument();
  });
}); 