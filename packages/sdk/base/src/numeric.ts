/**
 * Multiplies a bigint value by a percentage and returns the result as a bigint.
 *
 * The multiplication is performed with a precision of 8 decimal places, and the result is rounded down.
 *
 * @param value - The bigint value to be multiplied.
 * @param percent - The percentage to multiply the bigint by, where 100 === 100%.
 * @example
 * ```typescript
 * import { multiplyBigIntByPercent } from './numeric';
 *  const result = multiplyBigIntByPercent(BigInt(100000000), 123);
 *  console.log(result); // Outputs: 123000000n
 * ```
 * Great for increasing a bigint by a fixed percentage, e.g. 105 for a 5% increase.
 * @returns The result of the multiplication as a bigint, rounded down to the nearest integer.
 */
export function multiplyBigIntByPercent(value: bigint, percent: number): bigint {
  // Multiply the bigint by the percent (where 100 === 100%) and round down
  const result = (value * BigInt(Math.floor(percent))) / BigInt(100)
  return result
}
