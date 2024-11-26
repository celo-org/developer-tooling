import { Address } from '@celo/base'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import {
  mockTimeForwardBy,
  setupGroup,
  setupValidatorAndAddToGroup,
} from '../../test-utils/chain-setup'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import AccountRegister from '../account/register'
import DeRegisterValidatorGroup from './deregister'
import ValidatorGroupMembers from './member'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validatorgroup:deregister cmd', (web3: Web3) => {
  let groupAddress: Address
  let validatorAddress: Address
  let kit: ContractKit
  beforeEach(async () => {
    kit = newKitFromWeb3(web3)
    const addresses = await web3.eth.getAccounts()
    groupAddress = addresses[0]
    validatorAddress = addresses[1]
    await setupGroup(kit, groupAddress)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('when group never had members', () => {
    it('deregisters a group', async () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation()
      const writeMock = jest.spyOn(ux.write, 'stdout').mockImplementation()

      await testLocallyWithWeb3Node(DeRegisterValidatorGroup, ['--from', groupAddress], web3)

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
            "   ✔  Enough time has passed since the validator group removed its last member?  ",
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
    beforeEach(async () => {
      await setupValidatorAndAddToGroup(kit, validatorAddress, groupAddress)
      await testLocallyWithWeb3Node(
        ValidatorGroupMembers,
        ['--yes', '--from', groupAddress, '--remove', validatorAddress],
        web3
      )
      const validators = await kit.contracts.getValidators()
      await validators.deaffiliate().sendAndWaitForReceipt({ from: validatorAddress })
    })
    describe('when not enough time has passed', () => {
      it('shows error that wait period is not over', async () => {
        const logMock = jest.spyOn(console, 'log').mockImplementation()
        logMock.mockClear()
        await expect(
          testLocallyWithWeb3Node(DeRegisterValidatorGroup, ['--from', groupAddress], web3)
        ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
        expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
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
              "   ✘  Enough time has passed since the validator group removed its last member?  ",
            ],
          ]
        `)
        const validators = await kit.contracts.getValidators()
        expect(validators.isValidatorGroup(groupAddress)).resolves.toBe(true)
      })
    })
    describe('when wait duration for unlocking is over', () => {
      it.only('deregisters the group', async () => {
        const validators = await kit.contracts.getValidators()
        const group = await validators.getValidatorGroup(groupAddress)
        expect(group.members).toHaveLength(0)
        expect(group.affiliates).toHaveLength(0)
        const groupRequirements = await validators.getGroupLockedGoldRequirements()
        const timeSpy = await mockTimeForwardBy(groupRequirements.duration.toNumber() * 2, web3)
        const logMock = jest.spyOn(console, 'log').mockImplementation()
        await expect(
          testLocallyWithWeb3Node(DeRegisterValidatorGroup, ['--from', groupAddress], web3)
        ).resolves.toBeUndefined()
        expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
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
              "   ✔  Enough time has passed since the validator group removed its last member?  ",
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
        await expect(validators.isValidatorGroup(groupAddress)).resolves.toBe(false)
        timeSpy.mockClear()
      })
    })
  })

  describe('when is not a validator group', () => {
    beforeEach(async () => {
      const accounts = await web3.eth.getAccounts()
      await testLocallyWithWeb3Node(AccountRegister, ['--from', accounts[2]], web3)
    })
    it('shows error message', async () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation()
      const accounts = await web3.eth.getAccounts()
      logSpy.mockClear()
      await expect(
        testLocallyWithWeb3Node(DeRegisterValidatorGroup, ['--from', accounts[2]], web3)
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
      expect(stripAnsiCodesFromNestedArray(logSpy.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84 is Signer or registered Account ",
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
