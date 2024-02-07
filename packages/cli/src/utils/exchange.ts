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
  maxDepegPricePercentage: number,
  stableTokenInfo: StableTokenInfo = stableTokenInfos[StableToken.cUSD],
  flipOracle = false
): Promise<boolean> {
  const oracles = await kit.contracts.getSortedOracles()
  const oracleMedianRateRaw = (await oracles.medianRate(stableTokenInfo.contract)).rate
  const oracleMedianRate = flipOracle
    ? new BigNumber(1).div(oracleMedianRateRaw)
    : oracleMedianRateRaw
  const expectedSlippage = calculateExpectedSlippage(
    sellAmount,
    quotedAmountToReceiveWithBuffer,
    oracleMedianRate
  )
  if (Math.abs(expectedSlippage) > Math.abs(maxDepegPricePercentage)) {
    const check = await binaryPrompt(
      `Warning ${
        stableTokenInfo.symbol
      } price here (i.e. on-chain) would be depegged by ${expectedSlippage}% from the oracle prices ${oracleMedianRate.toString()} (i.e. swap prices). Are you sure you want to continue?`,
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
  console.info(`Quoted Price: ${quotedPrice.decimalPlaces(8).toString()} per token`)

  return slippage.toNumber()
}
