import BigNumber from 'bignumber.js'

export function bigintToBigNumber(value: bigint) {
  return new BigNumber(value.toString())
}

export function bigNumberToBigInt(value: BigNumber) {
  return BigInt(value.toFixed())
}
