import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { timeTravel } from '@celo/dev-utils/lib/ganache-test'
import BigNumber from 'bignumber.js'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import ProcessGroups from './process-groups'
import Start from './start'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('epochs:process-groups cmd', (web3) => {
  it('Warns when epoch process is not yet started', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromWeb3(web3)
    const accounts = await kit.web3.eth.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)

    await expect(
      testLocallyWithWeb3Node(ProcessGroups, ['--from', accounts[0]], web3)
    ).rejects.toMatchInlineSnapshot(`[Error: Epoch process is not started yet]`)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`[]`)
  })

  it('processes groups and finishes epoch process successfully when epoch process not started', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromWeb3(web3)
    const accounts = await kit.web3.eth.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const epochDuration = new BigNumber(await epochManagerWrapper.epochDuration())

    await timeTravel(epochDuration.plus(1).toNumber(), web3)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(await epochManagerWrapper.isTimeForNextEpoch()).toEqual(true)

    await testLocallyWithWeb3Node(Start, ['--from', accounts[0]], web3)
    await testLocallyWithWeb3Node(ProcessGroups, ['--from', accounts[0]], web3)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(5)
    expect(await epochManagerWrapper.isTimeForNextEpoch()).toEqual(false)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "SendTransaction: startNextEpoch",
        ],
        [
          "txHash: 0xtxhash",
        ],
        [
          "SendTransaction: setToProcessGroups",
        ],
        [
          "txHash: 0xtxhash",
        ],
        [
          "SendTransaction: processGroups",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)
  })

  it('processes groups and finishes epoch process successfully when a single group is processed individually', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromWeb3(web3)
    const [from] = await kit.web3.eth.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const validatorsWrapper = await kit.contracts.getValidators()
    const epochDuration = new BigNumber(await epochManagerWrapper.epochDuration())

    await timeTravel(epochDuration.plus(1).toNumber(), web3)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(await epochManagerWrapper.isTimeForNextEpoch()).toEqual(true)

    const [electedValidator] = await epochManagerWrapper.getElectedAccounts()
    const electedGroup = await validatorsWrapper.getValidatorsGroup(electedValidator)

    // Following lines simulate a scenario where someone calls processGroup() for their own group(s)
    // previously starting epoch process and calling setToProcessGroups() for individual processing
    await epochManagerWrapper.startNextEpochProcess().sendAndWaitForReceipt({ from })
    // @ts-expect-error we're accessing a private property
    await epochManagerWrapper.contract.methods.setToProcessGroups().send({ from })
    const [lessers, greaters] = await epochManagerWrapper.getLessersAndGreaters([electedGroup])
    // TODO is this lessers/greaters here even correct?
    // @ts-expect-error we're accessing a private property
    await epochManagerWrapper.contract.methods
      .processGroup(electedGroup, lessers[0], greaters[0])
      .send({ from })

    await testLocallyWithWeb3Node(ProcessGroups, ['--from', from], web3)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(5)
    expect(await epochManagerWrapper.isTimeForNextEpoch()).toEqual(false)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "SendTransaction: processGroups",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)
  })
})
