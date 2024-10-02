import { StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { timeTravel } from '@celo/dev-utils/lib/ganache-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from '../lockedgold/lock'
import Dequeue from './dequeue'
import Upvote from './upvote'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL1('governance:upvote cmd', (web3: Web3) => {
  let minDeposit: string
  const kit = newKitFromWeb3(web3)
  const proposalID = new BigNumber(1)
  const proposalID2 = new BigNumber(2)
  const proposalID3 = new BigNumber(3)
  const proposalID4 = new BigNumber(4)
  const proposalID5 = new BigNumber(5)

  let accounts: StrongAddress[] = []
  let governance: GovernanceWrapper

  beforeEach(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]
    governance = await kit.contracts.getGovernance()
    minDeposit = (await governance.minDeposit()).toFixed()
    const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()

    // If the devchain is published less than dequeueFrequency ago, the tests
    // will fail, so we need to make sure that by calling timeTravel() we will
    // hit the next dequeue
    await timeTravel(dequeueFrequency, web3)

    await governance
      .propose([], 'URL')
      .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })
    // this will reset lastDequeue to now
    // there is 3 concurrent proposals possible to be dequeued
    await testLocallyWithWeb3Node(Dequeue, ['--from', accounts[0]], web3)
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

    await timeTravel(dequeueFrequency, web3)
    await testLocallyWithWeb3Node(Register, ['--from', accounts[0]], web3)
    await testLocallyWithWeb3Node(Lock, ['--from', accounts[0], '--value', '100'], web3)
  })

  test('will dequeue proposal if ready', async () => {
    await testLocallyWithWeb3Node(
      Upvote,
      ['--proposalID', proposalID2.toString(10), '--from', accounts[0]],
      web3
    )

    const queue = await governance.getQueue()
    expect(queue.map((k) => k.proposalID)).toEqual([proposalID5])

    const dequeue = await governance.getDequeue()
    expect(dequeue).toEqual([proposalID, proposalID2, proposalID3, proposalID4])
  })

  test('can upvote proposal which cannot be dequeued', async () => {
    await testLocallyWithWeb3Node(
      Upvote,
      ['--proposalID', proposalID5.toString(10), '--from', accounts[0]],
      web3
    )

    const queue = await governance.getQueue()
    expect(queue).toEqual([{ proposalID: proposalID5, upvotes: new BigNumber(100) }])
  })
})
