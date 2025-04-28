import { ensureLeading0x, StrongAddress } from '@celo/base'
import { ReadOnlyWallet } from '@celo/connect'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { ledgerToWalletClient } from '@celo/viem-account-ledger'
import { AzureHSMWallet } from '@celo/wallet-hsm-azure'
import { AddressValidation, newLedgerWalletWithSetup } from '@celo/wallet-ledger'
import { LocalWallet } from '@celo/wallet-local'
import _TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import { Command, Flags } from '@oclif/core'
import { CLIError } from '@oclif/core/lib/errors'
import { FlagInput } from '@oclif/core/lib/interfaces/parser'
import chalk from 'chalk'
import net from 'net'
import { createPublicClient, createWalletClient, extractChain, http, Transport } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { celo, celoAlfajores } from 'viem/chains'
import { ipc } from 'viem/node'
import Web3 from 'web3'
import { celoBaklava } from './packages-to-be/chains'
import { CeloClient, WalletCeloClient } from './packages-to-be/client'
import { CustomFlags } from './utils/command'
import { getDefaultDerivationPath, getNodeUrl } from './utils/config'
import { getFeeCurrencyContractWrapper } from './utils/fee-currency'
import { requireNodeIsSynced } from './utils/helpers'
import { reportUsageStatisticsIfTelemetryEnabled } from './utils/telemetry'

export abstract class BaseCommand extends Command {
  static flags: FlagInput = {
    privateKey: Flags.string({
      char: 'k',
      description: 'Use a private key to sign local transactions with',
      hidden: false,
      exclusive: ['useLedger', 'useAKV'],
    }),
    node: Flags.string({
      char: 'n',
      summary: 'URL of the node to run commands against or an alias',
      description: `Can be a full url like https://forno.celo.org or an alias. default: http://localhost:8545 
      Alias options:
      local, localhost => 'http://localhost:8545'
      alfajores => Celo Alfajores Testnet, 
      mainnet, celo, forno => Celo Mainnet chain',
      `,
      hidden: false,
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
          case 'celo':
          case 'forno':
            return 'https://forno.celo.org'
          default:
            return nodeUrl
        }
      },
    }),
    gasCurrency: CustomFlags.gasCurrency({
      description:
        'Use a specific gas currency for transaction fees (defaults to CELO if no gas currency is supplied). It must be a whitelisted token.',
    }),
    useLedger: Flags.boolean({
      default: false,
      hidden: false,
      exclusive: ['privateKey'],
      description: 'Set it to use a ledger wallet',
    }),
    ledgerAddresses: Flags.integer({
      dependsOn: ['useLedger'],
      default: 1,
      hidden: false,
      exclusive: ['ledgerCustomAddresses'],
      description: 'If --useLedger is set, this will get the first N addresses for local signing',
    }),
    ledgerLiveMode: Flags.boolean({
      dependsOn: ['useLedger'],
      default: false,
      description:
        'When set, the 4th postion of the derivation path will be iterated over instead of the 5th. This is useful to use same address on you Ledger with celocli as you do on Ledger Live',
    }),
    ledgerCustomAddresses: Flags.string({
      dependsOn: ['useLedger'],
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
      dependsOn: ['useLedger'],
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

  // NOTE: this is false by default to prevent breaking changes
  // but eventually should be true by default
  // this flag indicates that the WalletClient won't submit txs, it's escpially
  // useful for the LedgerWalletClient which sometimes needs user input on reads
  public isReadOnlyWallet = false

  private _web3: Web3 | null = null
  private _kit: ContractKit | null = null

  private publicClient: CeloClient | null = null
  private walletClient: WalletCeloClient | null = null

  private ledgerTransport: Awaited<ReturnType<(typeof _TransportNodeHid)['open']>> | null = null

  async getWeb3() {
    if (!this._web3) {
      this._web3 = await this.newWeb3()
    }
    return this._web3
  }

  get _wallet(): ReadOnlyWallet | undefined {
    return this._wallet
  }

  set _wallet(wallet: ReadOnlyWallet | undefined) {
    this._kit!.connection.wallet = wallet
  }

  protected async getNodeUrl(): Promise<string> {
    const res = await this.parse()

    return (res.flags && res.flags.node) || getNodeUrl(this.config.configDir)
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

  private async getTransport(): Promise<Transport> {
    const nodeUrl = await this.getNodeUrl()
    return nodeUrl && nodeUrl.endsWith('.ipc') ? ipc(nodeUrl) : http(nodeUrl)
  }

  private async openLedgerTransport() {
    if (!this.ledgerTransport) {
      // types seem to be suggesting 2 defaults but js is otherwise for TransportNodeHid
      const TransportNodeHid: typeof _TransportNodeHid =
        // @ts-expect-error
        _TransportNodeHid.default || _TransportNodeHid
      this.ledgerTransport = await TransportNodeHid.open('')
    }
    return this.ledgerTransport!
  }

  // TODO(viem): This shouldn't be public, but for the time being to be called
  // from CheckBuilder to allow smooth transitions it is public.
  public async getPublicClient(): Promise<CeloClient> {
    if (!this.publicClient) {
      const nodeUrl = await this.getNodeUrl()
      const transport = await this.getTransport()

      // Create an intermediate client to get the chain id
      const intermediateClient = createPublicClient({
        transport,
      })
      const chainId = await intermediateClient.getChainId()
      const extractedChain = extractChain({
        chains: [celo, celoAlfajores, celoBaklava],
        id: chainId as typeof celo.id | typeof celoAlfajores.id | typeof celoBaklava.id,
      })

      if (extractedChain) {
        this.publicClient = createPublicClient({
          transport,
          chain: extractedChain,
        })
      } else {
        // we might be connecting to a dev chain or anvil fork or another testnet
        this.publicClient = createPublicClient({
          transport,
          chain: {
            name: 'Custom Chain',
            id: chainId,
            nativeCurrency: celo.nativeCurrency,
            formatters: celo.formatters,
            serializers: celo.serializers,
            rpcUrls: {
              default: { http: [nodeUrl] },
            },
          },
        }) as any as CeloClient
      }
    }

    return this.publicClient
  }

  public async getWalletClient(): Promise<WalletCeloClient | null> {
    if (!this.walletClient) {
      const [transport, publicClient, res] = await Promise.all([
        this.getTransport(),
        this.getPublicClient(),
        this.parse(),
      ])

      if (res.flags.useLedger) {
        try {
          const isLedgerLiveMode = res.flags.ledgerLiveMode
          const indicesToIterateOver: number[] = res.raw.some(
            (value: any) => value.flag === 'ledgerCustomAddresses'
          )
            ? JSON.parse(res.flags.ledgerCustomAddresses)
            : Array.from(Array(res.flags.ledgerAddresses).keys())

          console.log('Retrieving derivation Paths', indicesToIterateOver)
          let ledgerConfirmation = AddressValidation.never
          if (res.flags.ledgerConfirmAddress) {
            if (this.isReadOnlyWallet) {
              ledgerConfirmation = AddressValidation.initializationOnly
            } else {
              ledgerConfirmation = AddressValidation.everyTransaction
            }
          }

          this.walletClient = await ledgerToWalletClient({
            transport: await this.openLedgerTransport(),
            baseDerivationPath: getDefaultDerivationPath(this.config.configDir),
            derivationPathIndexes: isLedgerLiveMode ? [0] : indicesToIterateOver,
            changeIndexes: isLedgerLiveMode ? indicesToIterateOver : [0],
            ledgerAddressValidation: ledgerConfirmation,
            walletClientOptions: {
              transport,
              chain: publicClient.chain,
            },
          })
        } catch (err) {
          console.log('Check if the ledger is connected and logged.')
          throw err
        }
      } else if (res.flags.useAKV) {
        // NOTE: Fallback to web3
        this.walletClient = null
      } else if (res.flags.privateKey) {
        this.walletClient = createWalletClient({
          transport,
          chain: publicClient.chain,
          account: privateKeyToAccount(ensureLeading0x(res.flags.privateKey)),
        })
      } else {
        this.walletClient = createWalletClient({
          transport,
          chain: publicClient.chain,
        })
      }
    }

    return this.walletClient
  }

  async init() {
    if (this.requireSynced) {
      await requireNodeIsSynced(await this.getPublicClient())
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
        const isLedgerLiveMode = res.flags.ledgerLiveMode
        const indicesToIterateOver: number[] = res.raw.some(
          (value) => (value as any).flag === 'ledgerCustomAddresses'
        )
          ? JSON.parse(res.flags.ledgerCustomAddresses)
          : Array.from(Array(res.flags.ledgerAddresses).keys())

        console.log('Retrieving derivation Paths', indicesToIterateOver)
        let ledgerConfirmation = AddressValidation.never
        if (res.flags.ledgerConfirmAddress) {
          if (this.isReadOnlyWallet) {
            ledgerConfirmation = AddressValidation.initializationOnly
          } else {
            ledgerConfirmation = AddressValidation.everyTransaction
          }
        }
        this._wallet = await newLedgerWalletWithSetup(await this.openLedgerTransport(), {
          baseDerivationPath: getDefaultDerivationPath(this.config.configDir),
          derivationPathIndexes: isLedgerLiveMode ? [0] : indicesToIterateOver,
          changeIndexes: isLedgerLiveMode ? indicesToIterateOver : [0],
          ledgerAddressValidation: ledgerConfirmation,
        })
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

    const gasCurrencyFlag = res.flags.gasCurrency as StrongAddress | undefined

    if (gasCurrencyFlag) {
      const feeCurrencyContract = await getFeeCurrencyContractWrapper(kit)
      const validFeeCurrencies = await feeCurrencyContract.getAddresses()

      if (
        validFeeCurrencies.map((x) => x.toLocaleLowerCase()).includes(gasCurrencyFlag.toLowerCase())
      ) {
        kit.setFeeCurrency(gasCurrencyFlag)
      } else {
        const pairs = (
          await feeCurrencyContract.getFeeCurrencyInformation(validFeeCurrencies as StrongAddress[])
        ).map(
          ({ name, symbol, address, adaptedToken }) =>
            `${address} - ${name || 'unknown name'} (${symbol || 'N/A'})${
              adaptedToken ? ` (adapted token: ${adaptedToken})` : ''
            }`
        )

        throw new Error(
          `${gasCurrencyFlag} is not a valid fee currency. Available currencies:\n${pairs.join(
            '\n'
          )}`
        )
      }
    }
  }

  // We want to not display any additional output when the user has specified
  // --output flag explicitly
  private async shouldHideExtraOutput(arg: Error | undefined): Promise<boolean> {
    // This check is needed because we depend on this.parse() and it might throw
    // if there's a flag validation error (which is an absolutely valid error)
    // and so we need to make sure that the error is of a different kind or
    // there's no error at all
    if (!arg || !(arg instanceof CLIError)) {
      const { flags } = await this.parse()

      return flags.hasOwnProperty('output')
    }

    return false
  }

  async finally(arg: Error | undefined): Promise<any> {
    const hideExtraOutput = await this.shouldHideExtraOutput(arg)

    try {
      await reportUsageStatisticsIfTelemetryEnabled(
        this.config.configDir,
        !arg,
        hideExtraOutput,
        this.id
      )

      // don't display the error if the user has specified --output flag
      if (arg && !hideExtraOutput) {
        if (!(arg instanceof CLIError)) {
          console.error(
            `
Received an error during command execution, if you believe this is a bug you can create an issue here: 
            
https://github.com/celo-org/developer-tooling/issues/new?assignees=&labels=bug+report&projects=&template=BUG-FORM.yml

`,
            arg
          )
        }
      }

      if (this._kit !== null) {
        this._kit.connection.stop()
      }
    } catch (error) {
      this.log(`Failed to close the connection: ${error}`)
    }

    return super.finally(arg)
  }
}
