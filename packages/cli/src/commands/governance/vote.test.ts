import { StrongAddress } from '@celo/base'
import { newKitFromProvider } from '@celo/contractkit'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import BigNumber from 'bignumber.js'
import { changeMultiSigOwner } from '../../test-utils/chain-setup'
import { testLocallyWithNode } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from '../lockedcelo/lock'
import Approve from './approve'
import Dequeue from './dequeue'
import Vote from './vote'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('governance:vote cmd', (provider) => {
  let minDeposit: string
  const kit = newKitFromProvider(provider)
  const proposalID = new BigNumber(1)

  let accounts: StrongAddress[] = []
  let governance: GovernanceWrapper

  beforeEach(async () => {
    accounts = (await kit.connection.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]
    governance = await kit.contracts.getGovernance()
    minDeposit = (await governance.minDeposit()).toFixed()
    await governance.propose([], 'URL', { from: accounts[0], value: minDeposit })
    const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()
    await timeTravel(dequeueFrequency, provider)
    await testLocallyWithNode(Dequeue, ['--from', accounts[0]], provider)
    await changeMultiSigOwner(kit, accounts[0])
    await testLocallyWithNode(
      Approve,
      ['--from', accounts[0], '--proposalID', proposalID.toString(10), '--useMultiSig'],
      provider
    )
    await testLocallyWithNode(Register, ['--from', accounts[0]], provider)
    await testLocallyWithNode(Lock, ['--from', accounts[0], '--value', '100'], provider)
  })

  test('can vote yes', async () => {
    await testLocallyWithNode(
      Vote,
      ['--from', accounts[0], '--proposalID', proposalID.toString(10), '--value', 'Yes'],
      provider
    )
    const votes = await governance.getVotes(proposalID)
    expect(votes.Yes.toNumber()).toEqual(100)
  })
})
