import { freezerABI } from '@celo/abis'

import { BaseWrapper, toViemAddress } from './BaseWrapper'

export class FreezerWrapper extends BaseWrapper<typeof freezerABI> {
  freeze = (target: string) => this.buildTx('freeze', [target])
  unfreeze = (target: string) => this.buildTx('unfreeze', [target])
  isFrozen = async (target: string) => this.contract.read.isFrozen([toViemAddress(target)])
}

export type FreezerWrapperType = FreezerWrapper
