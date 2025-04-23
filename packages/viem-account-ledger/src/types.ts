import { Chain, LocalAccount, Transport, WalletClient } from 'viem'

export type LedgerAccount = LocalAccount<'ledger'>
export type LedgerWalletClient = WalletClient<Transport, Chain | undefined, LedgerAccount>

export enum AddressValidation {
  // Validates every address required only when the ledger is initialized
  initializationOnly,
  // Validates the address every time a transaction is made
  everyTransaction,
  // Validates the address the first time a transaction is made for that specific address
  firstTransactionPerAddress,
  // Never validates the addresses
  never,
}
