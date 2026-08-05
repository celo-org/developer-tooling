import { Address, Hex, zeroAddress } from 'viem'
import { getConfirmationProgress } from './multisig-utils'

// deliberately synthetic addresses, they never touch a chain
const MULTISIG = '0x00000000000000000000000000000000000000A1' as Address
const OWNER_1 = '0x0000000000000000000000000000000000000001' as Hex
const OWNER_2 = '0x0000000000000000000000000000000000000002' as Hex
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
      required: 3n,
      remaining: 2n,
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
      required: 2n,
      remaining: 1n,
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
      required: 3n,
      remaining: 0n,
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
      required: 1n,
      remaining: 0n,
    })
  })
})
