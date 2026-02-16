// NOTE: removing this import results in `yarn build` failures in Dockerfiles
// after the move to node 10. This allows types to be inferred without
// referencing '@celo/utils/node_modules/bignumber.js'
import { CeloTransactionObject, Contract } from '@celo/connect'
import 'bignumber.js'
import { proxyCall, proxySend, valueToInt } from './BaseWrapper'
import { Erc20Wrapper } from './Erc20Wrapper'

/**
 * Contract for Celo native currency that adheres to the ICeloToken and IERC20 interfaces.
 */
export class CeloTokenWrapper<T extends Contract = Contract> extends Erc20Wrapper<T> {
  /**
   * Returns the name of the token.
   * @returns Name of the token.
   */
  name: () => Promise<string> = proxyCall(this.contract.methods.name)

  /**
   * Returns the three letter symbol of the token.
   * @returns Symbol of the token.
   */
  symbol: () => Promise<string> = proxyCall(this.contract.methods.symbol)
  /**
   * Returns the number of decimals used in the token.
   * @returns Number of decimals.
   */
  decimals = proxyCall(this.contract.methods.decimals, undefined, valueToInt)

  /**
   * Transfers the token from one address to another with a comment.
   * @param to The address to transfer the token to.
   * @param value The amount of the token to transfer.
   * @param comment The transfer comment
   * @return True if the transaction succeeds.
   */
  transferWithComment: (to: string, value: string, comment: string) => CeloTransactionObject<void> =
    proxySend(this.connection, this.contract.methods.transferWithComment)
}
