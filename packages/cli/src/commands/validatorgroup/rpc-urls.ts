import { concurrentMap, StrongAddress } from '@celo/base'
import { ClaimTypes, IdentityMetadataWrapper } from '@celo/metadata-claims'
import { Flags, ux } from '@oclif/core'
import { BaseCommand } from '../../base'

export default class RpcUrls extends BaseCommand {
  static description =
    'Displays a list of community RPC nodes for the currently elected validator groups'

  static aliases: string[] = [
    'validator:rpc-urls',
    'validatorgroup:rpc-urls',
    'network:community-rpc-nodes',
    'validator:community-rpc-nodes',
    'validatorgroup:community-rpc-nodes',
  ]

  static flags = {
    ...BaseCommand.flags,
    ...(ux.table.flags() as object),
    all: Flags.boolean({
      description:
        'Display all community RC nodes, not just the ones from currently elected validator groups',
      required: false,
      default: false,
    }),
  }

  async run() {
    const res = await this.parse(RpcUrls)
    const kit = await this.getKit()
    const isL2 = await this.isCel2()
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const validatorsWrapper = await kit.contracts.getValidators()
    const accountsWrapper = await kit.contracts.getAccounts()

    let validatorAddresses: StrongAddress[] = []

    if (res.flags.all) {
      validatorAddresses = (await validatorsWrapper.getRegisteredValidators()).map(
        (v) => v.address as StrongAddress
      )
    } else {
      if (isL2) {
        validatorAddresses = (await epochManagerWrapper.getElectedAccounts()) as StrongAddress[]
      } else {
        validatorAddresses = (await validatorsWrapper.currentValidatorAccountsSet()).map(
          (v) => v.account as StrongAddress
        )
      }
    }

    const metadataURLs = await concurrentMap(5, validatorAddresses, async (address) => {
      const metadataURL = await accountsWrapper.getMetadataURL(address)

      if (!metadataURL) {
        return undefined
      }

      const metadata = await IdentityMetadataWrapper.fetchFromURL(accountsWrapper, metadataURL)

      return metadata.findClaim(ClaimTypes.RPC_URL)?.rpcUrl
    })

    // TODO cache so we don't have to fetch the same validator group name multiple times
    const validatorGroupNames = await concurrentMap(5, validatorAddresses, async (address) => {
      return (
        await validatorsWrapper.getValidatorGroup(
          await validatorsWrapper.getValidatorsGroup(address)
        )
      ).name
    })

    ux.table(
      validatorAddresses
        .map((address, idx) => ({
          validatorGroupName: validatorGroupNames[idx],
          rpcUrl: metadataURLs[idx],
          validatorAddress: address,
        }))
        .filter((row) => row.rpcUrl),
      {
        validatorGroupName: { header: 'Validator Group Name' },
        rpcUrl: { header: 'RPC URL' },
        validatorAddress: { header: 'Validator Address' },
      },
      res.flags
    )
  }
}
