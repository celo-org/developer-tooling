import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { testLocallyWithNode } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Delegate from './delegate'
import Lock from './lock'
import RevokeDelegate from './revoke-delegate'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('lockedgold:revoke-delegate cmd', (providerOwner) => {
  test('can revoke delegate', async () => {
    const kit = newKitFromProvider(providerOwner.currentProvider)
    const accounts = await kit.connection.getAccounts()
    const account = accounts[0]
    const account2 = accounts[1]
    const lockedGold = await kit.contracts.getLockedGold()
    await testLocallyWithNode(Register, ['--from', account], providerOwner)
    await testLocallyWithNode(Register, ['--from', account2], providerOwner)
    await testLocallyWithNode(Lock, ['--from', account, '--value', '200'], providerOwner)

    await testLocallyWithNode(
      Delegate,
      ['--from', account, '--to', account2, '--percent', '100'],
      providerOwner
    )

    const account2VotingPower = await lockedGold.getAccountTotalGovernanceVotingPower(account2)
    expect(account2VotingPower.toFixed()).toBe('200')

    await testLocallyWithNode(
      RevokeDelegate,
      ['--from', account, '--to', account2, '--percent', '100'],
      providerOwner
    )

    const account2VotingPowerAfterRevoke =
      await lockedGold.getAccountTotalGovernanceVotingPower(account2)
    expect(account2VotingPowerAfterRevoke.toFixed()).toBe('0')
  })
})
