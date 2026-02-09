import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { LONG_TIMEOUT_MS, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Delegate from './delegate'
import Lock from './lock'
import UpdateDelegatedAmount from './update-delegated-amount'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('lockedgold:update-delegated-amount cmd', (client) => {
  test(
    'can update delegated amount',
    async () => {
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

      await testLocallyWithWeb3Node(
        UpdateDelegatedAmount,
        ['--from', account, '--to', account2],
        client
      )
    },
    LONG_TIMEOUT_MS
  )
})
