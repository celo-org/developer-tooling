import { StableToken } from '@celo/base'
import { STABLES_ADDRESS, withImpersonatedAccount } from '@celo/dev-utils/lib/anvil-test'
import BigNumber from 'bignumber.js'
import { ContractKit } from '../kit'

export const startAndFinishEpochProcess = async (kit: ContractKit) => {
  const [from] = await kit.web3.eth.getAccounts()
  const epochManagerWrapper = await kit.contracts.getEpochManager()

  await epochManagerWrapper.startNextEpochProcess().sendAndWaitForReceipt({ from })

  await (await epochManagerWrapper.finishNextEpochProcessTx()).sendAndWaitForReceipt({ from })
}

export const topUpWithToken = async (
  kit: ContractKit,
  stableToken: StableToken,
  recipientAddress: string,
  amount: BigNumber
) => {
  const token = await kit.contracts.getStableToken(stableToken)

  await withImpersonatedAccount(kit.web3, STABLES_ADDRESS, async () => {
    await token.transfer(recipientAddress, amount.toFixed()).sendAndWaitForReceipt({
      from: STABLES_ADDRESS,
    })
  })
}
