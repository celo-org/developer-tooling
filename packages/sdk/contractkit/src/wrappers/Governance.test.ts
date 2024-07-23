import { Registry } from '@celo/abis/web3/Registry'
import { Address, StrongAddress } from '@celo/base/lib/address'
import { asCoreContractsOwner, testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import { setDequeueFrequency, setReferendumStageDuration } from '@celo/dev-utils/lib/chain-setup'
import { NetworkConfig, testWithGanache, timeTravel } from '@celo/dev-utils/lib/ganache-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { CeloContract } from '..'
import { newKitFromWeb3 } from '../kit'
import { ContractVersion } from '../versions'
import { AccountsWrapper } from './Accounts'
import { GovernanceWrapper, Proposal, ProposalTransaction, VoteValue } from './Governance'
import { LockedGoldWrapper } from './LockedGold'
import { MultiSigWrapper } from './MultiSig'

const expConfig = NetworkConfig.governance

// Only on ganache we can test 1.4.1.0 version
testWithGanache('Governance Wrapper', (web3: Web3) => {
  describe('Hotfixes', () => {
    it('gets L1 hotfix record pre 1.5.0.0', async () => {
      const kit = newKitFromWeb3(web3)
      const governance = await kit.contracts.getGovernance()
      // Sanity check to make sure we're pre 1.5.0.0
      expect((await governance.version()).toString()).toBe('1.4.1.0')

      const hotfixRecord = await governance.getHotfixRecord(Buffer.from('0x', 'hex'))
      expect(hotfixRecord).toMatchInlineSnapshot(`
        {
          "approved": false,
          "executed": false,
          "preparedEpoch": "0",
        }
      `)
    })
  })
})

testWithAnvil('Governance Wrapper', (web3: Web3) => {
  const ONE_SEC = 1000
  const kit = newKitFromWeb3(web3)
  const ONE_CGLD = web3.utils.toWei('1', 'ether')

  let accounts: StrongAddress[] = []
  let governance: GovernanceWrapper
  let governanceApproverMultiSig: MultiSigWrapper
  let lockedGold: LockedGoldWrapper
  let accountWrapper: AccountsWrapper
  let registry: Registry
  let minDeposit: string

  beforeAll(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]
    governance = await kit.contracts.getGovernance()
    governanceApproverMultiSig = await kit.contracts.getMultiSig(await governance.getApprover())
    registry = await kit._web3Contracts.getRegistry()
    lockedGold = await kit.contracts.getLockedGold()
    accountWrapper = await kit.contracts.getAccounts()
    minDeposit = (await governance.minDeposit()).toFixed()

    await setDequeueFrequency(web3, governance.address, expConfig.dequeueFrequency)
    await setReferendumStageDuration(web3, governance.address, expConfig.referendumStageDuration)

    for (const account of accounts.slice(0, 4)) {
      await accountWrapper.createAccount().sendAndWaitForReceipt({ from: account })
      await lockedGold.lock().sendAndWaitForReceipt({ from: account, value: ONE_CGLD })
    }
  })

  type Repoint = [CeloContract, Address]

  const registryRepointProposal = (repoints: Repoint[]) => {
    const proposals: ProposalTransaction[] = repoints.map<ProposalTransaction>((repoint) => {
      return {
        value: '0',
        to: (registry as any)._address,
        input: registry.methods.setAddressFor(...repoint).encodeABI(),
      }
    })
    return proposals as Proposal
  }

  it('#getConfig', async () => {
    expect(await governance.getConfig()).toMatchInlineSnapshot(`
      {
        "concurrentProposals": "3",
        "dequeueFrequency": "30",
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
          "Referendum": "100",
        },
      }
    `)
  })

  describe('Proposals', () => {
    const repoints: Repoint[] = [
      [CeloContract.Random, '0x0000000000000000000000000000000000000001'],
      [CeloContract.Escrow, '0x0000000000000000000000000000000000000002'],
    ]
    const proposalID = new BigNumber(1)

    let proposal: Proposal
    beforeAll(() => (proposal = registryRepointProposal(repoints)))

    const proposeFn = async (proposer: Address, proposeTwice = false) => {
      if (proposeTwice) {
        await governance
          .propose(proposal, 'URL')
          .sendAndWaitForReceipt({ from: proposer, value: minDeposit })
      }

      await governance
        .propose(proposal, 'URL')
        .sendAndWaitForReceipt({ from: proposer, value: minDeposit })
    }

    const upvoteFn = async (upvoter: Address, shouldTimeTravel = true, proposalId?: BigNumber) => {
      const tx = await governance.upvote(proposalId ?? proposalID, upvoter)
      await tx.sendAndWaitForReceipt({ from: upvoter })
      if (shouldTimeTravel) {
        await timeTravel(expConfig.dequeueFrequency, web3)
        await governance.dequeueProposalsIfReady().sendAndWaitForReceipt()
      }
    }

    // protocol/truffle-config defines approver address as accounts[0]
    const approveFn = async () => {
      await asCoreContractsOwner(web3, async (ownerAddress) => {
        const tx = await governance.approve(proposalID)
        const multisigTx = await governanceApproverMultiSig.submitOrConfirmTransaction(
          governance.address,
          tx.txo
        )
        await multisigTx.sendAndWaitForReceipt({ from: ownerAddress })
      })
    }

    const voteFn = async (voter: Address) => {
      const tx = await governance.vote(proposalID, 'Yes')
      await tx.sendAndWaitForReceipt({ from: voter })
      await timeTravel(expConfig.referendumStageDuration, web3)
    }

    it('#propose', async () => {
      await proposeFn(accounts[0])

      const proposalRecord = await governance.getProposalRecord(proposalID)
      expect(proposalRecord.metadata.proposer).toBe(accounts[0])
      expect(proposalRecord.metadata.transactionCount).toBe(proposal.length)
      expect(proposalRecord.proposal).toStrictEqual(proposal)
      expect(proposalRecord.stage).toBe('Queued')
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

      const tx = await governance.revokeUpvote(accounts[1])
      await tx.sendAndWaitForReceipt({ from: accounts[1] })

      const after = await governance.getUpvotes(proposalId)
      expect(after).toEqBigNumber(before.minus(upvoteRecord.upvotes))
    })

    it('#approve', async () => {
      await proposeFn(accounts[0])
      await timeTravel(expConfig.dequeueFrequency, web3)
      await governance.dequeueProposalsIfReady().sendAndWaitForReceipt()
      await approveFn()

      const approved = await governance.isApproved(proposalID)
      expect(approved).toBeTruthy()
    })

    it('#vote', async () => {
      await proposeFn(accounts[0])
      await timeTravel(expConfig.dequeueFrequency, web3)
      await governance.dequeueProposalsIfReady().sendAndWaitForReceipt()
      await approveFn()
      await voteFn(accounts[2])

      const voteWeight = await governance.getVoteWeight(accounts[2])
      const yesVotes = (await governance.getVotes(proposalID))[VoteValue.Yes]
      expect(yesVotes).toEqBigNumber(voteWeight)
    })

    it('#getVoteRecord', async () => {
      const voter = accounts[2]
      await proposeFn(accounts[0])
      await timeTravel(expConfig.dequeueFrequency, web3)
      await governance.dequeueProposalsIfReady().sendAndWaitForReceipt()
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
      await timeTravel(expConfig.dequeueFrequency, web3)
      await governance.dequeueProposalsIfReady().sendAndWaitForReceipt()
      await approveFn()

      const yes = 10
      const no = 20
      const abstain = 0

      const tx = await governance.votePartially(proposalID, yes, no, abstain)
      await tx.sendAndWaitForReceipt({ from: accounts[2] })
      await timeTravel(expConfig.referendumStageDuration, web3)

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
        await timeTravel(expConfig.dequeueFrequency, web3)
        await governance.dequeueProposalsIfReady().sendAndWaitForReceipt()
        await approveFn()
        await voteFn(accounts[2])

        const tx = await governance.execute(proposalID)
        await tx.sendAndWaitForReceipt()

        const exists = await governance.proposalExists(proposalID)
        expect(exists).toBeFalsy()
      },
      10 * ONE_SEC
    )

    it('#getVoter', async () => {
      await proposeFn(accounts[0])
      await timeTravel(expConfig.dequeueFrequency, web3)
      await governance.dequeueProposalsIfReady().sendAndWaitForReceipt()
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
    })
  })
})

testWithAnvil('Governance Wrapper', (web3: Web3) => {
  describe('Hotfixes', () => {
    it('gets L1 hotfix record for version >= 1.5.0.0', async () => {
      const kit = newKitFromWeb3(web3)
      const governance = await kit.contracts.getGovernance()
      const hotfixHash = Buffer.from('0x', 'hex')

      // Sanity check to make sure we're on at least 1.5.0.0 version
      expect((await governance.version()).isAtLeast(new ContractVersion(1, 5, 0, 0)))

      // Test L1 context
      const hotfixRecordL1 = await governance.getHotfixRecord(hotfixHash)
      expect(hotfixRecordL1).toMatchInlineSnapshot(`
        {
          "approved": false,
          "executed": false,
          "preparedEpoch": "0",
        }
      `)
    })
  })
})
