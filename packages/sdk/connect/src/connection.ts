import { StrongAddress } from '@celo/base'
import { ensureLeading0x, toChecksumAddress } from '@celo/utils/lib/address'
import { EIP712TypedData, generateTypedDataHash } from '@celo/utils/lib/sign-typed-data-utils'
import { Signature, parseSignatureWithoutPrefix } from '@celo/utils/lib/signatureUtils'
import debugFactory from 'debug'
import {
  toHex,
  createPublicClient,
  createWalletClient,
  custom,
  toFunctionHash,
  toEventHash,
  type PublicClient,
  type WalletClient,
} from 'viem'
import { AbiInput, AbiItem } from './abi-types'
import { isEmpty } from './viem-abi-coder'
import { type CeloContract, createCeloContract } from './contract-types'
import { CeloProvider, assertIsCeloProvider } from './celo-provider'
import {
  Address,
  Block,
  BlockNumber,
  CeloTx,
  CeloTxPending,
  CeloTxReceipt,
  Provider,
} from './types'
import { decodeStringParameter } from './utils/abi-utils'
import {
  hexToNumber,
  inputAddressFormatter,
  inputBlockNumberFormatter,
  inputDefaultBlockNumberFormatter,
  inputSignFormatter,
  outputBigNumberFormatter,
  outputBlockFormatter,
  outputCeloTxFormatter,
  outputCeloTxReceiptFormatter,
} from './utils/formatter'
import { hasProperty } from './utils/provider-utils'
import { TxParamsNormalizer } from './utils/tx-params-normalizer'
import { ReadOnlyWallet } from './wallet'
import { readOnlyWalletToAccount } from './wallet-adapter'

// Convenience re-export for consumers that import from @celo/connect
export { isPresent, isEmpty } from './viem-abi-coder'

const debugGasEstimation = debugFactory('connection:gas-estimation')

export interface ConnectionOptions {
  gasInflationFactor: number
  feeCurrency?: StrongAddress
  from?: StrongAddress
}

/**
 * Connection is a Class for connecting to Celo, sending Transactions, etc
 * @param provider an EIP-1193 provider
 * @param wallet a child class of {@link WalletBase}
 */
export class Connection {
  private config: ConnectionOptions
  private _chainID: number | undefined
  readonly paramsPopulator: TxParamsNormalizer
  private _provider!: CeloProvider
  private _viemClient!: PublicClient
  private _walletClient: WalletClient | undefined

  constructor(
    provider: Provider,
    public wallet?: ReadOnlyWallet
  ) {
    this.config = {
      gasInflationFactor: 1.3,
    }

    this.setProvider(provider)
    this.paramsPopulator = new TxParamsNormalizer(this)
  }

  /** Get the current provider */
  get currentProvider(): CeloProvider {
    return this._provider
  }

  /** Viem PublicClient bound to this connection's RPC */
  get viemClient(): PublicClient {
    return this._viemClient
  }

  /**
   * Viem WalletClient bound to this connection's provider.
   * Lazily sets the default account when the wallet gains accounts after construction.
   */
  get walletClient(): WalletClient | undefined {
    // If walletClient exists without a default account but the wallet now has accounts, recreate
    if (
      this._walletClient &&
      !this._walletClient.account &&
      this.wallet &&
      this.wallet.getAccounts().length > 0
    ) {
      this._walletClient = createWalletClient({
        account: readOnlyWalletToAccount(
          this.wallet,
          this.wallet.getAccounts()[0] as StrongAddress
        ),
        transport: custom({
          request: this._provider.request.bind(this._provider),
        }),
      })
    }
    return this._walletClient
  }

  setProvider(provider: Provider) {
    if (!provider) {
      throw new Error('Must have a valid Provider')
    }
    this._chainID = undefined
    try {
      let celoProvider: CeloProvider
      if (!(provider instanceof CeloProvider)) {
        celoProvider = new CeloProvider(provider, this)
      } else {
        celoProvider = provider
      }
      this._provider = celoProvider
      const rawProvider = provider instanceof CeloProvider ? provider.existingProvider : provider
      this._viemClient = createPublicClient({
        transport: custom({
          request: rawProvider.request.bind(rawProvider),
        }),
      })
      if (this.wallet && this.wallet.getAccounts().length > 0) {
        this._walletClient = createWalletClient({
          account: readOnlyWalletToAccount(
            this.wallet,
            this.wallet.getAccounts()[0] as StrongAddress
          ),
          transport: custom({
            request: celoProvider.request.bind(celoProvider),
          }),
        })
      } else {
        // Always create a WalletClient so contract.write works for node accounts.
        // Individual write calls provide the account via from -> account mapping.
        this._walletClient = createWalletClient({
          transport: custom({
            request: celoProvider.request.bind(celoProvider),
          }),
        })
      }
      return true
    } catch (error) {
      console.error(`could not attach provider`, error)
      return false
    }
  }

  /**
   * Set default account for generated transactions (eg. tx.from )
   */
  set defaultAccount(address: StrongAddress | undefined) {
    this.config.from = address
  }

  /**
   * Default account for generated transactions (eg. tx.from)
   */
  get defaultAccount(): StrongAddress | undefined {
    return this.config.from
  }

  set defaultGasInflationFactor(factor: number) {
    this.config.gasInflationFactor = factor
  }

  get defaultGasInflationFactor() {
    return this.config.gasInflationFactor
  }

  /**
   * Set the ERC20 address for the token to use to pay for transaction fees.
   * The ERC20 address SHOULD be whitelisted for gas, but this is not checked or enforced.
   *
   * Set to `null` to use CELO
   *
   * @param address ERC20 address
   */
  set defaultFeeCurrency(address: StrongAddress | undefined) {
    this.config.feeCurrency = address
  }

  get defaultFeeCurrency() {
    return this.config.feeCurrency
  }

  isLocalAccount(address?: StrongAddress): boolean {
    return this.wallet != null && this.wallet.hasAccount(address)
  }

  addAccount(privateKey: string) {
    if (this.wallet) {
      if (hasProperty<{ addAccount: (privateKey: string) => void }>(this.wallet, 'addAccount')) {
        this.wallet.addAccount(privateKey)
      } else {
        throw new Error("The wallet used, can't add accounts")
      }
    } else {
      throw new Error('No wallet set')
    }
  }

  removeAccount(address: string) {
    if (this.wallet) {
      if (hasProperty<{ removeAccount: (address: string) => void }>(this.wallet, 'removeAccount')) {
        this.wallet.removeAccount(address)
      } else {
        throw new Error("The wallet used, can't remove accounts")
      }
    } else {
      throw new Error('No wallet set')
    }
  }

  async getNodeAccounts(): Promise<StrongAddress[]> {
    const accounts = await this._viemClient.request({
      method: 'eth_accounts' as any,
      params: [] as any,
    })
    return this.toChecksumAddresses((accounts as string[]) ?? []) as StrongAddress[]
  }

  getLocalAccounts(): StrongAddress[] {
    return this.wallet
      ? (this.toChecksumAddresses(this.wallet.getAccounts()) as StrongAddress[])
      : []
  }

  async getAccounts(): Promise<StrongAddress[]> {
    return (await this.getNodeAccounts()).concat(this.getLocalAccounts()) as StrongAddress[]
  }

  private toChecksumAddresses(addresses: string[]) {
    return addresses.map((value) => toChecksumAddress(value))
  }

  /**
   * Send a transaction to celo-blockchain.
   *
   * Similar to `eth_sendTransaction` but with following differences:
   *  - applies connections tx's defaults
   *  - estimatesGas before sending
   *  - returns the transaction hash
   */
  sendTransaction = async (tx: CeloTx): Promise<`0x${string}`> => {
    tx = this.fillTxDefaults(tx)

    let gas = tx.gas
    if (!gas) {
      const { gas: _omit, ...txWithoutGas } = tx
      gas = await this.estimateGasWithInflationFactor(txWithoutGas)
    }

    return this.sendTransactionViaProvider({
      ...tx,
      gas,
    })
  }

  private async sendTransactionViaProvider(tx: CeloTx): Promise<`0x${string}`> {
    const result = await this._provider.request({
      method: 'eth_sendTransaction',
      params: [tx],
    })
    return result as `0x${string}`
  }

  /*
   * @param signer - The address of account signing this data
   * @param typedData - Structured data to be signed
   * @param version - Optionally provide a version which will be appended to the method. E.G. (4) becomes 'eth_signTypedData_v4'
   * @remarks Some providers like Metamask treat eth_signTypedData differently from versioned method eth_signTypedData_v4
   * @see [Metamask info in signing Typed Data](https://docs.metamask.io/guide/signing-data.html)
   */
  signTypedData = async (
    signer: string,
    typedData: EIP712TypedData,
    version: 1 | 3 | 4 | 5 | null = 4
  ): Promise<Signature> => {
    // stringify data for v3 & v4 based on https://github.com/MetaMask/metamask-extension/blob/c72199a1a6e4151c40c22f79d0f3b6ed7a2d59a7/app/scripts/lib/typed-message-manager.js#L185
    const shouldStringify = version === 3 || version === 4

    // Uses the CeloProvider so this method can be intercepted
    // by a local wallet that could sign it.
    const method = version ? `eth_signTypedData_v${version}` : 'eth_signTypedData'
    const signature = (await this._provider.request({
      method,
      params: [
        inputAddressFormatter(signer),
        shouldStringify ? JSON.stringify(typedData) : typedData,
      ],
    })) as string

    const messageHash = toHex(generateTypedDataHash(typedData))
    return parseSignatureWithoutPrefix(messageHash, signature, signer)
  }

  sign = async (dataToSign: string, address: Address | number): Promise<string> => {
    // Uses the CeloProvider so this method can be intercepted
    // by a local wallet that could sign it.
    const signature = (await this._provider.request({
      method: 'eth_sign',
      params: [inputAddressFormatter(address.toString()), inputSignFormatter(dataToSign)],
    })) as string

    return signature
  }

  // if neither gas price nor feeMarket fields are present set them.
  setFeeMarketGas = async (tx: CeloTx): Promise<CeloTx> => {
    if (isEmpty(tx.maxPriorityFeePerGas)) {
      tx.maxPriorityFeePerGas = await this.getMaxPriorityFeePerGas(tx.feeCurrency)
    }

    if (isEmpty(tx.maxFeePerGas)) {
      const baseFee = isEmpty(tx.feeCurrency)
        ? await this._viemClient
            .getBlock({ blockTag: 'latest' })
            .then((block) => block.baseFeePerGas)
        : await this.gasPrice(tx.feeCurrency)
      const withBuffer = addBufferToBaseFee(BigInt(baseFee!))
      const maxFeePerGas =
        withBuffer + BigInt(ensureLeading0x(tx.maxPriorityFeePerGas.toString(16)))
      tx.maxFeePerGas = ensureLeading0x(maxFeePerGas.toString(16))
    }

    return {
      ...tx,
      gasPrice: undefined,
    }
  }

  private defaultGasEstimator = async (tx: CeloTx): Promise<number> => {
    const result = await this._viemClient.request({
      method: 'eth_estimateGas',
      params: [tx] as any,
    })
    return parseInt(result as string, 16)
  }

  private defaultCaller = async (tx: CeloTx): Promise<string> => {
    const result = await this._viemClient.request({
      method: 'eth_call',
      params: [{ data: tx.data, to: tx.to, from: tx.from }, 'latest'] as any,
    })
    return result as string
  }

  estimateGas = async (
    tx: CeloTx,
    gasEstimator?: (tx: CeloTx) => Promise<number>,
    caller?: (tx: CeloTx) => Promise<string>
  ): Promise<number> => {
    const estimator = gasEstimator ?? this.defaultGasEstimator
    const callFn = caller ?? this.defaultCaller

    try {
      const gas = await estimator({ ...tx })
      debugGasEstimation('estimatedGas: %s', gas.toString())
      return gas
    } catch (e) {
      const called = await callFn({ data: tx.data, to: tx.to, from: tx.from })
      let revertReason = 'Could not decode transaction failure reason'
      if (called.startsWith('0x08c379a')) {
        revertReason = decodeStringParameter(called.substring(10))
      }
      debugGasEstimation('Recover transaction failure reason', {
        called,
        data: tx.data,
        to: tx.to,
        from: tx.from,
        error: e,
        revertReason,
      })
      return Promise.reject(`Gas estimation failed: ${revertReason} or ${e}`)
    }
  }

  estimateGasWithInflationFactor = async (
    tx: CeloTx,
    gasEstimator?: (tx: CeloTx) => Promise<number>,
    caller?: (tx: CeloTx) => Promise<string>
  ): Promise<number> => {
    try {
      const gas = Math.round(
        (await this.estimateGas(tx, gasEstimator, caller)) * this.config.gasInflationFactor
      )
      debugGasEstimation('estimatedGasWithInflationFactor: %s', gas)
      return gas
    } catch (e: unknown) {
      throw new Error(String(e))
    }
  }

  // An instance of Connection will only change chain id if provider is changed.
  chainId = async (): Promise<number> => {
    if (this._chainID) {
      return this._chainID
    }
    const chainID = await this._viemClient.getChainId()
    this._chainID = chainID
    return chainID
  }

  getTransactionCount = async (address: Address): Promise<number> => {
    const result = await this._viemClient.request({
      method: 'eth_getTransactionCount',
      params: [address as `0x${string}`, 'pending'],
    })
    return hexToNumber(result)!
  }

  gasPrice = async (feeCurrency?: Address): Promise<string> => {
    const parameter = feeCurrency ? [feeCurrency] : []
    const result = await this._viemClient.request({
      method: 'eth_gasPrice',
      params: parameter as any,
    })
    return (result as string).toString()
  }

  getMaxPriorityFeePerGas = async (feeCurrency?: Address): Promise<string> => {
    const parameter = feeCurrency ? [feeCurrency] : []
    const result = await this._viemClient.request({
      method: 'eth_maxPriorityFeePerGas',
      params: parameter as any,
    })
    return result as string
  }

  getBlockNumber = async (): Promise<number> => {
    const result = await this._viemClient.request({ method: 'eth_blockNumber', params: [] as any })
    return hexToNumber(result as string)!
  }

  private isBlockNumberHash = (blockNumber: BlockNumber) =>
    typeof blockNumber === 'string' && blockNumber.indexOf('0x') === 0

  getBlock = async (blockHashOrBlockNumber: BlockNumber, fullTxObjects = true): Promise<Block> => {
    const endpoint = this.isBlockNumberHash(blockHashOrBlockNumber)
      ? 'eth_getBlockByHash'
      : 'eth_getBlockByNumber'

    const result = await this._viemClient.request({
      method: endpoint as any,
      params: [inputBlockNumberFormatter(blockHashOrBlockNumber), fullTxObjects] as any,
    })

    return outputBlockFormatter(result)
  }

  getBalance = async (address: Address, defaultBlock?: BlockNumber): Promise<string> => {
    const result = await this._viemClient.request({
      method: 'eth_getBalance',
      params: [
        inputAddressFormatter(address) as `0x${string}`,
        inputDefaultBlockNumberFormatter(defaultBlock) as any,
      ],
    })
    return outputBigNumberFormatter(result)
  }

  getTransaction = async (transactionHash: string): Promise<CeloTxPending> => {
    const result = await this._viemClient.request({
      method: 'eth_getTransactionByHash',
      params: [ensureLeading0x(transactionHash) as `0x${string}`],
    })
    return outputCeloTxFormatter(result)
  }

  getTransactionReceipt = async (txhash: string): Promise<CeloTxReceipt | null> => {
    const result = await this._viemClient.request({
      method: 'eth_getTransactionReceipt',
      params: [ensureLeading0x(txhash) as `0x${string}`],
    })

    if (result === null) {
      return null
    }

    return outputCeloTxReceiptFormatter(result)
  }

  waitForTransactionReceipt = async (
    txhash: string,
    timeoutMs = 120000,
    intervalMs = 500
  ): Promise<CeloTxReceipt> => {
    const start = Date.now()
    while (Date.now() - start < timeoutMs) {
      const receipt = await this.getTransactionReceipt(txhash)
      if (receipt !== null) {
        return receipt
      }
      await new Promise((resolve) => setTimeout(resolve, intervalMs))
    }
    throw new Error(`Timed out waiting for transaction receipt: ${txhash}`)
  }

  private fillTxDefaults(tx?: CeloTx): CeloTx {
    const defaultTx: CeloTx = {
      from: this.config.from,
      feeCurrency: this.config.feeCurrency,
    }

    return {
      ...defaultTx,
      ...tx,
    }
  }

  getStorageAt = async (address: Address, position: number | string): Promise<string> => {
    const pos = typeof position === 'number' ? toHex(position) : position
    const result = await this._viemClient.request({
      method: 'eth_getStorageAt',
      params: [inputAddressFormatter(address) as `0x${string}`, pos as `0x${string}`, 'latest'],
    })
    return result as string
  }

  /**
   * Create a viem-native contract instance bound to this connection.
   * Returns a viem GetContractReturnType with type-safe .read, .simulate, .estimateGas namespaces.
   * @param abi - The ABI of the contract
   * @param address - The deployed contract address
   */
  getCeloContract<TAbi extends readonly unknown[] = readonly unknown[]>(
    abi: TAbi | AbiItem[],
    address: string
  ): CeloContract<TAbi> {
    // Enrich ABI items with function/event signatures for backward compatibility
    const enrichedAbi = (abi as AbiItem[]).map((item: AbiItem) => {
      if (item.type === 'function' && !('signature' in item)) {
        const sig = `${item.name}(${(item.inputs || []).map((i: AbiInput) => i.type).join(',')})`
        return { ...item, signature: toFunctionHash(sig).slice(0, 10) }
      }
      if (item.type === 'event' && !('signature' in item)) {
        const sig = `${item.name}(${(item.inputs || []).map((i: AbiInput) => i.type).join(',')})`
        return { ...item, signature: toEventHash(sig) }
      }
      return item
    })
    return createCeloContract(
      enrichedAbi as unknown as TAbi,
      address as `0x${string}`,
      this._viemClient,
      this.walletClient,
      () => this.config.from,
      () => this._viemClient.getChainId()
    )
  }

  stop() {
    assertIsCeloProvider(this._provider)
    this._provider.stop()
  }
}

const addBufferToBaseFee = (gasPrice: bigint) => (gasPrice * BigInt(120)) / BigInt(100)
