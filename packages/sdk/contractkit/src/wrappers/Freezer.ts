import { Contract } from '@celo/connect'
import { BaseWrapper, proxyCall, proxySend } from './BaseWrapper'

export class FreezerWrapper extends BaseWrapper<Contract> {
  freeze = proxySend(this.connection, this.contract.methods.freeze)
  unfreeze = proxySend(this.connection, this.contract.methods.unfreeze)
  isFrozen = proxyCall(this.contract.methods.isFrozen)
}

export type FreezerWrapperType = FreezerWrapper
