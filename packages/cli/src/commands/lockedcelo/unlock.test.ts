import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import { LONG_TIMEOUT_MS, testLocallyWithNode } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Vote from '../election/vote'
import ValidatorAffiliate from '../validator/affiliate'
import ValidatorRegister from '../validator/register'
import ValidatorGroupMember from '../validatorgroup/member'
import ValidatorGroupRegister from '../validatorgroup/register'
import Lock from './lock'
import Unlock from './unlock'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('lockedcelo:unlock cmd', (provider) => {
  test(
    'can unlock correctly from registered validator group',
    async () => {
      const kit = newKitFromProvider(provider)
      const accounts = await kit.connection.getAccounts()
      const account = accounts[0]
      const validator = accounts[1]
      const lockedGold = await kit.contracts.getLockedGold()
      await testLocallyWithNode(Register, ['--from', account], provider)
      await testLocallyWithNode(
        Lock,
        ['--from', account, '--value', '20000000000000000000000'],
        provider
      )
      await testLocallyWithNode(
        ValidatorGroupRegister,
        ['--from', account, '--commission', '0', '--yes'],
        provider
      )
      await testLocallyWithNode(Register, ['--from', validator], provider)
      await testLocallyWithNode(
        Lock,
        ['--from', validator, '--value', '20000000000000000000000'],
        provider
      )
      const ecdsaPublicKey = await addressToPublicKey(validator, kit.connection.sign)
      await testLocallyWithNode(
        ValidatorRegister,
        ['--from', validator, '--ecdsaKey', ecdsaPublicKey, '--yes'],
        provider
      )
      await testLocallyWithNode(
        ValidatorAffiliate,
        ['--yes', '--from', validator, account],
        provider
      )
      await testLocallyWithNode(
        ValidatorGroupMember,
        ['--yes', '--from', account, '--accept', validator],
        provider
      )
      await testLocallyWithNode(
        Vote,
        ['--from', account, '--for', account, '--value', '10000000000000000000000'],
        provider
      )
      await testLocallyWithNode(
        Unlock,
        ['--from', account, '--value', '10000000000000000000000'],
        provider
      )
      const pendingWithdrawalsTotalValue = await lockedGold.getPendingWithdrawalsTotalValue(account)
      expect(pendingWithdrawalsTotalValue.toFixed()).toBe('10000000000000000000000')
    },
    LONG_TIMEOUT_MS * 1.5
  )
})
