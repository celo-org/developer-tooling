import { ContractKit } from '@celo/contractkit'
import { FeeCurrencyDirectoryWrapper } from '@celo/contractkit/lib/wrappers/FeeCurrencyDirectoryWrapper'
import { FeeCurrencyWhitelistWrapper } from '@celo/contractkit/lib/wrappers/FeeCurrencyWhitelistWrapper'

export const getFeeCurrencyContractWrapper = async (
  kit: ContractKit
): Promise<FeeCurrencyDirectoryWrapper | FeeCurrencyWhitelistWrapper> => {
  return await kit.contracts.getFeeCurrencyDirectory()
}
