/* eslint max-classes-per-file: off */
import { ABI as GovernanceABI } from '@celo/abis/web3/Governance'
import { ABI as RegistryABI } from '@celo/abis/web3/Registry'
import { Address, trimLeading0x } from '@celo/base/lib/address'
import { AbiCoder, CeloTxPending, getAbiByName, parseDecodedParams } from '@celo/connect'
import { CeloContract, ContractKit, REGISTRY_CONTRACT_ADDRESS } from '@celo/contractkit'
import { stripProxy, suffixProxy } from '@celo/contractkit/lib/base'
import {
  getInitializeAbiOfImplementation,
  SET_AND_INITIALIZE_IMPLEMENTATION_ABI,
  SET_IMPLEMENTATION_ABI,
} from '@celo/contractkit/lib/proxy'

import {
  hotfixToParams,
  Proposal,
  ProposalTransaction,
} from '@celo/contractkit/lib/wrappers/Governance'
import { newBlockExplorer } from '@celo/explorer'
import { fetchMetadata } from '@celo/explorer/lib/sourcify'
import { fromFixed } from '@celo/utils/lib/fixidity'
import { keccak_256 } from '@noble/hashes/sha3'
import { utf8ToBytes } from '@noble/hashes/utils'
import { BigNumber } from 'bignumber.js'
import debugFactory from 'debug'

export const debug = debugFactory('governance:proposals')

export const hotfixExecuteAbi = getAbiByName(GovernanceABI, 'executeHotfix')

export const hotfixToEncodedParams = (kit: ContractKit, proposal: Proposal, salt: Buffer) =>
  kit.connection.getAbiCoder().encodeParameters(
    hotfixExecuteAbi.inputs!.map((input) => input.type),
    hotfixToParams(proposal, salt)
  )

export const hotfixToHash = (kit: ContractKit, proposal: Proposal, salt: Buffer): Buffer =>
  Buffer.from(keccak_256(utf8ToBytes(hotfixToEncodedParams(kit, proposal, salt))))

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
  contract: CeloContract
  address?: Address
  function: string
  args: any[]
  params?: Record<string, any>
  value: string
}

export type ExternalProposalTransactionJSON = Omit<ProposalTransactionJSON, 'contract'> & {
  contract?: string
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

const setAddressAbi = getAbiByName(RegistryABI, 'setAddressFor')

const isRegistryRepointRaw = (abiCoder: AbiCoder, tx: ProposalTransaction) =>
  tx.to === REGISTRY_CONTRACT_ADDRESS &&
  tx.input.startsWith(abiCoder.encodeFunctionSignature(setAddressAbi))

const registryRepointRawArgs = (abiCoder: AbiCoder, tx: ProposalTransaction) => {
  if (!isRegistryRepointRaw(abiCoder, tx)) {
    throw new Error(`Proposal transaction not a registry repoint:\n${JSON.stringify(tx, null, 2)}`)
  }
  const params = abiCoder.decodeParameters(setAddressAbi.inputs!, trimLeading0x(tx.input).slice(8))
  return {
    name: params.identifier as CeloContract,
    address: params.addr,
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
export const proposalToJSON = async (
  kit: ContractKit,
  proposal: Proposal,
  registryAdditions?: RegistryAdditions
) => {
  const blockExplorer = await newBlockExplorer(kit)

  const updateRegistryMapping = async (name: CeloContract, address: Address) => {
    debug(`updating registry to reflect ${name} => ${address}`)
    // this just sets the mapping in memory not anywhere like on chain or on a server
    await blockExplorer.updateContractDetailsMapping(stripProxy(name), address)
  }
  if (registryAdditions) {
    await Promise.all(
      Object.keys(registryAdditions).map(async (nameStr) => {
        const name = nameStr as CeloContract
        if (CeloContract[name]) {
          await updateRegistryMapping(name, registryAdditions[name])
        } else {
          debug(`Name ${nameStr} in registry additions not a CeloContract`)
        }
      })
    )
  }
  const abiCoder = kit.connection.getAbiCoder()

  const proposalJson: ProposalTransactionJSON[] = []

  for (const tx of proposal) {
    const parsedTx = await blockExplorer.tryParseTx(tx as CeloTxPending)
    if (parsedTx == null) {
      throw new Error(`Unable to parse ${JSON.stringify(tx)} with block explorer`)
    }
    if (isRegistryRepointRaw(abiCoder, tx) && parsedTx.callDetails.isCoreContract) {
      const args = registryRepointRawArgs(abiCoder, tx)
      await updateRegistryMapping(args.name, args.address)
    }

    const jsonTx: ProposalTransactionJSON = {
      contract: parsedTx.callDetails.contract as CeloContract,
      address: parsedTx.callDetails.contractAddress,
      function: parsedTx.callDetails.function,
      args: parsedTx.callDetails.argList,
      params: parsedTx.callDetails.paramMap,
      value: parsedTx.tx.value,
    }

    if (isProxySetFunction(jsonTx)) {
      jsonTx.contract = suffixProxy(jsonTx.contract)
      await blockExplorer.setProxyOverride(tx.to!, jsonTx.args[0])
    } else if (isProxySetAndInitFunction(jsonTx)) {
      await blockExplorer.setProxyOverride(tx.to!, jsonTx.args[0])
      let initAbi
      if (parsedTx.callDetails.isCoreContract) {
        jsonTx.contract = suffixProxy(jsonTx.contract)
        initAbi = getInitializeAbiOfImplementation(jsonTx.contract as any)
      } else {
        const implAddress = jsonTx.args[0]
        const metadata = await fetchMetadata(
          kit.connection,
          kit.web3.utils.toChecksumAddress(implAddress)
        )
        if (metadata && metadata.abi) {
          initAbi = metadata?.abiForMethod('initialize')[0]
        }
      }

      if (initAbi !== undefined) {
        // Transform delegate call initialize args into a readable params map
        // 8 bytes for function sig
        const initSig = trimLeading0x(jsonTx.args[1]).slice(0, 8)
        const initArgs = trimLeading0x(jsonTx.args[1]).slice(8)

        const { params: initParams } = parseDecodedParams(
          kit.connection.getAbiCoder().decodeParameters(initAbi.inputs!, initArgs)
        )
        jsonTx.params![`initialize@${initSig}`] = initParams
      }
    } else if (isGovernanceConstitutionSetter(jsonTx)) {
      const [address, functionId, threshold] = jsonTx.args
      const contractMapping = await blockExplorer.getContractMappingWithSelector(
        address,
        functionId
      )
      if (contractMapping === undefined) {
        throw new Error(
          `Governance.setConstitution targets unknown address ${address} and function id ${functionId}`
        )
      }
      jsonTx.params![`setConstitution[${address}][${functionId}]`] = {
        contract: contractMapping.details.name,
        method: contractMapping.fnMapping.get(functionId)?.name,
        threshold: fromFixed(new BigNumber(threshold)),
      }
    }
    console.info('.')
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
