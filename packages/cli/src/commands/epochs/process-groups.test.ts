import { decodeFunctionResult, encodeFunctionData } from 'viem'
import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import BigNumber from 'bignumber.js'
import { stripAnsiCodesFromNestedArray, testLocallyWithNode } from '../../test-utils/cliUtils'
import ProcessGroups from './process-groups'
import Start from './start'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('epochs:process-groups cmd', (provider) => {
  it('Warns when epoch process is not yet started', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromProvider(provider)
    const accounts = await kit.connection.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)

    await expect(
      testLocallyWithNode(ProcessGroups, ['--from', accounts[0]], provider)
    ).resolves.toMatchInlineSnapshot(`"Epoch process is not started yet"`)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`[]`)
  })

  it('processes groups and finishes epoch process successfully when epoch process not started', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromProvider(provider)
    const accounts = await kit.connection.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const epochDuration = new BigNumber(await epochManagerWrapper.epochDuration())

    await timeTravel(epochDuration.plus(1).toNumber(), provider)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(await epochManagerWrapper.isTimeForNextEpoch()).toEqual(true)

    await testLocallyWithNode(Start, ['--from', accounts[0]], provider)
    await testLocallyWithNode(ProcessGroups, ['--from', accounts[0]], provider)

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
  }, 60000)

  it('processes groups and finishes epoch process successfully when a single group is processed individually', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromProvider(provider)
    const [from] = await kit.connection.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const validatorsWrapper = await kit.contracts.getValidators()
    const epochDuration = new BigNumber(await epochManagerWrapper.epochDuration())

    await timeTravel(epochDuration.plus(1).toNumber(), provider)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(await epochManagerWrapper.isTimeForNextEpoch()).toEqual(true)

    const [electedValidator] = await epochManagerWrapper.getElectedAccounts()
    const electedGroup = await validatorsWrapper.getValidatorsGroup(electedValidator)

    // Following lines simulate a scenario where someone calls processGroup() for their own group(s)
    // previously starting epoch process and calling setToProcessGroups() for individual processing
    await epochManagerWrapper.startNextEpochProcess({ from })
    const setToProcessData = encodeFunctionData({
      // @ts-expect-error we're accessing a private property
      abi: epochManagerWrapper.contract.abi,
      functionName: 'setToProcessGroups',
      args: [],
    })
    await kit.connection.sendTransaction({
      // @ts-expect-error we're accessing a private property
      to: epochManagerWrapper.contract.address,
      data: setToProcessData,
      from,
    })
    const [lessers, greaters] = await epochManagerWrapper.getLessersAndGreaters([electedGroup])

    // Making sure the group has not been processed yet
    const processedCallData = encodeFunctionData({
      // @ts-ignore accessing a private property
      abi: epochManagerWrapper.contract.abi,
      functionName: 'processedGroups',
      args: [electedGroup as `0x${string}`],
    })
    const { data: processedResultData } = await kit.connection.viemClient.call({
      // @ts-ignore accessing a private property
      to: epochManagerWrapper.contract.address,
      data: processedCallData,
    })
    expect(
      decodeFunctionResult({
        // @ts-ignore accessing a private property
        abi: epochManagerWrapper.contract.abi,
        functionName: 'processedGroups',
        data: processedResultData!,
      })
    ).not.toEqual('0')

    const processGroupData = encodeFunctionData({
      // @ts-expect-error we're accessing a private property
      abi: epochManagerWrapper.contract.abi,
      functionName: 'processGroup',
      args: [
        electedGroup as `0x${string}`,
        lessers[0] as `0x${string}`,
        greaters[0] as `0x${string}`,
      ],
    })
    await kit.connection.sendTransaction({
      // @ts-expect-error we're accessing a private property
      to: epochManagerWrapper.contract.address,
      data: processGroupData,
      from,
    })

    // Making sure the group has not been processed yet
    const processedCallData2 = encodeFunctionData({
      // @ts-ignore accessing a private property
      abi: epochManagerWrapper.contract.abi,
      functionName: 'processedGroups',
      args: [electedGroup as `0x${string}`],
    })
    const { data: processedResultData2 } = await kit.connection.viemClient.call({
      // @ts-ignore accessing a private property
      to: epochManagerWrapper.contract.address,
      data: processedCallData2,
    })
    expect(
      decodeFunctionResult({
        // @ts-ignore accessing a private property
        abi: epochManagerWrapper.contract.abi,
        functionName: 'processedGroups',
        data: processedResultData2!,
      })
    ).toEqual(0n)

    await testLocallyWithNode(ProcessGroups, ['--from', from], provider)

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
  }, 60000)
})
