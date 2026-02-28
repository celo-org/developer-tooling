import { goldTokenABI } from '@celo/abis'
// NOTE: removing this import results in `yarn build` failures in Dockerfiles
// after the move to node 10. This allows types to be inferred without
// referencing '@celo/utils/node_modules/bignumber.js'
import { Address } from '@celo/base'
import { CeloTransactionObject } from '@celo/connect'
import 'bignumber.js'
import {
  proxySend,
  stringIdentity,
  tupleParser,
  valueToBigNumber,
  valueToString,
} from './BaseWrapper'
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
  increaseAllowance: (
    spender: string,
    value: import('bignumber.js').default.Value
  ) => CeloTransactionObject<void> = proxySend(
    this.connection,
    this.contract,
    'increaseAllowance',
    tupleParser(stringIdentity, valueToString)
  )
  /**
   * Decreases the allowance of another user.
   * @param spender The address which is being approved to spend CELO.
   * @param value The decrement of the amount of CELO approved to the spender.
   * @returns true if success.
   */
  decreaseAllowance: (spender: string, value: string | number) => CeloTransactionObject<void> =
    proxySend(this.connection, this.contract, 'decreaseAllowance')

  /**
   * Gets the balance of the specified address.
   * WARNING: The actual call to the Gold contract of the balanceOf:
   * `balanceOf = this.contract.read.balanceOf(account)`
   * has issues with web3. Keep the one calling getBalance
   * @param owner The address to query the balance of.
   * @return The balance of the specified address.
   */
  balanceOf = (account: Address) => this.connection.getBalance(account).then(valueToBigNumber)
}

export type GoldTokenWrapperType = GoldTokenWrapper
