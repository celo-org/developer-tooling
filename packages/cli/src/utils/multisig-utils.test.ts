import { Address, Hex, zeroAddress } from 'viem'
import { getConfirmationProgress } from './multisig-utils'

const MULTISIG = '0x5409ED021D9299bf6814279A6A1411A7e866A631' as Address
const OWNER_1 = '0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb' as Hex
const OWNER_2 = '0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84' as Hex
const THRESHOLDS = { required: 3n, internalRequired: 2n }

const readMultisig = (confirmations: readonly Hex[]) => ({
  getConfirmations: jest.fn().mockResolvedValue(confirmations),
})

describe('getConfirmationProgress', () => {
  it('counts the confirmations still missing against the regular threshold', async () => {
    expect(
      await getConfirmationProgress(
        readMultisig([OWNER_1]),
        0n,
        { destination: zeroAddress, executed: false },
        THRESHOLDS,
        MULTISIG
      )
    ).toEqual({
      confirmations: [OWNER_1],
      confirmationsRequired: 3n,
      confirmationsRemaining: 2n,
    })
  })

  it('uses the internal threshold for transactions the multisig sends to itself', async () => {
    expect(
      await getConfirmationProgress(
        readMultisig([OWNER_1]),
        0n,
        { destination: MULTISIG.toLowerCase() as Address, executed: false },
        THRESHOLDS,
        MULTISIG
      )
    ).toEqual({
      confirmations: [OWNER_1],
      confirmationsRequired: 2n,
      confirmationsRemaining: 1n,
    })
  })

  it('reports nothing remaining once the transaction executed', async () => {
    expect(
      await getConfirmationProgress(
        readMultisig([OWNER_1, OWNER_2]),
        0n,
        { destination: zeroAddress, executed: true },
        THRESHOLDS,
        MULTISIG
      )
    ).toEqual({
      confirmations: [OWNER_1, OWNER_2],
      confirmationsRequired: 3n,
      confirmationsRemaining: 0n,
    })
  })

  it('never reports a negative remainder when the threshold was lowered', async () => {
    expect(
      await getConfirmationProgress(
        readMultisig([OWNER_1, OWNER_2]),
        0n,
        { destination: zeroAddress, executed: false },
        { required: 1n, internalRequired: 1n },
        MULTISIG
      )
    ).toEqual({
      confirmations: [OWNER_1, OWNER_2],
      confirmationsRequired: 1n,
      confirmationsRemaining: 0n,
    })
  })
})
