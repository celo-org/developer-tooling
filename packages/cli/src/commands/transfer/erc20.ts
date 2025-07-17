import { getGasPriceOnCelo } from '@celo/actions'
import { getCeloERC20Contract } from '@celo/actions/contracts/celo-erc20'
import { getERC20Contract } from '@celo/actions/contracts/erc20'
import { CeloTransactionRequest } from 'viem/celo'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displayViemTx, failWith } from '../../utils/cli'
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

  async init() {
    // noop - skips ContractKit initialization
  }

  async run() {
    const res = await this.parse(TransferErc20)
    const client = await this.getPublicClient()
    const wallet = await this.getWalletClient()

    const from = res.flags.from
    const to = res.flags.to
    const value = res.flags.value
    const feeCurrency = res.flags.gasCurrency

    const erc20Contract = await getERC20Contract({ public: client, wallet }, res.flags.erc20Address)
    const transferParams = (feeCurrency ? { feeCurrency } : {}) as Pick<
      CeloTransactionRequest,
      'gas' | 'feeCurrency' | 'maxFeePerGas'
    >

    let decimals: number
    let name: string
    let symbol: string
    try {
      ;[decimals, name, symbol] = (await Promise.all(
        (['decimals', 'name', 'symbol'] as const).map((functionName) =>
          erc20Contract.read[functionName]()
        )
      )) as [number, string, string]
    } catch {
      failWith('Invalid erc20 address')
    }
    await newCheckBuilder(this)
      .isNotSanctioned(from)
      .isNotSanctioned(to)
      .isValidWalletSigner(from)
      .hasEnoughErc20(from, value, res.flags.erc20Address, decimals)
      .usesWhitelistedFeeCurrency(feeCurrency)
      .addCheck(
        `Account can afford to transfer CELO with gas paid in ${feeCurrency || 'CELO'}`,
        async () => {
          const [gas, gasPrice, balanceOfTokenForGas] = await Promise.all([
            erc20Contract.estimateGas.transfer([to, value], {...transferParams, account: from}),
            getGasPriceOnCelo(client, feeCurrency),
            (feeCurrency
              ? await getERC20Contract({ public: client }, feeCurrency)
              : await getCeloERC20Contract({ public: client })
            ).read.balanceOf([from]),
          ])

          transferParams.gas = gas
          transferParams.maxFeePerGas = gasPrice

          const totalSpentOnGas = gas * gasPrice
          return balanceOfTokenForGas >= totalSpentOnGas
        },
        `Cannot afford to transfer ${name}(${symbol}) ${
          feeCurrency ? 'with' + ' ' + feeCurrency + ' ' + 'gasCurrency' : ''
        }; try reducing value slightly or using a different gasCurrency`
      )
      // NOTE: fast fail in case feeCurrency isn't whitelisted or invalid
      // the gas estimation will fail
      .runChecks({ failFast: true })

    await displayViemTx(
      `${name}(${symbol})`,
      erc20Contract.write.transfer([to, value], transferParams),
      client
    )
  }
}
