import assert from 'node:assert'
import { erc20Abi } from 'viem'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendViemContractCall, failWith } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
export default class TransferErc20 extends BaseCommand {
  static description = 'Transfer ERC20 to a specified address'

  static flags = {
    ...BaseCommand.flags,
    erc20Address: CustomFlags.address({
      required: true,
      description: "Custom erc20 to check it's balance too",
    }),
    from: CustomFlags.address({
      required: true,
      description: 'Address of the sender',
    }),
    to: CustomFlags.address({
      required: true,
      description: 'Address of the receiver',
    }),
    value: CustomFlags.bigint({
      required: true,
      description: 'Amount to transfer (in wei)',
    }),
  }

  static examples = [
    'erc20 --erc20Address 0x765DE816845861e75A25fCA122bb6898B8B1282a --from 0xa0Af2E71cECc248f4a7fD606F203467B500Dd53B --to 0x5409ed021d9299bf6814279a6a1411a7e866a631 --value 10000000000000000000',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(TransferErc20)
    const client = await this.getPublicClient()
    const wallet = await this.getWalletClient()

    if (!wallet) {
      throw new Error('TODO: only AKV doesnt return a wallet')
    }

    const from = res.flags.from
    const to = res.flags.to
    const value = res.flags.value

    assert(
      (await wallet.getAddresses()).includes(res.flags.from),
      '--from address doesnt correspond to the wallet being used'
    )

    const erc20Contract = {
      abi: erc20Abi,
      address: res.flags.erc20Address,
      // TODO: get rid of kit here
      ...(kit.connection.defaultFeeCurrency
        ? { feeCurrency: kit.connection.defaultFeeCurrency }
        : {}),
    } as const

    let decimals: number
    try {
      decimals = await client.readContract({
        ...erc20Contract,
        functionName: 'decimals',
        args: [],
      })
    } catch {
      failWith('Invalid erc20 address')
    }
    await newCheckBuilder(this)
      .isNotSanctioned(from)
      .isNotSanctioned(to)
      .hasEnoughErc20(from, value, res.flags.erc20Address, decimals)
      .runChecks()

    await displaySendViemContractCall(
      'ERC20',
      {
        ...erc20Contract,
        functionName: 'transfer',
        // TODO: check why this doesn't typecheck properly
        args: [to, value],
        account: wallet.account,
      },
      client,
      wallet
    )
  }
}
