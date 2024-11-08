import { StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { ValidatorsWrapper } from '@celo/contractkit/lib/wrappers/Validators'
import {
  asCoreContractsOwner,
  testWithAnvilL2,
  withImpersonatedAccount,
} from '@celo/dev-utils/lib/anvil-test'
import { timeTravel } from '@celo/dev-utils/lib/ganache-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import Web3 from 'web3'
import {
  LONG_TIMEOUT_MS,
  stripAnsiCodesFromNestedArray,
  testLocallyWithWeb3Node,
} from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from '../lockedgold/lock'
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
          "   ✔  Enough time has passed since the account was removed from a validator group ",
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
    LONG_TIMEOUT_MS
  )

  it(
    'fails if is still a member',
    async () => {
      const groupAtSettup = await validatorContract.getValidatorGroup(groupAddress, false)

      // precondition
      expect(groupAtSettup.members).toContain(account)
      const logMock = jest.spyOn(console, 'log')

      await expect(
        testLocallyWithWeb3Node(ValidatorDeRegister, ['--from', account], web3)
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)

      expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
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
          "   ✔  Signer's account has enough locked celo for registration ",
        ],
        [
          "All checks passed",
        ],
        [
          "SendTransaction: registerValidator",
        ],
        [
          "txHash: 0xtxhash",
        ],
        [
          "SendTransaction: Set encryption key",
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
          "   ✔  Signer account is Validator ",
        ],
        [
          "   ✔  0x70997970C51812dc3A010C7d01b50e0d17dc79C8 is ValidatorGroup ",
        ],
        [
          "All checks passed",
        ],
        [
          "SendTransaction: affiliate",
        ],
        [
          "txHash: 0xtxhash",
        ],
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
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is Validator ",
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
          "   ✘  Enough time has passed since the account was removed from a validator group ",
        ],
      ]
    `)
    },
    LONG_TIMEOUT_MS
  )
})
