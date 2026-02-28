import { StrongAddress, bufferToHex, ensureLeading0x } from '@celo/base/lib/address'

import { CeloContract, CeloTx, Connection, EventLog, PastEventOptions } from '@celo/connect'
import type { AbiItem } from '@celo/connect/lib/abi-types'
import { viemAbiCoder, coerceArgsForAbi } from '@celo/connect/lib/viem-abi-coder'
import type { ContractFunctionName, PublicClient } from 'viem'
import { toFunctionHash, encodeFunctionData as viemEncodeFunctionData } from 'viem'
import { fromFixed, toFixed } from '@celo/utils/lib/fixidity'
import BigNumber from 'bignumber.js'
import { ContractVersion } from '../versions'

/** @internal Minimal contract shape for proxy helpers. CeloContract satisfies this. */
export interface ContractLike<TAbi extends readonly unknown[] = readonly unknown[]> {
  readonly abi: TAbi
  readonly address: `0x${string}`
}

type Events = string
type Methods = string
type EventsEnum = Record<string, string>

/**
 * @internal -- use its children
 */
export abstract class BaseWrapper<TAbi extends readonly unknown[] = AbiItem[]> {
  protected _version?: ContractVersion
  protected readonly client: PublicClient

  constructor(
    protected readonly connection: Connection,
    protected readonly contract: CeloContract<TAbi>
  ) {
    this.client = connection.viemClient
  }

  /** Contract address */
  get address(): StrongAddress {
    return this.contract.address as StrongAddress
  }

  async version() {
    if (!this._version) {
      const result = await this.client.call({
        to: this.contract.address as `0x${string}`,
        data: viemAbiCoder.encodeFunctionSignature({
          type: 'function',
          name: 'getVersionNumber',
          inputs: [],
          outputs: [
            { name: '', type: 'uint256' },
            { name: '', type: 'uint256' },
            { name: '', type: 'uint256' },
            { name: '', type: 'uint256' },
          ],
        }) as `0x${string}`,
      })
      if (result.data && result.data !== '0x') {
        const decoded = viemAbiCoder.decodeParameters(
          [
            { name: '', type: 'uint256' },
            { name: '', type: 'uint256' },
            { name: '', type: 'uint256' },
            { name: '', type: 'uint256' },
          ],
          result.data
        )
        // @ts-ignore conditional type
        this._version = ContractVersion.fromRaw(decoded)
      }
    }
    return this._version!
  }

  protected async onlyVersionOrGreater(version: ContractVersion) {
    if (!(await this.version()).isAtLeast(version)) {
      throw new Error(`Bytecode version ${this._version} is not compatible with ${version} yet`)
    }
  }

  /**
   * Encode function call data without sending.
   * @internal
   */
  public encodeFunctionData(functionName: string, args: unknown[]): `0x${string}` {
    const contractAbi = this.contract.abi as AbiItem[]
    const methodAbi = contractAbi.find(
      (item: AbiItem) => item.type === 'function' && item.name === functionName
    )
    if (!methodAbi) {
      throw new Error(`Method ${functionName} not found in ABI`)
    }
    const coercedArgs = methodAbi.inputs ? coerceArgsForAbi(methodAbi.inputs, args) : args
    return viemEncodeFunctionData({
      abi: [methodAbi],
      args: coercedArgs,
    }) as `0x${string}`
  }

  /**
   * Send a state-changing transaction eagerly (typed).
   * Constrains functionName to actual ABI write methods.
   * @internal
   */
  protected async sendTx<
    TFunctionName extends ContractFunctionName<TAbi, 'nonpayable' | 'payable'>,
  >(
    functionName: TFunctionName,
    args: unknown[],
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    const data = this.encodeFunctionData(functionName as string, args)
    const result = await this.connection.sendTransaction({
      ...txParams,
      to: this.contract.address,
      data,
    })
    return (await result.getHash()) as `0x${string}`
  }

  /**
   * Send a state-changing transaction eagerly (untyped).
   * Use ONLY in generic intermediate classes where TAbi is unresolved.
   * @internal
   */
  protected async sendTxUnchecked(
    functionName: string,
    args: unknown[],
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    const data = this.encodeFunctionData(functionName, args)
    const result = await this.connection.sendTransaction({
      ...txParams,
      to: this.contract.address,
      data,
    })
    return (await result.getHash()) as `0x${string}`
  }

  /** Contract getPastEvents */
  public async getPastEvents(event: Events, options: PastEventOptions): Promise<EventLog[]> {
    const eventAbi = (this.contract.abi as unknown as AbiItem[]).find(
      (item: AbiItem) => item.type === 'event' && item.name === event
    )
    if (!eventAbi) return []

    const eventSig = viemAbiCoder.encodeEventSignature(eventAbi)
    const topics: string[] = [eventSig]

    const params: Record<string, unknown> = {
      address: this.contract.address,
      topics,
    }
    if (options.fromBlock != null) {
      params.fromBlock =
        typeof options.fromBlock === 'number'
          ? `0x${options.fromBlock.toString(16)}`
          : options.fromBlock
    }
    if (options.toBlock != null) {
      params.toBlock =
        typeof options.toBlock === 'number' ? `0x${options.toBlock.toString(16)}` : options.toBlock
    }

    const response = await this.connection.rpcCaller.call('eth_getLogs', [params])
    const logs = response.result as any[]
    return logs.map((log: any) => {
      let returnValues: Record<string, unknown> = {}
      try {
        returnValues = viemAbiCoder.decodeLog(
          eventAbi.inputs || [],
          log.data,
          log.topics.slice(1)
        ) as unknown as Record<string, unknown>
      } catch {
        // Event decoding may fail for proxy contracts; skip gracefully
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

  events: Record<string, AbiItem> = (this.contract.abi as unknown as AbiItem[])
    .filter((item: AbiItem) => item.type === 'event' && item.name)
    .reduce<Record<string, AbiItem>>((acc, item: AbiItem) => {
      acc[item.name!] = item
      return acc
    }, {})

  eventTypes = Object.keys(this.events).reduce<EventsEnum>(
    (acc, key) => ({ ...acc, [key]: key }),
    {} as any
  )

  methodIds = (this.contract.abi as unknown as AbiItem[])
    .filter((item: AbiItem) => item.type === 'function' && item.name)
    .reduce<Record<Methods, string>>((acc, item: AbiItem) => {
      const sig = `${item.name}(${(item.inputs || []).map((i) => i.type).join(',')})`
      acc[item.name!] = toFunctionHash(sig).slice(0, 10)
      return acc
    }, {} as any)
}

export const valueToBigNumber = (input: BigNumber.Value) => new BigNumber(input)

export const fixidityValueToBigNumber = (input: BigNumber.Value) => fromFixed(new BigNumber(input))

export const valueToString = (input: BigNumber.Value) => valueToBigNumber(input).toFixed()

export const valueToFixidityString = (input: BigNumber.Value) =>
  toFixed(valueToBigNumber(input)).toFixed()

export const valueToInt = (input: BigNumber.Value) =>
  valueToBigNumber(input).integerValue().toNumber()

export const valueToFrac = (numerator: BigNumber.Value, denominator: BigNumber.Value) =>
  valueToBigNumber(numerator).div(valueToBigNumber(denominator))

/** Convert a string address to viem's strict hex address type */
export function toViemAddress(v: string): `0x${string}` {
  return ensureLeading0x(v) as `0x${string}`
}

/** Convert BigNumber.Value (string | number | BigNumber) to bigint for viem .read calls */
export function toViemBigInt(v: BigNumber.Value): bigint {
  return BigInt(new BigNumber(v).toFixed(0))
}

enum TimeDurations {
  millennium = 31536000000000,
  century = 3153600000000,
  decade = 315360000000,
  year = 31536000000,
  quarter = 7776000000,
  month = 2592000000,
  week = 604800000,
  day = 86400000,
  hour = 3600000,
  minute = 60000,
  second = 1000,
  millisecond = 1,
}

type TimeUnit = keyof typeof TimeDurations

// taken mostly from https://gist.github.com/RienNeVaPlus/024de3431ae95546d60f2acce128a7e2
export function secondsToDurationString(
  durationSeconds: BigNumber.Value,
  outputUnits: TimeUnit[] = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second']
) {
  let durationMilliseconds = valueToBigNumber(durationSeconds)
    .times(TimeDurations.second)
    .toNumber()

  if (durationMilliseconds <= 0) {
    return 'past'
  }

  const durations = outputUnits.reduce((res: Map<TimeUnit, number>, key) => {
    const unitDuration = TimeDurations[key]
    const value = Math.floor(durationMilliseconds / unitDuration)
    durationMilliseconds -= value * unitDuration
    return res.set(key, value)
  }, new Map())

  let s = ''
  durations.forEach((value, unit) => {
    if (value > 0) {
      s += s !== '' ? ', ' : ''
      s += `${value} ${unit}${value > 1 ? 's' : ''}`
    }
  })
  return s
}

export const blocksToDurationString = (input: BigNumber.Value) =>
  secondsToDurationString(valueToBigNumber(input).times(5)) // TODO: fetch blocktime

const DATE_TIME_OPTIONS = {
  year: 'numeric',
  month: 'short',
  weekday: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZoneName: 'short',
} as const

export const unixSecondsTimestampToDateString = (input: BigNumber.Value) => {
  const date = new Date(valueToInt(input) * TimeDurations.second)
  return Intl.DateTimeFormat('default', DATE_TIME_OPTIONS).format(date)
}

// Type of bytes in solidity gets represented as a string of number array by typechain and web3
// Hopefully this will improve in the future, at which point we can make improvements here
type SolidityBytes = string | number[]
export const stringToSolidityBytes = (input: string) => ensureLeading0x(input) as SolidityBytes
export const bufferToSolidityBytes = (input: Buffer) => stringToSolidityBytes(bufferToHex(input))
export const solidityBytesToString = (input: SolidityBytes): string => {
  if (input === null || input === undefined || typeof input === 'string') {
    return input
  } else if (Array.isArray(input)) {
    const hexString = input.reduce((acc, num) => acc + num.toString(16).padStart(2, '0'), '')
    return ensureLeading0x(hexString)
  } else {
    throw new Error('Unexpected input type for solidity bytes')
  }
}
