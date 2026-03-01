import { encodePacked, type Hex, isHex, keccak256, pad, toBytes, toHex } from 'viem'

export type SolidityValue =
  | string
  | number
  | bigint
  | boolean
  | { type: string; value: unknown }
  | { t: string; v: unknown }

/**
 * Computes keccak256 of Solidity-packed encoding of arguments.
 * Replacement for the former web3-utils soliditySha3.
 *
 * Supports two calling conventions:
 * 1. Typed objects: soliditySha3({ type: 'address', value: '0x...' })
 * 2. Auto-detected values: soliditySha3('hello', '0xdead') - strings auto-detected as
 *    'bytes' if hex, 'string' otherwise; numbers as uint256; booleans as bool
 */
export function soliditySha3(...args: SolidityValue[]): string | null {
  if (args.length === 0) return null

  const types: string[] = []
  const values: unknown[] = []

  for (const arg of args) {
    if (typeof arg === 'object' && arg !== null && 'type' in arg && 'value' in arg) {
      types.push(arg.type as string)
      values.push(arg.value)
    } else if (typeof arg === 'object' && arg !== null && 't' in arg && 'v' in arg) {
      // shorthand: { t: 'uint256', v: 123 }
      types.push((arg as { t: string; v: unknown }).t)
      values.push((arg as { t: string; v: unknown }).v)
    } else if (typeof arg === 'string') {
      if (isHex(arg, { strict: true })) {
        types.push('bytes')
        values.push(arg)
      } else {
        types.push('string')
        values.push(arg)
      }
    } else if (typeof arg === 'number' || typeof arg === 'bigint') {
      types.push('uint256')
      values.push(BigInt(arg))
    } else if (typeof arg === 'boolean') {
      types.push('bool')
      values.push(arg)
    }
  }

  // Coerce values for bytesN types: the legacy API accepted plain strings and hex of wrong size
  for (let i = 0; i < types.length; i++) {
    const bytesMatch = types[i].match(/^bytes(\d+)$/)
    if (bytesMatch && typeof values[i] === 'string') {
      const size = parseInt(bytesMatch[1], 10)
      let hex: Hex
      if (isHex(values[i] as string, { strict: true })) {
        hex = values[i] as Hex
      } else {
        hex = toHex(toBytes(values[i] as string))
      }
      const byteLen = (hex.length - 2) / 2
      if (byteLen < size) {
        values[i] = pad(hex, { size, dir: 'right' })
      } else if (byteLen > size) {
        values[i] = ('0x' + hex.slice(2, 2 + size * 2)) as Hex
      }
    }
  }

  const packed = encodePacked(types, values)
  return keccak256(packed)
}

/**
 * Same as soliditySha3 but returns the zero hash instead of null for empty input.
 * Replacement for the former web3-utils soliditySha3Raw.
 */
export function soliditySha3Raw(...args: SolidityValue[]): string {
  return soliditySha3(...args) ?? keccak256(new Uint8Array())
}

/**
 * Computes keccak256 hash. Replacement for the former web3-utils sha3.
 * For a single string argument, hashes it directly (hex as bytes, otherwise UTF-8).
 * For multiple or typed arguments, delegates to soliditySha3.
 */
export function sha3(...args: SolidityValue[]): string | null {
  // When called with a single string (the common case for sha3), handle it directly
  if (args.length === 1 && typeof args[0] === 'string') {
    const input = args[0]
    // sha3 with a single string auto-detects: hex → decode as bytes, otherwise UTF-8
    if (isHex(input, { strict: true })) {
      return keccak256(input as Hex)
    }
    return keccak256(toBytes(input))
  }
  return soliditySha3(...args)
}
