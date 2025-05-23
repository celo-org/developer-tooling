import { PublicCeloClient } from '@celo/actions'
import { getEpochManagerContract } from '@celo/actions/contracts/epoch-manager'

export async function getEpochInfo(client: PublicCeloClient) {
  const epochManager = await getEpochManagerContract({ public: client })

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
