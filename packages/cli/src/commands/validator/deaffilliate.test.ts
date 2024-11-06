import { StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { ValidatorsWrapper } from '@celo/contractkit/lib/wrappers/Validators'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from '../lockedgold/lock'
import ValidatorAffiliate from './affiliate'
import ValidatorDeAffiliate from './deaffiliate'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validator:deaffiliate', (web3: Web3) => {
  let account: string
  let validatorContract: ValidatorsWrapper
  let groupAddress: StrongAddress
  beforeEach(async () => {
    const accounts = await web3.eth.getAccounts()
    account = accounts[0]
    const kit = newKitFromWeb3(web3)
    kit.defaultAccount = account as StrongAddress
    const ecdsaPublicKey = await addressToPublicKey(account, web3.eth.sign)

    validatorContract = await kit.contracts.getValidators()

    const groups = await validatorContract.getRegisteredValidatorGroupsAddresses()
    groupAddress = groups[0] as StrongAddress

    await testLocallyWithWeb3Node(Register, ['--from', account], web3)
    await testLocallyWithWeb3Node(
      Lock,
      ['--from', account, '--value', '10000000000000000000000'],
      web3
    )

    // Register a validator
    await validatorContract.registerValidatorNoBls(ecdsaPublicKey).sendAndWaitForReceipt()

    await testLocallyWithWeb3Node(
      ValidatorAffiliate,
      ['--from', account, groupAddress, '--yes'],
      web3
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('deaffiliates validator from a group', async () => {
    const validator = await validatorContract.getValidator(account)
    const logMock = jest.spyOn(console, 'log')
    expect(validator.affiliation).toEqual(groupAddress)

    await testLocallyWithWeb3Node(ValidatorDeAffiliate, ['--from', account], web3)

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
