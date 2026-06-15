import { feeHandlerABI } from '@celo/abis'
import { Address, CeloTx } from '@celo/connect'
import BigNumber from 'bignumber.js'
import { BaseWrapper, toViemAddress } from './BaseWrapper'

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

  handleAll = (txParams?: Omit<CeloTx, 'data'>) => this.contract.write.handleAll(txParams as any)
  burnCelo = (txParams?: Omit<CeloTx, 'data'>) => this.contract.write.burnCelo(txParams as any)

  handle(tokenAddress: Address, txParams?: Omit<CeloTx, 'data'>) {
    return this.contract.write.handle([toViemAddress(tokenAddress)] as const, txParams as any)
  }

  sell(tokenAddress: Address, txParams?: Omit<CeloTx, 'data'>) {
    return this.contract.write.sell([toViemAddress(tokenAddress)] as const, txParams as any)
  }

  distribute(tokenAddress: Address, txParams?: Omit<CeloTx, 'data'>) {
    return this.contract.write.distribute([toViemAddress(tokenAddress)] as const, txParams as any)
  }
}

export type FeeHandlerType = FeeHandlerWrapper
