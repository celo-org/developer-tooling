import { feeHandlerABI } from '@celo/abis'
import { Address, CeloTx } from '@celo/connect'
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

  handleAll = (txParams?: Omit<CeloTx, 'data'>) => this.sendTx('handleAll', [], txParams)
  burnCelo = (txParams?: Omit<CeloTx, 'data'>) => this.sendTx('burnCelo', [], txParams)

  handle(tokenAddress: Address, txParams?: Omit<CeloTx, 'data'>) {
    return this.sendTx('handle', [tokenAddress], txParams)
  }

  sell(tokenAddress: Address, txParams?: Omit<CeloTx, 'data'>) {
    return this.sendTx('sell', [tokenAddress], txParams)
  }

  distribute(tokenAddress: Address, txParams?: Omit<CeloTx, 'data'>) {
    return this.sendTx('distribute', [tokenAddress], txParams)
  }
}

export type FeeHandlerType = FeeHandlerWrapper
