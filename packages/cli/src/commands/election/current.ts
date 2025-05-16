import { Flags, ux } from '@oclif/core'

import { ElectedRpcNode, getElectedRpcNodes } from '@celo/actions/staking'
import { PublicClient } from 'viem'
import { BaseCommand } from '../../base'

export const valSetRpcNodeTable: ux.Table.table.Columns<{ address: string }> = {
  address: {},
  name: {},
  currentSigner: {},
  signer: {},
  changed: {},
}

export const rpcNodeTable: ux.Table.table.Columns<Record<'rpc', ElectedRpcNode>> = {
  address: { get: ({ rpc }) => rpc.address },
  name: { get: ({ rpc }) => rpc.name },
  affiliation: { get: ({ rpc }) => rpc.affiliation },
  score: { get: ({ rpc }) => rpc.score.toString() },
  ecdsaPublicKey: { get: ({ rpc }) => rpc.ecdsaPublicKey },
  signer: { get: ({ rpc }) => rpc.signer },
}

export default class ElectionCurrent extends BaseCommand {
  static description =
    'Outputs the set of rpc nodes currently elected. An election is run to select the community rpc node set at the end of every epoch.'

  static flags = {
    ...BaseCommand.flags,
    valset: Flags.boolean({
      description:
        'Show currently used signers from valset (by default the authorized validator signers are shown). Useful for checking if keys have been rotated.',
    }),
    ...(ux.table.flags() as object),
  }

  async run() {
    const client = (await this.getPublicClient()) as PublicClient
    const res = await this.parse(ElectionCurrent)
    ux.action.start('Fetching currently Elected Community Rpc Nodes')
    const validatorList = await getElectedRpcNodes(client, {
      showChanges: res.flags.valset,
    })
    ux.action.stop()
    if (res.flags.valset) {
      ux.table(validatorList, valSetRpcNodeTable, res.flags)
    } else {
      ux.table(
        validatorList.map((rpc) => ({ rpc })),
        rpcNodeTable,
        res.flags
      )
    }
  }
}
