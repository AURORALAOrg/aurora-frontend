import {
  StellarWalletsKit,
  WalletNetwork,
  FREIGHTER_ID,
  FreighterModule,
  LobstrModule,
  RabetModule
} from '@creit.tech/stellar-wallets-kit';

export const kit: StellarWalletsKit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: FREIGHTER_ID,
  modules: [
    new FreighterModule(),
    new LobstrModule(),
    new RabetModule(),
  ]
});
