import { freezerABI } from '@celo/abis'

import { CeloTx } from '@celo/connect'
import { BaseWrapper, toViemAddress } from './BaseWrapper'

export class FreezerWrapper extends BaseWrapper<typeof freezerABI> {
  freeze = (target: string, txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('freeze', [target], txParams)
  unfreeze = (target: string, txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('unfreeze', [target], txParams)
  isFrozen = async (target: string) => this.contract.read.isFrozen([toViemAddress(target)])
}

export type FreezerWrapperType = FreezerWrapper
