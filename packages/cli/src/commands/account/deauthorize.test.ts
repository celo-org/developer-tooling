import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { PROOF_OF_POSSESSION_SIGNATURE } from '../../test-utils/constants'
import Authorize from './authorize'
import Deauthorize from './deauthorize'
import Register from './register'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL1('account:deauthorize cmd', (web3) => {
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
    ).rejects.toThrow()
  })
})
