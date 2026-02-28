import { pad } from 'viem'
import { AbiInput } from './abi-types'

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

// Viem's ABI decoder returns uint/int values as bigint, while web3 returned strings.
// Downstream consumers (wrapper proxyCall transformers, CLI formatters, etc.) expect
// string values for large numbers, so we convert to preserve backward compatibility.
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
