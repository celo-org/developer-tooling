import { freezerABI } from '@celo/abis'
import { CeloTransactionObject } from '@celo/connect'
import { BaseWrapper, proxySend, toViemAddress } from './BaseWrapper'

export class FreezerWrapper extends BaseWrapper<typeof freezerABI> {
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
  isFrozen = async (target: string) => this.contract.read.isFrozen([toViemAddress(target)])
}

export type FreezerWrapperType = FreezerWrapper
