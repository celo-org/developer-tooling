import { ensureLeading0x, normalizeAddressWith0x, trimLeading0x } from '@celo/base'
import { generateTypedDataHash } from '@celo/utils/lib/sign-typed-data-utils.js'
import { getHashFromEncoded, signTransaction } from '@celo/wallet-base'
import * as ethUtil from '@ethereumjs/util'
import Eth from '@ledgerhq/hw-app-eth'
import { createVerify, VerifyPublicKeyInput } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { Hex } from 'viem'
import { privateKeyToAccount, privateKeyToAddress } from 'viem/accounts'
import { legacyLedgerPublicKeyHex } from './data.js'
import { meetsVersionRequirements, MIN_VERSION_EIP1559 } from './utils.js'

export const PRIVATE_KEY1 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
export const ACCOUNT_ADDRESS1 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY1))
export const PRIVATE_KEY2 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890fdeccc'
export const ACCOUNT_ADDRESS2 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY2))
export const PRIVATE_KEY3 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890fffff1'
export const ACCOUNT_ADDRESS3 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY3))
export const PRIVATE_KEY4 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890fffff2'
export const ACCOUNT_ADDRESS4 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY4))
export const PRIVATE_KEY5 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890fffff3'
export const ACCOUNT_ADDRESS5 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY5))
export const PRIVATE_KEY_NEVER =
  '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890ffffff'
export const ACCOUNT_ADDRESS_NEVER = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY_NEVER))

export const ledgerAddresses: { [myKey: string]: { address: Hex; privateKey: Hex } } = {
  "44'/52752'/0'/0/0": {
    address: ACCOUNT_ADDRESS1,
    privateKey: PRIVATE_KEY1,
  },
  "44'/52752'/0'/0/1": {
    address: ACCOUNT_ADDRESS2,
    privateKey: PRIVATE_KEY2,
  },
  "44'/52752'/0'/0/2": {
    address: ACCOUNT_ADDRESS3,
    privateKey: PRIVATE_KEY3,
  },
  "44'/52752'/0'/0/3": {
    address: ACCOUNT_ADDRESS4,
    privateKey: PRIVATE_KEY4,
  },
  "44'/52752'/0'/0/4": {
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

interface Config extends Partial<Awaited<ReturnType<Eth.default['getAppConfiguration']>>> {}

export const mockLedger = (config?: Config) => {
  const _ledger = {
    getAddress: async (derivationPath: string) => {
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
    },
    signTransaction: async (derivationPath: string, data: string) => {
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
    },
    signPersonalMessage: async (derivationPath: string, data: string) => {
      if (ledgerAddresses[derivationPath]) {
        const dataBuff = ethUtil.toBuffer(ensureLeading0x(data))
        const msgHashBuff = ethUtil.hashPersonalMessage(dataBuff)

        const trimmedKey = trimLeading0x(ledgerAddresses[derivationPath].privateKey)
        const pkBuffer = Buffer.from(trimmedKey, 'hex')
        const signature = ethUtil.ecsign(msgHashBuff, pkBuffer)
        return {
          v: Number(signature.v),
          r: signature.r.toString('hex'),
          s: signature.s.toString('hex'),
        }
      }
      throw new Error('Invalid Path')
    },
    signEIP712HashedMessage: async (
      derivationPath: string,
      _domainSeparator: string,
      _structHash: string
    ) => {
      const messageHash = generateTypedDataHash(TYPED_DATA)

      const trimmedKey = trimLeading0x(ledgerAddresses[derivationPath].privateKey)
      const pkBuffer = Buffer.from(trimmedKey, 'hex')
      const signature = ethUtil.ecsign(messageHash, pkBuffer)
      return {
        v: Number(signature.v),
        r: signature.r.toString('hex'),
        s: signature.s.toString('hex'),
      }
    },
    getAppConfiguration: async () => {
      return {
        arbitraryDataEnabled: config?.arbitraryDataEnabled ?? 1,
        version: config?.version ?? MIN_VERSION_EIP1559,
        erc20ProvisioningNecessary: config?.erc20ProvisioningNecessary ?? 1,
        starkEnabled: config?.starkEnabled ?? 1,
        starkv2Supported: config?.starkv2Supported ?? 1,
      }
    },
    provideERC20TokenInformation: async (tokenData: string) => {
      let pubkey: VerifyPublicKeyInput
      const version = (await _ledger.getAppConfiguration()).version
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
    },
  } as unknown as Eth.default
  return _ledger
}
