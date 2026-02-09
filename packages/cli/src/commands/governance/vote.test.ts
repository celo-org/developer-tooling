import { StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import BigNumber from 'bignumber.js'
import { changeMultiSigOwner } from '../../test-utils/chain-setup'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from '../lockedcelo/lock'
import Approve from './approve'
import Dequeue from './dequeue'
import Vote from './vote'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('governance:vote cmd', (client) => {
  let minDeposit: string
  const kit = newKitFromWeb3(client)
  const proposalID = new BigNumber(1)

  let accounts: StrongAddress[] = []
  let governance: GovernanceWrapper

  beforeEach(async () => {
    accounts = (await client.eth.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]
    governance = await kit.contracts.getGovernance()
    minDeposit = (await governance.minDeposit()).toFixed()
    await governance
      .propose([], 'URL')
      .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })
    const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()
    await timeTravel(dequeueFrequency, client)
    await testLocallyWithWeb3Node(Dequeue, ['--from', accounts[0]], client)
    await changeMultiSigOwner(kit, accounts[0])
    await testLocallyWithWeb3Node(
      Approve,
      ['--from', accounts[0], '--proposalID', proposalID.toString(10), '--useMultiSig'],
      client
    )
    await testLocallyWithWeb3Node(Register, ['--from', accounts[0]], client)
    await testLocallyWithWeb3Node(Lock, ['--from', accounts[0], '--value', '100'], client)
  })

  test('can vote yes', async () => {
    await testLocallyWithWeb3Node(
      Vote,
      ['--from', accounts[0], '--proposalID', proposalID.toString(10), '--value', 'Yes'],
      client
    )
    const votes = await governance.getVotes(proposalID)
    expect(votes.Yes.toNumber()).toEqual(100)
  })
})
