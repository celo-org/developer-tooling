import { ensureLeading0x, normalizeAddressWith0x, trimLeading0x } from '@celo/base'
import Eth from '@celo/hw-app-eth'
import { generateTypedDataHash } from '@celo/utils/lib/sign-typed-data-utils.js'
import { getHashFromEncoded, signTransaction } from '@celo/wallet-base'
import * as ethUtil from '@ethereumjs/util'
import { createVerify, VerifyPublicKeyInput } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { Hex, parseSignature } from 'viem'
import { privateKeyToAccount, privateKeyToAddress, signMessage } from 'viem/accounts'
import { legacyLedgerPublicKeyHex } from './data.js'
import { meetsVersionRequirements, MIN_VERSION_EIP1559 } from './utils.js'
import { DEFAULT_DERIVATION_PATH } from './constants.js'

const PRIVATE_KEY1 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
export const ACCOUNT_ADDRESS1 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY1))
const PRIVATE_KEY2 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890fdeccc'
export const ACCOUNT_ADDRESS2 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY2))
const PRIVATE_KEY3 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890fffff1'
export const ACCOUNT_ADDRESS3 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY3))
const PRIVATE_KEY4 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890fffff2'
export const ACCOUNT_ADDRESS4 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY4))
const PRIVATE_KEY5 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890fffff3'
export const ACCOUNT_ADDRESS5 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY5))
const PRIVATE_KEY_NEVER = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890ffffff'
export const ACCOUNT_ADDRESS_NEVER = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY_NEVER))

const ledgerAddresses: { [myKey: string]: { address: Hex; privateKey: Hex } } = {
  [`${DEFAULT_DERIVATION_PATH}/0`]: {
    address: ACCOUNT_ADDRESS1,
    privateKey: PRIVATE_KEY1,
  },
  [`${DEFAULT_DERIVATION_PATH}/1`]: {
    address: ACCOUNT_ADDRESS2,
    privateKey: PRIVATE_KEY2,
  },
  [`${DEFAULT_DERIVATION_PATH}/2`]: {
    address: ACCOUNT_ADDRESS3,
    privateKey: PRIVATE_KEY3,
  },
  [`${DEFAULT_DERIVATION_PATH}/3`]: {
    address: ACCOUNT_ADDRESS4,
    privateKey: PRIVATE_KEY4,
  },
  [`${DEFAULT_DERIVATION_PATH}/4`]: {
    address: ACCOUNT_ADDRESS5,
    privateKey: PRIVATE_KEY5,
  },
}

export const TEST_CHAIN_ID = 44787

// Sample data from the official EIP-712 example:
// https://github.com/ethereum/EIPs/blob/master/assets/eip-712/Example.js
const TYPED_DATA = {
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ],
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
}

interface Config extends Partial<Awaited<ReturnType<Eth['getAppConfiguration']>>> {
  name?: string
}

export class TestLedger {
  isMock = true
  transport: Eth['transport']

  constructor(readonly config?: Config) {
    this.transport = {
      send: async (_cla: number, ins: number, _p1: number, _p2: number): Promise<Buffer> => {
        if (ins === 0x01) {
          // get app information INS
          const version = Buffer.from((await this.getAppConfiguration()).version, 'ascii')
          const name = Buffer.from(this.getName() ?? 'Celo', 'ascii')
          return Buffer.from([0x01, name.byteLength, ...name, version.byteLength, ...version])
        }

        throw new Error('Unsupport INS ' + ins + ' in mock')
      },
    } as Eth['transport']
  }

  getName() {
    return this.config?.name
  }

  getAppConfiguration() {
    return Promise.resolve({
      arbitraryDataEnabled: this.config?.arbitraryDataEnabled ?? 1,
      version: this.config?.version ?? MIN_VERSION_EIP1559,
      erc20ProvisioningNecessary: this.config?.erc20ProvisioningNecessary ?? 1,
      starkEnabled: this.config?.starkEnabled ?? 1,
      starkv2Supported: this.config?.starkv2Supported ?? 1,
    })
  }

  async getAddress(derivationPath: string) {
    if (ledgerAddresses[derivationPath]) {
      const { address, privateKey } = ledgerAddresses[derivationPath]
      return {
        address,
        derivationPath,
        publicKey: privateKeyToAccount(privateKey).publicKey,
      }
    }
    return {
      address: '',
      derivationPath,
      publicKey: '',
    }
  }

  async signTransaction(derivationPath: string, data: string) {
    if (ledgerAddresses[derivationPath]) {
      const hash = getHashFromEncoded(ensureLeading0x(data))
      const { r, s, v } = signTransaction(hash, ledgerAddresses[derivationPath].privateKey)

      return {
        v: v.toString(16),
        r: r.toString('hex'),
        s: s.toString('hex'),
      }
    }
    throw new Error('Invalid Path')
  }

  async signPersonalMessage(derivationPath: string, data: string) {
    if (ledgerAddresses[derivationPath]) {
      const signedMessage = await signMessage({
        privateKey: ledgerAddresses[derivationPath].privateKey,
        message: { raw: ensureLeading0x(data) },
      })
      return parseSignature(signedMessage)
    }
    throw new Error('Invalid Path')
  }

  async signEIP712HashedMessage(
    derivationPath: string,
    _domainSeparator: string,
    _structHash: string
  ) {
    const messageHash = generateTypedDataHash(TYPED_DATA)

    const trimmedKey = trimLeading0x(ledgerAddresses[derivationPath].privateKey)
    const pkBuffer = Buffer.from(trimmedKey, 'hex')
    const signature = ethUtil.ecsign(messageHash, pkBuffer)
    return {
      v: Number(signature.v),
      r: signature.r.toString('hex'),
      s: signature.s.toString('hex'),
    }
  }

  async provideERC20TokenInformation(tokenData: string) {
    let pubkey: VerifyPublicKeyInput
    const version = (await this.getAppConfiguration()).version
    if (
      meetsVersionRequirements(version, {
        minimum: MIN_VERSION_EIP1559,
      })
    ) {
      // verify with new pubkey
      const pubDir = dirname(require.resolve('@celo/ledger-token-signer'))
      pubkey = { key: readFileSync(join(pubDir, 'pubkey.pem')).toString() }
    } else {
      // verify with oldpubkey
      pubkey = { key: legacyLedgerPublicKeyHex }
    }

    const verify = createVerify('sha256')
    const tokenDataBuf = Buffer.from(trimLeading0x(tokenData), 'hex')
    const BASE_DATA_LENGTH =
      20 + // contract address, 20 bytes
      4 + // decimals, uint32, 4 bytes
      4 // chainId, uint32, 4 bytes
    // first byte of data is the ticker length, so we add that to base data length
    const dataLen = BASE_DATA_LENGTH + tokenDataBuf.readUint8(0)

    // start at 1 since the first byte was just informative
    const data = tokenDataBuf.slice(1, dataLen + 1)
    verify.update(data)
    verify.end()
    // read from end of data til the end
    const signature = tokenDataBuf.slice(dataLen + 1)
    const verified = verify.verify(pubkey, signature)

    if (!verified) {
      throw new Error('couldnt verify data sent to MockLedger')
    }
    return verified
  }
}

export const mockLedger = (config: Config = {}): Eth => {
  return new TestLedger(config) as unknown as Eth
}
