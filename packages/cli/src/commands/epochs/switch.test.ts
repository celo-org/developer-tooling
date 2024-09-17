import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Switch from './switch'

testWithAnvilL2('epochs:switch cmd', (web3) => {
  it('switches epoch successfully', async () => {
    const kit = newKitFromWeb3(web3)
    const accounts = await kit.web3.eth.getAccounts()

    // TODO doesn't work for now
    await testLocallyWithWeb3Node(Switch, ['--from', accounts[0]], web3)
  })
})
