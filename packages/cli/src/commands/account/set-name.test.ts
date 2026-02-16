import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { testLocallyWithNode } from '../../test-utils/cliUtils'
import Register from '../account/register'
import SetName from './set-name'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('account:set-name cmd', (client) => {
  test('can set the name of an account', async () => {
    const kit = newKitFromProvider(client.currentProvider)
    const accounts = await kit.connection.getAccounts()
    await testLocallyWithNode(Register, ['--from', accounts[0]], client)
    await testLocallyWithNode(SetName, ['--account', accounts[0], '--name', 'TestName'], client)
  })

  test('fails if account is not registered', async () => {
    const kit = newKitFromProvider(client.currentProvider)
    const accounts = await kit.connection.getAccounts()

    await expect(
      testLocallyWithNode(SetName, ['--account', accounts[0], '--name', 'TestName'], client)
    ).rejects.toThrow("Some checks didn't pass!")
  })

  test('fails if account is not provided', async () => {
    await expect(testLocallyWithNode(SetName, ['--name', 'TestName'], client)).rejects.toThrow(
      'Missing required flag'
    )
  })

  test('fails if name is not provided', async () => {
    const kit = newKitFromProvider(client.currentProvider)
    const accounts = await kit.connection.getAccounts()

    await expect(testLocallyWithNode(SetName, ['--account', accounts[0]], client)).rejects.toThrow(
      'Missing required flag'
    )
  })
})
