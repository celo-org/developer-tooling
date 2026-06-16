/**
 * Block-explorer (Blockscout / Etherscan-compatible) helpers for querying a
 * verified contract's ABI when Sourcify does not have it.
 *
 * Celo core contracts are canonically verified on Celoscan / Blockscout, so this
 * is a more reliable ABI source than Sourcify for celo addresses (and works while
 * Sourcify's v1 API is being sunset).
 */
import { ABIDefinition, AbiItem, Address, Connection } from '@celo/connect'
import fetch from 'cross-fetch'
import { toFunctionSelector } from 'viem'
import { ContractMapping, mapFromPairs } from './base'
import { formatAbiInputType } from './sourcify'

/**
 * Keyless Blockscout API base URL per chain id. Blockscout exposes the
 * Etherscan-compatible `getsourcecode` action and holds Celo's verifications.
 */
const BLOCKSCOUT_API_BY_CHAIN: Record<number, string> = {
  42220: 'https://celo.blockscout.com/api',
  11142220: 'https://celo-sepolia.blockscout.com/api',
}

/**
 * Build a ContractMapping (selector -> ABI item) from a raw ABI, mirroring the
 * Sourcify Metadata path so downstream decoding behaves identically.
 */
export function abiToContractMapping(
  name: string,
  address: Address,
  abi: AbiItem[]
): ContractMapping {
  const fnMapping = mapFromPairs(
    abi
      .filter((item) => item.type === 'function')
      .map((item) => {
        const sig = `${item.name}(${(item.inputs || [])
          .map((i) => formatAbiInputType(i))
          .join(',')})`
        return { ...item, signature: toFunctionSelector(sig) } as ABIDefinition
      })
      .map((item): [string, ABIDefinition] => [item.signature, item])
  )
  return {
    details: { name: name || 'Unknown', address, jsonInterface: abi, isCore: false },
    fnMapping,
  }
}

/**
 * Fetch a verified contract's ABI from the chain's Blockscout instance.
 * Returns null when the chain is unsupported, the request fails, or the
 * contract is not verified.
 */
export async function fetchAbiFromExplorer(
  connection: Connection,
  address: string
): Promise<{ name: string; abi: AbiItem[] } | null> {
  let chainId: number
  try {
    chainId = await connection.viemClient.getChainId()
  } catch {
    return null
  }
  const base = BLOCKSCOUT_API_BY_CHAIN[chainId]
  if (!base) {
    return null
  }
  try {
    const resp = await fetch(`${base}?module=contract&action=getsourcecode&address=${address}`)
    if (!resp.ok) {
      return null
    }
    const data = await resp.json()
    const result = Array.isArray(data?.result) ? data.result[0] : undefined
    const rawAbi: string | undefined = result?.ABI
    if (!rawAbi || rawAbi === 'Contract source code not verified') {
      return null
    }
    const abi = JSON.parse(rawAbi) as AbiItem[]
    if (!Array.isArray(abi) || abi.length === 0) {
      return null
    }
    return { name: result?.ContractName || 'Unknown', abi }
  } catch {
    return null
  }
}
