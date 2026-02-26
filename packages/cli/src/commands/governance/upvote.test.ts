import { StrongAddress } from '@celo/base'
import { newKitFromProvider } from '@celo/contractkit'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import BigNumber from 'bignumber.js'
import { testLocallyWithNode } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from '../lockedcelo/lock'
import Dequeue from './dequeue'
import Upvote from './upvote'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('governance:upvote cmd', (provider) => {
  let minDeposit: string
  const kit = newKitFromProvider(provider)
  const proposalID = new BigNumber(1)
  const proposalID2 = new BigNumber(2)
  const proposalID3 = new BigNumber(3)
  const proposalID4 = new BigNumber(4)
  const proposalID5 = new BigNumber(5)

  let accounts: StrongAddress[] = []
  let governance: GovernanceWrapper

  beforeEach(async () => {
    accounts = (await kit.connection.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]
    governance = await kit.contracts.getGovernance()
    minDeposit = (await governance.minDeposit()).toFixed()
    const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()

    // If the devchain is published less than dequeueFrequency ago, the tests
    // will fail, so we need to make sure that by calling timeTravel() we will
    // hit the next dequeue
    await timeTravel(dequeueFrequency, provider)

    await governance
      .propose([], 'URL')
      .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })
    // this will reset lastDequeue to now
    // there is 3 concurrent proposals possible to be dequeued
    await testLocallyWithNode(Dequeue, ['--from', accounts[0]], provider)
    await governance
      .propose([], 'URL2')
      .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })
    await governance
      .propose([], 'URL3')
      .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })
    await governance
      .propose([], 'URL4')
      .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })
    await governance
      .propose([], 'URL5')
      .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })

    await timeTravel(dequeueFrequency, provider)
    await testLocallyWithNode(Register, ['--from', accounts[0]], provider)
    await testLocallyWithNode(Lock, ['--from', accounts[0], '--value', '100'], provider)
  })

  test('will dequeue proposal if ready', async () => {
    await testLocallyWithNode(
      Upvote,
      ['--proposalID', proposalID2.toString(10), '--from', accounts[0]],
      provider
    )

    const queue = await governance.getQueue()
    expect(queue.map((k) => k.proposalID)).toEqual([proposalID5])

    const dequeue = await governance.getDequeue()
    expect(dequeue).toEqual([proposalID, proposalID2, proposalID3, proposalID4])
  })

  test('can upvote proposal which cannot be dequeued', async () => {
    await testLocallyWithNode(
      Upvote,
      ['--proposalID', proposalID5.toString(10), '--from', accounts[0]],
      provider
    )

    const queue = await governance.getQueue()
    expect(queue).toEqual([{ proposalID: proposalID5, upvotes: new BigNumber(100) }])
  })
})
