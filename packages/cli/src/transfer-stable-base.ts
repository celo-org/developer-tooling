import { StrongAddress } from '@celo/base'
import { Flags } from '@oclif/core'
import BigNumber from 'bignumber.js'
import { PublicClient } from 'viem'
import { BaseCommand } from './base'
import {
  getERC20Contract,
  getGoldTokenContract,
  StableToken,
  StableTokenContract,
  StableTokenContractGetter,
  StableTokens,
} from './packages-to-be/contracts'
import { bigNumberToBigInt } from './packages-to-be/utils'
import { newCheckBuilder } from './utils/checks'
import { displaySendViemContractCall, failWith } from './utils/cli'
import { CustomFlags } from './utils/command'

export abstract class TransferStableBase extends BaseCommand {
  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: 'Address of the sender' }),
    to: CustomFlags.address({ required: true, description: 'Address of the receiver' }),
    value: Flags.string({ required: true, description: 'Amount to transfer (in wei)' }),
    comment: Flags.string({ description: 'Transfer comment' }),
  }

  protected _stableCurrencyContract: StableTokenContractGetter | null = null

  async run() {
    const kit = await this.getKit()
    const client = await this.getPublicClient()
    const wallet = await this.getWalletClient()!
    const res = await this.parse()

    if (!wallet) {
      throw new Error('TODO: only AKV doesnt return a wallet')
    }

    const from: StrongAddress = res.flags.from
    const to: StrongAddress = res.flags.to
    const value = bigNumberToBigInt(new BigNumber(res.flags.value))

    if (!this._stableCurrencyContract) {
      throw new Error('Stable currency not set')
    }
    const stableToken = Object.entries(StableTokens).find(
      ([_, fn]) => fn === this._stableCurrencyContract
    )![0] as StableToken
    let stableTokenContract: StableTokenContract
    try {
      stableTokenContract = await this._stableCurrencyContract(client as PublicClient)
    } catch {
      failWith(`The ${stableToken} token was not deployed yet`)
    }

    const params = {
      abi: stableTokenContract.abi,
      address: stableTokenContract.address,
      account: wallet.account,
      // NOTE 1: if --gasCurrency is not set, defaults to eip1559 tx
      // NOTE 2: if --gasCurrency is set by the user, then
      //     `kit.connection.defaultFeeCurrency` is set in base.ts via
      //     `kit.setFeeCurrency()`
      // TODO: get rid of kit here
      ...(kit.connection.defaultFeeCurrency
        ? { feeCurrency: kit.connection.defaultFeeCurrency }
        : {}),
      ...(res.flags.comment
        ? ({
            functionName: 'transferWithComment',
            args: [to, value, res.flags.comment as string],
          } as const)
        : ({
            functionName: 'transfer',
            args: [to, value],
          } as const)),
    } as const

    await newCheckBuilder(this)
      .hasEnoughStable(from, value, stableToken)
      .isNotSanctioned(from)
      .isNotSanctioned(to)
      .addCheck(
        `Account can afford to transfer ${stableToken} with gas paid in ${
          kit.connection.defaultFeeCurrency || 'CELO'
        }`,
        async () => {
          const tokenForGasContract = kit.connection.defaultFeeCurrency
            ? getERC20Contract
            : getGoldTokenContract

          const [gas, gasPrice, balanceOfTokenForGas, balanceOfTokenToSend] = await Promise.all([
            // @ts-expect-error - TODO fix args being 2 or 3 arguments
            client.estimateContractGas(params),
            client.getGasPrice(),
            tokenForGasContract(client as PublicClient, kit.connection.defaultFeeCurrency!).then(
              (contract) => contract.read.balanceOf([from])
            ),
            stableTokenContract.read.balanceOf([from]),
          ])
          const totalSpentOnGas = gas * gasPrice
          if (kit.connection.defaultFeeCurrency === stableTokenContract.address) {
            return balanceOfTokenToSend >= value + totalSpentOnGas
          }
          return balanceOfTokenForGas >= totalSpentOnGas && balanceOfTokenToSend >= value
        },
        `Cannot afford to transfer ${stableToken} ${
          res.flags.gasCurrency ? 'with' + ' ' + res.flags.gasCurrency + ' ' + 'gasCurrency' : ''
        }; try reducing value slightly or using a different gasCurrency`
      )
      .runChecks()

    await displaySendViemContractCall(stableToken, params, client, wallet)
  }
}
