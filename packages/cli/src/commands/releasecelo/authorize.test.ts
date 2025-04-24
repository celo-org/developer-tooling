import { NULL_ADDRESS, StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { setBalance, testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { addressToPublicKey, serializeSignature } from '@celo/utils/lib/signatureUtils'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import ValidatorRegister from '../validator/register'
import Authorize from './authorize'
import CreateAccount from './create-account'
import LockedCelo from './locked-gold'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:authorize cmd', (web3: Web3) => {
  let contractAddress: string
  let kit: any

  beforeEach(async () => {
    const accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit = newKitFromWeb3(web3)
    contractAddress = await deployReleaseGoldContract(
      web3,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      accounts[1],
      accounts[0],
      NULL_ADDRESS, // when cannot be revoked and can validate then refund address needs to be NULL_ADDRESS
      true // can validate
    )

    // contract needs to have sufficient funds to lock CELO
    await setBalance(
      web3,
      contractAddress as StrongAddress,
      new BigNumber(web3.utils.toWei('100000', 'ether'))
    )

    await testLocallyWithWeb3Node(CreateAccount, ['--contract', contractAddress], web3)
  })

  describe('can authorize account signers', () => {
    let pop: any
    let accounts: any

    beforeEach(async () => {
      accounts = await web3.eth.getAccounts()
      const accountsWrapper = await kit.contracts.getAccounts()
      pop = await accountsWrapper.generateProofOfKeyPossession(contractAddress, accounts[1])
    })

    test('can authorize account vote signer ', async () => {
      await testLocallyWithWeb3Node(
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
        web3
      )
    })

    test('can authorize account validator signer', async () => {
      await testLocallyWithWeb3Node(
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
        web3
      )
    })

    test('can authorize account attestation signer', async () => {
      await testLocallyWithWeb3Node(
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
        web3
      )
    })
  })

  test('can register as a validator from an authorized signer', async () => {
    const accounts = await web3.eth.getAccounts()
    const accountsWrapper = await kit.contracts.getAccounts()
    const signer = accounts[1]
    const pop = await accountsWrapper.generateProofOfKeyPossession(contractAddress, signer)
    const ecdsaPublicKey = await addressToPublicKey(signer, web3.eth.sign)
    await testLocallyWithWeb3Node(
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
      web3
    )
    await testLocallyWithWeb3Node(
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
      web3
    )
    await testLocallyWithWeb3Node(
      ValidatorRegister,
      ['--from', signer, '--ecdsaKey', ecdsaPublicKey, '--yes'],
      web3
    )
  })

  test('can authorize signer with BLS keys after registering as validator', async () => {
    const accounts = await web3.eth.getAccounts()
    const accountsWrapper = await kit.contracts.getAccounts()
    const signer = accounts[1]
    const pop = await accountsWrapper.generateProofOfKeyPossession(contractAddress, signer)
    const ecdsaPublicKey = await addressToPublicKey(signer, web3.eth.sign)

    const signerBLS = accounts[2]
    const popBLS = await accountsWrapper.generateProofOfKeyPossession(contractAddress, signerBLS)
    const newBlsPublicKey = web3.utils.randomHex(96)
    const newBlsPoP = web3.utils.randomHex(48)

    await testLocallyWithWeb3Node(
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
      web3
    )
    await testLocallyWithWeb3Node(
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
      web3
    )
    await testLocallyWithWeb3Node(
      ValidatorRegister,
      ['--from', signer, '--ecdsaKey', ecdsaPublicKey, '--yes'],
      web3
    )

    await expect(
      testLocallyWithWeb3Node(
        Authorize,
        [
          '--contract',
          contractAddress,
          '--role',
          'validator',
          '--signer',
          signerBLS,
          '--signature',
          serializeSignature(popBLS),
          '--blsKey',
          newBlsPublicKey,
          '--blsPop',
          newBlsPoP,
        ],

        web3
      )
    ).rejects.toMatchInlineSnapshot(`[Error: BLS keys are not supported in L2]`)
  })

  test('cannot authorize signer without BLS keys after registering as validator', async () => {
    const accounts = await web3.eth.getAccounts()
    const accountsWrapper = await kit.contracts.getAccounts()
    const signer = accounts[1]
    const pop = await accountsWrapper.generateProofOfKeyPossession(contractAddress, signer)
    const ecdsaPublicKey = await addressToPublicKey(signer, web3.eth.sign)

    const signerNew = accounts[2]
    const popNew = await accountsWrapper.generateProofOfKeyPossession(contractAddress, signerNew)

    await testLocallyWithWeb3Node(
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
      web3
    )
    await testLocallyWithWeb3Node(
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
      web3
    )
    await testLocallyWithWeb3Node(
      ValidatorRegister,
      ['--from', signer, '--ecdsaKey', ecdsaPublicKey, '--yes'],
      web3
    )
    await expect(
      testLocallyWithWeb3Node(
        Authorize,
        [
          '--contract',
          contractAddress,
          '--role',
          'validator',
          '--signer',
          signerNew,
          '--signature',
          serializeSignature(popNew),
        ],
        web3
      )
    ).rejects.toThrow()
  })

  test('fails if contract is not registered as an account', async () => {
    const accounts = await web3.eth.getAccounts()
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
        web3
      )
    ).rejects.toThrow()
  })
})
