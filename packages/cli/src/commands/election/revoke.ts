import { Flags } from '@oclif/core'
import BigNumber from 'bignumber.js'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class ElectionRevoke extends BaseCommand {
  static description = 'Revoke votes for a Validator Group in validator elections.'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: "Voter's address" }),
    for: CustomFlags.address({
      description: "ValidatorGroup's address",
      required: true,
    }),
    value: Flags.string({ description: 'Value of votes to revoke', required: true }),
  }

  static examples = [
    'revoke --from 0x4443d0349e8b3075cba511a0a87796597602a0f1 --for 0x932fee04521f5fcb21949041bf161917da3f588b, --value 1000000',
  ]
  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ElectionRevoke)

    await newCheckBuilder(this, res.flags.from).isSignerOrAccount().runChecks()

    const election = await kit.contracts.getElection()
    const accounts = await kit.contracts.getAccounts()
    const account = await accounts.voteSignerToAccount(res.flags.from)
    const txos = await election.revoke(account, res.flags.for, new BigNumber(res.flags.value))
    for (const txo of txos) {
      await displaySendTx('revoke', txo, { from: res.flags.from })
    }
  }
}
