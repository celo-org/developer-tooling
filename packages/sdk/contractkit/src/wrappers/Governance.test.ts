import { Address, StrongAddress } from '@celo/base/lib/address'
import { type ContractRef } from '@celo/connect'
import { asCoreContractsOwner, testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import BigNumber from 'bignumber.js'
import { encodeFunctionData } from 'viem'
import { CeloContract } from '..'
import { newKitFromProvider } from '../kit'
import { AccountsWrapper } from './Accounts'
import { GovernanceWrapper, Proposal, ProposalTransaction, VoteValue } from './Governance'
import { LockedGoldWrapper } from './LockedGold'
import { MultiSigWrapper } from './MultiSig'

testWithAnvilL2('Governance Wrapper', (provider) => {
  const ONE_SEC = 1000
  const kit = newKitFromProvider(provider)
  const ONE_CGLD = new BigNumber('1e18').toFixed()

  let accounts: StrongAddress[] = []
  let governance: GovernanceWrapper
  let governanceApproverMultiSig: MultiSigWrapper
  let lockedGold: LockedGoldWrapper
  let accountWrapper: AccountsWrapper
  let registry: ContractRef
  let minDeposit: string
  let dequeueFrequency: number
  let referendumStageDuration: number

  beforeAll(async () => {
    accounts = await kit.connection.getAccounts()
    kit.defaultAccount = accounts[0]
    governance = await kit.contracts.getGovernance()
    governanceApproverMultiSig = await kit.contracts.getMultiSig(await governance.getApprover())
    registry = await kit._contracts.getRegistry()
    lockedGold = await kit.contracts.getLockedGold()
    accountWrapper = await kit.contracts.getAccounts()
    minDeposit = (await governance.minDeposit()).toFixed()
    referendumStageDuration = (await governance.stageDurations()).Referendum.toNumber()
    dequeueFrequency = (await governance.dequeueFrequency()).toNumber()

    for (const account of accounts.slice(0, 4)) {
      const createHash = await accountWrapper.createAccount({ from: account })
      await kit.connection.waitForTransactionReceipt(createHash)
      const lockHash = await lockedGold.lock({ from: account, value: ONE_CGLD })
      await kit.connection.waitForTransactionReceipt(lockHash)
    }
  })

  type Repoint = [CeloContract, Address]

  const registryRepointProposal = (repoints: Repoint[]) => {
    const proposals: ProposalTransaction[] = repoints.map<ProposalTransaction>((repoint) => {
      return {
        value: '0',
        to: registry.address,
        input: encodeFunctionData({
          abi: registry.abi as any,
          functionName: 'setAddressFor',
          args: repoint,
        }),
      }
    })
    return proposals as Proposal
  }

  it('#getConfig', async () => {
    expect(await governance.getConfig()).toMatchInlineSnapshot(`
      {
        "concurrentProposals": "3",
        "dequeueFrequency": "14400",
        "minDeposit": "100000000000000000000",
        "participationParameters": {
          "baseline": "0.005",
          "baselineFloor": "0.01",
          "baselineQuorumFactor": "1",
          "baselineUpdateFactor": "0.2",
        },
        "queueExpiry": "2419200",
        "stageDurations": {
          "Execution": "604800",
          "Referendum": "86400",
        },
      }
    `)
  })

  describe('Proposals', () => {
    const repoints: Repoint[] = [
      [CeloContract.Freezer, '0x0000000000000000000000000000000000000001'],
      [CeloContract.Escrow, '0x0000000000000000000000000000000000000002'],
    ]
    const proposalID = new BigNumber(1)

    let proposal: Proposal
    beforeAll(() => (proposal = registryRepointProposal(repoints)))

    const proposeFn = async (proposer: Address, proposeTwice = false) => {
      if (proposeTwice) {
        const hash = await governance.propose(proposal, 'URL', {
          from: proposer,
          value: minDeposit,
        })
        await kit.connection.waitForTransactionReceipt(hash)
      }

      const hash = await governance.propose(proposal, 'URL', { from: proposer, value: minDeposit })
      await kit.connection.waitForTransactionReceipt(hash)
    }

    const upvoteFn = async (upvoter: Address, shouldTimeTravel = true, proposalId?: BigNumber) => {
      const hash = await governance.upvote(proposalId ?? proposalID, upvoter, { from: upvoter })
      await kit.connection.waitForTransactionReceipt(hash)
      if (shouldTimeTravel) {
        await timeTravel(dequeueFrequency, provider)
        const dequeueHash = await governance.dequeueProposalsIfReady()
        await kit.connection.waitForTransactionReceipt(dequeueHash)
      }
    }

    // protocol/truffle-config defines approver address as accounts[0]
    const approveFn = async () => {
      await asCoreContractsOwner(provider, async (ownerAddress) => {
        const dequeue = await governance.getDequeue()
        const index = dequeue.findIndex((id) => id.eq(proposalID))
        const approveData = governance.encodeFunctionData('approve', [proposalID, index])
        const hash = await governanceApproverMultiSig.submitOrConfirmTransaction(
          governance.address,
          approveData,
          '0',
          { from: ownerAddress }
        )
        await kit.connection.waitForTransactionReceipt(hash)
      })
    }

    const voteFn = async (voter: Address) => {
      const hash = await governance.vote(proposalID, 'Yes', { from: voter })
      await kit.connection.waitForTransactionReceipt(hash)
      await timeTravel(referendumStageDuration, provider)
    }

    it('#propose', async () => {
      await proposeFn(accounts[0])

      const proposalRecord = await governance.getProposalRecord(proposalID)
      expect(proposalRecord.metadata.proposer).toBe(accounts[0])
      expect(proposalRecord.metadata.transactionCount).toBe(proposal.length)
      expect(proposalRecord.proposal).toStrictEqual(proposal)
      expect(proposalRecord.stage).toBe('Queued')
    })

    describe('#getHotfixRecord', () => {
      it('gets hotfix record', async () => {
        const kit = newKitFromProvider(provider)
        const governance = await kit.contracts.getGovernance()
        const hotfixHash = Buffer.from('0x', 'hex')

        const hotfixRecordL2 = await governance.getHotfixRecord(hotfixHash)
        expect(hotfixRecordL2).toMatchInlineSnapshot(`
          {
            "approved": false,
            "councilApproved": false,
            "executed": false,
            "executionTimeLimit": "0",
          }
        `)
      })
    })

    it('#upvote', async () => {
      const proposalId = new BigNumber(2)
      await proposeFn(accounts[0], true)
      // shouldTimeTravel is false so getUpvotes isn't on dequeued proposal
      await upvoteFn(accounts[1], false, proposalId)

      const voteWeight = await governance.getVoteWeight(accounts[1])
      const upvotes = await governance.getUpvotes(proposalId)
      expect(upvotes).toEqBigNumber(voteWeight)
      expect(upvotes).toEqBigNumber(ONE_CGLD)

      const upvoter = await governance.getVoter(accounts[1])
      const expectedUpvoteRecord = { proposalID: proposalId, upvotes: new BigNumber(ONE_CGLD) }
      expect(upvoter.upvote).toEqual(expectedUpvoteRecord)
    })

    it('#revokeUpvote', async () => {
      const proposalId = new BigNumber(2)
      await proposeFn(accounts[0], true)
      // shouldTimeTravel is false so revoke isn't on dequeued proposal
      await upvoteFn(accounts[1], false, proposalId)

      const before = await governance.getUpvotes(proposalId)
      const upvoteRecord = await governance.getUpvoteRecord(accounts[1])

      const hash = await governance.revokeUpvote(accounts[1], { from: accounts[1] })
      await kit.connection.waitForTransactionReceipt(hash)

      const after = await governance.getUpvotes(proposalId)
      expect(after).toEqBigNumber(before.minus(upvoteRecord.upvotes))
    })

    it('#approve', async () => {
      await proposeFn(accounts[0])
      await timeTravel(dequeueFrequency, provider)
      const dequeueHash = await governance.dequeueProposalsIfReady()
      await kit.connection.waitForTransactionReceipt(dequeueHash)
      await approveFn()

      const approved = await governance.isApproved(proposalID)
      expect(approved).toBeTruthy()
    })

    it('#vote', async () => {
      await proposeFn(accounts[0])
      await timeTravel(dequeueFrequency, provider)
      const dequeueHash = await governance.dequeueProposalsIfReady()
      await kit.connection.waitForTransactionReceipt(dequeueHash)
      await approveFn()
      await voteFn(accounts[2])

      const voteWeight = await governance.getVoteWeight(accounts[2])
      const yesVotes = (await governance.getVotes(proposalID))[VoteValue.Yes]
      expect(yesVotes).toEqBigNumber(voteWeight)
    })

    it('#getVoteRecord', async () => {
      const voter = accounts[2]
      await proposeFn(accounts[0])
      await timeTravel(dequeueFrequency, provider)
      const dequeueHash = await governance.dequeueProposalsIfReady()
      await kit.connection.waitForTransactionReceipt(dequeueHash)
      await approveFn()
      await voteFn(voter)

      const voteWeight = await governance.getVoteWeight(voter)
      const yesVotes = (await governance.getVotes(proposalID))[VoteValue.Yes]
      expect(yesVotes).toEqBigNumber(voteWeight)

      const voteRecord = await governance.getVoteRecord(voter, proposalID)
      expect(voteRecord?.yesVotes).toEqBigNumber(voteWeight)
      expect(voteRecord?.noVotes).toEqBigNumber(0)
      expect(voteRecord?.abstainVotes).toEqBigNumber(0)
    })

    it('#votePartially', async () => {
      await proposeFn(accounts[0])
      await timeTravel(dequeueFrequency, provider)
      const dequeueHash = await governance.dequeueProposalsIfReady()
      await kit.connection.waitForTransactionReceipt(dequeueHash)
      await approveFn()

      const yes = 10
      const no = 20
      const abstain = 0

      const hash = await governance.votePartially(proposalID, yes, no, abstain, {
        from: accounts[2],
      })
      await kit.connection.waitForTransactionReceipt(hash)
      await timeTravel(referendumStageDuration, provider)

      const votes = await governance.getVotes(proposalID)
      const yesVotes = votes[VoteValue.Yes]
      const noVotes = votes[VoteValue.No]
      const abstainVotes = votes[VoteValue.Abstain]
      expect(yesVotes).toEqBigNumber(yes)
      expect(noVotes).toEqBigNumber(no)
      expect(abstainVotes).toEqBigNumber(abstain)
    })

    it(
      '#execute',
      async () => {
        await proposeFn(accounts[0])
        await timeTravel(dequeueFrequency, provider)
        const dequeueHash = await governance.dequeueProposalsIfReady()
        await kit.connection.waitForTransactionReceipt(dequeueHash)
        await approveFn()
        await voteFn(accounts[2])

        const hash = await governance.execute(proposalID)
        await kit.connection.waitForTransactionReceipt(hash)

        const exists = await governance.proposalExists(proposalID)
        expect(exists).toBeFalsy()
      },
      30 * ONE_SEC
    )

    it(
      '#getVoter',
      async () => {
        await proposeFn(accounts[0])
        await timeTravel(dequeueFrequency, provider)
        const dequeueHash = await governance.dequeueProposalsIfReady()
        await kit.connection.waitForTransactionReceipt(dequeueHash)
        await approveFn()
        await voteFn(accounts[2])

        const proposer = await governance.getVoter(accounts[0])
        expect(proposer.refundedDeposits).toEqBigNumber(minDeposit)

        const voter = await governance.getVoter(accounts[2])
        const expectedVoteRecord = {
          proposalID,
          votes: new BigNumber(0),
          value: VoteValue.None,
          abstainVotes: new BigNumber(0),
          noVotes: new BigNumber(0),
          yesVotes: new BigNumber('1000000000000000000'),
        }
        expect(voter.votes[0]).toEqual(expectedVoteRecord)
      },
      30 * ONE_SEC
    )
  })
})
