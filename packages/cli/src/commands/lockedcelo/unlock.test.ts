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

testWithAnvilL2('lockedcelo:unlock cmd', (providerOwner) => {
  test(
    'can unlock correctly from registered validator group',
    async () => {
      const kit = newKitFromProvider(providerOwner.currentProvider)
      const accounts = await kit.connection.getAccounts()
      const account = accounts[0]
      const validator = accounts[1]
      const lockedGold = await kit.contracts.getLockedGold()
      await testLocallyWithNode(Register, ['--from', account], providerOwner)
      await testLocallyWithNode(
        Lock,
        ['--from', account, '--value', '20000000000000000000000'],
        providerOwner
      )
      await testLocallyWithNode(
        ValidatorGroupRegister,
        ['--from', account, '--commission', '0', '--yes'],
        providerOwner
      )
      await testLocallyWithNode(Register, ['--from', validator], providerOwner)
      await testLocallyWithNode(
        Lock,
        ['--from', validator, '--value', '20000000000000000000000'],
        providerOwner
      )
      const ecdsaPublicKey = await addressToPublicKey(validator, kit.connection.sign)
      await testLocallyWithNode(
        ValidatorRegister,
        ['--from', validator, '--ecdsaKey', ecdsaPublicKey, '--yes'],
        providerOwner
      )
      await testLocallyWithNode(ValidatorAffiliate, ['--yes', '--from', validator, account], providerOwner)
      await testLocallyWithNode(
        ValidatorGroupMember,
        ['--yes', '--from', account, '--accept', validator],
        providerOwner
      )
      await testLocallyWithNode(
        Vote,
        ['--from', account, '--for', account, '--value', '10000000000000000000000'],
        providerOwner
      )
      await testLocallyWithNode(
        Unlock,
        ['--from', account, '--value', '10000000000000000000000'],
        providerOwner
      )
      const pendingWithdrawalsTotalValue = await lockedGold.getPendingWithdrawalsTotalValue(account)
      expect(pendingWithdrawalsTotalValue.toFixed()).toBe('10000000000000000000000')
    },
    LONG_TIMEOUT_MS * 1.5
  )
})
