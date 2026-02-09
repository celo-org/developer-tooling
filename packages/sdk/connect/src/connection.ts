// tslint:disable: ordered-imports
import { StrongAddress } from '@celo/base'
import { ensureLeading0x, toChecksumAddress } from '@celo/utils/lib/address'
import { EIP712TypedData, generateTypedDataHash } from '@celo/utils/lib/sign-typed-data-utils'
import { Signature, parseSignatureWithoutPrefix } from '@celo/utils/lib/signatureUtils'
import { bufferToHex } from '@ethereumjs/util'
import debugFactory from 'debug'
import { soliditySha3 as soliditySha3Fn } from '@celo/utils/lib/solidity'
import { isValidAddress } from '@celo/utils/lib/address'
import {
  keccak256,
  hexToString,
  numberToHex as viemNumberToHex,
  parseEther,
  formatEther,
} from 'viem'
import { AbiCoder } from './abi-types'
import { CeloProvider, assertIsCeloProvider } from './celo-provider'
import {
  Address,
  Block,
  BlockHeader,
  BlockNumber,
  CeloTx,
  CeloTxObject,
  CeloTxPending,
  CeloTxReceipt,
  Contract,
  EventLog,
  PastEventOptions,
  PromiEvent,
  Provider,
  Syncing,
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
  outputBlockHeaderFormatter,
  outputCeloTxFormatter,
  outputCeloTxReceiptFormatter,
} from './utils/formatter'
import { hasProperty } from './utils/provider-utils'
import { HttpRpcCaller, RpcCaller, getRandomId } from './utils/rpc-caller'
import { TxParamsNormalizer } from './utils/tx-params-normalizer'
import { TransactionResult, toTxResult } from './utils/tx-result'
import { ReadOnlyWallet } from './wallet'

const debugGasEstimation = debugFactory('connection:gas-estimation')

export interface ConnectionOptions {
  gasInflationFactor: number
  feeCurrency?: StrongAddress
  from?: StrongAddress
}

/** The web3 compatibility shim returned by {@link Connection.web3} */
export interface Web3 {
  eth: {
    Contract: new (abi: readonly any[] | any[], address?: string) => Contract
    net: { isListening: () => Promise<boolean> }
    getBalance: (address: string) => Promise<string>
    getStorageAt: (address: string, position: number | string) => Promise<string>
    sign: (data: string, address: string) => Promise<string>
    getAccounts: () => Promise<string[]>
    getTransactionReceipt: (hash: string) => Promise<CeloTxReceipt | null>
    getBlockNumber: () => Promise<number>
    getBlock: (blockNumber: BlockNumber, fullTxObjects?: boolean) => Promise<Block>
    getPastLogs: (options: {
      topics?: (string | null)[]
      fromBlock?: string | number
      toBlock?: string | number
      address?: string
    }) => Promise<any[]>
    call: (tx: any) => Promise<string>
    sendTransaction: (tx: any) => PromiEvent<any>
    abi: AbiCoder
    getChainId: () => Promise<number>
    isSyncing: () => Promise<boolean | Syncing>
    handleRevert: boolean
    transactionPollingInterval: number
    defaultAccount: string | null
  }
  utils: {
    soliditySha3: (...args: any[]) => string | null
    sha3: (...args: any[]) => string | null
    keccak256: (value: string) => string
    toBN: (value: any) => bigint
    toWei: (value: string, unit?: string) => string
    fromWei: (value: string, unit?: string) => string
    isAddress: (address: string) => boolean
    toChecksumAddress: (address: string) => string
    numberToHex: (value: number | string | bigint) => string
    hexToNumber: (hex: string) => number
    toHex: (value: any) => string
    hexToAscii: (hex: string) => string
    randomHex: (size: number) => string
    _jsonInterfaceMethodToString: (abiItem: any) => string
  }
  currentProvider: Provider
  setProvider: (provider: any) => void
}

/**
 * Connection is a Class for connecting to Celo, sending Transactions, etc
 * @param provider a JSON-RPC provider
 * @param wallet a child class of {@link WalletBase}
 */
export class Connection {
  private config: ConnectionOptions
  private _chainID: number | undefined
  readonly paramsPopulator: TxParamsNormalizer
  rpcCaller!: RpcCaller
  private _provider!: Provider
  private _originalWeb3: any
  private _settingProvider = false

  constructor(
    providerOrWeb3: Provider | any,
    public wallet?: ReadOnlyWallet,
    handleRevert = true
  ) {
    // handleRevert param kept for API compat but no longer used (was web3-specific)
    void handleRevert

    this.config = {
      gasInflationFactor: 1.3,
    }

    // Accept both a Provider and a Web3-like object (which has currentProvider)
    let provider: Provider
    if (providerOrWeb3 != null && providerOrWeb3.currentProvider != null) {
      this._originalWeb3 = providerOrWeb3
      provider = providerOrWeb3.currentProvider as Provider
    } else {
      provider = providerOrWeb3 as Provider
    }
    this.setProvider(provider)
    this.paramsPopulator = new TxParamsNormalizer(this)
  }

  /** Get the current provider */
  get currentProvider(): Provider {
    return this._provider
  }

  setProvider(provider: Provider) {
    if (!provider) {
      throw new Error('Must have a valid Provider')
    }
    this._chainID = undefined
    try {
      if (!(provider instanceof CeloProvider)) {
        this.rpcCaller = new HttpRpcCaller(provider)
        provider = new CeloProvider(provider, this)
      } else {
        // Use the underlying raw provider for rpcCaller to avoid recursion
        // (CeloProvider.send -> handleAccounts -> Connection.getAccounts -> rpcCaller.call -> CeloProvider.send)
        this.rpcCaller = new HttpRpcCaller(provider.existingProvider)
      }
      this._provider = provider
      // Update original web3 object's provider so web3.currentProvider reflects CeloProvider
      if (
        this._originalWeb3 &&
        typeof this._originalWeb3.setProvider === 'function' &&
        !this._settingProvider
      ) {
        this._settingProvider = true
        try {
          this._originalWeb3.setProvider(provider)
        } finally {
          this._settingProvider = false
        }
      }
      return true
    } catch (error) {
      console.error(`could not attach provider`, error)
      return false
    }
  }

  keccak256 = (value: string): string => {
    return keccak256(value as `0x${string}`)
  }

  hexToAscii = (hex: string) => {
    return hexToString(hex as `0x${string}`)
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
    const nodeAccountsResp = await this.rpcCaller.call('eth_accounts', [])
    return this.toChecksumAddresses(nodeAccountsResp.result ?? []) as StrongAddress[]
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

  async isListening(): Promise<boolean> {
    const response = await this.rpcCaller.call('net_listening', [])
    return response.result as boolean
  }

  isSyncing(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.rpcCaller
        .call('eth_syncing', [])
        .then((response) => {
          const result = response.result as boolean | Syncing
          if (typeof result === 'boolean') {
            resolve(result)
          } else {
            resolve(true)
          }
        })
        .catch(reject)
    })
  }

  /**
   * Send a transaction to celo-blockchain.
   *
   * Similar to `web3.eth.sendTransaction()` but with following differences:
   *  - applies connections tx's defaults
   *  - estimatesGas before sending
   *  - returns a `TransactionResult` instead of `PromiEvent`
   */
  sendTransaction = async (tx: CeloTx): Promise<TransactionResult> => {
    tx = this.fillTxDefaults(tx)

    let gas = tx.gas
    if (gas == null) {
      gas = await this.estimateGasWithInflationFactor(tx)
    }

    return this.sendTransactionViaProvider({
      ...tx,
      gas,
    })
  }

  private sendTransactionViaProvider(tx: CeloTx): TransactionResult {
    return toTxResult(
      new Promise<string>((resolve, reject) => {
        ;(this._provider as Provider).send(
          {
            id: getRandomId(),
            jsonrpc: '2.0',
            method: 'eth_sendTransaction',
            params: [tx],
          },
          (error, resp) => {
            if (error) {
              reject(error)
            } else if (resp?.error) {
              reject(new Error(resp.error.message))
            } else if (resp) {
              resolve(resp.result as string)
            } else {
              reject(new Error('empty-response'))
            }
          }
        )
      }),
      (txHash) => this.getTransactionReceipt(txHash)
    )
  }

  sendTransactionObject = async (
    txObj: CeloTxObject<any>,
    tx?: Omit<CeloTx, 'data'>
  ): Promise<TransactionResult> => {
    tx = this.fillTxDefaults(tx)

    let gas = tx.gas
    if (gas == null) {
      const gasEstimator = (_tx: CeloTx) => txObj.estimateGas({ ..._tx })
      const getCallTx = (_tx: CeloTx) => {
        return { ..._tx, data: txObj.encodeABI(), to: txObj._parent._address }
      }
      const caller = async (_tx: CeloTx) => {
        const response = await this.rpcCaller.call('eth_call', [getCallTx(_tx), 'latest'])
        return response.result as string
      }
      gas = await this.estimateGasWithInflationFactor(tx, gasEstimator, caller)
    }

    return toTxResult(
      txObj.send({
        ...tx,
        gas,
      })
    )
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

    // Uses the Provider and not the RpcCaller, because this method should be intercepted
    // by the CeloProvider if there is a local wallet that could sign it. The RpcCaller
    // would just forward it to the node
    const signature = await new Promise<string>((resolve, reject) => {
      const method = version ? `eth_signTypedData_v${version}` : 'eth_signTypedData'
      ;(this._provider as Provider).send(
        {
          id: getRandomId(),
          jsonrpc: '2.0',
          method,
          params: [
            inputAddressFormatter(signer),
            shouldStringify ? JSON.stringify(typedData) : typedData,
          ],
        },
        (error, resp) => {
          if (error) {
            reject(error)
          } else if (resp) {
            resolve(resp.result as string)
          } else {
            reject(new Error('empty-response'))
          }
        }
      )
    })

    const messageHash = bufferToHex(generateTypedDataHash(typedData))
    return parseSignatureWithoutPrefix(messageHash, signature, signer)
  }

  sign = async (dataToSign: string, address: Address | number): Promise<string> => {
    // Uses the Provider and not the RpcCaller, because this method should be intercepted
    // by the CeloProvider if there is a local wallet that could sign it. The RpcCaller
    // would just forward it to the node
    const signature = await new Promise<string>((resolve, reject) => {
      ;(this._provider as Provider).send(
        {
          id: getRandomId(),
          jsonrpc: '2.0',
          method: 'eth_sign',
          params: [inputAddressFormatter(address.toString()), inputSignFormatter(dataToSign)],
        },
        (error, resp) => {
          if (error) {
            reject(error)
          } else if (resp) {
            resolve(resp.result as string)
          } else {
            reject(new Error('empty-response'))
          }
        }
      )
    })

    return signature
  }

  sendSignedTransaction = async (signedTransactionData: string): Promise<TransactionResult> => {
    return toTxResult(
      new Promise<string>((resolve, reject) => {
        ;(this._provider as Provider).send(
          {
            id: getRandomId(),
            jsonrpc: '2.0',
            method: 'eth_sendRawTransaction',
            params: [signedTransactionData],
          },
          (error, resp) => {
            if (error) {
              reject(error)
            } else if (resp?.error) {
              reject(new Error(resp.error.message))
            } else if (resp) {
              resolve(resp.result as string)
            } else {
              reject(new Error('empty-response'))
            }
          }
        )
      })
    )
  }
  // if neither gas price nor feeMarket fields are present set them.
  setFeeMarketGas = async (tx: CeloTx): Promise<CeloTx> => {
    if (isEmpty(tx.maxPriorityFeePerGas)) {
      tx.maxPriorityFeePerGas = await this.getMaxPriorityFeePerGas(tx.feeCurrency)
    }

    if (isEmpty(tx.maxFeePerGas)) {
      const baseFee = isEmpty(tx.feeCurrency)
        ? await this.getBlock('latest').then((block) => block.baseFeePerGas)
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

  estimateGas = async (
    tx: CeloTx,
    gasEstimator?: (tx: CeloTx) => Promise<number>,
    caller?: (tx: CeloTx) => Promise<string>
  ): Promise<number> => {
    const defaultGasEstimator = async (txToEstimate: CeloTx) => {
      const response = await this.rpcCaller.call('eth_estimateGas', [txToEstimate])
      return parseInt(response.result, 16)
    }
    const defaultCaller = async (txToCall: CeloTx) => {
      const response = await this.rpcCaller.call('eth_call', [
        { data: txToCall.data, to: txToCall.to, from: txToCall.from },
        'latest',
      ])
      return response.result as string
    }
    const estimate = gasEstimator ?? defaultGasEstimator
    const call = caller ?? defaultCaller

    try {
      const gas = await estimate({ ...tx })
      debugGasEstimation('estimatedGas: %s', gas.toString())
      return gas
    } catch (e) {
      const called = await call({ data: tx.data, to: tx.to, from: tx.from })
      let revertReason = 'Could not decode transaction failure reason'
      if (called.startsWith('0x08c379a')) {
        revertReason = decodeStringParameter(this.getAbiCoder(), called.substring(10))
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

  getAbiCoder(): AbiCoder {
    return viemAbiCoder
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
    } catch (e: any) {
      throw new Error(e)
    }
  }

  // An instance of Connection will only change chain id if provider is changed.
  chainId = async (): Promise<number> => {
    if (this._chainID) {
      return this._chainID
    }
    // Reference: https://eth.wiki/json-rpc/API#net_version
    const response = await this.rpcCaller.call('net_version', [])
    const chainID = parseInt(response.result.toString(), 10)
    this._chainID = chainID
    return chainID
  }

  getTransactionCount = async (address: Address): Promise<number> => {
    // Reference: https://eth.wiki/json-rpc/API#eth_gettransactioncount
    const response = await this.rpcCaller.call('eth_getTransactionCount', [address, 'pending'])

    return hexToNumber(response.result)!
  }

  nonce = async (address: Address): Promise<number> => {
    return this.getTransactionCount(address)
  }

  coinbase = async (): Promise<string> => {
    // Reference: https://eth.wiki/json-rpc/API#eth_coinbase
    const response = await this.rpcCaller.call('eth_coinbase', [])
    return response.result.toString()
  }

  gasPrice = async (feeCurrency?: Address): Promise<string> => {
    // Required otherwise is not backward compatible
    const parameter = feeCurrency ? [feeCurrency] : []
    // Reference: https://eth.wiki/json-rpc/API#eth_gasprice
    const response = await this.rpcCaller.call('eth_gasPrice', parameter)
    const gasPriceInHex = response.result.toString()
    return gasPriceInHex
  }

  getMaxPriorityFeePerGas = async (feeCurrency?: Address): Promise<string> => {
    const parameter = feeCurrency ? [feeCurrency] : []
    return this.rpcCaller.call('eth_maxPriorityFeePerGas', parameter).then((rpcResponse) => {
      return rpcResponse.result
    })
  }

  getBlockNumber = async (): Promise<number> => {
    const response = await this.rpcCaller.call('eth_blockNumber', [])

    return hexToNumber(response.result)!
  }

  private isBlockNumberHash = (blockNumber: BlockNumber) =>
    typeof blockNumber === 'string' && blockNumber.indexOf('0x') === 0

  getBlock = async (blockHashOrBlockNumber: BlockNumber, fullTxObjects = true): Promise<Block> => {
    const endpoint = this.isBlockNumberHash(blockHashOrBlockNumber)
      ? 'eth_getBlockByHash' // Reference: https://eth.wiki/json-rpc/API#eth_getBlockByHash
      : 'eth_getBlockByNumber' // Reference: https://eth.wiki/json-rpc/API#eth_getBlockByNumber

    const response = await this.rpcCaller.call(endpoint, [
      inputBlockNumberFormatter(blockHashOrBlockNumber),
      fullTxObjects,
    ])

    return outputBlockFormatter(response.result)
  }

  getBlockHeader = async (blockHashOrBlockNumber: BlockNumber): Promise<BlockHeader> => {
    const endpoint = this.isBlockNumberHash(blockHashOrBlockNumber)
      ? 'eth_getHeaderByHash'
      : 'eth_getHeaderByNumber'

    const response = await this.rpcCaller.call(endpoint, [
      inputBlockNumberFormatter(blockHashOrBlockNumber),
    ])

    return outputBlockHeaderFormatter(response.result)
  }

  getBalance = async (address: Address, defaultBlock?: BlockNumber): Promise<string> => {
    // Reference: https://eth.wiki/json-rpc/API#eth_getBalance
    const response = await this.rpcCaller.call('eth_getBalance', [
      inputAddressFormatter(address),
      inputDefaultBlockNumberFormatter(defaultBlock),
    ])
    return outputBigNumberFormatter(response.result)
  }

  getTransaction = async (transactionHash: string): Promise<CeloTxPending> => {
    // Reference: https://eth.wiki/json-rpc/API#eth_getTransactionByHash
    const response = await this.rpcCaller.call('eth_getTransactionByHash', [
      ensureLeading0x(transactionHash),
    ])
    return outputCeloTxFormatter(response.result)
  }

  getTransactionReceipt = async (txhash: string): Promise<CeloTxReceipt | null> => {
    // Reference: https://eth.wiki/json-rpc/API#eth_getTransactionReceipt
    const response = await this.rpcCaller.call('eth_getTransactionReceipt', [
      ensureLeading0x(txhash),
    ])

    if (response.result === null) {
      return null
    }

    return outputCeloTxReceiptFormatter(response.result)
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
    const pos = typeof position === 'number' ? '0x' + position.toString(16) : position
    const response = await this.rpcCaller.call('eth_getStorageAt', [
      inputAddressFormatter(address),
      pos,
      'latest',
    ])
    return response.result as string
  }

  private _web3Shim: Web3 | undefined

  /**
   * Returns a web3-compatible shim object.
   * Provides web3.eth.Contract, web3.eth.getBalance, web3.utils, etc.
   */
  get web3(): Web3 {
    if (!this._web3Shim) {
      this._web3Shim = createWeb3Shim(this)
    }
    return this._web3Shim
  }

  stop() {
    assertIsCeloProvider(this._provider)
    this._provider.stop()
  }
}

const addBufferToBaseFee = (gasPrice: bigint) => (gasPrice * BigInt(120)) / BigInt(100)

function isEmpty(value: string | undefined | number | bigint): value is undefined {
  return (
    value === 0 ||
    value === undefined ||
    value === null ||
    value === '0' ||
    value === BigInt(0) ||
    (typeof value === 'string' && (value.toLowerCase() === '0x' || value.toLowerCase() === '0x0'))
  )
}
export function isPresent(
  value: string | undefined | number | bigint
): value is string | number | bigint {
  return !isEmpty(value)
}

// Viem-based ABI coder implementation that matches the AbiCoder interface
import {
  decodeAbiParameters,
  encodeAbiParameters,
  encodeFunctionData,
  type AbiParameter,
  toEventHash,
  toFunctionHash,
  decodeEventLog,
} from 'viem'

// Web3's ABI coder returned bigint values as strings. Convert to match.
function bigintToString(value: any): any {
  if (typeof value === 'bigint') {
    return value.toString()
  }
  if (Array.isArray(value)) {
    return value.map(bigintToString)
  }
  return value
}

export const viemAbiCoder: AbiCoder = {
  decodeLog(inputs: any[], hexString: string, topics: string[]): any {
    const eventInputs = inputs.map((input: any) => ({
      ...input,
      indexed: input.indexed ?? false,
    }))
    const abi = [{ type: 'event' as const, name: 'Event', inputs: eventInputs }]
    // Web3 convention: topics passed WITHOUT event signature hash (topics[0] stripped).
    // Viem's decodeEventLog expects topics[0] to be the event signature. Prepend it.
    const sig = `Event(${eventInputs.map((i: any) => i.type).join(',')})`
    const eventSigHash = toEventHash(sig)
    const fullTopics = [eventSigHash, ...topics] as [`0x${string}`, ...`0x${string}`[]]
    try {
      const decoded = decodeEventLog({
        abi,
        data: hexString as `0x${string}`,
        topics: fullTopics,
      })
      // Convert bigint values to strings to match web3 behavior
      const args = (decoded as any).args
      if (args && typeof args === 'object') {
        for (const key of Object.keys(args)) {
          args[key] = bigintToString(args[key])
        }
      }
      return args
    } catch {
      return {}
    }
  },
  encodeParameter(type: string, parameter: any): string {
    return encodeAbiParameters([{ type } as AbiParameter], [parameter])
  },
  encodeParameters(types: string[], parameters: any[]): string {
    const abiParams = types.map((type) => ({ type }) as AbiParameter)
    return encodeAbiParameters(abiParams, parameters)
  },
  encodeEventSignature(name: string | object): string {
    if (typeof name === 'string') {
      return toEventHash(name)
    }
    const abiItem = name as any
    const sig = `${abiItem.name}(${(abiItem.inputs || []).map((i: any) => i.type).join(',')})`
    return toEventHash(sig)
  },
  encodeFunctionCall(jsonInterface: object, parameters: any[]): string {
    return encodeFunctionData({
      abi: [jsonInterface as any],
      args: parameters,
    })
  },
  encodeFunctionSignature(name: string | object): string {
    if (typeof name === 'string') {
      return toFunctionHash(name).slice(0, 10)
    }
    const abiItem = name as any
    const sig = `${abiItem.name}(${(abiItem.inputs || []).map((i: any) => i.type).join(',')})`
    return toFunctionHash(sig).slice(0, 10)
  },
  decodeParameter(type: string, hex: string): any {
    const hexPrefixed = hex.startsWith('0x') ? hex : `0x${hex}`
    const result = decodeAbiParameters([{ type } as AbiParameter], hexPrefixed as `0x${string}`)
    return bigintToString(result[0])
  },
  decodeParameters(types: any[], hex: string): any {
    const abiParams = types.map((type: any) =>
      typeof type === 'string' ? ({ type } as AbiParameter) : type
    )
    // Ensure 0x prefix (web3 accepted both, viem requires it)
    const hexPrefixed = hex.startsWith('0x') ? hex : `0x${hex}`
    const result = decodeAbiParameters(abiParams, hexPrefixed as `0x${string}`)
    const output: any = {}
    output.__length__ = result.length
    for (let i = 0; i < result.length; i++) {
      const val = bigintToString(result[i])
      output[i] = val
      if (abiParams[i].name) {
        output[abiParams[i].name!] = val
      }
    }
    return output
  },
}

// Web3 compatibility shim

function createWeb3ContractConstructor(connection: Connection) {
  return class Web3CompatContract implements Contract {
    options: { address: string; jsonInterface: any[] }
    _address: string
    events: { [key: string]: any } = {}

    constructor(abi: readonly any[] | any[], address?: string) {
      this._address = address || ''
      // Compute signature for function/event ABI items (web3 did this automatically)
      const enrichedAbi = abi.map((item: any) => {
        if (item.type === 'function' && !item.signature) {
          const sig = `${item.name}(${(item.inputs || []).map((i: any) => i.type).join(',')})`
          return { ...item, signature: toFunctionHash(sig).slice(0, 10) }
        }
        if (item.type === 'event' && !item.signature) {
          const sig = `${item.name}(${(item.inputs || []).map((i: any) => i.type).join(',')})`
          return { ...item, signature: toEventHash(sig) }
        }
        return item
      })
      this.options = { address: this._address, jsonInterface: enrichedAbi }
      // Build events map from ABI
      for (const item of enrichedAbi) {
        if (item.type === 'event') {
          this.events[item.name] = item
        }
      }
    }

    get methods() {
      const contract = this
      const abi = this.options.jsonInterface
      return new Proxy(
        {},
        {
          get(_target, prop: string) {
            const methodAbi = abi.find(
              (item: any) => item.type === 'function' && item.name === prop
            )
            if (!methodAbi) {
              return (..._args: any[]) => ({
                call: async () => {
                  throw new Error(`Method ${prop} not found in ABI`)
                },
                send: () => {
                  throw new Error(`Method ${prop} not found in ABI`)
                },
                estimateGas: async () => 0,
                encodeABI: () => '0x',
                _parent: contract,
              })
            }
            return (...args: any[]) => ({
              call: async (txParams?: CeloTx) => {
                const data = encodeFunctionData({
                  abi: [methodAbi],
                  args,
                })
                const callParams = {
                  to: contract._address,
                  data,
                  from: txParams?.from,
                }
                const response = await connection.rpcCaller.call('eth_call', [callParams, 'latest'])
                const result = response.result as string
                if (
                  !result ||
                  result === '0x' ||
                  !methodAbi.outputs ||
                  methodAbi.outputs.length === 0
                ) {
                  return result
                }
                const decoded = viemAbiCoder.decodeParameters(methodAbi.outputs, result)
                return methodAbi.outputs.length === 1 ? decoded[0] : decoded
              },
              send: (txParams?: CeloTx) => {
                const data = encodeFunctionData({
                  abi: [methodAbi],
                  args,
                })
                const sendTx = {
                  ...txParams,
                  to: contract._address,
                  data,
                }
                return createPromiEvent(connection, sendTx, abi)
              },
              estimateGas: async (txParams?: CeloTx) => {
                const data = encodeFunctionData({
                  abi: [methodAbi],
                  args,
                })
                return connection.estimateGas({
                  ...txParams,
                  to: contract._address,
                  data,
                })
              },
              encodeABI: () => {
                return encodeFunctionData({
                  abi: [methodAbi],
                  args,
                })
              },
              _parent: contract,
            })
          },
        }
      )
    }

    deploy(params: { data: string; arguments?: any[] }): CeloTxObject<any> {
      const constructorAbi = this.options.jsonInterface.find(
        (item: any) => item.type === 'constructor'
      )
      let data = params.data
      if (constructorAbi && params.arguments && params.arguments.length > 0) {
        const types = constructorAbi.inputs.map((i: any) => i.type)
        const encodedArgs = viemAbiCoder.encodeParameters(types, params.arguments).slice(2)
        data = data + encodedArgs
      }
      const contract = this
      return {
        call: async () => data,
        send: (txParams?: CeloTx) => {
          const pe = createPromiEvent(connection, { ...txParams, data }, this.options.jsonInterface)
          // web3's deploy().send() resolves to the deployed Contract instance,
          // not the receipt. Wrap the result to match that behavior.
          const jsonInterface = this.options.jsonInterface
          const ContractClass = this.constructor as new (abi: any[], address?: string) => Contract
          const wrappedPromise = pe.then((receipt: any) => {
            const deployed = new ContractClass(jsonInterface, receipt.contractAddress)
            return deployed
          })
          ;(wrappedPromise as any).on = pe.on
          ;(wrappedPromise as any).once = pe.once
          return wrappedPromise as any
        },
        estimateGas: async (txParams?: CeloTx) => {
          return connection.estimateGas({ ...txParams, data })
        },
        encodeABI: () => data,
        _parent: contract,
        arguments: params.arguments || [],
      } as any
    }

    async getPastEvents(event: string, options: PastEventOptions): Promise<EventLog[]> {
      const eventAbi = this.options.jsonInterface.find(
        (item: any) => item.type === 'event' && item.name === event
      )
      if (!eventAbi) return []

      const eventSig = viemAbiCoder.encodeEventSignature(eventAbi)
      const topics: (string | null)[] = [eventSig]

      const params: any = {
        address: this._address,
        topics,
        fromBlock:
          options.fromBlock != null ? inputBlockNumberFormatter(options.fromBlock) : undefined,
        toBlock: options.toBlock != null ? inputBlockNumberFormatter(options.toBlock) : undefined,
      }

      const response = await connection.rpcCaller.call('eth_getLogs', [params])
      const logs = response.result as any[]
      return logs.map((log: any) => {
        let returnValues: any = {}
        try {
          returnValues = viemAbiCoder.decodeLog(eventAbi.inputs, log.data, log.topics.slice(1))
        } catch {}
        return {
          event: eventAbi.name,
          address: log.address,
          returnValues,
          logIndex: parseInt(log.logIndex, 16),
          transactionIndex: parseInt(log.transactionIndex, 16),
          transactionHash: log.transactionHash,
          blockHash: log.blockHash,
          blockNumber: parseInt(log.blockNumber, 16),
          raw: { data: log.data, topics: log.topics },
        }
      })
    }
  }
}

function createPromiEvent(connection: Connection, sendTx: any, abi?: any[]): PromiEvent<any> {
  type Listener = (...args: any[]) => void
  const listeners: Record<string, Listener[]> = {}

  const promise = new Promise<any>(async (resolve, reject) => {
    try {
      const hash = await new Promise<string>((res, rej) => {
        ;(connection.currentProvider as Provider).send(
          {
            id: getRandomId(),
            jsonrpc: '2.0',
            method: 'eth_sendTransaction',
            params: [sendTx],
          },
          (error, resp) => {
            if (error) rej(error)
            else if (resp?.error) rej(new Error(resp.error.message))
            else if (resp) res(resp.result as string)
            else rej(new Error('empty-response'))
          }
        )
      })
      ;(listeners['transactionHash'] || []).forEach((fn) => fn(hash))

      let receipt = await pollForReceiptHelper(hash, (h) => connection.getTransactionReceipt(h))
      if (abi && abi.length > 0) {
        receipt = decodeReceiptEvents(receipt, abi, viemAbiCoder)
      }
      ;(listeners['receipt'] || []).forEach((fn) => fn(receipt))

      resolve(receipt)
    } catch (err) {
      ;(listeners['error'] || []).forEach((fn) => fn(err, false))
      reject(err)
    }
  })

  const pe = promise as PromiEvent<any>
  pe.on = (event: string, fn: Listener) => {
    ;(listeners[event] = listeners[event] || []).push(fn)
    return pe
  }
  pe.once = pe.on

  return pe
}

async function pollForReceiptHelper(
  txHash: string,
  fetchReceipt: (hash: string) => Promise<CeloTxReceipt | null>
): Promise<CeloTxReceipt> {
  const POLL_INTERVAL = 100
  const MAX_ATTEMPTS = 600
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const receipt = await fetchReceipt(txHash)
    if (receipt) {
      return receipt
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL))
  }
  throw new Error(`Transaction receipt not found after ${MAX_ATTEMPTS} attempts: ${txHash}`)
}

function decodeReceiptEvents(receipt: CeloTxReceipt, abi: any[], coder: AbiCoder): CeloTxReceipt {
  if (!receipt.logs || !Array.isArray(receipt.logs)) return receipt
  const eventAbis = abi.filter((entry: any) => entry.type === 'event')
  if (eventAbis.length === 0) return receipt

  const events: { [eventName: string]: EventLog } = {}
  for (const log of receipt.logs) {
    if (!log.topics || log.topics.length === 0) continue
    const topicHash = log.topics[0]
    for (const eventAbi of eventAbis) {
      const signature = coder.encodeEventSignature(eventAbi)
      if (signature === topicHash) {
        let returnValues: any = {}
        try {
          returnValues = coder.decodeLog(eventAbi.inputs, log.data, log.topics.slice(1))
        } catch {}
        events[eventAbi.name] = {
          event: eventAbi.name,
          address: log.address,
          returnValues,
          logIndex: log.logIndex,
          transactionIndex: log.transactionIndex,
          transactionHash: log.transactionHash,
          blockHash: log.blockHash,
          blockNumber: log.blockNumber,
          raw: { data: log.data, topics: log.topics },
        }
        break
      }
    }
  }
  if (Object.keys(events).length > 0) {
    receipt.events = events
  }
  return receipt
}

function createWeb3Shim(connection: Connection): Web3 {
  const ContractConstructor = createWeb3ContractConstructor(connection)
  const shim = {
    eth: {
      Contract: ContractConstructor,
      net: {
        isListening: () => connection.isListening(),
      },
      getBalance: (address: string) => connection.getBalance(address),
      getStorageAt: (address: string, position: number | string) =>
        connection.getStorageAt(address, position),
      sign: (data: string, address: string) => connection.sign(data, address),
      getAccounts: () => connection.getAccounts(),
      getTransactionReceipt: (hash: string) => connection.getTransactionReceipt(hash),
      getBlockNumber: () => connection.getBlockNumber(),
      getBlock: (blockNumber: BlockNumber, fullTxObjects?: boolean) =>
        connection.getBlock(blockNumber, fullTxObjects ?? false),
      getPastLogs: async (options: {
        topics?: (string | null)[]
        fromBlock?: string | number
        toBlock?: string | number
        address?: string
      }) => {
        const params: any = { ...options }
        if (params.fromBlock != null) params.fromBlock = inputBlockNumberFormatter(params.fromBlock)
        if (params.toBlock != null) params.toBlock = inputBlockNumberFormatter(params.toBlock)
        const response = await connection.rpcCaller.call('eth_getLogs', [params])
        const logs = response.result as any[]
        // web3 returned checksummed addresses; raw RPC returns lowercase
        return logs.map((log: any) => ({
          ...log,
          address: log.address ? toChecksumAddress(log.address) : log.address,
        }))
      },
      call: async (tx: any) => {
        const response = await connection.rpcCaller.call('eth_call', [tx, 'latest'])
        return response.result as string
      },
      sendTransaction: (tx: any) => {
        return createPromiEvent(connection, tx)
      },
      abi: viemAbiCoder,
      getChainId: () => connection.chainId(),
      isSyncing: () => connection.isSyncing(),
      handleRevert: false,
      transactionPollingInterval: 100,
      defaultAccount: null as string | null,
      accounts: {
        create: () => {
          const crypto = require('crypto')
          const privateKey = '0x' + crypto.randomBytes(32).toString('hex')
          const { privateKeyToAddress } = require('@celo/utils/lib/address')
          const address = privateKeyToAddress(privateKey)
          return { address, privateKey }
        },
      },
    },
    utils: {
      soliditySha3: soliditySha3Fn,
      sha3: soliditySha3Fn,
      keccak256: (value: string) => keccak256(value as `0x${string}`),
      toBN: (value: any) => BigInt(value),
      toWei: (value: string, unit?: string) => {
        if (!unit || unit === 'ether') return parseEther(value).toString()
        return value
      },
      fromWei: (value: string, unit?: string) => {
        if (!unit || unit === 'ether') return formatEther(BigInt(value))
        return value
      },
      isAddress: (address: string) => isValidAddress(address),
      toChecksumAddress: (address: string) => toChecksumAddress(address),
      numberToHex: (value: number | string | bigint) => viemNumberToHex(BigInt(value)),
      hexToNumber: (hex: string) => Number(BigInt(hex)),
      toHex: (value: any) => {
        if (typeof value === 'number' || typeof value === 'bigint') {
          return viemNumberToHex(BigInt(value))
        }
        return ensureLeading0x(value.toString())
      },
      hexToAscii: (hex: string) => hexToString(hex as `0x${string}`),
      randomHex: (size: number) => {
        const bytes = new Uint8Array(size)
        for (let i = 0; i < size; i++) {
          bytes[i] = Math.floor(Math.random() * 256)
        }
        return ensureLeading0x(
          Array.from(bytes)
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('')
        )
      },
      _jsonInterfaceMethodToString: (abiItem: any) => {
        if (abiItem.name) {
          return `${abiItem.name}(${(abiItem.inputs || []).map((i: any) => i.type).join(',')})`
        }
        return ''
      },
    },
    get currentProvider() {
      return connection.currentProvider
    },
    setProvider: (provider: any) => connection.setProvider(provider),
  }
  return shim
}
