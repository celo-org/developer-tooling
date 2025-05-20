import { zeroRange } from '@celo/base'
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import { DEFAULT_DERIVATION_PATH } from './constants'
import { ledgerToAccount } from './ledger-to-account'
import { AddressValidation, LedgerAccount } from './types'
import { generateLedger } from './utils'

export async function deriveLedgerAccounts({
  transport,
  derivationPathIndexes = zeroRange(ADDRESS_QTY),
  changeIndexes = [0],
  baseDerivationPath = DEFAULT_DERIVATION_PATH,
  ledgerAddressValidation,
}: {
  transport: TransportNodeHid
  derivationPathIndexes?: number[]
  changeIndexes?: number[]
  baseDerivationPath?: string
  ledgerAddressValidation?: AddressValidation
}) {
  const ledger = await generateLedger(transport)
  const accounts: LedgerAccount[] = []
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
        await ledgerToAccount({
          ledger,
          derivationPathIndex: addressIndex,
          baseDerivationPath: `${purpose}/${coinType}/${accountIndex}/${changeIndex}`,
          ledgerAddressValidation,
        })
      )
    }
  }
  return accounts
}

export const ADDRESS_QTY = 1

function validateIndexes(indexes: number[], label: string = 'address index') {
  if (indexes.length === 0) {
    throw new Error(`ledger-wallet: No ${label} provided`)
  }

  const invalidDPs = indexes.some((value) => !(Number.isInteger(value) && value >= 0))
  if (invalidDPs) {
    throw new Error(`ledger-wallet: Invalid ${label} provided`)
  }
}
