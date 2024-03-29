import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import Web3 from 'web3'
import { LONG_TIMEOUT_MS, testLocally } from '../../test-utils/cliUtils'
import Register from '../account/register'
import SetName from './set-name'

process.env.NO_SYNCCHECK = 'true'

testWithGanache('account:set-name cmd', (web3: Web3) => {
  test(
    'can set the name of an account',
    async () => {
      const accounts = await web3.eth.getAccounts()
      await testLocally(Register, ['--from', accounts[0]])
      await testLocally(SetName, ['--account', accounts[0], '--name', 'TestName'])
    },
    LONG_TIMEOUT_MS
  )

  test(
    'fails if account is not registered',
    async () => {
      const accounts = await web3.eth.getAccounts()

      await expect(
        testLocally(SetName, ['--account', accounts[0], '--name', 'TestName'])
      ).rejects.toThrow("Some checks didn't pass!")
    },
    LONG_TIMEOUT_MS
  )

  test(
    'fails if account is not provided',
    async () => {
      await expect(testLocally(SetName, ['--name', 'TestName'])).rejects.toThrow(
        'Missing required flag account'
      )
    },
    LONG_TIMEOUT_MS
  )

  test(
    'fails if name is not provided',
    async () => {
      const accounts = await web3.eth.getAccounts()

      await expect(testLocally(SetName, ['--account', accounts[0]])).rejects.toThrow(
        'Missing required flag name'
      )
    },
    LONG_TIMEOUT_MS
  )
})
