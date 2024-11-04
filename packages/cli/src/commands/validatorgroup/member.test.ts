import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2, withImpersonatedAccount } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Member from './member'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validatorgroup:member cmd', (web3: Web3) => {
  beforeEach(async () => {})
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('when --reorder called from the group signer', () => {
    it('orders member to new position in group rank', async () => {
      const logSpy = jest.spyOn(console, 'log')
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
          "membersUpdated": 1729165064,
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
