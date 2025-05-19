import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import Web3 from 'web3'
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

testWithAnvilL2('lockedcelo:unlock cmd', (web3: Web3) => {
  test(
    'can unlock correctly from registered validator group',
    async () => {
      const accounts = await web3.eth.getAccounts()
      const account = accounts[0]
      const validator = accounts[1]
      const kit = newKitFromWeb3(web3)
      const lockedGold = await kit.contracts.getLockedGold()
      await testLocallyWithWeb3Node(Register, ['--from', account], web3)
      await testLocallyWithWeb3Node(
        Lock,
        ['--from', account, '--value', '20000000000000000000000'],
        web3
      )
      await testLocallyWithWeb3Node(
        ValidatorGroupRegister,
        ['--from', account, '--commission', '0', '--yes'],
        web3
      )
      await testLocallyWithWeb3Node(Register, ['--from', validator], web3)
      await testLocallyWithWeb3Node(
        Lock,
        ['--from', validator, '--value', '20000000000000000000000'],
        web3
      )
      const ecdsaPublicKey = await addressToPublicKey(validator, web3.eth.sign)
      await testLocallyWithWeb3Node(
        ValidatorRegister,
        ['--from', validator, '--ecdsaKey', ecdsaPublicKey, '--yes'],
        web3
      )
      await testLocallyWithWeb3Node(
        ValidatorAffiliate,
        ['--yes', '--from', validator, account],
        web3
      )
      await testLocallyWithWeb3Node(
        ValidatorGroupMember,
        ['--yes', '--from', account, '--accept', validator],
        web3
      )
      await testLocallyWithWeb3Node(
        Vote,
        ['--from', account, '--for', account, '--value', '10000000000000000000000'],
        web3
      )
      await testLocallyWithWeb3Node(
        Unlock,
        ['--from', account, '--value', '10000000000000000000000'],
        web3
      )
      const pendingWithdrawalsTotalValue = await lockedGold.getPendingWithdrawalsTotalValue(account)
      expect(pendingWithdrawalsTotalValue.toFixed()).toBe('10000000000000000000000')
    },
    LONG_TIMEOUT_MS * 1.5
  )
})
