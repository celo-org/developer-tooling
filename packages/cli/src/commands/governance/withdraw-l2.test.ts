import { StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { GovernanceWrapper, Proposal } from '@celo/contractkit/lib/wrappers/Governance'
import {
  setBalance,
  testWithAnvilL2,
  withImpersonatedAccount,
} from '@celo/dev-utils/lib/anvil-test'
import { timeTravel } from '@celo/dev-utils/lib/ganache-test'
import { ProposalBuilder } from '@celo/governance'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import Withdraw from './withdraw'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('governance:withdraw', (web3: Web3) => {
  let minDeposit: string
  const kit = newKitFromWeb3(web3)

  let accounts: StrongAddress[] = []
  let governance: GovernanceWrapper

  beforeEach(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]
    governance = await kit.contracts.getGovernance()
    minDeposit = (await governance.minDeposit()).toFixed()
    const proposal: Proposal = await new ProposalBuilder(kit).build()
    await governance
      .propose(proposal, 'URL')
      .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })
    const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()
    await timeTravel(dequeueFrequency + 1, web3)
    await governance.dequeueProposalsIfReady().sendAndWaitForReceipt()
  })

  test('can withdraw', async () => {
    const balanceBefore = await kit.connection.getBalance(accounts[0])

    await testLocallyWithWeb3Node(Withdraw, ['--from', accounts[0]], web3)

    const balanceAfter = await kit.connection.getBalance(accounts[0])
    const latestTransactionReceipt = await web3.eth.getTransactionReceipt(
      (
        await web3.eth.getBlock('latest')
      ).transactions[0]
    )

    // Safety check if the latest transaction was originated by expected account
    expect(latestTransactionReceipt.from.toLowerCase()).toEqual(accounts[0].toLowerCase())

    const difference = new BigNumber(balanceAfter)
      .minus(balanceBefore)
      .plus(latestTransactionReceipt.effectiveGasPrice * latestTransactionReceipt.gasUsed)

    expect(difference.toFixed()).toEqual(minDeposit)
  })

  it('can withdraw using --useMultiSig', async () => {
    const [multisigOwner] = (await web3.eth.getAccounts()) as StrongAddress[]
    const multisigAddress = await createMultisig(kit, [multisigOwner], 1, 1)
    const multisigBalance = new BigNumber(minDeposit)
    const proposal: Proposal = await new ProposalBuilder(kit).build()

    await withImpersonatedAccount(
      web3,
      multisigAddress,
      async () => {
        await governance
          .propose(proposal, 'http://example.com/proposal.json')
          .sendAndWaitForReceipt({ from: multisigAddress, value: minDeposit })
        // make sure the multisig contract has enough balance to perform the transaction
      },
      multisigBalance.multipliedBy(2)
    )

    // Zero out the balance for easier testing
    await setBalance(web3, multisigAddress, 0)

    // Safety check
    expect(await kit.connection.getBalance(multisigAddress)).toEqual('0')

    // Dequeue so it can be refunded
    const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()
    await timeTravel(dequeueFrequency + 1, web3)
    await governance.dequeueProposalsIfReady().sendAndWaitForReceipt()

    await testLocallyWithWeb3Node(
      Withdraw,
      ['--useMultiSig', '--for', multisigAddress, '--from', multisigOwner],
      web3
    )

    // After withdrawing the refunded deposit should be the minDeposit (as we zeroed out the balance before)
    expect(await kit.connection.getBalance(multisigAddress)).toEqual(minDeposit)
  })

  it.todo('fails if trying to withdraw using --useMultiSig not as a signatory')
})
