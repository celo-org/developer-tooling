import { zeroRange } from '@celo/base'
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import { Chain, createWalletClient, Transport, WalletClientConfig } from 'viem'
import { DEFAULT_DERIVATION_PATH } from './constants'
import { ledgerToAccount } from './ledger-to-account'
import { AddressValidation, LedgerAccount, LedgerWalletClient } from './types'
import { generateLedger } from './utils'

const ADDRESS_QTY = 1

export async function ledgerToWalletClient<T extends Chain | undefined = undefined>({
  transport,
  derivationPathIndexes = zeroRange(ADDRESS_QTY),
  changeIndexes = [0],
  baseDerivationPath = DEFAULT_DERIVATION_PATH,
  ledgerAddressValidation,
  walletClientOptions,
}: {
  transport: TransportNodeHid
  derivationPathIndexes?: number[]
  changeIndexes?: number[]
  baseDerivationPath?: string
  ledgerAddressValidation?: AddressValidation
  walletClientOptions: Omit<WalletClientConfig<Transport, T>, 'account'>
}): Promise<LedgerWalletClient<T>> {
  const ledger = await generateLedger(transport)
  const accounts: Promise<LedgerAccount>[] = []
  validateIndexes(derivationPathIndexes, 'address index')
  validateIndexes(changeIndexes, 'change index')

  const _baseDerivationPath = baseDerivationPath.startsWith('m/')
    ? baseDerivationPath.slice(2)
    : baseDerivationPath

  // https://trezor.io/learn/a/what-is-bip44
  const [purpose, coinType, accountIndex] = _baseDerivationPath.split('/')
  for (const changeIndex of changeIndexes) {
    for (const addressIndex of derivationPathIndexes) {
      accounts.push(
        ledgerToAccount({
          ledger,
          derivationPathIndex: addressIndex,
          baseDerivationPath: `${purpose}/${coinType}/${accountIndex}/${changeIndex}`,
          ledgerAddressValidation,
        })
      )
    }
  }
  const walletClient = createWalletClient({
    ...walletClientOptions,
    account: await accounts[0],
  })
  walletClient.getAddresses = () =>
    Promise.all(accounts).then((xs) => xs.map((account) => account.address))

  return walletClient
}

function validateIndexes(indexes: number[], label: string = 'address index') {
  if (indexes.length === 0) {
    throw new Error(`ledger-wallet: No ${label} provided`)
  }

  const invalidDPs = indexes.some((value) => !(Number.isInteger(value) && value >= 0))
  if (invalidDPs) {
    throw new Error(`ledger-wallet: Invalid ${label} provided`)
  }
}
