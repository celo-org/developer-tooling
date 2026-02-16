import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { LONG_TIMEOUT_MS, testLocallyWithNode } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import CreateAccount from './create-account'
import LockedCelo from './locked-gold'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:locked-gold cmd', (client) => {
  let contractAddress: string
  let kit: ContractKit

  beforeEach(async () => {
    kit = newKitFromProvider(client.currentProvider)
    const accounts = (await kit.connection.getAccounts()) as StrongAddress[]

    contractAddress = await deployReleaseGoldContract(
      client,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      accounts[1],
      accounts[0],
      accounts[2]
    )

    await testLocallyWithNode(CreateAccount, ['--contract', contractAddress], client)
  })

  test(
    'can lock celo with pending withdrawals',
    async () => {
      const lockedGold = await kit.contracts.getLockedGold()
      await testLocallyWithNode(
        LockedCelo,
        ['--contract', contractAddress, '--action', 'lock', '--value', '100'],
        client
      )
      await testLocallyWithNode(
        LockedCelo,
        ['--contract', contractAddress, '--action', 'unlock', '--value', '50'],
        client
      )
      await testLocallyWithNode(
        LockedCelo,
        ['--contract', contractAddress, '--action', 'lock', '--value', '75'],
        client
      )
      await testLocallyWithNode(
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
