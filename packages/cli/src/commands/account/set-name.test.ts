import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Register from '../account/register'
import SetName from './set-name'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('account:set-name cmd', (web3: Web3) => {
  test('can set the name of an account', async () => {
    const accounts = await web3.eth.getAccounts()
    await testLocallyWithWeb3Node(Register, ['--from', accounts[0]], web3)
    await testLocallyWithWeb3Node(SetName, ['--account', accounts[0], '--name', 'TestName'], web3)
  })

  test('fails if account is not registered', async () => {
    const accounts = await web3.eth.getAccounts()

    await expect(
      testLocallyWithWeb3Node(SetName, ['--account', accounts[0], '--name', 'TestName'], web3)
    ).rejects.toThrow("Some checks didn't pass!")
  })

  test('fails if account is not provided', async () => {
    await expect(testLocallyWithWeb3Node(SetName, ['--name', 'TestName'], web3)).rejects.toThrow(
      'Missing required flag'
    )
  })

  test('fails if name is not provided', async () => {
    const accounts = await web3.eth.getAccounts()

    await expect(
      testLocallyWithWeb3Node(SetName, ['--account', accounts[0]], web3)
    ).rejects.toThrow('Missing required flag')
  })
})
