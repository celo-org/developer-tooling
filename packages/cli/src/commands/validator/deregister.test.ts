import { StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { ValidatorsWrapper } from '@celo/contractkit/lib/wrappers/Validators'
import {
  asCoreContractsOwner,
  testWithAnvilL2,
  withImpersonatedAccount,
} from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import Web3 from 'web3'
import {
  EXTRA_LONG_TIMEOUT_MS,
  stripAnsiCodesFromNestedArray,
  testLocallyWithWeb3Node,
} from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from '../lockedcelo/lock'
import ValidatorGroupMembers from '../validatorgroup/member'
import ValidatorAffiliate from './affiliate'
import { default as ValidatorDeRegister } from './deregister'
import { default as ValidatorRegister } from './register'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validator:deregister', (web3: Web3) => {
  let account: string
  let ecdsaPublicKey: string
  let groupAddress: StrongAddress
  let validatorContract: ValidatorsWrapper

  beforeEach(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {
      // noop
    })
    jest.spyOn(console, 'error').mockImplementation(() => {
      // noop
    })
    const accounts = await web3.eth.getAccounts()
    account = accounts[0]
    const kit = newKitFromWeb3(web3)
    validatorContract = await kit.contracts.getValidators()
    const groups = await validatorContract.getRegisteredValidatorGroupsAddresses()
    groupAddress = groups[0] as StrongAddress
    ecdsaPublicKey = await addressToPublicKey(account, web3.eth.sign)
    await testLocallyWithWeb3Node(Register, ['--from', account], web3)
    await testLocallyWithWeb3Node(
      Lock,
      ['--from', account, '--value', '10000000000000000000000'],
      web3
    )
    await testLocallyWithWeb3Node(
      ValidatorRegister,
      ['--from', account, '--ecdsaKey', ecdsaPublicKey, '--yes'],
      web3
    )
    await testLocallyWithWeb3Node(
      ValidatorAffiliate,
      ['--from', account, groupAddress, '--yes'],
      web3
    )
    await asCoreContractsOwner(web3, async (ownerAddress) => {
      // @ts-expect-error (.contract)
      await validatorContract.contract.methods.setMaxGroupSize(5).send({ from: ownerAddress })
      // @ts-expect-error (.contract)
      await validatorContract.contract.methods
        .setValidatorLockedGoldRequirements(2, 10000)
        .send({ from: ownerAddress })
      // @ts-expect-error (.contract)
      await validatorContract.contract.methods
        .setGroupLockedGoldRequirements(2, 10000)
        .send({ from: ownerAddress })
    })
    await withImpersonatedAccount(web3, groupAddress, async () => {
      await testLocallyWithWeb3Node(
        ValidatorGroupMembers,
        [account, '--from', groupAddress, '--accept', '--yes'],
        web3
      )
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  it(
    'can deregister validator',
    async () => {
      // precondition
      const groupAtSettup = await validatorContract.getValidatorGroup(groupAddress, false)
      expect(groupAtSettup.members).toContain(account)
      await withImpersonatedAccount(web3, groupAddress, async () => {
        await testLocallyWithWeb3Node(
          ValidatorGroupMembers,
          [account, '--from', groupAddress, '--remove', '--yes'],
          web3
        )
      })

      const { duration } = await validatorContract.getValidatorLockedGoldRequirements()
      const { lastRemovedFromGroupTimestamp } =
        await validatorContract.getValidatorMembershipHistoryExtraData(account)
      // travel in the evm
      await timeTravel(duration.multipliedBy(2).toNumber(), web3)
      // time travel in node land
      const jestTime = lastRemovedFromGroupTimestamp * 1000
      const futureTime = jestTime + duration.multipliedBy(2000).toNumber()
      global.Date.now = jest.fn(() => futureTime)

      const logMock = jest.spyOn(console, 'log')
      // this ensures that any spy that were allready attached to console.log from previous calls to spyOn are cleared
      logMock.mockClear()

      console.warn(
        'time is',
        Date.now(),
        'left at',
        lastRemovedFromGroupTimestamp * 1000,
        Date.now() / 1000 - lastRemovedFromGroupTimestamp,
        'vs',
        duration.toNumber()
      )
      await expect(
        testLocallyWithWeb3Node(ValidatorDeRegister, ['--from', account], web3)
      ).resolves.toMatchInlineSnapshot(`undefined`)
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
                  "   ✔  Signer account is Validator ",
                ],
                [
                  "   ✔  Account isn't a member of a validator group ",
                ],
                [
                  "   ✔  Enough time has passed since the account was removed from a validator group? ",
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
      expect(validatorContract.isValidator(account)).resolves.toEqual(false)
      // @ts-expect-error
      global.Date.now.mockReset()
    },
    EXTRA_LONG_TIMEOUT_MS
  )

  it(
    'fails if is still a member',
    async () => {
      const groupAtSettup = await validatorContract.getValidatorGroup(groupAddress, false)

      // precondition
      expect(groupAtSettup.members).toContain(account)

      const logMock = jest.spyOn(console, 'log')
      logMock.mockClear()

      await expect(
        testLocallyWithWeb3Node(ValidatorDeRegister, ['--from', account], web3)
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
            "   ✔  Signer account is Validator ",
          ],
          [
            "   ✘  Account isn't a member of a validator group ",
          ],
          [
            "   ✘  Enough time has passed since the account was removed from a validator group? ",
          ],
        ]
      `)
    },
    EXTRA_LONG_TIMEOUT_MS
  )

  it(
    'succeeds if not a member of any group',
    async () => {
      const [_, notAffiliatedValidator] = await web3.eth.getAccounts()
      const groupAtSetup = await validatorContract.getValidatorGroup(groupAddress, false)

      // Sanity check
      expect(groupAtSetup.members).not.toContain(notAffiliatedValidator)

      // Register, but not affiliate
      await testLocallyWithWeb3Node(
        Lock,
        ['--from', notAffiliatedValidator, '--value', '10000000000000000000000'],
        web3
      )
      await testLocallyWithWeb3Node(
        ValidatorRegister,
        [
          '--from',
          notAffiliatedValidator,
          '--ecdsaKey',
          await addressToPublicKey(notAffiliatedValidator, web3.eth.sign),
          '--yes',
        ],
        web3
      )

      const { duration } = await validatorContract.getValidatorLockedGoldRequirements()
      const { lastRemovedFromGroupTimestamp } =
        await validatorContract.getValidatorMembershipHistoryExtraData(account)
      // travel in the evm
      await timeTravel(duration.multipliedBy(2).toNumber(), web3)
      // time travel in node land
      const jestTime = lastRemovedFromGroupTimestamp * 1000
      const futureTime = jestTime + duration.multipliedBy(2000).toNumber()
      global.Date.now = jest.fn(() => futureTime)

      const logMock = jest.spyOn(console, 'log')
      logMock.mockClear()

      await testLocallyWithWeb3Node(ValidatorDeRegister, ['--from', notAffiliatedValidator], web3)

      expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
        [
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
            "   ✔  Signer account is Validator ",
          ],
          [
            "   ✔  Account isn't a member of a validator group ",
          ],
          [
            "   ✔  Enough time has passed since the account was removed from a validator group? ",
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
    },
    EXTRA_LONG_TIMEOUT_MS
  )
})
