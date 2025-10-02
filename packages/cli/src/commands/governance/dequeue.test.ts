import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Dequeue from './dequeue'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('governance:dequeue cmd', (web3: Web3) => {
  it('does not dequeue anything if no proposals are ready', async () => {
    const kit = newKitFromWeb3(web3)
    const [account] = await web3.eth.getAccounts()
    const governanceWrapper = await kit.contracts.getGovernance()
    const minDeposit = (await governanceWrapper.minDeposit()).toFixed()

    // Initially both queues should be empty
    const initialQueue = await governanceWrapper.getQueue()
    const initialDequeue = await governanceWrapper.getDequeue()
    expect(initialQueue).toEqual([])
    expect(initialDequeue).toEqual([])

    // Create first proposal
    await governanceWrapper
      .propose([], 'URL')
      .sendAndWaitForReceipt({ from: account, value: minDeposit })

    // Run dequeue operation
    await testLocallyWithWeb3Node(Dequeue, ['--from', account], web3)

    // After first dequeue, we should have either proposal dequeued or still in queue
    const afterFirstDequeue = await governanceWrapper.getDequeue()
    const afterFirstQueue = await governanceWrapper.getQueue()
    const totalProposals = afterFirstDequeue.length + afterFirstQueue.length
    expect(totalProposals).toBe(1) // Should have exactly 1 proposal in system

    // Create second proposal
    await governanceWrapper
      .propose([], 'URL2')
      .sendAndWaitForReceipt({ from: account, value: minDeposit })

    // Run dequeue again
    await testLocallyWithWeb3Node(Dequeue, ['--from', account], web3)

    // After second dequeue, we should have 2 total proposals in the system
    const finalDequeue = await governanceWrapper.getDequeue()
    const finalQueue = await governanceWrapper.getQueue()
    const finalTotalProposals = finalDequeue.length + finalQueue.length
    expect(finalTotalProposals).toBe(2) // Should have exactly 2 proposals in system
  })

  it('dequeues proposals after time has passed', async () => {
    const kit = newKitFromWeb3(web3)
    const [account] = await web3.eth.getAccounts()
    const governanceWrapper = await kit.contracts.getGovernance()
    const minDeposit = (await governanceWrapper.minDeposit()).toFixed()
    const dequeueFrequency = (await governanceWrapper.dequeueFrequency()).toNumber()

    // Initially both queues should be empty
    expect(await governanceWrapper.getQueue()).toEqual([])
    expect(await governanceWrapper.getDequeue()).toEqual([])

    // Create first proposal
    await governanceWrapper
      .propose([], 'URL')
      .sendAndWaitForReceipt({ from: account, value: minDeposit })

    // Run dequeue immediately (should not dequeue due to timing)
    await testLocallyWithWeb3Node(Dequeue, ['--from', account], web3)

    // Should have 1 proposal total in the system
    const afterFirstDequeue = await governanceWrapper.getDequeue()
    const afterFirstQueue = await governanceWrapper.getQueue()
    expect(afterFirstDequeue.length + afterFirstQueue.length).toBe(1)

    // Create second proposal
    await governanceWrapper
      .propose([], 'URL2')
      .sendAndWaitForReceipt({ from: account, value: minDeposit })

    // Advance time to allow dequeuing
    await timeTravel(dequeueFrequency + 1, web3)

    // Now dequeue should work
    await testLocallyWithWeb3Node(Dequeue, ['--from', account], web3)

    // Should have 2 proposals total, and some should be dequeued
    const finalDequeue = await governanceWrapper.getDequeue()
    const finalQueue = await governanceWrapper.getQueue()
    expect(finalDequeue.length + finalQueue.length).toBe(2)
    expect(finalDequeue.length).toBeGreaterThan(0) // At least some proposals should be dequeued
  })
})
