import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import BigNumber from 'bignumber.js'
import { stripAnsiCodesFromNestedArray, testLocallyWithNode } from '../../test-utils/cliUtils'
import Finish from './finish'
import Start from './start'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('epochs:finish cmd', (client) => {
  it('Warns when epoch process is not yet started', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromProvider(client.currentProvider)
    const accounts = await kit.connection.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    expect(
      epochManagerWrapper._contract.methods.systemAlreadyInitialized().call()
    ).resolves.toEqual(true)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    await expect(
      testLocallyWithNode(Finish, ['--from', accounts[0]], client)
    ).resolves.toMatchInlineSnapshot(`"Epoch process is not started yet"`)
    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`[]`)
  })

  it('finishes epoch process successfully', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromProvider(client.currentProvider)
    const accounts = await kit.connection.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const epochDuration = new BigNumber(await epochManagerWrapper.epochDuration())

    await timeTravel(epochDuration.plus(1).toNumber(), client)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(await epochManagerWrapper.isTimeForNextEpoch()).toEqual(true)

    await testLocallyWithNode(Start, ['--from', accounts[0]], client)

    await testLocallyWithNode(Finish, ['--from', accounts[0]], client)

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
