import { FeeCurrencyDirectory } from '@celo/abis-12/web3/FeeCurrencyDirectory'
import { FeeCurrencyWhitelist } from '@celo/abis/web3/FeeCurrencyWhitelist'
import { StrongAddress } from '@celo/base'
import { ReadOnlyWallet, isCel2 } from '@celo/connect'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import {
  AbstractFeeCurrencyWrapper,
  FeeCurrencyInformation,
} from '@celo/contractkit/lib/wrappers/AbstractFeeCurrencyWrapper'
import { AddressValidation, newLedgerWalletWithSetup } from '@celo/wallet-ledger'
import { LocalWallet } from '@celo/wallet-local'
import _TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import net from 'net'
import Web3 from 'web3'
import { CeloCommand } from './celo'
import { getFeeCurrencyContractWrapper } from './utils/fee-currency'
import { nodeIsSynced } from './utils/helpers'

// For the ease of migration BaseCommand is web3+CK
export abstract class BaseCommand extends CeloCommand {
  private _web3: Web3 | null = null
  private _kit: ContractKit | null = null
  private feeCurrencyContractWrapper: AbstractFeeCurrencyWrapper<
    FeeCurrencyWhitelist | FeeCurrencyDirectory
  > | null = null

  async getWeb3() {
    if (!this._web3) {
      const nodeUrl = await this.getNodeUrl()
      this._web3 =
        nodeUrl && nodeUrl.endsWith('.ipc')
          ? new Web3(new Web3.providers.IpcProvider(nodeUrl, net))
          : new Web3(nodeUrl)
    }
    return this._web3
  }

  get _wallet(): ReadOnlyWallet | undefined {
    return this._wallet
  }

  set _wallet(wallet: ReadOnlyWallet | undefined) {
    this._kit!.connection.wallet = wallet
  }

  async newWeb3() {
    const nodeUrl = await this.getNodeUrl()

    return nodeUrl && nodeUrl.endsWith('.ipc')
      ? new Web3(new Web3.providers.IpcProvider(nodeUrl, net))
      : new Web3(nodeUrl)
  }

  async getKit() {
    if (!this._kit) {
      this._kit = newKitFromWeb3(await this.getWeb3())
    }

    const res = await this.parse()
    if (res.flags && res.flags.privateKey && !res.flags.useLedger && !res.flags.useAKV) {
      this._kit.connection.addAccount(res.flags.privateKey)
    }

    return this._kit
  }

  async init() {
    super.init()

    const kit = await this.getKit()
    const res = await this.parse()

    if (res.flags.useLedger) {
      try {
        // types seem to be suggesting 2 defaults but js is otherwise for TransportNodeHid
        const TransportNodeHid: typeof _TransportNodeHid =
          // @ts-expect-error
          _TransportNodeHid.default || _TransportNodeHid
        const transport = await TransportNodeHid.open('')
        const derivationPathIndexes = res.raw.some(
          (value) => (value as any).flag === 'ledgerCustomAddresses'
        )
          ? JSON.parse(res.flags.ledgerCustomAddresses)
          : Array.from(Array(res.flags.ledgerAddresses).keys())

        console.log('Retrieving derivation Paths', derivationPathIndexes)
        let ledgerConfirmation = AddressValidation.never
        if (res.flags.ledgerConfirmAddress) {
          ledgerConfirmation = AddressValidation.everyTransaction
        }
        this._wallet = await newLedgerWalletWithSetup(
          transport,
          derivationPathIndexes,
          undefined,
          ledgerConfirmation,
          await this.isCel2()
        )
      } catch (err) {
        console.log('Check if the ledger is connected and logged.')
        throw err
      }
    } else {
      this._wallet = new LocalWallet()
    }

    if (res.flags.from) {
      kit.defaultAccount = res.flags.from
    }
  }

  async finally(arg?: Error): Promise<any> {
    try {
      if (this._kit !== null) {
        this._kit.connection.stop()
      }
    } catch (error) {
      this.log(`Failed to close the connection: ${error}`)
    }

    super.finally(arg)
  }

  protected async checkIfL2(): Promise<boolean> {
    return await isCel2(await this.getWeb3())
  }

  protected async getFeeCurrencyContractWrapper() {
    if (!this.feeCurrencyContractWrapper) {
      this.feeCurrencyContractWrapper = await getFeeCurrencyContractWrapper(
        await this.getKit(),
        await this.isCel2()
      )
    }

    return this.feeCurrencyContractWrapper
  }

  protected async getFeeCurrencyInformation(
    addresses: StrongAddress[]
  ): Promise<FeeCurrencyInformation[]> {
    const feeCurrencyContractWrapper = await this.getFeeCurrencyContractWrapper()

    return await feeCurrencyContractWrapper.getFeeCurrencyInformation(addresses)
  }

  protected async getSupportedFeeCurrencyAddresses(): Promise<StrongAddress[]> {
    const feeCurrencyContractWrapper = await this.getFeeCurrencyContractWrapper()

    return await feeCurrencyContractWrapper.getAddresses()
  }

  protected async checkIfSynced() {
    return await nodeIsSynced(await this.getWeb3())
  }
}
