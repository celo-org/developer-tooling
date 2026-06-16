import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { LONG_TIMEOUT_MS, testLocallyWithNode } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from './lock'
import Unlock from './unlock'
import Withdraw from './withdraw'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('lockedcelo:withdraw cmd', (provider) => {
  it(
    'exits without hanging when there are no available withdrawals',
    async () => {
      const kit = newKitFromProvider(provider)
      const [account] = await kit.connection.getAccounts()
      await testLocallyWithNode(Register, ['--from', account], provider)
      await testLocallyWithNode(Lock, ['--from', account, '--value', '100'], provider)
      // create a pending withdrawal that is NOT yet available (unlocking period not elapsed)
      await testLocallyWithNode(Unlock, ['--from', account, '--value', '50'], provider)

      // Regression: withdraw used to spin in an infinite `while (!madeWithdrawal)`
      // loop when nothing was available. It must return promptly instead.
      await expect(
        testLocallyWithNode(Withdraw, ['--from', account], provider)
      ).resolves.toBeUndefined()
    },
    LONG_TIMEOUT_MS
  )
})
