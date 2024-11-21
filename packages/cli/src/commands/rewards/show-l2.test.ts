import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Show from './show'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('rewards:show cmd', (web3: Web3) => {
  beforeEach(async () => {
    jest.clearAllMocks()
  })

  test.failing('default', async () => {
    await expect(testLocallyWithWeb3Node(Show, [], web3)).resolves.not.toBeUndefined()
  })
})
