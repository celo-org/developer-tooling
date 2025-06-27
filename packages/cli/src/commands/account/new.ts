import {
  generateKeys,
  generateMnemonic,
  normalizeMnemonic,
  validateMnemonic,
} from '@celo/cryptographic-utils/lib/account'
import { Flags } from '@oclif/core'
import chalk from 'chalk'
import * as fs from 'fs-extra'
import { BaseCommand } from '../../base'
import { printValueMap } from '../../utils/cli'
import { ViewCommmandFlags } from '../../utils/flags'

import {
  DerivationPath,
  DerivationPathAliases,
  ETHEREUM_DERIVATION_PATH,
  MnemonicLanguages,
  MnemonicStrength,
} from '@celo/base'
import { CELO_BASE_DERIVATION_PATH } from '@celo/wallet-ledger'
import { getDefaultDerivationPath } from '../../utils/config'

export default class NewAccount extends BaseCommand {
  static description = `Creates a new account locally using the --derivationPath if passed or the one set with config:set (defaults to ${DerivationPathAliases.eth})  and print out the key information. Save this information for local transaction signing or import into a Celo node. Ledger: this command has been tested swapping mnemonics with the Ledger successfully (only supports english)`

  static flags = {
    ...ViewCommmandFlags,
    passphrasePath: Flags.string({
      description:
        'Path to a file that contains the BIP39 passphrase to combine with the mnemonic specified using the mnemonicPath flag and the index specified using the addressIndex flag. Every passphrase generates a different private key and wallet address.',
    }),
    changeIndex: Flags.integer({
      default: 0,
      description: 'Choose the change index for the derivation path',
    }),
    addressIndex: Flags.integer({
      default: 0,
      description: 'Choose the address index for the derivation path',
    }),
    language: Flags.string({
      options: [
        'chinese_simplified',
        'chinese_traditional',
        'english',
        'french',
        'italian',
        'japanese',
        'korean',
        'spanish',
      ],
      default: 'english',
      description:
        "Language for the mnemonic words. **WARNING**, some hardware wallets don't support other languages",
    }),
    mnemonicPath: Flags.string({
      description:
        'Instead of generating a new mnemonic (seed phrase), use the user-supplied mnemonic instead. Path to a file that contains all the mnemonic words separated by a space (example: "word1 word2 word3 ... word24"). If the words are a language other than English, the --language flag must be used. Only BIP39 mnemonics are supported',
    }),
    derivationPath: Flags.string({
      parse: async (input: string) => {
        return NewAccount.sanitizeDerivationPath(input)
      },
      summary: "Derivation path in the format \"m/44'/coin_type'/account'\" or an alias",
      description: `Choose a different derivation Path (default is ${DerivationPathAliases.eth}). Also aliased as "eth". Use "celoLegacy" as alias for old default: ${DerivationPathAliases.celoLegacy}. Recreating the same account requires knowledge of the mnemonic, passphrase (if any), and the derivation path. (use changeIndex, and addressIndex flags to change BIP44 positions 4 and 5)`,
    }),
  }

  static examples = [
    'new',
    'new --passphrasePath myFolder/my_passphrase_file',
    'new --language spanish',
    'new --passphrasePath some_folder/my_passphrase_file --language japanese --addressIndex 5',
    'new --passphrasePath some_folder/my_passphrase_file --mnemonicPath some_folder/my_mnemonic_file --addressIndex 5',
    'new --derivationPath eth',
    'new --derivationPath celoLegacy',
    `new --derivationPath "m/44'/60'/0'"`,
  ]

  async init() {
    // Dont call super class init because this command does not need to connect to a node
  }

  static languageOptions(language: string): MnemonicLanguages | undefined {
    if (language) {
      // @ts-expect-error
      const enumLanguage = MnemonicLanguages[language]
      return enumLanguage as MnemonicLanguages
    }
    return undefined
  }

  static sanitizeDerivationPath(derivationPath?: string): DerivationPath {
    if (derivationPath) {
      derivationPath = derivationPath.endsWith('/') ? derivationPath.slice(0, -1) : derivationPath
    }

    // if it is an alias then it will match the keys in DerivationPathAliases and be returned

    if (Object.keys(DerivationPathAliases).includes(derivationPath!)) {
      return DerivationPathAliases[derivationPath as keyof typeof DerivationPathAliases]
    }

    // if it is a valid BIP 44 it will be returned
    if (derivationPath && /^m\/44'\/\d+'\/\d+'(?:\/\d+)*$/.test(derivationPath)) {
      return derivationPath as DerivationPath
    }

    throw new Error(
      `Invalid derivationPath: ${derivationPath}. should be in format  "m / 44' / coin_type' / account'"`
    )
  }

  static readFile(file?: string): string | undefined {
    if (!file) {
      return undefined
    }
    if (fs.pathExistsSync(file)) {
      return fs
        .readFileSync(file)
        .toString()
        .replace(/(\r\n|\n|\r)/gm, '')
    }
    throw new Error(`Invalid path: ${file}`)
  }

  requireSynced = false

  async run() {
    const res = await this.parse(NewAccount)
    let mnemonic = NewAccount.readFile(res.flags.mnemonicPath)
    if (mnemonic) {
      mnemonic = normalizeMnemonic(mnemonic)
      if (!validateMnemonic(mnemonic)) {
        throw new Error('Invalid mnemonic. Should be a bip39 mnemonic')
      }
    } else {
      mnemonic = await generateMnemonic(
        MnemonicStrength.s256_24words,
        NewAccount.languageOptions(res.flags.language!)
      )
    }
    const derivationPath = NewAccount.sanitizeDerivationPath(
      res.flags.derivationPath ?? getDefaultDerivationPath(this.config.configDir)
    )
    const passphrase = NewAccount.readFile(res.flags.passphrasePath)
    const keys = await generateKeys(
      mnemonic,
      passphrase,
      res.flags.changeIndex,
      res.flags.addressIndex,
      undefined,
      derivationPath
    )

    if (
      res.flags.derivationPath === undefined &&
      (await this.usingDefaultEthDerivationPath(derivationPath))
    ) {
      this.log(
        chalk.magenta(
          `\nUsing eth path (${ETHEREUM_DERIVATION_PATH}) for derivation. This used to default to ${CELO_BASE_DERIVATION_PATH} but changed in version 10.0.0. use "config:set --derivationPath <path>" to set your preferred default\n`
        )
      )
    }
    const fullDerivationPath = `${derivationPath}/${res.flags.changeIndex}/${res.flags.addressIndex}`

    printValueMap({ mnemonic, derivationPath: fullDerivationPath, ...keys })

    this.log(
      chalk.green.bold(
        '\nThis is not being stored anywhere. Save the mnemonic somewhere to use this account at a later point.\n'
      )
    )
  }
}
