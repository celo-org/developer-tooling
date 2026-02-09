import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Delegate from './delegate'
import DelegateInfo from './delegate-info'
import Lock from './lock'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('lockedgold:delegate-info cmd', (client) => {
  test('gets the info', async () => {
    const accounts = await client.eth.getAccounts()
    const account = accounts[0]
    const account2 = accounts[1]
    await testLocallyWithWeb3Node(Register, ['--from', account], client)
    await testLocallyWithWeb3Node(Register, ['--from', account2], client)
    await testLocallyWithWeb3Node(Lock, ['--from', account, '--value', '200'], client)

    await testLocallyWithWeb3Node(
      Delegate,
      ['--from', account, '--to', account2, '--percent', '100'],
      client
    )

    await testLocallyWithWeb3Node(DelegateInfo, ['--account', account], client)
  })
})
