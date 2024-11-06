import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import CreateAccount from './create-account'
import SetAccount from './set-account'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:set-account cmd', (web3: Web3) => {
  let contractAddress: string
  let kit: ContractKit

  beforeEach(async () => {
    const accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit = newKitFromWeb3(web3)

    contractAddress = await deployReleaseGoldContract(
      web3,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      accounts[1],
      accounts[0],
      accounts[2]
    )

    await testLocallyWithWeb3Node(CreateAccount, ['--contract', contractAddress], web3)
  })

  it('sets all the properties', async () => {
    const TEST_ENCRYPTION_KEY =
      '0x041bb96e35f9f4b71ca8de561fff55a249ddf9d13ab582bdd09a09e75da68ae4cd0ab7038030f41b237498b4d76387ae878dc8d98fd6f6db2c15362d1a3bf11216'
    const accountWrapper = await kit.contracts.getAccounts()

    await testLocallyWithWeb3Node(
      SetAccount,
      ['--contract', contractAddress, '--property', 'name', '--value', 'test-name'],
      web3
    )

    await testLocallyWithWeb3Node(
      SetAccount,
      [
        '--contract',
        contractAddress,
        '--property',
        'dataEncryptionKey',
        '--value',
        TEST_ENCRYPTION_KEY,
      ],
      web3
    )

    await testLocallyWithWeb3Node(
      SetAccount,
      ['--contract', contractAddress, '--property', 'metaURL', '--value', 'test-url'],
      web3
    )

    expect(await accountWrapper.getName(contractAddress)).toEqual('test-name')
    expect(await accountWrapper.getDataEncryptionKey(contractAddress)).toEqual(TEST_ENCRYPTION_KEY)
    expect(await accountWrapper.getMetadataURL(contractAddress)).toEqual('test-url')
  })

  it('fails if unknown property', async () => {
    await expect(
      testLocallyWithWeb3Node(
        SetAccount,
        ['--contract', contractAddress, '--property', 'unknown', '--value', 'test-value'],
        web3
      )
    ).rejects.toMatchInlineSnapshot(`
      [Error: Expected --property=unknown to be one of: name, dataEncryptionKey, metaURL
      See more help with --help]
    `)
  })
})
