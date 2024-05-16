import { testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Register from './register'

process.env.NO_SYNCCHECK = 'true'

testWithAnvil('account:register cmd', (web3: Web3) => {
  test('can register account', async () => {
    const accounts = await web3.eth.getAccounts()

    await testLocallyWithWeb3Node(
      Register,
      ['--from', accounts[0], '--name', 'Chapulin Colorado'],
      web3
    )
  })

  test('fails if from is missing', async () => {
    await expect(testLocallyWithWeb3Node(Register, [], web3)).rejects.toThrow(
      'Missing required flag'
    )
  })
})
