import { StrongAddress } from '@celo/base'
import { ContractKit } from '@celo/contractkit'
import { MultiSigWrapper } from '@celo/contractkit/lib/wrappers/MultiSig'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import { MultiSigFlags, SafeFlags } from '../../utils/flags'
import {
  createSafeFromWeb3,
  performSafeTransaction,
  safeTransactionMetadataFromCeloTransactionObject,
} from '../../utils/safe'

export default class Withdraw extends BaseCommand {
  static description = 'Withdraw refunded governance proposal deposits.'

  static flags = {
    ...BaseCommand.flags,
    ...MultiSigFlags,
    ...SafeFlags,

    from: CustomFlags.address({ required: true, description: "Proposer's address" }),
  }

  static examples = ['withdraw --from 0x5409ed021d9299bf6814279a6a1411a7e866a631']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Withdraw)
    const addressToRefund = this.getAddressToRefund(res.flags)
    const multiSigWrapper = await this.getMultiSigWrapper(kit, res.flags)

    const checkBuilder = newCheckBuilder(this, res.flags.from).hasRefundedDeposits(addressToRefund)

    if (multiSigWrapper) {
      checkBuilder.isMultiSigOwner(res.flags.from, res.flags.for as StrongAddress)
    } else if (res.flags.useSafe) {
      checkBuilder.addCheck(`${res.flags.from} is a safe owner`, async () => {
        const safe = await createSafeFromWeb3(
          await this.getWeb3(),
          res.flags.from,
          res.flags.safeAddress!
        )
        return safe.isOwner(res.flags.from)
      })
    }

    await checkBuilder.runChecks()

    const governance = await kit.contracts.getGovernance()
    const withdrawTx = governance.withdraw()

    if (multiSigWrapper) {
      const multiSigTx = await multiSigWrapper.submitOrConfirmTransaction(
        governance.address,
        withdrawTx.txo
      )

      // "Deposit" event is emitted when the MultiSig contract receives the funds
      await displaySendTx<string | void | boolean>('withdraw', multiSigTx, {}, 'Deposit')
    } else if (res.flags.useSafe) {
      await performSafeTransaction(
        await this.getWeb3(),
        res.flags.safeAddress!,
        res.flags.from,
        await safeTransactionMetadataFromCeloTransactionObject(withdrawTx, governance.address)
      )
    } else {
      // No event is emited otherwise
      await displaySendTx('withdraw', withdrawTx)
    }
  }

  private async getMultiSigWrapper(
    kit: ContractKit,
    flags: { useMultiSig: boolean; for?: StrongAddress }
  ): Promise<MultiSigWrapper | null> {
    if (flags.useMultiSig) {
      return await kit.contracts.getMultiSig(flags.for as StrongAddress)
    }

    return null
  }

  private getAddressToRefund(flags: {
    from: StrongAddress
    useMultiSig: boolean
    for?: StrongAddress
    useSafe: boolean
    safeAddress?: StrongAddress
  }): StrongAddress {
    return flags.useMultiSig
      ? (flags.for as StrongAddress)
      : flags.useSafe
      ? flags.safeAddress!
      : flags.from
  }
}
