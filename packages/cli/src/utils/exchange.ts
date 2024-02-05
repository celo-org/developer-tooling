import { ContractKit } from '@celo/contractkit'
import { StableToken, StableTokenInfo, stableTokenInfos } from '@celo/contractkit/lib/celo-tokens'
import BigNumber from 'bignumber.js'
import { binaryPrompt } from './cli'
export const swapArguments = [
  {
    name: 'sellAmount',
    required: true,
    description: 'the amount of sellToken (in wei) to sell',
  },
  {
    name: 'minBuyAmount',
    required: true,
    description: 'the minimum amount of buyToken (in wei) expected',
  },
  {
    name: 'from',
    required: true,
  },
]

export async function checkNotDangerousExchange(
  kit: ContractKit,
  sellAmount: BigNumber,
  quotedAmountToReceiveWithBuffer: BigNumber,
  depeggedPricePercentage: number,
  stableTokenInfo: StableTokenInfo = stableTokenInfos[StableToken.cUSD]
): Promise<boolean> {
  const oracles = await kit.contracts.getSortedOracles()
  const oracleMedianRate = (await oracles.medianRate(stableTokenInfo.contract)).rate
  // TODO when swapping  CELO for cusd this rate is good but when we do cusd for CELO it is not what we want
  // XX% difference between rates
  const expectedSlippage = calculateExpectedSlippage(
    sellAmount,
    quotedAmountToReceiveWithBuffer,
    oracleMedianRate
  )
  if (expectedSlippage > depeggedPricePercentage) {
    const check = await binaryPrompt(
      `Warning ${
        stableTokenInfo.symbol
      } price here (i.e. on-chain) is depegged by ${expectedSlippage}% which is >${depeggedPricePercentage}% from the oracle prices ${oracleMedianRate.toString()} (i.e. swap prices). Are you sure you want to continue?`,
      true
    )
    return check
  }

  return true
}

// (Quoted Price – MarketPrice Price) / Quoted Price * 100
export function calculateExpectedSlippage(
  sellAmount: BigNumber,
  quotedAmountToReceiveWithBuffer: BigNumber,
  oracleMedianRate: BigNumber
) {
  const marketPrice = oracleMedianRate
  const quotedPrice = quotedAmountToReceiveWithBuffer.dividedBy(sellAmount)

  const priceDifference = quotedPrice.minus(marketPrice)
  const slippage = priceDifference.dividedBy(quotedPrice).multipliedBy(100)
  console.info(
    `Quoted Price: ${quotedPrice.toString()} differs from Market Price: ${marketPrice.toString()} by ${slippage.toString()}%`
  )

  return slippage.toNumber()
}
