/**
 * Types related to blockchain wallets, NFTs, and cryptocurrency functionality
 */

/**
 * Wallet connection state
 */
export interface WalletState {
  walletAddress: string | null;
  walletType: string | null;
  isConnecting: boolean;
  isReady: boolean;
  balances: AssetBalance[] | null;
}

/**
 * Wallet balance for an asset
 */
export interface AssetBalance {
  asset_type: "native" | "credit_alphanum4" | "credit_alphanum12";
  asset_code?: string;
  asset_issuer?: string;
  balance: string;
  unfunded?: boolean;
  limit?: string;
  buying_liabilities?: string;
  selling_liabilities?: string;
  last_modified_ledger?: number;
}

/**
 * Wallet type identifiers
 */
export type WalletType =
  | "xbull"
  | "rabbit"
  | "freighter"
  | "albedo"
  | "wallet-connect";

/**
 * Stellar network types
 */
export type StellarNetwork = "PUBLIC" | "TESTNET";

/**
 * NFT contract interface
 */
export interface NFTContract {
  contractId: string;
  name: string;
  symbol: string;
  adminAddress: string;
}

/**
 * NFT Token
 */
export interface NFTToken {
  id: string;
  owner: string;
  uri: string;
}

/**
 * Transaction signing parameters
 */
export interface SignTransactionParams {
  transaction: string | object;
  network?: StellarNetwork;
}

/**
 * Transaction signing result
 */
export interface SignTransactionResult {
  signedXDR?: string;
  signedTxXdr?: string;
  xdr?: string;
}

/**
 * Wallet connection options
 */
export interface WalletConnectionOptions {
  modalTitle?: string;
  notAvailableText?: string;
  onClosed?: (err?: Error) => void;
  onWalletSelected?: (option: WalletOption) => Promise<void>;
}

/**
 * Wallet selection option
 */
export interface WalletOption {
  id: string;
  name: string;
  icon?: string;
}
