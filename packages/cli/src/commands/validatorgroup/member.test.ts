import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2, withImpersonatedAccount } from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import {
  setupGroup,
  setupValidator,
  setupValidatorAndAddToGroup,
} from '../../test-utils/chain-setup'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import ValidatorAffiliate from '../validator/affiliate'
import Member from './member'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validatorgroup:member cmd', (web3: Web3) => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('with group', () => {
    let groupAddress: string
    let validatorAddress: string
    let kit: ContractKit
    const logSpy = jest.spyOn(console, 'log').mockImplementation()
    beforeEach(async () => {
      kit = newKitFromWeb3(web3)
      const addresses = await web3.eth.getAccounts()
      groupAddress = addresses[0]
      validatorAddress = addresses[1]
      await setupGroup(kit, groupAddress)
    })
    describe('when --accept called from the group signer', () => {
      beforeEach(async () => {
        await setupValidator(kit, validatorAddress)
        await testLocallyWithWeb3Node(
          ValidatorAffiliate,
          [groupAddress, '--from', validatorAddress, '--yes'],
          web3
        )
      })
      it('accepts a new member to the group', async () => {
        const writeMock = jest.spyOn(ux.write, 'stdout').mockImplementation()
        logSpy.mockClear()
        await testLocallyWithWeb3Node(
          Member,
          ['--yes', '--from', groupAddress, '--accept', validatorAddress],
          web3
        )
        expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`[]`)
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
              "   ✔  0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb is Validator ",
            ],
            [
              "All checks passed",
            ],
            [
              "SendTransaction: addMember",
            ],
            [
              "txHash: 0xtxhash",
            ],
          ]
        `)
      })
    })
    describe('when --remove called from the group signer', () => {
      beforeEach(async () => {
        await setupValidatorAndAddToGroup(kit, validatorAddress, groupAddress)
      })
      it('removes a member from the group', async () => {
        const writeMock = jest.spyOn(ux.write, 'stdout').mockImplementation()
        logSpy.mockClear()
        await testLocallyWithWeb3Node(
          Member,
          ['--yes', '--from', groupAddress, '--remove', validatorAddress],
          web3
        )
        expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`[]`)
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
          ]
        `)
      })
    })
  })
  describe('when --reorder called from the group signer', () => {
    it('orders member to new position in group rank', async () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation()
      const kit = newKitFromWeb3(web3)

      const ValidatorsWrapper = await kit.contracts.getValidators()
      const vgroups = await ValidatorsWrapper.getRegisteredValidatorGroups()
      const groupToMessWith = vgroups[0]
      const validatorAddress = groupToMessWith.members.at(-1) as string
      expect(groupToMessWith).toMatchInlineSnapshot(`
        {
          "address": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
          "affiliates": [],
          "commission": "0.1",
          "lastSlashed": "0",
          "members": [
            "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
            "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
          ],
          "membersUpdated": 1738619402,
          "name": "cLabs",
          "nextCommission": "0",
          "nextCommissionBlock": "0",
          "slashingMultiplier": "1",
        }
      `)
      expect(validatorAddress).toBeDefined()
      const newPosition = '0'

      await withImpersonatedAccount(web3, groupToMessWith.address, async () => {
        await testLocallyWithWeb3Node(
          Member,
          [validatorAddress, '--from', groupToMessWith.address, '--reorder', newPosition],
          web3
        )
      })

      expect(stripAnsiCodesFromNestedArray(logSpy.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  0x70997970C51812dc3A010C7d01b50e0d17dc79C8 is Signer or registered Account ",
          ],
          [
            "   ✔  Signer can sign Validator Txs ",
          ],
          [
            "   ✔  Signer account is ValidatorGroup ",
          ],
          [
            "   ✔  0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc is Validator ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: reorderMember",
          ],
          [
            "txHash: 0xtxhash",
          ],
        ]
      `)
      const groupAfter = await ValidatorsWrapper.getValidatorGroup(groupToMessWith.address)

      expect(groupAfter.members).toEqual(groupToMessWith.members.reverse())
    })
  })
})
