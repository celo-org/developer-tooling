import { ETHEREUM_DERIVATION_PATH } from '@celo/base'
import { StrongAddress, normalizeAddressWith0x } from '@celo/base/lib/address'
import { CeloTx, EncodedTransaction } from '@celo/connect'
import { verifySignature } from '@celo/utils/lib/signatureUtils'
import { recoverTransaction, verifyEIP712TypedDataSigner } from '@celo/wallet-base'
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import Web3 from 'web3'
import { AddressValidation, CELO_BASE_DERIVATION_PATH, LedgerWallet } from './ledger-wallet'
import {
  ACCOUNT_ADDRESS1,
  ACCOUNT_ADDRESS2,
  ACCOUNT_ADDRESS_NEVER,
  mockLedgerImplementation,
} from './test-utils'

// Update this variable when testing using a physical device
const USE_PHYSICAL_LEDGER = process.env.USE_PHYSICAL_LEDGER === 'true'
const hardwareDescribe = USE_PHYSICAL_LEDGER ? describe : describe.skip
const syntheticDescribe = USE_PHYSICAL_LEDGER ? describe.skip : describe
// Increase timeout to give developer time to respond on device
const TEST_TIMEOUT_IN_MS = USE_PHYSICAL_LEDGER ? 30 * 1000 : 1 * 1000

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

function mockLedger(
  wallet: LedgerWallet,
  mockForceValidation: () => void,
  { version = LedgerWallet.MIN_VERSION_EIP1559, name = 'celo' } = {}
) {
  return jest
    .spyOn<any, any>(wallet, 'generateNewLedger')
    .mockClear()
    .mockImplementation((_transport: any) => {
      return mockLedgerImplementation(mockForceValidation, { version, name })
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
          hardwareWallet = new LedgerWallet(transport)
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
      await expect(
        wallet.signTransaction(celoTransaction)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Cannot read properties of undefined (reading 'transport')"`
      )
    })

    test('fails calling signPersonalMessage', async () => {
      await expect(
        wallet.signPersonalMessage(ACCOUNT_ADDRESS1, 'test')
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"wallet needs to be initialized first"`)
    })

    test('fails calling signTypedData', async () => {
      await expect(
        wallet.signTypedData(ACCOUNT_ADDRESS1, TYPED_DATA)
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"wallet needs to be initialized first"`)
    })
  })

  describe('while initializing', () => {
    it('can be used with eth derivation path', async () => {
      wallet = new LedgerWallet({}, [0, 1, 2, 3], ETHEREUM_DERIVATION_PATH, [6, 7, 8])
      mockLedger(wallet, mockForceValidation)
      await wallet.init()
      // @ts-expect-error
      wallet.ledger!.getAddress.mock.calls.forEach((params: string[]) => {
        expect(params[0]).toMatch(/^44'/)
        expect(params[0].split('/').length).toBe(5)
      })
      expect(wallet.ledger!.getAddress).toHaveBeenCalledTimes(12)
    })
    it('can be used with derivation path without the master node', async () => {
      wallet = new LedgerWallet({}, [0, 3], "44'/52752'/0'/0", [0])
      mockLedger(wallet, mockForceValidation)
      await wallet.init()
      // @ts-expect-error
      wallet.ledger!.getAddress.mock.calls.forEach((params: string[]) => {
        expect(params[0]).toMatch(/^44'/)
        expect(params[0].split('/').length).toBe(5)
      })
      expect(wallet.ledger!.getAddress).toHaveBeenCalledTimes(2)
    })
    it('iterates over change indices and address indexes', async () => {
      wallet = new LedgerWallet({}, [0, 1], "m/44'/52752'/0'/0", [0, 1, 2])
      mockLedger(wallet, mockForceValidation)
      await wallet.init()
      // @ts-expect-error (mock.calls)
      expect(wallet.ledger!.getAddress.mock.calls).toMatchInlineSnapshot(`
        [
          [
            "44'/52752'/0'/0/0",
            false,
          ],
          [
            "44'/52752'/0'/0/1",
            false,
          ],
          [
            "44'/52752'/0'/1/0",
            false,
          ],
          [
            "44'/52752'/0'/1/1",
            false,
          ],
          [
            "44'/52752'/0'/2/0",
            false,
          ],
          [
            "44'/52752'/0'/2/1",
            false,
          ],
        ]
      `)
      expect(wallet.ledger!.getAddress).toHaveBeenCalledTimes(6)
    })
    describe('with other ledger apps', () => {
      describe('with the ethereum-recovery app', () => {
        beforeEach(() => {
          wallet = new LedgerWallet({}, [0], CELO_BASE_DERIVATION_PATH, [1, 2])
          mockLedger(wallet, mockForceValidation, { name: 'ethereum-recovery' })
        })
        it('shows warning on initialization but still initalizes', async () => {
          const logMock = jest.spyOn(console, 'error')
          await wallet.init()
          expect(logMock.mock.calls).toMatchInlineSnapshot(`
            [
              [
                "
            ---
            Beware, you opened the ethereum-recovery app instead of the Celo app. We cannot ensure the safety of using this SDK with ethereum-recovery. USE AT YOUR OWN RISK.
            ---
            ",
              ],
            ]
          `)
        })
      })
      describe('with the ethereum app', () => {
        beforeEach(() => {
          wallet = new LedgerWallet({}, [0, 1, 2, 3], ETHEREUM_DERIVATION_PATH, [6, 7, 8])
          mockLedger(wallet, mockForceValidation, { name: 'ethereum' })
        })
        it('shows warning on initialization but still initalizes', async () => {
          const warnMock = jest.spyOn(console, 'warn')
          await wallet.init()
          expect(warnMock.mock.calls).toMatchInlineSnapshot(`
            [
              [
                "Beware, you opened the Ethereum app instead of the Celo app. Some features may not work correctly, including token transfers.",
              ],
            ]
          `)
        })
      })
    })
  })

  describe('after initializing', () => {
    let currentAppName: string

    beforeEach(async () => {
      if (USE_PHYSICAL_LEDGER) {
        wallet = hardwareWallet
      }
      await wallet.init()
      if (USE_PHYSICAL_LEDGER) {
        knownAddress = wallet.getAccounts()[0] as StrongAddress
        otherAddress = wallet.getAccounts()[1] as StrongAddress
      }

      // @ts-expect-error
      currentAppName = await wallet.retrieveAppName()
      console.log(currentAppName)
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
            await expect(
              wallet.signTransaction(celoTransaction)
            ).rejects.toThrowErrorMatchingInlineSnapshot(
              `"Could not find address 0x45984831e3614fe5e06cd23b8f7f5c381e32b8ff"`
            )
          })

          test(
            'fails calling signPersonalMessage',
            async () => {
              const hexStr: string = '0xa1'
              await expect(
                wallet.signPersonalMessage(unknownAddress, hexStr)
              ).rejects.toThrowErrorMatchingInlineSnapshot(
                `"Could not find address 0x45984831e3614fe5e06cd23b8f7f5c381e32b8ff"`
              )
            },
            TEST_TIMEOUT_IN_MS
          )

          test(
            'fails calling signTypedData',
            async () => {
              await expect(
                wallet.signTypedData(unknownAddress, TYPED_DATA)
              ).rejects.toThrowErrorMatchingInlineSnapshot(
                `"Could not find address 0x45984831e3614fe5e06cd23b8f7f5c381e32b8ff"`
              )
            },
            TEST_TIMEOUT_IN_MS
          )
        })

        describe('using a known address', () => {
          beforeEach(() => {
            celoTransaction = {
              ...celoTransaction,
              from: knownAddress,
              to: knownAddress,
            }
          })

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

            describe('succeeds on cel2 (when ledger version is above minimum)', () => {
              test(
                'v=0',
                async () => {
                  const signed = await wallet.signTransaction({
                    // produces a v=0
                    ...celoTransaction,
                  })
                  expect(signed).not.toBeUndefined()
                  const [_txParams, address] = recoverTransaction(signed.raw)
                  expect(address.toLowerCase()).toBe(wallet.getAccounts()[0].toLowerCase())
                },
                TEST_TIMEOUT_IN_MS
              )
              test(
                'v=1',
                async () => {
                  const signed = await wallet.signTransaction({
                    ...celoTransaction,
                    // produces a v=1 according to device or nah, possibly
                    // unique to nico's device?
                    nonce: USE_PHYSICAL_LEDGER ? 2 : 101,
                  })
                  expect(signed).not.toBeUndefined()
                  const [_txParams, address] = recoverTransaction(signed.raw)
                  expect(address.toLowerCase()).toBe(wallet.getAccounts()[0].toLowerCase())
                },
                TEST_TIMEOUT_IN_MS
              )
            })
            //
            test(
              'fails on cel2 (when ledger version is below minimum)',
              async () => {
                wallet = new LedgerWallet(
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  AddressValidation.never
                )
                mockForceValidation = jest.fn((): void => {
                  // do nothing
                })
                mockLedger(wallet, mockForceValidation, {
                  version: LedgerWallet.MIN_VERSION_TOKEN_DATA,
                })
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
                const signedTx: EncodedTransaction =
                  await wallet.signTransaction(celoTransactionZeroPrefix)
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
          hardwareDescribe('with new ledger app', () => {
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

        syntheticDescribe('[cip64] synthetic', () => {
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
              feeCurrency: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
            }
          })

          test(
            'succeeds',
            async () => {
              jest
                .spyOn(wallet.ledger!, 'provideERC20TokenInformation')
                .mockImplementation(() => Promise.resolve(true))

              await expect(wallet.signTransaction(celoTransaction)).resolves.toMatchInlineSnapshot(`
                  {
                    "raw": "0x7bf87f82aef38063636394588e4b68193001e4d10928660ab4165b813717c0880de0b6b3a764000080c094874069fa1eb16d44d622f2e0ca25eea172369bc101a0254f952c5223c30039f7f845778d7aac558464ce2971fd09883df34913eb6dfca037a78571ae1a44d86bac7269e3a845990a49ad5fb60a5ec1fcaba428693558c0",
                    "tx": {
                      "accessList": [],
                      "feeCurrency": "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
                      "gas": "0x63",
                      "hash": "0xdc8347423b5310ed64e46a9abb49cd455e8049f838f93752afd122ae938e53c9",
                      "input": "0x",
                      "maxFeePerGas": "0x63",
                      "maxPriorityFeePerGas": "0x63",
                      "nonce": "0",
                      "r": "0x254f952c5223c30039f7f845778d7aac558464ce2971fd09883df34913eb6dfc",
                      "s": "0x37a78571ae1a44d86bac7269e3a845990a49ad5fb60a5ec1fcaba428693558c0",
                      "to": "0x588e4b68193001e4d10928660ab4165b813717c0",
                      "v": "0x01",
                      "value": "0x0de0b6b3a7640000",
                    },
                    "type": "cip64",
                  }
                `)

              expect(wallet.ledger!.provideERC20TokenInformation).toHaveBeenCalledWith(
                `06612063555344874069fa1eb16d44d622f2e0ca25eea172369bc1000000120000aef33045022100a885480c357fd6ec64ed532656a7e988198fdf4e2cf4632408f2d65561189872022009fd78725055fc68af16e151516ba29625e3e1c74ceab3da1bcabd6015e3f6e8`
              )
            },
            TEST_TIMEOUT_IN_MS
          )
        })

        hardwareDescribe('[cip64] device', () => {
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
              feeCurrency: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
            }
          })

          test(
            'succeeds',
            async () => {
              jest.spyOn(wallet.ledger!, 'provideERC20TokenInformation')
              const tx = await wallet.signTransaction(celoTransaction)
              // @ts-expect-error
              expect(tx.type).toBe('cip64')
              expect(tx.tx.nonce).toBe('0')
              expect(BigInt(tx.tx.value)).toBe(BigInt(celoTransaction.value as string))
              const v = parseInt(tx.tx.v, 16)
              expect(v === 0 || v === 1).toBe(true)
              // @ts-expect-error
              expect(tx.tx.feeCurrency.toLowerCase()).toBe(
                celoTransaction.feeCurrency?.toLowerCase()
              )
              expect(recoverTransaction(tx.raw)[1].toLowerCase()).toBe(
                wallet.getAccounts()[0].toLowerCase()
              )

              expect(wallet.ledger!.provideERC20TokenInformation).toHaveBeenCalledWith(
                `06612063555344874069fa1eb16d44d622f2e0ca25eea172369bc1000000120000aef33045022100a885480c357fd6ec64ed532656a7e988198fdf4e2cf4632408f2d65561189872022009fd78725055fc68af16e151516ba29625e3e1c74ceab3da1bcabd6015e3f6e8`
              )
            },
            TEST_TIMEOUT_IN_MS
          )
        })

        describe.skip('[cip66]', () => {
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
              feeCurrency: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
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
        test(
          'succeeds',
          async () => {
            if (currentAppName === 'celo') {
              await expect(
                wallet.signTypedData(knownAddress, TYPED_DATA)
              ).rejects.toMatchInlineSnapshot(`[Error: Not implemented as of this release.]`)
            } else {
              const signedMessage = await wallet.signTypedData(knownAddress, TYPED_DATA)
              expect(signedMessage).not.toBeUndefined()
              const valid = verifyEIP712TypedDataSigner(TYPED_DATA, signedMessage, knownAddress)
              expect(valid).toBeTruthy()
            }
          },
          TEST_TIMEOUT_IN_MS
        )
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
        wallet = new LedgerWallet({}, undefined, undefined, undefined, AddressValidation.never)
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
        wallet = new LedgerWallet(
          {},
          undefined,
          undefined,
          undefined,
          AddressValidation.initializationOnly
        )
        mockForceValidation = jest.fn((): void => {
          // do nothing
        })
        mockLedger(wallet, mockForceValidation, { version: '0.0.0' })
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
        wallet = new LedgerWallet(
          {},
          undefined,
          undefined,
          undefined,
          AddressValidation.initializationOnly
        )
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
        wallet = new LedgerWallet(
          {},
          undefined,
          undefined,
          undefined,
          AddressValidation.everyTransaction
        )
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
          {},
          undefined,
          undefined,
          undefined,
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
