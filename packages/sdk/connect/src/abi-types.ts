/** @internal */
export type ABIType = 'uint256' | 'boolean' | 'string' | 'bytes' | string // TODO complete list

/** @internal */
export interface DecodedParamsArray {
  [index: number]: unknown
  __length__: number
}

/** @internal */
export interface DecodedParamsObject extends DecodedParamsArray {
  [key: string]: unknown
}

// Note the following types come from web3-utils: AbiInput, AbiOutput, AbiItem, AbiType StateMutabilityType, ABIDefinition
type AbiType = 'function' | 'constructor' | 'event' | 'fallback'
type StateMutabilityType = 'pure' | 'view' | 'nonpayable' | 'payable'

/** @internal */
export interface AbiInput {
  name: string
  type: string
  indexed?: boolean
  components?: AbiInput[]
  internalType?: string
}

/** @internal */
export interface AbiOutput {
  name: string
  type: string
  components?: AbiOutput[]
  internalType?: string
}
/** @internal */
export interface AbiItem {
  anonymous?: boolean
  constant?: boolean
  inputs?: AbiInput[]
  name?: string
  outputs?: AbiOutput[]
  payable?: boolean
  stateMutability?: StateMutabilityType
  type: AbiType
  gas?: number
}
/** @internal */
export interface ABIDefinition extends AbiItem {
  signature: string
}
