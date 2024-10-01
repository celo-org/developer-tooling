import { StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { GovernanceWrapper, Proposal } from '@celo/contractkit/lib/wrappers/Governance'
import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { timeTravel } from '@celo/dev-utils/lib/ganache-test'
import { ProposalBuilder } from '@celo/governance'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Withdraw from './withdraw'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL1('governance:withdraw', (web3: Web3) => {
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
})
