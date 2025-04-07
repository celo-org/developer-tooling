import { PublicClient } from 'viem'
import { getEpochManagerContract } from './contracts'

export async function getEpochInfo(client: PublicClient) {
  const epochManager = await getEpochManagerContract(client)

  const results = await Promise.allSettled([
    epochManager.read.getCurrentEpoch(),
    epochManager.read.getCurrentEpochNumber(),
    epochManager.read.isEpochProcessingStarted(),
    epochManager.read.isOnEpochProcess(),
    epochManager.read.isIndividualProcessing(),
    epochManager.read.isTimeForNextEpoch(),
  ])
  return results.map((result) => (result.status === 'fulfilled' ? result.value : result.reason))
}
