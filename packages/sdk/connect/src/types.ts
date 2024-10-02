import { StrongAddress } from '@celo/base'
import Web3 from 'web3'
import {
  AccessList,
  PromiEvent,
  Transaction,
  TransactionConfig,
  TransactionReceipt,
} from 'web3-core'
import { Contract } from 'web3-eth-contract'
export type Address = string

export type Hex = `0x${string}`
export interface CeloParams {
  feeCurrency: StrongAddress
  maxFeeInFeeCurrency?: Hex | string | bigint | ReturnType<Web3['utils']['toBN']>
}

export type AccessListRaw = [string, string[]][]

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

export type CeloTx = TransactionConfig &
  Partial<CeloParams> & { accessList?: AccessList; type?: TransactionTypes }
export type WithSig<T> = T & { v: number; s: string; r: string; yParity: 0 | 1 }
export type CeloTxWithSig = WithSig<CeloTx>
export interface CeloTxObject<T> {
  arguments: any[]
  call(tx?: CeloTx): Promise<T>
  send(tx?: CeloTx): PromiEvent<CeloTxReceipt>
  estimateGas(tx?: CeloTx): Promise<number>
  encodeABI(): string
  _parent: Contract
}

export { BlockNumber, EventLog, Log, PromiEvent, Sign } from 'web3-core'
export { Block, BlockHeader, Syncing } from 'web3-eth'
export { Contract, ContractSendMethod, PastEventOptions } from 'web3-eth-contract'

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

export type CeloTxPending = Transaction & Partial<CeloParams>
export type CeloTxReceipt = TransactionReceipt & Partial<CeloParams>

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
