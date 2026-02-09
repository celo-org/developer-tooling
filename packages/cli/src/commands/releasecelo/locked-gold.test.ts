import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { LONG_TIMEOUT_MS, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import CreateAccount from './create-account'
import LockedCelo from './locked-gold'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:locked-gold cmd', (client) => {
  let contractAddress: string
  let kit: ContractKit

  beforeEach(async () => {
    const accounts = (await client.eth.getAccounts()) as StrongAddress[]
    kit = newKitFromWeb3(client)

    contractAddress = await deployReleaseGoldContract(
      client,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      accounts[1],
      accounts[0],
      accounts[2]
    )

    await testLocallyWithWeb3Node(CreateAccount, ['--contract', contractAddress], client)
  })

  test(
    'can lock celo with pending withdrawals',
    async () => {
      const lockedGold = await kit.contracts.getLockedGold()
      await testLocallyWithWeb3Node(
        LockedCelo,
        ['--contract', contractAddress, '--action', 'lock', '--value', '100'],
        client
      )
      await testLocallyWithWeb3Node(
        LockedCelo,
        ['--contract', contractAddress, '--action', 'unlock', '--value', '50'],
        client
      )
      await testLocallyWithWeb3Node(
        LockedCelo,
        ['--contract', contractAddress, '--action', 'lock', '--value', '75'],
        client
      )
      await testLocallyWithWeb3Node(
        LockedCelo,
        ['--contract', contractAddress, '--action', 'unlock', '--value', '50'],
        client
      )
      const pendingWithdrawalsTotalValue =
        await lockedGold.getPendingWithdrawalsTotalValue(contractAddress)
      expect(pendingWithdrawalsTotalValue.toFixed()).toBe('50')
    },
    LONG_TIMEOUT_MS * 2
  )
})
