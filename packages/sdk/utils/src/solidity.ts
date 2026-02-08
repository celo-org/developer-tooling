import { encodePacked, type Hex, isHex, keccak256, toBytes } from 'viem'

type SolidityValue = string | number | bigint | boolean | { type: string; value: unknown }

/**
 * Computes keccak256 of Solidity-packed encoding of arguments.
 * Replacement for web3-utils soliditySha3.
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

  const packed = encodePacked(types, values)
  return keccak256(packed)
}

/**
 * Same as soliditySha3 but returns the zero hash instead of null for empty input.
 * Replacement for web3-utils soliditySha3Raw.
 */
export function soliditySha3Raw(...args: SolidityValue[]): string {
  return soliditySha3(...args) ?? keccak256(new Uint8Array())
}

/**
 * Computes keccak256 hash. Alias for soliditySha3.
 * Replacement for web3-utils sha3.
 */
export function sha3(...args: SolidityValue[]): string | null {
  // When called with a single string (the common case for sha3), handle it directly
  if (args.length === 1 && typeof args[0] === 'string') {
    const input = args[0]
    // web3's sha3 with a single string auto-detects: hex → decode as bytes, otherwise UTF-8
    if (isHex(input, { strict: true })) {
      return keccak256(input as Hex)
    }
    return keccak256(toBytes(input))
  }
  return soliditySha3(...args)
}
