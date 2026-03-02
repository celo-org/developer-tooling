import { freezerABI } from '@celo/abis'

import { CeloTx } from '@celo/connect'
import { BaseWrapper, toViemAddress } from './BaseWrapper'

export class FreezerWrapper extends BaseWrapper<typeof freezerABI> {
  freeze = (target: string, txParams?: Omit<CeloTx, 'data'>) =>
    this.contract.write.freeze([toViemAddress(target)] as const, txParams as any)
  unfreeze = (target: string, txParams?: Omit<CeloTx, 'data'>) =>
    this.contract.write.unfreeze([toViemAddress(target)] as const, txParams as any)
  isFrozen = async (target: string) => this.contract.read.isFrozen([toViemAddress(target)])
}

export type FreezerWrapperType = FreezerWrapper
