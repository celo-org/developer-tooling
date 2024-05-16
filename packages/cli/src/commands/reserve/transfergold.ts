import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class TransferGold extends BaseCommand {
  static description = 'Transfers reserve celo to other reserve address'

  static flags = {
    ...BaseCommand.flags,
    value: Flags.string({ required: true, description: 'The unit amount of CELO' }),
    to: CustomFlags.address({ required: true, description: 'Receiving address' }),
    from: CustomFlags.address({ required: true, description: "Spender's address" }),
    useMultiSig: Flags.boolean({
      description: 'True means the request will be sent through multisig.',
    }),
  }

  static examples = [
    'transfergold --value 9000 --to 0x91c987bf62D25945dB517BDAa840A6c661374402 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631',
    'transfergold --value 9000 --to 0x91c987bf62D25945dB517BDAa840A6c661374402 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631 --useMultiSig',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(TransferGold)
    const value = res.flags.value
    const to = res.flags.to
    const account = res.flags.from
    const useMultiSig = res.flags.useMultiSig
    kit.defaultAccount = account
    const reserve = await kit.contracts.getReserve()
    const spenders = useMultiSig ? await reserve.getSpenders() : []
    // assumes that the multisig is the most recent spender in the spenders array
    const multiSigAddress = spenders.length > 0 ? spenders[spenders.length - 1] : ''
    const reserveSpenderMultiSig = useMultiSig
      ? await kit.contracts.getMultiSig(multiSigAddress)
      : undefined
    const spender = useMultiSig ? multiSigAddress : account

    await newCheckBuilder(this)
      .addCheck(`${spender} is a reserve spender`, async () => reserve.isSpender(spender))
      .addConditionalCheck(`${account} is a multisig signatory`, useMultiSig, async () =>
        reserveSpenderMultiSig !== undefined
          ? reserveSpenderMultiSig.isOwner(account)
          : new Promise<boolean>(() => false)
      )
      .addCheck(`${to} is another reserve address`, async () => reserve.isOtherReserveAddress(to))
      .runChecks()

    const reserveTx = await reserve.transferGold(to, value)
    const tx =
      reserveSpenderMultiSig === undefined
        ? reserveTx
        : await reserveSpenderMultiSig.submitOrConfirmTransaction(reserve.address, reserveTx.txo)
    await displaySendTx<string | void | boolean>('transferGoldTx', tx)
  }
}
