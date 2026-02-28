import { StrongAddress, bufferToHex, ensureLeading0x } from '@celo/base/lib/address'
import { zip } from '@celo/base/lib/collections'
import {
  CeloTransactionObject,
  CeloContract,
  Connection,
  EventLog,
  PastEventOptions,
  createViemTxObjectInternal,
  toTransactionObject,
} from '@celo/connect'
import type { AbiItem } from '@celo/connect/lib/abi-types'
import { viemAbiCoder } from '@celo/connect/lib/viem-abi-coder'
import type { Abi, ContractFunctionName, PublicClient } from 'viem'
import { toFunctionHash } from 'viem'
import { fromFixed, toFixed } from '@celo/utils/lib/fixidity'
import BigNumber from 'bignumber.js'
import { ContractVersion } from '../versions'

/** @internal Minimal contract shape for proxy helpers. CeloContract satisfies this. */
export interface ContractLike<TAbi extends readonly unknown[] = readonly unknown[]> {
  readonly abi: TAbi
  readonly address: `0x${string}`
}

/**
 * @internal Registry mapping contract instances to their Connection.
 * Populated by BaseWrapper constructor, consumed by proxyCallGenericImpl
 * so standalone proxyCall/proxyCallGeneric can access Connection without
 * changing their public signatures.
 */
const contractConnections = new WeakMap<object, Connection>()

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
    contractConnections.set(contract, connection)
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
   * Create a CeloTransactionObject for a state-changing contract call.
   * Typed variant: constrains functionName to actual ABI write methods.
   * @internal Used by concrete wrapper subclasses to replace proxySend.
   */
  protected buildTx<TFunctionName extends ContractFunctionName<TAbi, 'nonpayable' | 'payable'>>(
    functionName: TFunctionName,
    args: unknown[]
  ): CeloTransactionObject<void> {
    const txo = createViemTxObjectInternal(
      this.connection,
      this.contract,
      functionName as string,
      args
    )
    return toTransactionObject(this.connection, txo) as CeloTransactionObject<void>
  }

  /**
   * Create a CeloTransactionObject without compile-time function name checking.
   * Use ONLY in generic intermediate classes (Erc20Wrapper, CeloTokenWrapper)
   * where TAbi is an unresolved generic parameter.
   * @internal
   */
  protected buildTxUnchecked(
    functionName: string,
    args: unknown[]
  ): CeloTransactionObject<unknown> {
    const txo = createViemTxObjectInternal(this.connection, this.contract, functionName, args)
    return toTransactionObject(this.connection, txo)
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

type Parser<A, B> = (input: A) => B

/** Identity Parser */
export const identity = <A>(a: A) => a
export const stringIdentity = (x: string) => x

/**
 * Tuple parser
 * Useful to map different input arguments
 */
export function tupleParser<A0, B0>(parser0: Parser<A0, B0>): (...args: [A0]) => [B0]
export function tupleParser<A0, B0, A1, B1>(
  parser0: Parser<A0, B0>,
  parser1: Parser<A1, B1>
): (...args: [A0, A1]) => [B0, B1]
export function tupleParser<A0, B0, A1, B1, A2, B2>(
  parser0: Parser<A0, B0>,
  parser1: Parser<A1, B1>,
  parser2: Parser<A2, B2>
): (...args: [A0, A1, A2]) => [B0, B1, B2]
export function tupleParser<A0, B0, A1, B1, A2, B2, A3, B3>(
  parser0: Parser<A0, B0>,
  parser1: Parser<A1, B1>,
  parser2: Parser<A2, B2>,
  parser3: Parser<A3, B3>
): (...args: [A0, A1, A2, A3]) => [B0, B1, B2, B3]
export function tupleParser(...parsers: Parser<any, any>[]) {
  return (...args: any[]) => zip((parser, input) => parser(input), parsers, args)
}

/**
 * Creates a proxy to send a tx on a viem-native contract.
 *
 * Typed overloads: when a contract with a const-typed ABI is provided,
 * the function name is constrained to actual ABI function names at compile time.
 */

// Typed overload: contract with const ABI, function name only
export function proxySend<
  TAbi extends Abi,
  TFunctionName extends ContractFunctionName<TAbi, 'nonpayable' | 'payable'>,
  InputArgs extends any[],
  Output,
>(
  connection: Connection,
  contract: ContractLike<TAbi>,
  functionName: TFunctionName
): (...args: InputArgs) => CeloTransactionObject<Output>

// Typed overload: contract with const ABI, function name + input parser
export function proxySend<
  TAbi extends Abi,
  TFunctionName extends ContractFunctionName<TAbi, 'nonpayable' | 'payable'>,
  InputArgs extends any[],
  ParsedInputArgs extends any[],
  Output,
>(
  connection: Connection,
  contract: ContractLike<TAbi>,
  functionName: TFunctionName,
  parseInputArgs: (...args: InputArgs) => ParsedInputArgs
): (...args: InputArgs) => CeloTransactionObject<Output>

// Untyped overloads (backward compat)
export function proxySend<InputArgs extends any[], Output>(
  connection: Connection,
  contract: ContractLike<AbiItem[]>,
  functionName: string
): (...args: InputArgs) => CeloTransactionObject<Output>
export function proxySend<InputArgs extends any[], ParsedInputArgs extends any[], Output>(
  connection: Connection,
  contract: ContractLike<AbiItem[]>,
  functionName: string,
  parseInputArgs: (...args: InputArgs) => ParsedInputArgs
): (...args: InputArgs) => CeloTransactionObject<Output>
export function proxySend<InputArgs extends any[], ParsedInputArgs extends any[]>(
  connection: Connection,
  contract: ContractLike,
  functionName: string,
  parseInputArgs?: (...args: InputArgs) => ParsedInputArgs
): (...args: InputArgs) => CeloTransactionObject<unknown> {
  return proxySendGenericImpl(connection, contract, functionName, parseInputArgs)
}

// ---------------------------------------------------------------------------
// Generic variants: non-overloaded, for generic intermediate classes.
// Accept ContractLike — typed contracts pass via structural subtyping.
// These are SEPARATE functions (not overloads), so typed proxyCall/proxySend
// can't fall through to them. Explicit usage in generic classes only.
// ---------------------------------------------------------------------------

/**
 * Like proxyCall, but without compile-time function name checking.
 * Use ONLY in generic intermediate classes (Erc20Wrapper, CeloTokenWrapper)
 * where TAbi is an unresolved generic parameter.
 * Concrete wrapper classes MUST use proxyCall() for type-safe function names.
 * @internal
 */
export function proxyCallGeneric<InputArgs extends any[], Output>(
  contract: ContractLike,
  functionName: string
): (...args: InputArgs) => Promise<Output>
export function proxyCallGeneric<InputArgs extends any[], PreParsedOutput, Output>(
  contract: ContractLike,
  functionName: string,
  parseInputArgs: undefined,
  parseOutput: (o: PreParsedOutput) => Output
): (...args: InputArgs) => Promise<Output>
export function proxyCallGeneric<InputArgs extends any[], ParsedInputArgs extends any[], Output>(
  contract: ContractLike,
  functionName: string,
  parseInputArgs: (...args: InputArgs) => ParsedInputArgs
): (...args: InputArgs) => Promise<Output>
export function proxyCallGeneric<
  InputArgs extends any[],
  ParsedInputArgs extends any[],
  PreParsedOutput,
  Output,
>(
  contract: ContractLike,
  functionName: string,
  parseInputArgs: ((...args: InputArgs) => ParsedInputArgs) | undefined,
  parseOutput: (o: PreParsedOutput) => Output
): (...args: InputArgs) => Promise<Output>
export function proxyCallGeneric<
  InputArgs extends any[],
  ParsedInputArgs extends any[],
  PreParsedOutput,
  Output,
>(
  contract: ContractLike,
  functionName: string,
  parseInputArgs?: ((...args: InputArgs) => ParsedInputArgs) | undefined,
  parseOutput?: ((o: PreParsedOutput) => Output) | undefined
): (...args: InputArgs) => Promise<Output | PreParsedOutput> {
  return proxyCallGenericImpl(contract, functionName, parseInputArgs, parseOutput)
}

/**
 * Like proxySend, but without compile-time function name checking.
 * Use ONLY in generic intermediate classes.
 * @internal
 */
export function proxySendGeneric<InputArgs extends any[], Output>(
  connection: Connection,
  contract: ContractLike,
  functionName: string
): (...args: InputArgs) => CeloTransactionObject<Output>
export function proxySendGeneric<InputArgs extends any[], ParsedInputArgs extends any[], Output>(
  connection: Connection,
  contract: ContractLike,
  functionName: string,
  parseInputArgs: (...args: InputArgs) => ParsedInputArgs
): (...args: InputArgs) => CeloTransactionObject<Output>
export function proxySendGeneric<InputArgs extends any[], ParsedInputArgs extends any[]>(
  connection: Connection,
  contract: ContractLike,
  functionName: string,
  parseInputArgs?: (...args: InputArgs) => ParsedInputArgs
): (...args: InputArgs) => CeloTransactionObject<unknown> {
  return proxySendGenericImpl(connection, contract, functionName, parseInputArgs)
}

// ---------------------------------------------------------------------------
// Shared implementation (private to this module)
// ---------------------------------------------------------------------------

function proxyCallGenericImpl<
  InputArgs extends any[],
  ParsedInputArgs extends any[],
  PreParsedOutput,
  Output,
>(
  contract: ContractLike,
  functionName: string,
  parseInputArgs?: ((...args: InputArgs) => ParsedInputArgs) | undefined,
  parseOutput?: ((o: PreParsedOutput) => Output) | undefined
): (...args: InputArgs) => Promise<Output | PreParsedOutput> {
  return async (...args: InputArgs) => {
    const resolvedArgs = parseInputArgs ? parseInputArgs(...args) : args
    const connection = contractConnections.get(contract)
    if (!connection) {
      throw new Error(
        `Connection not found for contract at ${contract.address}. ` +
          'Ensure the contract was registered via a BaseWrapper constructor.'
      )
    }
    const txo = createViemTxObjectInternal(
      connection,
      contract,
      functionName,
      resolvedArgs as unknown[]
    )
    const result = await txo.call()
    return parseOutput ? parseOutput(result as PreParsedOutput) : (result as PreParsedOutput)
  }
}

function proxySendGenericImpl<InputArgs extends any[], ParsedInputArgs extends any[]>(
  connection: Connection,
  contract: ContractLike,
  functionName: string,
  parseInputArgs?: (...args: InputArgs) => ParsedInputArgs
): (...args: InputArgs) => CeloTransactionObject<unknown> {
  return (...args: InputArgs) => {
    const resolvedArgs = parseInputArgs ? parseInputArgs(...args) : args
    const txo = createViemTxObjectInternal(
      connection,
      contract,
      functionName,
      resolvedArgs as unknown[]
    )
    return toTransactionObject(connection, txo)
  }
}
