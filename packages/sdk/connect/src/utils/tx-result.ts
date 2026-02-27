import { Future } from '@celo/base/lib/future'
import debugFactory from 'debug'
import { CeloTxReceipt } from '../types'
import { pollForReceiptHelper } from './receipt-polling'

const debug = debugFactory('connection:tx:result')

export type ReceiptFetcher = (txHash: string) => Promise<CeloTxReceipt | null>

/**
 * Transforms a `Promise<string>` (tx hash) to a `TransactionResult`.
 */
export function toTxResult(txHashPromise: Promise<string>, fetchReceipt?: ReceiptFetcher) {
  return new TransactionResult(txHashPromise, fetchReceipt)
}

/**
 * Wraps a transaction hash promise into a result with getHash() and waitReceipt() methods.
 */
export class TransactionResult {
  private hashFuture = new Future<string>()
  private receiptFuture = new Future<CeloTxReceipt>()

  constructor(txHashPromise: Promise<string>, fetchReceipt?: ReceiptFetcher) {
    txHashPromise.then(
      async (hash: string) => {
        debug('hash: %s', hash)
        this.hashFuture.resolve(hash)
        if (fetchReceipt) {
          try {
            const receipt = await pollForReceiptHelper(hash, fetchReceipt)
            debug('receipt: %O', receipt)
            this.receiptFuture.resolve(receipt)
          } catch (error) {
            debug('receipt-poll-error: %o', error)
            this.receiptFuture.reject(error)
          }
        }
      },
      (error: Error) => {
        debug('send-error: %o', error)
        this.hashFuture.reject(error)
        this.receiptFuture.reject(error)
      }
    )
  }

  /** Get (& wait for) transaction hash */
  getHash() {
    return this.hashFuture.wait().catch((err) => {
      // if hashFuture fails => receiptFuture also fails
      // we wait for it here; so not UnhandlePromise error occurrs
      this.receiptFuture.wait().catch(() => {
        // ignore
      })
      throw err
    })
  }

  /** Get (& wait for) transaction receipt */
  async waitReceipt() {
    // Make sure `getHash()` promise is consumed
    await this.getHash()

    return this.receiptFuture.wait()
  }
}
