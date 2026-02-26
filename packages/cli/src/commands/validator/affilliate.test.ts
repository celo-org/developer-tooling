import { NULL_ADDRESS, StrongAddress } from '@celo/base'
import { newKitFromProvider } from '@celo/contractkit'
import { ValidatorsWrapper } from '@celo/contractkit/lib/wrappers/Validators'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import { stripAnsiCodesFromNestedArray, testLocallyWithNode } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from '../lockedcelo/lock'
import ValidatorAffiliate from './affiliate'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validator:affiliate', (providerOwner) => {
  let account: string
  let validatorContract: ValidatorsWrapper
  let groupAddress: StrongAddress
  beforeEach(async () => {
    const kit = newKitFromProvider(providerOwner.currentProvider)
    const accounts = await kit.connection.getAccounts()
    account = accounts[0]
    kit.defaultAccount = account as StrongAddress
    const ecdsaPublicKey = await addressToPublicKey(account, kit.connection.sign)

    validatorContract = await kit.contracts.getValidators()

    const groups = await validatorContract.getRegisteredValidatorGroupsAddresses()
    groupAddress = groups[0] as StrongAddress

    await testLocallyWithNode(Register, ['--from', account], providerOwner)
    await testLocallyWithNode(
      Lock,
      ['--from', account, '--value', '10000000000000000000000'],
      providerOwner
    )

    // Register a validator
    await validatorContract.registerValidatorNoBls(ecdsaPublicKey).sendAndWaitForReceipt()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('affiliates validator with a group', async () => {
    const logMock = jest.spyOn(console, 'log')

    await testLocallyWithNode(
      ValidatorAffiliate,
      ['--from', account, groupAddress, '--yes'],
      providerOwner
    )

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
      ]
    `)
    const validator = await validatorContract.getValidator(account)
    expect(validator.affiliation).toEqual(groupAddress)
  })

  it('fails when not a validator signer', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromProvider(providerOwner.currentProvider)
    const [_, nonSignerAccount] = await kit.connection.getAccounts()

    logMock.mockClear()

    await expect(
      testLocallyWithNode(
        ValidatorAffiliate,
        ['--from', nonSignerAccount, groupAddress, '--yes'],
        providerOwner
      )
    ).rejects.toMatchInlineSnapshot(`[Error: Some checks didn't pass!]`)

    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✘  0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb is Signer or registered Account 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb is not a signer or registered as an account. Try authorizing as a signer or running account:register.",
        ],
        [
          "   ✘  Signer can sign Validator Txs ",
        ],
        [
          "   ✘  Signer account is Validator ",
        ],
        [
          "   ✔  0x70997970C51812dc3A010C7d01b50e0d17dc79C8 is ValidatorGroup ",
        ],
      ]
    `)

    // Make sure no affiliation happened
    const validator = await validatorContract.getValidator(account)
    expect(validator.affiliation).toEqual(NULL_ADDRESS)
  })
})
