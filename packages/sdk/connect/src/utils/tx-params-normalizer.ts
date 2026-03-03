import { Connection } from '../connection'
import { CeloTx } from '../types'
import { isEmpty, isPresent } from '../viem-abi-coder'

export class TxParamsNormalizer {
  private chainId: number | null = null

  constructor(readonly connection: Connection) {}

  public async populate(celoTxParams: CeloTx): Promise<CeloTx> {
    const txParams = { ...celoTxParams }

    const [chainId, nonce, gas, maxFeePerGas] = await Promise.all(
      [
        async () => {
          if (txParams.chainId == null) {
            return this.getChainId()
          }
          return txParams.chainId
        },
        async () => {
          if (txParams.nonce == null) {
            return this.connection.viemClient.getTransactionCount({
              address: txParams.from!.toString() as `0x${string}`,
              blockTag: 'pending',
            })
          }
          return txParams.nonce
        },
        async () => {
          if (!txParams.gas || isEmpty(txParams.gas.toString())) {
            return this.connection.estimateGas(txParams)
          }
          return txParams.gas
        },
        async () => {
          // if gasPrice is not set and maxFeePerGas is not set, set maxFeePerGas
          if (
            isEmpty(txParams.gasPrice?.toString()) &&
            isEmpty(txParams.maxFeePerGas?.toString())
          ) {
            const suggestedPrice = await this.connection.gasPrice(txParams.feeCurrency)
            // add small buffer to suggested price like other libraries do
            // use ceiling division to match previous BigNumber.integerValue(ROUND_HALF_UP) behavior
            const numerator = BigInt(suggestedPrice) * BigInt(120)
            const denominator = BigInt(100)
            const priceWithRoom = ((numerator + denominator - BigInt(1)) / denominator).toString(16)
            return `0x${priceWithRoom}`
          }
          return txParams.maxFeePerGas
        },
      ].map(async (fn) => fn())
    )
    txParams.chainId = chainId as number
    txParams.nonce = nonce as number
    txParams.gas = gas as string
    txParams.maxFeePerGas = maxFeePerGas

    // need to wait until after gas price has been handled
    // if maxFeePerGas is set make sure maxPriorityFeePerGas is also set
    if (
      isPresent(txParams.maxFeePerGas?.toString()) &&
      isEmpty(txParams.maxPriorityFeePerGas?.toString())
    ) {
      txParams.maxPriorityFeePerGas = await this.connection.getMaxPriorityFeePerGas()
    }

    // remove gasPrice if maxFeePerGas is set
    if (isPresent(txParams.gasPrice?.toString()) && isPresent(txParams.maxFeePerGas?.toString())) {
      txParams.gasPrice = undefined
      delete txParams.gasPrice
    }

    return txParams
  }

  private async getChainId(): Promise<number> {
    if (this.chainId === null) {
      this.chainId = await this.connection.viemClient.getChainId()
    }
    return this.chainId
  }
}
