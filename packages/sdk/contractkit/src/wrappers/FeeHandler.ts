import { feeHandlerABI } from '@celo/abis'
import { Address } from '@celo/connect'
import BigNumber from 'bignumber.js'
import { BaseWrapper } from './BaseWrapper'

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

export class FeeHandlerWrapper extends BaseWrapper<typeof feeHandlerABI> {
  owner = async () => this.contract.read.owner() as Promise<string>

  handleAll = () => this.buildTx('handleAll', [])
  burnCelo = () => this.buildTx('burnCelo', [])

  handle(tokenAddress: Address) {
    return this.buildTx('handle', [tokenAddress])
  }

  sell(tokenAddress: Address) {
    return this.buildTx('sell', [tokenAddress])
  }

  distribute(tokenAddress: Address) {
    return this.buildTx('distribute', [tokenAddress])
  }
}

export type FeeHandlerType = FeeHandlerWrapper
