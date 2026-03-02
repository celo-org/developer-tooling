import { AbiItem, signatureToAbiDefinition } from '@celo/connect'
import { coerceArgsForAbi } from '@celo/connect/lib/viem-abi-coder'
import { toChecksumAddress } from '@celo/utils/lib/address'
import {
  CeloContract,
  ContractKit,
  RegisteredContracts,
  SET_AND_INITIALIZE_IMPLEMENTATION_ABI,
  getInitializeAbiOfImplementation,
  setImplementationOnProxy,
} from '@celo/contractkit'
import { stripProxy } from '@celo/contractkit/lib/base'
import { ProposalTransaction } from '@celo/contractkit/lib/wrappers/Governance'
import { fetchMetadata, tryGetProxyImplementation } from '@celo/explorer/lib/sourcify'
import { isValidAddress } from '@celo/utils/lib/address'
import { isNativeError } from 'util/types'
import { encodeFunctionData } from 'viem'
import {
  ExternalProposalTransactionJSON,
  ProposalTransactionJSON,
  ProposalTxParams,
  RegistryAdditions,
  isProxySetAndInitFunction,
  isProxySetFunction,
  isRegistryRepoint,
  registryRepointArgs,
} from './proposals'
import { bigintReplacer } from './json-utils'

/**
 * Builder class to construct proposals from JSON or transaction objects.
 */

export class ProposalBuilder {
  externalCallProxyRepoint: Map<string, string> = new Map()

  constructor(
    private readonly kit: ContractKit,
    private readonly builders: (() => Promise<ProposalTransaction>)[] = [],
    public readonly registryAdditions: RegistryAdditions = {}
  ) {}

  /**
   * Build calls all of the added build steps and returns the final proposal.
   * @returns A constructed Proposal object (i.e. a list of ProposalTransaction)
   */
  build = async () => {
    const ret = []
    for (const builder of this.builders) {
      ret.push(await builder())
    }
    return ret
  }

  /**
   * Converts encoded function data into a proposal transaction object.
   * @param data Hex-encoded function call data.
   * @param params Parameters for how the transaction should be executed.
   */
  fromEncodedTx = (data: string, params: ProposalTxParams): ProposalTransaction => ({
    value: params.value,
    to: params.to,
    input: data,
  })

  /**
   * Adds a transaction to set the implementation on a proxy to the given address.
   * @param contract Celo contract name of the proxy which should have its implementation set.
   * @param newImplementationAddress Address of the new contract implementation.
   */
  addProxyRepointingTx = (contract: CeloContract, newImplementationAddress: string) => {
    this.builders.push(async () => {
      const proxy = await this.kit._contracts.getContract(contract)
      return this.fromEncodedTx(setImplementationOnProxy(newImplementationAddress), {
        to: proxy.address,
        value: '0',
      })
    })
  }

  /**
   * Adds an encoded transaction to the list for proposal construction.
   * @param data Hex-encoded function call data.
   * @param params Parameters for how the transaction should be executed.
   */
  addEncodedTx = (data: string, params: ProposalTxParams) =>
    this.builders.push(async () => this.fromEncodedTx(data, params))

  setRegistryAddition = (contract: CeloContract, address: string) =>
    (this.registryAdditions[stripProxy(contract)] = address)

  getRegistryAddition = (contract: CeloContract): string | undefined =>
    this.registryAdditions[stripProxy(contract)]

  isRegistryContract = (contract: CeloContract) =>
    RegisteredContracts.includes(stripProxy(contract)) ||
    this.getRegistryAddition(contract) !== undefined

  lookupExternalMethodABI = async (
    address: string,
    tx: ExternalProposalTransactionJSON
  ): Promise<AbiItem | null> => {
    const metadata = await fetchMetadata(this.kit.connection, toChecksumAddress(address))
    const potentialABIs = metadata?.abiForMethod(tx.function) ?? []
    return (
      potentialABIs.find((abi) => {
        try {
          encodeFunctionData({ abi: [abi] as any, args: this.transformArgs(abi, tx.args) as any })
          return true
        } catch {
          return false
        }
      }) || null
    )
  }

  buildCallToExternalContract = async (
    tx: ExternalProposalTransactionJSON
  ): Promise<ProposalTransaction> => {
    if (!tx.address || !isValidAddress(tx.address)) {
      throw new Error(`${tx.contract} is not a core celo contract so address must be specified`)
    }

    if (tx.function === '') {
      return { input: '', to: tx.address, value: tx.value }
    }

    let methodABI: AbiItem | null = await this.lookupExternalMethodABI(tx.address, tx)
    if (methodABI === null) {
      const proxyImpl = this.externalCallProxyRepoint.has(tx.address)
        ? this.externalCallProxyRepoint.get(tx.address)
        : await tryGetProxyImplementation(this.kit.connection, tx.address)

      if (proxyImpl) {
        methodABI = await this.lookupExternalMethodABI(proxyImpl, tx)
      }
    }

    if (methodABI === null) {
      methodABI = signatureToAbiDefinition(tx.function)
    }

    const input = encodeFunctionData({
      abi: [methodABI] as any,
      args: this.transformArgs(methodABI, tx.args) as any,
    })
    return { input, to: tx.address, value: tx.value }
  }

  transformArgs = (abi: AbiItem, args: any[]) => {
    if (abi.inputs?.length !== args.length) {
      throw new Error(
        `ABI inputs length ${abi.inputs?.length} does not match args length ${args.length}`
      )
    }
    const res = []
    for (let i = 0; i < args.length; i++) {
      const input = abi.inputs![i]
      if (input.type === 'tuple') {
        // support of structs and tuples
        res.push(JSON.parse(args[i]))
      } else {
        res.push(args[i])
      }
    }
    return res
  }

  buildCallToCoreContract = async (tx: ProposalTransactionJSON): Promise<ProposalTransaction> => {
    // Account for canonical registry addresses from current proposal
    const address =
      this.getRegistryAddition(tx.contract) ?? (await this.kit.registry.addressFor(tx.contract))

    if (tx.address && address !== tx.address) {
      throw new Error(`Address mismatch for ${tx.contract}: ${address} !== ${tx.address}`)
    }

    if (tx.function === SET_AND_INITIALIZE_IMPLEMENTATION_ABI.name && Array.isArray(tx.args[1])) {
      // Transform array of initialize arguments (if provided) into delegate call data
      tx.args[1] = encodeFunctionData({
        abi: [getInitializeAbiOfImplementation(tx.contract as any)] as any,
        args: tx.args[1] as any,
      })
    }

    const contract = await this.kit._contracts.getContract(tx.contract, address)
    const methodName = tx.function
    const abiItem = (contract.abi as AbiItem[]).find(
      (item) => item.type === 'function' && item.name === methodName
    )
    if (!abiItem) {
      throw new Error(`Method ${methodName} not found in ABI for ${tx.contract}`)
    }
    const coercedArgs = abiItem.inputs ? coerceArgsForAbi(abiItem.inputs, tx.args) : tx.args
    const data = encodeFunctionData({
      abi: [abiItem],
      functionName: methodName,
      args: coercedArgs,
    })
    return this.fromEncodedTx(data, { to: address, value: tx.value })
  }

  fromJsonTx = async (
    tx: ProposalTransactionJSON | ExternalProposalTransactionJSON
  ): Promise<ProposalTransaction> => {
    if (tx.value === undefined) {
      throw new Error('Missing tx.value')
    }

    if (isRegistryRepoint(tx)) {
      // Update canonical registry addresses
      const args = registryRepointArgs(tx)
      this.setRegistryAddition(args.name, args.address)
    }

    if (isProxySetAndInitFunction(tx) || isProxySetFunction(tx)) {
      console.log(tx.address + ' is a proxy, repointing to ' + tx.args[0])
      this.externalCallProxyRepoint.set(tx.address || (tx.contract as string), tx.args[0] as string)
    }

    const strategies = [this.buildCallToCoreContract, this.buildCallToExternalContract]

    // store issues to display if all fail but show none if any succeeds
    const issues = []

    for (const strategy of strategies) {
      try {
        return await strategy(tx as ProposalTransactionJSON)
      } catch (e) {
        issues.push(`${isNativeError(e) ? e.message : e}`)
      }
    }

    throw new Error(
      `Couldn't build call for transaction:\n\n${JSON.stringify(
        tx,
        bigintReplacer,
        2
      )}\n\nAt least one of the following issues must be corrected:\n${issues
        .map((error, index) => `  ${index + 1}. ${error}`)
        .join('\n')}\n`
    )
  }

  addJsonTx = (tx: ProposalTransactionJSON) => this.builders.push(async () => this.fromJsonTx(tx))
}
