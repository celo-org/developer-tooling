import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { ux } from '@oclif/core'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import AccountRegister from '../account/register'
import Lock from '../lockedcelo/lock'
import ValidatorGroupRegister from './register'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validatorgroup:register cmd', (client) => {
  beforeEach(async () => {
    const accounts = await client.eth.getAccounts()

    await testLocallyWithWeb3Node(AccountRegister, ['--from', accounts[0]], client)
    await testLocallyWithWeb3Node(
      Lock,
      ['--from', accounts[0], '--value', '10000000000000000000000'],
      client
    )
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('registers a group', async () => {
    const logSpy = jest.spyOn(console, 'log')
    const writeMock = jest.spyOn(ux.write, 'stdout')

    const accounts = await client.eth.getAccounts()

    await testLocallyWithWeb3Node(
      ValidatorGroupRegister,
      ['--from', accounts[0], '--commission', '0.2', '--yes'],
      client
    )
    expect(stripAnsiCodesFromNestedArray(logSpy.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✔  Commission is in range [0,1] ",
        ],
        [
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is Signer or registered Account ",
        ],
        [
          "   ✔  Signer can sign Validator Txs ",
        ],
        [
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is not a registered Validator ",
        ],
        [
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is not a registered ValidatorGroup ",
        ],
        [
          "   ✔  Signer's account has enough locked celo for group registration ",
        ],
        [
          "All checks passed",
        ],
        [
          "SendTransaction: registerValidatorGroup",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)
    expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`[]`)
  })
})
