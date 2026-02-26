import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'
import { encodeFunctionData } from 'viem'
import type { AbiItem } from './abi-types'
import type { Connection } from './connection'
import { createPromiEvent } from './promi-event'
import type { CeloTx, CeloTxObject } from './types'
import type { ViemContract } from './viem-contract'
import { coerceArgsForAbi } from './viem-abi-coder'

/**
 * Internal implementation of createViemTxObject.
 * Accepts the widest contract type (`ViemContract<readonly unknown[]>`) and string functionName.
 * NOT part of the public API — used by proxyCallGeneric/proxySendGeneric and the
 * overloaded createViemTxObject implementations.
 * @internal
 */
export function createViemTxObjectInternal(
  connection: Connection,
  contract: ViemContract<readonly unknown[]>,
  functionName: string,
  args: unknown[]
): CeloTxObject<unknown> {
  const contractAbi = contract.abi as AbiItem[]
  const methodAbi = contractAbi.find(
    (item: AbiItem) => item.type === 'function' && item.name === functionName
  )
  if (!methodAbi) {
    throw new Error(`Method ${functionName} not found in ABI`)
  }

  // Coerce args to match viem's strict type expectations
  const coercedArgs = methodAbi.inputs ? coerceArgsForAbi(methodAbi.inputs, args) : args

  const encodeData = () =>
    encodeFunctionData({
      abi: [methodAbi],
      args: coercedArgs,
    })

  const txObject: CeloTxObject<unknown> = {
    call: async (txParams?: CeloTx) => {
      const result = await contract.client.call({
        to: contract.address as `0x${string}`,
        data: encodeData() as `0x${string}`,
        account: txParams?.from as `0x${string}` | undefined,
      })
      if (
        !result.data ||
        result.data === '0x' ||
        !methodAbi.outputs ||
        methodAbi.outputs.length === 0
      ) {
        return result.data as unknown
      }
      // Use viem abi coder to decode (reuse existing decoder for backward compat)
      const { viemAbiCoder } = await import('./viem-abi-coder')
      const decoded = viemAbiCoder.decodeParameters(methodAbi.outputs, result.data)
      if (methodAbi.outputs.length === 1) return decoded[0] as unknown
      const { __length__, ...rest } = decoded
      return rest as unknown
    },
    send: (txParams?: CeloTx) => {
      return createPromiEvent(
        connection,
        { ...txParams, to: contract.address, data: encodeData() },
        contractAbi
      )
    },
    estimateGas: async (txParams?: CeloTx) => {
      return connection.estimateGas({
        ...txParams,
        to: contract.address,
        data: encodeData(),
      })
    },
    encodeABI: () => encodeData(),
    _parent: {
      options: { address: contract.address, jsonInterface: contractAbi },
      _address: contract.address,
      events: {},
      methods: {} as any,
      deploy: {} as any,
      getPastEvents: {} as any,
    },
    arguments: coercedArgs as any[],
  }

  return txObject
}

/**
 * Create a CeloTxObject from a viem-native contract + function name + args.
 * This replaces the contract.methods.foo(args) pattern with direct encodeFunctionData.
 *
 * Overload 1 (fully typed): when a `ViemContract<TAbi>` with a const-typed ABI is provided,
 * the function name and args are constrained at compile time.
 */
export function createViemTxObject<
  TAbi extends Abi,
  TFunctionName extends ContractFunctionName<TAbi>,
>(
  connection: Connection,
  contract: ViemContract<TAbi>,
  functionName: TFunctionName,
  args: ContractFunctionArgs<TAbi, 'nonpayable' | 'payable' | 'view' | 'pure', TFunctionName>
): CeloTxObject<unknown>
/**
 * Overload 2 (untyped fallback): accepts any string function name for backward compatibility.
 * Accepts any ViemContract regardless of ABI type (mutable or readonly).
 * Used by CLI, ProposalBuilder, and other dynamic callers.
 */
export function createViemTxObject<O>(
  connection: Connection,
  contract: ViemContract<readonly unknown[]>,
  functionName: string,
  args: unknown[]
): CeloTxObject<O>
export function createViemTxObject(
  connection: Connection,
  contract: ViemContract<readonly unknown[]>,
  functionName: string,
  args: unknown[]
): CeloTxObject<unknown> {
  return createViemTxObjectInternal(connection, contract, functionName, args)
}
