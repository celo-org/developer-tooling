import { CELO_DERIVATION_PATH_BASE, trimLeading0x } from '@celo/base'
import { ensureLeading0x } from '@celo/utils/lib/address'
import Eth from '@ledgerhq/hw-app-eth'
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import { hashMessage, hashTypedData, serializeSignature } from 'viem'
import { LocalAccount, toAccount } from 'viem/accounts'
import { CeloTransactionSerializable, serializeTransaction } from 'viem/celo'
import { assertCompat, checkForKnownToken, formatSignature } from './utils'

type LedgerAccount = LocalAccount<'ledger'>

export const CELO_BASE_DERIVATION_PATH = `${CELO_DERIVATION_PATH_BASE.slice(2)}/0`

export async function generateLedger(transport: TransportNodeHid): Promise<Eth> {
  const ledger = new Eth(transport)
  await assertCompat(ledger)
  return ledger
}

export async function ledgerToAccount({
  transport,
  derivationPathIndex = 0,
  baseDerivationPath = CELO_BASE_DERIVATION_PATH,
}: {
  transport: TransportNodeHid
  derivationPathIndex: number | string
  baseDerivationPath: string
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
      const ledgerSignature = await ledger!.signTransaction(
        derivationPath,
        trimLeading0x(hash),
        null
      )
      const signature = await formatSignature(ledgerSignature, hash, publicKey)
      return serializeTransaction(transaction, signature)
    },

    async signMessage({ message }) {
      const hash = hashMessage(message)
      const ledgerSignature = await ledger!.signPersonalMessage(derivationPath, trimLeading0x(hash))
      const signature = await formatSignature(ledgerSignature, hash, publicKey)
      return serializeSignature(signature)
    },

    async signTypedData(parameters) {
      const hash = hashTypedData(parameters)
      const ledgerSignature = await ledger!.signPersonalMessage(derivationPath, trimLeading0x(hash))
      const signature = await formatSignature(ledgerSignature, hash, publicKey)
      return serializeSignature(signature)
    },
  })

  return {
    ...account,
    publicKey: ensureLeading0x(publicKey),
    source: 'ledger',
  }
}
