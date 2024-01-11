import { OdisUtils } from '@celo/identity'
import { AuthSigner, OdisContextName } from '@celo/identity/lib/odis/query'
import { Flags, ux } from '@oclif/core'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { printValueMap } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class IdentifierQuery extends BaseCommand {
  static description =
    'Queries ODIS for the on-chain identifier and pepper corresponding to a given phone number.'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description: 'The address from which to perform the query',
    }),
    phoneNumber: CustomFlags.phoneNumber({
      required: true,
      description:
        'The phone number for which to query the identifier. Should be in e164 format with country code.',
    }),
    context: Flags.string({
      required: false,
      description: 'mainnet (default), alfajores, or alfajoresstaging',
    }),
  }

  static examples = [
    'identifier --phoneNumber +14151231234 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631 --context alfajores',
  ]

  async run() {
    const kit = await this.getKit()
    const { flags } = await this.parse(IdentifierQuery)
    const { phoneNumber, from, context } = flags

    await newCheckBuilder(this).isValidAddress(flags.from).runChecks()

    ux.action.start('Querying ODIS for identifier')

    const authSigner: AuthSigner = {
      authenticationMethod: OdisUtils.Query.AuthenticationMethod.WALLET_KEY,
      // @ts-ignore -- TODO: if identity depends on diff version of ck which has a slightly differnt type this complains
      contractKit: kit,
    }

    const res = await OdisUtils.PhoneNumberIdentifier.getPhoneNumberIdentifier(
      phoneNumber,
      from,
      authSigner,
      OdisUtils.Query.getServiceContext(context as OdisContextName)
    )

    ux.action.stop()

    printValueMap({
      identifier: res.phoneHash,
      pepper: res.pepper,
    })
  }
}
