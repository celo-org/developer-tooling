import { Flags } from '@oclif/core'
import prompts from 'prompts'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { ReleaseGoldBaseCommand } from '../../utils/release-gold-base'
import { CustomFlags } from '../../utils/command'

export default class SetBeneficiary extends ReleaseGoldBaseCommand {
  static description =
    "Set the beneficiary of the ReleaseGold contract. This command is gated via a multi-sig, so this is expected to be called twice: once by the contract's beneficiary and once by the contract's releaseOwner. Once both addresses call this command with the same parameters, the tx will execute."

  static flags = {
    ...ReleaseGoldBaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description: 'Address to submit multisig transaction from (one of the owners)',
    }),
    beneficiary: CustomFlags.address({
      required: true,
      description: 'Address of the new beneficiary',
    }),
    yesreally: Flags.boolean({
      description: 'Override prompt to set new beneficiary (be careful!)',
    }),
  }

  static args = {}

  static examples = [
    'set-beneficiary --contract 0x5409ED021D9299bf6814279A6A1411A7e866A631 --from 0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84 --beneficiary 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb',
  ]

  async run() {
    const kit = await this.getKit()
    const { flags } = await this.parse(SetBeneficiary)
    const newBeneficiary = flags.beneficiary as string

    const owner = await this.releaseGoldWrapper.getOwner()
    const releaseGoldMultiSig = await kit.contracts.getMultiSig(owner)

    await newCheckBuilder(this)
      .isMultiSigOwner(flags.from as string, releaseGoldMultiSig)
      .runChecks()

    if (!flags.yesreally) {
      const response = await prompts({
        type: 'confirm',
        name: 'confirmation',
        message:
          "Are you sure you want to set a new beneficiary? This will forfeit the current beneficiary's controls. (y/n)",
      })

      if (!response.confirmation) {
        console.info('Aborting due to user response')
        process.exit(0)
      }
    }

    const currentBeneficiary = await this.releaseGoldWrapper.getBeneficiary()
    const setBeneficiaryTx = this.releaseGoldWrapper.setBeneficiary(newBeneficiary)
    const setBeneficiaryMultiSigTx = await releaseGoldMultiSig.submitOrConfirmTransaction(
      await this.contractAddress(),
      setBeneficiaryTx.txo
    )
    await displaySendTx<any>(
      'setBeneficiary',
      setBeneficiaryMultiSigTx,
      { from: flags.from as string },
      'BeneficiarySet'
    )
    const replaceOwnerTx = releaseGoldMultiSig.replaceOwner(currentBeneficiary, newBeneficiary)
    const replaceOwnerMultiSigTx = await releaseGoldMultiSig.submitOrConfirmTransaction(
      releaseGoldMultiSig.address,
      replaceOwnerTx.txo
    )
    await displaySendTx<any>('replaceMultiSigOwner', replaceOwnerMultiSigTx, { from: flags.from })
  }
}
