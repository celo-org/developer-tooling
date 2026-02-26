import { encodeFunctionData } from 'viem'
import type { AbiItem } from './abi-types'
import type { Connection } from './connection'
import { createPromiEvent } from './promi-event'
import type { CeloTx, CeloTxObject } from './types'
import type { ViemContract } from './viem-contract'
import { coerceArgsForAbi } from './viem-abi-coder'

/**
 * Create a CeloTxObject from a viem-native contract + function name + args.
 * This replaces the contract.methods.foo(args) pattern with direct encodeFunctionData.
 */
export function createViemTxObject<O>(
  connection: Connection,
  contract: ViemContract,
  functionName: string,
  args: unknown[]
): CeloTxObject<O> {
  const methodAbi = contract.abi.find(
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

  const txObject: CeloTxObject<O> = {
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
        return result.data as unknown as O
      }
      // Use viem abi coder to decode (reuse existing decoder for backward compat)
      const { viemAbiCoder } = await import('./viem-abi-coder')
      const decoded = viemAbiCoder.decodeParameters(methodAbi.outputs, result.data)
      if (methodAbi.outputs.length === 1) return decoded[0] as O
      const { __length__, ...rest } = decoded
      return rest as O
    },
    send: (txParams?: CeloTx) => {
      return createPromiEvent(
        connection,
        { ...txParams, to: contract.address, data: encodeData() },
        contract.abi
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
      options: { address: contract.address, jsonInterface: contract.abi },
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
