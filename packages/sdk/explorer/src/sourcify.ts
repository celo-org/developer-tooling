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
import { AbiCoder, ABIDefinition, AbiItem, Address, Connection } from '@celo/connect'
import fetch from 'cross-fetch'
import { ContractMapping, mapFromPairs } from './base'

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
    implementation?: string
    name?: string
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
  public implementationAddress: string | null = null
  public fnMapping: Map<string, ABIDefinition> = new Map()

  private abiCoder: AbiCoder
  private jsonInterfaceMethodToString: (item: AbiItem) => string
  private address: Address

  constructor(connection: Connection, address: Address, response: MetadataResponse) {
    this.abiCoder = connection.getAbiCoder()
    this.response = response as MetadataResponse
    this.contractName = response.settings?.name || null
    this.implementationAddress = response.settings?.implementation || null
    // XXX: For some reason this isn't exported as it should be
    // @ts-ignore
    this.jsonInterfaceMethodToString = connection.web3.utils._jsonInterfaceMethodToString
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
            const signature = this.abiCoder.encodeFunctionSignature(item)
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
      this.contractName = this.contractName || contracts[0]
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
        return item.type === 'function' && this.abiCoder.encodeFunctionSignature(item) === selector
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
          return item.type === 'function' && this.jsonInterfaceMethodToString(item) === query
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

/**
 * Fetch the sourcify or celoscan response and instantiate a Metadata wrapper class around it.
 * Try a full_match but fallback to partial_match when not strict. (only valid for sourcify)
 * @param connection @celo/connect instance
 * @param contract the address of the contract to query
 * @param strict only allow full matches https://docs.sourcify.dev/docs/full-vs-partial-match/
 * @returns Metadata or null
 */
export async function fetchMetadata(
  connection: Connection,
  contract: Address,
  strict = false
): Promise<Metadata | null> {
  const fullMatchMetadata = await querySourcify(connection, 'full_match', contract)
  if (fullMatchMetadata !== null) {
    return fullMatchMetadata
  }
  console.debug('None found on full match on celo explorer, trying celoScan')
  const fullMatchFromCeloScan = await queryCeloScan(connection, contract)
  if (fullMatchFromCeloScan !== null) {
    if (fullMatchFromCeloScan.implementationAddress) {
      console.info('Implementation found', fullMatchFromCeloScan.implementationAddress)
      return queryCeloScan(connection, fullMatchFromCeloScan.implementationAddress)
    }
    return fullMatchFromCeloScan
  }
  console.debug('No full match found, trying partial match')
  if (strict) {
    return null
  } else {
    return querySourcify(connection, 'partial_match', contract)
  }
}

/**
 * Fetch the sourcify response and instantiate a Metadata wrapper class around it.
 * @param connection @celo/connect instance
 * @param matchType what type of match to query for https://docs.sourcify.dev/docs/full-vs-partial-match/
 * @param contract the address of the contract to query
 * @returns Metadata or null
 */
async function querySourcify(
  connection: Connection,
  matchType: 'full_match' | 'partial_match',
  contract: Address
): Promise<Metadata | null> {
  const chainID = await connection.chainId()
  const resp = await fetch(
    `https://repo.sourcify.dev/contracts/${matchType}/${chainID}/${contract}/metadata.json`
  )
  if (resp.ok) {
    return new Metadata(connection, contract, (await resp.json()) as MetadataResponse)
  }
  return null
}

type CeloScanResponse =
  | {
      status: '1'
      message: 'OK'
      result:
        | [
            {
              SourceCode: string
              ABI: string
              ContractName: string
              Implementation: `0x${string}`
              // More
            }
          ]
        | [
            {
              SourceCode: ''
              ABI: 'Contract source code not verified'
              ContractName: ''
              EVMVersion: 'Default'
              Proxy: '0'
              Implementation: ''
            }
          ]
    }
  | {
      status: '0'
      message: 'NOTOK'
      result: string
    }

/**
 * Fetch the celoScan response and instantiate a Metadata wrapper class around it.
 * @param connection @celo/connect instance
 * @param contract the address of the contract to query
 * @returns Metadata
 */
async function queryCeloScan(connection: Connection, contract: Address): Promise<Metadata | null> {
  const resp = await fetch(
    `https://api.celoscan.io/api?module=contract&action=getsourcecode&address=${contract}`
  )
  if (resp.ok) {
    const json = (await resp.json()) as CeloScanResponse
    // TODO get implementation when it is a proxy. the implementation address is in the response already.
    if (json.message === 'OK' && json.result[0].SourceCode.length > 2) {
      const info = json.result[0]
      const data = JSON.parse(info.ABI) as AbiItem[]
      return new Metadata(connection, contract, {
        output: { abi: data },
        settings: { name: info.ContractName, implementation: info.Implementation },
      })
    }
  }
  return null
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
  const proxyContract = new connection.web3.eth.Contract(PROXY_ABI, contract)
  for (const fn of PROXY_IMPLEMENTATION_GETTERS) {
    try {
      return await new Promise((resolve, reject) => {
        proxyContract.methods[fn]().call().then(resolve).catch(reject)
      })
    } catch {
      continue
    }
  }

  try {
    const hexValue = await connection.web3.eth.getStorageAt(
      contract,
      PROXY_IMPLEMENTATION_POSITION_UUPS
    )
    const address = connection.web3.utils.toChecksumAddress('0x' + hexValue.slice(-40))
    return address
  } catch {
    return undefined
  }
}
