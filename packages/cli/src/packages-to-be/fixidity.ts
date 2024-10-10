// based on @celo/utils/src/fixidity.ts package which doesn't support bigint

export const fixed1 = 1000000000000000000000000n

export const fromFixed = (f: bigint): number => {
  return Number(f) / Number(fixed1)
}

export const multiplyByFixidityFraction = (number: bigint, fraction: bigint): bigint => {
  return (number * fraction) / fixed1
}
