import { StableToken } from '@celo/base'
import { STABLES_ADDRESS, withImpersonatedAccount } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import { ContractKit } from '../kit'

export const startAndFinishEpochProcess = async (kit: ContractKit) => {
  const [from] = await kit.connection.getAccounts()
  const epochManagerWrapper = await kit.contracts.getEpochManager()

  const startHash = await epochManagerWrapper.startNextEpochProcess({ from })
  await kit.connection.waitForTransactionReceipt(startHash)

  const finishHash = await epochManagerWrapper.finishNextEpochProcessTx({ from })
  await kit.connection.waitForTransactionReceipt(finishHash)
}

export const topUpWithToken = async (
  kit: ContractKit,
  stableToken: StableToken,
  recipientAddress: string,
  amount: BigNumber
) => {
  const token = await kit.contracts.getStableToken(stableToken)

  await withImpersonatedAccount(kit.connection.currentProvider, STABLES_ADDRESS, async () => {
    const hash = await token.transfer(recipientAddress, amount.toFixed(), { from: STABLES_ADDRESS })
    await kit.connection.waitForTransactionReceipt(hash)
  })
}
