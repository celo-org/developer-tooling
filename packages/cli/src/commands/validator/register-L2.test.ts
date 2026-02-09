import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from '../lockedcelo/lock'
import ValidatorRegister from './register'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validator:register', (client) => {
  let account: string
  let ecdsaPublicKey: string

  beforeEach(async () => {
    const accounts = await client.eth.getAccounts()
    account = accounts[0]
    ecdsaPublicKey = await addressToPublicKey(account, client.eth.sign)
    await testLocallyWithWeb3Node(Register, ['--from', account], client)
    await testLocallyWithWeb3Node(
      Lock,
      ['--from', account, '--value', '10000000000000000000000'],
      client
    )
  })

  test('can register validator with 0x prefix', async () => {
    await expect(
      testLocallyWithWeb3Node(
        ValidatorRegister,
        ['--from', account, '--ecdsaKey', ecdsaPublicKey, '--yes'],
        client
      )
    ).resolves.toBe(undefined)
  })

  test('can register validator without 0x prefix', async () => {
    await expect(
      testLocallyWithWeb3Node(
        ValidatorRegister,
        ['--from', account, '--ecdsaKey', ecdsaPublicKey, '--yes'],
        client
      )
    ).resolves.toBe(undefined)
  })

  test('fails if validator already registered', async () => {
    await expect(
      testLocallyWithWeb3Node(
        ValidatorRegister,
        ['--from', account, '--ecdsaKey', ecdsaPublicKey, '--yes'],
        client
      )
    ).resolves.toBe(undefined)

    await expect(
      testLocallyWithWeb3Node(
        ValidatorRegister,
        ['--from', account, '--ecdsaKey', ecdsaPublicKey, '--yes'],
        client
      )
    ).rejects.toThrow("Some checks didn't pass!")
  })
})
