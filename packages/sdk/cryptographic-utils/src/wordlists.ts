import { MnemonicLanguages } from '@celo/base/lib/account'

import { wordlist as english } from '@scure/bip39/wordlists/english'
import { wordlist as french } from '@scure/bip39/wordlists/french'
import { wordlist as italian } from '@scure/bip39/wordlists/italian'
import { wordlist as japanese } from '@scure/bip39/wordlists/japanese'
import { wordlist as korean } from '@scure/bip39/wordlists/korean'
import { wordlist as portuguese } from '@scure/bip39/wordlists/portuguese'
import { wordlist as chinese_simplified } from '@scure/bip39/wordlists/simplified-chinese'
import { wordlist as spanish } from '@scure/bip39/wordlists/spanish'
import { wordlist as chinese_traditional } from '@scure/bip39/wordlists/traditional-chinese'

const wordlists: Record<MnemonicLanguages, string[]> = {
  [MnemonicLanguages.english]: english,
  [MnemonicLanguages.french]: french,
  [MnemonicLanguages.italian]: italian,
  [MnemonicLanguages.japanese]: japanese,
  [MnemonicLanguages.korean]: korean,
  [MnemonicLanguages.portuguese]: portuguese,
  [MnemonicLanguages.chinese_simplified]: chinese_simplified,
  [MnemonicLanguages.spanish]: spanish,
  [MnemonicLanguages.chinese_traditional]: chinese_traditional,
} as const

export default wordlists
