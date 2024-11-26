import { newKitFromWeb3 } from '@celo/contractkit'
import { ElectionWrapper } from '@celo/contractkit/lib/wrappers/Election'
import { LockedGoldWrapper } from '@celo/contractkit/lib/wrappers/LockedGold'
import { ValidatorsWrapper } from '@celo/contractkit/lib/wrappers/Validators'
import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { registerAccount } from '../../test-utils/chain-setup'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Show from './show'

process.env.NO_SYNCCHECK = 'true'
const KNOWN_DEVCHAIN_VALIDATOR = '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f'

testWithAnvilL1('rewards:show cmd', (web3: Web3) => {
  const writeMock = jest.spyOn(ux.write, 'stdout')
  const logMock = jest.spyOn(console, 'log')
  const infoMock = jest.spyOn(console, 'info')

  beforeEach(async () => {
    jest.clearAllMocks()
  })

  describe('no arguments', () => {
    test('default', async () => {
      await testLocallyWithWeb3Node(Show, [], web3)
      expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "All checks passed",
        ],
      ]
    `)
      expect(stripAnsiCodesFromNestedArray(infoMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "No rewards.",
        ],
      ]
    `)
    })

    test('trie missing error', async () => {
      const electionMock = jest.spyOn(ElectionWrapper.prototype, 'getGroupVoterRewards')
      electionMock.mockImplementationOnce(async () => {
        throw new Error('missing trie node')
      })
      await expect(testLocallyWithWeb3Node(Show, [], web3)).rejects
        .toThrowErrorMatchingInlineSnapshot(`
        "Exact voter information is available only for 1024 blocks after each epoch.
        Supply --estimate to estimate rewards based on current votes, or use an archive node."
      `)
    })
  })

  describe('--validator', () => {
    test('invalid', async () => {
      await expect(
        testLocallyWithWeb3Node(
          Show,
          ['--validator', '0x1234567890123456789012345678901234567890'],
          web3
        )
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
      expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
              [
                [
                  "Running Checks:",
                ],
                [
                  "   ✘  0x1234567890123456789012345678901234567890 is Validator ",
                ],
              ]
          `)
    })

    test('valid', async () => {
      const getValidatorRewardsMock = jest.spyOn(ValidatorsWrapper.prototype, 'getValidatorRewards')

      const validatorPayment = 1234567890
      const score = 1337
      const testGroup = {
        name: 'test-group',
        address: '0x4242424242424242424242424242424242424242',
        members: [KNOWN_DEVCHAIN_VALIDATOR],
        membersUpdated: 1,
        affiliates: [],
        commission: new BigNumber(0),
        nextCommission: new BigNumber(0),
        nextCommissionBlock: new BigNumber(1),
        lastSlashed: new BigNumber(-1),
        slashingMultiplier: new BigNumber(1),
      }
      getValidatorRewardsMock.mockImplementationOnce(async () => [
        {
          validator: {
            name: 'test-validator',
            address: KNOWN_DEVCHAIN_VALIDATOR,
            ecdsaPublicKey: 'test-ec-pubkey',
            blsPublicKey: 'test-bls-pubkey',
            affiliation: '',
            score: new BigNumber(score),
            signer: KNOWN_DEVCHAIN_VALIDATOR,
          },
          validatorPayment: new BigNumber(validatorPayment),
          group: testGroup,
          groupPayment: new BigNumber(1337),
          epochNumber: 10000,
        },
      ])

      await testLocallyWithWeb3Node(Show, ['--validator', KNOWN_DEVCHAIN_VALIDATOR], web3)
      expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
              [
                [
                  "Running Checks:",
                ],
                [
                  "   ✔  0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f is Validator ",
                ],
                [
                  "All checks passed",
                ],
              ]
          `)
      expect(stripAnsiCodesFromNestedArray(infoMock.mock.calls)).toMatchInlineSnapshot(`
              [
                [
                  "",
                ],
                [
                  "Validator rewards:",
                ],
              ]
          `)
      expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`
              [
                [
                  " Validatorname  Validator                                  Validatorpayment Validatorscore Group                                      Epochnumber 
              ",
                ],
                [
                  " ────────────── ────────────────────────────────────────── ──────────────── ────────────── ────────────────────────────────────────── ─────────── 
              ",
                ],
                [
                  " test-validator 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f 1234567890       1337           0x4242424242424242424242424242424242424242             
              ",
                ],
              ]
          `)
    })

    test('slashed', async () => {
      const getValidatorRewardsMock = jest.spyOn(ValidatorsWrapper.prototype, 'getValidatorRewards')
      const lockedGoldMock = jest.spyOn(LockedGoldWrapper.prototype, 'getAccountsSlashed')

      const validatorPayment = 1234567890
      const score = 1337
      const testGroup = {
        name: 'test-group',
        address: '0x4242424242424242424242424242424242424242',
        members: [KNOWN_DEVCHAIN_VALIDATOR],
        membersUpdated: 1,
        affiliates: [],
        commission: new BigNumber(0),
        nextCommission: new BigNumber(0),
        nextCommissionBlock: new BigNumber(1),
        lastSlashed: new BigNumber(-1),
        slashingMultiplier: new BigNumber(1),
      }
      getValidatorRewardsMock.mockImplementationOnce(async () => [
        {
          validator: {
            name: 'test-validator',
            address: KNOWN_DEVCHAIN_VALIDATOR,
            ecdsaPublicKey: 'test-ec-pubkey',
            blsPublicKey: 'test-bls-pubkey',
            affiliation: '',
            score: new BigNumber(score),
            signer: KNOWN_DEVCHAIN_VALIDATOR,
          },
          validatorPayment: new BigNumber(validatorPayment),
          group: testGroup,
          groupPayment: new BigNumber(1337),
          epochNumber: 10000,
        },
      ])

      lockedGoldMock.mockImplementationOnce(async () => [
        {
          slashed: KNOWN_DEVCHAIN_VALIDATOR,
          epochNumber: 1,
          penalty: new BigNumber(2),
          reporter: '',
          reward: new BigNumber(10),
        },
      ])

      await testLocallyWithWeb3Node(Show, ['--validator', KNOWN_DEVCHAIN_VALIDATOR], web3)
      expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
              [
                [
                  "Running Checks:",
                ],
                [
                  "   ✔  0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f is Validator ",
                ],
                [
                  "All checks passed",
                ],
              ]
          `)
      expect(stripAnsiCodesFromNestedArray(infoMock.mock.calls)).toMatchInlineSnapshot(`
              [
                [
                  "",
                ],
                [
                  "Validator rewards:",
                ],
                [
                  "",
                ],
                [
                  "Slashing penalties and rewards:",
                ],
              ]
          `)
      expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`
              [
                [
                  " Validatorname  Validator                                  Validatorpayment Validatorscore Group                                      Epochnumber 
              ",
                ],
                [
                  " ────────────── ────────────────────────────────────────── ──────────────── ────────────── ────────────────────────────────────────── ─────────── 
              ",
                ],
                [
                  " test-validator 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f 1234567890       1337           0x4242424242424242424242424242424242424242             
              ",
                ],
                [
                  " Slashed Penalty Reporter Reward Epochnumber 
              ",
                ],
                [
                  " ─────── ─────── ──────── ────── ─────────── 
              ",
                ],
                [
                  "         2                10                 
              ",
                ],
              ]
          `)
    })

    describe('--voter', () => {
      test('invalid', async () => {
        await expect(
          testLocallyWithWeb3Node(
            Show,
            ['--voter', '0x1234567890123456789012345678901234567890'],
            web3
          )
        ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
        expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✘  0x1234567890123456789012345678901234567890 is a registered Account 0x1234567890123456789012345678901234567890 is not registered as an account. Try running account:register",
          ],
        ]
      `)
      })
      test('valid', async () => {
        const kit = newKitFromWeb3(web3)
        const [fromAddress] = await web3.eth.getAccounts()
        await registerAccount(kit, fromAddress)
        await expect(
          testLocallyWithWeb3Node(Show, ['--voter', fromAddress, '--estimate'], web3)
        ).resolves.toMatchInlineSnapshot(`undefined`)
        expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is a registered Account ",
          ],
          [
            "All checks passed",
          ],
        ]
      `)
        expect(stripAnsiCodesFromNestedArray(infoMock.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "No rewards.",
          ],
        ]
      `)
      })
    })
  })
})
