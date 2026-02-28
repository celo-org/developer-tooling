import { StrongAddress } from '@celo/base'
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

/**
 * Minimal contract shape needed for tx object creation.
 * CeloContract (GetContractReturnType) satisfies this interface.
 * @internal
 */
export interface ContractRef {
  readonly abi: readonly unknown[]
  readonly address: `0x${string}`
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
