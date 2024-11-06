import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import AccountRegister from '../account/register'
import Lock from '../lockedgold/lock'
import DeRegisterValidatorGroup from './deregister'
import ValidatorGroupRegister from './register'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validatorgroup:deregister cmd', (web3: Web3) => {
  beforeEach(async () => {
    const accounts = await web3.eth.getAccounts()
    await testLocallyWithWeb3Node(AccountRegister, ['--from', accounts[0]], web3)
    await testLocallyWithWeb3Node(
      Lock,
      ['--from', accounts[0], '--value', '10000000000000000000000'],
      web3
    )
    await testLocallyWithWeb3Node(
      ValidatorGroupRegister,
      ['--from', accounts[0], '--commission', '0.2', '--yes'],
      web3
    )
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('when group never had members', () => {
    it('deregisters a group', async () => {
      const logSpy = jest.spyOn(console, 'log')
      const writeMock = jest.spyOn(ux.write, 'stdout')
      const accounts = await web3.eth.getAccounts()

      await testLocallyWithWeb3Node(DeRegisterValidatorGroup, ['--from', accounts[0]], web3)

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
            "All checks passed",
          ],
          [
            "SendTransaction: deregister",
          ],
          [
            "txHash: 0xtxhash",
          ],
        ]
      `)
      expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`[]`)
    })
  })

  describe('when group has had members', () => {
    beforeEach(async () => {})
    it.todo(
      'to test this need to register a validator and add it to the group then remove it then try to deregister the group'
    )
  })

  describe('when is not a validator group', () => {
    beforeEach(async () => {
      const accounts = await web3.eth.getAccounts()
      await testLocallyWithWeb3Node(AccountRegister, ['--from', accounts[1]], web3)
    })
    it('fails', async () => {
      const logSpy = jest.spyOn(console, 'log')
      const accounts = await web3.eth.getAccounts()
      await expect(
        testLocallyWithWeb3Node(DeRegisterValidatorGroup, ['--from', accounts[1]], web3)
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
      expect(stripAnsiCodesFromNestedArray(logSpy.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is not a registered Account ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: register",
          ],
          [
            "txHash: 0xtxhash",
          ],
          [
            "Running Checks:",
          ],
          [
            "   ✔  Value [10000000000000000000000] is > 0 ",
          ],
          [
            "All checks passed",
          ],
          [
            "Running Checks:",
          ],
          [
            "   ✔  Account has at least 10000 CELO ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: lock",
          ],
          [
            "txHash: 0xtxhash",
          ],
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
          [
            "Running Checks:",
          ],
          [
            "   ✔  0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb is not a registered Account ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: register",
          ],
          [
            "txHash: 0xtxhash",
          ],
          [
            "Running Checks:",
          ],
          [
            "   ✔  0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb is Signer or registered Account ",
          ],
          [
            "   ✔  Signer can sign Validator Txs ",
          ],
          [
            "   ✘  Signer account is ValidatorGroup ",
          ],
        ]
      `)
    })
  })
})
