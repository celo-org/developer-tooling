import { StableToken } from '@celo/contractkit'
import { StableTokenWrapper } from '@celo/contractkit/lib/wrappers/StableTokenWrapper'
import { Flags } from '@oclif/core'
import BigNumber from 'bignumber.js'
import { BaseCommand } from './base'
import { newCheckBuilder } from './utils/checks'
import { displaySendTx, failWith } from './utils/cli'
import { CustomFlags } from './utils/command'

const ERC20_MOCK_ABI = [
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

    // NOTE 1: if --gasCurrency is not set, defaults to eip1559 tx
    // NOTE 2: if --gasCurrency is set by the user, then
    //     `kit.connection.defaultFeeCurrency` is set in base.ts via
    //     `kit.setFeeCurrency()`
    const baseParams = kit.connection.defaultFeeCurrency
      ? { feeCurrency: kit.connection.defaultFeeCurrency }
      : {}

    const tx = res.flags.comment
      ? stableToken.transferWithComment(to, value.toFixed(), res.flags.comment)
      : stableToken.transfer(to, value.toFixed())

    await newCheckBuilder(this)
      .hasEnoughStable(from, value, this._stableCurrency)
      .isNotSanctioned(from)
      .isNotSanctioned(to)
      .addCheck(
        `Account can afford to transfer ${this._stableCurrency} with gas paid in ${
          kit.connection.defaultFeeCurrency || 'CELO'
        }`,
        async () => {
          const [gas, gasPrice, balanceOfTokenForGas, balanceOfTokenToSend] = await Promise.all([
            tx.txo.estimateGas(baseParams),
            kit.connection.gasPrice(kit.connection.defaultFeeCurrency),
            kit.connection.defaultFeeCurrency
              ? // @ts-expect-error abi typing is not 100% correct but works
                new kit.web3.eth.Contract(ERC20_MOCK_ABI, kit.connection.defaultFeeCurrency).methods
                  .balanceOf(from)
                  .call()
                  .then((x: string) => new BigNumber(x))
              : kit.contracts.getGoldToken().then((celo) => celo.balanceOf(from)),
            kit.contracts
              .getStableToken(this._stableCurrency!)
              .then((token) => token.balanceOf(from)),
          ])
          const totalSpentOnGas = new BigNumber(gas).times(gasPrice as string)
          if (kit.connection.defaultFeeCurrency === stableToken.address) {
            return balanceOfTokenToSend.gte(value.plus(totalSpentOnGas))
          }
          return balanceOfTokenForGas.gte(totalSpentOnGas) && balanceOfTokenToSend.gte(value)
        },
        `Cannot afford to transfer ${this._stableCurrency} ${
          res.flags.gasCurrency ? 'with' + ' ' + res.flags.gasCurrency + ' ' + 'gasCurrency' : ''
        }; try reducing value slightly or using a different gasCurrency`
      )
      .runChecks()

    const params = await kit.connection.setFeeMarketGas(baseParams)
    await displaySendTx(res.flags.comment ? 'transferWithComment' : 'transfer', tx, params)
  }
}
