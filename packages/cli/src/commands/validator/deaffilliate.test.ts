import { StrongAddress } from '@celo/base'
import { newKitFromProvider } from '@celo/contractkit'
import { ValidatorsWrapper } from '@celo/contractkit/lib/wrappers/Validators'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import { stripAnsiCodesFromNestedArray, testLocallyWithNode } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from '../lockedcelo/lock'
import ValidatorAffiliate from './affiliate'
import ValidatorDeAffiliate from './deaffiliate'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validator:deaffiliate', (provider) => {
  let account: string
  let validatorContract: ValidatorsWrapper
  let groupAddress: StrongAddress
  beforeEach(async () => {
    const kit = newKitFromProvider(provider)
    const accounts = await kit.connection.getAccounts()
    account = accounts[0]
    kit.defaultAccount = account as StrongAddress
    const ecdsaPublicKey = await addressToPublicKey(account, kit.connection.sign)

    validatorContract = await kit.contracts.getValidators()

    const groups = await validatorContract.getRegisteredValidatorGroupsAddresses()
    groupAddress = groups[0] as StrongAddress

    await testLocallyWithNode(Register, ['--from', account], provider)
    await testLocallyWithNode(
      Lock,
      ['--from', account, '--value', '10000000000000000000000'],
      provider
    )

    // Register a validator
    await validatorContract.registerValidatorNoBls(ecdsaPublicKey)

    await testLocallyWithNode(
      ValidatorAffiliate,
      ['--from', account, groupAddress, '--yes'],
      provider
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('deaffiliates validator from a group', async () => {
    const validator = await validatorContract.getValidator(account)
    const logMock = jest.spyOn(console, 'log')
    expect(validator.affiliation).toEqual(groupAddress)

    await testLocallyWithNode(ValidatorDeAffiliate, ['--from', account], provider)

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
          "All checks passed",
        ],
        [
          "SendTransaction: deaffiliate",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)

    await expect(validatorContract.getValidator(account)).resolves.toMatchObject({
      affiliation: '0x0000000000000000000000000000000000000000',
    })
  })
})
