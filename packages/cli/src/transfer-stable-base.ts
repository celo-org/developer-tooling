import { Flags } from '@oclif/core'
import { isAddressEqual, PublicClient } from 'viem'
import { BaseCommand } from './base'
import {
  getERC20Contract,
  StableToken,
  StableTokenContract,
  StableTokenContractGetter,
  StableTokens,
} from './packages-to-be/contracts'
import { newCheckBuilder } from './utils/checks'
import { displaySendViemContractCall, failWith } from './utils/cli'
import { CustomFlags } from './utils/command'

export abstract class TransferStableBase extends BaseCommand {
  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: 'Address of the sender' }),
    to: CustomFlags.address({ required: true, description: 'Address of the receiver' }),
    value: CustomFlags.bigint({ required: true, description: 'Amount to transfer (in wei)' }),
    comment: Flags.string({ description: 'Transfer comment' }),
  } as const

  protected _stableCurrencyContract: StableTokenContractGetter | null = null

  async run() {
    const client = await this.getPublicClient()
    const wallet = await this.getWalletClient()!
    const res = await this.parse(TransferStableBase)

    if (!wallet) {
      throw new Error('TODO: only AKV doesnt return a wallet')
    }

    const from = res.flags.from
    const to = res.flags.to
    const value = res.flags.value
    const feeCurrency = res.flags.gasCurrency

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

    const stableContract = {
      abi: stableTokenContract.abi,
      address: stableTokenContract.address,
      account: from,
      ...(feeCurrency ? { feeCurrency: feeCurrency } : {}),
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
      .isValidWalletSigner(from)
      .addCheck(
        `Account can afford to transfer ${stableToken} with gas paid in ${feeCurrency || 'CELO'}`,
        async () => {
          const [gas, gasPrice, balanceOfTokenForGas, balanceOfTokenToSend] = await Promise.all([
            client.estimateContractGas(stableContract),
            client.getGasPrice(),
            feeCurrency
              ? getERC20Contract(client as PublicClient, feeCurrency).then((contract) =>
                  contract.read.balanceOf([from])
                )
              : client.getBalance({ address: from }),
            stableTokenContract.read.balanceOf([from]),
          ])
          const totalSpentOnGas = gas * gasPrice

          if (feeCurrency && isAddressEqual(feeCurrency, stableTokenContract.address)) {
            return balanceOfTokenToSend >= value + totalSpentOnGas
          }
          return balanceOfTokenForGas >= totalSpentOnGas && balanceOfTokenToSend >= value
        },
        `Cannot afford to transfer ${stableToken} ${
          res.flags.feeCurrency ? 'with' + ' ' + res.flags.feeCurrency + ' ' + 'feeCurrency' : ''
        }; try reducing value slightly or using a different feeCurrency`
      )
      .runChecks()

    await displaySendViemContractCall(stableToken, stableContract, client, wallet)
  }
}
