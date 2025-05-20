import BigNumber from 'bignumber.js'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeBigNumber(): R
      toEqBigNumber(expected: BigNumber | string | number): R
    }
  }
}

if (typeof global.jest !== 'undefined') {
  global.jest.setTimeout(10_000)
} else {
  throw new Error('This file was written for jest and not for vitest.')
}

// @ts-expect-error
global.expect.extend({
  toBeBigNumber(received: any) {
    const pass = BigNumber.isBigNumber(received)
    if (pass) {
      return {
        // eslint-disable-next-line  @typescript-eslint/no-unsafe-member-access
        message: () => `expected ${received.toJSON()} not to be BigNumber`,
        pass: true,
      }
    } else {
      return {
        message: () => `expected ${received} to be BigNumber`,
        pass: false,
      }
    }
  },
  toEqBigNumber(received: BigNumber, _expected: BigNumber | string | number) {
    const expected = new BigNumber(_expected)
    const pass = expected.eq(received)
    if (pass) {
      return {
        message: () => `expected ${received.toString()} not to equal ${expected.toString()}`,
        pass: true,
      }
    } else {
      return {
        message: () => `expected ${received.toString()} to equal ${expected.toString()}`,
        pass: false,
      }
    }
  },
})
