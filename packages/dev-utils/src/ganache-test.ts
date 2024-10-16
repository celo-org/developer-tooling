import Web3 from 'web3'
import migrationOverride from './migration-override.json'
import { jsonRpcCall, testWithWeb3 } from './test-utils'

export const NetworkConfig = migrationOverride

export async function timeTravel(seconds: number, web3: Web3) {
  await jsonRpcCall(web3, 'evm_increaseTime', [seconds])
  await jsonRpcCall(web3, 'evm_mine', [])
}

export async function mineBlocks(blocks: number, web3: Web3) {
  for (let i = 0; i < blocks; i++) {
    await jsonRpcCall(web3, 'evm_mine', [])
  }
}

export function testWithGanache(name: string, fn: (web3: Web3) => void) {
  return testWithWeb3(name, 'http://localhost:8545', fn, {
    runIf: shouldRunGanacheTests(),
  })
}

export function shouldRunGanacheTests(): boolean {
  return (
    process.env.RUN_GANACHE_TESTS === 'true' || typeof process.env.RUN_GANACHE_TESTS === 'undefined'
  )
}

/**
 * Gets a contract address by parsing blocks and matching event signatures against the given event.
 */
export async function getContractFromEvent(
  eventSignature: string,
  web3: Web3,
  filter?: {
    expectedData?: string
    index?: number
  }
): Promise<string> {
  const logs = await web3.eth.getPastLogs({
    topics: [web3.utils.sha3(eventSignature)],
    fromBlock: 'earliest',
    toBlock: 'latest',
  })
  if (logs.length === 0) {
    throw Error(`Error: contract could not be found matching signature ${eventSignature}`)
  }
  const logIndex = filter?.index ?? 0
  if (!filter?.expectedData) {
    return logs[logIndex].address
  }
  const filteredLogs = logs.filter((log) => log.data === filter.expectedData)
  if (filteredLogs.length === 0) {
    throw Error(
      `Error: contract could not be found matching signature ${eventSignature} with data ${filter.expectedData}`
    )
  }
  return filteredLogs[logIndex ?? 0].address
}
