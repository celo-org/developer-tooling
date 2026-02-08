import { Future } from '@celo/base/lib/future'
import debugFactory from 'debug'
import { CeloTxReceipt, PromiEvent } from '../types'

const debug = debugFactory('connection:tx:result')

/**
 * Transforms a `PromiEvent` or a `Promise<string>` (tx hash) to a `TransactionResult`.
 */
export function toTxResult(pe: PromiEvent<any> | Promise<string>) {
  return new TransactionResult(pe)
}

/**
 * Replacement interface for web3's `PromiEvent`. Instead of emiting events
 * to signal different stages, eveything is exposed as a promise. Which ends
 * up being nicer when doing promise/async based programming.
 */
export class TransactionResult {
  private hashFuture = new Future<string>()
  private receiptFuture = new Future<CeloTxReceipt>()

  constructor(pe: PromiEvent<any> | Promise<string>) {
    if (isPromiEvent(pe)) {
      void pe
        .on('transactionHash', (hash: string) => {
          debug('hash: %s', hash)
          this.hashFuture.resolve(hash)
        })
        .on('receipt', (receipt: CeloTxReceipt) => {
          debug('receipt: %O', receipt)
          this.receiptFuture.resolve(receipt)
        })

        .on('error', ((error: any, receipt: CeloTxReceipt | false) => {
          if (!receipt) {
            debug('send-error: %o', error)
            this.hashFuture.reject(error)
          } else {
            debug('mining-error: %o, %O', error, receipt)
          }
          this.receiptFuture.reject(error)
        }) as any)
    } else {
      // Promise<string> - just a hash, no receipt events
      pe.then(
        (hash: string) => {
          debug('hash: %s', hash)
          this.hashFuture.resolve(hash)
          // Receipt not available via simple hash promise - consumers should
          // poll for receipt via connection.getTransactionReceipt()
          // For now, leave receiptFuture pending (waitReceipt will hang)
        },
        (error: any) => {
          debug('send-error: %o', error)
          this.hashFuture.reject(error)
          this.receiptFuture.reject(error)
        }
      )
    }
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

function isPromiEvent(pe: any): pe is PromiEvent<any> {
  return typeof pe.on === 'function'
}
