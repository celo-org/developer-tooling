import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Delegate from './delegate'
import DelegateInfo from './delegate-info'
import Lock from './lock'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL1('lockedgold:delegate-info cmd', (web3: Web3) => {
  test('gets the info', async () => {
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    const account2 = accounts[1]
    await testLocallyWithWeb3Node(Register, ['--from', account], web3)
    await testLocallyWithWeb3Node(Register, ['--from', account2], web3)
    await testLocallyWithWeb3Node(Lock, ['--from', account, '--value', '200'], web3)

    await testLocallyWithWeb3Node(
      Delegate,
      ['--from', account, '--to', account2, '--percent', '100'],
      web3
    )

    await testLocallyWithWeb3Node(DelegateInfo, ['--account', account], web3)
  })
})
