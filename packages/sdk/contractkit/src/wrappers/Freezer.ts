import { CeloTransactionObject } from '@celo/connect'
import { BaseWrapper, proxyCall, proxySend } from './BaseWrapper'

export class FreezerWrapper extends BaseWrapper {
  freeze: (target: string) => CeloTransactionObject<void> = proxySend(
    this.connection,
    this.contract.methods.freeze
  )
  unfreeze: (target: string) => CeloTransactionObject<void> = proxySend(
    this.connection,
    this.contract.methods.unfreeze
  )
  isFrozen: (target: string) => Promise<boolean> = proxyCall(this.contract.methods.isFrozen)
}

export type FreezerWrapperType = FreezerWrapper
