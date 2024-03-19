import { StableToken } from '@celo/contractkit'
import { StableTokenWrapper } from '@celo/contractkit/lib/wrappers/StableTokenWrapper'
import { Flags } from '@oclif/core'
import BigNumber from 'bignumber.js'
import { BaseCommand } from './base'
import { newCheckBuilder } from './utils/checks'
import { displaySendTx, failWith } from './utils/cli'
import { CustomFlags } from './utils/command'

const erc20_mock_abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export abstract class TransferStableBase extends BaseCommand {
  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: 'Address of the sender' }),
    to: CustomFlags.address({ required: true, description: 'Address of the receiver' }),
    value: Flags.string({ required: true, description: 'Amount to transfer (in wei)' }),
    comment: Flags.string({ description: 'Transfer comment' }),
  }

  protected _stableCurrency: StableToken | null = null

  async run() {
    const kit = await this.getKit()
    const res = await this.parse()

    const from: string = res.flags.from
    const to: string = res.flags.to
    const value = new BigNumber(res.flags.value)

    if (!this._stableCurrency) {
      throw new Error('Stable currency not set')
    }
    let stableToken: StableTokenWrapper
    try {
      stableToken = await kit.contracts.getStableToken(this._stableCurrency)
    } catch {
      failWith(`The ${this._stableCurrency} token was not deployed yet`)
    }

    if (res.flags.gasCurrency) {
      kit.connection.defaultFeeCurrency = res.flags.gasCurrency
    }
    // If gasCurrency is not set, defaults to eip1559 tx
    const params = res.flags.feeCurrency ? { feeCurrency: kit.connection.defaultFeeCurrency } : {}

    const tx = res.flags.comment
      ? stableToken.transferWithComment(to, value.toFixed(), res.flags.comment)
      : stableToken.transfer(to, value.toFixed())

    let gas: number
    let gasPrice: string
    let gasBalance: BigNumber
    let valueBalance: BigNumber
    await newCheckBuilder(this)
      .hasEnoughStable(from, value, this._stableCurrency)
      .isNotSanctioned(from)
      .isNotSanctioned(to)
      .addCheck(
        `Account can afford transfer in ${this._stableCurrency} and gas paid in ${
          res.flags.gasCurrency || 'CELO'
        }`,
        async () => {
          ;[gas, gasPrice, gasBalance, valueBalance] = await Promise.all([
            tx.txo.estimateGas(params),
            kit.connection.gasPrice(kit.connection.defaultFeeCurrency),
            res.flags.gasCurrency
              ? // @ts-expect-error abi typing is not 100% correct but works
                new kit.web3.eth.Contract(erc20_mock_abi, res.flags.gasCurrency).methods
                  .balanceOf(from)
                  .call()
                  .then((x: string) => new BigNumber(x))
              : kit.contracts.getGoldToken().then((celo) => celo.balanceOf(from)),
            kit.contracts
              .getStableToken(this._stableCurrency!)
              .then((token) => token.balanceOf(from)),
          ])
          const gasValue = new BigNumber(gas).times(gasPrice as string)
          if (res.flags.gasCurrency) {
            return gasBalance.gte(gasValue) && valueBalance.gte(value)
          }
          return valueBalance.gte(value.plus(gasValue))
        },
        `Cannot afford transfer with ${this._stableCurrency} gasCurrency; try reducing value slightly or using gasCurrency=CELO`
      )
      .runChecks()

    await displaySendTx(res.flags.comment ? 'transferWithComment' : 'transfer', tx, params)
  }
}
