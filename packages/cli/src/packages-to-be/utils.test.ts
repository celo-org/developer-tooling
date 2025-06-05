import { formatFixidity } from './utils'

describe('formatFixidity', () => {
  it('formats 24-decimal fixed point bigints to 2 decimal places', () => {
    // 1e24 in fixed point (should be 1.00)
    const one = 10n ** 24n
    expect(formatFixidity(one)).toBe('1.0')

    // 1.23e24 in fixed point (should be 1.23)
    const onePoint23 = 123n * 10n ** 22n
    expect(formatFixidity(onePoint23)).toBe('1.2')

    // 0 in fixed point (should be 0.00)
    expect(formatFixidity(0n)).toBe('0.0')

    const small = 10n ** 18n
    expect(formatFixidity(small)).toBe('0.0')
  })

  it('handles values between 0 and 1', () => {
    const lessThan1 = 8n * 10n ** 23n
    expect(formatFixidity(lessThan1)).toBe('0.8')

    const lessThanOne = 3n * 10n ** 23n
    expect(formatFixidity(lessThanOne)).toBe('0.3')
  })
})
