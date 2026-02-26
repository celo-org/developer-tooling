import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import { testLocallyWithNode } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from '../lockedcelo/lock'
import ValidatorRegister from './register'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validator:register', (providerOwner) => {
  let account: string
  let ecdsaPublicKey: string

  beforeEach(async () => {
    const kit = newKitFromProvider(providerOwner.currentProvider)
    const accounts = await kit.connection.getAccounts()
    account = accounts[0]
    ecdsaPublicKey = await addressToPublicKey(account, kit.connection.sign)
    await testLocallyWithNode(Register, ['--from', account], providerOwner)
    await testLocallyWithNode(
      Lock,
      ['--from', account, '--value', '10000000000000000000000'],
      providerOwner
    )
  })

  test('can register validator with 0x prefix', async () => {
    await expect(
      testLocallyWithNode(
        ValidatorRegister,
        ['--from', account, '--ecdsaKey', ecdsaPublicKey, '--yes'],
        providerOwner
      )
    ).resolves.toBe(undefined)
  })

  test('can register validator without 0x prefix', async () => {
    await expect(
      testLocallyWithNode(
        ValidatorRegister,
        ['--from', account, '--ecdsaKey', ecdsaPublicKey, '--yes'],
        providerOwner
      )
    ).resolves.toBe(undefined)
  })

  test('fails if validator already registered', async () => {
    await expect(
      testLocallyWithNode(
        ValidatorRegister,
        ['--from', account, '--ecdsaKey', ecdsaPublicKey, '--yes'],
        providerOwner
      )
    ).resolves.toBe(undefined)

    await expect(
      testLocallyWithNode(
        ValidatorRegister,
        ['--from', account, '--ecdsaKey', ecdsaPublicKey, '--yes'],
        providerOwner
      )
    ).rejects.toThrow("Some checks didn't pass!")
  })
})
