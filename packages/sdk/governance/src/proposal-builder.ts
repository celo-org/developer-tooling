import {
  AbiItem,
  CeloTransactionObject,
  CeloTxObject,
  Contract,
  signatureToAbiDefinition,
} from '@celo/connect'
import {
  CeloContract,
  ContractKit,
  RegisteredContracts,
  SET_AND_INITIALIZE_IMPLEMENTATION_ABI,
  getInitializeAbiOfImplementation,
  setImplementationOnProxy,
} from '@celo/contractkit'
import { stripProxy } from '@celo/contractkit/lib/base'
import { valueToString } from '@celo/contractkit/lib/wrappers/BaseWrapper'
import { ProposalTransaction } from '@celo/contractkit/lib/wrappers/Governance'
import { fetchMetadata, tryGetProxyImplementation } from '@celo/explorer/lib/sourcify'
import { isValidAddress } from '@celo/utils/lib/address'
import { isNativeError } from 'util/types'
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
   * Converts a Web3 transaction into a proposal transaction object.
   * @param tx A Web3 transaction object to convert.
   * @param params Parameters for how the transaction should be executed.
   */
  fromWeb3tx = (tx: CeloTxObject<any>, params: ProposalTxParams): ProposalTransaction => ({
    value: params.value,
    to: params.to,
    input: tx.encodeABI(),
  })

  /**
   * Adds a transaction to set the implementation on a proxy to the given address.
   * @param contract Celo contract name of the proxy which should have its implementation set.
   * @param newImplementationAddress Address of the new contract implementation.
   */
  addProxyRepointingTx = (contract: CeloContract, newImplementationAddress: string) => {
    this.builders.push(async () => {
      const proxy = await this.kit._web3Contracts.getContract(contract)
      return this.fromWeb3tx(
        setImplementationOnProxy(newImplementationAddress, this.kit.connection.web3),
        {
          to: proxy.options.address,
          value: '0',
        }
      )
    })
  }

  /**
   * Adds a Web3 transaction to the list for proposal construction.
   * @param tx A Web3 transaction object to add to the proposal.
   * @param params Parameters for how the transaction should be executed.
   */
  addWeb3Tx = (tx: CeloTxObject<any>, params: ProposalTxParams) =>
    this.builders.push(async () => this.fromWeb3tx(tx, params))

  /**
   * Adds a Celo transaction to the list for proposal construction.
   * @param tx A Celo transaction object to add to the proposal.
   * @param params Optional parameters for how the transaction should be executed.
   */
  addTx(tx: CeloTransactionObject<any>, params: Partial<ProposalTxParams> = {}) {
    const to = params.to ?? tx.defaultParams?.to
    const value = params.value ?? tx.defaultParams?.value
    if (!to || !value) {
      throw new Error("Transaction parameters 'to' and/or 'value' not provided")
    }
    this.addWeb3Tx(tx.txo, { to, value: valueToString(value.toString()) })
  }

  setRegistryAddition = (contract: CeloContract, address: string) =>
    (this.registryAdditions[stripProxy(contract)] = address)

  getRegistryAddition = (contract: CeloContract): string | undefined =>
    this.registryAdditions[stripProxy(contract)]

  isRegistryContract = (contract: CeloContract) =>
    RegisteredContracts.includes(stripProxy(contract)) ||
    this.getRegistryAddition(contract) !== undefined

  /*
   * @deprecated - use isRegistryContract
   */
  isRegistered = this.isRegistryContract

  lookupExternalMethodABI = async (
    address: string,
    tx: ExternalProposalTransactionJSON
  ): Promise<AbiItem | null> => {
    const abiCoder = this.kit.connection.getAbiCoder()
    const metadata = await fetchMetadata(
      this.kit.connection,
      this.kit.web3.utils.toChecksumAddress(address)
    )
    const potentialABIs = metadata?.abiForMethod(tx.function) ?? []
    return (
      potentialABIs.find((abi) => {
        try {
          abiCoder.encodeFunctionCall(abi, this.transformArgs(abi, tx.args))
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

    const input = this.kit.connection
      .getAbiCoder()
      .encodeFunctionCall(methodABI, this.transformArgs(methodABI, tx.args))
    return { input, to: tx.address, value: tx.value }
  }

  /*
   *  @deprecated use buildCallToExternalContract
   *
   */
  buildFunctionCallToExternalContract = this.buildCallToExternalContract

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
      tx.args[1] = this.kit.connection
        .getAbiCoder()
        .encodeFunctionCall(getInitializeAbiOfImplementation(tx.contract as any), tx.args[1])
    }

    const contract = await this.kit._web3Contracts.getContract(tx.contract, address)
    const methodName = tx.function
    const method = (contract.methods as Contract['methods'])[methodName]
    if (!method) {
      throw new Error(`Method ${methodName} not found on ${tx.contract}`)
    }
    const txo = method(...tx.args)
    if (!txo) {
      throw new Error(`Arguments ${tx.args} did not match ${methodName} signature`)
    }

    return this.fromWeb3tx(txo, { to: address, value: tx.value })
  }

  fromJsonTx = async (
    tx: ProposalTransactionJSON | ExternalProposalTransactionJSON
  ): Promise<ProposalTransaction> => {
    if (!tx.value) {
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
        undefined,
        2
      )}\n\nAt least one of the following issues must be corrected:\n${issues
        .map((error, index) => `  ${index + 1}. ${error}`)
        .join('\n')}\n`
    )
  }

  addJsonTx = (tx: ProposalTransactionJSON) => this.builders.push(async () => this.fromJsonTx(tx))
}
