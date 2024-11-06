import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { PROOF_OF_POSSESSION_SIGNATURE } from '../../test-utils/constants'
import Authorize from './authorize'
import Deauthorize from './deauthorize'
import Register from './register'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('account:deauthorize cmd', (web3) => {
  test('can deauthorize attestation signer', async () => {
    const accounts = await web3.eth.getAccounts()
    const notRegisteredAccount = accounts[0]
    const signerNotRegisteredAccount = accounts[1]
    await testLocallyWithWeb3Node(Register, ['--from', accounts[0]], web3)
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

    const logMock = jest.spyOn(console, 'log')

    await testLocallyWithWeb3Node(
      Deauthorize,
      [
        '--from',
        notRegisteredAccount,
        '--role',
        'attestation',
        '--signer',
        signerNotRegisteredAccount,
      ],
      web3
    )

    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "SendTransaction: deauthorizeTx",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)
  })

  test('cannot deauthorize a non-authorized signer', async () => {
    const accounts = await web3.eth.getAccounts()
    const notRegisteredAccount = accounts[0]
    const signerNotRegisteredAccount = accounts[1]
    await testLocallyWithWeb3Node(Register, ['--from', notRegisteredAccount], web3)

    await expect(
      testLocallyWithWeb3Node(
        Deauthorize,
        [
          '--from',
          notRegisteredAccount,
          '--role',
          'attestation',
          '--signer',
          signerNotRegisteredAccount,
        ],

        web3
      )
    ).rejects.toMatchInlineSnapshot(
      `[Error: Invalid signer argument: 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb. The current signer for this role is: 0x5409ED021D9299bf6814279A6A1411A7e866A631]`
    )
  })
})
