import { isNativeError } from 'util/types'
import {
  Abi,
  AbiItem,
  EncodeFunctionDataParameters,
  PublicClient,
  WalletClient,
  encodeFunctionData,
  getAddress,
  isAddress,
  parseAbiItem,
} from 'viem'
import { getContract } from 'viem/actions'
import { CeloContract, RegisteredContracts } from '@celo/contractkit' // TODO: Remove this once we have a Viem alternative
import {
  SET_AND_INITIALIZE_IMPLEMENTATION_ABI,
  getInitializeAbiOfImplementation,
} from '@celo/contractkit' // TODO: Remove this once we have a Viem alternative
import { stripProxy } from '@celo/contractkit/lib/base' // TODO: Remove this once we have a Viem alternative
import { valueToString } from '@celo/contractkit/lib/wrappers/BaseWrapper' // TODO: Remove this once we have a Viem alternative
import { ProposalTransaction } from '@celo/contractkit/lib/wrappers/Governance' // TODO: Remove this once we have a Viem alternative
import { fetchMetadata, tryGetProxyImplementation } from '@celo/explorer/lib/sourcify' // TODO: This might need to be replaced or adapted
import { Registry, অষ্টম } from '@celo/actions'
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
    private readonly publicClient: PublicClient,
    private readonly walletClient: WalletClient | undefined, // WalletClient is optional
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
   * Converts a Viem transaction into a proposal transaction object.
   * @param tx A Viem transaction object to convert.
   * @param params Parameters for how the transaction should be executed.
   */
  // TODO: Update CeloTxObject<any> to its Viem equivalent
  fromViemTx = (
    tx: EncodeFunctionDataParameters,
    params: ProposalTxParams
  ): ProposalTransaction => ({
    value: params.value,
    to: params.to,
    input: encodeFunctionData(tx),
  })

  /**
   * Adds a transaction to set the implementation on a proxy to the given address.
   * @param contract Celo contract name of the proxy which should have its implementation set.
   * @param newImplementationAddress Address of the new contract implementation.
   */
  addProxyRepointingTx = (contractName: CeloContract, newImplementationAddress: string) => {
    this.builders.push(async () => {
      // TODO: Get contract address using Viem. This might involve using the Registry contract
      // For now, assuming we can get the proxy address directly.
      // const proxyAddress = await this.publicClient.getContractAddress({ name: contractName });
      const proxyAddress = await Registry.addressFor(this.publicClient, contractName) // Assuming Registry.addressFor exists and works this way

      // TODO: Replace setImplementationOnProxy with Viem equivalent or manual ABI encoding
      // This is a placeholder and needs to be implemented correctly.
      const txData: EncodeFunctionDataParameters = {
        abi: [
          {
            inputs: [{ name: 'implementation', type: 'address' }],
            name: '_setImplementation', // Common proxy function, adjust if different
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        functionName: '_setImplementation',
        args: [newImplementationAddress],
      }
      return this.fromViemTx(txData, {
        to: proxyAddress as `0x${string}`, // Cast needed as addressFor might return string
        value: '0',
      })
    })
  }

  /**
   * Adds a Viem transaction to the list for proposal construction.
   * @param tx A Viem transaction object to add to the proposal.
   * @param params Parameters for how the transaction should be executed.
   */
  addViemTx = (tx: EncodeFunctionDataParameters, params: ProposalTxParams) =>
    this.builders.push(async () => this.fromViemTx(tx, params))

  /**
   * Adds a transaction to the list for proposal construction.
   * @param txData The parameters for `encodeFunctionData` (abi, functionName, args).
   * @param params Parameters for the transaction itself (to, value).
   */
  addTx(txData: EncodeFunctionDataParameters, params: ProposalTxParams) {
    if (!params.to || params.value === undefined) {
      throw new Error("Transaction parameters 'to' and 'value' must be provided in params")
    }

    // Viem expects bigint for values in many places, but ProposalTransaction takes string.
    // Convert bigint to string. If it's already a string or number, valueToString handles it.
    // TODO: Re-evaluate valueToString if direct string/bigint is always passed.
    const valueAsString = valueToString(
      typeof params.value === 'bigint' ? params.value.toString() : params.value
    )

    this.addViemTx(txData, { to: params.to, value: valueAsString })
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
    // TODO: fetchMetadata might need to be adapted if it relies on ContractKit internals.
    // Assuming this.publicClient can be used or passed if necessary.
    // Pass publicClient directly; if fetchMetadata is well-typed and incompatible,
    // this might raise type errors during compilation, which is better than a runtime error.
    const metadata = await fetchMetadata(
      this.publicClient,
      getAddress(address) // Use Viem's getAddress
    )
    const potentialABIs = metadata?.abiForMethod(tx.function) ?? []
    return (
      potentialABIs.find((abiDef) => {
        // Ensure abiDef is treated as AbiItem, which is compatible with Viem's Abi type
        const abiItem = abiDef as AbiItem
        try {
          // Use encodeFunctionData for checking ABI compatibility
          encodeFunctionData({
            abi: [abiItem] as Abi, // encodeFunctionData expects Abi (array of AbiItems)
            functionName: abiItem.name!, // Assuming name is present, which it should be for functions
            args: this.transformArgs(abiItem, tx.args),
          })
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
    if (!tx.address || !isAddress(tx.address)) {
      // Use Viem's isAddress
      throw new Error(`${tx.contract} is not a core celo contract so address must be specified`)
    }

    if (tx.function === '') {
      return { input: '0x', to: tx.address, value: tx.value } // Viem expects '0x' for empty data
    }

    let methodABI: AbiItem | null = await this.lookupExternalMethodABI(tx.address, tx)
    if (methodABI === null) {
      const proxyImpl = this.externalCallProxyRepoint.has(tx.address)
        ? this.externalCallProxyRepoint.get(tx.address)
        : await tryGetProxyImplementation(this.publicClient, tx.address) // Pass publicClient directly

      if (proxyImpl) {
        methodABI = await this.lookupExternalMethodABI(proxyImpl, tx)
      }
    }

    if (methodABI === null) {
      // TODO: Replace signatureToAbiDefinition. Viem can parse human-readable ABIs.
      // If tx.function is a full signature like "function transfer(address,uint256)",
      // Viem's parseAbiItem should work.
      try {
        methodABI = parseAbiItem(tx.function) as AbiItem // Cast because parseAbiItem returns a generic AbiItemType
      } catch (e) {
        throw new Error(
          `Failed to parse ABI for function "${tx.function}". Ensure it is a valid human-readable ABI signature. Error: ${e}`
        )
      }
    }

    const input = encodeFunctionData({
      abi: [methodABI] as Abi,
      functionName: methodABI.name!,
      args: this.transformArgs(methodABI, tx.args),
    })
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
      this.getRegistryAddition(tx.contract) ??
      (await Registry.addressFor(this.publicClient, tx.contract as CeloContract)) // Use @celo/actions

    if (tx.address && getAddress(address) !== getAddress(tx.address)) {
      // Normalize addresses for comparison
      throw new Error(
        `Address mismatch for ${tx.contract}: ${getAddress(address)} !== ${getAddress(tx.address)}`
      )
    }

    let input: `0x${string}`
    const celoContractName = tx.contract as CeloContract // Cast for clarity

    if (tx.function === SET_AND_INITIALIZE_IMPLEMENTATION_ABI.name && Array.isArray(tx.args[1])) {
      // Transform array of initialize arguments (if provided) into delegate call data
      const initializeAbi = getInitializeAbiOfImplementation(celoContractName)
      if (!initializeAbi) {
        throw new Error(`Initialize ABI not found for ${celoContractName}`)
      }
      const initializeData = encodeFunctionData({
        abi: [initializeAbi] as Abi,
        functionName: initializeAbi.name!,
        args: tx.args[1],
      })
      // The main call is to SET_AND_INITIALIZE_IMPLEMENTATION_ABI, with initializeData as an argument
      input = encodeFunctionData({
        abi: [SET_AND_INITIALIZE_IMPLEMENTATION_ABI] as Abi,
        functionName: SET_AND_INITIALIZE_IMPLEMENTATION_ABI.name!,
        args: [tx.args[0], initializeData], // First arg is implementation, second is init data
      })
    } else {
      // TODO: Need a way to get ABIs for core Celo contracts.
      // This might involve a mapping from CeloContract name to ABI, e.g., from @celo/abis.
      // const contractAbi = CeloContractAbis[celoContractName];
      // if (!contractAbi) {
      //   throw new Error(`ABI for core contract ${celoContractName} not found`);
      // }
      // Dynamically construct the path to the ABI file.
      // This assumes that @celo/abis is a dependency and its structure is known.
      // In a real environment, this would involve `require(@celo/abis/dist/${celoContractName}.json)`
      // or a similar mechanism to load the ABI.
      // For the purpose of this refactoring, we'll represent the ABI conceptually.
      let contractAbi: Abi
      try {
        // Conceptual ABI loading using the helper.
        // In a real environment, getCoreContractAbi would perform actual file loading/requiring.
        contractAbi = this.getCoreContractAbi(celoContractName)
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e)
        // console.error is not available in all environments this code might run,
        // and direct console logging is often discouraged in library code.
        // Propagating a clear error is usually preferred.
        throw new Error(`Failed to load ABI for ${celoContractName}. Cause: ${errorMessage}`)
      }

      input = encodeFunctionData({
        abi: contractAbi, // No longer needs non-null assertion if getCoreContractAbi guarantees Abi or throws
        functionName: tx.function,
        args: tx.args,
      })
    }

    return {
      to: getAddress(address), // Ensure checksummed address
      value: tx.value,
      input,
    }
  }

  // Helper to load core contract ABIs.
  private getCoreContractAbi = (contractName: CeloContract): Abi => {
    try {
      // Construct the path to the ABI file within @celo/abis package.
      // This relies on the standard Node.js module resolution.
      // The .json extension is often optional with require.
      const abiPath = `@celo/abis/dist/${contractName}.json`
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const abi = require(abiPath)
      return abi as Abi // Assuming the JSON file directly contains the ABI array.
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e)
      throw new Error(
        `Failed to load ABI for core contract ${contractName}. Path: @celo/abis/dist/${contractName}.json. Cause: ${errorMessage}`
      )
    }
  }

  fromJsonTx = async (
    tx: ProposalTransactionJSON | ExternalProposalTransactionJSON
  ): Promise<ProposalTransaction> => {
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
