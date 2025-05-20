import { electionABI } from '@celo/abis'
import { vote } from '@celo/actions/staking'
import { ux } from '@oclif/core'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displayViemTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
export default class ElectionVote extends BaseCommand {
  static description = 'Vote for a Validator Group in elections.'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: "Voter's address" }),
    for: CustomFlags.address({
      description: "ValidatorGroup's address",
      required: true,
    }),
    value: CustomFlags.bigint({
      description: 'Amount of CELO used to vote for group',
      required: true,
    }),
  }

  static examples = [
    'vote --from 0x4443d0349e8b3075cba511a0a87796597602a0f1 --for 0x932fee04521f5fcb21949041bf161917da3f588b, --value 1000000',
  ]
  async run() {
    const res = await this.parse(ElectionVote)
    const publicClient = await this.getPublicClient()
    const walletClient = await this.getWalletClient()
    const value = res.flags.value

    await newCheckBuilder(this, res.flags.from)
      .isSignerOrAccount()
      .isValidatorGroup(res.flags.for)
      .hasEnoughNonvotingLockedCelo(value)
      .runChecks()

    const pendingTxHash = vote(walletClient, res.flags.for, value)
    await displayViemTx('Electon -> Vote', pendingTxHash, publicClient, {
      abi: electionABI,
      displayEventName: 'ValidatorGroupVoteCast',
    })
    ux.log('Remember to activate your vote next epoch')
  }
}
