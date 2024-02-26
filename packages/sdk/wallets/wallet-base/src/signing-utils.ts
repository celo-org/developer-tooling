import { ensureLeading0x, normalizeAddressWith0x, trimLeading0x } from '@celo/base/lib/address'
import {
  CeloTx,
  CeloTxWithSig,
  EncodedTransaction,
  Hex,
  RLPEncodedTx,
  TransactionTypes,
  isPresent,
} from '@celo/connect'
import {
  hexToNumber,
  inputCeloTxFormatter,
  parseAccessList,
} from '@celo/connect/lib/utils/formatter'
import { EIP712TypedData, generateTypedDataHash } from '@celo/utils/lib/sign-typed-data-utils'
import { parseSignatureWithoutPrefix } from '@celo/utils/lib/signatureUtils'
import { publicKeyToAddress } from '@celo/utils/src/address'
import * as RLP from '@ethereumjs/rlp'
import * as ethUtil from '@ethereumjs/util'
import { secp256k1 } from '@noble/curves/secp256k1'
import { keccak_256 } from '@noble/hashes/sha3'
import { bytesToHex, hexToBytes } from '@noble/hashes/utils'
import debugFactory from 'debug'
import Web3 from 'web3' // TODO try to do this without web3 direct
import Accounts from 'web3-eth-accounts'

const { ecrecover, fromRpcSig, hashPersonalMessage, toBuffer } = ethUtil
const debug = debugFactory('wallet-base:tx:sign')

// Original code taken from
// https://github.com/ethereum/web3.js/blob/1.x/packages/web3-eth-accounts/src/index.js

// 0x04 prefix indicates that the key is not compressed
// https://tools.ietf.org/html/rfc5480#section-2.2
export const publicKeyPrefix: number = 0x04
export const sixtyFour: number = 64
export const thirtyTwo: number = 32

const Y_PARITY_EIP_2098 = 27

function rlpEncodeHex(value: RLP.Input): Hex {
  return ensureLeading0x(Buffer.from(RLP.encode(value)).toString('hex'))
}

function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined
}

// Simple replay attack protection
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md
export function chainIdTransformationForSigning(chainId: number): number {
  return chainId * 2 + 35
}

export function getHashFromEncoded(rlpEncode: string): Hex {
  const rlpBytes = hexToBytes(trimLeading0x(rlpEncode))
  const hash = Buffer.from(keccak_256(rlpBytes))
  return `0x${hash.toString('hex')}`
}

function trimLeadingZero(hex: string) {
  while (hex && hex.startsWith('0x0')) {
    hex = ensureLeading0x(hex.slice(3))
  }
  return hex
}

function makeEven(hex: string) {
  if (hex.length % 2 === 1) {
    hex = hex.replace('0x', '0x0')
  }
  return hex
}

function signatureFormatter(
  signature: { v: number; r: Buffer; s: Buffer },
  type: TransactionTypes
): {
  v: string
  r: string
  s: string
} {
  let v = signature.v
  if (type !== 'celo-legacy') {
    v = signature.v === Y_PARITY_EIP_2098 ? 0 : 1
  }
  return {
    v: trimLeading0x(stringNumberToHex(v)),
    r: trimLeading0x(makeEven(trimLeadingZero(ensureLeading0x(signature.r.toString('hex'))))),
    s: trimLeading0x(makeEven(trimLeadingZero(ensureLeading0x(signature.s.toString('hex'))))),
  }
}

export function stringNumberOrBNToHex(
  num?: number | string | ReturnType<Web3['utils']['toBN']>
): Hex {
  if (typeof num === 'string' || typeof num === 'number' || num === undefined) {
    return stringNumberToHex(num)
  } else {
    return makeEven(`0x` + num.toString(16)) as Hex
  }
}
function stringNumberToHex(num?: number | string): Hex {
  const auxNumber = Number(num)
  if (num === '0x' || num === undefined || auxNumber === 0) {
    return '0x'
  }
  return makeEven(Web3.utils.numberToHex(num)) as Hex
}
export function rlpEncodedTx(tx: CeloTx): RLPEncodedTx {
  assertSerializableTX(tx)
  const transaction = inputCeloTxFormatter(tx)
  transaction.to = ensureLeading0x((tx.to || '0x').toLowerCase())
  transaction.nonce = Number(((tx.nonce as any) !== '0x' ? tx.nonce : 0) || 0)
  transaction.data = (tx.data || '0x').toLowerCase()
  transaction.value = stringNumberOrBNToHex(tx.value)
  transaction.gas = stringNumberOrBNToHex(tx.gas)
  transaction.chainId = tx.chainId || 1
  // Celo Specific
  transaction.feeCurrency = ensureLeading0x((tx.feeCurrency || '0x').toLowerCase())
  transaction.gatewayFeeRecipient = ensureLeading0x((tx.gatewayFeeRecipient || '0x').toLowerCase())
  transaction.gatewayFee = stringNumberOrBNToHex(tx.gatewayFee)

  // Legacy
  transaction.gasPrice = stringNumberOrBNToHex(tx.gasPrice)
  // EIP1559 / CIP42
  transaction.maxFeePerGas = stringNumberOrBNToHex(tx.maxFeePerGas)
  transaction.maxPriorityFeePerGas = stringNumberOrBNToHex(tx.maxPriorityFeePerGas)

  let rlpEncode: Hex
  if (isCIP64(tx)) {
    // https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0064.md
    // 0x7b || rlp([chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, to, value, data, accessList, feeCurrency, signatureYParity, signatureR, signatureS]).
    rlpEncode = rlpEncodeHex([
      stringNumberToHex(transaction.chainId),
      stringNumberToHex(transaction.nonce),
      transaction.maxPriorityFeePerGas || '0x',
      transaction.maxFeePerGas || '0x',
      transaction.gas || '0x',
      transaction.to || '0x',
      transaction.value || '0x',
      transaction.data || '0x',
      transaction.accessList || [],
      transaction.feeCurrency || '0x',
    ])
    delete transaction.gatewayFee
    delete transaction.gatewayFeeRecipient
    delete transaction.gasPrice
    return { transaction, rlpEncode: concatHex([TxTypeToPrefix.cip64, rlpEncode]), type: 'cip64' }
  } else if (isCIP42(tx)) {
    // There shall be a typed transaction with the code 0x7c that has the following format:
    // 0x7c || rlp([chain_id, nonce, max_priority_fee_per_gas, max_fee_per_gas, gas_limit, feecurrency, gatewayFeeRecipient, gatewayfee, destination, amount, data, access_list, signature_y_parity, signature_r, signature_s]).
    // This will be in addition to the type 0x02 transaction as specified in EIP-1559.
    rlpEncode = rlpEncodeHex([
      stringNumberToHex(transaction.chainId),
      stringNumberToHex(transaction.nonce),
      transaction.maxPriorityFeePerGas || '0x',
      transaction.maxFeePerGas || '0x',
      transaction.gas || '0x',
      transaction.feeCurrency || '0x',
      transaction.gatewayFeeRecipient || '0x',
      transaction.gatewayFee || '0x',
      transaction.to || '0x',
      transaction.value || '0x',
      transaction.data || '0x',
      transaction.accessList || [],
    ])
    delete transaction.gasPrice
    return { transaction, rlpEncode: concatHex([TxTypeToPrefix.cip42, rlpEncode]), type: 'cip42' }
  } else if (isEIP1559(tx)) {
    // https://eips.ethereum.org/EIPS/eip-1559
    // 0x02 || rlp([chain_id, nonce, max_priority_fee_per_gas, max_fee_per_gas, gas_limit, destination, amount, data, access_list, signature_y_parity, signature_r, signature_s]).
    rlpEncode = rlpEncodeHex([
      stringNumberToHex(transaction.chainId),
      stringNumberToHex(transaction.nonce),
      transaction.maxPriorityFeePerGas || '0x',
      transaction.maxFeePerGas || '0x',
      transaction.gas || '0x',
      transaction.to || '0x',
      transaction.value || '0x',
      transaction.data || '0x',
      transaction.accessList || [],
    ])
    delete transaction.feeCurrency
    delete transaction.gatewayFee
    delete transaction.gatewayFeeRecipient
    delete transaction.gasPrice
    return {
      transaction,
      rlpEncode: concatHex([TxTypeToPrefix.eip1559, rlpEncode]),
      type: 'eip1559',
    }
  } else {
    // This order should match the order in Geth.
    // https://github.com/celo-org/celo-blockchain/blob/027dba2e4584936cc5a8e8993e4e27d28d5247b8/core/types/transaction.go#L65
    rlpEncode = rlpEncodeHex([
      stringNumberToHex(transaction.nonce),
      transaction.gasPrice,
      transaction.gas,
      transaction.feeCurrency,
      transaction.gatewayFeeRecipient,
      transaction.gatewayFee,
      transaction.to,
      transaction.value,
      transaction.data,
      stringNumberToHex(transaction.chainId),
      '0x',
      '0x',
    ])
    return { transaction, rlpEncode, type: 'celo-legacy' }
  }
}

enum TxTypeToPrefix {
  'celo-legacy' = '',
  cip42 = '0x7c',
  cip64 = '0x7b',
  eip1559 = '0x02',
}

function concatTypePrefixHex(
  rawTransaction: string,
  txType: EncodedTransaction['tx']['type']
): Hex {
  const prefix = TxTypeToPrefix[txType]
  if (prefix) {
    return concatHex([prefix, rawTransaction])
  }
  return rawTransaction as Hex
}

function assertSerializableTX(tx: CeloTx) {
  if (!tx.gas) {
    throw new Error('"gas" is missing')
  }

  // ensure at least gasPrice or maxFeePerGas and maxPriorityFeePerGas are set
  if (
    !isPresent(tx.gasPrice) &&
    (!isPresent(tx.maxFeePerGas) || !isPresent(tx.maxPriorityFeePerGas))
  ) {
    throw new Error('"gasPrice" or "maxFeePerGas" and "maxPriorityFeePerGas" are missing')
  }

  // ensure that gasPrice and maxFeePerGas are not set at the same time
  if (
    isPresent(tx.gasPrice) &&
    (isPresent(tx.maxFeePerGas) || isPresent(tx.maxPriorityFeePerGas))
  ) {
    throw new Error(
      'when "maxFeePerGas" or "maxPriorityFeePerGas" are set, "gasPrice" must not be set'
    )
  }

  if (isNullOrUndefined(tx.nonce) || isNullOrUndefined(tx.chainId)) {
    throw new Error(
      'One of the values "chainId" or "nonce" couldn\'t be fetched: ' +
        JSON.stringify({ chainId: tx.chainId, nonce: tx.nonce })
    )
  }

  if (isLessThanZero(tx.nonce) || isLessThanZero(tx.gas) || isLessThanZero(tx.chainId)) {
    throw new Error('Gas, nonce or chainId is less than than 0')
  }
  isPriceToLow(tx)
}

export function isPriceToLow(tx: CeloTx) {
  const prices = [tx.gasPrice, tx.maxFeePerGas, tx.maxPriorityFeePerGas].filter(
    (price) => price !== undefined
  )
  const isLow = false
  for (const price of prices) {
    if (isLessThanZero(price)) {
      throw new Error('GasPrice or maxFeePerGas or maxPriorityFeePerGas is less than than 0')
    }
  }

  return isLow
}

function isEIP1559(tx: CeloTx): boolean {
  return isPresent(tx.maxFeePerGas) && isPresent(tx.maxPriorityFeePerGas)
}

function isCIP64(tx: CeloTx) {
  return (
    isEIP1559(tx) &&
    isPresent(tx.feeCurrency) &&
    !isPresent(tx.gatewayFeeRecipient) &&
    !isPresent(tx.gatewayFeeRecipient)
  )
}

function isCIP42(tx: CeloTx): boolean {
  return (
    isEIP1559(tx) &&
    (isPresent(tx.feeCurrency) || isPresent(tx.gatewayFeeRecipient) || isPresent(tx.gatewayFee))
  )
}

function concatHex(values: string[]): Hex {
  return `0x${values.reduce((acc, x) => acc + x.replace('0x', ''), '')}`
}

function isLessThanZero(value: CeloTx['gasPrice']) {
  if (isNullOrUndefined(value)) {
    return true
  }
  switch (typeof value) {
    case 'string':
    case 'number':
      return Number(value) < 0
    default:
      return value?.lt(Web3.utils.toBN(0)) || false
  }
}

export async function encodeTransaction(
  rlpEncoded: RLPEncodedTx,
  signature: { v: number; r: Buffer; s: Buffer }
): Promise<EncodedTransaction> {
  const sanitizedSignature = signatureFormatter(signature, rlpEncoded.type)
  const { v, r, s } = sanitizedSignature
  const decodedTX = prefixAwareRLPDecode(rlpEncoded.rlpEncode, rlpEncoded.type) as Uint8Array[]
  // for legacy tx we need to slice but for new ones we do not want to do that
  const rawTx = (rlpEncoded.type === 'celo-legacy' ? decodedTX.slice(0, 9) : decodedTX).concat([
    hexToBytes(v),
    hexToBytes(r),
    hexToBytes(s),
  ])

  // After signing, the transaction is encoded again and type prefix added
  const rawTransaction = concatTypePrefixHex(rlpEncodeHex(rawTx), rlpEncoded.type)
  const hash = getHashFromEncoded(rawTransaction)

  const baseTX = {
    nonce: rlpEncoded.transaction.nonce!.toString(),
    gas: rlpEncoded.transaction.gas!.toString(),
    to: rlpEncoded.transaction.to!.toString(),
    value: rlpEncoded.transaction.value!.toString(),
    input: rlpEncoded.transaction.data!,
    v: ensureLeading0x(v),
    r: ensureLeading0x(r),
    s: ensureLeading0x(s),
    hash,
  }
  let tx: Partial<EncodedTransaction['tx']> = baseTX
  if (rlpEncoded.type === 'eip1559' || rlpEncoded.type === 'cip42') {
    tx = {
      ...tx,
      // @ts-expect-error -- just a matter of how  this tx is built
      maxFeePerGas: rlpEncoded.transaction.maxFeePerGas!.toString(),
      maxPriorityFeePerGas: rlpEncoded.transaction.maxPriorityFeePerGas!.toString(),
      accessList: parseAccessList(rlpEncoded.transaction.accessList || []),
    }
  }
  if (rlpEncoded.type === 'cip42' || rlpEncoded.type === 'celo-legacy') {
    tx = {
      ...tx,
      // @ts-expect-error -- just a matter of how  this tx is built
      feeCurrency: rlpEncoded.transaction.feeCurrency!.toString(),
      gatewayFeeRecipient: rlpEncoded.transaction.gatewayFeeRecipient!.toString(),
      gatewayFee: rlpEncoded.transaction.gatewayFee!.toString(),
    }
  }
  if (rlpEncoded.type === 'celo-legacy') {
    tx = {
      ...tx,
      // @ts-expect-error -- just a matter of how this tx is built
      gasPrice: rlpEncoded.transaction.gasPrice!.toString(),
    }
  }

  const result: EncodedTransaction & { type: TransactionTypes } = {
    tx: tx as EncodedTransaction['tx'],
    raw: rawTransaction,
    type: rlpEncoded.type,
  }
  return result
}
// new types have prefix but legacy does not
function prefixAwareRLPDecode(rlpEncode: string, type: TransactionTypes) {
  return type === 'celo-legacy' ? RLP.decode(rlpEncode) : RLP.decode(`0x${rlpEncode.slice(4)}`)
}

function correctLengthOf(type: TransactionTypes, includeSig: boolean = true) {
  switch (type) {
    case 'cip64': {
      return includeSig ? 13 : 10
    }
    case 'cip42':
      return includeSig ? 15 : 12
    case 'celo-legacy':
    case 'eip1559':
      return 12
  }
}
// Based on the return type of ensureLeading0x this was not a Buffer
export function extractSignature(rawTx: string) {
  const type = determineTXType(rawTx)
  const rawValues = prefixAwareRLPDecode(rawTx, type)
  const length = rawValues.length
  if (correctLengthOf(type) !== length) {
    throw new Error(
      `@extractSignature: provided transaction has ${length} elements but ${type} txs with a signature have ${correctLengthOf(
        type
      )} ${JSON.stringify(rawValues)}`
    )
  }
  return extractSignatureFromDecoded(rawValues as Uint8Array[])
}

function extractSignatureFromDecoded(rawValues: Uint8Array[]) {
  // signature is always (for the tx we support so far) the last three elements of the array in order v, r, s,
  const v = rawValues.at(-3)
  let r = rawValues.at(-2)
  let s = rawValues.at(-1)
  // https://github.com/wagmi-dev/viem/blob/993321689b3e2220976504e7e170fe47731297ce/src/utils/transaction/parseTransaction.ts#L281
  // Account.recover cannot handle canonicalized signatures
  // A canonicalized signature may have the first byte removed if its value is 0
  return {
    v: handleHexString(v!),
    r: ensureLeading0x(bytesToHex(r!).padStart(64, '0')),
    s: ensureLeading0x(bytesToHex(s!).padStart(64, '0')),
  }
}

// Recover transaction and sender address from a raw transaction.
// This is used for testing.
export function recoverTransaction(rawTx: string): [CeloTx, string] {
  if (!rawTx.startsWith('0x')) {
    throw new Error('rawTx must start with 0x')
  }

  switch (determineTXType(rawTx)) {
    case 'cip64':
      return recoverTransactionCIP64(rawTx as Hex)
    case 'cip42':
      return recoverTransactionCIP42(rawTx as Hex)
    case 'eip1559':
      return recoverTransactionEIP1559(rawTx as Hex)
    default:
      const rawValues = RLP.decode(rawTx) as Uint8Array[]
      debug('signing-utils@recoverTransaction: values are %s', rawValues)
      const recovery = handleNumber(rawValues[9])
      // eslint-disable-next-line no-bitwise
      const chainId = (recovery - 35) >> 1
      const celoTx: CeloTx = {
        type: 'celo-legacy',
        nonce: handleNumber(rawValues[0]),
        // NOTE: I used `handleNumber` to make it match the snapshot but we may
        // lose accuracy, should use `handleHexString`
        gasPrice: handleNumber(rawValues[1]),
        // NOTE: I used `handleNumber` to make it match the snapshot but we may
        // lose accuracy, should use `handleHexString`
        gas: handleNumber(rawValues[2]),
        feeCurrency: handleHexString(rawValues[3]),
        gatewayFeeRecipient: handleHexString(rawValues[4]),
        gatewayFee: handleHexString(rawValues[5]),
        to: handleHexString(rawValues[6]),
        value: handleHexString(rawValues[7]),
        data: handleData(rawValues[8]),
        // NOTE: I stringified to make it match the snapshot but it doesn't
        // match the signature of TransactionConfig which expects a number
        // @ts-expect-error
        chainId: ensureLeading0x(chainId.toString(16)),
      }
      const { r, v: _v, s } = extractSignatureFromDecoded(rawValues)
      let v = parseInt(_v || '0x0', 16)
      const signature = new secp256k1.Signature(BigInt(r), BigInt(s)).addRecoveryBit(
        v - chainIdTransformationForSigning(chainId)
      )
      const safeChainId = trimLeading0x(
        makeEven(trimLeadingZero(ensureLeading0x(chainId.toString(16))))
      )
      const extraData =
        recovery < 35 ? [] : [hexToBytes(safeChainId), hexToBytes(''), hexToBytes('')]
      const signingData = rawValues.slice(0, 9).concat(extraData)
      const signingDataHex = rlpEncodeHex(signingData)
      const signingDataHash = getHashFromEncoded(signingDataHex)
      const publicKey = signature.recoverPublicKey(trimLeading0x(signingDataHash)).toHex(false)
      return [celoTx, publicKeyToAddress(publicKey)]
  }
}

// inspired by @ethereumjs/tx
function getPublicKeyofSignerFromTx(transactionArray: Uint8Array[], type: TransactionTypes) {
  // this needs to be 10 for cip64, 12 for cip42 and eip1559
  const base = transactionArray.slice(0, correctLengthOf(type, false))
  const message = concatHex([TxTypeToPrefix[type], rlpEncodeHex(base).slice(2)])
  const msgHash = keccak_256(hexToBytes(trimLeading0x(message)))

  const { v, r, s } = extractSignatureFromDecoded(transactionArray)
  try {
    return ecrecover(
      Buffer.from(msgHash),
      v === '0x' || v === undefined ? BigInt(0) : BigInt(1),
      toBuffer(r),
      toBuffer(s)
    )
  } catch (e: any) {
    throw new Error(e)
  }
}

export function getSignerFromTxEIP2718TX(serializedTransaction: string): string {
  const transactionArray = RLP.decode(`0x${serializedTransaction.slice(4)}`)
  const signer = getPublicKeyofSignerFromTx(
    transactionArray as Uint8Array[],
    determineTXType(serializedTransaction)
  )

  return publicKeyToAddress(signer.toString('hex'))
}

function determineTXType(serializedTransaction: string): TransactionTypes {
  const prefix = serializedTransaction.slice(0, 4)

  if (prefix === TxTypeToPrefix.eip1559) {
    return 'eip1559'
  } else if (prefix === TxTypeToPrefix.cip42) {
    return 'cip42'
  } else if (prefix === TxTypeToPrefix.cip64) {
    return 'cip64'
  }
  return 'celo-legacy'
}

function vrsForRecovery(vRaw: string, r: string, s: string) {
  const v = vRaw === '0x' || hexToNumber(vRaw) === 0 ? Y_PARITY_EIP_2098 : Y_PARITY_EIP_2098 + 1
  return {
    v,
    r,
    s,
    yParity: v === Y_PARITY_EIP_2098 ? 0 : 1,
  } as const
}

function recoverTransactionCIP42(serializedTransaction: Hex): [CeloTxWithSig, string] {
  const transactionArray = prefixAwareRLPDecode(serializedTransaction, 'cip42')
  debug('signing-utils@recoverTransactionCIP42: values are %s', transactionArray)
  if (transactionArray.length !== 15 && transactionArray.length !== 12) {
    throw new Error(
      `Invalid transaction length for type CIP42: ${transactionArray.length} instead of 15 or 12. array: ${transactionArray}`
    )
  }
  const [
    chainId,
    nonce,
    maxPriorityFeePerGas,
    maxFeePerGas,
    gas,
    feeCurrency,
    gatewayFeeRecipient,
    gatewayFee,
    to,
    value,
    data,
    accessList,
    vRaw,
    r,
    s,
  ] = transactionArray as Uint8Array[]

  const celoTX: CeloTxWithSig = {
    type: 'cip42',
    nonce: handleNumber(nonce),
    maxPriorityFeePerGas: handleNumber(maxPriorityFeePerGas),
    maxFeePerGas: handleNumber(maxFeePerGas),
    gas: handleNumber(gas),
    feeCurrency: handleHexString(feeCurrency),
    gatewayFeeRecipient: handleHexString(gatewayFeeRecipient),
    gatewayFee: handleHexString(gatewayFee),
    to: handleHexString(to),
    value: handleNumber(value),
    data: handleData(data),
    chainId: handleNumber(chainId),
    accessList: parseAccessList(accessList as unknown as [string, string[]][]),
    ...vrsForRecovery(handleHexString(vRaw), handleHexString(r), handleHexString(s)),
  }

  const signer =
    transactionArray.length === 15 ? getSignerFromTxEIP2718TX(serializedTransaction) : 'unsigned'
  return [celoTX, signer]
}

function recoverTransactionCIP64(serializedTransaction: Hex): [CeloTxWithSig, string] {
  const transactionArray = prefixAwareRLPDecode(serializedTransaction, 'cip64')
  debug('signing-utils@recoverTransactionCIP64: values are %s', transactionArray)
  if (transactionArray.length !== 13 && transactionArray.length !== 10) {
    throw new Error(
      `Invalid transaction length for type CIP64: ${transactionArray.length} instead of 13 or 10. array: ${transactionArray}`
    )
  }
  const [
    chainId,
    nonce,
    maxPriorityFeePerGas,
    maxFeePerGas,
    gas,
    to,
    value,
    data,
    accessList,
    feeCurrency,
    vRaw,
    r,
    s,
  ] = transactionArray as Uint8Array[]

  const celoTX: CeloTxWithSig = {
    type: 'cip64',
    nonce: handleNumber(nonce),
    maxPriorityFeePerGas: handleNumber(maxPriorityFeePerGas),
    maxFeePerGas: handleNumber(maxFeePerGas),
    gas: handleNumber(gas),
    feeCurrency: handleHexString(feeCurrency),
    to: handleHexString(to),
    value: handleNumber(value),
    data: handleData(data),
    chainId: handleNumber(chainId),
    accessList: parseAccessList(accessList as unknown as [string, string[]][]),
    ...vrsForRecovery(handleHexString(vRaw), handleHexString(r), handleHexString(s)),
  }

  const signer =
    transactionArray.length === 13 ? getSignerFromTxEIP2718TX(serializedTransaction) : 'unsigned'
  return [celoTX, signer]
}

function recoverTransactionEIP1559(serializedTransaction: Hex): [CeloTxWithSig, string] {
  const transactionArray = prefixAwareRLPDecode(serializedTransaction, 'eip1559')
  debug('signing-utils@recoverTransactionEIP1559: values are %s', transactionArray)

  const [
    chainId,
    nonce,
    maxPriorityFeePerGas,
    maxFeePerGas,
    gas,
    to,
    value,
    data,
    accessList,
    vRaw,
    r,
    s,
  ] = transactionArray as Uint8Array[]

  const celoTx: CeloTxWithSig = {
    type: 'eip1559',
    nonce: handleNumber(nonce),
    gas: handleNumber(gas),
    maxPriorityFeePerGas: handleNumber(maxPriorityFeePerGas),
    maxFeePerGas: handleNumber(maxFeePerGas),
    to: handleHexString(to),
    value: handleNumber(value),
    data: handleData(data),
    chainId: handleNumber(chainId),
    accessList: parseAccessList(accessList as unknown as [string, string[]][]),
    ...vrsForRecovery(handleHexString(vRaw), handleHexString(r), handleHexString(s)),
  }
  const web3Account = new Accounts()
  const signer = web3Account.recoverTransaction(serializedTransaction)

  return [celoTx, signer]
}

export function recoverMessageSigner(signingDataHex: string, signedData: string): string {
  const dataBuff = toBuffer(signingDataHex)
  const msgHashBuff = hashPersonalMessage(dataBuff)
  const signature = fromRpcSig(signedData)

  const publicKey = ecrecover(msgHashBuff, signature.v, signature.r, signature.s)
  const address = publicKeyToAddress(publicKey.toString('hex'))
  return ensureLeading0x(address)
}

export function verifyEIP712TypedDataSigner(
  typedData: EIP712TypedData,
  signedData: string,
  expectedAddress: string
): boolean {
  const dataHex = ethUtil.bufferToHex(generateTypedDataHash(typedData))
  return verifySignatureWithoutPrefix(dataHex, signedData, expectedAddress)
}

export function verifySignatureWithoutPrefix(
  messageHash: string,
  signature: string,
  signer: string
) {
  try {
    parseSignatureWithoutPrefix(messageHash, signature, signer)
    return true
  } catch (error) {
    return false
  }
}

export function decodeSig(sig: Hex | ReturnType<typeof secp256k1.sign>, addToV = 0) {
  const { recovery, r, s } = typeof sig === 'string' ? secp256k1.Signature.fromCompact(sig) : sig

  return {
    v: recovery! + addToV,
    r: Buffer.from(r.toString(16).padStart(64, '0'), 'hex'),
    s: Buffer.from(s.toString(16).padStart(64, '0'), 'hex'),
  }
}

export function signTransaction(hash: Hex, privateKey: Hex, addToV = 0) {
  const signature = secp256k1.sign(
    trimLeading0x(hash),
    hexToBytes(trimLeading0x(privateKey)),
    { lowS: true } // canonical:true
  )
  return decodeSig(signature, addToV)
}

function handleNumber(n: Uint8Array) {
  const hex = `0x${bytesToHex(n)}`
  if (hex === '0x') return 0
  return parseInt(hex, 16)
}

// function handleBigNumber(n: Uint8Array) {
//   const hex = `0x${bytesToHex(n)}`
//   if (hex === '0x') return '0'
//   return BigInt(hex)
// }

function handleHexString(adr: Uint8Array) {
  if (!adr.length) {
    return '0x'
  }
  const hex = `0x${bytesToHex(adr)}`
  return normalizeAddressWith0x(hex)
}

function handleData(data: Uint8Array) {
  if (!data.length) {
    return '0x'
  }
  const hex = `0x${bytesToHex(data)}`
  return hex // unsure
}
