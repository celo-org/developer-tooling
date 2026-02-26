// tslint:disable: ordered-imports
import { StrongAddress } from '@celo/base'
import { ensureLeading0x, toChecksumAddress } from '@celo/utils/lib/address'
import { EIP712TypedData, generateTypedDataHash } from '@celo/utils/lib/sign-typed-data-utils'
import { Signature, parseSignatureWithoutPrefix } from '@celo/utils/lib/signatureUtils'
import { bufferToHex } from '@ethereumjs/util'
import debugFactory from 'debug'
import { keccak256, hexToString, toHex } from 'viem'
import { AbiCoder, AbiItem } from './abi-types'
import { isEmpty, viemAbiCoder } from './viem-abi-coder'
import { createContractConstructor } from './rpc-contract'
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

// Convenience re-export for consumers that import from @celo/connect
export { viemAbiCoder, isPresent, isEmpty } from './viem-abi-coder'

const debugGasEstimation = debugFactory('connection:gas-estimation')

export interface ConnectionOptions {
  gasInflationFactor: number
  feeCurrency?: StrongAddress
  from?: StrongAddress
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
  private _provider!: CeloProvider

  constructor(
    provider: Provider,
    public wallet?: ReadOnlyWallet,
    handleRevert = true
  ) {
    // handleRevert param kept for API compat but no longer used (was web3-specific)
    void handleRevert

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

  setProvider(provider: Provider) {
    if (!provider) {
      throw new Error('Must have a valid Provider')
    }
    this._chainID = undefined
    try {
      let celoProvider: CeloProvider
      if (!(provider instanceof CeloProvider)) {
        this.rpcCaller = new HttpRpcCaller(provider)
        celoProvider = new CeloProvider(provider, this)
      } else {
        // Use the underlying raw provider for rpcCaller to avoid recursion
        // (CeloProvider.send -> handleAccounts -> Connection.getAccounts -> rpcCaller.call -> CeloProvider.send)
        this.rpcCaller = new HttpRpcCaller(provider.existingProvider)
        celoProvider = provider
      }
      this._provider = celoProvider
      return true
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
    if (!gas) {
      const { gas: _omit, ...txWithoutGas } = tx
      gas = await this.estimateGasWithInflationFactor(txWithoutGas)
    }

    return this.sendTransactionViaProvider({
      ...tx,
      gas,
    })
  }

  private sendTransactionViaProvider(tx: CeloTx): TransactionResult {
    return toTxResult(
      new Promise<string>((resolve, reject) => {
        this._provider.send(
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
    if (!gas) {
      const { gas: _omit, ...txWithoutGas } = tx
      tx = txWithoutGas
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
      this._provider.send(
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
      this._provider.send(
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
        this._provider.send(
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

  private defaultGasEstimator = async (tx: CeloTx): Promise<number> => {
    const response = await this.rpcCaller.call('eth_estimateGas', [tx])
    return parseInt(response.result, 16)
  }

  private defaultCaller = async (tx: CeloTx): Promise<string> => {
    const response = await this.rpcCaller.call('eth_call', [
      { data: tx.data, to: tx.to, from: tx.from },
      'latest',
    ])
    return response.result as string
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
    } catch (e: unknown) {
      throw new Error(String(e))
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
    const pos = typeof position === 'number' ? toHex(position) : position
    const response = await this.rpcCaller.call('eth_getStorageAt', [
      inputAddressFormatter(address),
      pos,
      'latest',
    ])
    return response.result as string
  }

  /**
   * Create a contract instance bound to this connection.
   * Replaces the old `new web3.eth.Contract(abi, address)` pattern.
   * @param abi - The ABI of the contract
   * @param address - The deployed contract address
   */
  createContract(abi: readonly AbiItem[] | AbiItem[], address?: string): Contract {
    const ContractClass = createContractConstructor(this)
    return new ContractClass(abi, address)
  }

  stop() {
    assertIsCeloProvider(this._provider)
    this._provider.stop()
  }
}

const addBufferToBaseFee = (gasPrice: bigint) => (gasPrice * BigInt(120)) / BigInt(100)
