import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { testLocallyWithNode } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Delegate from './delegate'
import DelegateInfo from './delegate-info'
import Lock from './lock'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('lockedgold:delegate-info cmd', (client) => {
  test('gets the info', async () => {
    const kit = newKitFromProvider(client.currentProvider)
    const accounts = await kit.connection.getAccounts()
    const account = accounts[0]
    const account2 = accounts[1]
    await testLocallyWithNode(Register, ['--from', account], client)
    await testLocallyWithNode(Register, ['--from', account2], client)
    await testLocallyWithNode(Lock, ['--from', account, '--value', '200'], client)

    await testLocallyWithNode(
      Delegate,
      ['--from', account, '--to', account2, '--percent', '100'],
      client
    )

    await testLocallyWithNode(DelegateInfo, ['--account', account], client)
  })
})
