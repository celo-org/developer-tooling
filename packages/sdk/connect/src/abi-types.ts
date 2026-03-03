import type { AbiParameter } from 'viem'

/** @internal - Matches viem's AbiParameter, extended with indexed for event inputs */
export type AbiInput = AbiParameter & { indexed?: boolean }
/** @internal - Matches viem's AbiParameter */
export type AbiOutput = AbiParameter

type AbiType = 'function' | 'constructor' | 'event' | 'fallback'
type StateMutabilityType = 'pure' | 'view' | 'nonpayable' | 'payable'

/** @internal */
export interface AbiItem {
  anonymous?: boolean
  constant?: boolean
  inputs?: readonly AbiInput[]
  name?: string
  outputs?: readonly AbiOutput[]
  payable?: boolean
  stateMutability?: StateMutabilityType
  type: AbiType
  gas?: number
}

/** @internal */
export interface ABIDefinition extends AbiItem {
  signature: string
}

/** @internal */
export type ABIType = string

/** @internal */
export interface DecodedParamsArray {
  [index: number]: unknown
  __length__: number
}

/** @internal */
export interface DecodedParamsObject extends DecodedParamsArray {
  [key: string]: unknown
}
