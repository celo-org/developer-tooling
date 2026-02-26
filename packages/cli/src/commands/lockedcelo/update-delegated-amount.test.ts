import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { LONG_TIMEOUT_MS, testLocallyWithNode } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Delegate from './delegate'
import Lock from './lock'
import UpdateDelegatedAmount from './update-delegated-amount'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('lockedgold:update-delegated-amount cmd', (providerOwner) => {
  test(
    'can update delegated amount',
    async () => {
      const kit = newKitFromProvider(providerOwner.currentProvider)
      const accounts = await kit.connection.getAccounts()
      const account = accounts[0]
      const account2 = accounts[1]
      await testLocallyWithNode(Register, ['--from', account], providerOwner)
      await testLocallyWithNode(Register, ['--from', account2], providerOwner)
      await testLocallyWithNode(Lock, ['--from', account, '--value', '200'], providerOwner)
      await testLocallyWithNode(
        Delegate,
        ['--from', account, '--to', account2, '--percent', '100'],
        providerOwner
      )

      await testLocallyWithNode(
        UpdateDelegatedAmount,
        ['--from', account, '--to', account2],
        providerOwner
      )
    },
    LONG_TIMEOUT_MS
  )
})
