import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { ux } from '@oclif/core'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import {
  LONG_TIMEOUT_MS,
  stripAnsiCodesFromNestedArray,
  testLocallyWithWeb3Node,
} from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from './lock'
import Unlock from './unlock'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('lockedgold:lock cmd', (web3: Web3) => {
  test(
    'can lock with pending withdrawals',
    async () => {
      const accounts = await web3.eth.getAccounts()
      const account = accounts[0]
      const kit = newKitFromWeb3(web3)
      const lockedGold = await kit.contracts.getLockedGold()
      await testLocallyWithWeb3Node(Register, ['--from', account], web3)
      await testLocallyWithWeb3Node(Lock, ['--from', account, '--value', '100'], web3)
      await testLocallyWithWeb3Node(Unlock, ['--from', account, '--value', '50'], web3)
      await testLocallyWithWeb3Node(Lock, ['--from', account, '--value', '75'], web3)
      await testLocallyWithWeb3Node(Unlock, ['--from', account, '--value', '50'], web3)
      await testLocallyWithWeb3Node(Lock, ['--from', account, '--value', '50'], web3)
      const pendingWithdrawalsTotalValue = await lockedGold.getPendingWithdrawalsTotalValue(account)
      expect(pendingWithdrawalsTotalValue.toFixed()).toBe('0')
    },
    LONG_TIMEOUT_MS
  )
  describe('when EOA is not yet an account', () => {
    it('performs the registration and locks the value', async () => {
      const eoaAddresses = await web3.eth.getAccounts()
      const eoa = eoaAddresses[1]
      const kit = newKitFromWeb3(web3)
      const accountsContract = await kit.contracts.getAccounts()
      const lockedGoldContract = await kit.contracts.getLockedGold()

      const logSpy = jest.spyOn(console, 'log')
      const actionSpy = jest.spyOn(ux.action, 'stop')

      // pre check
      expect(await accountsContract.isAccount(eoa)).toBe(false)

      await testLocallyWithWeb3Node(Lock, ['--from', eoa, '--value', '100'], web3)

      expect(stripAnsiCodesFromNestedArray(logSpy.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  Value [100] is > 0 ",
          ],
          [
            "All checks passed",
          ],
          [
            "Address will be registered with Account contract to enable locking.",
          ],
          [
            "SendTransaction: register",
          ],
          [
            "txHash: 0xtxhash",
          ],
          [
            "Running Checks:",
          ],
          [
            "   ✔  Account has at least 0.0000000000000001 CELO ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: lock",
          ],
          [
            "txHash: 0xtxhash",
          ],
        ]
      `)

      expect(actionSpy.mock.calls).toMatchInlineSnapshot(`
        [
          [],
          [],
          [],
        ]
      `)

      expect(await accountsContract.isAccount(eoa)).toBe(true)

      expect(await lockedGoldContract.getAccountTotalLockedGold(eoa)).toEqBigNumber(
        new BigNumber('100')
      )
    })
  })
})
