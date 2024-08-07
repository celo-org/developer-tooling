import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Info from './info'
process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('network:info', (web3) => {
  test('runs', async () => {
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
