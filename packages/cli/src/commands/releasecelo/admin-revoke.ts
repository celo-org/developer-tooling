import { StrongAddress } from '@celo/base'
import { Flags } from '@oclif/core'
import prompts from 'prompts'
import { displayViemTx, printValueMap } from '../../utils/cli'
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
    const publicClient = await this.getPublicClient()
    const { flags: _flags } = await this.parse(AdminRevoke)
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
      await displayViemTx(
        'releasegold: revokeBeneficiary',
        this.releaseGoldWrapper.revokeBeneficiary(),
        publicClient
      )
    }

    const accounts = await kit.contracts.getAccounts()
    const contractAddress = (await this.contractAddress()) as StrongAddress
    const isAccount = await accounts.isAccount(contractAddress)
    if (isAccount) {
      // rotate vote signers
      let voteSigner = await accounts.getVoteSigner(contractAddress)
      if (voteSigner !== contractAddress) {
        voteSigner = kit.defaultAccount
        const pop = await accounts.generateProofOfKeyPossession(contractAddress, voteSigner)
        await displayViemTx(
          'accounts: rotateVoteSigner',
          this.releaseGoldWrapper.authorizeVoteSigner(voteSigner, pop),
          publicClient
        )
      }

      const election = await kit.contracts.getElection()
      const electionVotes = await election.getTotalVotesByAccount(contractAddress)
      const isElectionVoting = electionVotes.isGreaterThan(0)

      // handle election votes
      if (isElectionVoting) {
        const hashes = await this.releaseGoldWrapper.revokeAllVotesForAllGroups()

        for (const hash of hashes) {
          await displayViemTx('election: revokeVotes', Promise.resolve(hash), publicClient)
        }
      }

      const governance = await kit.contracts.getGovernance()
      const isGovernanceVoting = await governance.isVoting(contractAddress)

      // handle governance votes
      if (isGovernanceVoting) {
        const isUpvoting = await governance.isUpvoting(contractAddress)
        if (isUpvoting) {
          await displayViemTx(
            'governance: revokeUpvote',
            governance.revokeUpvote(contractAddress),
            publicClient
          )
        }

        const isVotingReferendum = await governance.isVotingReferendum(contractAddress)
        if (isVotingReferendum) {
          await displayViemTx('governance: revokeVotes', governance.revokeVotes(), publicClient)
        }
      }

      await displayViemTx(
        'releasegold: unlockAllGold',
        this.releaseGoldWrapper.unlockAllGold(),
        publicClient
      )
    }

    // rescue any USDm balance
    const stabletoken = await kit.contracts.getStableToken()
    const cusdBalance = await stabletoken.balanceOf(contractAddress)
    if (cusdBalance.isGreaterThan(0)) {
      await displayViemTx(
        'releasegold: rescueCUSD',
        this.releaseGoldWrapper.transfer(kit.defaultAccount, cusdBalance),
        publicClient
      )
    }

    // attempt to refund and finalize, surface pending withdrawals
    const remainingLockedGold = await this.releaseGoldWrapper.getRemainingLockedBalance()
    if (remainingLockedGold.isZero()) {
      await displayViemTx(
        'releasegold: refundAndFinalize',
        this.releaseGoldWrapper.refundAndFinalize(),
        publicClient
      )
    } else {
      console.log('Some celo is still locked, printing pending withdrawals...')
      const lockedGold = await kit.contracts.getLockedGold()
      const pendingWithdrawals = await lockedGold.getPendingWithdrawals(contractAddress)
      pendingWithdrawals.forEach((w) => printValueMap(w))
    }
  }
}
