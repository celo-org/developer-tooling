import { Address, CeloTransactionObject } from '@celo/connect'
import BigNumber from 'bignumber.js'
import { BaseWrapper, proxyCall, proxySend } from './BaseWrapper'

export enum ExchangeProposalState {
  None,
  Proposed,
  Approved,
  Executed,
  Cancelled,
}

export interface StableTokenExchangeLimits {
  minExchangeAmount: BigNumber
  maxExchangeAmount: BigNumber
}

export interface ExchangeProposal {
  exchanger: string
  stableToken: string
  sellAmount: BigNumber
  buyAmount: BigNumber
  vetoPeriodSeconds: BigNumber
  approvalTimestamp: BigNumber
  state: ExchangeProposalState
  sellCelo: boolean
  id: string | number
}

export interface ExchangeProposalReadable {
  exchanger: string
  stableToken: string
  sellAmount: BigNumber
  buyAmount: BigNumber
  approvalTimestamp: BigNumber
  state: string
  sellCelo: boolean
  id: string | number
  implictPricePerCelo: BigNumber
}

export class FeeHandlerWrapper extends BaseWrapper {
  owner: () => Promise<string> = proxyCall(this.contract, 'owner')

  handleAll: () => CeloTransactionObject<void> = proxySend(
    this.connection,
    this.contract,
    'handleAll'
  )
  burnCelo: () => CeloTransactionObject<void> = proxySend(
    this.connection,
    this.contract,
    'burnCelo'
  )

  async handle(tokenAddress: Address): Promise<CeloTransactionObject<void>> {
    const createExchangeProposalInner: (addr: string) => CeloTransactionObject<void> = proxySend(
      this.connection,
      this.contract,
      'handle'
    )
    return createExchangeProposalInner(tokenAddress)
  }

  async sell(tokenAddress: Address): Promise<CeloTransactionObject<void>> {
    const innerCall: (addr: string) => CeloTransactionObject<void> = proxySend(
      this.connection,
      this.contract,
      'sell'
    )
    return innerCall(tokenAddress)
  }

  async distribute(tokenAddress: Address): Promise<CeloTransactionObject<void>> {
    const innerCall: (addr: string) => CeloTransactionObject<void> = proxySend(
      this.connection,
      this.contract,
      'distribute'
    )
    return innerCall(tokenAddress)
  }
}

export type FeeHandlerType = FeeHandlerWrapper
