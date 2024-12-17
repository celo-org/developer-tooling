import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Delegate from './delegate'
import Lock from './lock'
import RevokeDelegate from './revoke-delegate'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL1('lockedgold:revoke-delegate cmd', (web3: Web3) => {
  test('can revoke delegate', async () => {
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    const account2 = accounts[1]
    const kit = newKitFromWeb3(web3)
    const lockedGold = await kit.contracts.getLockedGold()
    await testLocallyWithWeb3Node(Register, ['--from', account], web3)
    await testLocallyWithWeb3Node(Register, ['--from', account2], web3)
    await testLocallyWithWeb3Node(Lock, ['--from', account, '--value', '200'], web3)

    await testLocallyWithWeb3Node(
      Delegate,
      ['--from', account, '--to', account2, '--percent', '100'],
      web3
    )

    const account2VotingPower = await lockedGold.getAccountTotalGovernanceVotingPower(account2)
    expect(account2VotingPower.toFixed()).toBe('200')

    await testLocallyWithWeb3Node(
      RevokeDelegate,
      ['--from', account, '--to', account2, '--percent', '100'],
      web3
    )

    const account2VotingPowerAfterRevoke =
      await lockedGold.getAccountTotalGovernanceVotingPower(account2)
    expect(account2VotingPowerAfterRevoke.toFixed()).toBe('0')
  })
})
