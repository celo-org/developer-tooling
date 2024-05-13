import * as celoConnect from '@celo/connect'
import { newKitFromWeb3 } from '@celo/contractkit'
import { WrapperCache } from '@celo/contractkit/lib/contract-cache'
import { FeeCurrencyDirectoryWrapper } from '@celo/contractkit/lib/wrappers/FeeCurrencyDirectoryWrapper'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import Web3 from 'web3'
import { testLocally } from '../../test-utils/cliUtils'
import Whitelist from './whitelist'

jest.mock('@celo/connect', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@celo/connect'),
  }
})

process.env.NO_SYNCCHECK = 'true'

const spy = jest.spyOn(console, 'log')

afterAll(() => {
  jest.clearAllMocks()
})

testWithGanache('network:whitelist cmd', (web3: Web3) => {
  test('can print the whitelist', async () => {
    const kit = newKitFromWeb3(web3)
    const isCel2Mock = jest.spyOn(celoConnect, 'isCel2')
    const getFeeCurrencyDirectoryMock = jest.spyOn(
      WrapperCache.prototype,
      'getFeeCurrencyDirectory'
    )

    // TODO remove proxying and mocking when FeeCurrencyDirectory is available
    isCel2Mock.mockResolvedValue(true)
    getFeeCurrencyDirectoryMock.mockImplementation(async () => {
      return kit.contracts.getFeeCurrencyWhitelist() as unknown as FeeCurrencyDirectoryWrapper
    })

    await testLocally(Whitelist, [])
    expect(spy.mock.calls[0][0]).toMatchInlineSnapshot(`
      "Available currencies:
      0x5315e44798395d4a952530d131249fE00f554565 - Celo Dollar (cUSD)
      0x965D352283a3C8A016b9BBbC9bf6306665d495E7 - Celo Brazilian Real (cREAL)
      0xdD66C23e07b4D6925b6089b5Fe6fc9E62941aFE8 - Celo Euro (cEUR)"
    `)
  })
})
