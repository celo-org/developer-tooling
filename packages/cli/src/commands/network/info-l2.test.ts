import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { timeTravel } from '@celo/dev-utils/lib/ganache-test'
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
      await timeTravel(epochDuration + 1, web3)
      await testLocallyWithWeb3Node(EpochsSwitch, ['--from', accounts[0]], web3)
    }
  })

  it('runs for latest epoch', async () => {
    const spy = jest.spyOn(console, 'log')
    await testLocallyWithWeb3Node(Info, [], web3)

    expect(stripAnsiCodesFromNestedArray(spy.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "blockNumber: 359
      epochs: 
        number: 7
        start: 359
      epochSize: 86400",
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
          "blockNumber: 359
      epochs:
        0:
          number: 7
          start: 359
        1:
          end: 358
          number: 6
          start: 356
        2:
          end: 355
          number: 5
          start: 353
      epochSize: 86400",
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
          "blockNumber: 359
      epochs: 
        0: 
          number: 7
          start: 359
        1: 
          end: 358
          number: 6
          start: 356
        2: 
          end: 355
          number: 5
          start: 353
        3: 
          end: 352
          number: 4
          start: 300
      epochSize: 86400",
        ],
      ]
    `)
  })
})
