/**
 * JSON replacer function that handles BigInt serialization.
 * viem returns bigint for numeric fields, and JSON.stringify crashes on BigInt
 * with "TypeError: Do not know how to serialize a BigInt".
 * This replacer converts bigint values to strings.
 */
export const bigintReplacer = (_key: string, value: unknown): unknown => {
  if (typeof value === 'bigint') {
    return value.toString()
  }
  return value
}
