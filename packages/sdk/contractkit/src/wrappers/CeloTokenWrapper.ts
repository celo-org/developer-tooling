import { goldTokenABI } from '@celo/abis'
// NOTE: removing this import results in `yarn build` failures in Dockerfiles
// after the move to node 10. This allows types to be inferred without
// referencing '@celo/utils/node_modules/bignumber.js'
import { CeloTx } from '@celo/connect'
import type { Abi } from 'viem'
import 'bignumber.js'

import { Erc20Wrapper } from './Erc20Wrapper'

/**
 * Contract for Celo native currency that adheres to the ICeloToken and IERC20 interfaces.
 */
export class CeloTokenWrapper<TAbi extends Abi = typeof goldTokenABI> extends Erc20Wrapper<TAbi> {
  /**
   * Returns the name of the token.
   * @returns Name of the token.
   */
  name = async (): Promise<string> => {
    return (this.contract as any).read.name()
  }

  /**
   * Returns the three letter symbol of the token.
   * @returns Symbol of the token.
   */
  symbol = async (): Promise<string> => {
    return (this.contract as any).read.symbol()
  }
  /**
   * Returns the number of decimals used in the token.
   * @returns Number of decimals.
   */
  decimals = async (): Promise<number> => {
    const res = await (this.contract as any).read.decimals()
    return Number(res)
  }

  /**
   * Transfers the token from one address to another with a comment.
   * @param to The address to transfer the token to.
   * @param value The amount of the token to transfer.
   * @param comment The transfer comment
   * @return True if the transaction succeeds.
   */
  transferWithComment = (
    to: string,
    value: string,
    comment: string,
    txParams?: Omit<CeloTx, 'data'>
  ) => this.sendTxUnchecked('transferWithComment', [to, value, comment], txParams)
}
