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
import VotePartially from './votePartially'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('governance:vote-partially cmd', (client) => {
  let minDeposit: string
  const kit = newKitFromProvider(client.currentProvider)
  const proposalID = new BigNumber(1)

  let accounts: StrongAddress[] = []
  let governance: GovernanceWrapper

  beforeEach(async () => {
    accounts = (await kit.connection.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]
    governance = await kit.contracts.getGovernance()
    minDeposit = (await governance.minDeposit()).toFixed()
    await governance
      .propose([], 'URL')
      .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })
    const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()
    await timeTravel(dequeueFrequency + 1, client)
    await testLocallyWithNode(Dequeue, ['--from', accounts[0]], client)
    await changeMultiSigOwner(kit, accounts[0])
    await testLocallyWithNode(
      Approve,
      ['--from', accounts[0], '--proposalID', proposalID.toString(10), '--useMultiSig'],
      client
    )
    await testLocallyWithNode(Register, ['--from', accounts[0]], client)
    await testLocallyWithNode(Lock, ['--from', accounts[0], '--value', '100'], client)
  })

  test('can vote partially yes and no', async () => {
    await testLocallyWithNode(
      VotePartially,
      [
        '--from',
        accounts[0],
        '--proposalID',
        proposalID.toString(10),
        '--yes',
        '10',
        '--no',
        '20',
        '--abstain',
        '0',
      ],
      client
    )
    const votes = await governance.getVotes(proposalID)
    expect(votes.Yes.toNumber()).toEqual(10)
    expect(votes.No.toNumber()).toEqual(20)
  })
})
