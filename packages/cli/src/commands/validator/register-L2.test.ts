import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from '../lockedcelo/lock'
import ValidatorRegister from './register'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validator:register', (web3: Web3) => {
  let account: string
  let ecdsaPublicKey: string

  beforeEach(async () => {
    const accounts = await web3.eth.getAccounts()
    account = accounts[0]
    ecdsaPublicKey = await addressToPublicKey(account, web3.eth.sign)
    await testLocallyWithWeb3Node(Register, ['--from', account], web3)
    await testLocallyWithWeb3Node(
      Lock,
      ['--from', account, '--value', '10000000000000000000000'],
      web3
    )
  })

  test('can register validator with 0x prefix', async () => {
    await expect(
      testLocallyWithWeb3Node(
        ValidatorRegister,
        ['--from', account, '--ecdsaKey', ecdsaPublicKey, '--yes'],
        web3
      )
    ).resolves.toBe(undefined)
  })

  test('can register validator without 0x prefix', async () => {
    await expect(
      testLocallyWithWeb3Node(
        ValidatorRegister,
        ['--from', account, '--ecdsaKey', ecdsaPublicKey, '--yes'],
        web3
      )
    ).resolves.toBe(undefined)
  })

  test('fails if validator already registered', async () => {
    await expect(
      testLocallyWithWeb3Node(
        ValidatorRegister,
        ['--from', account, '--ecdsaKey', ecdsaPublicKey, '--yes'],
        web3
      )
    ).resolves.toBe(undefined)

    await expect(
      testLocallyWithWeb3Node(
        ValidatorRegister,
        ['--from', account, '--ecdsaKey', ecdsaPublicKey, '--yes'],
        web3
      )
    ).rejects.toThrow("Some checks didn't pass!")
  })
})
