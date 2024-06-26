import {
  StrongAddress,
  ensureLeading0x,
  normalizeAddressWith0x,
  trimLeading0x,
} from '@celo/base/lib/address'
import { CeloTx, EncodedTransaction, Hex } from '@celo/connect'
import { StableToken, newKit } from '@celo/contractkit'
import { privateKeyToAddress, privateKeyToPublicKey } from '@celo/utils/lib/address'
import { generateTypedDataHash } from '@celo/utils/lib/sign-typed-data-utils'
import { verifySignature } from '@celo/utils/lib/signatureUtils'
import {
  chainIdTransformationForSigning,
  determineTXType,
  getHashFromEncoded,
  recoverTransaction,
  signTransaction,
  verifyEIP712TypedDataSigner,
} from '@celo/wallet-base'
import * as ethUtil from '@ethereumjs/util'
import Ledger from '@ledgerhq/hw-app-eth'
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import { VerifyPublicKeyInput, createVerify } from 'crypto'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import Web3 from 'web3'
import { rlpEncodedTx } from '../../wallet-base/lib'
import { legacyLedgerPublicKeyHex } from './data'
import { meetsVersionRequirements } from './ledger-utils'
import { AddressValidation, LedgerWallet } from './ledger-wallet'

// Update this variable when testing using a physical device
const USE_PHYSICAL_LEDGER = process.env.USE_PHYSICAL_LEDGER === 'true'
// Increase timeout to give developer time to respond on device
const TEST_TIMEOUT_IN_MS = USE_PHYSICAL_LEDGER ? 30 * 1000 : 1 * 1000

const PRIVATE_KEY1 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
const ACCOUNT_ADDRESS1 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY1))
const PRIVATE_KEY2 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890fdeccc'
const ACCOUNT_ADDRESS2 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY2))
const PRIVATE_KEY3 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890fffff1'
const ACCOUNT_ADDRESS3 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY3))
const PRIVATE_KEY4 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890fffff2'
const ACCOUNT_ADDRESS4 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY4))
const PRIVATE_KEY5 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890fffff3'
const ACCOUNT_ADDRESS5 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY5))
const PRIVATE_KEY_NEVER = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890ffffff'
const ACCOUNT_ADDRESS_NEVER = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY_NEVER))

const ledgerAddresses: { [myKey: string]: { address: Hex; privateKey: Hex } } = {
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

const CHAIN_ID = 44787

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

interface ILedger {
  getAddress: typeof Ledger.prototype.getAddress
  signTransaction: typeof Ledger.prototype.signTransaction
  signPersonalMessage: typeof Ledger.prototype.signPersonalMessage
  signEIP712HashedMessage: typeof Ledger.prototype.signEIP712HashedMessage
  getAppConfiguration: typeof Ledger.prototype.getAppConfiguration
  provideERC20TokenInformation: typeof Ledger.prototype.provideERC20TokenInformation
}

const mockLedgerImplementation = (mockForceValidation: () => void, version: string): ILedger => {
  const _ledger = {
    getAddress: async (derivationPath: string, forceValidation?: boolean) => {
      if (forceValidation) {
        mockForceValidation()
      }
      if (ledgerAddresses[derivationPath]) {
        return {
          address: ledgerAddresses[derivationPath].address,
          derivationPath,
          publicKey: privateKeyToPublicKey(ledgerAddresses[derivationPath].privateKey),
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
        const type = determineTXType(ensureLeading0x(data))
        // replicate logic from wallet-base/src/wallet-base.ts
        const addToV = type === 'celo-legacy' ? chainIdTransformationForSigning(CHAIN_ID) : 27
        const hash = getHashFromEncoded(ensureLeading0x(data))
        const { r, s, v } = signTransaction(
          hash,
          ledgerAddresses[derivationPath].privateKey,
          addToV
        )

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
        arbitraryDataEnabled: 1,
        version: version,
        erc20ProvisioningNecessary: 1,
        starkEnabled: 1,
        starkv2Supported: 1,
      }
    },
    provideERC20TokenInformation: async (tokenData: string) => {
      let pubkey: VerifyPublicKeyInput
      const version = (await _ledger.getAppConfiguration()).version
      if (
        meetsVersionRequirements(version, {
          minimum: LedgerWallet.MIN_VERSION_EIP1559,
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
      const tokenDataBuf = Buffer.from(tokenData, 'hex')
      const BASE_DATA_LENGTH =
        20 + // contract address, 20 bytes
        4 + // decimals, uint32, 4 bytes
        4 // chainId, uint32, 4 bytes
      // first byte of data is the ticker length, so we add that to base data length
      const dataLen = BASE_DATA_LENGTH + tokenDataBuf.readInt8(0)
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
  }
  return _ledger
}

function mockLedger(
  wallet: LedgerWallet,
  mockForceValidation: () => void,
  version = LedgerWallet.MIN_VERSION_EIP1559
) {
  jest
    .spyOn<any, any>(wallet, 'generateNewLedger')
    .mockClear()
    .mockImplementation((_transport: any): ILedger => {
      return mockLedgerImplementation(mockForceValidation, version)
    })
}

describe('LedgerWallet class', () => {
  let wallet: LedgerWallet
  let hardwareWallet: LedgerWallet
  let knownAddress = ACCOUNT_ADDRESS1
  let otherAddress = ACCOUNT_ADDRESS2
  const unknownAddress = ACCOUNT_ADDRESS_NEVER
  let mockForceValidation: any

  beforeEach(async () => {
    jest.setTimeout(TEST_TIMEOUT_IN_MS)

    if (USE_PHYSICAL_LEDGER) {
      try {
        // Use physical ledger if present
        // Recreation of the connection will fail, therefore we use a single object
        if (!hardwareWallet) {
          const transport = await TransportNodeHid.open('')
          hardwareWallet = new LedgerWallet(undefined, undefined, transport)
        }
      } catch (e) {
        throw new Error(
          'Failed to connect to ledger. Ensure the Celo app is open and not already connected with a separate client'
        )
      }
    }
    wallet = new LedgerWallet()
    mockForceValidation = jest.fn((): void => {
      // do nothing
    })
    mockLedger(wallet, mockForceValidation)
  })

  describe('without initializing', () => {
    let celoTransaction: CeloTx
    beforeAll(() => {
      celoTransaction = {
        from: knownAddress,
        to: knownAddress,
        chainId: CHAIN_ID,
        value: Web3.utils.toWei('1', 'ether'),
        nonce: 0,
        gas: 99,
        maxFeePerGas: 99,
        maxPriorityFeePerGas: 99,
        // feeCurrency: '0x',
        data: '0xabcdef',
      }
    })

    test('fails calling getAccounts', () => {
      try {
        wallet.getAccounts()
        throw new Error('Expected exception to be thrown')
      } catch (e: any) {
        expect(e.message).toBe('wallet needs to be initialized first')
      }
    })

    test('fails calling hasAccount', () => {
      try {
        wallet.hasAccount(ACCOUNT_ADDRESS1)
        throw new Error('Expected exception to be thrown')
      } catch (e: any) {
        expect(e.message).toBe('wallet needs to be initialized first')
      }
    })

    test('fails calling signTransaction', async () => {
      await expect(wallet.signTransaction(celoTransaction)).rejects.toThrowError()
    })

    test('fails calling signPersonalMessage', async () => {
      await expect(wallet.signPersonalMessage(ACCOUNT_ADDRESS1, 'test')).rejects.toThrowError()
    })

    test('fails calling signTypedData', async () => {
      await expect(wallet.signTypedData(ACCOUNT_ADDRESS1, TYPED_DATA)).rejects.toThrowError()
    })
  })

  describe('after initializing', () => {
    beforeEach(async () => {
      if (USE_PHYSICAL_LEDGER) {
        wallet = hardwareWallet
      }
      await wallet.init()
      if (USE_PHYSICAL_LEDGER) {
        knownAddress = wallet.getAccounts()[0] as StrongAddress
        otherAddress = wallet.getAccounts()[1] as StrongAddress
      }
    }, TEST_TIMEOUT_IN_MS)

    test('starts 5 accounts', () => {
      expect(wallet.getAccounts().length).toBe(5)
    })

    test('returns true if it has the accounts', () => {
      expect(wallet.hasAccount(knownAddress)).toBeTruthy()
    })

    test('returns false if it has the accounts', () => {
      expect(wallet.hasAccount(ACCOUNT_ADDRESS_NEVER)).toBeFalsy()
    })

    describe('with an account', () => {
      let celoTransaction: CeloTx
      beforeEach(() => {
        celoTransaction = {
          from: unknownAddress,
          to: unknownAddress,
          chainId: CHAIN_ID,
          value: Web3.utils.toWei('1', 'ether'),
          nonce: 0,
          gas: 99,
          maxFeePerGas: 99,
          maxPriorityFeePerGas: 99,
          data: '0xabcdef',
        }
      })

      describe('signing', () => {
        describe('using an unknown address', () => {
          test('fails calling signTransaction', async () => {
            await expect(wallet.signTransaction(celoTransaction)).rejects.toThrowError()
          })

          test(
            'fails calling signPersonalMessage',
            async () => {
              const hexStr: string = '0xa1'
              await expect(
                wallet.signPersonalMessage(unknownAddress, hexStr)
              ).rejects.toThrowError()
            },
            TEST_TIMEOUT_IN_MS
          )

          test(
            'fails calling signTypedData',
            async () => {
              await expect(wallet.signTypedData(unknownAddress, TYPED_DATA)).rejects.toThrowError()
            },
            TEST_TIMEOUT_IN_MS
          )
        })

        describe('using a known address', () => {
          describe('[eip1559]', () => {
            beforeEach(async () => {
              celoTransaction = {
                from: knownAddress,
                to: otherAddress,
                chainId: CHAIN_ID,
                value: Web3.utils.toWei('1', 'ether'),
                nonce: 0,
                gas: 99,
                maxFeePerGas: 99,
                maxPriorityFeePerGas: 99,
                // data: '0xabcdef',
              }
            })

            test(
              'succeeds on cel2 (when ledger version is above minimum)',
              async () => {
                await expect(wallet.signTransaction(celoTransaction)).resolves.not.toBeUndefined()
              },
              TEST_TIMEOUT_IN_MS
            )
            //
            test(
              'fails on cel2 (when ledger version is below minimum)',
              async () => {
                wallet = new LedgerWallet(
                  undefined,
                  undefined,
                  undefined,
                  AddressValidation.never,
                  true
                )
                mockForceValidation = jest.fn((): void => {
                  // do nothing
                })
                mockLedger(wallet, mockForceValidation, LedgerWallet.MIN_VERSION_TOKEN_DATA)
                await wallet.init()

                expect(
                  wallet.signTransaction(celoTransaction)
                ).rejects.toThrowErrorMatchingInlineSnapshot(
                  `"celo ledger app version must be at least 1.2.0 to sign transactions supported on celo after the L2 upgrade"`
                )
              },
              TEST_TIMEOUT_IN_MS
            )
            test(
              'on cel1 with old ledger converts to legacy tx',
              async () => {
                wallet = new LedgerWallet(
                  undefined,
                  undefined,
                  undefined,
                  AddressValidation.never,
                  false
                )
                mockForceValidation = jest.fn((): void => {
                  // do nothing
                })
                mockLedger(wallet, mockForceValidation, LedgerWallet.MIN_VERSION_TOKEN_DATA)
                await wallet.init()
                const warnSpy = jest.spyOn(console, 'warn')
                // setup complete

                await expect(wallet.signTransaction(celoTransaction)).resolves
                  .toMatchInlineSnapshot(`
                  {
                    "raw": "0xf86b80636380808094588e4b68193001e4d10928660ab4165b813717c0880de0b6b3a76400008083015e09a0dc9e278c10d4b3416f436ef1c3e7ab913391771fee82f7d7f5a810d01561ba34a07d9d09088d2cfe05345fede2fdfb837be7b5e2ae428e4dda94c042d3dd246e1e",
                    "tx": {
                      "feeCurrency": "0x",
                      "gas": "0x63",
                      "hash": "0x3c764c8b7e35fb841b57d8409a9210df87b10d6e6334a43ce936cdf569f20d01",
                      "input": "0x",
                      "nonce": "0",
                      "r": "0xdc9e278c10d4b3416f436ef1c3e7ab913391771fee82f7d7f5a810d01561ba34",
                      "s": "0x7d9d09088d2cfe05345fede2fdfb837be7b5e2ae428e4dda94c042d3dd246e1e",
                      "to": "0x588e4b68193001e4d10928660ab4165b813717c0",
                      "v": "0x015e09",
                      "value": "0x0de0b6b3a7640000",
                    },
                    "type": "celo-legacy",
                  }
                `)
                expect(warnSpy).toHaveBeenCalledWith(
                  'Upgrade your celo ledger app to at least 1.2.0 before cel2 transition'
                )
              },
              TEST_TIMEOUT_IN_MS
            )

            test(
              'with same signer',
              async () => {
                const signedTx: EncodedTransaction = await wallet.signTransaction(celoTransaction)
                const [_tx, recoveredSigner] = recoverTransaction(signedTx.raw)
                expect(normalizeAddressWith0x(recoveredSigner)).toBe(
                  normalizeAddressWith0x(knownAddress)
                )
              },
              TEST_TIMEOUT_IN_MS
            )

            // https://github.com/ethereum/go-ethereum/blob/38aab0aa831594f31d02c9f02bfacc0bef48405d/rlp/decode.go#L664
            test(
              'signature with 0x00 prefix is canonicalized',
              async () => {
                // This tx is carefully constructed to produce an S value with the first byte as 0x00
                const celoTransactionZeroPrefix = {
                  from: knownAddress,
                  to: otherAddress,
                  chainId: CHAIN_ID,
                  value: Web3.utils.toWei('1', 'ether'),
                  nonce: 65,
                  gas: '10',
                  maxFeePerGas: 99,
                  maxPriorityFeePerGas: 99,
                  feeCurrency: '0x' as const,
                  // data: '0xabcdef',
                }
                const signedTx: EncodedTransaction = await wallet.signTransaction(
                  celoTransactionZeroPrefix
                )
                expect(signedTx.tx.s.startsWith('0x00')).toBeFalsy()
                const [, recoveredSigner] = recoverTransaction(signedTx.raw)
                expect(normalizeAddressWith0x(recoveredSigner)).toBe(
                  normalizeAddressWith0x(knownAddress)
                )
              },
              TEST_TIMEOUT_IN_MS
            )
          })

          describe('[eth-legacy]', () => {
            beforeEach(async () => {
              celoTransaction = {
                from: knownAddress,
                to: otherAddress,
                chainId: CHAIN_ID,
                value: Web3.utils.toWei('1', 'ether'),
                nonce: 1,
                gas: 99,
                gasPrice: 99,
              }
            })

            test(
              'fails',
              async () => {
                await expect(
                  wallet.signTransaction(celoTransaction)
                ).rejects.toThrowErrorMatchingInlineSnapshot(
                  `"ethereum-legacy transactions are not supported, please try sending a more modern transaction instead (eip1559, cip64, etc.)"`
                )
              },
              TEST_TIMEOUT_IN_MS
            )
          })

          describe('[celo-legacy]', () => {
            beforeEach(async () => {
              const kit = newKit('https://alfajores-forno.celo-testnet.org')
              celoTransaction = {
                from: knownAddress,
                to: otherAddress,
                chainId: CHAIN_ID,
                value: Web3.utils.toWei('1', 'ether'),
                nonce: 0,
                gas: 99,
                gasPrice: 99,
                feeCurrency: (await kit.contracts.getStableToken(StableToken.cUSD)).address,
              }
            })
            describe('with old ledger app', () => {
              describe('on Cel2 with old app version', () => {
                beforeEach(async () => {
                  wallet = new LedgerWallet(
                    undefined,
                    undefined,
                    undefined,
                    AddressValidation.never,
                    true
                  )
                  mockForceValidation = jest.fn((): void => {
                    // do nothing
                  })
                  mockLedger(wallet, mockForceValidation, LedgerWallet.MIN_VERSION_TOKEN_DATA)
                  await wallet.init()
                })

                test(
                  'fails',
                  async () => {
                    await expect(
                      wallet.signTransaction(celoTransaction)
                    ).rejects.toThrowErrorMatchingInlineSnapshot(
                      `"celo ledger app version must be at least 1.2.0 to sign transactions supported on celo after the L2 upgrade"`
                    )
                  },
                  TEST_TIMEOUT_IN_MS
                )
              })
              describe('on celo l1 with old app version', () => {
                test(
                  'physical device only',
                  async () => {
                    if (!hardwareWallet) {
                      expect(true).toBeTruthy()
                      return
                    }
                    const signedTx = await wallet.signTransaction(celoTransaction)
                    const [_tx, recoveredSigner] = recoverTransaction(signedTx.raw)
                    expect(normalizeAddressWith0x(recoveredSigner)).toEqual(
                      normalizeAddressWith0x(knownAddress)
                    )
                  },
                  TEST_TIMEOUT_IN_MS
                )

                test(
                  'succeeds with warning',
                  async () => {
                    wallet = new LedgerWallet(
                      undefined,
                      undefined,
                      undefined,
                      AddressValidation.never,
                      false
                    )
                    mockForceValidation = jest.fn((): void => {
                      // do nothing
                    })
                    mockLedger(wallet, mockForceValidation, LedgerWallet.MIN_VERSION_TOKEN_DATA)
                    await wallet.init()
                    const warnSpy = jest.spyOn(console, 'warn')
                    // setup complete

                    await expect(wallet.signTransaction(celoTransaction)).resolves
                      .toMatchInlineSnapshot(`
                      {
                        "raw": "0xf87f80636394874069fa1eb16d44d622f2e0ca25eea172369bc1808094588e4b68193001e4d10928660ab4165b813717c0880de0b6b3a76400008083015e09a024c4b1d027c50d2e847d371cd902d3e22c9fa10fcbd59e9c5a854282afed34daa0686180d75830ea223c3ed1ca12613d029bc3613b4b5b51a724b33067491c2398",
                        "tx": {
                          "feeCurrency": "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
                          "gas": "0x63",
                          "hash": "0x302b12585b4a17317e9affcbe0abd0cd8cd39ef402108625085485b1c1d92d71",
                          "input": "0x",
                          "nonce": "0",
                          "r": "0x24c4b1d027c50d2e847d371cd902d3e22c9fa10fcbd59e9c5a854282afed34da",
                          "s": "0x686180d75830ea223c3ed1ca12613d029bc3613b4b5b51a724b33067491c2398",
                          "to": "0x588e4b68193001e4d10928660ab4165b813717c0",
                          "v": "0x015e09",
                          "value": "0x0de0b6b3a7640000",
                        },
                        "type": "celo-legacy",
                      }
                    `)
                    expect(warnSpy).toHaveBeenCalledWith(
                      'Upgrade your celo ledger app to at least 1.2.0 before cel2 transition'
                    )
                  },
                  TEST_TIMEOUT_IN_MS
                )
              })
            })
            describe('with new ledger app', () => {
              test(
                'fails with helpful error',
                async () => {
                  await expect(
                    wallet.signTransaction(celoTransaction)
                  ).rejects.toThrowErrorMatchingInlineSnapshot(
                    `"celo ledger app above 1.2.0 cannot serialize legacy celo transactions. Replace "gasPrice" with "maxFeePerGas"."`
                  )
                },
                TEST_TIMEOUT_IN_MS
              )
            })
          })

          describe('[cip64]', () => {
            const kit = newKit('https://alfajores-forno.celo-testnet.org')
            beforeEach(async () => {
              celoTransaction = {
                from: knownAddress,
                to: otherAddress,
                chainId: CHAIN_ID,
                value: Web3.utils.toWei('1', 'ether'),
                nonce: 0,
                gas: 99,
                maxFeePerGas: 99,
                maxPriorityFeePerGas: 99,
                feeCurrency: (await kit.contracts.getStableToken(StableToken.cUSD)).address,
              }
            })

            test(
              'succeeds',
              async () => {
                await expect(wallet.signTransaction(celoTransaction)).resolves.not.toBeUndefined()
              },
              TEST_TIMEOUT_IN_MS
            )
          })
          describe('[cip66]', () => {
            const kit = newKit('https://alfajores-forno.celo-testnet.org')
            beforeEach(async () => {
              celoTransaction = {
                from: knownAddress,
                to: otherAddress,
                chainId: CHAIN_ID,
                value: Web3.utils.toWei('1', 'ether'),
                nonce: 0,
                gas: 99,
                maxFeePerGas: 99,
                maxPriorityFeePerGas: 99,
                feeCurrency: (await kit.contracts.getStableToken(StableToken.cUSD)).address,
              }
            })

            test(
              'gives warning',
              async () => {
                await expect(wallet.signTransaction(celoTransaction)).resolves.not.toBeUndefined()
              },
              TEST_TIMEOUT_IN_MS
            )
          })
        })

        describe('when calling signPersonalMessage', () => {
          test(
            'succeeds',
            async () => {
              const hexStr: string = ACCOUNT_ADDRESS1
              const signedMessage = await wallet.signPersonalMessage(knownAddress, hexStr)
              expect(signedMessage).not.toBeUndefined()
              const valid = verifySignature(hexStr, signedMessage, knownAddress)
              expect(valid).toBeTruthy()
            },
            TEST_TIMEOUT_IN_MS
          )
        })

        describe('when calling signTypedData', () => {
          test.skip(
            'succeeds',
            async () => {
              const signedMessage = await wallet.signTypedData(knownAddress, TYPED_DATA)
              expect(signedMessage).not.toBeUndefined()
              const valid = verifyEIP712TypedDataSigner(TYPED_DATA, signedMessage, knownAddress)
              expect(valid).toBeTruthy()
            },
            TEST_TIMEOUT_IN_MS
          )
        })
      })
    })
  })

  /**
   * These tests are entirely mocked for now
   */
  describe('asking for addresses validations', () => {
    beforeEach(() => {
      knownAddress = ACCOUNT_ADDRESS1
      otherAddress = ACCOUNT_ADDRESS2
    })

    describe('never', () => {
      beforeEach(() => {
        wallet = new LedgerWallet(undefined, undefined, {}, AddressValidation.never)
        mockForceValidation = jest.fn((): void => {
          // do nothing
        })
        mockLedger(wallet, mockForceValidation)
      })

      it("won't validate", async () => {
        await wallet.init()
        expect(mockForceValidation.mock.calls.length).toBe(0)
        await wallet.signPersonalMessage(knownAddress, ACCOUNT_ADDRESS_NEVER)
        expect(mockForceValidation.mock.calls.length).toBe(0)
      })
    })

    describe('only in the initialization legacy (version < 1.2.0)', () => {
      beforeEach(() => {
        wallet = new LedgerWallet(undefined, undefined, {}, AddressValidation.initializationOnly)
        mockForceValidation = jest.fn((): void => {
          // do nothing
        })
        mockLedger(wallet, mockForceValidation, '0.0.0')
        Promise.resolve(123)
      })

      it("will fail to initialize if the version isn't supported", async () => {
        await expect(wallet.init()).rejects.toMatchInlineSnapshot(
          `[Error: Due to technical issues, we require the users to update their ledger celo-app to >= 1.0.0. You can do this on ledger-live by updating the celo-app in the app catalog.]`
        )
      })
    })

    describe('only in the initialization', () => {
      beforeEach(() => {
        wallet = new LedgerWallet(undefined, undefined, {}, AddressValidation.initializationOnly)
        mockForceValidation = jest.fn((): void => {
          // do nothing
        })
        mockLedger(wallet, mockForceValidation)
      })

      it('will validate the addresses only in the initialization', async () => {
        await wallet.init()
        expect(mockForceValidation.mock.calls.length).toBe(5)
        await wallet.signPersonalMessage(knownAddress, ACCOUNT_ADDRESS_NEVER)
        expect(mockForceValidation.mock.calls.length).toBe(5)
      })
    })

    describe('every transaction', () => {
      beforeEach(() => {
        wallet = new LedgerWallet(undefined, undefined, {}, AddressValidation.everyTransaction)
        mockForceValidation = jest.fn((): void => {
          // do nothing
        })
        mockLedger(wallet, mockForceValidation)
      })

      it('will validate every transaction', async () => {
        await wallet.init()
        expect(mockForceValidation.mock.calls.length).toBe(0)
        await wallet.signPersonalMessage(knownAddress, ACCOUNT_ADDRESS_NEVER)
        expect(mockForceValidation.mock.calls.length).toBe(1)
        await wallet.signPersonalMessage(knownAddress, ACCOUNT_ADDRESS_NEVER)
        expect(mockForceValidation.mock.calls.length).toBe(2)
      })
    })

    describe('once per address', () => {
      beforeEach(() => {
        wallet = new LedgerWallet(
          undefined,
          undefined,
          {},
          AddressValidation.firstTransactionPerAddress
        )
        mockForceValidation = jest.fn((): void => {
          // do nothing
        })
        mockLedger(wallet, mockForceValidation)
      })

      it('will validate only in the first transaction of the address', async () => {
        await wallet.init()
        expect(mockForceValidation.mock.calls.length).toBe(0)
        await wallet.signPersonalMessage(knownAddress, ACCOUNT_ADDRESS_NEVER)
        expect(mockForceValidation.mock.calls.length).toBe(1)
        await wallet.signPersonalMessage(knownAddress, ACCOUNT_ADDRESS_NEVER)
        expect(mockForceValidation.mock.calls.length).toBe(1)
        await wallet.signPersonalMessage(otherAddress, ACCOUNT_ADDRESS_NEVER)
        expect(mockForceValidation.mock.calls.length).toBe(2)
        await wallet.signPersonalMessage(otherAddress, ACCOUNT_ADDRESS_NEVER)
        expect(mockForceValidation.mock.calls.length).toBe(2)
      })
    })

    describe('by default (acts as firstTransactionPerAddress)', () => {
      beforeEach(() => {
        wallet = new LedgerWallet()
        mockForceValidation = jest.fn((): void => {
          // do nothing
        })
        mockLedger(wallet, mockForceValidation)
      })

      it('will validate only in the first transaction of the address', async () => {
        await wallet.init()
        expect(mockForceValidation.mock.calls.length).toBe(0)
        await wallet.signPersonalMessage(knownAddress, ACCOUNT_ADDRESS_NEVER)
        expect(mockForceValidation.mock.calls.length).toBe(1)
        await wallet.signPersonalMessage(knownAddress, ACCOUNT_ADDRESS_NEVER)
        expect(mockForceValidation.mock.calls.length).toBe(1)
      })
    })
  })
})

describe('patch-package @ledgerhq/hw-app-eth', () => {
  test('was applied correctly', async () => {
    const { decodeTxInfo } = await import('@ledgerhq/hw-app-eth/lib/utils')

    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    const celoTransaction = {
      from: ACCOUNT_ADDRESS1,
      to: ACCOUNT_ADDRESS2,
      chainId: CHAIN_ID,
      value: Web3.utils.toWei('1', 'ether'),
      nonce: 0,
      gas: 99,
      maxFeePerGas: 99,
      maxPriorityFeePerGas: 99,
      feeCurrency: (await kit.contracts.getStableToken(StableToken.cUSD)).address,
    }
    const serialized = rlpEncodedTx(celoTransaction)
    const rawTx = Buffer.from(trimLeading0x(serialized.rlpEncode), 'hex')
    let ledgerDecoded: ReturnType<typeof decodeTxInfo>
    expect(() => {
      ledgerDecoded = decodeTxInfo(rawTx)
    }).not.toThrow(/invalid rlp data/)
    expect(ledgerDecoded!.txType).toEqual(0x7b)
    expect(ledgerDecoded!.chainId.toNumber()).toEqual(CHAIN_ID)
    expect(ledgerDecoded!.decodedTx).toMatchInlineSnapshot(`
      {
        "chainId": {
          "data": [
            174,
            243,
          ],
          "type": "Buffer",
        },
        "data": "0x",
        "feeCurrency": "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
        "to": "0x588e4b68193001e4d10928660ab4165b813717c0",
      }
    `)
  })
})
