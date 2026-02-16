import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { stripAnsiCodesFromNestedArray, testLocallyWithNode } from '../../test-utils/cliUtils'
import { PROOF_OF_POSSESSION_SIGNATURE } from '../../test-utils/constants'
import Authorize from './authorize'
import Deauthorize from './deauthorize'
import Register from './register'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('account:deauthorize cmd', (client) => {
  test('can deauthorize attestation signer', async () => {
    const kit = newKitFromProvider(client.currentProvider)
    const accounts = await kit.connection.getAccounts()
    const notRegisteredAccount = accounts[0]
    const signerNotRegisteredAccount = accounts[1]
    await testLocallyWithNode(Register, ['--from', accounts[0]], client)
    await testLocallyWithNode(
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
      client
    )

    const logMock = jest.spyOn(console, 'log')

    await testLocallyWithNode(
      Deauthorize,
      [
        '--from',
        notRegisteredAccount,
        '--role',
        'attestation',
        '--signer',
        signerNotRegisteredAccount,
      ],
      client
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
    const kit = newKitFromProvider(client.currentProvider)
    const accounts = await kit.connection.getAccounts()
    const notRegisteredAccount = accounts[0]
    const signerNotRegisteredAccount = accounts[1]
    await testLocallyWithNode(Register, ['--from', notRegisteredAccount], client)

    await expect(
      testLocallyWithNode(
        Deauthorize,
        [
          '--from',
          notRegisteredAccount,
          '--role',
          'attestation',
          '--signer',
          signerNotRegisteredAccount,
        ],

        client
      )
    ).rejects.toMatchInlineSnapshot(
      `[Error: Invalid signer argument: 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb. The current signer for this role is: 0x5409ED021D9299bf6814279A6A1411A7e866A631]`
    )
  })
})
