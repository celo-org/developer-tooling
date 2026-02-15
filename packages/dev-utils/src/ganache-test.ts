import { Web3 } from '@celo/connect'
import { getAddress } from 'viem'
import migrationOverride from './migration-override.json'
import { jsonRpcCall } from './test-utils'

export const NetworkConfig = migrationOverride

export async function timeTravel(seconds: number, client: Web3) {
  await jsonRpcCall(client, 'evm_increaseTime', [seconds])
  await jsonRpcCall(client, 'evm_mine', [])
}

export async function mineBlocks(blocks: number, client: Web3) {
  for (let i = 0; i < blocks; i++) {
    await jsonRpcCall(client, 'evm_mine', [])
  }
}
/**
 * Gets a contract address by parsing blocks and matching event signatures against the given event.
 */
export async function getContractFromEvent(
  eventSignature: string,
  client: Web3,
  filter?: {
    expectedData?: string
    index?: number
  }
): Promise<string> {
  const logs = await client.eth.getPastLogs({
    topics: [client.utils.sha3(eventSignature)],
    fromBlock: 'earliest',
    toBlock: 'latest',
  })
  if (logs.length === 0) {
    throw new Error(`Error: contract could not be found matching signature ${eventSignature}`)
  }
  const logIndex = filter?.index ?? 0
  if (!filter?.expectedData) {
    return getAddress(logs[logIndex].address)
  }
  const filteredLogs = logs.filter((log: { data: string }) => log.data === filter.expectedData)
  if (filteredLogs.length === 0) {
    throw new Error(
      `Error: contract could not be found matching signature ${eventSignature} with data ${filter.expectedData}`
    )
  }
  return getAddress(filteredLogs[logIndex ?? 0].address)
}
