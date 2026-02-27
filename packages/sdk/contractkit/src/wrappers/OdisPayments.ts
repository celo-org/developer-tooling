import { odisPaymentsABI } from '@celo/abis'
import { Address, CeloTransactionObject } from '@celo/connect'
import { BigNumber } from 'bignumber.js'
import { BaseWrapper, proxyCall, proxySend, valueToBigNumber } from './BaseWrapper'

export class OdisPaymentsWrapper extends BaseWrapper<typeof odisPaymentsABI> {
  /**
   * @notice Fetches total amount sent (all-time) for given account to odisPayments
   * @param account The account to fetch total amount of funds sent
   */
  totalPaidCUSD: (account: Address) => Promise<BigNumber> = proxyCall(
    this.contract,
    'totalPaidCUSD',
    undefined,
    (res) => valueToBigNumber(res.toString())
  )

  /**
   * @notice Sends USDm to this contract to pay for ODIS quota (for queries).
   * @param account The account whose balance to increment.
   * @param value The amount in USDm to pay.
   * @dev Throws if USDm transfer fails.
   */
  payInCUSD: (account: Address, value: number | string) => CeloTransactionObject<void> = proxySend(
    this.connection,
    this.contract,
    'payInCUSD'
  )
}

export type OdisPaymentsWrapperType = OdisPaymentsWrapper
