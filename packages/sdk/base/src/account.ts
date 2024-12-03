export const CELO_DERIVATION_PATH_BASE = "m/44'/52752'/0'"

export const ETHEREUM_DERIVATION_PATH = "m/44'/60'/0'"

export enum DerivationPathAliases {
  eth = ETHEREUM_DERIVATION_PATH,
  celoLegacy = CELO_DERIVATION_PATH_BASE,
  // celoLedgerLive = "m/44'/52752'/",
}

export enum MnemonicStrength {
  s128_12words = 128,
  s256_24words = 256,
}

export enum MnemonicLanguages {
  chinese_simplified,
  chinese_traditional,
  english,
  french,
  italian,
  japanese,
  korean,
  spanish,
  portuguese,
}

export type RandomNumberGenerator = (
  size: number,
  callback: (err: Error | null, buf: Buffer) => void
) => void

export interface Bip39 {
  mnemonicToSeedSync: (mnemonic: string, password?: string) => Uint8Array
  mnemonicToSeed: (mnemonic: string, password?: string) => Promise<Uint8Array>
  generateMnemonic: (
    strength?: number,
    rng?: RandomNumberGenerator,
    wordlist?: string[]
  ) => Promise<string>
  validateMnemonic: (mnemonic: string, wordlist?: string[]) => boolean
}
