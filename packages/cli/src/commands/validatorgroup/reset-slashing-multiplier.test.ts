import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { ux } from '@oclif/core'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import AccountRegister from '../account/register'
import Lock from '../lockedcelo/lock'
import ValidatorGroupRegister from './register'
import ResetSlashingMultiplier from './reset-slashing-multiplier'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validatorgroup:reset-slashing-multiplier cmd', (client) => {
  beforeEach(async () => {
    const accounts = await client.eth.getAccounts()

    await testLocallyWithWeb3Node(AccountRegister, ['--from', accounts[0]], client)
    await testLocallyWithWeb3Node(
      Lock,
      ['--from', accounts[0], '--value', '10000000000000000000000'],
      client
    )
    await testLocallyWithWeb3Node(
      ValidatorGroupRegister,
      ['--from', accounts[0], '--commission', '0.2', '--yes'],
      client
    )
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('resets validator group slashing multiplier', async () => {
    const logSpy = jest.spyOn(console, 'log')
    const writeMock = jest.spyOn(ux.write, 'stdout')

    const accounts = await client.eth.getAccounts()

    await testLocallyWithWeb3Node(ResetSlashingMultiplier, [accounts[0]], client)

    expect(stripAnsiCodesFromNestedArray(logSpy.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is Signer or registered Account ",
        ],
        [
          "   ✔  Signer can sign Validator Txs ",
        ],
        [
          "   ✔  Signer account is ValidatorGroup ",
        ],
        [
          "   ✔  Enough time has passed since the last halving of the slashing multiplier ",
        ],
        [
          "All checks passed",
        ],
        [
          "SendTransaction: reset-slashing-multiplier",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)
    expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`[]`)
  })
})
