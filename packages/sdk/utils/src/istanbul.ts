import { bytesToHex, fromRlp, getAddress, type Hex } from 'viem'
import BigNumber from 'bignumber.js'
import { Address } from './address'

// This file contains utilities that help with istanbul-specific block information.
// See https://github.com/celo-org/celo-blockchain/blob/master/core/types/istanbul.go

const ISTANBUL_EXTRA_VANITY_BYTES = 32

export type Bitmap = BigNumber

// Aggregated BLS signatures for a block.
export interface Seal {
  bitmap: Bitmap
  signature: string
  round: BigNumber
}

// Extra data in the block header to support Istanbul BFT.
export interface IstanbulExtra {
  addedValidators: Address[]
  addedValidatorsPublicKeys: string[]
  removedValidators: Bitmap
  seal: string
  aggregatedSeal: Seal
  parentAggregatedSeal: Seal
}

function bigNumberFromBuffer(data: Buffer): BigNumber {
  return new BigNumber('0x' + (data.toString('hex') || '0'), 16)
}

function sealFromBuffers(data: Buffer[]): Seal {
  return {
    bitmap: bigNumberFromBuffer(data[0]),
    signature: '0x' + data[1].toString('hex'),
    round: bigNumberFromBuffer(data[2]),
  }
}

// Parse RLP encoded block extra data into an IstanbulExtra object.
export function parseBlockExtraData(data: string): IstanbulExtra {
  const buffer = Buffer.from(data.replace(/^0x/, ''), 'hex')
  const rlpHex = ('0x' + buffer.subarray(ISTANBUL_EXTRA_VANITY_BYTES).toString('hex')) as Hex
  const decode = fromRlp(rlpHex, 'bytes') as Uint8Array[]

  return {
    addedValidators: (decode[0] as unknown as Uint8Array[]).map((addr) =>
      getAddress(bytesToHex(addr))
    ),
    addedValidatorsPublicKeys: (decode[1] as unknown as Uint8Array[]).map(
      (key) => '0x' + Buffer.from(key).toString('hex')
    ),
    removedValidators: bigNumberFromBuffer(Buffer.from(decode[2])),
    seal: '0x' + Buffer.from(decode[3]).toString('hex'),
    aggregatedSeal: sealFromBuffers(
      (decode[4] as unknown as Uint8Array[]).map((b) => Buffer.from(b))
    ),
    parentAggregatedSeal: sealFromBuffers(
      (decode[5] as unknown as Uint8Array[]).map((b) => Buffer.from(b))
    ),
  }
}

export function bitIsSet(bitmap: Bitmap, index: number): boolean {
  if (index < 0) {
    throw new Error(`bit index must be greater than zero: got ${index}`)
  }
  return bitmap
    .idiv('1' + '0'.repeat(index), 2)
    .mod(2)
    .gt(0)
}

export const IstanbulUtils = {
  parseBlockExtraData,
  bitIsSet,
}
