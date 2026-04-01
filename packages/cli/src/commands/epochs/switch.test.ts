import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import BigNumber from 'bignumber.js'
import { stripAnsiCodesFromNestedArray, testLocallyWithNode } from '../../test-utils/cliUtils'
import Start from './start'
import Switch from './switch'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('epochs:switch cmd', (provider) => {
  it('Warns only when next epoch is not due when switching', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromProvider(provider)
    const accounts = await kit.connection.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    await expect(
      testLocallyWithNode(Switch, ['--from', accounts[0]], provider)
    ).resolves.toMatchInlineSnapshot(`"It is not time for the next epoch yet"`)
    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`[]`)
  })

  it('switches epoch successfully', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromProvider(provider)
    const accounts = await kit.connection.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const epochDuration = new BigNumber(await epochManagerWrapper.epochDuration())

    await timeTravel(epochDuration.plus(1).toNumber(), provider)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(await epochManagerWrapper.isTimeForNextEpoch()).toEqual(true)

    await testLocallyWithNode(Switch, ['--from', accounts[0]], provider)

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
          "SendTransaction: finishNextEpoch",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)
  }, 30000)

  it('switches epoch successfully which already has started process', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromProvider(provider)
    const accounts = await kit.connection.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const epochDuration = new BigNumber(await epochManagerWrapper.epochDuration())

    await timeTravel(epochDuration.plus(1).toNumber(), provider)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(await epochManagerWrapper.isTimeForNextEpoch()).toEqual(true)

    await testLocallyWithNode(Start, ['--from', accounts[0]], provider)
    await testLocallyWithNode(Switch, ['--from', accounts[0]], provider)

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
          "SendTransaction: finishNextEpoch",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)
  })
})
