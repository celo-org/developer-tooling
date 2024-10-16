import { StrongAddress } from '@celo/base'
import { Command, Flags } from '@oclif/core'
import { CLIError } from '@oclif/core/lib/errors'
import chalk from 'chalk'
import { FeeCurrencyInformation } from './packages-to-be/fee-currency'
import { failWith } from './utils/cli'
import { CustomFlags } from './utils/command'
import { getNodeUrl } from './utils/config'

export abstract class CeloCommand extends Command {
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
    gasCurrency: CustomFlags.gasCurrency({
      description:
        'Use a specific gas currency for transaction fees (defaults to CELO if no gas currency is supplied). It must be a whitelisted token.',
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

  // Indicates if celocli running in L2 context
  private cel2: boolean | null = null

  // TODO a getter?
  protected feeCurrencyAddress: StrongAddress | null = null

  protected abstract checkIfSynced(): Promise<boolean>

  protected abstract getSupportedFeeCurrencyAddresses(): Promise<StrongAddress[]>

  protected abstract getFeeCurrencyInformation(
    addresses: StrongAddress[]
  ): Promise<FeeCurrencyInformation[]>

  protected abstract checkIfL2(): Promise<boolean>

  protected async getNodeUrl(): Promise<string> {
    const res = await this.parse()

    return (res.flags && res.flags.node) || getNodeUrl(this.config.configDir)
  }

  async init() {
    if (this.requireSynced) {
      if (!(await this.checkIfSynced())) {
        failWith('Node is not currently synced. Run node:synced to check its status.')
      }
    }

    const res = await this.parse()

    if (res.flags.globalHelp) {
      console.log(chalk.red.bold('GLOBAL OPTIONS'))
      Object.entries(CeloCommand.flags).forEach(([name, flag]) => {
        console.log(chalk.black(`  --${name}`).padEnd(40) + chalk.gray(`${flag.description}`))
      })
      process.exit(0)
    }

    const gasCurrencyFlag = res.flags.gasCurrency as StrongAddress | undefined

    if (gasCurrencyFlag) {
      const validFeeCurrencies = await this.getSupportedFeeCurrencyAddresses()

      if (
        validFeeCurrencies.map((x) => x.toLocaleLowerCase()).includes(gasCurrencyFlag.toLowerCase())
      ) {
        this.feeCurrencyAddress = gasCurrencyFlag
      } else {
        const pairs = (
          await this.getFeeCurrencyInformation(validFeeCurrencies as StrongAddress[])
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

  async finally(arg: Error | undefined): Promise<any> {
    if (arg) {
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

    return super.finally(arg)
  }

  protected async isCel2(): Promise<boolean> {
    if (this.cel2 === null) {
      this.cel2 = await this.checkIfL2()
    }

    return !!this.cel2
  }
}
