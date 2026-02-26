import {
  decodeAbiParameters,
  encodeAbiParameters,
  encodeFunctionData,
  type AbiParameter,
  toEventHash,
  toFunctionHash,
  decodeEventLog,
  pad,
} from 'viem'
import { AbiCoder, AbiInput, AbiItem, DecodedParamsObject } from './abi-types'
import { EventLog } from './types'

/**
 * Coerce a value to match the expected ABI type.
 * Web3 was lenient about types; viem is strict. This bridges the gap.
 */
export function coerceValueForType(type: string, value: unknown): unknown {
  // bool: web3 accepted numbers/strings; viem requires actual booleans
  if (type === 'bool') {
    if (typeof value === 'boolean') return value
    return Boolean(value)
  }
  // bytesN (fixed-size): web3 auto-padded short hex strings; viem requires exact size
  const bytesMatch = type.match(/^bytes(\d+)$/)
  if (bytesMatch) {
    const expectedBytes = parseInt(bytesMatch[1], 10)
    if (typeof value === 'string') {
      const hex = value.startsWith('0x') ? value : `0x${value}`
      // If the hex value is shorter than expected, right-pad with zeros
      const actualBytes = (hex.length - 2) / 2
      if (actualBytes < expectedBytes) {
        return pad(hex as `0x${string}`, { size: expectedBytes, dir: 'right' })
      }
      return hex
    }
    // Buffer or Uint8Array
    if (Buffer.isBuffer(value) || value instanceof Uint8Array) {
      const buffer = Buffer.from(value)
      const hex = `0x${buffer.toString('hex')}` as `0x${string}`
      if (buffer.length < expectedBytes) {
        return pad(hex, { size: expectedBytes, dir: 'right' })
      }
      return hex
    }
    throw new Error(`Unsupported value type for ${type}: ${typeof value}`)
  }
  return value
}

/**
 * Coerce an array of values to match their expected ABI types.
 */
export function coerceArgsForAbi(abiInputs: readonly AbiInput[], args: unknown[]): unknown[] {
  return args.map((arg, i) => {
    if (i < abiInputs.length && abiInputs[i].type) {
      return coerceValueForType(abiInputs[i].type, arg)
    }
    return arg
  })
}

// Web3's ABI coder returned bigint values as strings. Convert to match.
export function bigintToString(value: unknown): unknown {
  if (typeof value === 'bigint') {
    return value.toString()
  }
  if (Array.isArray(value)) {
    return value.map(bigintToString)
  }
  return value
}

export function isPresent(
  value: string | undefined | number | bigint
): value is string | number | bigint {
  return !isEmpty(value)
}

export function isEmpty(value: string | undefined | number | bigint): value is undefined {
  return (
    value === 0 ||
    value === undefined ||
    value === null ||
    value === '0' ||
    value === BigInt(0) ||
    (typeof value === 'string' && (value.toLowerCase() === '0x' || value.toLowerCase() === '0x0'))
  )
}

/**
 * Viem-based ABI coder implementation that matches the AbiCoder interface.
 * @internal
 */
export const viemAbiCoder: AbiCoder = {
  decodeLog(inputs: AbiInput[], hexString: string, topics: string[]): EventLog {
    const eventInputs = inputs.map((input: AbiInput) => ({
      ...input,
      indexed: input.indexed ?? false,
    }))
    const abi = [{ type: 'event' as const, name: 'Event', inputs: eventInputs }]
    // Web3 convention: topics passed WITHOUT event signature hash (topics[0] stripped).
    // Viem's decodeEventLog expects topics[0] to be the event signature. Prepend it.
    const sig = `Event(${eventInputs.map((i: AbiInput) => i.type).join(',')})`
    const eventSigHash = toEventHash(sig)
    const fullTopics = [eventSigHash, ...topics] as [`0x${string}`, ...`0x${string}`[]]
    try {
      const decoded = decodeEventLog({
        abi,
        data: hexString as `0x${string}`,
        topics: fullTopics,
      })
      // Convert bigint values to strings to match web3 behavior
      const args = (decoded as { args?: Record<string, unknown> }).args
      if (args && typeof args === 'object') {
        for (const key of Object.keys(args)) {
          args[key] = bigintToString(args[key])
        }
      }
      return args as unknown as EventLog
    } catch {
      return {} as unknown as EventLog
    }
  },
  encodeParameter(type: string, parameter: unknown): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- viem's encodeAbiParameters has deeply recursive types incompatible with unknown
    return encodeAbiParameters([{ type } as AbiParameter], [
      coerceValueForType(type, parameter),
    ] as any)
  },
  encodeParameters(types: string[], parameters: unknown[]): string {
    const abiParams = types.map((type) => ({ type }) as AbiParameter)
    const coerced = parameters.map((param, i) => coerceValueForType(types[i], param))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- viem's encodeAbiParameters has deeply recursive types incompatible with unknown
    return encodeAbiParameters(abiParams, coerced as any)
  },
  encodeEventSignature(name: string | object): string {
    if (typeof name === 'string') {
      return toEventHash(name)
    }
    const abiItem = name as AbiItem
    const sig = `${abiItem.name}(${(abiItem.inputs || []).map((i: AbiInput) => i.type).join(',')})`
    return toEventHash(sig)
  },
  encodeFunctionCall(jsonInterface: object, parameters: unknown[]): string {
    return encodeFunctionData({
      abi: [jsonInterface as AbiItem],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- viem's encodeFunctionData has deeply recursive types incompatible with unknown
      args: parameters as any,
    })
  },
  encodeFunctionSignature(name: string | object): string {
    if (typeof name === 'string') {
      return toFunctionHash(name).slice(0, 10)
    }
    const abiItem = name as AbiItem
    const sig = `${abiItem.name}(${(abiItem.inputs || []).map((i: AbiInput) => i.type).join(',')})`
    return toFunctionHash(sig).slice(0, 10)
  },
  decodeParameter(type: string, hex: string): unknown {
    const hexPrefixed = hex.startsWith('0x') ? hex : `0x${hex}`
    const result = decodeAbiParameters([{ type } as AbiParameter], hexPrefixed as `0x${string}`)
    return bigintToString(result[0])
  },
  decodeParameters(types: (string | AbiInput)[], hex: string): DecodedParamsObject {
    const abiParams = types.map((type) =>
      typeof type === 'string' ? ({ type } as AbiParameter) : type
    )
    // Ensure 0x prefix (web3 accepted both, viem requires it)
    const hexPrefixed = hex.startsWith('0x') ? hex : `0x${hex}`
    const result = decodeAbiParameters(abiParams, hexPrefixed as `0x${string}`)
    const output: DecodedParamsObject = { __length__: result.length }
    for (let i = 0; i < result.length; i++) {
      const val = bigintToString(result[i])
      output[i] = val
      if (abiParams[i].name) {
        output[abiParams[i].name!] = val
      }
    }
    return output
  },
}
