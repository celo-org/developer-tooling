import { StableToken } from '@celo/base'
import { STABLES_ADDRESS, withImpersonatedAccount } from '@celo/dev-utils/lib/anvil-test'
import { mineBlocks } from '@celo/dev-utils/lib/ganache-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { ContractKit } from '../kit'

const GANACHE_EPOCH_SIZE = 100
export const currentEpochNumber = async (web3: Web3, epochSize: number = GANACHE_EPOCH_SIZE) => {
  const blockNumber = await web3.eth.getBlockNumber()

  return getEpochNumberOfBlock(blockNumber, epochSize)
}

const getFirstBlockNumberForEpoch = (
  epochNumber: number,
  epochSize: number = GANACHE_EPOCH_SIZE
) => {
  if (epochNumber === 0) {
    // No first block for epoch 0
    return 0
  }
  return (epochNumber - 1) * epochSize + 1
}

const getEpochNumberOfBlock = (blockNumber: number, epochSize: number = GANACHE_EPOCH_SIZE) => {
  // Follows GetEpochNumber from celo-blockchain/blob/master/consensus/istanbul/utils.go
  const epochNumber = Math.floor(blockNumber / epochSize)
  if (blockNumber % epochSize === 0) {
    return epochNumber
  } else {
    return epochNumber + 1
  }
}

export const mineToNextEpoch = async (web3: Web3, epochSize: number = GANACHE_EPOCH_SIZE) => {
  const blockNumber = await web3.eth.getBlockNumber()
  const epochNumber = await currentEpochNumber(web3, epochSize)
  const blocksUntilNextEpoch = getFirstBlockNumberForEpoch(epochNumber + 1, epochSize) - blockNumber
  await mineBlocks(blocksUntilNextEpoch, web3)
}

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
