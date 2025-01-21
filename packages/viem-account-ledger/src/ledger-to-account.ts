import { CELO_DERIVATION_PATH_BASE, trimLeading0x } from '@celo/base'
import { ensureLeading0x } from '@celo/base/lib/address.js'
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import {
  getTypesForEIP712Domain,
  hashDomain,
  hashStruct,
  HashTypedDataParameters,
  serializeSignature,
} from 'viem'
import { LocalAccount, toAccount } from 'viem/accounts'
import { CeloTransactionSerializable, serializeTransaction } from 'viem/celo'

import { checkForKnownToken, generateLedger, readAppName } from './utils.js'

export interface LedgerAccount extends LocalAccount<'ledger'> {
  ledgerAppName: string
}

const CIP64_PREFIX = '0x7b'
export const ETH_DERIVATION_PATH_BASE = "m/44'/60'/0'" as const
export const CELO_BASE_DERIVATION_PATH = `${CELO_DERIVATION_PATH_BASE.slice(2)}/0`
export const DEFAULT_DERIVATION_PATH = `${ETH_DERIVATION_PATH_BASE.slice(2)}/0`

// not exported from viem...
interface MessageTypeProperty {
  name: string
  type: string
}

/**
 * A function to create a ledger account for viem
 * @param options
 * @param options.transport a Ledger Transport
 * @param options.derivationPathIndex aka addressIndex
 * @param options.baseDerivationPath defaults to "m/44'/60'/0"
 *
 * @returns a viem LocalAccount<"ledger">
 */
export async function ledgerToAccount({
  transport,
  derivationPathIndex = 0,
  baseDerivationPath = DEFAULT_DERIVATION_PATH,
}: {
  transport: TransportNodeHid
  derivationPathIndex?: number | string
  baseDerivationPath?: string
}): Promise<LedgerAccount> {
  const derivationPath = `${baseDerivationPath}/${derivationPathIndex}`
  const ledger = await generateLedger(transport)
  const { address, publicKey } = await ledger.getAddress(derivationPath, true)
  const ledgerAppName = await readAppName(ledger)

  const account = toAccount({
    address: ensureLeading0x(address),

    async signTransaction(transaction: CeloTransactionSerializable) {
      const hash = serializeTransaction(transaction)
      if (hash.startsWith(CIP64_PREFIX) && ledgerAppName !== 'celo') {
        throw new Error(
          'To submit celo-specific transactions you must use the celo app on your ledger device.'
        )
      }
      if (ledgerAppName === 'celo') {
        await checkForKnownToken(ledger, {
          to: transaction.to!,
          chainId: transaction.chainId!,
          feeCurrency: transaction.feeCurrency,
        })
      }

      let { r, s, v: _v } = await ledger!.signTransaction(derivationPath, trimLeading0x(hash), null)
      if (typeof _v === 'string' && (_v === '' || _v === '0x')) {
        _v = '0x0'
      }
      let v: bigint
      try {
        v = BigInt(typeof _v === 'string' ? ensureLeading0x(_v) : _v)
      } catch (err) {
        throw new Error(
          `Ledger signature \`v\` was malformed and couldn't be parsed \`${_v}\` (Original error: ${err})`
        )
      }
      return serializeTransaction(transaction, {
        r: ensureLeading0x(r),
        s: ensureLeading0x(s),
        v,
      })
    },

    async signMessage({ message }) {
      const { r, s, v } = await ledger!.signPersonalMessage(
        derivationPath,
        Buffer.from(message as string).toString('hex')
      )
      return serializeSignature({
        r: ensureLeading0x(r),
        s: ensureLeading0x(s),
        v: BigInt(v),
      })
    },

    async signTypedData(parameters) {
      if (ledgerAppName === 'celo') {
        throw new Error('Not implemented as of this release.')
      }

      const { domain = {}, message, primaryType } = parameters as HashTypedDataParameters
      const types = {
        EIP712Domain: getTypesForEIP712Domain({ domain }),
        ...parameters.types,
      }

      const domainSeperator = hashDomain({
        domain,
        types: types as Record<string, MessageTypeProperty[]>,
      })
      const messageHash = hashStruct({
        data: message,
        primaryType,
        types: types as Record<string, MessageTypeProperty[]>,
      })

      const { r, s, v } = await ledger.signEIP712HashedMessage(
        derivationPath,
        domainSeperator,
        messageHash
      )

      return serializeSignature({
        r: ensureLeading0x(r),
        s: ensureLeading0x(s),
        v: BigInt(v),
      })
    },
  })

  return {
    ...account,
    publicKey: ensureLeading0x(publicKey),
    ledgerAppName,
    source: 'ledger',
  }
}
