import { concurrentMap, StrongAddress } from '@celo/base'
import { ClaimTypes, IdentityMetadataWrapper } from '@celo/metadata-claims'
import { Flags, ux } from '@oclif/core'
import { BaseCommand } from '../../base'
import { ViewCommmandFlags } from '../../utils/flags'

export default class RpcUrls extends BaseCommand {
  static description =
    'Displays a list of community RPC nodes for the currently elected validator groups'

  static aliases: string[] = [
    'network:community-rpc-nodes',
    'network:rpc-urls',
    'node:list',
    'validator:community-rpc-nodes',
    'validator:rpc-urls',
    'validatorgroup:community-rpc-nodes',
  ]

  static flags = {
    ...ViewCommmandFlags,
    ...(ux.table.flags() as object),
    all: Flags.boolean({
      description:
        'Display all community RPC nodes, not just the ones from currently elected validator groups',
      required: false,
      default: false,
    }),
  }

  async run() {
    const CONCURRENCY_LEVEL = 5

    const res = await this.parse(RpcUrls)
    const kit = await this.getKit()
    const validatorsWrapper = await kit.contracts.getValidators()
    const accountsWrapper = await kit.contracts.getAccounts()

    let validatorAddresses: StrongAddress[] = []

    if (res.flags.all) {
      validatorAddresses = (await validatorsWrapper.getRegisteredValidators()).map(
        (v) => v.address as StrongAddress
      )
    } else {
      const epochManagerWrapper = await kit.contracts.getEpochManager()
      validatorAddresses = (await epochManagerWrapper.getElectedAccounts()) as StrongAddress[]
    }

    ux.action.start(`Fetching validator groups`)

    // Fetch the validator group address for each validator
    const validatorToGroup: { [key: StrongAddress]: string } = Object.fromEntries(
      await concurrentMap(CONCURRENCY_LEVEL, validatorAddresses, async (address) => {
        return [address, (await validatorsWrapper.getValidator(address)).affiliation || '']
      })
    )

    // Fetch the validator group name for each group
    const validatorGroupNames = Object.fromEntries(
      await concurrentMap(
        CONCURRENCY_LEVEL,
        [...new Set(Object.values(validatorToGroup))],
        async (address) => {
          return [address, await accountsWrapper.getName(address)]
        }
      )
    )

    ux.action.stop()
    ux.action.start(`Fetching validators RPC URLs`)

    // Fetch the RPC URL for each validator
    const rpcUrls = await concurrentMap(CONCURRENCY_LEVEL, validatorAddresses, async (address) => {
      const metadataURL = await accountsWrapper.getMetadataURL(address)

      if (!metadataURL) {
        return undefined
      }

      try {
        const metadata = await IdentityMetadataWrapper.fetchFromURL(accountsWrapper, metadataURL)

        return metadata.findClaim(ClaimTypes.RPC_URL)?.rpcUrl
      } catch (_) {
        return undefined
      }
    })

    ux.action.stop()

    ux.table(
      validatorAddresses
        .map((address, idx) => ({
          validatorGroupName: validatorGroupNames[validatorToGroup[address]],
          rpcUrl: rpcUrls[idx],
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
