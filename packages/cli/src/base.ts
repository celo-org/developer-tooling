import { type PublicCeloClient, type WalletCeloClient } from '@celo/actions'
import { celoBaklava } from '@celo/actions/chains'
import {
  CELO_DERIVATION_PATH_BASE,
  ensureLeading0x,
  ETHEREUM_DERIVATION_PATH,
  StrongAddress,
} from '@celo/base'
import { ReadOnlyWallet } from '@celo/connect'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { ledgerToWalletClient } from '@celo/viem-account-ledger'
import { AzureHSMWallet } from '@celo/wallet-hsm-azure'
import { AddressValidation, newLedgerWalletWithSetup } from '@celo/wallet-ledger'
import { LocalWallet } from '@celo/wallet-local'
import _TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import { Command, Flags, ux } from '@oclif/core'
import { CLIError } from '@oclif/core/lib/errors'
import { ArgOutput, FlagOutput, Input, ParserOutput } from '@oclif/core/lib/interfaces/parser'
import chalk from 'chalk'
import net from 'net'
import {
  createPublicClient,
  createWalletClient,
  extractChain,
  http,
  MethodNotFoundRpcError,
  Transport,
  webSocket,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { celo, celoAlfajores, celoSepolia } from 'viem/chains'
import { ipc } from 'viem/node'
import Web3 from 'web3'
import createRpcWalletClient from './packages-to-be/rpc-client'
import { failWith } from './utils/cli'
import { CustomFlags } from './utils/command'
import { configExists, getDefaultDerivationPath, getNodeUrl } from './utils/config'
import { getFeeCurrencyContractWrapper } from './utils/fee-currency'
import { requireNodeIsSynced } from './utils/helpers'
import { reportUsageStatisticsIfTelemetryEnabled } from './utils/telemetry'

export abstract class BaseCommand extends Command {
  static flags = {
    privateKey: Flags.string({
      char: 'k',
      description: 'Use a private key to sign local transactions with',
      hidden: false,
      exclusive: ['useLedger', 'useAKV'],
    }),
    node: Flags.string({
      char: 'n',
      aliases: ['rpc-url', 'rpc'],
      summary: 'URL of the node to run commands against or an alias',
      description: `Can be a full url like https://forno.celo.org or an alias. default: http://localhost:8545 
      Alias options:
      local, localhost => 'http://localhost:8545'
      alfajores => Celo Alfajores Testnet,
      testnet, celo-sepolia => Celo Sepolia Testnet, 
      mainnet, celo, forno => Celo Mainnet chain',
      `,
      hidden: false,
      parse: async (nodeUrl: string) => {
        switch (nodeUrl) {
          case 'alfajores':
            return celoAlfajores.rpcUrls.default.http[0]
          case 'baklava':
            return 'https://baklava-forno.celo-testnet.org'
          case 'celo':
          case 'forno':
          case 'mainnet':
            return celo.rpcUrls.default.http[0]
          case 'celo-sepolia':
          case 'cs':
          case 'testnet':
            return celoSepolia.rpcUrls.default.http[0]
          case 'local':
          case 'localhost':
            return 'http://localhost:8545'
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
      hidden: true,
      exclusive: ['privateKey', 'useLedger'],
      deprecated: true,
      description: 'Set it to use an Azure KeyVault HSM',
    }),
    azureVaultName: Flags.string({
      dependsOn: ['useAKV'],
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
  } as const
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
  public isOnlyReadingWallet = false

  private _web3: Web3 | null = null
  private _kit: ContractKit | null = null

  private publicClient: PublicCeloClient | null = null
  private walletClient: WalletCeloClient | null = null
  private _parseResult: null | ParserOutput<FlagOutput, FlagOutput> = null
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
    if (nodeUrl?.endsWith('.ipc')) {
      return ipc(nodeUrl)
    } else if (nodeUrl?.startsWith('http')) {
      return http(nodeUrl)
    } else if (nodeUrl?.startsWith('ws')) {
      return webSocket(nodeUrl)
    } else {
      console.error(`Invalid node URL: ${nodeUrl}`)
      throw new Error(
        "Invalid ---node. It should start with 'http', 'ws', end with '.ipc' or be a known alias"
      )
    }
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
  public async getPublicClient(): Promise<PublicCeloClient> {
    if (!this.publicClient) {
      const nodeUrl = await this.getNodeUrl()
      ux.action.start(`Connecting to Node ${nodeUrl}`)
      const transport = await this.getTransport()

      // Create an intermediate client to get the chain id
      const intermediateClient = createPublicClient({
        transport,
      })
      const chainId = await intermediateClient.getChainId()
      const extractedChain = extractChain({
        chains: [celo, celoAlfajores, celoSepolia, celoBaklava],
        id: chainId as
          | typeof celo.id
          | typeof celoAlfajores.id
          | typeof celoSepolia.id
          | typeof celoBaklava.id,
      })

      if (extractedChain) {
        this.publicClient = createPublicClient({
          transport,
          batch: { multicall: true },
          chain: extractedChain,
        })
      } else {
        // we might be connecting to a dev chain or anvil fork or another testnet
        this.publicClient = createPublicClient({
          transport,
          chain: {
            name: 'Custom Celo Chain',
            id: chainId,
            nativeCurrency: celo.nativeCurrency,
            formatters: celo.formatters,
            serializers: celo.serializers,
            rpcUrls: {
              default: { http: [nodeUrl] },
            },
          } as unknown as PublicCeloClient['chain'],
        })
      }
      ux.action.stop()
    }

    return this.publicClient
  }

  public async getWalletClient(): Promise<WalletCeloClient> {
    if (!this.walletClient) {
      const [transport, publicClient, res] = await Promise.all([
        this.getTransport(),
        this.getPublicClient(),
        this.parse(),
      ])

      // NOTE: adjust logic here later to take in account commands which
      // don't use --from but --account or other flags to pass in which account
      // should be used
      const accountAddress = res.flags.from as StrongAddress

      if (res.flags.useLedger) {
        try {
          const ledgerOptions = await this.ledgerOptions()

          this.walletClient = await ledgerToWalletClient({
            ...ledgerOptions,
            account: accountAddress,
            walletClientOptions: {
              transport,
              chain: publicClient.chain,
            },
          })
        } catch (err) {
          const error = err as Error & { statusText?: string }
          if (error.statusText === 'LOCKED_DEVICE' || error.message.includes('NoDevice')) {
            console.warn(chalk.yellow('Unlocked your Ledger device and try again'))
            this.exit(0)
          }
          throw err
        }
      } else if (res.flags.useAKV) {
        failWith('--useAKV flag is no longer supported')
      } else if (res.flags.privateKey) {
        const accountFromPrivateKey = privateKeyToAccount(ensureLeading0x(res.flags.privateKey))
        if (accountAddress && accountAddress !== accountFromPrivateKey.address) {
          failWith(
            `The --from address ${accountAddress} does not match the address derived from the provided private key ${accountFromPrivateKey.address}.`
          )
        }
        this.walletClient = createWalletClient({
          transport,
          chain: publicClient.chain,
          account: accountFromPrivateKey,
        })
      } else {
        try {
          this.walletClient = await createRpcWalletClient({
            publicClient,
            transport,
            chain: publicClient.chain,
            account: accountAddress,
          })
        } catch (e) {
          let code: number | undefined
          try {
            const error = JSON.parse((e as any).details) as { code: number; message: string }
            code = error.code
          } catch (_) {
            // noop
          }

          if (code === MethodNotFoundRpcError.code) {
            failWith(
              'Unable to create an RPC Wallet Client, the node is not unlocked. Did you forget to use `--privateKey` or `--useLedger`?'
            )
          }

          throw e
        }
      }
    }

    return this.walletClient
  }

  protected async ledgerOptions() {
    const res = await this.parse(BaseCommand)
    const isLedgerLiveMode = res.flags.ledgerLiveMode
    const indicesToIterateOver: number[] = res.raw.some(
      (value: any) => value.flag === 'ledgerCustomAddresses'
    )
      ? JSON.parse(res.flags.ledgerCustomAddresses)
      : Array.from(new Array(res.flags.ledgerAddresses).keys())

    console.log('Retrieving derivation Paths', indicesToIterateOver)
    let ledgerConfirmation = AddressValidation.never
    if (res.flags.ledgerConfirmAddress) {
      if (this.isOnlyReadingWallet) {
        ledgerConfirmation = AddressValidation.initializationOnly
      } else {
        ledgerConfirmation = AddressValidation.everyTransaction
      }
    }

    const ledgerOptions = {
      transport: await this.openLedgerTransport(),
      baseDerivationPath: getDefaultDerivationPath(this.config.configDir),
      derivationPathIndexes: isLedgerLiveMode ? [0] : indicesToIterateOver,
      changeIndexes: isLedgerLiveMode ? indicesToIterateOver : [0],
      ledgerAddressValidation: ledgerConfirmation,
    }
    return ledgerOptions
  }

  async parse<F extends FlagOutput, B extends FlagOutput, A extends ArgOutput>(
    options?: Input<F, B, A>
  ): Promise<ParserOutput<F, B, A>> {
    if (!this._parseResult) {
      this._parseResult = await super.parse(options)
    }
    return this._parseResult
  }

  async init() {
    if (this.requireSynced) {
      await requireNodeIsSynced(await this.getPublicClient())
    }
    const kit = await this.getKit()
    const res = await this.parse(BaseCommand)

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
          : Array.from(new Array(res.flags.ledgerAddresses).keys())

        const baseDerivationPath = getDefaultDerivationPath(this.config.configDir)
        console.log('Retrieving derivation Paths', baseDerivationPath, indicesToIterateOver)
        if (await this.usingDefaultEthDerivationPath(baseDerivationPath)) {
          console.info(
            chalk.yellow(
              `Using ${ETHEREUM_DERIVATION_PATH}. This used to default to ${CELO_DERIVATION_PATH_BASE}. use config:set --derivationPath celoLegacy for the old behavior.`
            )
          )
        }
        let ledgerConfirmation = AddressValidation.never
        if (res.flags.ledgerConfirmAddress) {
          if (this.isOnlyReadingWallet) {
            ledgerConfirmation = AddressValidation.initializationOnly
          } else {
            ledgerConfirmation = AddressValidation.everyTransaction
          }
        }
        this._wallet = await newLedgerWalletWithSetup(await this.openLedgerTransport(), {
          baseDerivationPath: baseDerivationPath,
          derivationPathIndexes: isLedgerLiveMode ? [0] : indicesToIterateOver,
          changeIndexes: isLedgerLiveMode ? indicesToIterateOver : [0],
          ledgerAddressValidation: ledgerConfirmation,
        })
      } catch (err) {
        const error = err as Error & { statusText?: string }
        if (error.statusText === 'LOCKED_DEVICE') {
          console.warn('Unlocked your Ledger device and try again')
          this.exit(0)
        }
        throw err
      }
    } else if (res.flags.useAKV) {
      try {
        const akvWallet = new AzureHSMWallet(res.flags.azureVaultName as string)
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

  // since we switched from using CELO_DERIVATION_PATH_BASE to ETHEREUM_DERIVATION_PATH
  // we check if the derivation path they are using was explicitly set by the user (config exists) or just happens to be the used
  // because we changed defaults.
  // if a user ever used config:set even with --node then the config will exist but prior to 10.0.0 it will be set to CELO_DERIVATION_PATH_BASE
  protected async usingDefaultEthDerivationPath(baseDerivationPath: string) {
    return (
      baseDerivationPath === ETHEREUM_DERIVATION_PATH &&
      !(await configExists(this.config.configDir))
    )
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
