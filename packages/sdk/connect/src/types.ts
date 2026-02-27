import { StrongAddress } from '@celo/base'
import type { AbiItem } from './abi-types'
export type Address = string

export type Hex = `0x${string}`
export interface CeloParams {
  feeCurrency: StrongAddress
  maxFeeInFeeCurrency?: Hex | string | bigint
}

export type AccessListRaw = [string, string[]][]

/** EIP-2930 access list entry */
export interface AccessListEntry {
  address: string
  storageKeys: string[]
}

/** EIP-2930 access list */
export type AccessList = AccessListEntry[]

export type HexOrMissing = Hex | undefined
export interface FormattedCeloTx {
  chainId: number
  from: HexOrMissing
  to: HexOrMissing
  data: string | undefined
  value: HexOrMissing
  feeCurrency?: HexOrMissing
  gas: HexOrMissing
  gasPrice?: Hex
  maxFeePerGas?: Hex
  maxPriorityFeePerGas?: Hex
  maxFeeInFeeCurrency?: Hex
  nonce: HexOrMissing | number
  accessList?: AccessListRaw
  type: TransactionTypes
}

/** Transaction configuration - replaces web3's TransactionConfig */
export interface CeloTx extends Partial<CeloParams> {
  from?: string
  to?: string
  value?: number | string | bigint
  gas?: number | string | bigint
  gasPrice?: number | string | bigint
  maxFeePerGas?: number | string | bigint
  maxPriorityFeePerGas?: number | string | bigint
  data?: string
  nonce?: number
  chainId?: number
  chain?: string
  hardfork?: string
  common?: Record<string, unknown>
  accessList?: AccessList
  type?: TransactionTypes
}

export type WithSig<T> = T & { v: number; s: string; r: string; yParity: 0 | 1 }
export type CeloTxWithSig = WithSig<CeloTx>
export interface CeloTxObject<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- must remain any for backward compat with generated contract types
  arguments: any[]
  call(tx?: CeloTx): Promise<T>
  send(tx?: CeloTx): Promise<string>
  estimateGas(tx?: CeloTx): Promise<number>
  encodeABI(): string
  _parent: {
    options: { address: string; jsonInterface: AbiItem[] }
    _address: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- must accommodate ContractEvent types from generated contracts
    events: { [key: string]: any }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- contravariant: specific method params must be assignable
    methods: { [key: string]: (...args: any[]) => CeloTxObject<any> }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deploy(params: { data: string; arguments?: any[] }): CeloTxObject<any>
    getPastEvents(event: string, options: PastEventOptions): Promise<EventLog[]>
  }
}

/** Block number can be a number, hex string, or named tag */
export type BlockNumber = string | number

/** Event log entry */
export interface EventLog {
  event: string
  address: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- decoded event values have dynamic types based on ABI
  returnValues: Record<string, any>
  logIndex: number
  transactionIndex: number
  transactionHash: string
  blockHash: string
  blockNumber: number
  raw?: { data: string; topics: string[] }
}

/** Transaction log entry */
export interface Log {
  address: string
  data: string
  topics: string[]
  logIndex: number
  transactionIndex: number
  transactionHash: string
  blockHash: string
  blockNumber: number
  id?: string
}

/**
 * @deprecated PromiEvent is being removed. Use `Promise<string>` (tx hash) instead.
 * This interface will be deleted in a future version.
 */
export interface PromiEvent<T> extends Promise<T> {
  once(type: 'transactionHash', handler: (receipt: string) => void): PromiEvent<T>
  once(type: 'receipt', handler: (receipt: T) => void): PromiEvent<T>
  once(type: 'confirmation', handler: (confNumber: number, receipt: T) => void): PromiEvent<T>
  once(type: 'error', handler: (error: Error) => void): PromiEvent<T>
  on(type: 'transactionHash', handler: (receipt: string) => void): PromiEvent<T>
  on(type: 'receipt', handler: (receipt: T) => void): PromiEvent<T>
  on(type: 'confirmation', handler: (confNumber: number, receipt: T) => void): PromiEvent<T>
  on(type: 'error', handler: (error: Error, receipt?: T) => void): PromiEvent<T>
}

/** Block header */
export interface BlockHeader {
  number: number
  hash: string
  parentHash: string
  nonce: string
  sha3Uncles: string
  logsBloom: string
  transactionsRoot: string
  stateRoot: string
  receiptsRoot: string
  miner: string
  extraData: string
  gasLimit: number
  gasUsed: number
  timestamp: number | string
  baseFeePerGas?: number | string
  size?: number
}

/** Block with transactions */
export interface Block extends BlockHeader {
  transactions: (string | CeloTxPending)[]
  difficulty?: string
  totalDifficulty?: string
  uncles?: string[]
}

/** Sync status */
export type Syncing =
  | false
  | {
      startingBlock: number
      currentBlock: number
      highestBlock: number
      knownStates?: number
      pulledStates?: number
    }

/**
 * @deprecated Contract interface is being removed. Use viem contract instances instead.
 * This interface will be deleted in a future version.
 */
export interface Contract {
  options: {
    address: string
    jsonInterface: AbiItem[]
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- contravariant: specific method params must be assignable
  methods: { [key: string]: (...args: any[]) => CeloTxObject<any> }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deploy(params: { data: string; arguments?: any[] }): CeloTxObject<any>
  getPastEvents(event: string, options: PastEventOptions): Promise<EventLog[]>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- must accommodate ContractEvent types from generated contracts
  events: { [key: string]: any }
  _address: string
}


/** PastEventOptions - retained for backward compatibility */
export interface PastEventOptions {
  filter?: Record<string, unknown>
  fromBlock?: BlockNumber
  toBlock?: BlockNumber
  topics?: string[]
}

export type TransactionTypes = 'ethereum-legacy' | 'eip1559' | 'cip42' | 'cip64' | 'cip66'

interface CommonTXProperties {
  nonce: string
  gas: string
  to: string
  value: string
  input: string
  r: string
  s: string
  v: string
  hash: string
  type: TransactionTypes
}

interface FeeMarketAndAccessListTXProperties extends CommonTXProperties {
  maxFeePerGas: string
  maxPriorityFeePerGas: string
  accessList?: AccessList
}

export interface EIP1559TXProperties extends FeeMarketAndAccessListTXProperties {
  type: 'eip1559'
}

export interface CIP66TXProperties extends FeeMarketAndAccessListTXProperties {
  feeCurrency: string
  maxFeeInFeeCurrency: string
  type: 'cip66'
}

export interface CIP64TXProperties extends FeeMarketAndAccessListTXProperties {
  feeCurrency: string
  type: 'cip64'
}

export interface EthereumLegacyTXProperties extends CommonTXProperties {
  gasPrice: string
  type: 'ethereum-legacy'
}

export interface EncodedTransaction {
  raw: Hex
  tx: EthereumLegacyTXProperties | EIP1559TXProperties | CIP64TXProperties | CIP66TXProperties
}

/** Pending transaction */
export interface CeloTxPending extends Partial<CeloParams> {
  hash: string
  nonce: number
  blockHash: string | null
  blockNumber: number | null
  transactionIndex: number | null
  from: string
  to: string | null
  value: string
  gasPrice?: string
  maxFeePerGas?: string
  maxPriorityFeePerGas?: string
  gas: number
  input: string
  v?: string
  r?: string
  s?: string
}

/** Transaction receipt */
export interface CeloTxReceipt extends Partial<CeloParams> {
  status: boolean
  transactionHash: string
  transactionIndex: number
  blockHash: string
  blockNumber: number
  from: string
  to: string
  contractAddress?: string
  cumulativeGasUsed: number
  gasUsed: number
  effectiveGasPrice?: number
  logs: Log[]
  logsBloom: string
  events?: { [eventName: string]: EventLog }
}

export type Callback<T> = (error: Error | null, result?: T) => void

export interface JsonRpcResponse {
  jsonrpc: string
  id: string | number
  result?: any
  error?: {
    readonly code?: number
    readonly data?: unknown
    readonly message: string
  }
}

export interface JsonRpcPayload {
  jsonrpc: string
  method: string
  params: any[]
  id?: string | number
}

export interface Provider {
  send(
    payload: JsonRpcPayload,
    callback: (error: Error | null, result?: JsonRpcResponse) => void
  ): void
}

export interface Error {
  readonly code?: number
  readonly data?: unknown
  readonly message: string
}

export interface HttpProvider {
  send(
    payload: JsonRpcPayload,
    callback: (error: Error | null, result?: JsonRpcResponse) => void
  ): void
}

export interface RLPEncodedTx {
  transaction: FormattedCeloTx
  rlpEncode: Hex
  type: TransactionTypes
}

// Based on https://eips.ethereum.org/EIPS/eip-1193
export interface Eip1193RequestArguments {
  readonly method: string
  readonly params?: readonly unknown[] | object
}

export interface Eip1193Provider {
  request(args: Eip1193RequestArguments): Promise<unknown>
}
