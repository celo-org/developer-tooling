import { StableToken } from '@celo/base'
import { CeloClient } from '../packages-to-be/client'
import { ethNodeIsSyncing } from '../packages-to-be/utils'
import { failWith } from './cli'

export function enumEntriesDupWithLowercase<T>(entries: [string, T][]) {
  const enumMap: { [key: string]: T } = {}
  entries.forEach((value) => {
    enumMap[value[0]] = value[1]
    enumMap[value[0].toLowerCase()] = value[1]
  })
  return enumMap
}

export { ethNodeIsSyncing }

export async function nodeIsSynced(client: CeloClient): Promise<boolean> {
  if (process.env.NO_SYNCCHECK === 'true' || process.env.NO_SYNCCHECK === '1') {
    return true
  }

  try {
    // isSyncing() returns an object describing sync progress if syncing is actively
    // happening, and the boolean value `false` if not.
    // However, `false` can also indicate the syncing hasn't started, so here we
    // also need to check the latest block number
    const syncProgress = await ethNodeIsSyncing(client)
    if (typeof syncProgress === 'boolean' && !syncProgress) {
      const latestBlock = await client.getBlock({
        blockTag: 'latest',
      })
      if (latestBlock && latestBlock.number > 0) {
        // To catch the case in which syncing has happened in the past,
        // has stopped, and hasn't started again, check for an old timestamp
        // on the latest block
        const ageOfBlock = Date.now() / 1000 - Number(latestBlock.timestamp)
        if (ageOfBlock > 120) {
          console.log(
            `Latest block is ${ageOfBlock} seconds old, and syncing is not currently in progress`
          )
          console.log('To disable this check, set the NO_SYNCCHECK environment variable')
          return false
        } else {
          return true
        }
      }
    }
    return false
  } catch (error) {
    console.log(
      "An error occurred while trying to reach the node. Perhaps your node isn't running?"
    )
    return false
  }
}

export async function requireNodeIsSynced(client: CeloClient) {
  if (!(await nodeIsSynced(client))) {
    failWith('Node is not currently synced. Run node:synced to check its status.')
  }
}

export function getStableTokenContractName(stable: StableToken) {
  switch (stable) {
    case StableToken.cUSD:
      return 'StableToken'
    case StableToken.cEUR:
      return 'StableTokenEUR'
    case StableToken.cREAL:
      return 'StableTokenBRL'
  }
}
