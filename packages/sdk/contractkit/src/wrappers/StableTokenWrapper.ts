import { StableToken } from '@celo/abis/web3/mento/StableToken'
import { proxyCall, proxySend, stringIdentity, tupleParser, valueToString } from './BaseWrapper'
import { CeloTokenWrapper } from './CeloTokenWrapper'

export interface StableTokenConfig {
  decimals: number
  name: string
  symbol: string
}

/**
 * Stable token with variable supply
 */
export class StableTokenWrapper extends CeloTokenWrapper<StableToken> {
  /**
   * Returns the address of the owner of the contract.
   * @return the address of the owner of the contract.
   */
  owner = proxyCall(this.contract.methods.owner)

  /**
   * Increases the allowance of another user.
   * @param spender The address which is being approved to spend StableToken.
   * @param value The increment of the amount of StableToken approved to the spender.
   * @returns true if success.
   */
  increaseAllowance = proxySend(
    this.connection,
    this.contract.methods.increaseAllowance,
    tupleParser(stringIdentity, valueToString)
  )
  /**
   * Decreases the allowance of another user.
   * @param spender The address which is being approved to spend StableToken.
   * @param value The decrement of the amount of StableToken approved to the spender.
   * @returns true if success.
   */
  decreaseAllowance = proxySend(this.connection, this.contract.methods.decreaseAllowance)
  mint = proxySend(this.connection, this.contract.methods.mint)
  burn = proxySend(this.connection, this.contract.methods.burn)

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
