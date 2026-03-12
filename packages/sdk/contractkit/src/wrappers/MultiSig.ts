import { multiSigABI } from '@celo/abis'
import { Address, CeloTx } from '@celo/connect'
import BigNumber from 'bignumber.js'
import {
  BaseWrapper,
  toViemAddress,
  toViemBigInt,
  stringToSolidityBytes,
  valueToBigNumber,
  valueToInt,
} from './BaseWrapper'

export interface TransactionData {
  destination: string
  value: BigNumber
  data: string
  executed: boolean
  confirmations: string[]
}
export interface TransactionDataWithOutConfirmations {
  destination: string
  value: BigNumber
  data: string
  executed: boolean
}

/**
 * Contract for handling multisig actions
 */
export class MultiSigWrapper extends BaseWrapper<typeof multiSigABI> {
  /**
   * Allows an owner to submit and confirm a transaction.
   * If an unexecuted transaction matching `txObject` exists on the multisig, adds a confirmation to that tx ID.
   * Otherwise, submits the `txObject` to the multisig and add confirmation.
   * @param index The index of the pending withdrawal to withdraw.
   */
  async submitOrConfirmTransaction(
    destination: string,
    encodedData: string,
    value = '0',
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    const data = stringToSolidityBytes(encodedData)
    const transactionCount = await this._getTransactionCountRaw(true, true)
    const transactionIds = await this._getTransactionIds(0, transactionCount, true, false)

    for (const transactionId of transactionIds) {
      const transaction = await this._getTransactionRaw(transactionId)
      if (
        transaction.data === data &&
        transaction.destination === destination &&
        transaction.value === value &&
        !transaction.executed
      ) {
        return this.contract.write.confirmTransaction(
          [BigInt(transactionId)] as const,
          txParams as any
        )
      }
    }
    return this.contract.write.submitTransaction(
      [toViemAddress(destination), BigInt(value), data as `0x${string}`] as const,
      txParams as any
    )
  }

  private _getTransactionCountRaw = async (pending: boolean, executed: boolean) => {
    const res = await this.contract.read.getTransactionCount([pending, executed])
    return Number(res)
  }

  private _getTransactionIds = async (
    from: number,
    to: number,
    pending: boolean,
    executed: boolean
  ) => {
    const res = await this.contract.read.getTransactionIds([
      toViemBigInt(from),
      toViemBigInt(to),
      pending,
      executed,
    ])
    return [...res].map((v) => v.toString())
  }

  private _getTransactionRaw = async (i: number | string) => {
    const res = await this.contract.read.transactions([toViemBigInt(i)])
    return {
      destination: res[0] as string,
      value: res[1].toString(),
      data: res[2] as string,
      executed: res[3] as boolean,
    }
  }

  async confirmTransaction(
    transactionId: number,
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    return this.contract.write.confirmTransaction([BigInt(transactionId)] as const, txParams as any)
  }
  async submitTransaction(
    destination: string,
    encodedData: string,
    value = '0',
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    const data = stringToSolidityBytes(encodedData)
    return this.contract.write.submitTransaction(
      [toViemAddress(destination), BigInt(value), data as `0x${string}`] as const,
      txParams as any
    )
  }

  isOwner: (owner: Address) => Promise<boolean> = async (owner) => {
    return this.contract.read.isOwner([toViemAddress(owner)])
  }
  getOwners = async () => {
    const res = await this.contract.read.getOwners()
    return [...res] as string[]
  }
  getRequired = async () => {
    const res = await this.contract.read.required()
    return valueToBigNumber(res.toString())
  }
  getInternalRequired = async () => {
    const res = await this.contract.read.internalRequired()
    return valueToBigNumber(res.toString())
  }
  totalTransactionCount = async () => {
    const res = await this.contract.read.transactionCount()
    return valueToInt(res.toString())
  }
  getTransactionCount = async (pending: boolean, executed: boolean) => {
    const res = await this.contract.read.getTransactionCount([pending, executed])
    return valueToInt(res.toString())
  }
  replaceOwner = (owner: Address, newOwner: Address, txParams?: Omit<CeloTx, 'data'>) =>
    this.contract.write.replaceOwner(
      [toViemAddress(owner), toViemAddress(newOwner)] as const,
      txParams as any
    )

  async getTransactionDataByContent(
    destination: string,
    encodedData: string,
    value: BigNumber.Value = 0
  ) {
    const data = stringToSolidityBytes(encodedData)
    const transactionCount = await this.getTransactionCount(true, true)
    const transactionsOrEmpties = await Promise.all(
      new Array(transactionCount).fill(0).map(async (_, index) => {
        const tx = await this.getTransaction(index, false)
        if (tx.data === data && tx.destination === destination && tx.value.isEqualTo(value)) {
          return { index, ...tx }
        }
        return null
      })
    )
    const wantedTransaction = transactionsOrEmpties.find((tx) => tx !== null)
    if (!wantedTransaction) {
      return
    }
    const confirmations = await this.getConfirmations(wantedTransaction.index)
    return {
      ...wantedTransaction,
      confirmations,
    }
  }
  async getTransaction(i: number): Promise<TransactionData>
  async getTransaction(
    i: number,
    includeConfirmations: false
  ): Promise<TransactionDataWithOutConfirmations>
  async getTransaction(i: number, includeConfirmations = true) {
    const res = await this._getTransactionRaw(i)
    const destination = res.destination as string
    const value = new BigNumber(res.value as string)
    const data = res.data as string
    const executed = res.executed as boolean
    if (!includeConfirmations) {
      return {
        destination,
        data,
        executed,
        value,
      }
    }

    const confirmations = await this.getConfirmations(i)
    return {
      confirmations,
      destination,
      data,
      executed,
      value,
    }
  }

  private _getConfirmation = async (txId: number, owner: string) => {
    return this.contract.read.confirmations([toViemBigInt(txId), toViemAddress(owner)])
  }

  /*
   * Returns array of signer addresses which have confirmed a transaction
   * when given the index of that transaction.
   */
  async getConfirmations(txId: number) {
    const owners = await this.getOwners()
    const confirmationsOrEmpties = await Promise.all(
      owners.map(async (owner: string) => {
        const confirmation = await this._getConfirmation(txId, owner)
        if (confirmation) {
          return owner
        } else {
          return null
        }
      })
    )
    const confirmations = confirmationsOrEmpties.filter((c) => c !== null) as string[]
    return confirmations
  }

  async getTransactions(): Promise<TransactionData[]> {
    const txcount = await this.totalTransactionCount()
    const res: TransactionData[] = []
    for (let i = 0; i < txcount; i++) {
      res.push(await this.getTransaction(i))
    }
    return res
  }
}

export type MultiSigWrapperType = MultiSigWrapper
