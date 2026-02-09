import { NULL_ADDRESS, StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { setBalance, testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { addressToPublicKey, serializeSignature } from '@celo/utils/lib/signatureUtils'
import BigNumber from 'bignumber.js'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import ValidatorRegister from '../validator/register'
import Authorize from './authorize'
import CreateAccount from './create-account'
import LockedCelo from './locked-gold'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:authorize cmd', (client) => {
  let contractAddress: string
  let kit: any
  let logSpy: jest.SpyInstance

  beforeEach(async () => {
    const accounts = (await client.eth.getAccounts()) as StrongAddress[]
    kit = newKitFromWeb3(client)
    contractAddress = await deployReleaseGoldContract(
      client,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      accounts[1],
      accounts[0],
      NULL_ADDRESS, // when cannot be revoked and can validate then refund address needs to be NULL_ADDRESS
      true // can validate
    )
    // contract needs to have sufficient funds to lock CELO
    await setBalance(
      client,
      contractAddress as StrongAddress,
      new BigNumber(client.utils.toWei('100000', 'ether'))
    )
    await testLocallyWithWeb3Node(CreateAccount, ['--contract', contractAddress], client)
  })

  describe('can authorize account signers', () => {
    let pop: any
    let accounts: any

    beforeEach(async () => {
      accounts = await client.eth.getAccounts()
      const accountsWrapper = await kit.contracts.getAccounts()
      pop = await accountsWrapper.generateProofOfKeyPossession(contractAddress, accounts[1])
      logSpy = jest.spyOn(console, 'log')
    })

    test('can authorize account vote signer ', async () => {
      await expect(
        testLocallyWithWeb3Node(
          Authorize,
          [
            '--contract',
            contractAddress,
            '--role',
            'vote',
            '--signer',
            accounts[1],
            '--signature',
            serializeSignature(pop),
          ],
          client
        )
      ).resolves.toBeUndefined()
      expect(stripAnsiCodesFromNestedArray(logSpy.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  0xDdbe68bEae54dd94465C6bbA2477EE9500ce1974 is a registered Account ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: authorizevoteTx",
          ],
          [
            "txHash: 0xtxhash",
          ],
        ]
      `)
    })

    test('can authorize account validator signer', async () => {
      await expect(
        testLocallyWithWeb3Node(
          Authorize,
          [
            '--contract',
            contractAddress,
            '--role',
            'validator',
            '--signer',
            accounts[1],
            '--signature',
            serializeSignature(pop),
          ],
          client
        )
      ).resolves.toBeUndefined()
      expect(stripAnsiCodesFromNestedArray(logSpy.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  0xDdbe68bEae54dd94465C6bbA2477EE9500ce1974 is not a registered Account ",
          ],
          [
            "   ✔  Contract is not revoked ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: createAccount",
          ],
          [
            "txHash: 0xtxhash",
          ],
          [
            "Running Checks:",
          ],
          [
            "   ✔  0xDdbe68bEae54dd94465C6bbA2477EE9500ce1974 is a registered Account ",
          ],
          [
            "   ✔  undefined is not a registered Validator ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: authorizevalidatorTx",
          ],
          [
            "txHash: 0xtxhash",
          ],
        ]
      `)
    })

    test('can authorize account attestation signer', async () => {
      await expect(
        testLocallyWithWeb3Node(
          Authorize,
          [
            '--contract',
            contractAddress,
            '--role',
            'attestation',
            '--signer',
            accounts[1],
            '--signature',
            serializeSignature(pop),
          ],
          client
        )
      ).resolves.toBeUndefined()
      expect(stripAnsiCodesFromNestedArray(logSpy.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  0xDdbe68bEae54dd94465C6bbA2477EE9500ce1974 is not a registered Account ",
          ],
          [
            "   ✔  Contract is not revoked ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: createAccount",
          ],
          [
            "txHash: 0xtxhash",
          ],
          [
            "Running Checks:",
          ],
          [
            "   ✔  0xDdbe68bEae54dd94465C6bbA2477EE9500ce1974 is a registered Account ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: authorizeattestationTx",
          ],
          [
            "txHash: 0xtxhash",
          ],
        ]
      `)
    })
  })

  test('can register as a validator from an authorized signer', async () => {
    const accounts = await client.eth.getAccounts()
    const accountsWrapper = await kit.contracts.getAccounts()
    const signer = accounts[1]
    const pop = await accountsWrapper.generateProofOfKeyPossession(contractAddress, signer)
    const ecdsaPublicKey = await addressToPublicKey(signer, client.eth.sign)
    await expect(
      testLocallyWithWeb3Node(
        LockedCelo,
        [
          '--contract',
          contractAddress,
          '--action',
          'lock',
          '--value',
          '10000000000000000000000',
          '--yes',
        ],
        client
      )
    ).resolves.toBeUndefined()
    await expect(
      testLocallyWithWeb3Node(
        Authorize,
        [
          '--contract',
          contractAddress,
          '--role',
          'validator',
          '--signer',
          signer,
          '--signature',
          serializeSignature(pop),
        ],
        client
      )
    ).resolves.toBeUndefined()
    await expect(
      testLocallyWithWeb3Node(
        ValidatorRegister,
        ['--from', signer, '--ecdsaKey', ecdsaPublicKey, '--yes'],
        client
      )
    ).resolves.toBeUndefined()
  })

  test('fails if contract is not registered as an account', async () => {
    const accounts = await client.eth.getAccounts()
    await expect(
      testLocallyWithWeb3Node(
        Authorize,
        [
          '--contract',
          contractAddress,
          '--role',
          'validator',
          '--signer',
          accounts[1],
          '--signature',
          '0x1b9fca4bbb5bfb1dbe69ef1cddbd9b4202dcb6b134c5170611e1e36ecfa468d7b46c85328d504934fce6c2a1571603a50ae224d2b32685e84d4d1a1eebad8452eb',
        ],

        client
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Unable to parse signature (expected signer 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb)"`
    )
  })
})
