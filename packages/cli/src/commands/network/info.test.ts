import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import EpochsSwitch from '../epochs/switch'
import Info from './info'
process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('network:info', (web3) => {
  beforeAll(async () => {
    const kit = newKitFromWeb3(web3)
    const epochManager = await kit.contracts.getEpochManager()
    const epochDuration = await epochManager.epochDuration()
    const accounts = await web3.eth.getAccounts()

    // Switch epochs 3 times
    for (let i = 0; i < 3; i++) {
      await timeTravel(epochDuration * 2, web3)
      await testLocallyWithWeb3Node(EpochsSwitch, ['--from', accounts[0], '--delay', '1'], web3)
    }
  })

  it('runs for latest epoch', async () => {
    const spy = jest.spyOn(console, 'log')
    await testLocallyWithWeb3Node(Info, [], web3)

    expect(stripAnsiCodesFromNestedArray(spy.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "blockNumber: 17641
      epochDuration: 86400
      epochs: 
        number: 7
        start: 17641",
        ],
      ]
    `)
  })

  it('runs for last 3 epochs', async () => {
    const spy = jest.spyOn(console, 'log')
    await testLocallyWithWeb3Node(Info, ['--lastN', '3'], web3)

    expect(stripAnsiCodesFromNestedArray(spy.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "blockNumber: 17641
      epochDuration: 86400
      epochs: 
        0: 
          number: 7
          start: 17641
        1: 
          end: 17640
          number: 6
          start: 17638
        2: 
          end: 17637
          number: 5
          start: 17635",
        ],
      ]
    `)
  })

  it('runs for last 100 epochs, but displays only epoch that exist', async () => {
    const spy = jest.spyOn(console, 'log')
    await testLocallyWithWeb3Node(Info, ['--lastN', '100'], web3)

    expect(stripAnsiCodesFromNestedArray(spy.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "blockNumber: 17641
      epochDuration: 86400
      epochs: 
        0: 
          number: 7
          start: 17641
        1: 
          end: 17640
          number: 6
          start: 17638
        2: 
          end: 17637
          number: 5
          start: 17635
        3: 
          end: 17634
          number: 4
          start: 300",
        ],
      ]
    `)
  })
})
