import { CELO_DERIVATION_PATH_BASE, trimLeading0x } from '@celo/base'
import { ensureLeading0x } from '@celo/base/lib/address.js'
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import { hashMessage, serializeSignature } from 'viem'
import { LocalAccount, toAccount } from 'viem/accounts'
import { CeloTransactionSerializable, serializeTransaction } from 'viem/celo'

import { checkForKnownToken, generateLedger } from './utils.js'

type LedgerAccount = LocalAccount<'ledger'>

export const CELO_BASE_DERIVATION_PATH = `${CELO_DERIVATION_PATH_BASE.slice(2)}/0`

export async function ledgerToAccount({
  transport,
  derivationPathIndex = 0,
  baseDerivationPath = CELO_BASE_DERIVATION_PATH,
}: {
  transport: TransportNodeHid.default
  derivationPathIndex?: number | string
  baseDerivationPath?: string
}): Promise<LedgerAccount> {
  const derivationPath = `${baseDerivationPath}/${derivationPathIndex}`
  const ledger = await generateLedger(transport)
  const { address, publicKey } = await ledger.getAddress(derivationPath, true)

  const account = toAccount({
    address: ensureLeading0x(address),

    async signTransaction(transaction: CeloTransactionSerializable) {
      await checkForKnownToken(ledger, {
        to: transaction.to!,
        chainId: transaction.chainId!,
        feeCurrency: transaction.feeCurrency,
      })

      const hash = serializeTransaction(transaction)
      const { r, s, v } = await ledger!.signTransaction(derivationPath, trimLeading0x(hash), null)
      return serializeTransaction(transaction, {
        r: ensureLeading0x(r),
        s: ensureLeading0x(s),
        v: BigInt(ensureLeading0x(v)),
      })
    },

    async signMessage({ message }) {
      const hash = hashMessage(message)
      const { r, s, v } = await ledger!.signPersonalMessage(derivationPath, trimLeading0x(hash))
      return serializeSignature({
        r: ensureLeading0x(r),
        s: ensureLeading0x(s),
        v: BigInt(v),
      })
    },

    async signTypedData(_parameters) {
      throw new Error('Not implemented as of this release.')
    },
  })

  return {
    ...account,
    publicKey: ensureLeading0x(publicKey),
    source: 'ledger',
  }
}
