import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import SendValidatorPayment from './send-validator-payment'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL1('epochs:send-validator-payment cmd', (web3) => {
  let logMock = jest.spyOn(console, 'log')
  let errorMock = jest.spyOn(console, 'error')

  beforeEach(() => {
    logMock.mockClear().mockImplementation()
    errorMock.mockClear().mockImplementation()
  })

  it('fails if not on L2', async () => {
    const [sender, validator] = await web3.eth.getAccounts()

    await expect(
      testLocallyWithWeb3Node(SendValidatorPayment, ['--for', validator, '--from', sender], web3)
    ).rejects.toMatchInlineSnapshot(`[Error: This command is only available on L2]`)

    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`[]`)
    expect(stripAnsiCodesFromNestedArray(errorMock.mock.calls)).toMatchInlineSnapshot(`[]`)
  })
})
