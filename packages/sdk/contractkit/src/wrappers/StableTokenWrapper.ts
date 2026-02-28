import { stableTokenABI } from '@celo/abis'
import { CeloTx } from '@celo/connect'
import { valueToString } from './BaseWrapper'
import { CeloTokenWrapper } from './CeloTokenWrapper'

export interface StableTokenConfig {
  decimals: number
  name: string
  symbol: string
}

/**
 * Stable token with variable supply
 */
export class StableTokenWrapper extends CeloTokenWrapper<typeof stableTokenABI> {
  /**
   * Returns the address of the owner of the contract.
   * @return the address of the owner of the contract.
   */
  owner = async () => this.contract.read.owner() as Promise<string>

  /**
   * Increases the allowance of another user.
   * @param spender The address which is being approved to spend StableToken.
   * @param value The increment of the amount of StableToken approved to the spender.
   * @returns true if success.
   */
  increaseAllowance = (
    spender: string,
    value: import('bignumber.js').default.Value,
    txParams?: Omit<CeloTx, 'data'>
  ) => this.sendTx('increaseAllowance', [spender, valueToString(value)], txParams)
  /**
   * Decreases the allowance of another user.
   * @param spender The address which is being approved to spend StableToken.
   * @param value The decrement of the amount of StableToken approved to the spender.
   * @returns true if success.
   */
  decreaseAllowance = (spender: string, value: string, txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('decreaseAllowance', [spender, value], txParams)
  mint = (to: string, value: string, txParams?: Omit<CeloTx, 'data'>) =>
    this.sendTx('mint', [to, value], txParams)
  burn = (value: string, txParams?: Omit<CeloTx, 'data'>) => this.sendTx('burn', [value], txParams)

  /**
   * Returns current configuration parameters.
   */
  async getConfig(): Promise<StableTokenConfig> {
    const res = await Promise.all([this.name(), this.symbol(), this.decimals()])
    return {
      name: res[0],
      symbol: res[1],
      decimals: res[2],
    }
  }

  /**
   * @dev Returns human readable configuration of the stabletoken contract
   * @return StableTokenConfig object
   */
  async getHumanReadableConfig() {
    const config = await this.getConfig()
    return config
  }
}

export type StableTokenWrapperType = StableTokenWrapper
