import { Flags } from '@oclif/core'

import prompts from 'prompts'
import { displaySendTx, printValueMap } from '../../utils/cli'
import { ReleaseGoldBaseCommand } from '../../utils/release-gold-base'

export default class AdminRevoke extends ReleaseGoldBaseCommand {
  static hidden = true

  static description = 'Take all possible steps to revoke given contract instance.'

  static flags = {
    ...ReleaseGoldBaseCommand.flags,
    yesreally: Flags.boolean({ description: 'Override interactive prompt to confirm revocation' }),
  }

  static args = {}

  static examples = ['admin-revoke --contract 0x5409ED021D9299bf6814279A6A1411A7e866A631']

  async run() {
    const kit = await this.getKit()
    const { flags: _flags } = await this.parse(AdminRevoke)
    const web3 = await this.getWeb3()
    if (!_flags.yesreally) {
      const response = await prompts({
        type: 'confirm',
        name: 'confirmation',
        message: 'Are you sure you want to revoke this contract? (y/n)',
      })

      if (!response.confirmation) {
        console.info('Aborting due to user response')
        process.exit(0)
      }
    }

    kit.defaultAccount = await this.releaseGoldWrapper.getReleaseOwner()

    const isRevoked = await this.releaseGoldWrapper.isRevoked()
    if (!isRevoked) {
      await displaySendTx(
        'releasegold: revokeBeneficiary',
        this.releaseGoldWrapper.revokeBeneficiary(),
        undefined,
        'ReleaseScheduleRevoked'
      )
    }

    const accounts = await kit.contracts.getAccounts()
    const contractAddress = await this.contractAddress()
    const isAccount = await accounts.isAccount(contractAddress)
    if (isAccount) {
      // rotate vote signers
      let voteSigner = await accounts.getVoteSigner(contractAddress)
      if (voteSigner !== contractAddress) {
        const password = 'bad_password'
        voteSigner = await web3.eth.personal.newAccount(password)
        await web3.eth.personal.unlockAccount(voteSigner, password, 1000)
        const pop = await accounts.generateProofOfKeyPossession(contractAddress, voteSigner)
        await displaySendTx(
          'accounts: rotateVoteSigner',
          await this.releaseGoldWrapper.authorizeVoteSigner(voteSigner, pop),
          undefined,
          'VoteSignerAuthorized'
        )
      }

      const election = await kit.contracts.getElection()
      const electionVotes = await election.getTotalVotesByAccount(contractAddress)
      const isElectionVoting = electionVotes.isGreaterThan(0)

      // handle election votes
      if (isElectionVoting) {
        const txos = await this.releaseGoldWrapper.revokeAllVotesForAllGroups()
        for (const txo of txos) {
          await displaySendTx('election: revokeVotes', txo, { from: voteSigner }, [
            'ValidatorGroupPendingVoteRevoked',
            'ValidatorGroupActiveVoteRevoked',
          ])
        }
      }

      const governance = await kit.contracts.getGovernance()
      const isGovernanceVoting = await governance.isVoting(contractAddress)

      // handle governance votes
      if (isGovernanceVoting) {
        const isUpvoting = await governance.isUpvoting(contractAddress)
        if (isUpvoting) {
          await displaySendTx(
            'governance: revokeUpvote',
            await governance.revokeUpvote(contractAddress),
            { from: voteSigner },
            'ProposalUpvoteRevoked'
          )
        }

        const isVotingReferendum = await governance.isVotingReferendum(contractAddress)
        if (isVotingReferendum) {
          await displaySendTx(
            'governance: revokeVotes',
            governance.revokeVotes(),
            { from: voteSigner },
            'ProposalVoteRevoked'
          )
        }
      }

      await displaySendTx(
        'releasegold: unlockAllGold',
        await this.releaseGoldWrapper.unlockAllGold(),
        undefined,
        'GoldUnlocked'
      )
    }

    // rescue any cUSD balance
    const stabletoken = await kit.contracts.getStableToken()
    const cusdBalance = await stabletoken.balanceOf(contractAddress)
    if (cusdBalance.isGreaterThan(0)) {
      await displaySendTx(
        'releasegold: rescueCUSD',
        this.releaseGoldWrapper.transfer(kit.defaultAccount, cusdBalance),
        undefined,
        'Transfer'
      )
    }

    // attempt to refund and finalize, surface pending withdrawals
    const remainingLockedGold = await this.releaseGoldWrapper.getRemainingLockedBalance()
    if (remainingLockedGold.isZero()) {
      await displaySendTx(
        'releasegold: refundAndFinalize',
        this.releaseGoldWrapper.refundAndFinalize(),
        undefined,
        'ReleaseGoldInstanceDestroyed'
      )
    } else {
      console.log('Some celo is still locked, printing pending withdrawals...')
      const lockedGold = await kit.contracts.getLockedGold()
      const pendingWithdrawals = await lockedGold.getPendingWithdrawals(contractAddress)
      pendingWithdrawals.forEach((w) => printValueMap(w))
    }
  }
}
