import { goldTokenABI } from '@celo/abis'
// NOTE: removing this import results in `yarn build` failures in Dockerfiles
// after the move to node 10. This allows types to be inferred without
// referencing '@celo/utils/node_modules/bignumber.js'
import { Address } from '@celo/base'
import { CeloTx } from '@celo/connect'
import 'bignumber.js'
import { toViemAddress, valueToBigNumber, valueToString } from './BaseWrapper'
import { CeloTokenWrapper } from './CeloTokenWrapper'

/**
 * ERC-20 contract for Celo native currency.
 */
export class GoldTokenWrapper extends CeloTokenWrapper<typeof goldTokenABI> {
  /**
   * Increases the allowance of another user.
   * @param spender The address which is being approved to spend CELO.
   * @param value The increment of the amount of CELO approved to the spender.
   * @returns true if success.
   */
  increaseAllowance = (
    spender: string,
    value: import('bignumber.js').default.Value,
    txParams?: Omit<CeloTx, 'data'>
  ) =>
    this.contract.write.increaseAllowance(
      [toViemAddress(spender), BigInt(valueToString(value))] as const,
      txParams as any
    )
  /**
   * Decreases the allowance of another user.
   * @param spender The address which is being approved to spend CELO.
   * @param value The decrement of the amount of CELO approved to the spender.
   * @returns true if success.
   */
  decreaseAllowance = (spender: string, value: string | number, txParams?: Omit<CeloTx, 'data'>) =>
    this.contract.write.decreaseAllowance(
      [toViemAddress(spender), BigInt(value)] as const,
      txParams as any
    )

  /**
   * Gets the balance of the specified address.
   * @param owner The address to query the balance of.
   * @return The balance of the specified address.
   */
  balanceOf = (account: Address) => this.connection.getBalance(account).then(valueToBigNumber)
}

export type GoldTokenWrapperType = GoldTokenWrapper
