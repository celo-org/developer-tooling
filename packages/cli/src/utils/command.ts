import { StrongAddress } from '@celo/base'
import { URL_REGEX } from '@celo/base/lib/io'
import { CeloContract, RegisteredContracts } from '@celo/contractkit'
import { Interval } from '@celo/contractkit/lib/wrappers/DowntimeSlasher'
import { BLS_POP_SIZE, BLS_PUBLIC_KEY_SIZE } from '@celo/cryptographic-utils/lib/bls'
import { isE164NumberStrict } from '@celo/phone-utils/lib/phoneNumbers'
import { ensureLeading0x, trimLeading0x } from '@celo/utils/lib/address'
import { POP_SIZE } from '@celo/utils/lib/signatureUtils'
import { Args, Errors, Flags } from '@oclif/core'
import BigNumber from 'bignumber.js'
import { pathExistsSync } from 'fs-extra'
import Web3 from 'web3'

const CLIError = Errors.CLIError

type ParseFn<T> = (input: any) => Promise<T>

const parseBytes = (input: string, length: number, msg: string) => {
  // Check that the string is hex and and has byte length of `length`.
  const expectedLength = input.startsWith('0x') ? length * 2 + 2 : length * 2
  if (Web3.utils.isHex(input) && input.length === expectedLength) {
    return ensureLeading0x(input)
  } else {
    throw new CLIError(msg)
  }
}

const parseEcdsaPublicKey: ParseFn<string> = async (input) => {
  const stripped = trimLeading0x(input)
  // ECDSA public keys may be passed as 65 byte values. When this happens, we drop the first byte.
  return stripped.length === 65 * 2
    ? parseBytes(stripped.slice(2), 64, `${input} is not an ECDSA public key`)
    : parseBytes(input, 64, `${input} is not an ECDSA public key`)
}
const parseBlsPublicKey: ParseFn<string> = async (input) => {
  return parseBytes(input, BLS_PUBLIC_KEY_SIZE, `${input} is not a BLS public key`)
}
const parseBlsProofOfPossession: ParseFn<string> = async (input) => {
  return parseBytes(input, BLS_POP_SIZE, `${input} is not a BLS proof-of-possession`)
}
const parseProofOfPossession: ParseFn<string> = async (input) => {
  return parseBytes(input, POP_SIZE, `${input} is not a proof-of-possession`)
}
const parseAddress: ParseFn<StrongAddress> = async (input) => {
  if (Web3.utils.isAddress(input)) {
    return input as StrongAddress
  } else {
    throw new CLIError(`${input} is not a valid address`)
  }
}
const parseGasCurrency: ParseFn<StrongAddress | 'CELO'> = async (input) => {
  if (input.toUpperCase() === 'CELO') {
    return 'CELO'
  }
  if (Web3.utils.isAddress(input)) {
    return input as StrongAddress
  } else {
    throw new CLIError(`${input} is not a valid address`)
  }
}
const parseCoreContract: ParseFn<string> = async (input) => {
  if (RegisteredContracts.includes(input as CeloContract)) {
    return input
  } else {
    throw new CLIError(`${input} is not a core contract`)
  }
}

const parseWei: ParseFn<BigNumber> = async (input) => {
  try {
    return new BigNumber(input)
  } catch (_err) {
    throw new CLIError(`${input} is not a valid token amount`)
  }
}

export const parsePath: ParseFn<string> = async (input: string) => {
  if (pathExistsSync(input)) {
    return input
  } else {
    throw new CLIError(`File at "${input}" does not exist`)
  }
}

const parsePhoneNumber: ParseFn<string> = async (input) => {
  if (isE164NumberStrict(input)) {
    return input
  } else {
    throw new CLIError(`PhoneNumber "${input}" is not a valid E164 number`)
  }
}

const parseUrl: ParseFn<string> = async (input) => {
  if (URL_REGEX.test(input)) {
    return input
  } else {
    throw new CLIError(`"${input}" is not a valid URL`)
  }
}

function parseArray<T>(parseElement: ParseFn<T>): ParseFn<T[]> {
  return async (input) => {
    const array = JSON.parse(input)
    if (Array.isArray(array)) {
      return Promise.all(array.map(parseElement))
    } else {
      throw new CLIError(`"${input}" is not a valid array`)
    }
  }
}

export const parseAddressArray = parseArray(parseAddress)
export const parseIntRange = (input: string) => {
  const range = input
    .slice(1, input.length - 1)
    .split(':')
    .map((s) => parseInt(s, 10))
  if (range.length !== 2) {
    throw new Error('range input must be two integers separated by a ":"')
  }

  let start: number
  if (input.startsWith('[')) {
    start = range[0]
  } else if (input.startsWith('(')) {
    start = range[0] + 1
  } else {
    throw new Error('range input must begin with "[" (inclusive) or "(" (exclusive)')
  }

  let end: number
  if (input.endsWith(']')) {
    end = range[1]
  } else if (input.endsWith(')')) {
    end = range[1] - 1
  } else {
    throw new Error('range input must end with "]" (inclusive) or ")" (exclusive)')
  }

  return { start, end }
}

export function argBuilder<T>(parser: ParseFn<T>) {
  return (name: string, args?: Parameters<typeof Args.custom>[0]) =>
    Args.custom({
      name,
      ...args,
      required: true,
      parse: parser,
    })()
}
const parseIntervalArray = async (s: string) => s.split(',').map((r) => parseIntRange(r.trim()))

export const CustomFlags = {
  intRangeArray: Flags.custom<Interval[]>({
    parse: parseIntervalArray,
    helpValue: "'[0:1], [1:2]'",
  }),
  addressArray: Flags.custom({
    parse: parseAddressArray,
    helpValue:
      '\'["0xb7ef0985bdb4f19460A29d9829aA1514B181C4CD", "0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95"]\'',
  }),
  address: Flags.custom<StrongAddress>({
    parse: parseAddress,
    description: 'Account Address',
    helpValue: '0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d',
  }),
  gasCurrency: Flags.custom<StrongAddress | 'CELO'>({
    parse: parseGasCurrency,
    description: 'A whitelisted feeCurrency or CELO to use native eip1559 transactions',
    helpValue: '0',
  }),
  ecdsaPublicKey: Flags.custom({
    parse: parseEcdsaPublicKey,
    description: 'ECDSA Public Key',
    helpValue: '0x',
  }),
  blsPublicKey: Flags.custom({
    parse: parseBlsPublicKey,
    description: 'BLS Public Key',
    helpValue: '0x',
  }),
  blsProofOfPossession: Flags.custom({
    parse: parseBlsProofOfPossession,
    description: 'BLS Proof-of-Possession',
    helpValue: '0x',
  }),
  contract: Flags.custom({
    parse: parseCoreContract,
    description: 'Core Contract Name',
    helpValue: `${CeloContract.BlockchainParameters}`,
  }),
  contractsArray: Flags.custom({
    parse: parseArray(parseCoreContract),
    description: 'Array of Registered Core Contracts',
    helpValue: `\'["${CeloContract.BlockchainParameters}", "${CeloContract.Governance}", "${CeloContract.Validators}"]\'`,
  }),
  phoneNumber: Flags.custom({
    parse: parsePhoneNumber,
    description: 'Phone Number in E164 Format',
    helpValue: '+14152223333',
  }),
  proofOfPossession: Flags.custom({
    parse: parseProofOfPossession,
    description: 'Proof-of-Possession',
    helpValue: '0x',
  }),
  url: Flags.custom({
    parse: parseUrl,
    description: 'URL',
    helpValue: 'https://www.celo.org',
  }),
  wei: Flags.custom({
    parse: parseWei,
    description: 'Token value without decimals',
    helpValue: '10000000000000000000000',
  }),
}

export const CustomArgs = {
  address: argBuilder(parseAddress),
  file: argBuilder(parsePath),
  // TODO: Check that the file path is possible
  newFile: argBuilder<string>((x) => x),
}
