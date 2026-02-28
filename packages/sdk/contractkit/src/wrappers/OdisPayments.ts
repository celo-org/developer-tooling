import { odisPaymentsABI } from '@celo/abis'
import { Address } from '@celo/connect'
import { BigNumber } from 'bignumber.js'
import { BaseWrapper, toViemAddress, valueToBigNumber } from './BaseWrapper'

export class OdisPaymentsWrapper extends BaseWrapper<typeof odisPaymentsABI> {
  /**
   * @notice Fetches total amount sent (all-time) for given account to odisPayments
   * @param account The account to fetch total amount of funds sent
   */
  totalPaidCUSD = async (account: Address): Promise<BigNumber> => {
    const res = await this.contract.read.totalPaidCUSD([toViemAddress(account)])
    return valueToBigNumber(res.toString())
  }

  /**
   * @notice Sends USDm to this contract to pay for ODIS quota (for queries).
   * @param account The account whose balance to increment.
   * @param value The amount in USDm to pay.
   * @dev Throws if USDm transfer fails.
   */
  payInCUSD = (account: Address, value: number | string) =>
    this.buildTx('payInCUSD', [account, value])
}

export type OdisPaymentsWrapperType = OdisPaymentsWrapper
