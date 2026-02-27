import {
  encodeAbiParameters,
  type AbiParameter,
  encodeFunctionData,
  toEventHash,
  toFunctionHash,
} from 'viem'
import { AbiInput, AbiItem } from './abi-types'
import { coerceArgsForAbi, coerceValueForType, viemAbiCoder } from './viem-abi-coder'
import { createPromiEvent } from './promi-event'
import {
  BlockNumber,
  CeloTx,
  CeloTxObject,
  CeloTxReceipt,
  Contract,
  EventLog,
  Log,
  PastEventOptions,
  PromiEvent,
} from './types'
import { inputBlockNumberFormatter } from './utils/formatter'
import type { Connection } from './connection'

interface GetLogsParams {
  address: string
  topics: (string | null)[]
  fromBlock?: BlockNumber
  toBlock?: BlockNumber
}

/**
 * Creates a Contract constructor class bound to the given connection.
 * @internal
 */
export function createContractConstructor(connection: Connection) {
  const enrichAbiWithSignatures = (abi: readonly AbiItem[] | AbiItem[]): AbiItem[] => {
    return abi.map((item: AbiItem) => {
      if (item.type === 'function' && !('signature' in item)) {
        const sig = `${item.name}(${(item.inputs || []).map((i: AbiInput) => i.type).join(',')})`
        return { ...item, signature: toFunctionHash(sig).slice(0, 10) }
      }
      if (item.type === 'event' && !('signature' in item)) {
        const sig = `${item.name}(${(item.inputs || []).map((i: AbiInput) => i.type).join(',')})`
        return { ...item, signature: toEventHash(sig) }
      }
      return item
    })
  }

  const buildEventsMap = (abi: AbiItem[]): Record<string, AbiItem> => {
    const eventsMap: Record<string, AbiItem> = {}
    for (const item of abi) {
      if (item.type === 'event' && item.name) {
        eventsMap[item.name] = item
      }
    }
    return eventsMap
  }

  return class RpcContract implements Contract {
    options: { address: string; jsonInterface: AbiItem[] }
    _address: string
    events: { [key: string]: AbiItem } = {}

    constructor(abi: readonly AbiItem[] | AbiItem[], address?: string) {
      this._address = address || ''
      const enrichedAbi = enrichAbiWithSignatures(abi)
      this.options = { address: this._address, jsonInterface: enrichedAbi }
      this.events = buildEventsMap(enrichedAbi)
    }

    get methods() {
      const contract = this
      const abi = this.options.jsonInterface
      return new Proxy(
        {},
        {
          get(_target, prop: string) {
            const methodAbi = abi.find(
              (item: AbiItem) => item.type === 'function' && item.name === prop
            )
            if (!methodAbi) {
              return (..._args: unknown[]) => ({
                call: async () => {
                  throw new Error(`Method ${prop} not found in ABI`)
                },
                send: () => {
                  throw new Error(`Method ${prop} not found in ABI`)
                },
                estimateGas: async () => 0,
                encodeABI: () => '0x',
                _parent: contract,
              })
            }
            return (...rawArgs: unknown[]) => {
              // coerceArgs bridges web3→viem type strictness: viem's encodeFunctionData
              // rejects types web3 accepted (e.g. number for bool, short hex for bytesN)
              const args = methodAbi.inputs ? coerceArgsForAbi(methodAbi.inputs, rawArgs) : rawArgs
              return {
                call: async (txParams?: CeloTx) => {
                  const data = encodeFunctionData({
                    abi: [methodAbi],
                    args,
                  })
                  const callParams = {
                    to: contract._address,
                    data,
                    from: txParams?.from,
                  }
                  const response = await connection.rpcCaller.call('eth_call', [
                    callParams,
                    'latest',
                  ])
                  const result = response.result as string
                  if (
                    !result ||
                    result === '0x' ||
                    !methodAbi.outputs ||
                    methodAbi.outputs.length === 0
                  ) {
                    return result
                  }
                  const decoded = viemAbiCoder.decodeParameters(methodAbi.outputs, result)
                  if (methodAbi.outputs.length === 1) return decoded[0]
                  // Remove __length__ for contract call results (web3 didn't include it)
                  const { __length__, ...rest } = decoded
                  return rest
                },
                send: (txParams?: CeloTx) => {
                  const data = encodeFunctionData({
                    abi: [methodAbi],
                    args,
                  })
                  const sendTx = {
                    ...txParams,
                    to: contract._address,
                    data,
                  }
                  return createPromiEvent(connection, sendTx, abi)
                },
                estimateGas: async (txParams?: CeloTx) => {
                  const data = encodeFunctionData({
                    abi: [methodAbi],
                    args,
                  })
                  return connection.estimateGas({
                    ...txParams,
                    to: contract._address,
                    data,
                  })
                },
                encodeABI: () => {
                  return encodeFunctionData({
                    abi: [methodAbi],
                    args,
                  })
                },
                _parent: contract,
                arguments: args,
              }
            }
          },
        }
      )
    }

    deploy(params: { data: string; arguments?: unknown[] }): CeloTxObject<unknown> {
      const constructorAbi = this.options.jsonInterface.find(
        (item: AbiItem) => item.type === 'constructor'
      )
      let data = params.data
      if (constructorAbi && params.arguments && params.arguments.length > 0) {
        const abiParams = constructorAbi.inputs!.map(
          (i: AbiInput) => ({ type: i.type }) as AbiParameter
        )
        const coerced = params.arguments.map((param, i) =>
          coerceValueForType(constructorAbi.inputs![i].type, param)
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- viem's encodeAbiParameters has deeply recursive types incompatible with unknown
        const encodedArgs = encodeAbiParameters(abiParams, coerced as any).slice(2)
        data = data + encodedArgs
      }
      const contract = this
      return {
        call: async () => data,
        send: (txParams?: CeloTx) => {
          const pe = createPromiEvent(connection, { ...txParams, data }, this.options.jsonInterface)
          // web3's deploy().send() resolves to the deployed Contract instance,
          // not the receipt. Wrap the result to match that behavior.
          const jsonInterface = this.options.jsonInterface
          const ContractClass = this.constructor as new (
            abi: AbiItem[],
            address?: string
          ) => Contract
          const wrappedPromise = pe.then((receipt: CeloTxReceipt) => {
            const deployed = new ContractClass(jsonInterface, receipt.contractAddress)
            return deployed
          })
          const result = wrappedPromise as unknown as PromiEvent<CeloTxReceipt>
          result.on = pe.on
          result.once = pe.once
          return result
        },
        estimateGas: async (txParams?: CeloTx) => {
          return connection.estimateGas({ ...txParams, data })
        },
        encodeABI: () => data,
        _parent: contract,
        arguments: params.arguments || [],
      } as unknown as CeloTxObject<unknown>
    }

    async getPastEvents(event: string, options: PastEventOptions): Promise<EventLog[]> {
      const eventAbi = this.options.jsonInterface.find(
        (item: AbiItem) => item.type === 'event' && item.name === event
      )
      if (!eventAbi) return []

      const eventSig = viemAbiCoder.encodeEventSignature(eventAbi)
      const topics: string[] = [eventSig]

      const params: GetLogsParams = {
        address: this._address,
        topics,
        fromBlock:
          options.fromBlock != null ? inputBlockNumberFormatter(options.fromBlock) : undefined,
        toBlock: options.toBlock != null ? inputBlockNumberFormatter(options.toBlock) : undefined,
      }

      const response = await connection.rpcCaller.call('eth_getLogs', [params])
      const logs = response.result as Log[]
      return logs.map((log: Log) => {
        let returnValues: Record<string, unknown> = {}
        try {
          returnValues = viemAbiCoder.decodeLog(
            eventAbi.inputs || [],
            log.data,
            log.topics.slice(1)
          ) as unknown as Record<string, unknown>
        } catch {
          // Event decoding may fail for topics from proxy contracts or unknown events; skip gracefully
        }
        return {
          event: eventAbi.name!,
          address: log.address,
          returnValues,
          logIndex: log.logIndex,
          transactionIndex: log.transactionIndex,
          transactionHash: log.transactionHash,
          blockHash: log.blockHash,
          blockNumber: log.blockNumber,
          raw: { data: log.data, topics: log.topics },
        }
      })
    }
  }
}
