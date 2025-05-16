import { getAccountsContract } from '@celo/actions/contracts/accounts'
import { getEpochManagerContract } from '@celo/actions/contracts/epoch-manager'
import { concurrentMap, StrongAddress } from '@celo/base'
import { ClaimTypes, IdentityMetadataWrapper } from '@celo/metadata-claims'
import { AccountMetadataSignerGetters } from '@celo/metadata-claims/lib/types'
import { Flags, ux } from '@oclif/core'
import { PublicClient } from 'viem'
import { BaseCommand } from '../../base'
import { getMetadataURLs, getNames } from '../../packages-to-be/account'
import {
  getRegisteredValidatorsAddresses,
  getValidatorsGroup,
} from '../../packages-to-be/validators'
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
    const CONCURRENCY_LEVEL = 50

    const res = await this.parse(RpcUrls)

    const client = (await this.getPublicClient()) as PublicClient

    let validatorAddresses: StrongAddress[] = []

    ux.action.start(`Fetching validator groups`)
    if (res.flags.all) {
      validatorAddresses = await getRegisteredValidatorsAddresses(client)
    } else {
      const epochManager = await getEpochManagerContract(client)
      validatorAddresses = (await epochManager.read.getElectedAccounts()) as StrongAddress[]
    }

    const validatorGroups = (
      await Promise.allSettled(
        validatorAddresses.map(async (address) => {
          const groupAddress = await getValidatorsGroup(client, address)
          return [address, groupAddress]
        })
      )
    )
      .filter((result) => result.status === 'fulfilled')
      .map(
        (result) =>
          (result as unknown as PromiseFulfilledResult<string[]>).value as [
            StrongAddress,
            StrongAddress
          ]
      )
    const validatorToGroup = new Map(validatorGroups)
    ux.action.stop()

    ux.action.start(`Fetching Group Metadata`)
    const accountsConract = await getAccountsContract(client)
    // Fetch the name for each group
    const validatorGroupNames = await getNames(client, [
      ...new Set(validatorToGroup.values()),
    ] as StrongAddress[])
    // Fetch the metadata url for each group
    const rpcNodeMetaDataUrls = await getMetadataURLs(client, validatorAddresses)
    ux.action.stop()

    const accountsWrapper: AccountMetadataSignerGetters = {
      getAttestationSigner: (address: string) =>
        accountsConract.read.getAttestationSigner([address as StrongAddress]),
      getMetadataURL: (address: string) =>
        accountsConract.read.getMetadataURL([address as StrongAddress]),
      getValidatorSigner: (address: string) =>
        accountsConract.read.getValidatorSigner([address as StrongAddress]),
      getVoteSigner: (address: string) =>
        accountsConract.read.getVoteSigner([address as StrongAddress]),
      isAccount: (address: string) => accountsConract.read.isAccount([address as StrongAddress]),
    }
    ux.action.start(`Fetching RPC URLs`)
    const rpcUrls = await concurrentMap(CONCURRENCY_LEVEL, validatorAddresses, async (address) => {
      const metadataURL = rpcNodeMetaDataUrls.get(address)

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
        .map((address, idx) => {
          const groupAddress = validatorToGroup.get(address)
          const validatorGroupName = groupAddress
            ? validatorGroupNames.get(groupAddress)
            : undefined
          return {
            validatorGroupName: validatorGroupName,
            rpcUrl: rpcUrls[idx],
            validatorAddress: address,
          }
        })
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
