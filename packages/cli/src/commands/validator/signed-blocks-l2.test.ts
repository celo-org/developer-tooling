import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import ValidatorSignedBlocks from './signed-blocks'

process.env.NO_SYNCCHECK = 'true'

const KNOWN_DEVCHAIN_VALIDATOR = '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f'

testWithAnvilL2('validator:signed-blocks', (web3: Web3) => {
  it('shows unsupported message ', async () => {
    await expect(
      testLocallyWithWeb3Node(ValidatorSignedBlocks, ['--signer', KNOWN_DEVCHAIN_VALIDATOR], web3)
    ).rejects.toMatchInlineSnapshot(
      `[Error: This command is not available on L2 and might be removed in the future]`
    )
  })
})
