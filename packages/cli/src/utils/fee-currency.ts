import { ContractKit } from '@celo/contractkit'
import { FeeCurrencyDirectoryWrapper } from '@celo/contractkit/lib/wrappers/FeeCurrencyDirectoryWrapper'

export const getFeeCurrencyContractWrapper = async (
  kit: ContractKit
): Promise<FeeCurrencyDirectoryWrapper> => {
  return await kit.contracts.getFeeCurrencyDirectory()
}
