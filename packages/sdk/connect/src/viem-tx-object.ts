import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'
import { decodeFunctionResult, encodeFunctionData } from 'viem'
import type { AbiItem } from './abi-types'
import type { Connection } from './connection'
import { getRandomId } from './utils/rpc-caller'
import type { CeloTx, CeloTxObject } from './types'

import { coerceArgsForAbi } from './viem-abi-coder'

/**
 * Minimal contract shape needed for tx object creation.
 * Both ViemContract and CeloContract (GetContractReturnType) satisfy this interface.
 * @internal
 */
export interface ContractRef {
  readonly abi: readonly unknown[]
  readonly address: `0x${string}`
}

/**
 * Internal implementation of createViemTxObject.
 * Accepts a minimal contract reference (abi + address) and string functionName.
 * NOT part of the public API — used by proxyCallGeneric/proxySendGeneric and the
 * overloaded createViemTxObject implementations.
 * @internal
 */
export function createViemTxObjectInternal(
  connection: Connection,
  contract: ContractRef,
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
      const result = await connection.viemClient.call({
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
      return decodeFunctionResult({
        abi: contract.abi as Abi,
        functionName: functionName as ContractFunctionName<Abi>,
        data: result.data,
      })
    },
    send: (txParams?: CeloTx): Promise<string> => {
      return new Promise<string>((resolve, reject) => {
        connection.currentProvider.send(
          {
            id: getRandomId(),
            jsonrpc: '2.0',
            method: 'eth_sendTransaction',
            params: [{ ...txParams, to: contract.address, data: encodeData() }],
          },
          (error, resp) => {
            if (error) reject(error)
            else if (resp?.error) reject(new Error(resp.error.message))
            else if (resp) resolve(resp.result as string)
            else reject(new Error('empty-response'))
          }
        )
      })
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
 * Overload 1 (fully typed): when a contract with a const-typed ABI is provided,
 * the function name and args are constrained at compile time.
 */
export function createViemTxObject<
  TAbi extends Abi,
  TFunctionName extends ContractFunctionName<TAbi>,
>(
  connection: Connection,
  contract: ContractRef & { readonly abi: TAbi },
  functionName: TFunctionName,
  args: ContractFunctionArgs<TAbi, 'nonpayable' | 'payable' | 'view' | 'pure', TFunctionName>
): CeloTxObject<unknown>
/**
 * Overload 2 (untyped fallback): accepts any string function name for backward compatibility.
 * Accepts any ContractRef regardless of ABI type.
 * Used by CLI, ProposalBuilder, and other dynamic callers.
 */
export function createViemTxObject<O>(
  connection: Connection,
  contract: ContractRef,
  functionName: string,
  args: unknown[]
): CeloTxObject<O>
export function createViemTxObject(
  connection: Connection,
  contract: ContractRef,
  functionName: string,
  args: unknown[]
): CeloTxObject<unknown> {
  return createViemTxObjectInternal(connection, contract, functionName, args)
}
