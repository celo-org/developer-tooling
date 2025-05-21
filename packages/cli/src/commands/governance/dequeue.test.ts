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

    expect(await governanceWrapper.getQueue()).toMatchInlineSnapshot(`[]`)
    expect(await governanceWrapper.getDequeue()).toMatchInlineSnapshot(`[]`)

    await governanceWrapper
      .propose([], 'URL')
      .sendAndWaitForReceipt({ from: account, value: minDeposit })

    // This sets lastDequeue to now
    await testLocallyWithWeb3Node(Dequeue, ['--from', account], web3)

    expect(await governanceWrapper.getDequeue()).toMatchInlineSnapshot(`
      [
        "1",
      ]
    `)
    expect(await governanceWrapper.getQueue()).toMatchInlineSnapshot(`[]`)

    await governanceWrapper
      .propose([], 'URL2')
      .sendAndWaitForReceipt({ from: account, value: minDeposit })

    // This should have no effect on dequeue because time (dequeueFrequency) has not passed
    await testLocallyWithWeb3Node(Dequeue, ['--from', account], web3)

    expect(await governanceWrapper.getDequeue()).toMatchInlineSnapshot(`
      [
        "1",
      ]
    `)
    expect(await governanceWrapper.getQueue()).toMatchInlineSnapshot(`
      [
        {
          "proposalID": "2",
          "upvotes": "0",
        },
      ]
    `)
  })

  it('does not dequeue anything if no proposals are ready', async () => {
    const kit = newKitFromWeb3(web3)
    const [account] = await web3.eth.getAccounts()
    const governanceWrapper = await kit.contracts.getGovernance()
    const minDeposit = (await governanceWrapper.minDeposit()).toFixed()
    const dequeueFrequency = (await governanceWrapper.dequeueFrequency()).toNumber()

    expect(await governanceWrapper.getQueue()).toMatchInlineSnapshot(`[]`)
    expect(await governanceWrapper.getDequeue()).toMatchInlineSnapshot(`[]`)

    await governanceWrapper
      .propose([], 'URL')
      .sendAndWaitForReceipt({ from: account, value: minDeposit })

    // This sets lastDequeue to now
    await testLocallyWithWeb3Node(Dequeue, ['--from', account], web3)

    expect(await governanceWrapper.getDequeue()).toMatchInlineSnapshot(`
      [
        "1",
      ]
    `)
    expect(await governanceWrapper.getQueue()).toMatchInlineSnapshot(`[]`)

    await governanceWrapper
      .propose([], 'URL2')
      .sendAndWaitForReceipt({ from: account, value: minDeposit })

    await timeTravel(dequeueFrequency + 1, web3)

    // Time (dequeueFrequency) has passed, so the proposal should be dequeued
    await testLocallyWithWeb3Node(Dequeue, ['--from', account], web3)

    expect(await governanceWrapper.getDequeue()).toMatchInlineSnapshot(`
      [
        "1",
        "2",
      ]
    `)
    expect(await governanceWrapper.getQueue()).toMatchInlineSnapshot(`[]`)
  })
})
