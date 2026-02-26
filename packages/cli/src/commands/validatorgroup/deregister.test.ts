import { Address } from '@celo/base'
import { ContractKit, newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { ux } from '@oclif/core'
import {
  mockTimeForwardBy,
  setupGroup,
  setupValidatorAndAddToGroup,
} from '../../test-utils/chain-setup'
import { stripAnsiCodesFromNestedArray, testLocallyWithNode } from '../../test-utils/cliUtils'
import AccountRegister from '../account/register'
import DeRegisterValidatorGroup from './deregister'
import ValidatorGroupMembers from './member'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validatorgroup:deregister cmd', (provider) => {
  let groupAddress: Address
  let validatorAddress: Address
  let kit: ContractKit
  beforeEach(async () => {
    kit = newKitFromProvider(provider)
    const addresses = await kit.connection.getAccounts()
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

      await testLocallyWithNode(DeRegisterValidatorGroup, ['--from', groupAddress], provider)

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
      await testLocallyWithNode(
        ValidatorGroupMembers,
        ['--yes', '--from', groupAddress, '--remove', validatorAddress],
        provider
      )
      const validators = await kit.contracts.getValidators()
      await validators.deaffiliate().sendAndWaitForReceipt({ from: validatorAddress })
    })
    describe('when not enough time has passed', () => {
      it('shows error that wait period is not over', async () => {
        // Mock Date.now() to ensure we're before the wait period ends
        // This prevents flakiness on CI where real time may have passed
        const validators = await kit.contracts.getValidators()
        const group = await validators.getValidatorGroup(groupAddress)
        const groupRequirements = await validators.getGroupLockedGoldRequirements()
        const waitPeriodEnd = group.membersUpdated + groupRequirements.duration.toNumber()
        const mockNow = (waitPeriodEnd - 1000) * 1000
        const timeSpy = jest.spyOn(global.Date, 'now').mockImplementation(() => mockNow)

        const logMock = jest.spyOn(console, 'log').mockImplementation()
        logMock.mockClear()
        await expect(
          testLocallyWithNode(DeRegisterValidatorGroup, ['--from', groupAddress], provider)
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
        await expect(validators.isValidatorGroup(groupAddress)).resolves.toBe(true)
        timeSpy.mockRestore()
      })
    })
    describe('when wait duration for unlocking is over', () => {
      it('deregisters the group', async () => {
        const validators = await kit.contracts.getValidators()
        const group = await validators.getValidatorGroup(groupAddress)
        expect(group.members).toHaveLength(0)
        expect(group.affiliates).toHaveLength(0)
        const groupRequirements = await validators.getGroupLockedGoldRequirements()
        const timeSpy = await mockTimeForwardBy(groupRequirements.duration.toNumber() * 2, provider)
        const logMock = jest.spyOn(console, 'log').mockImplementation()
        await expect(
          testLocallyWithNode(DeRegisterValidatorGroup, ['--from', groupAddress], provider)
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
              "   ✔  0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb is Validator ",
            ],
            [
              "All checks passed",
            ],
            [
              "SendTransaction: removeMember",
            ],
            [
              "txHash: 0xtxhash",
            ],
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
      const accounts = await kit.connection.getAccounts()
      await testLocallyWithNode(AccountRegister, ['--from', accounts[2]], provider)
    })
    it('shows error message', async () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation()
      const accounts = await kit.connection.getAccounts()
      logSpy.mockClear()
      await expect(
        testLocallyWithNode(DeRegisterValidatorGroup, ['--from', accounts[2]], provider)
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
