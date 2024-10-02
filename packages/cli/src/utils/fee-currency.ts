import { ContractKit } from '@celo/contractkit'
import { FeeCurrencyDirectoryWrapper } from '@celo/contractkit/lib/wrappers/FeeCurrencyDirectoryWrapper'
import { FeeCurrencyWhitelistWrapper } from '@celo/contractkit/lib/wrappers/FeeCurrencyWhitelistWrapper'

/**
 * Based on L1/L2 context returns an appropriate fee currency contract from contractkit.
 */
export const getFeeCurrencyContractWrapper = async (
  kit: ContractKit,
  isCel2: boolean
): Promise<FeeCurrencyDirectoryWrapper | FeeCurrencyWhitelistWrapper> => {
  if (isCel2) {
    return await kit.contracts.getFeeCurrencyDirectory()
  }

  return await kit.contracts.getFeeCurrencyWhitelist()
}
