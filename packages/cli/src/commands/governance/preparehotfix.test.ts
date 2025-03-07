import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import PrepareHotfix from './preparehotfix'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL1('governance:preparehotfix cmd', (web3: Web3) => {
  const HOTFIX_HASH = '0x8ad3719bb2577b277bcafc1f00ac2f1c3fa5e565173303684d0a8d4f3661680c'

  it('fails when preparing a hotfix that does not exist', async () => {
    const [approverAccount] = await web3.eth.getAccounts()

    await expect(
      testLocallyWithWeb3Node(
        PrepareHotfix,
        ['--hash', HOTFIX_HASH, '--from', approverAccount],
        web3
      )
    ).rejects.toMatchInlineSnapshot(`[Error: Some checks didn't pass!]`)
  })
})
