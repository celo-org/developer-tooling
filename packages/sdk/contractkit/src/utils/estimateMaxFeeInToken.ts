import Web3 from 'web3'

import { newRegistry } from '@celo/abis-12/web3/Registry'
import { newSortedOracles } from '@celo/abis-12/web3/SortedOracles'

const CELO_REGISTRY_ADDRESS = '0x000000000000000000000000000000000000ce10'

export async function getConversionRateFromCeloToToken(
  tokenAddress: string,
  web3: Web3
): Promise<[bigint, bigint]> {
  const registry = newRegistry(web3, CELO_REGISTRY_ADDRESS)
  const oracleAddress = await registry.methods.getAddressForString('SortedOracles').call()
  const oracle = newSortedOracles(web3, oracleAddress)

  const { 0: numerator, 1: denominator } = await oracle.methods.medianRate(tokenAddress).call()
  // The function docs for the Contract are confusing but  in ContractKit the Sorted orcles wrapper
  // defines numerator as the amount of the token and denominiator as equvalent value in CELO
  // https://github.com/celo-org/developer-tooling/blob/master/packages/sdk/contractkit/src/wrappers/SortedOracles.ts#L80
  // https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/stability/SortedOracles.sol
  return [BigInt(numerator), BigInt(denominator)]
}
/**
 * For cip 66 transactions (the prefered way to pay for gas with fee tokens on Cel2) it is necessary
 * to provide the absolute limit one is willing to pay denominated in the token.
 * In contrast with earlier tx types for fee currencies (celo legacy, cip42, cip 64).
 *
 * Calulating Estimation requires the gas, maxfeePerGas and the conversion rate from CELO to feeToken
 * https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0066.md
 */
export async function estimateMaxFeeInFeeToken(
  web3: Web3,
  {
    gasLimit,
    maxFeePerGas,
    feeCurrency,
  }: {
    gasLimit: bigint
    maxFeePerGas: bigint
    feeCurrency: string
  }
) {
  const maxGasFeesInCELO = gasLimit * maxFeePerGas
  const [ratioTOKEN, ratioCELO] = await getConversionRateFromCeloToToken(feeCurrency, web3)

  return (maxGasFeesInCELO * ratioCELO) / ratioTOKEN
}
