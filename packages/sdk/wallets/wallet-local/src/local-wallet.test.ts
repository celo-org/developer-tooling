/* eslint @typescript-eslint/no-floating-promises: off */
import { StrongAddress } from '@celo/base/lib/address'
import { CeloTx, EncodedTransaction, Hex } from '@celo/connect'
import {
  normalizeAddressWith0x,
  privateKeyToAddress,
  privateKeyToPublicKey,
  trimLeading0x,
} from '@celo/utils/lib/address'
import { Encrypt } from '@celo/utils/lib/ecies'
import { verifySignature } from '@celo/utils/lib/signatureUtils'
import { recoverTransaction, verifyEIP712TypedDataSigner } from '@celo/wallet-base'
import { TransactionSerializableEIP1559, parseTransaction } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import Web3 from 'web3'
import { LocalWallet } from './local-wallet'

const CHAIN_ID = 44378

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

const PRIVATE_KEY1 = '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
const PUBLIC_KEY1 = privateKeyToPublicKey(PRIVATE_KEY1)
const ACCOUNT_ADDRESS1 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY1))
const PRIVATE_KEY2 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890fdeccc'
const ACCOUNT_ADDRESS2 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY2))

const CURRENCY_ADDRESS = ACCOUNT_ADDRESS2

describe('Local wallet class', () => {
  let wallet: LocalWallet

  beforeEach(() => {
    wallet = new LocalWallet()
  })

  test('starts with no accounts', () => {
    expect(wallet.getAccounts().length).toBe(0)
  })

  test('fails if you add an invalid private key', () => {
    try {
      wallet.addAccount('this is not a valid private key')
      throw new Error('Expected exception to be thrown')
    } catch (e: any) {
      expect(e.message).toBe('Expected 32 bytes of private key')
    }
  })

  test('succeeds if you add an private key without 0x', () => {
    wallet.addAccount(PRIVATE_KEY1)
    expect(wallet.hasAccount(ACCOUNT_ADDRESS1)).toBeTruthy()
  })

  test('succeeds if you add an private key with 0x', () => {
    wallet.addAccount(PRIVATE_KEY2)
    expect(wallet.hasAccount(ACCOUNT_ADDRESS2)).toBeTruthy()
  })

  describe('with an account', () => {
    const knownAddress = ACCOUNT_ADDRESS1
    const otherAddress = ACCOUNT_ADDRESS2

    beforeEach(() => {
      wallet.addAccount(PRIVATE_KEY1)
    })

    test('all address can be retrieved', () => {
      expect(wallet.getAccounts()).toMatchObject([ACCOUNT_ADDRESS1])
    })

    describe('signing', () => {
      describe('using an unknown address', () => {
        let celoTransaction: CeloTx
        const unknownAddress: string = ACCOUNT_ADDRESS2

        beforeEach(() => {
          celoTransaction = {
            from: unknownAddress,
            to: unknownAddress,
            chainId: 2,
            value: Web3.utils.toWei('1', 'ether'),
            nonce: 0,
            gas: '10',
            maxFeePerGas: '99',
            maxPriorityFeePerGas: '99',
            feeCurrency: CURRENCY_ADDRESS,
            data: '0xabcdef',
          }
        })

        test('fails calling signTransaction', async () => {
          await expect(
            wallet.signTransaction(celoTransaction)
          ).rejects.toThrowErrorMatchingInlineSnapshot(
            `"Could not find address 0x588e4b68193001e4d10928660ab4165b813717c0"`
          )
        })

        test('fails calling signPersonalMessage', async () => {
          const hexStr: string = '0xa1'
          await expect(
            wallet.signPersonalMessage(unknownAddress, hexStr)
          ).rejects.toThrowErrorMatchingInlineSnapshot(
            `"Could not find address 0x588e4b68193001e4d10928660ab4165b813717c0"`
          )
        })

        test('fails calling signTypedData', async () => {
          await expect(
            wallet.signTypedData(unknownAddress, TYPED_DATA)
          ).rejects.toThrowErrorMatchingInlineSnapshot(
            `"Could not find address 0x588e4b68193001e4d10928660ab4165b813717c0"`
          )
        })
      })

      describe('using a known address', () => {
        describe('when calling signTransaction', () => {
          let celoTransactionWithGasPrice: CeloTx

          beforeEach(() => {
            celoTransactionWithGasPrice = {
              from: knownAddress,
              to: otherAddress,
              chainId: CHAIN_ID,
              value: Web3.utils.toWei('1', 'ether'),
              nonce: 0,
              gas: '10',
              gasPrice: '99',
              data: '0xabcdef' as const,
            }
          })
          describe('when gasPrice and feeCurrency are both provided', () => {
            test('throws error', async () => {
              const tx = {
                ...celoTransactionWithGasPrice,
                feeCurrency: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826' as StrongAddress,
              }
              await expect(wallet.signTransaction(tx)).rejects.toMatchInlineSnapshot(
                `[Error: Cannot serialize both "gasPrice" and "feeCurrency" together. To keep "feeCurrency", replace "gasPrice" with "maxFeePerGas". To keep "gasPrice" and send a type 0 transaction remove "feeCurrency"]`
              )
            })
          })

          test('succeeds with eth-legacy', async () => {
            await expect(wallet.signTransaction(celoTransactionWithGasPrice)).resolves
              .toMatchInlineSnapshot(`
              {
                "raw": "0xf86b80630a94588e4b68193001e4d10928660ab4165b813717c0880de0b6b3a764000083abcdef83015ad7a0c6f2c698f9952bc121b64496b60aa019863388f1542f5e10271ea89d0a19682ca01f270cf24f9d16d7be5e38b52b4ba9c2d8ac73d77ba8ca28142544dee5803ba7",
                "tx": {
                  "gas": "0x0a",
                  "gasPrice": "0x63",
                  "hash": "0x59f4ff742a8b1f8eb1ad3e36fed4df3895da6b071dfaa858144a94c65f1fa8e3",
                  "input": "0xabcdef",
                  "nonce": "0",
                  "r": "0xc6f2c698f9952bc121b64496b60aa019863388f1542f5e10271ea89d0a19682c",
                  "s": "0x1f270cf24f9d16d7be5e38b52b4ba9c2d8ac73d77ba8ca28142544dee5803ba7",
                  "to": "0x588e4b68193001e4d10928660ab4165b813717c0",
                  "v": "0x015ad7",
                  "value": "0x0de0b6b3a7640000",
                },
                "type": "ethereum-legacy",
              }
            `)
          })

          test('succeeds with eip1559', async () => {
            const transaction1559 = {
              ...celoTransactionWithGasPrice,
              gasPrice: undefined,
              feeCurrency: undefined,
              maxFeePerGas: '99',
              maxPriorityFeePerGas: '99',
            }
            await expect(wallet.signTransaction(transaction1559)).resolves.toMatchInlineSnapshot(`
              {
                "raw": "0x02f86d82ad5a8063630a94588e4b68193001e4d10928660ab4165b813717c0880de0b6b3a764000083abcdefc080a02c61b97c545c0a59732adbc497e944818da323a508930996383751d17e0b932ea015666dce65f074f12335ab78e1912f8b83fda75f05a002943459598712e6b17c",
                "tx": {
                  "accessList": [],
                  "gas": "0x0a",
                  "hash": "0xc8be0a99b8f133e843f6824d00db12b89d94e0df0cc28899021edc8924b7b2ba",
                  "input": "0xabcdef",
                  "maxFeePerGas": "0x63",
                  "maxPriorityFeePerGas": "0x63",
                  "nonce": "0",
                  "r": "0x2c61b97c545c0a59732adbc497e944818da323a508930996383751d17e0b932e",
                  "s": "0x15666dce65f074f12335ab78e1912f8b83fda75f05a002943459598712e6b17c",
                  "to": "0x588e4b68193001e4d10928660ab4165b813717c0",
                  "v": "0x",
                  "value": "0x0de0b6b3a7640000",
                },
                "type": "eip1559",
              }
            `)
          })

          test('matches behavior of viem 1559', async () => {
            const account = privateKeyToAccount(PRIVATE_KEY2)
            const wallet2 = new LocalWallet()
            // wallet 1 uses a private key that does not start with 0x which doesnt work for viem
            wallet2.addAccount(PRIVATE_KEY2)

            const transaction1559 = {
              ...celoTransactionWithGasPrice,
              from: ACCOUNT_ADDRESS2,
              to: otherAddress,
              gasPrice: undefined,
              feeCurrency: undefined,
              maxFeePerGas: '99',
              maxPriorityFeePerGas: '99',
              data: celoTransactionWithGasPrice.data as Hex,
            }
            const transaction1559Viem: TransactionSerializableEIP1559 = {
              ...transaction1559,
              type: 'eip1559',
              gas: BigInt(transaction1559.gas as string),
              to: transaction1559.to as StrongAddress,
              value: BigInt(transaction1559.value as string),
              maxFeePerGas: BigInt(transaction1559.maxFeePerGas as string),
              maxPriorityFeePerGas: BigInt(transaction1559.maxPriorityFeePerGas as string),
              accessList: undefined,
              chainId: celoTransactionWithGasPrice.chainId as number,
            }
            const signedTransaction = await wallet2.signTransaction(transaction1559)
            const viemSignedTransaction = await account.signTransaction(transaction1559Viem)

            expect(parseTransaction(signedTransaction.raw)).toEqual(
              parseTransaction(viemSignedTransaction)
            )
            expect(recoverTransaction(signedTransaction.raw)).toEqual(
              recoverTransaction(viemSignedTransaction)
            )
            expect(signedTransaction.raw).toEqual(viemSignedTransaction)
          })
          test('succeeds with cip64', async () => {
            const recoverTransactionCIP64 = {
              ...celoTransactionWithGasPrice,
              gasPrice: undefined,
              maxFeePerGas: '99',
              maxPriorityFeePerGas: '99',
              feeCurrency: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
            } as const
            await expect(wallet.signTransaction(recoverTransactionCIP64)).resolves
              .toMatchInlineSnapshot(`
              {
                "raw": "0x7bf88282ad5a8063630a94588e4b68193001e4d10928660ab4165b813717c0880de0b6b3a764000083abcdefc094cd2a3d9f938e13cd947ec05abc7fe734df8dd82680a091b5504a59e529e7efa42dbb97fbc3311a91d035c873a94ab0789441fc989f84a02e8254d6b3101b63417e5d496833bc84f4832d4a8bf8a2b83e291d8f38c0f62d",
                "tx": {
                  "accessList": [],
                  "feeCurrency": "0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826",
                  "gas": "0x0a",
                  "hash": "0x645afc1d19fe805c0c0956e70d5415487bf073741d7b297ccb7e7040c6ce5df6",
                  "input": "0xabcdef",
                  "maxFeePerGas": "0x63",
                  "maxPriorityFeePerGas": "0x63",
                  "nonce": "0",
                  "r": "0x91b5504a59e529e7efa42dbb97fbc3311a91d035c873a94ab0789441fc989f84",
                  "s": "0x2e8254d6b3101b63417e5d496833bc84f4832d4a8bf8a2b83e291d8f38c0f62d",
                  "to": "0x588e4b68193001e4d10928660ab4165b813717c0",
                  "v": "0x",
                  "value": "0x0de0b6b3a7640000",
                },
                "type": "cip64",
              }
            `)
          })

          test('ignores invalid fields', async () => {
            const transaction42 = {
              ...celoTransactionWithGasPrice,
              gasPrice: undefined,
              maxFeePerGas: '99',
              maxPriorityFeePerGas: '99',
              // invalid field
              gatewayFee: '0x5678',
              feeCurrency: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
            } as const
            await expect(wallet.signTransaction(transaction42)).resolves.toMatchInlineSnapshot(`
              {
                "raw": "0x7bf88282ad5a8063630a94588e4b68193001e4d10928660ab4165b813717c0880de0b6b3a764000083abcdefc094cd2a3d9f938e13cd947ec05abc7fe734df8dd82680a091b5504a59e529e7efa42dbb97fbc3311a91d035c873a94ab0789441fc989f84a02e8254d6b3101b63417e5d496833bc84f4832d4a8bf8a2b83e291d8f38c0f62d",
                "tx": {
                  "accessList": [],
                  "feeCurrency": "0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826",
                  "gas": "0x0a",
                  "hash": "0x645afc1d19fe805c0c0956e70d5415487bf073741d7b297ccb7e7040c6ce5df6",
                  "input": "0xabcdef",
                  "maxFeePerGas": "0x63",
                  "maxPriorityFeePerGas": "0x63",
                  "nonce": "0",
                  "r": "0x91b5504a59e529e7efa42dbb97fbc3311a91d035c873a94ab0789441fc989f84",
                  "s": "0x2e8254d6b3101b63417e5d496833bc84f4832d4a8bf8a2b83e291d8f38c0f62d",
                  "to": "0x588e4b68193001e4d10928660ab4165b813717c0",
                  "v": "0x",
                  "value": "0x0de0b6b3a7640000",
                },
                "type": "cip64",
              }
            `)
          })

          test('with same signer', async () => {
            const signedTx: EncodedTransaction = await wallet.signTransaction(
              celoTransactionWithGasPrice
            )
            const [, recoveredSigner] = recoverTransaction(signedTx.raw)
            expect(normalizeAddressWith0x(recoveredSigner)).toBe(
              normalizeAddressWith0x(knownAddress)
            )
          })

          // https://github.com/ethereum/go-ethereum/blob/38aab0aa831594f31d02c9f02bfacc0bef48405d/rlp/decode.go#L664
          test('signature with 0x00 prefix is canonicalized', async () => {
            // This tx is carefully constructed to produce an S value with the first byte as 0x00
            const celoTransactionZeroPrefix = {
              from: ACCOUNT_ADDRESS1,
              to: ACCOUNT_ADDRESS2,
              chainId: CHAIN_ID,
              value: Web3.utils.toWei('1', 'ether'),
              nonce: 65,
              gas: '10',
              gasPrice: '99',
              data: '0xabcdef',
            } as const

            const signedTx: EncodedTransaction = await wallet.signTransaction(
              celoTransactionZeroPrefix
            )
            expect(signedTx.tx.s.startsWith('0x00')).toBeFalsy()
            const [, recoveredSigner] = recoverTransaction(signedTx.raw)
            expect(normalizeAddressWith0x(recoveredSigner)).toBe(
              normalizeAddressWith0x(knownAddress)
            )
          })
        })
        describe('when using signTransaction with type CIP64', () => {
          let celoTransactionBase: CeloTx
          const feeCurrency = '0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f'
          const maxFeePerGas = '0x100000000'
          const maxPriorityFeePerGas = '0x100000000'

          beforeEach(() => {
            celoTransactionBase = {
              gas: '1000000000',
              from: knownAddress,
              to: otherAddress,
              chainId: CHAIN_ID,
              value: Web3.utils.toWei('1', 'ether'),
              nonce: 0,
              data: '0xabcdef',
            }
          })
          describe('when feeCurrency and maxPriorityFeePerGas and maxFeePerGas are set', () => {
            it('signs as a CIP64 tx', async () => {
              const transaction: CeloTx = {
                ...celoTransactionBase,
                feeCurrency,
                maxFeePerGas,
                maxPriorityFeePerGas,
              }
              const signedTx: EncodedTransaction = await wallet.signTransaction(transaction)
              expect(signedTx.raw).toMatch(/^0x7b/)
            })
          })

          describe('when feeCurrency and maxFeePerGas but not maxPriorityFeePerGas are set', () => {
            it('throws error', async () => {
              const transaction: CeloTx = {
                ...celoTransactionBase,
                feeCurrency,
                maxFeePerGas,
                maxPriorityFeePerGas: undefined,
              }
              expect(() =>
                wallet.signTransaction(transaction)
              ).rejects.toThrowErrorMatchingInlineSnapshot(
                `""gasPrice" or "maxFeePerGas" and "maxPriorityFeePerGas" are missing"`
              )
            })
          })

          describe('when feeCurrency and maxPriorityFeePerGas but not maxFeePerGas are set', () => {
            it('throws error', async () => {
              const transaction: CeloTx = {
                ...celoTransactionBase,
                feeCurrency,
                maxFeePerGas: undefined,
                maxPriorityFeePerGas,
              }
              expect(() =>
                wallet.signTransaction(transaction)
              ).rejects.toThrowErrorMatchingInlineSnapshot(
                `""gasPrice" or "maxFeePerGas" and "maxPriorityFeePerGas" are missing"`
              )
            })
          })

          describe('when gas and one of maxPriorityFeePerGas or maxFeePerGas are set', () => {
            it('throws explaining only one kind of gas fee can be set', async () => {
              const transaction: CeloTx = {
                ...celoTransactionBase,
                maxFeePerGas,
                maxPriorityFeePerGas,
                gasPrice: '0x100000000',
              }
              expect(async () => wallet.signTransaction(transaction)).rejects.toThrowError(
                'when "maxFeePerGas" or "maxPriorityFeePerGas" are set, "gasPrice" must not be set'
              )
            })
          })

          describe('when maxPriorityFeePerGas / maxFeePerGas are set but not feeCurrency', () => {
            it('signs as a EIP1559 tx', async () => {
              const transaction: CeloTx = {
                ...celoTransactionBase,
                maxFeePerGas,
                maxPriorityFeePerGas,
              }
              const signedTx: EncodedTransaction = await wallet.signTransaction(transaction)
              expect(signedTx.raw).toMatch(/^0x02/)
            })
          })
        })

        describe('when calling signPersonalMessage', () => {
          test('succeeds', async () => {
            const hexStr: string = ACCOUNT_ADDRESS1
            const signedMessage = await wallet.signPersonalMessage(knownAddress, hexStr)
            expect(signedMessage).not.toBeUndefined()
            const valid = verifySignature(hexStr, signedMessage, knownAddress)
            expect(valid).toBeTruthy()
          })
        })

        describe('when calling signTypedData', () => {
          test('succeeds', async () => {
            const signedMessage = await wallet.signTypedData(knownAddress, TYPED_DATA)
            expect(signedMessage).not.toBeUndefined()
            const valid = verifyEIP712TypedDataSigner(TYPED_DATA, signedMessage, knownAddress)
            expect(valid).toBeTruthy()
          })
        })
      })
    })

    describe('decryption', () => {
      describe('using an unknown address', () => {
        test('fails calling decrypt', async () => {
          await expect(
            wallet.decrypt(ACCOUNT_ADDRESS2, Buffer.from('anything'))
          ).rejects.toThrowError()
        })
      })

      describe('using a known address', () => {
        test('properly decrypts the ciphertext', async () => {
          const plaintext = 'test_plaintext'
          const ciphertext = Encrypt(
            Buffer.from(trimLeading0x(PUBLIC_KEY1), 'hex'),
            Buffer.from(plaintext)
          )
          const decryptedPlaintext = await wallet.decrypt(ACCOUNT_ADDRESS1, ciphertext)
          expect(decryptedPlaintext.toString()).toEqual(plaintext)
        })
      })
    })
  })
})
