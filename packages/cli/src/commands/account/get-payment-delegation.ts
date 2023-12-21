import { ux } from '@oclif/core'
import BigNumber from 'bignumber.js'

import { BaseCommand } from '../../base'
import { CustomFlags } from '../../utils/command'

export default class GetPaymentDelegation extends BaseCommand {
  static description =
    "Get the payment delegation account beneficiary and fraction allocated from a validator's payment each epoch. The fraction cannot be greater than 1."

  static flags = {
    ...BaseCommand.flags,
    account: CustomFlags.address({ required: true }),
    ...(ux.table.flags() as object),
  }

  static args = {}

  static examples = ['get-payment-delegation --account 0x5409ed021d9299bf6814279a6a1411a7e866a631']

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(GetPaymentDelegation)
    kit.defaultAccount = res.flags.account
    const accounts = await kit.contracts.getAccounts()

    console.log('Payment delegation beneficiary and fraction are: \n')
    const retval = await accounts.getPaymentDelegation(res.flags.account)

    const beneficiary = retval[0]

    // translate fixidity value to human readable fraction
    const fraction = new BigNumber(retval[1]).shiftedBy(-24).toNumber()

    console.log(beneficiary, fraction)
  }
}
