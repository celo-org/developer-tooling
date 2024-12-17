import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { LONG_TIMEOUT_MS, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import CreateAccount from './create-account'
import LockedGold from './locked-gold'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:locked-gold cmd', (web3: Web3) => {
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

  test(
    'can lock celo with pending withdrawals',
    async () => {
      const lockedGold = await kit.contracts.getLockedGold()
      await testLocallyWithWeb3Node(
        LockedGold,
        ['--contract', contractAddress, '--action', 'lock', '--value', '100'],
        web3
      )
      await testLocallyWithWeb3Node(
        LockedGold,
        ['--contract', contractAddress, '--action', 'unlock', '--value', '50'],
        web3
      )
      await testLocallyWithWeb3Node(
        LockedGold,
        ['--contract', contractAddress, '--action', 'lock', '--value', '75'],
        web3
      )
      await testLocallyWithWeb3Node(
        LockedGold,
        ['--contract', contractAddress, '--action', 'unlock', '--value', '50'],
        web3
      )
      const pendingWithdrawalsTotalValue =
        await lockedGold.getPendingWithdrawalsTotalValue(contractAddress)
      expect(pendingWithdrawalsTotalValue.toFixed()).toBe('50')
    },
    LONG_TIMEOUT_MS * 2
  )
})
