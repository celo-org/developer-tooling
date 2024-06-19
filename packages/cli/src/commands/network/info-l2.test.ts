import { newKitFromWeb3 } from '@celo/contractkit'
import { setupL2, testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Info from './info'
process.env.NO_SYNCCHECK = 'true'

testWithAnvil('network:info', (web3) => {
  test('runs', async () => {
    const kit = newKitFromWeb3(web3)
    await setupL2(kit.web3)
    const spy = jest.spyOn(console, 'log')
    await testLocallyWithWeb3Node(Info, [], web3)
    expect(stripAnsiCodesFromNestedArray(spy.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "blockNumber: 269",
        ],
      ]
    `)
  })
})
