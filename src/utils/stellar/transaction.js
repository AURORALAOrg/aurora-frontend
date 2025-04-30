// Import the Stellar SDK
import { Server, TransactionBuilder, Asset, Operation, Keypair } from 'stellar-sdk';

// Initialize Stellar server (testnet)
const server = new Server('https://horizon-testnet.stellar.org');

/**
 * Create a payment transaction
 * @param {string} sourcePublicKey - The public key of the source account
 * @param {string} destinationPublicKey - The public key of the destination account
 * @param {string} amount - The amount to send
 * @param {string} assetCode - The asset code (e.g., 'XLM', 'USDC')
 * @param {string} assetIssuer - The asset issuer public key (for non-native assets)
 * @returns {Promise<string>} - The XDR transaction
 */
export const createPaymentTransaction = async (
  sourcePublicKey,
  destinationPublicKey,
  amount,
  assetCode = 'XLM',
  assetIssuer = null
) => {
  try {
    // Get the source account
    const sourceAccount = await server.loadAccount(sourcePublicKey);
    
    // Create the asset
    const asset = assetCode === 'XLM' 
      ? Asset.native() 
      : new Asset(assetCode, assetIssuer);
    
    // Create the transaction
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: await server.fetchBaseFee(),
      networkPassphrase: 'Public Global Stellar Network ; September 2015'
    })
      .addOperation(
        Operation.payment({
          destination: destinationPublicKey,
          asset: asset,
          amount: amount
        })
      )
      .setTimeout(30)
      .build();
    
    // Return the transaction XDR
    return transaction.toXDR();
  } catch (error) {
    console.error('Error creating payment transaction:', error);
    throw error;
  }
};

/**
 * Get account balance
 * @param {string} publicKey - The public key of the account
 * @returns {Promise<Array>} - Array of balances
 */
export const getAccountBalance = async (publicKey) => {
  try {
    const account = await server.loadAccount(publicKey);
    return account.balances;
  } catch (error) {
    console.error('Error getting account balance:', error);
    throw error;
  }
};

/**
 * Check if a wallet is installed
 * @param {string} walletType - The type of wallet to check
 * @returns {boolean} - Whether the wallet is installed
 */
export const isWalletInstalled = (walletType) => {
  switch (walletType) {
    case 'freighter':
      return typeof window.freighter !== 'undefined';
    case 'rabbit':
      return typeof window.rabbithole !== 'undefined';
    case 'lobstr':
      // Lobstr is a mobile wallet, so we can't check if it's installed
      return true;
    default:
      return false;
  }
}; 