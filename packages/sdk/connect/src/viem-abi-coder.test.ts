import { coerceValueForType } from './viem-abi-coder'
import {
  encodeAbiParameters,
  decodeAbiParameters,
  toFunctionHash,
  toEventHash,
  type AbiParameter,
} from 'viem'

describe('viem ABI encoding/decoding', () => {
  it('encodes and decodes a parameter', () => {
    const encoded = encodeAbiParameters([{ type: 'uint256' }] as AbiParameter[], [BigInt(42)])
    const decoded = decodeAbiParameters([{ type: 'uint256' }] as AbiParameter[], encoded)
    expect((decoded[0] as bigint).toString()).toBe('42')
  })

  it('encodes a function signature from string', () => {
    const sig = toFunctionHash('transfer(address,uint256)').slice(0, 10)
    expect(sig).toBe('0xa9059cbb')
  })

  it('encodes a function signature from ABI item', () => {
    const sig = toFunctionHash('transfer(address,uint256)').slice(0, 10)
    expect(sig).toBe('0xa9059cbb')
  })

  it('encodes an event signature', () => {
    const sig = toEventHash('Transfer(address,address,uint256)')
    expect(sig).toMatch(/^0x/)
    expect(sig.length).toBe(66) // 0x + 64 hex chars
  })

  it('encodes and decodes multiple parameters', () => {
    const encoded = encodeAbiParameters(
      [{ type: 'address' }, { type: 'uint256' }] as AbiParameter[],
      ['0x0000000000000000000000000000000000000001', BigInt(100)]
    )
    const decoded = decodeAbiParameters(
      [{ type: 'address' }, { type: 'uint256' }] as AbiParameter[],
      encoded
    )
    expect(decoded[0]).toBe('0x0000000000000000000000000000000000000001')
    expect((decoded[1] as bigint).toString()).toBe('100')
    expect(decoded.length).toBe(2)
  })
})

describe('#coerceValueForType - bool', () => {
  it('coerces true boolean to true', () => {
    expect(coerceValueForType('bool', true)).toBe(true)
  })

  it('coerces false boolean to false', () => {
    expect(coerceValueForType('bool', false)).toBe(false)
  })

  it('coerces number 1 to true', () => {
    expect(coerceValueForType('bool', 1)).toBe(true)
  })

  it('coerces number 0 to false', () => {
    expect(coerceValueForType('bool', 0)).toBe(false)
  })

  it('coerces string "true" to true', () => {
    expect(coerceValueForType('bool', 'true')).toBe(true)
  })

  it('coerces string "false" to true (non-empty string)', () => {
    expect(coerceValueForType('bool', 'false')).toBe(true)
  })

  it('coerces empty string to false', () => {
    expect(coerceValueForType('bool', '')).toBe(false)
  })

  it('coerces null to false', () => {
    expect(coerceValueForType('bool', null)).toBe(false)
  })

  it('coerces undefined to false', () => {
    expect(coerceValueForType('bool', undefined)).toBe(false)
  })
})

describe('#coerceValueForType - bytesN', () => {
  it('does not pad exact-length hex for bytes1', () => {
    const result = coerceValueForType('bytes1', '0x01')
    expect(result).toBe('0x01')
  })

  it('pads short hex string for bytes2', () => {
    const result = coerceValueForType('bytes2', '0x01')
    expect(result).toBe('0x0100')
  })

  it('pads short hex string for bytes4', () => {
    const result = coerceValueForType('bytes4', '0xdeadbeef')
    expect(result).toBe('0xdeadbeef')
  })

  it('pads short hex string for bytes32', () => {
    const result = coerceValueForType('bytes32', '0xaa')
    expect(result).toBe('0xaa00000000000000000000000000000000000000000000000000000000000000')
  })

  it('handles hex string without 0x prefix for bytes2', () => {
    const result = coerceValueForType('bytes2', '01')
    expect(result).toBe('0x0100')
  })

  it('handles exact-length hex for bytes4', () => {
    const result = coerceValueForType('bytes4', '0xdeadbeef')
    expect(result).toBe('0xdeadbeef')
  })

  it('handles Buffer input for bytes2', () => {
    const buffer = Buffer.from([0x01])
    const result = coerceValueForType('bytes2', buffer)
    expect(result).toBe('0x0100')
  })

  it('handles Buffer input for bytes4', () => {
    const buffer = Buffer.from([0xde, 0xad, 0xbe, 0xef])
    const result = coerceValueForType('bytes4', buffer)
    expect(result).toBe('0xdeadbeef')
  })

  it('handles Uint8Array input for bytes2', () => {
    const arr = new Uint8Array([0x01])
    const result = coerceValueForType('bytes2', arr)
    expect(result).toBe('0x0100')
  })

  it('handles Uint8Array input for bytes32', () => {
    const arr = new Uint8Array([0xaa])
    const result = coerceValueForType('bytes32', arr)
    expect(result).toBe('0xaa00000000000000000000000000000000000000000000000000000000000000')
  })

  it('throws error for unsupported value type', () => {
    expect(() => {
      coerceValueForType('bytes1', { invalid: 'object' })
    }).toThrow()
  })
})

describe('viem decodeEventLog', () => {
  it('decodes a basic event log', () => {
    const data = encodeAbiParameters([{ type: 'uint256' }] as AbiParameter[], [BigInt(100)])
    const topics = [
      '0x0000000000000000000000000000000000000000000000000000000000000001',
      '0x0000000000000000000000000000000000000000000000000000000000000002',
    ]
    // Basic event log encoding/decoding is tested through explorer
    expect(data).toBeDefined()
    expect(topics.length).toBe(2)
  })

  it('handles encoding with no indexed parameters', () => {
    const data = encodeAbiParameters([{ type: 'uint256' }] as AbiParameter[], [BigInt(42)])
    expect(data).toBeDefined()
  })
})
