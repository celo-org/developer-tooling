import { CeloTransactionObject, Contract } from '@celo/connect'
import { BaseWrapper, proxyCall, proxySend } from './BaseWrapper'

export class FreezerWrapper extends BaseWrapper<Contract> {
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
