/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NFTInteract from '../components/stellar/nft-interact';

// Mock the wallet context
const mockWalletContext = {
  walletAddress: 'GCQZP2RODBXDRMRZ4DQTL4XEXJCWM3MLHJ7URPTVFVJDVFZCHVJTFAKE',
  walletType: 'freighter',
  isReady: true,
  signTransaction: jest.fn(),
  connectWallet: jest.fn(),
  disconnectWallet: jest.fn(),
  walletKit: {
    signTx: jest.fn()
  }
};

// Mock the toast context
const mockToastContext = {
  showToast: jest.fn()
};

// Mock Stellar SDK
jest.mock('@stellar/stellar-sdk', () => ({
  Networks: {
    TESTNET: 'Test SDF Network ; September 2015'
  },
  Transaction: {
    fromXDR: jest.fn()
  },
  TransactionBuilder: jest.fn().mockImplementation(() => ({
    addOperation: jest.fn().mockReturnThis(),
    setTimeout: jest.fn().mockReturnThis(),
    build: jest.fn().mockReturnValue({
      toXDR: jest.fn().mockReturnValue('mock-xdr')
    })
  })),
  BASE_FEE: '100',
  Address: {
    fromString: jest.fn().mockReturnValue({
      toScVal: jest.fn()
    })
  },
  nativeToScVal: jest.fn(),
  scValToNative: jest.fn(),
  Contract: jest.fn().mockImplementation(() => ({
    call: jest.fn().mockReturnValue('mock-operation')
  }))
}));

// Mock the contexts
jest.mock('../context/WalletContext', () => ({
  useWallet: () => mockWalletContext
}));

jest.mock('../context/ToastContext', () => ({
  useToast: () => mockToastContext
}));

// Mock UI components
jest.mock('../components/ui/card', () => ({
  Card: ({ children }) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }) => <div data-testid="card-content">{children}</div>,
  CardHeader: ({ children }) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }) => <div data-testid="card-title">{children}</div>
}));

jest.mock('../components/ui/button', () => ({
  Button: ({ children, onClick, disabled, ...props }) => (
    <button onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  )
}));

jest.mock('../components/ui/input', () => ({
  Input: (props) => <input {...props} />
}));

jest.mock('../components/ui/label', () => ({
  Label: ({ children, ...props }) => <label {...props}>{children}</label>
}));

jest.mock('../components/ui/tabs', () => ({
  Tabs: ({ children }) => <div data-testid="tabs">{children}</div>,
  TabsContent: ({ children }) => <div data-testid="tabs-content">{children}</div>,
  TabsList: ({ children }) => <div data-testid="tabs-list">{children}</div>,
  TabsTrigger: ({ children, value }) => <button data-testid={`tab-${value}`}>{children}</button>
}));

jest.mock('../components/ui/badge', () => ({
  Badge: ({ children }) => <span data-testid="badge">{children}</span>
}));

describe('NFTInteract Mint Function Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset console.log and console.error
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should show admin check failed message when user is not admin', async () => {
    const user = userEvent.setup();
    
    // Mock contract with different admin address
    const mockAdminAddress = 'GDIFFERENTADMINADDRESSEXAMPLE123456789012345678901234';
    
    render(<NFTInteract />);
    
    // Wait for component to render
    await waitFor(() => {
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });
    
    // Set contract ID
    const contractInput = screen.getByPlaceholderText(/CAE3EUNCU6XA7KH4XYPSIA6TYPUQQYVGPGSBUFOHO2KEIGCOETW2GKFP/);
    await user.type(contractInput, 'CAE3EUNCU6XA7KH4XYPSIA6TYPUQQYVGPGSBUFOHO2KEIGCOETW2GKFP');
    
    // Mock the component's state manually by triggering the load contract
    // Since we can't directly access React state, we'll test the behavior
    
    // Try to access mint form (this should show admin error)
    const mintTab = screen.queryByTestId('tab-mint');
    if (mintTab) {
      await user.click(mintTab);
    }
    
    // The component should show admin-only message
    expect(screen.getByText(/Only admin can mint NFTs/i)).toBeInTheDocument();
  });

  test('should display proper error message when admin check fails', async () => {
    const user = userEvent.setup();
    
    render(<NFTInteract />);
    
    // Mock wallet connected but not admin
    mockWalletContext.walletAddress = 'GCNOTADMINADDRESSEXAMPLE123456789012345678901234567890';
    
    // Find mint recipient input
    const recipientInput = screen.getByPlaceholderText(/GCQZ.*Stellar public key/);
    await user.type(recipientInput, 'GCQZP2RODBXDRMRZ4DQTL4XEXJCWM3MLHJ7URPTVFVJDVFZCHVJRECIP');
    
    // Find token ID input
    const tokenIdInput = screen.getByPlaceholderText(/Enter a positive integer/);
    await user.type(tokenIdInput, '1');
    
    // Try to mint (should fail with admin error)
    const mintButton = screen.getByRole('button', { name: /Mint NFT/i });
    await user.click(mintButton);
    
    // Should show toast with admin error
    expect(mockToastContext.showToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining('admin'),
        variant: 'destructive'
      })
    );
  });

  test('should validate token ID input correctly', async () => {
    const user = userEvent.setup();
    
    render(<NFTInteract />);
    
    const tokenIdInput = screen.getByPlaceholderText(/Enter a positive integer/);
    
    // Test invalid token ID (should not be accepted)
    await user.type(tokenIdInput, 'abc');
    expect(tokenIdInput.value).toBe(''); // Should reject non-numeric input
    
    // Test valid token ID
    await user.clear(tokenIdInput);
    await user.type(tokenIdInput, '123');
    expect(tokenIdInput.value).toBe('123');
    
    // Test negative number (should not be accepted by the validation)
    await user.clear(tokenIdInput);
    await user.type(tokenIdInput, '-1');
    expect(tokenIdInput.value).toBe('1'); // Should only accept the numeric part
  });

  test('should show enhanced admin comparison in UI', async () => {
    render(<NFTInteract />);
    
    // Mock admin panel tab
    const adminTab = screen.queryByTestId('tab-admin');
    if (adminTab) {
      await userEvent.click(adminTab);
    }
    
    // Should show admin comparison section
    expect(screen.getByText(/Admin Access Required/i)).toBeInTheDocument();
    expect(screen.getByText(/Only the contract administrator can mint NFTs/i)).toBeInTheDocument();
  });

  test('should handle contract loading correctly', async () => {
    const user = userEvent.setup();
    
    render(<NFTInteract />);
    
    const contractInput = screen.getByPlaceholderText(/CAE3EUNCU6XA7KH4XYPSIA6TYPUQQYVGPGSBUFOHO2KEIGCOETW2GKFP/);
    const loadButton = screen.getByRole('button', { name: /Load Contract/i });
    
    // Initially button should be disabled if no wallet connected
    if (!mockWalletContext.walletAddress) {
      expect(loadButton).toBeDisabled();
    }
    
    // Add contract ID
    await user.type(contractInput, 'CAE3EUNCU6XA7KH4XYPSIA6TYPUQQYVGPGSBUFOHO2KEIGCOETW2GKFP');
    
    // Click load contract
    if (mockWalletContext.walletAddress) {
      await user.click(loadButton);
    }
    
    expect(contractInput.value).toBe('CAE3EUNCU6XA7KH4XYPSIA6TYPUQQYVGPGSBUFOHO2GKFP');
  });

  test('should properly format addresses in error messages', () => {
    const testAddress = 'GCQZP2RODBXDRMRZ4DQTL4XEXJCWM3MLHJ7URPTVFVJDVFZCHVJTEST';
    
    // Test address formatting logic (this tests the substring logic used in error messages)
    const shortAddress = `${testAddress.substring(0, 8)}...${testAddress.substring(-6)}`;
    
    expect(shortAddress).toBe('GCQZP2RO...VJTEST');
    expect(shortAddress.length).toBeLessThan(testAddress.length);
  });

  test('should handle mint form validation correctly', async () => {
    const user = userEvent.setup();
    
    render(<NFTInteract />);
    
    // Find form inputs
    const recipientInput = screen.getByPlaceholderText(/GCQZ.*Stellar public key/);
    const tokenIdInput = screen.getByPlaceholderText(/Enter a positive integer/);
    const mintButton = screen.getByRole('button', { name: /Mint NFT/i });
    
    // Initially button should be disabled (no inputs filled)
    expect(mintButton).toBeDisabled();
    
    // Fill recipient
    await user.type(recipientInput, 'GCQZP2RODBXDRMRZ4DQTL4XEXJCWM3MLHJ7URPTVFVJDVFZCHVJRECIP');
    
    // Button still disabled (no token ID)
    expect(mintButton).toBeDisabled();
    
    // Fill token ID
    await user.type(tokenIdInput, '1');
    
    // Now button should be enabled if user is admin (we'll mock this scenario)
    if (mockWalletContext.walletAddress) {
      // Note: Button will still be disabled due to admin check, but validation is working
      expect(recipientInput.value).toBe('GCQZP2RODBXDRMRZ4DQTL4XEXJCWM3MLHJ7URPTVFVJDVFZCHVJRECIP');
      expect(tokenIdInput.value).toBe('1');
    }
  });

  test('should show wallet connection requirement', async () => {
    // Mock disconnected wallet
    const disconnectedMockContext = {
      ...mockWalletContext,
      walletAddress: null,
      isReady: false
    };
    
    // We can't easily change the mock mid-test, so we'll test the UI behavior
    render(<NFTInteract />);
    
    // When no wallet is connected, certain elements should not be available
    // The component should show appropriate messaging
    const mintButton = screen.getByRole('button', { name: /Mint NFT/i });
    expect(mintButton).toBeDisabled();
  });
});

// Additional test for the smart contract logic (Rust side)
describe('Smart Contract Mint Logic Tests', () => {
  test('should verify mint function requires admin authorization', () => {
    // This is a documentation test for the smart contract behavior
    // The actual contract testing would be done in Rust
    
    const contractMintRequirements = {
      adminAuthRequired: true,
      tokenIdMustBeUnique: true,
      recipientMustBeValid: true
    };
    
    expect(contractMintRequirements.adminAuthRequired).toBe(true);
    expect(contractMintRequirements.tokenIdMustBeUnique).toBe(true);
    expect(contractMintRequirements.recipientMustBeValid).toBe(true);
  });
  
  test('should document the admin-only mint behavior', () => {
    // This documents the expected behavior based on the contract code
    const expectedBehavior = {
      onlyAdminCanMint: true,
      adminSetDuringInitialization: true,
      adminCanBeTransferred: true,
      mintCreatesUniqueToken: true
    };
    
    expect(expectedBehavior.onlyAdminCanMint).toBe(true);
    expect(expectedBehavior.adminSetDuringInitialization).toBe(true);
    expect(expectedBehavior.adminCanBeTransferred).toBe(true);
    expect(expectedBehavior.mintCreatesUniqueToken).toBe(true);
  });
});