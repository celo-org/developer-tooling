import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { PROOF_OF_POSSESSION_SIGNATURE } from '../../test-utils/constants'
import Lock from '../lockedcelo/lock'
import ValidatorRegister from '../validator/register'
import Authorize from './authorize'
import Register from './register'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL1('account:authorize cmd', (web3: Web3) => {
  let logMock = jest.spyOn(console, 'log')
  let errorMock = jest.spyOn(console, 'error')

  beforeEach(() => {
    logMock.mockClear().mockImplementation()
    errorMock.mockClear().mockImplementation()
  })

  afterEach(() => jest.clearAllMocks())

  test('can authorize vote signer', async () => {
    const accounts = await web3.eth.getAccounts()
    const notRegisteredAccount = accounts[0]
    const signerNotRegisteredAccount = accounts[1]

    await testLocallyWithWeb3Node(Register, ['--from', notRegisteredAccount], web3)

    await testLocallyWithWeb3Node(
      Authorize,
      [
        '--from',
        notRegisteredAccount,
        '--role',
        'vote',
        '--signer',
        signerNotRegisteredAccount,
        '--signature',
        PROOF_OF_POSSESSION_SIGNATURE,
      ],
      web3
    )
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
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is a registered Account ",
        ],
        [
          "All checks passed",
        ],
        [
          "SendTransaction: authorizeTx",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)
  })

  test('can authorize attestation signer', async () => {
    const accounts = await web3.eth.getAccounts()
    const notRegisteredAccount = accounts[0]
    const signerNotRegisteredAccount = accounts[1]

    await testLocallyWithWeb3Node(Register, ['--from', notRegisteredAccount], web3)
    await testLocallyWithWeb3Node(
      Authorize,
      [
        '--from',
        notRegisteredAccount,
        '--role',
        'attestation',
        '--signer',
        signerNotRegisteredAccount,
        '--signature',
        PROOF_OF_POSSESSION_SIGNATURE,
      ],
      web3
    )
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
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is a registered Account ",
        ],
        [
          "All checks passed",
        ],
        [
          "SendTransaction: authorizeTx",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)
  })

  test('can authorize validator signer before validator is registered', async () => {
    const accounts = await web3.eth.getAccounts()
    const notRegisteredAccount = accounts[0]
    const signerNotRegisteredAccount = accounts[1]

    await testLocallyWithWeb3Node(Register, ['--from', notRegisteredAccount], web3)
    await testLocallyWithWeb3Node(
      Authorize,
      [
        '--from',
        notRegisteredAccount,
        '--role',
        'validator',
        '--signer',
        signerNotRegisteredAccount,
        '--signature',
        PROOF_OF_POSSESSION_SIGNATURE,
      ],
      web3
    )
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
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is a registered Account ",
        ],
        [
          "   ✔  undefined is not a registered Validator ",
        ],
        [
          "All checks passed",
        ],
        [
          "SendTransaction: authorizeTx",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)
  })

  test('can authorize validator signer after validator is registered', async () => {
    const accounts = await web3.eth.getAccounts()
    const notRegisteredAccount = accounts[0]
    const signerNotRegisteredAccount = accounts[1]
    const newBlsPublicKey = web3.utils.randomHex(96)
    const newBlsPoP = web3.utils.randomHex(48)
    const ecdsaPublicKey = await addressToPublicKey(notRegisteredAccount, web3.eth.sign)
    await testLocallyWithWeb3Node(Register, ['--from', notRegisteredAccount], web3)
    await testLocallyWithWeb3Node(
      Lock,
      ['--from', notRegisteredAccount, '--value', '10000000000000000000000'],
      web3
    )
    await testLocallyWithWeb3Node(
      ValidatorRegister,
      [
        '--from',
        notRegisteredAccount,
        '--ecdsaKey',
        ecdsaPublicKey,
        '--blsKey',
        '0x4fa3f67fc913878b068d1fa1cdddc54913d3bf988dbe5a36a20fa888f20d4894c408a6773f3d7bde11154f2a3076b700d345a42fd25a0e5e83f4db5586ac7979ac2053cd95d8f2efd3e959571ceccaa743e02cf4be3f5d7aaddb0b06fc9aff00',
        '--blsSignature',
        '0xcdb77255037eb68897cd487fdd85388cbda448f617f874449d4b11588b0b7ad8ddc20d9bb450b513bb35664ea3923900',
        '--yes',
      ],
      web3
    )
    await testLocallyWithWeb3Node(
      Authorize,
      [
        '--from',
        notRegisteredAccount,
        '--role',
        'validator',
        '--signer',
        signerNotRegisteredAccount,
        '--signature',
        PROOF_OF_POSSESSION_SIGNATURE,
        '--blsKey',
        newBlsPublicKey,
        '--blsPop',
        newBlsPoP,
      ],
      web3
    )
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
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is a registered Account ",
        ],
        [
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is Validator ",
        ],
        [
          "All checks passed",
        ],
        [
          "SendTransaction: authorizeTx",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)
  })

  test('cannot authorize validator signer without BLS after validator is registered', async () => {
    const accounts = await web3.eth.getAccounts()
    const notRegisteredAccount = accounts[0]
    const signerNotRegisteredAccount = accounts[1]
    const ecdsaPublicKey = await addressToPublicKey(notRegisteredAccount, web3.eth.sign)
    await testLocallyWithWeb3Node(Register, ['--from', notRegisteredAccount], web3)
    await testLocallyWithWeb3Node(
      Lock,
      ['--from', notRegisteredAccount, '--value', '10000000000000000000000'],
      web3
    )
    await testLocallyWithWeb3Node(
      ValidatorRegister,
      [
        '--from',
        notRegisteredAccount,
        '--ecdsaKey',
        ecdsaPublicKey,
        '--blsKey',
        '0x4fa3f67fc913878b068d1fa1cdddc54913d3bf988dbe5a36a20fa888f20d4894c408a6773f3d7bde11154f2a3076b700d345a42fd25a0e5e83f4db5586ac7979ac2053cd95d8f2efd3e959571ceccaa743e02cf4be3f5d7aaddb0b06fc9aff00',
        '--blsSignature',
        '0xcdb77255037eb68897cd487fdd85388cbda448f617f874449d4b11588b0b7ad8ddc20d9bb450b513bb35664ea3923900',
        '--yes',
      ],
      web3
    )
    await expect(
      testLocallyWithWeb3Node(
        Authorize,
        [
          '--from',
          notRegisteredAccount,
          '--role',
          'validator',
          '--signer',
          signerNotRegisteredAccount,
          '--signature',
          PROOF_OF_POSSESSION_SIGNATURE,
        ],

        web3
      )
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
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is a registered Account ",
        ],
        [
          "   ✘  undefined is not a registered Validator ",
        ],
      ]
    `)
  })

  test('can force authorize validator signer without BLS after validator is registered', async () => {
    const accounts = await web3.eth.getAccounts()
    const notRegisteredAccount = accounts[0]
    const signerNotRegisteredAccount = accounts[1]
    const ecdsaPublicKey = await addressToPublicKey(notRegisteredAccount, web3.eth.sign)
    await testLocallyWithWeb3Node(Register, ['--from', notRegisteredAccount], web3)
    await testLocallyWithWeb3Node(
      Lock,
      ['--from', notRegisteredAccount, '--value', '10000000000000000000000'],
      web3
    )
    await testLocallyWithWeb3Node(
      ValidatorRegister,
      [
        '--from',
        notRegisteredAccount,
        '--ecdsaKey',
        ecdsaPublicKey,
        '--blsKey',
        '0x4fa3f67fc913878b068d1fa1cdddc54913d3bf988dbe5a36a20fa888f20d4894c408a6773f3d7bde11154f2a3076b700d345a42fd25a0e5e83f4db5586ac7979ac2053cd95d8f2efd3e959571ceccaa743e02cf4be3f5d7aaddb0b06fc9aff00',
        '--blsSignature',
        '0xcdb77255037eb68897cd487fdd85388cbda448f617f874449d4b11588b0b7ad8ddc20d9bb450b513bb35664ea3923900',
        '--yes',
      ],
      web3
    )
    await testLocallyWithWeb3Node(
      Authorize,
      [
        '--from',
        notRegisteredAccount,
        '--role',
        'validator',
        '--signer',
        signerNotRegisteredAccount,
        '--signature',
        PROOF_OF_POSSESSION_SIGNATURE,
        '--force',
      ],
      web3
    )
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
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is a registered Account ",
        ],
        [
          "All checks passed",
        ],
        [
          "SendTransaction: authorizeTx",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)
  })

  test('fails if from is not an account', async () => {
    const accounts = await web3.eth.getAccounts()
    const notRegisteredAccount = accounts[0]
    const signerNotRegisteredAccount = accounts[1]
    await expect(
      testLocallyWithWeb3Node(
        Authorize,
        [
          '--from',
          notRegisteredAccount,
          '--role',
          'validator',
          '--signer',
          signerNotRegisteredAccount,
          '--signature',
          PROOF_OF_POSSESSION_SIGNATURE,
        ],

        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✘  0x5409ED021D9299bf6814279A6A1411A7e866A631 is a registered Account 0x5409ED021D9299bf6814279A6A1411A7e866A631 is not registered as an account. Try running account:register",
        ],
        [
          "   ✔  undefined is not a registered Validator ",
        ],
      ]
    `)
  })
})
