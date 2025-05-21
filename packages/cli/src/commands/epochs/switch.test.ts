import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import BigNumber from 'bignumber.js'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Start from './start'
import Switch from './switch'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('epochs:switch cmd', (web3) => {
  it('Warns only when next epoch is not due when switching', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromWeb3(web3)
    const accounts = await kit.web3.eth.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    await expect(
      testLocallyWithWeb3Node(Switch, ['--from', accounts[0]], web3)
    ).rejects.toMatchInlineSnapshot(`[Error: It is not time for the next epoch yet]`)
    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`[]`)
  })

  it('switches epoch successfully', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromWeb3(web3)
    const accounts = await kit.web3.eth.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const epochDuration = new BigNumber(await epochManagerWrapper.epochDuration())

    await timeTravel(epochDuration.plus(1).toNumber(), web3)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(await epochManagerWrapper.isTimeForNextEpoch()).toEqual(true)

    await testLocallyWithWeb3Node(Switch, ['--from', accounts[0]], web3)

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

  it('switches epoch successfully which already has started process', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromWeb3(web3)
    const accounts = await kit.web3.eth.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const epochDuration = new BigNumber(await epochManagerWrapper.epochDuration())

    await timeTravel(epochDuration.plus(1).toNumber(), web3)

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(4)
    expect(await epochManagerWrapper.isTimeForNextEpoch()).toEqual(true)

    await testLocallyWithWeb3Node(Start, ['--from', accounts[0]], web3)
    await testLocallyWithWeb3Node(Switch, ['--from', accounts[0]], web3)

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
