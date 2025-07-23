import { testLocally } from '../../test-utils/cliUtils'
import ProposeMultiSig from './propose'

process.env.NO_SYNCCHECK = 'true'

// Simple validation tests - integration tests would require a deployed multisig
describe('multisig:propose cmd', () => {
  test('should fail with invalid data format', async () => {
    await expect(
      testLocally(ProposeMultiSig, [
        '0x5409ed021d9299bf6814279a6a1411a7e866a631',
        '--from',
        '0x5409ed021d9299bf6814279a6a1411a7e866a631',
        '--to',
        '0x5409ed021d9299bf6814279a6a1411a7e866a631',
        '--data',
        'invalid-hex', // Missing 0x prefix
      ])
    ).rejects.toThrow('Transaction data must be hex encoded and start with 0x')
  })

  test('should fail with invalid value', async () => {
    await expect(
      testLocally(ProposeMultiSig, [
        '0x5409ed021d9299bf6814279a6a1411a7e866a631',
        '--from',
        '0x5409ed021d9299bf6814279a6a1411a7e866a631',
        '--to',
        '0x5409ed021d9299bf6814279a6a1411a7e866a631',
        '--value',
        'not-a-number',
      ])
    ).rejects.toThrow('Value must be a valid number (in wei)')
  })
})
