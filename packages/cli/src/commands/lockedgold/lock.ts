import { StrongAddress } from '@celo/base'
import { Flags } from '@oclif/core'
import BigNumber from 'bignumber.js'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import { LockedGoldArgs } from '../../utils/lockedgold'

export default class Lock extends BaseCommand {
  static description = 'Locks CELO to be used in governance and validator elections.'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true }),
    value: Flags.string({ ...LockedGoldArgs.valueArg, required: true }),
  }

  static args = {}

  static examples = [
    'lock --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --value 10000000000000000000000',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Lock)
    const address = res.flags.from as StrongAddress

    kit.defaultAccount = address
    const value = new BigNumber(res.flags.value)

    await newCheckBuilder(this)
      .addCheck(`Value [${value.toFixed()}] is > 0`, () => value.gt(0))
      .runChecks()

    const [lockedGold, accountsContract] = await Promise.all([
      kit.contracts.getLockedGold(),
      kit.contracts.getAccounts(),
    ])

    const isAccount = await accountsContract.isAccount(address)

    if (!isAccount) {
      console.log('Address will be registered with Account contract to enable locking.')
      await displaySendTx('register', accountsContract.createAccount())
    }

    const pendingWithdrawalsValue = await lockedGold.getPendingWithdrawalsTotalValue(address)
    const relockValue = BigNumber.minimum(pendingWithdrawalsValue, value)
    const lockValue = value.minus(relockValue)

    await newCheckBuilder(this).hasEnoughCelo(address, lockValue).runChecks()

    const txos = await lockedGold.relock(address, relockValue)
    for (const txo of txos) {
      await displaySendTx('relock', txo, { from: address })
    }
    if (lockValue.gt(new BigNumber(0))) {
      const tx = lockedGold.lock()
      await displaySendTx('lock', tx, { value: lockValue.toFixed() })
    }
  }
}
