import { multiplyBigIntByPercent } from './numeric'

describe('multiplyBigIntByPercent', () => {
  it('returns correct result for 100% (no change)', () => {
    expect(multiplyBigIntByPercent(BigInt(1000), 100)).toBe(BigInt(1000))
  })

  it('returns correct result for 0% (zero)', () => {
    expect(multiplyBigIntByPercent(BigInt(1000), 0)).toBe(BigInt(0))
  })

  it('returns correct result for 50%', () => {
    expect(multiplyBigIntByPercent(BigInt(1000), 50)).toBe(BigInt(500))
  })

  it('returns correct result for 200% (double)', () => {
    expect(multiplyBigIntByPercent(BigInt(1000), 200)).toBe(BigInt(2000))
  })

  it('handles rounding down (truncates decimals)', () => {
    expect(multiplyBigIntByPercent(BigInt(1001), 50)).toBe(BigInt(500))
  })

  it('handles negative values', () => {
    expect(multiplyBigIntByPercent(BigInt(-1000), 50)).toBe(BigInt(-500))
    expect(multiplyBigIntByPercent(BigInt(1000), -50)).toBe(BigInt(-500))
    expect(multiplyBigIntByPercent(BigInt(-1000), -50)).toBe(BigInt(500))
  })

  it('handles percent > 100', () => {
    expect(multiplyBigIntByPercent(BigInt(1000), 123)).toBe(BigInt(1230))
  })

  it('handles percent with decimals (should floor)', () => {
    expect(multiplyBigIntByPercent(BigInt(1000), 99.9)).toBe(BigInt(990))
    expect(multiplyBigIntByPercent(BigInt(1000), 100.9)).toBe(BigInt(1000))
    expect(multiplyBigIntByPercent(BigInt(1000), 101.9)).toBe(BigInt(1010))
  })

  it('handles large bigint values', () => {
    expect(multiplyBigIntByPercent(BigInt('12345678901234567890'), 150)).toBe(
      BigInt('18518518351851851835')
    )
  })

  it('matches the example in the JSDoc', () => {
    expect(multiplyBigIntByPercent(BigInt(100000000), 123)).toBe(BigInt(123000000))
  })
})
