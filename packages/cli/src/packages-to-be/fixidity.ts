// based on @celo/utils/src/fixidity.ts package which doesn't support bigint

import BigNumber from 'bignumber.js'

export const fixed1 = 1000000000000000000000000n

export const fromFixidityValueToFraction = (value: bigint): string => {
  return new BigNumber(value.toString()).div(fixed1.toString()).toString()
}

export const multiplyByFixidityFraction = (number: bigint, fraction: bigint): bigint => {
  return (number * fraction) / fixed1
}
