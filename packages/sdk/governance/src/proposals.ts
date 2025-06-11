/* eslint max-classes-per-file: off */
// TODO: Verify ABI paths and compatibility if @celo/abis/web3 contains Web3.js specific formats
import { ABI as GovernanceABI } from '@celo/abis/web3/Governance' // Assuming this is a standard JSON ABI
import { ABI as RegistryABI } from '@celo/abis/web3/Registry' // Assuming this is a standard JSON ABI
import { Address, trimLeading0x } from '@celo/base/lib/address'
import { CeloContract, REGISTRY_CONTRACT_ADDRESS } from '@celo/contractkit' // Keep CeloContract and REGISTRY_CONTRACT_ADDRESS for now
import { stripProxy, suffixProxy } from '@celo/contractkit/lib/base' // Keep for now
import {
  getInitializeAbiOfImplementation,
  SET_AND_INITIALIZE_IMPLEMENTATION_ABI,
  SET_IMPLEMENTATION_ABI,
} from '@celo/contractkit/lib/proxy' // Keep for now, contains ABI definitions

import {
  hotfixToParams, // This is from ContractKit's Governance wrapper, may need to be internalized or replaced
  Proposal, // Type from ContractKit, may need local definition or Viem alternative
  ProposalTransaction, // Type from ContractKit, may need local definition or Viem alternative
} from '@celo/contractkit/lib/wrappers/Governance'
import { newBlockExplorer } from '@celo/explorer' // BlockExplorer replacement is a major task
import { fetchMetadata } from '@celo/explorer/lib/sourcify'
import { fromFixed } from '@celo/utils/lib/fixidity'
import { keccak_256 } from '@noble/hashes/sha3'
import { utf8ToBytes } from '@noble/hashes/utils'
import { BigNumber } from 'bignumber.js'
import debugFactory from 'debug'
import {
  PublicClient,
  encodeAbiParameters,
  decodeAbiParameters,
  encodeFunctionSignature,
  GetTransactionReturnType,
  Abi,
  AbiItem,
  parseAbiItem, // For replacing getAbiByName if source is string
  getAddress, // For checksumming
  Hex,
} from 'viem'

// Helper to find an ABI item by name (replaces getAbiByName)
const findAbiItem = (abi: Abi, itemName: string): AbiItem | undefined =>
  abi.find((item) => item.type === 'function' && item.name === itemName)

export const debug = debugFactory('governance:proposals')

// export const hotfixExecuteAbi = getAbiByName(GovernanceABI, 'executeHotfix')
export const hotfixExecuteAbi = findAbiItem(GovernanceABI as Abi, 'executeHotfix')
if (!hotfixExecuteAbi) {
  throw new Error("ABI item 'executeHotfix' not found in GovernanceABI")
}

export const hotfixToEncodedParams = (proposal: Proposal, salt: Buffer) => {
  if (!hotfixExecuteAbi || !hotfixExecuteAbi.inputs) {
    throw new Error('hotfixExecuteAbi or its inputs are not defined')
  }
  // Viem's encodeAbiParameters expects an array of { type: string, name?: string } for inputs,
  // or just parseAbiParameters if types are directly available.
  // hotfixToParams returns an array of values.
  // The types need to be extracted from hotfixExecuteAbi.inputs.
  const types = hotfixExecuteAbi.inputs.map((input) => ({ type: input.type }))
  return encodeAbiParameters(
    types,
    hotfixToParams(proposal, salt) // Assuming hotfixToParams returns values in correct order
  )
}

export const hotfixToHash = (proposal: Proposal, salt: Buffer): Buffer =>
  Buffer.from(keccak_256(utf8ToBytes(hotfixToEncodedParams(proposal, salt))))

/**
 * JSON encoding of a proposal transaction.
 *
 * Example:
 * ```json
 * {
 *   "contract": "Election",
 *   "function": "setElectableValidators",
 *   "args": [ "1", "120" ],
 *   "value": "0"
 * }
 * ```
 */
export interface ProposalTransactionJSON {
  contract: CeloContract | string // Allow string for names from Sourcify
  address?: Address
  function: string
  args: any[]
  params?: Record<string, any>
  value: string
}

export type ExternalProposalTransactionJSON = Omit<ProposalTransactionJSON, 'contract'> & {
  contract?: CeloContract | string // Allow string
}

export const isRegistryRepoint = (
  tx: Pick<ExternalProposalTransactionJSON, 'contract' | 'function'>
) => tx.contract === 'Registry' && tx.function === 'setAddressFor'

const isGovernanceConstitutionSetter = (
  tx: Pick<ExternalProposalTransactionJSON, 'contract' | 'function'>
) => tx.contract === 'Governance' && tx.function === 'setConstitution'

export const registryRepointArgs = (
  tx: Pick<ExternalProposalTransactionJSON, 'args' | 'contract' | 'function'>
) => {
  if (!isRegistryRepoint(tx)) {
    throw new Error(`Proposal transaction not a registry repoint:\n${JSON.stringify(tx, null, 2)}`)
  }
  return {
    name: tx.args[0] as CeloContract,
    address: tx.args[1] as string,
  }
}

// const setAddressAbi = getAbiByName(RegistryABI, 'setAddressFor')
const setAddressAbi = findAbiItem(RegistryABI as Abi, 'setAddressFor')
if (!setAddressAbi) {
  throw new Error("ABI item 'setAddressFor' not found in RegistryABI")
}

const setAddressFunctionSignature = encodeFunctionSignature(setAddressAbi as AbiItem)

const isRegistryRepointRaw = (tx: ProposalTransaction) =>
  getAddress(tx.to) === getAddress(REGISTRY_CONTRACT_ADDRESS) && // Normalize addresses for comparison
  tx.input.startsWith(setAddressFunctionSignature)

const registryRepointRawArgs = (tx: ProposalTransaction) => {
  if (!isRegistryRepointRaw(tx)) {
    throw new Error(`Proposal transaction not a registry repoint:\n${JSON.stringify(tx, null, 2)}`)
  }
  if (!setAddressAbi.inputs) {
    throw new Error('setAddressAbi.inputs is not defined')
  }
  // Input data without the function signature (first 4 bytes / 8 hex chars + 0x)
  const encodedArgs = ('0x' + trimLeading0x(tx.input).slice(8)) as Hex
  const decoded = decodeAbiParameters(setAddressAbi.inputs, encodedArgs)
  return {
    name: decoded[0] as CeloContract, // Assuming 'identifier' is the first arg
    address: decoded[1] as string, // Assuming 'addr' is the second arg
  }
}

export const isProxySetAndInitFunction = (tx: Pick<ProposalTransactionJSON, 'function'>) =>
  tx.function === SET_AND_INITIALIZE_IMPLEMENTATION_ABI.name!

export const isProxySetFunction = (tx: Pick<ProposalTransactionJSON, 'function'>) =>
  tx.function === SET_IMPLEMENTATION_ABI.name!

/**
 * Convert a compiled proposal to a human-readable JSON form using network information.
 * @param kit Contract kit instance used to resolve addresses to contract names.
 * @param proposal A constructed proposal object.
 * @param registryAdditions Registry remappings prior to parsing the proposal as a map of name to corresponding contract address.
 * @returns The JSON encoding of the proposal.
 */
// Placeholder for contract details that were previously managed by BlockExplorer
interface ContractDetails {
  name: CeloContract | string // Could be a known CeloContract or a new name
  address: Address
  isProxy?: boolean
  implementation?: Address
  abi?: Abi // Store ABI once fetched
}

// In-memory store for contract details, similar to what BlockExplorer might have managed
// Keyed by contract address
const contractDetailsCache = new Map<Address, ContractDetails>()
// In-memory store for proxy implementation overrides
const proxyOverrideCache = new Map<Address, Address>()

// Function to get/update contract details, including fetching ABI via Sourcify
// This is a simplified replacement for parts of BlockExplorer's functionality
async function getContractDetails(
  publicClient: PublicClient,
  address: Address,
  nameHint?: CeloContract | string
): Promise<ContractDetails> {
  const checksummedAddress = getAddress(address)
  if (contractDetailsCache.has(checksummedAddress)) {
    return contractDetailsCache.get(checksummedAddress)!
  }

  // Check if this address is a proxy whose implementation is overridden
  const implementationAddress = proxyOverrideCache.get(checksummedAddress)

  // TODO: Try to determine if it's a known Celo contract by address if nameHint is not enough
  // This might involve looking up in a local version of the registry or using @celo/actions

  let name = nameHint || checksummedAddress
  let abi: Abi | undefined

  try {
    const metadata = await fetchMetadata(publicClient, checksummedAddress)
    if (metadata && metadata.abi) {
      abi = metadata.abi as Abi // Assuming metadata.abi is Viem-compatible Abi
      if (metadata.name) {
        name = metadata.name
      }
    }
  } catch (error) {
    debug(`Failed to fetch metadata for ${checksummedAddress}: ${error}`)
  }

  // If we have an overridden implementation, fetch its ABI if we couldn't get one for the proxy
  if (implementationAddress && !abi) {
    try {
      debug(
        `Fetching ABI for implementation ${implementationAddress} of proxy ${checksummedAddress}`
      )
      const implMetadata = await fetchMetadata(publicClient, implementationAddress)
      if (implMetadata && implMetadata.abi) {
        abi = implMetadata.abi as Abi
        // Potentially update name based on implementation if proxy name was generic
      }
    } catch (error) {
      debug(`Failed to fetch metadata for implementation ${implementationAddress}: ${error}`)
    }
  }

  const details: ContractDetails = {
    name: name as string, // Ensure name is string
    address: checksummedAddress,
    abi,
    isProxy: !!implementationAddress, // Simple check, could be more sophisticated
    implementation: implementationAddress,
  }
  contractDetailsCache.set(checksummedAddress, details)
  return details
}

// Helper to decode transaction input and build paramMap
function decodeTransactionInput(
  input: Hex,
  abi: Abi
): { functionName: string; args?: readonly unknown[]; paramMap: Record<string, any> } | null {
  try {
    const { functionName, args } = decodeFunctionData({ abi, data: input })
    const abiItem = abi.find(
      (item): item is AbiItem => item.type === 'function' && item.name === functionName
    )

    const paramMap: Record<string, any> = {}
    if (abiItem && abiItem.inputs && args) {
      for (let i = 0; i < abiItem.inputs.length; i++) {
        const inputDef = abiItem.inputs[i]
        paramMap[inputDef.name || `arg${i}`] = args[i]
      }
    }
    return { functionName, args, paramMap }
  } catch (error) {
    debug(`Failed to decode transaction input ${input}: ${error}`)
    return null
  }
}

export const proposalToJSON = async (
  publicClient: PublicClient,
  proposal: Proposal,
  registryAdditions?: RegistryAdditions
) => {
  // Clear caches for each run, or manage them more persistently if appropriate
  contractDetailsCache.clear()
  proxyOverrideCache.clear()

  // Apply registry additions to our local cache/understanding
  if (registryAdditions) {
    for (const nameStr of Object.keys(registryAdditions)) {
      const name = nameStr as CeloContract // Assuming nameStr is a CeloContract key
      const address = registryAdditions[nameStr]
      if (CeloContract[name] || Object.values(CeloContract).includes(name)) {
        debug(`Applying registry addition: ${name} => ${address}`)
        const details: ContractDetails = {
          name,
          address: getAddress(address), // Ensure checksummed
          // ABI might be loaded later if needed, or could be pre-populated if known
        }
        contractDetailsCache.set(getAddress(address), details)
      } else {
        debug(`Name ${nameStr} in registry additions not a recognized CeloContract`)
      }
    }
  }

  const proposalJson: ProposalTransactionJSON[] = []

  for (const tx of proposal) {
    const { to: toAddress, value, input } = tx
    const checksummedToAddress = getAddress(toAddress)

    // Attempt to get contract details (name, ABI)
    // Initially, we might not know the contract name if it's not in registryAdditions
    let contractInfo =
      contractDetailsCache.get(checksummedToAddress) ||
      (await getContractDetails(publicClient, checksummedToAddress))

    let decodedInput: ReturnType<typeof decodeTransactionInput> = null
    if (contractInfo.abi && input && input !== '0x') {
      decodedInput = decodeTransactionInput(input as Hex, contractInfo.abi)
    } else if (input && input !== '0x') {
      // Try to fetch ABI if not already available and input data exists
      debug(
        `ABI for ${contractInfo.name} (${checksummedToAddress}) not found, attempting to fetch for input decoding.`
      )
      contractInfo = await getContractDetails(publicClient, checksummedToAddress, contractInfo.name)
      if (contractInfo.abi) {
        decodedInput = decodeTransactionInput(input as Hex, contractInfo.abi)
      }
    }

    if (!decodedInput && input && input !== '0x') {
      debug(
        `Unable to parse transaction data for ${contractInfo.name} (${checksummedToAddress}). Input: ${input}. ABI may be missing or input malformed.`
      )
      // Fallback: Create a JSON tx with raw input if parsing fails
      proposalJson.push({
        contract: contractInfo.name || (`Unknown@${checksummedToAddress}` as any),
        address: checksummedToAddress,
        function: 'unknown', // Or extract function selector if possible
        args: [input], // Raw input as arg
        params: { rawInput: input },
        value: value.toString(), // Ensure value is string
      })
      continue
    }

    const functionName = decodedInput?.functionName || 'unknown'
    const args = decodedInput?.args || []
    const params = decodedInput?.paramMap || {}

    // Handle registry repointing updates to our local cache
    if (isRegistryRepointRaw(tx)) {
      const repointArgs = registryRepointRawArgs(tx) // Already uses Viem
      debug(
        `Applying registry repoint from transaction: ${repointArgs.name} => ${repointArgs.address}`
      )
      const repointedDetails: ContractDetails = {
        name: repointArgs.name,
        address: getAddress(repointArgs.address),
      }
      contractDetailsCache.set(getAddress(repointArgs.address), repointedDetails)
      // Also update the original address if it was a generic entry
      const originalEntry = contractDetailsCache.get(checksummedToAddress)
      if (originalEntry && originalEntry.name === checksummedToAddress) {
        // if name was just address
        contractDetailsCache.set(checksummedToAddress, { ...originalEntry, name: 'Registry' })
      }
    }

    const jsonTx: ProposalTransactionJSON = {
      contract: contractInfo.name as CeloContract, // May need adjustment if name is not CeloContract
      address: checksummedToAddress,
      function: functionName,
      args: args.map((arg) => (typeof arg === 'bigint' ? arg.toString() : arg)), // Convert bigints in args
      params,
      value: value.toString(), // Ensure value is string
    }

    if (isProxySetFunction(jsonTx)) {
      jsonTx.contract = suffixProxy(jsonTx.contract as CeloContract) // Assuming name was base
      proxyOverrideCache.set(checksummedToAddress, getAddress(jsonTx.args[0] as string))
      // Re-fetch details for the implementation to get its ABI for future calls if needed
      await getContractDetails(publicClient, getAddress(jsonTx.args[0] as string), jsonTx.contract)
    } else if (isProxySetAndInitFunction(jsonTx)) {
      const implAddress = getAddress(jsonTx.args[0] as string)
      proxyOverrideCache.set(checksummedToAddress, implAddress)
      jsonTx.contract = suffixProxy(jsonTx.contract as CeloContract) // Assuming name was base

      let initAbiItem: AbiItem | undefined
      // Try to get init ABI from already fetched implementation details or core contract logic
      const implDetails = await getContractDetails(publicClient, implAddress, jsonTx.contract) // Pass suffixed name
      if (implDetails.abi) {
        initAbiItem = findAbiItem(implDetails.abi, 'initialize')
      }
      // Fallback for core contracts if ABI wasn't fetched via Sourcify for implementation
      if (!initAbiItem && Object.values(CeloContract).includes(jsonTx.contract)) {
        initAbiItem = getInitializeAbiOfImplementation(jsonTx.contract as CeloContract) // from contractkit/lib/proxy
      }

      if (initAbiItem && initAbiItem.type === 'function' && initAbiItem.inputs) {
        const initArgsHex = jsonTx.args[1] as Hex
        // 8 bytes for function sig (0x + 8 chars)
        const initFunctionSig = initArgsHex.slice(0, 10)
        const initEncodedArgs = ('0x' + initArgsHex.slice(10)) as Hex
        try {
          const decodedInitArgs = decodeAbiParameters(initAbiItem.inputs, initEncodedArgs)
          const initParamsMap: Record<string, any> = {}
          for (let i = 0; i < initAbiItem.inputs.length; i++) {
            const inputDef = initAbiItem.inputs[i]
            initParamsMap[inputDef.name || `arg${i}`] = decodedInitArgs[i]
          }
          jsonTx.params![`initialize@${initFunctionSig.slice(2)}`] = initParamsMap // remove 0x from sig
        } catch (e) {
          debug(`Error decoding initialize arguments for ${jsonTx.contract}: ${e}`)
          jsonTx.params![`initialize_decode_error@${initFunctionSig.slice(2)}`] = initArgsHex
        }
      }
    } else if (isGovernanceConstitutionSetter(jsonTx)) {
      // This part requires resolving address and function selector to contract name and method
      // This was previously done by blockExplorer.getContractMappingWithSelector
      // Replicating this is complex as it needs a full map of selectors to ABIs/methods
      // For now, we'll add a placeholder or simplified version.
      const [targetAddress, functionSelector, threshold] = jsonTx.args as [
        Address,
        Hex,
        string | number | bigint
      ]
      // Try to get details for the targetAddress of the constitution change
      const targetContractDetails = await getContractDetails(publicClient, targetAddress)
      let targetFunctionName = `unknownFunction(${functionSelector})`
      if (targetContractDetails.abi) {
        const targetAbiItem = targetContractDetails.abi.find(
          (item) =>
            item.type === 'function' && encodeFunctionSignature(item).startsWith(functionSelector)
        )
        if (targetAbiItem) {
          targetFunctionName = targetAbiItem.name!
        }
      }
      jsonTx.params![`setConstitution[${targetAddress}][${functionSelector.slice(2)}]`] = {
        contract: targetContractDetails.name,
        method: targetFunctionName,
        threshold: fromFixed(new BigNumber(threshold.toString())), // fromFixed expects string or number
      }
    }
    // console.info('.') // Original logging, can be kept or removed
    proposalJson.push(jsonTx)
  }

  return proposalJson
}

export type ProposalTxParams = Pick<ProposalTransaction, 'to' | 'value'>
export interface RegistryAdditions {
  [contractName: string]: Address
}

// reexport for backwards compatibility
export { InteractiveProposalBuilder } from './interactive-proposal-builder'
export { ProposalBuilder } from './proposal-builder'
