import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import BigNumber from 'bignumber.js'
import { stripAnsiCodesFromNestedArray, testLocallyWithNode } from '../../test-utils/cliUtils'
import ProcessGroups from './process-groups'
import Start from './start'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('epochs:process-groups cmd', (providerOwner) => {
  it('Warns when epoch process is not yet started', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromProvider(providerOwner.currentProvider)
    const accounts = await kit.connection.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)

    await expect(
      testLocallyWithNode(ProcessGroups, ['--from', accounts[0]], providerOwner)
    ).resolves.toMatchInlineSnapshot(`"Epoch process is not started yet"`)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`[]`)
  })

  it('processes groups and finishes epoch process successfully when epoch process not started', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromProvider(providerOwner.currentProvider)
    const accounts = await kit.connection.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const epochDuration = new BigNumber(await epochManagerWrapper.epochDuration())

    await timeTravel(epochDuration.plus(1).toNumber(), providerOwner)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(await epochManagerWrapper.isTimeForNextEpoch()).toEqual(true)

    await testLocallyWithNode(Start, ['--from', accounts[0]], providerOwner)
    await testLocallyWithNode(ProcessGroups, ['--from', accounts[0]], providerOwner)

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
    const kit = newKitFromProvider(providerOwner.currentProvider)
    const [from] = await kit.connection.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const validatorsWrapper = await kit.contracts.getValidators()
    const epochDuration = new BigNumber(await epochManagerWrapper.epochDuration())

    await timeTravel(epochDuration.plus(1).toNumber(), providerOwner)

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

    // Making sure the group has not been processed yet
    expect(
      // @ts-ignore accessing a private property
      await epochManagerWrapper.contract.methods.processedGroups(electedGroup).call()
    ).not.toEqual('0')

    // @ts-expect-error we're accessing a private property
    await epochManagerWrapper.contract.methods
      .processGroup(electedGroup, lessers[0], greaters[0])
      .send({ from })

    // Making sure the group has not been processed yet
    // @ts-ignore accessing a private property
    expect(await epochManagerWrapper.contract.methods.processedGroups(electedGroup).call()).toEqual(
      '0'
    )

    await testLocallyWithNode(ProcessGroups, ['--from', from], providerOwner)

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
