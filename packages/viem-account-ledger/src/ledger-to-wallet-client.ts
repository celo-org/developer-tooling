import { zeroRange } from '@celo/base'
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import { Address, Chain, createWalletClient, Transport, WalletClientConfig } from 'viem'
import { DEFAULT_DERIVATION_PATH } from './constants'
import { ADDRESS_QTY, deriveLedgerAccounts } from './derive-ledger-accounts'
import { AddressValidation, LedgerAccount, LedgerWalletClient } from './types'

export async function ledgerToWalletClient<T extends Chain | undefined = undefined>({
  transport,
  derivationPathIndexes = zeroRange(ADDRESS_QTY),
  changeIndexes = [0],
  baseDerivationPath = DEFAULT_DERIVATION_PATH,
  ledgerAddressValidation,
  account,
  walletClientOptions,
}: {
  transport: TransportNodeHid
  derivationPathIndexes?: number[]
  changeIndexes?: number[]
  baseDerivationPath?: string
  ledgerAddressValidation?: AddressValidation
  account?: Address
  walletClientOptions: Omit<WalletClientConfig<Transport, T>, 'account'>
}): Promise<LedgerWalletClient<T>> {
  const accounts: LedgerAccount[] = await deriveLedgerAccounts({
    transport,
    derivationPathIndexes,
    changeIndexes,
    baseDerivationPath,
    ledgerAddressValidation,
  })

  let ledgerAccount: LedgerAccount | undefined
  if (account) {
    ledgerAccount = accounts.find((x) => x.address.toLowerCase() === account.toLowerCase())
    if (!ledgerAccount) {
      throw new Error(
        'The given `account` doesnt match any of the addresses retrieved by your ledger and the given derivation path(s)'
      )
    }
  } else {
    // NOTE: defaults to the first ledger account
    ledgerAccount = accounts[0]
  }

  const walletClient = createWalletClient({
    ...walletClientOptions,
    account: ledgerAccount,
  })
  walletClient.getAddresses = async () => accounts.map((account) => account.address)

  return {
    ...walletClient,
    accounts,
  }
}
