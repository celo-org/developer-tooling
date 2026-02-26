import { CeloTransactionObject } from '@celo/connect'
import { BaseWrapper, proxyCall, proxySend } from './BaseWrapper'

export class FreezerWrapper extends BaseWrapper {
  freeze: (target: string) => CeloTransactionObject<void> = proxySend(
    this.connection,
    this.contract,
    'freeze'
  )
  unfreeze: (target: string) => CeloTransactionObject<void> = proxySend(
    this.connection,
    this.contract,
    'unfreeze'
  )
  isFrozen: (target: string) => Promise<boolean> = proxyCall(this.contract, 'isFrozen')
}

export type FreezerWrapperType = FreezerWrapper
