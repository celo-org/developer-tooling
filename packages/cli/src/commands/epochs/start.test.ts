import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import BigNumber from 'bignumber.js'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Start from './start'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('epochs:start cmd', (client) => {
  it('Warns only when next epoch is not due', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromWeb3(client)
    const accounts = await kit.web3.eth.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    await expect(
      testLocallyWithWeb3Node(Start, ['--from', accounts[0]], client)
    ).resolves.toMatchInlineSnapshot(`"It is not time for the next epoch yet"`)
    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`[]`)
  })

  it('starts process successfully', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromWeb3(client)
    const accounts = await kit.web3.eth.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const epochDuration = new BigNumber(await epochManagerWrapper.epochDuration())

    await timeTravel(epochDuration.plus(1).toNumber(), client)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(await epochManagerWrapper.isTimeForNextEpoch()).toEqual(true)

    await testLocallyWithWeb3Node(Start, ['--from', accounts[0]], client)

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
