import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import { testLocally } from '../../test-utils/cliUtils'
import Whitelist from './whitelist'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

testWithGanache('utils:whitelist cmd', () => {
  // let accounts: string[] = []
  // let kit: ContractKit

  // beforeEach(async () => {
  //   kit = newKitFromWeb3(web3)
  //   accounts = await web3.eth.getAccounts()
  // })

  test('can print the whitelist', async () => {
    const spy = jest.spyOn(console, 'log')
    await testLocally(Whitelist, [])
    expect(spy.mock.calls[0][0]).toMatchInlineSnapshot(`
      "Available currencies:
      0x5315e44798395d4a952530d131249fE00f554565 - Celo Dollar (cUSD)
      0x965D352283a3C8A016b9BBbC9bf6306665d495E7 - Celo Brazilian Real (cREAL)
      0xdD66C23e07b4D6925b6089b5Fe6fc9E62941aFE8 - Celo Euro (cEUR)"
    `)
  })
})
