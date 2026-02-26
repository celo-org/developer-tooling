import { StrongAddress } from '@celo/base'
import { newKitFromProvider } from '@celo/contractkit'
import { ValidatorsWrapper } from '@celo/contractkit/lib/wrappers/Validators'
import {
  asCoreContractsOwner,
  testWithAnvilL2,
  withImpersonatedAccount,
} from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import {
  EXTRA_LONG_TIMEOUT_MS,
  stripAnsiCodesFromNestedArray,
  testLocallyWithNode,
} from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from '../lockedcelo/lock'
import ValidatorGroupMembers from '../validatorgroup/member'
import ValidatorAffiliate from './affiliate'
import { default as ValidatorDeRegister } from './deregister'
import { default as ValidatorRegister } from './register'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validator:deregister', (providerOwner) => {
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
    const kit = newKitFromProvider(providerOwner.currentProvider)
    const accounts = await kit.connection.getAccounts()
    account = accounts[0]
    validatorContract = await kit.contracts.getValidators()
    const groups = await validatorContract.getRegisteredValidatorGroupsAddresses()
    groupAddress = groups[0] as StrongAddress
    ecdsaPublicKey = await addressToPublicKey(account, kit.connection.sign)
    await testLocallyWithNode(Register, ['--from', account], providerOwner)
    await testLocallyWithNode(
      Lock,
      ['--from', account, '--value', '10000000000000000000000'],
      providerOwner
    )
    await testLocallyWithNode(
      ValidatorRegister,
      ['--from', account, '--ecdsaKey', ecdsaPublicKey, '--yes'],
      providerOwner
    )
    await testLocallyWithNode(
      ValidatorAffiliate,
      ['--from', account, groupAddress, '--yes'],
      providerOwner
    )
    await asCoreContractsOwner(providerOwner, async (ownerAddress) => {
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
    await withImpersonatedAccount(providerOwner, groupAddress, async () => {
      await testLocallyWithNode(
        ValidatorGroupMembers,
        [account, '--from', groupAddress, '--accept', '--yes'],
        providerOwner
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
      await withImpersonatedAccount(providerOwner, groupAddress, async () => {
        await testLocallyWithNode(
          ValidatorGroupMembers,
          [account, '--from', groupAddress, '--remove', '--yes'],
          providerOwner
        )
      })

      const { duration } = await validatorContract.getValidatorLockedGoldRequirements()
      const { lastRemovedFromGroupTimestamp } =
        await validatorContract.getValidatorMembershipHistoryExtraData(account)
      // travel in the evm
      await timeTravel(duration.multipliedBy(2).toNumber(), providerOwner)
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
        testLocallyWithNode(ValidatorDeRegister, ['--from', account], providerOwner)
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
        testLocallyWithNode(ValidatorDeRegister, ['--from', account], providerOwner)
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
      const kit = newKitFromProvider(providerOwner.currentProvider)
      const [_, notAffiliatedValidator] = await kit.connection.getAccounts()
      const groupAtSetup = await validatorContract.getValidatorGroup(groupAddress, false)

      // Sanity check
      expect(groupAtSetup.members).not.toContain(notAffiliatedValidator)

      // Register, but not affiliate
      await testLocallyWithNode(
        Lock,
        ['--from', notAffiliatedValidator, '--value', '10000000000000000000000'],
        providerOwner
      )
      await testLocallyWithNode(
        ValidatorRegister,
        [
          '--from',
          notAffiliatedValidator,
          '--ecdsaKey',
          await addressToPublicKey(notAffiliatedValidator, kit.connection.sign),
          '--yes',
        ],
        providerOwner
      )

      const { duration } = await validatorContract.getValidatorLockedGoldRequirements()
      const { lastRemovedFromGroupTimestamp } =
        await validatorContract.getValidatorMembershipHistoryExtraData(account)
      // travel in the evm
      await timeTravel(duration.multipliedBy(2).toNumber(), providerOwner)
      // time travel in node land
      const jestTime = lastRemovedFromGroupTimestamp * 1000
      const futureTime = jestTime + duration.multipliedBy(2000).toNumber()
      global.Date.now = jest.fn(() => futureTime)

      const logMock = jest.spyOn(console, 'log')
      logMock.mockClear()

      await testLocallyWithNode(
        ValidatorDeRegister,
        ['--from', notAffiliatedValidator],
        providerOwner
      )

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
