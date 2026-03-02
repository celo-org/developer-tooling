import { StrongAddress } from '@celo/base'
import { Lock } from '@celo/base/lib/lock'
import debugFactory from 'debug'
import type { EIP1193RequestFn } from 'viem'
import { Connection } from './connection'
import { EncodedTransaction, Provider } from './types'
import { hasProperty, stopProvider } from './utils/provider-utils'

const debug = debugFactory('provider:connection')
const debugPayload = debugFactory('provider:payload')
const debugTxToSend = debugFactory('provider:tx-to-send')
const debugEncodedTx = debugFactory('provider:encoded-tx')
const debugResponse = debugFactory('provider:response')

export function assertIsCeloProvider(provider: any): asserts provider is CeloProvider {
  if (!(provider instanceof CeloProvider)) {
    throw new Error(
      'A different Provider was manually added to the kit. The kit should have a CeloProvider'
    )
  }
}

/*
 * CeloProvider wraps an EIP-1193 provider for use with Celo.
 * Intercepts signing methods and delegates to a local wallet when available.
 */
export class CeloProvider implements Provider {
  private alreadyStopped: boolean = false
  // Transaction nonce is calculated as the max of an account's nonce on-chain, and any pending transactions in a node's
  // transaction pool. As a result, once a nonce is used, the transaction must be sent to the node before the nonce can
  // be calculated for another transaction. In particular the sign and send operation must be completed atomically with
  // relation to other sign and send operations.
  private nonceLock: Lock = new Lock()

  constructor(
    readonly existingProvider: Provider,
    readonly connection: Connection
  ) {
    this.addProviderDelegatedFunctions()
  }

  isLocalAccount(address?: string): boolean {
    return this.connection.wallet != null && this.connection.wallet.hasAccount(address)
  }

  /**
   * EIP-1193 request method — the single entry point for all JSON-RPC calls.
   */
  request: EIP1193RequestFn = async ({ method, params }) => {
    const safeParams: any[] = Array.isArray(params) ? params : params != null ? [params] : []

    debugPayload('%O', { method, params: safeParams })

    if (this.alreadyStopped) {
      throw new Error('CeloProvider already stopped')
    }

    let result: any

    switch (method) {
      case 'eth_accounts': {
        result = await this.handleAccounts()
        break
      }
      case 'eth_sendTransaction': {
        this.checkAtLeastNParams(safeParams, 1)
        const txParams = safeParams[0]
        if (this.connection.isLocalAccount(txParams.from)) {
          result = await this.handleSendTransaction(txParams)
        } else {
          result = await this.existingProvider.request({ method, params: safeParams } as any)
        }
        break
      }
      case 'eth_signTransaction': {
        this.checkAtLeastNParams(safeParams, 1)
        const txParams = safeParams[0]
        if (this.connection.isLocalAccount(txParams.from)) {
          result = await this.handleSignTransaction(txParams)
        } else {
          result = await this.existingProvider.request({ method, params: safeParams } as any)
        }
        break
      }
      case 'eth_sign':
      case 'personal_sign': {
        this.checkAtLeastNParams(safeParams, 2)
        const address: StrongAddress = method === 'eth_sign' ? safeParams[0] : safeParams[1]
        if (this.connection.isLocalAccount(address)) {
          result = await this.handleSignPersonalMessage(method, safeParams)
        } else {
          result = await this.existingProvider.request({ method, params: safeParams } as any)
        }
        break
      }
      case 'eth_signTypedData':
      case 'eth_signTypedData_v1':
      case 'eth_signTypedData_v3':
      case 'eth_signTypedData_v4':
      case 'eth_signTypedData_v5': {
        this.checkAtLeastNParams(safeParams, 1)
        const address: StrongAddress = safeParams[0]
        if (this.connection.isLocalAccount(address)) {
          result = await this.handleSignTypedData(safeParams)
        } else {
          result = await this.existingProvider.request({ method, params: safeParams } as any)
        }
        break
      }
      default: {
        result = await this.existingProvider.request({ method, params: safeParams } as any)
        break
      }
    }

    debugResponse('%O', result)
    return result
  }

  stop() {
    if (this.alreadyStopped) {
      return
    }
    try {
      stopProvider(this.existingProvider)
      this.alreadyStopped = true
    } catch (error) {
      debug(`Failed to close the connection: ${error}`)
    }
  }

  private async handleAccounts(): Promise<string[]> {
    return this.connection.getAccounts()
  }

  private async handleSignTypedData(params: any[]): Promise<any> {
    const [address, typedData] = params
    return this.connection.wallet!.signTypedData(address, typedData)
  }

  private async handleSignPersonalMessage(method: string, params: any[]): Promise<any> {
    const address = method === 'eth_sign' ? params[0] : params[1]
    const data = method === 'eth_sign' ? params[1] : params[0]
    return this.connection.wallet!.signPersonalMessage(address, data)
  }

  private async handleSignTransaction(txParams: any): Promise<EncodedTransaction> {
    const filledParams = await this.connection.paramsPopulator.populate(txParams)
    debugTxToSend('%O', filledParams)
    const signedTx = await this.connection.wallet!.signTransaction(filledParams)
    debugEncodedTx('%O', signedTx)
    return signedTx
  }

  private async handleSendTransaction(txParams: any): Promise<any> {
    await this.nonceLock.acquire()
    try {
      const signedTx = await this.handleSignTransaction(txParams)
      return await this.connection.viemClient.request({
        method: 'eth_sendRawTransaction',
        params: [signedTx.raw as `0x${string}`],
      })
    } finally {
      this.nonceLock.release()
    }
  }

  private checkAtLeastNParams(params: any[], n: number) {
    if (!params || params.length < n) {
      throw new Error('Invalid params')
    }
  }

  // Functions required to act as a delegator for the existingProvider
  private addProviderDelegatedFunctions(): void {
    if (
      hasProperty<{ on: (type: string, callback: () => void) => void }>(this.existingProvider, 'on')
    ) {
      // @ts-ignore
      this.on = this.defaultOn
    }
    if (
      hasProperty<{ once: (type: string, callback: () => void) => void }>(
        this.existingProvider,
        'once'
      )
    ) {
      // @ts-ignore
      this.once = this.defaultOnce
    }
    if (
      hasProperty<{ removeListener: (type: string, callback: () => void) => void }>(
        this.existingProvider,
        'removeListener'
      )
    ) {
      // @ts-ignore
      this.removeListener = this.defaultRemoveListener
    }
    if (
      hasProperty<{ removeAllListener: (type: string, callback: () => void) => void }>(
        this.existingProvider,
        'removeAllListener'
      )
    ) {
      // @ts-ignore
      this.removeAllListener = this.defaultRemoveAllListeners
    }
    if (hasProperty<{ reset: () => void }>(this.existingProvider, 'reset')) {
      // @ts-ignore
      this.reset = this.defaultReset
    }
  }

  get connected() {
    return (this.existingProvider as any).connected
  }

  supportsSubscriptions() {
    return (this.existingProvider as any).supportsSubscriptions()
  }

  private defaultOn(type: string, callback: () => void): void {
    ;(this.existingProvider as any).on(type, callback)
  }

  private defaultOnce(type: string, callback: () => void): void {
    ;(this.existingProvider as any).once(type, callback)
  }

  private defaultRemoveListener(type: string, callback: () => void): void {
    ;(this.existingProvider as any).removeListener(type, callback)
  }

  private defaultRemoveAllListeners(type: string): void {
    ;(this.existingProvider as any).removeAllListeners(type)
  }

  private defaultReset(): void {
    ;(this.existingProvider as any).reset()
  }
}
