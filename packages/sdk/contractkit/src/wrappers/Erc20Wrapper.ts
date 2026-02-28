import { ierc20ABI } from '@celo/abis'
import { CeloTx } from '@celo/connect'
import type { Abi } from 'viem'
// NOTE: removing this import results in `yarn build` failures in Dockerfiles
// after the move to node 10. This allows types to be inferred without
// referencing '@celo/utils/node_modules/bignumber.js'
import BigNumber from 'bignumber.js'
import { BaseWrapper, valueToBigNumber } from './BaseWrapper'

/**
 * ERC-20 contract only containing the non-optional functions
 */
export class Erc20Wrapper<TAbi extends Abi = typeof ierc20ABI> extends BaseWrapper<TAbi> {
  /**
   * Querying allowance.
   * @param from Account who has given the allowance.
   * @param to Address of account to whom the allowance was given.
   * @returns Amount of allowance.
   */
  allowance = async (...args: any[]): Promise<BigNumber> =>
    valueToBigNumber((await this.connection.callContract(this.contract, 'allowance', args)) as any)

  /**
   * Returns the total supply of the token, that is, the amount of tokens currently minted.
   * @returns Total supply.
   */
  totalSupply = async (): Promise<BigNumber> =>
    valueToBigNumber((await this.connection.callContract(this.contract, 'totalSupply', [])) as any)

  /**
   * Approve a user to transfer the token on behalf of another user.
   * @param spender The address which is being approved to spend the token.
   * @param value The amount of the token approved to the spender.
   * @return True if the transaction succeeds.
   */
  approve = (spender: string, value: string | number, txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTxUnchecked('approve', [spender, value], txParams)

  /**
   * Transfers the token from one address to another.
   * @param to The address to transfer the token to.
   * @param value The amount of the token to transfer.
   * @return True if the transaction succeeds.
   */
  transfer = (to: string, value: string | number, txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTxUnchecked('transfer', [to, value], txParams)

  /**
   * Transfers the token from one address to another on behalf of a user.
   * @param from The address to transfer the token from.
   * @param to The address to transfer the token to.
   * @param value The amount of the token to transfer.
   * @return True if the transaction succeeds.
   */
  transferFrom = (
    from: string,
    to: string,
    value: string | number,
    txParams?: Omit<CeloTx, 'data'>
  ) => this.sendTxUnchecked('transferFrom', [from, to, value], txParams)

  /**
   * Gets the balance of the specified address.
   * @param owner The address to query the balance of.
   * @return The balance of the specified address.
   */
  balanceOf = async (owner: string): Promise<BigNumber> =>
    valueToBigNumber(
      (await this.connection.callContract(this.contract, 'balanceOf', [owner])) as any
    )
}

export type Erc20WrapperType = Erc20Wrapper
