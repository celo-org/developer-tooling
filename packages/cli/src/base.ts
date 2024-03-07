import { StrongAddress } from '@celo/base'
import { ReadOnlyWallet } from '@celo/connect'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { AzureHSMWallet } from '@celo/wallet-hsm-azure'
import { AddressValidation, newLedgerWalletWithSetup } from '@celo/wallet-ledger'
import { LocalWallet } from '@celo/wallet-local'
import _TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import { Command, Flags } from '@oclif/core'
import chalk from 'chalk'
import net from 'net'
import Web3 from 'web3'
import { getNodeUrl } from './utils/config'
import { requireNodeIsSynced } from './utils/helpers'
/**
 *
 * I defined a `getGasOptions` function in `helpers.ts` that makes a contract call to fetch the
 * whitelisted address, but I need to consider that the list of gasOptions is different per
 * network (alfajores, mainnet, baklava), because:
 * 1. the fee currency addresses are different per network,
 * 2. the whitelist is different, alfajores has more addresses for internal testing purposes.
 *
 */
export abstract class BaseCommand extends Command {
  static flags = {
    privateKey: Flags.string({
      char: 'k',
      description: 'Use a private key to sign local transactions with',
      hidden: true,
    }),
    node: Flags.string({
      char: 'n',
      description: "URL of the node to run commands against (defaults to 'http://localhost:8545')",
      hidden: true,
      parse: async (nodeUrl: string) => {
        switch (nodeUrl) {
          case 'local':
          case 'localhost':
            return 'http://localhost:8545'
          case 'baklava':
            return 'https://baklava-forno.celo-testnet.org'
          case 'alfajores':
            return 'https://alfajores-forno.celo-testnet.org'
          case 'mainnet':
          case 'forno':
            return 'https://forno.celo.org'
          default:
            return nodeUrl
        }
      },
    }),
    gasCurrency: Flags.string({
      description:
        'Use a specific gas currency for transaction fees (defaults to CELO if no gas currency is supplied)',
      hidden: true,
    }),
    useLedger: Flags.boolean({
      default: false,
      hidden: true,
      description: 'Set it to use a ledger wallet',
    }),
    ledgerAddresses: Flags.integer({
      default: 1,
      hidden: true,
      exclusive: ['ledgerCustomAddresses'],
      description: 'If --useLedger is set, this will get the first N addresses for local signing',
    }),
    ledgerCustomAddresses: Flags.string({
      default: '[0]',
      hidden: true,
      exclusive: ['ledgerAddresses'],
      description:
        'If --useLedger is set, this will get the array of index addresses for local signing. Example --ledgerCustomAddresses "[4,99]"',
    }),
    useAKV: Flags.boolean({
      default: false,
      hidden: true,
      description: 'Set it to use an Azure KeyVault HSM',
    }),
    azureVaultName: Flags.string({
      hidden: true,
      description: 'If --useAKV is set, this is used to connect to the Azure KeyVault',
    }),
    ledgerConfirmAddress: Flags.boolean({
      default: false,
      hidden: true,
      description: 'Set it to ask confirmation for the address of the transaction from the ledger',
    }),
    globalHelp: Flags.boolean({
      default: false,
      hidden: false,
      description: 'View all available global flags',
    }),
  }
  // This specifies whether the node needs to be synced before the command
  // can be run. In most cases, this should be `true`, so that's the default.
  // For commands that don't require the node is synced, add the following line
  // to its definition:
  //   requireSynced = false
  public requireSynced = true

  private _web3: Web3 | null = null
  private _kit: ContractKit | null = null

  async getWeb3() {
    if (!this._web3) {
      const res = await this.parse()
      const nodeUrl = (res.flags && res.flags.node) || getNodeUrl(this.config.configDir)
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
    const res = await this.parse()
    const nodeUrl = (res.flags && res.flags.node) || getNodeUrl(this.config.configDir)
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
    if (this.requireSynced) {
      const web3 = await this.getWeb3()
      await requireNodeIsSynced(web3)
    }
    const kit = await this.getKit()
    const res = await this.parse()
    if (res.flags.globalHelp) {
      console.log(chalk.red.bold('GLOBAL OPTIONS'))
      Object.entries(BaseCommand.flags).forEach(([name, flag]) => {
        console.log(chalk.black(`  --${name}`).padEnd(40) + chalk.gray(`${flag.description}`))
      })
      process.exit(0)
    }

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
          ledgerConfirmation
        )
      } catch (err) {
        console.log('Check if the ledger is connected and logged.')
        throw err
      }
    } else if (res.flags.useAKV) {
      try {
        const akvWallet = new AzureHSMWallet(res.flags.azureVaultName)
        await akvWallet.init()
        console.log(`Found addresses: ${akvWallet.getAccounts()}`)
        this._wallet = akvWallet
      } catch (err) {
        console.log(`Failed to connect to AKV ${err}`)
        throw err
      }
    } else {
      this._wallet = new LocalWallet()
    }

    if (res.flags.from) {
      kit.defaultAccount = res.flags.from
    }

    const validFeeCurrencies = await kit.getFeeCurrencyWhitelist()
    const gasCurrencyFlag = res.flags.gasCurrency as StrongAddress
    if (gasCurrencyFlag) {
      if (validFeeCurrencies.includes(gasCurrencyFlag)) {
        kit.setFeeCurrency(gasCurrencyFlag)
      } else {
        throw new Error(`${gasCurrencyFlag} is not a valid fee currency`)
      }
    }
  }

  async finally(arg: Error | undefined): Promise<any> {
    try {
      const kit = await this.getKit()
      kit.connection.stop()
    } catch (error) {
      this.log(`Failed to close the connection: ${error}`)
    }

    return super.finally(arg)
  }
}
