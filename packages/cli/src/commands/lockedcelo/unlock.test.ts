import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import { LONG_TIMEOUT_MS, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Vote from '../election/vote'
import ValidatorAffiliate from '../validator/affiliate'
import ValidatorRegister from '../validator/register'
import ValidatorGroupMember from '../validatorgroup/member'
import ValidatorGroupRegister from '../validatorgroup/register'
import Lock from './lock'
import Unlock from './unlock'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('lockedcelo:unlock cmd', (client) => {
  test(
    'can unlock correctly from registered validator group',
    async () => {
      const accounts = await client.eth.getAccounts()
      const account = accounts[0]
      const validator = accounts[1]
      const kit = newKitFromWeb3(client)
      const lockedGold = await kit.contracts.getLockedGold()
      await testLocallyWithWeb3Node(Register, ['--from', account], client)
      await testLocallyWithWeb3Node(
        Lock,
        ['--from', account, '--value', '20000000000000000000000'],
        client
      )
      await testLocallyWithWeb3Node(
        ValidatorGroupRegister,
        ['--from', account, '--commission', '0', '--yes'],
        client
      )
      await testLocallyWithWeb3Node(Register, ['--from', validator], client)
      await testLocallyWithWeb3Node(
        Lock,
        ['--from', validator, '--value', '20000000000000000000000'],
        client
      )
      const ecdsaPublicKey = await addressToPublicKey(validator, client.eth.sign)
      await testLocallyWithWeb3Node(
        ValidatorRegister,
        ['--from', validator, '--ecdsaKey', ecdsaPublicKey, '--yes'],
        client
      )
      await testLocallyWithWeb3Node(
        ValidatorAffiliate,
        ['--yes', '--from', validator, account],
        client
      )
      await testLocallyWithWeb3Node(
        ValidatorGroupMember,
        ['--yes', '--from', account, '--accept', validator],
        client
      )
      await testLocallyWithWeb3Node(
        Vote,
        ['--from', account, '--for', account, '--value', '10000000000000000000000'],
        client
      )
      await testLocallyWithWeb3Node(
        Unlock,
        ['--from', account, '--value', '10000000000000000000000'],
        client
      )
      const pendingWithdrawalsTotalValue = await lockedGold.getPendingWithdrawalsTotalValue(account)
      expect(pendingWithdrawalsTotalValue.toFixed()).toBe('10000000000000000000000')
    },
    LONG_TIMEOUT_MS * 1.5
  )
})
