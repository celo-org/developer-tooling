/**
 * Sourcify (https://sourcify.dev/) helpers for querying
 * contract metadata when it's available.
 *
 * @example
 * Get the ABI of an arbitrary contract.
 * ```ts
 * const metadata = fetchMetadata('42220', '0xF27c7D717B4b7CaD2833a61cb9CA7B61021f9F73')
 * if (metadata.abi !== null) {
 *  // do something with it.
 * }
 */
import { ABIDefinition, AbiInput, AbiItem, Address, Connection } from '@celo/connect'
import fetch from 'cross-fetch'
import { getAddress, toFunctionSelector } from 'viem'
import { ContractMapping, mapFromPairs } from './base'

/**
 * Convert an ABI item to a function signature string like `transfer(address,uint256)`.
 * Replaces the former `_jsonInterfaceMethodToString` helper.
 */
function abiItemToSignatureString(item: AbiItem): string {
  if (item.type === 'function' || item.type === 'constructor' || item.type === 'event') {
    const inputTypes = (item.inputs || []).map((input: AbiInput) => formatAbiInputType(input))
    return `${item.name || ''}(${inputTypes.join(',')})`
  }
  return item.name || ''
}

/** ABI input that may have tuple components (runtime ABI data from Solidity) */
export type AbiInputWithComponents = AbiInput & { components?: readonly AbiInputWithComponents[] }

export function formatAbiInputType(input: AbiInputWithComponents): string {
  if (input.type === 'tuple' && input.components) {
    return `(${input.components.map((c: AbiInput) => formatAbiInputType(c)).join(',')})`
  }
  if (input.type.startsWith('tuple[') && input.components) {
    const suffix = input.type.slice(5) // e.g. '[]' or '[3]'
    return `(${input.components.map((c: AbiInput) => formatAbiInputType(c)).join(',')})${suffix}`
  }
  return input.type
}

const PROXY_IMPLEMENTATION_GETTERS = [
  '_getImplementation',
  'getImplementation',
  '_implementation',
  'implementation',
]

// Position of the implementation in the UUPS proxy smart contract storage
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/8b4b7b8d041c62a84e2c23d7f6e1f0d9e0fc1f20/contracts/proxy/ERC1967/ERC1967Utils.sol#L35
const PROXY_IMPLEMENTATION_POSITION_UUPS =
  '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc'

const PROXY_ABI: AbiItem[] = PROXY_IMPLEMENTATION_GETTERS.map((funcName) => ({
  constant: true,
  inputs: [],
  name: funcName,
  outputs: [
    {
      internalType: 'address',
      name: 'implementation',
      type: 'address',
    },
  ],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}))

/**
 * MetadataResponse interface for the `metadata.json` file that the sourcify repo returns.
 * All fields are optional because we don't really _know_ what we get from the API, thus
 * we need to enforce the structure at runtime.
 */
export interface MetadataResponse {
  output?: {
    abi?: AbiItem[]
  }
  settings?: {
    compilationTarget?: Record<string, string>
  }
}

/**
 * Wrapper class for a metadata.json response from sourcify.
 * Because the response's true structure is unknown this wrapper implements
 * light runtime verification.
 */
export class Metadata {
  public abi: AbiItem[] | null = null
  public contractName: string | null = null
  public fnMapping: Map<string, ABIDefinition> = new Map()

  private address: Address

  constructor(_connection: Connection, address: Address, response: any) {
    this.response = response as MetadataResponse
    this.address = address
  }

  set response(value: MetadataResponse) {
    if (
      typeof value === 'object' &&
      typeof value.output === 'object' &&
      'abi' in value.output &&
      Array.isArray(value.output.abi) &&
      value.output.abi.length > 0
    ) {
      this.abi = value.output.abi
      this.fnMapping = mapFromPairs(
        (this.abi || [])
          .filter((item) => item.type === 'function')
          .map((item) => {
            const sig = `${item.name}(${(item.inputs || []).map((i: AbiInput) => formatAbiInputType(i)).join(',')})`
            const signature = toFunctionSelector(sig)
            return { ...item, signature }
          })
          .map((item) => [item.signature, item])
      )
    }

    if (
      typeof value === 'object' &&
      typeof value.settings === 'object' &&
      typeof value.settings.compilationTarget === 'object' &&
      Object.values(value.settings.compilationTarget).length > 0
    ) {
      // XXX: Not sure when there are multiple compilationTargets and what should
      // happen then but defaulting to this for now.
      const contracts = Object.values(value.settings.compilationTarget)
      this.contractName = contracts[0]
    }
  }

  /**
   * Turn the ABI into a mapping of function selectors to ABI items.
   */
  toContractMapping(): ContractMapping {
    return {
      details: {
        name: this.contractName || 'Unknown',
        address: this.address,
        jsonInterface: this.abi || [],
        isCore: false,
      },
      fnMapping: this.fnMapping,
    }
  }

  /**
   * Find the AbiItem for a given function selector
   * @param selector the 4-byte selector of the function call
   * @returns an AbiItem if found or null
   */
  abiForSelector(selector: string): AbiItem | null {
    return (
      this.abi?.find((item) => {
        return (
          item.type === 'function' &&
          toFunctionSelector(
            `${item.name}(${(item.inputs || []).map((i: AbiInput) => formatAbiInputType(i)).join(',')})`
          ) === selector
        )
      }) || null
    )
  }

  /**
   * Find the AbiItem for methods that match the provided method name.
   * The function can return more than one AbiItem if the query string
   * provided doesn't contain arguments as there can be multiple
   * definitions with different arguments.
   * @param method name of the method to lookup
   * @returns and array of AbiItems matching the query
   */
  abiForMethod(query: string): AbiItem[] {
    if (query.indexOf('(') >= 0) {
      // Method is a full call signature with arguments
      return (
        this.abi?.filter((item) => {
          return item.type === 'function' && abiItemToSignatureString(item) === query
        }) || []
      )
    } else {
      // Method is only method name
      return (
        this.abi?.filter((item) => {
          return item.type === 'function' && item.name === query
        }) || []
      )
    }
  }
}

/** Sourcify v2 match types. `exact_match` is the former "full" match; `match`
 * is the former "partial" match. https://docs.sourcify.dev/docs/exact-match-vs-match/ */
type SourcifyMatch = 'exact_match' | 'match' | null

interface SourcifyV2Response {
  match?: SourcifyMatch
  metadata?: MetadataResponse
}

const SOURCIFY_SERVER_URL = 'https://sourcify.dev/server'

/**
 * Fetch the contract metadata from Sourcify and instantiate a Metadata wrapper
 * class around it. Uses the Sourcify v2 API (the v1 repo API has been sunset).
 * @param connection @celo/connect instance
 * @param contract the address of the contract to query
 * @param strict only allow exact matches https://docs.sourcify.dev/docs/exact-match-vs-match/
 * @returns Metadata or null
 */
export async function fetchMetadata(
  connection: Connection,
  contract: Address,
  strict = false
): Promise<Metadata | null> {
  const chainID = await connection.viemClient.getChainId()
  const resp = await fetch(
    `${SOURCIFY_SERVER_URL}/v2/contract/${chainID}/${contract}?fields=metadata`
  )
  // 404 (and any non-2xx) means the contract isn't verified on Sourcify.
  if (!resp.ok) {
    return null
  }
  const data = (await resp.json()) as SourcifyV2Response
  if (!data || !data.match || !data.metadata) {
    return null
  }
  if (strict && data.match !== 'exact_match') {
    return null
  }
  return new Metadata(connection, contract, data.metadata)
}

/**
 * Use heuristics to determine if the contract can be a proxy
 * and extract the implementation.
 * Available scenarios:
 * - _getImplementation() exists
 * - getImplementation() exists
 * - _implementation() exists
 * - implementation() exists
 * @param connection @celo/connect instance
 * @param contract the address of the contract to query
 * @returns the implementation address or null
 */
export async function tryGetProxyImplementation(
  connection: Connection,
  contract: Address
): Promise<Address | undefined> {
  const proxyContract = connection.getCeloContract(PROXY_ABI, contract)
  for (const fn of PROXY_IMPLEMENTATION_GETTERS) {
    try {
      const result = await (proxyContract as any).read[fn]()
      return result as Address
    } catch {
      continue
    }
  }

  try {
    const hexValue = await connection.viemClient.getStorageAt({
      address: contract as `0x${string}`,
      slot: PROXY_IMPLEMENTATION_POSITION_UUPS as `0x${string}`,
    })
    if (!hexValue) {
      return undefined
    }
    // checksum to match map keys populated from registry.addressMapping()
    return getAddress('0x' + hexValue.slice(-40)) as Address
  } catch {
    return undefined
  }
}
