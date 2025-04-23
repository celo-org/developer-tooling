import { trimLeading0x } from '@celo/base'
import { ensureLeading0x } from '@celo/base/lib/address.js'
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import {
  getTypesForEIP712Domain,
  hashDomain,
  hashStruct,
  HashTypedDataParameters,
  serializeSignature,
} from 'viem'
import { toAccount } from 'viem/accounts'
import { CeloTransactionSerializable, serializeTransaction } from 'viem/celo'

import Eth from '@celo/hw-app-eth'
import { CIP64_PREFIX, DEFAULT_DERIVATION_PATH } from './constants.js'
import { AddressValidation, LedgerAccount } from './types.js'
import { checkForKnownToken, generateLedger, readAppName } from './utils.js'

// not exported from viem...
interface MessageTypeProperty {
  name: string
  type: string
}

interface BaseParameters {
  derivationPathIndex?: number
  baseDerivationPath?: string
  ledgerAddressValidation?: AddressValidation
}
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U

type Parameters = BaseParameters & XOR<{ transport: TransportNodeHid }, { ledger: Eth }>

/**
 * A function to create a ledger account for viem
 * @param options
 * @param options.transport a Ledger Transport
 * @param options.ledger a Ledger Eth instance
 * @param options.derivationPathIndex aka addressIndex
 * @param options.baseDerivationPath defaults to "m/44'/60'/0"
 *
 * @returns a viem LocalAccount<"ledger">
 */
export async function ledgerToAccount({
  derivationPathIndex = 0,
  baseDerivationPath = DEFAULT_DERIVATION_PATH,
  ledgerAddressValidation = AddressValidation.never,
  ledger,
  transport,
}: Parameters): Promise<LedgerAccount> {
  if (!ledger && !transport) {
    throw new Error('either `transport` or `ledger` must be defined')
  }
  if (ledger && transport) {
    throw new Error('only one of `transport` and `ledger` must be defined')
  }

  const _ledger = ledger || (await generateLedger(transport))

  const derivationPath = `${baseDerivationPath}/${derivationPathIndex}`
  console.log(_ledger, _ledger.getAddress)
  const { address, publicKey } = await _ledger.getAddress(
    derivationPath,
    ledgerAddressValidation !== AddressValidation.never
  )
  const account = toAccount({
    address: ensureLeading0x(address),

    async signTransaction(transaction: CeloTransactionSerializable) {
      const ledgerAppName = await readAppName(_ledger)
      const hash = serializeTransaction(transaction)
      if (hash.startsWith(CIP64_PREFIX) && ledgerAppName !== 'celo') {
        throw new Error(
          'To submit celo-specific transactions you must use the celo app on your ledger device.'
        )
      }
      if (ledgerAppName === 'celo') {
        await checkForKnownToken(_ledger, {
          to: transaction.to!,
          chainId: transaction.chainId!,
          feeCurrency: transaction.feeCurrency,
        })
      }

      let { r, s, v: _v } = await _ledger.signTransaction(derivationPath, trimLeading0x(hash), null)
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
      const { r, s, v } = await _ledger.signPersonalMessage(
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
      const ledgerAppName = await readAppName(_ledger)
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

      const { r, s, v } = await _ledger.signEIP712HashedMessage(
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
    source: 'ledger',
  }
}
