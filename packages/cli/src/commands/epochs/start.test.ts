import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import BigNumber from 'bignumber.js'
import { stripAnsiCodesFromNestedArray, testLocallyWithNode } from '../../test-utils/cliUtils'
import Start from './start'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('epochs:start cmd', (client) => {
  it('Warns only when next epoch is not due', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromProvider(client.currentProvider)
    const accounts = await kit.connection.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    await expect(
      testLocallyWithNode(Start, ['--from', accounts[0]], client)
    ).resolves.toMatchInlineSnapshot(`"It is not time for the next epoch yet"`)
    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`[]`)
  })

  it('starts process successfully', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromProvider(client.currentProvider)
    const accounts = await kit.connection.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const epochDuration = new BigNumber(await epochManagerWrapper.epochDuration())

    await timeTravel(epochDuration.plus(1).toNumber(), client)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(await epochManagerWrapper.isTimeForNextEpoch()).toEqual(true)

    await testLocallyWithNode(Start, ['--from', accounts[0]], client)

    expect(await epochManagerWrapper.isOnEpochProcess()).toEqual(true)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "SendTransaction: startNextEpoch",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)
  })
})
