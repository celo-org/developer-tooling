import { CeloTx } from '@celo/connect'
import { normalizeAddressWith0x, privateKeyToAddress } from '@celo/utils/lib/address'
import { hexToBytes } from '@noble/hashes/utils'
import { parseTransaction, serializeTransaction } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { celo } from 'viem/chains'
import Web3 from 'web3'
import {
  encode_deprecated_celo_legacy_type_only_for_temporary_ledger_compat,
  extractSignature,
  getSignerFromTxEIP2718TX,
  handleBigInt,
  handleData,
  handleHexString,
  handleNumber,
  isPriceToLow,
  recoverTransaction,
  rlpEncodedTx,
  stringNumberOrBNToHex,
} from './signing-utils'
const PRIVATE_KEY1 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
const ACCOUNT_ADDRESS1 = normalizeAddressWith0x(privateKeyToAddress(PRIVATE_KEY1)) as `0x${string}`

describe('rlpEncodedTx', () => {
  describe('when no gas fields are provided', () => {
    it('throws an error', () => {
      expect(() => rlpEncodedTx({})).toThrowErrorMatchingInlineSnapshot(`""gas" is missing"`)
    })
  })

  describe('Ethereum legacy', () => {
    const legacyTransaction = {
      from: '0x1daf825EB5C0D9d9FeC33C444e413452A08e04A6',
      to: '0x43d72ff17701b2da814620735c39c620ce0ea4a1',
      chainId: 42220,
      value: Web3.utils.toWei('0', 'ether'),
      nonce: 619,
      gas: '504830',
      gasPrice: '5000000000',
      data: '0x4e71d92d',
    }
    it('convert CeloTx into RLP', () => {
      const transaction = {
        ...legacyTransaction,
      }
      const result = rlpEncodedTx(transaction)
      expect(result).toMatchInlineSnapshot(`
        {
          "rlpEncode": "0xed82026b85012a05f2008307b3fe9443d72ff17701b2da814620735c39c620ce0ea4a180844e71d92d82a4ec8080",
          "transaction": {
            "chainId": 42220,
            "data": "0x4e71d92d",
            "from": "0x1daf825eb5c0d9d9fec33c444e413452a08e04a6",
            "gas": "0x07b3fe",
            "gasPrice": "0x012a05f200",
            "maxFeePerGas": "0x",
            "maxPriorityFeePerGas": "0x",
            "nonce": 619,
            "to": "0x43d72ff17701b2da814620735c39c620ce0ea4a1",
            "value": "0x",
          },
          "type": "ethereum-legacy",
        }
      `)
    })
  })

  describe('EIP1559 / CIP42', () => {
    const eip1559Transaction: CeloTx = {
      from: ACCOUNT_ADDRESS1,
      to: ACCOUNT_ADDRESS1,
      chainId: 2,
      value: Web3.utils.toWei('1000', 'ether'),
      nonce: 0,
      maxFeePerGas: '10',
      maxPriorityFeePerGas: '99',
      gas: '99',
      data: '0xabcdef',
    }

    describe('when maxFeePerGas is to low', () => {
      it('throws an error', () => {
        const transaction = {
          ...eip1559Transaction,
          maxFeePerGas: Web3.utils.toBN('-5'),
        }
        expect(() => rlpEncodedTx(transaction)).toThrowErrorMatchingInlineSnapshot(
          `"GasPrice or maxFeePerGas or maxPriorityFeePerGas is less than than 0"`
        )
      })
    })
    describe('when maxPriorityFeePerGas is to low', () => {
      it('throws an error', () => {
        const transaction = {
          ...eip1559Transaction,
          maxPriorityFeePerGas: Web3.utils.toBN('-5'),
        }
        expect(() => rlpEncodedTx(transaction)).toThrowErrorMatchingInlineSnapshot(
          `"GasPrice or maxFeePerGas or maxPriorityFeePerGas is less than than 0"`
        )
      })
    })

    describe('when maxFeePerGas and maxPriorityFeePerGas and feeCurrency are provided', () => {
      it('orders fields in RLP as specified by CIP64', () => {
        const CIP64Transaction = {
          ...eip1559Transaction,
          feeCurrency: '0x5409ED021D9299bf6814279A6A1411A7e866A631',
        } as const
        const result = rlpEncodedTx(CIP64Transaction)
        expect(result).toMatchInlineSnapshot(`
          {
            "rlpEncode": "0x7bf83e0280630a63941be31a94361a391bbafb2a4ccd704f57dc04d4bb893635c9adc5dea0000083abcdefc0945409ed021d9299bf6814279a6a1411a7e866a631",
            "transaction": {
              "chainId": 2,
              "data": "0xabcdef",
              "feeCurrency": "0x5409ed021d9299bf6814279a6a1411a7e866a631",
              "from": "0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb",
              "gas": "0x63",
              "maxFeePerGas": "0x0a",
              "maxPriorityFeePerGas": "0x63",
              "nonce": 0,
              "to": "0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb",
              "value": "0x3635c9adc5dea00000",
            },
            "type": "cip64",
          }
        `)
      })
    })

    describe('when maxFeeInFeeCurrency and feeCurrency are provided', () => {
      it('orders fields in RLP as specified by CIP66', () => {
        const CIP66Transaction = {
          ...eip1559Transaction,
          feeCurrency: '0x5409ED021D9299bf6814279A6A1411A7e866A631',
          maxFeeInFeeCurrency: '0x666',
        } as const
        const result = rlpEncodedTx(CIP66Transaction)
        expect(result).toMatchInlineSnapshot(`
          {
            "rlpEncode": "0x7af8410280630a63941be31a94361a391bbafb2a4ccd704f57dc04d4bb893635c9adc5dea0000083abcdefc0945409ed021d9299bf6814279a6a1411a7e866a631820666",
            "transaction": {
              "chainId": 2,
              "data": "0xabcdef",
              "feeCurrency": "0x5409ed021d9299bf6814279a6a1411a7e866a631",
              "from": "0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb",
              "gas": "0x63",
              "maxFeeInFeeCurrency": "0x0666",
              "maxFeePerGas": "0x0a",
              "maxPriorityFeePerGas": "0x63",
              "nonce": 0,
              "to": "0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb",
              "value": "0x3635c9adc5dea00000",
            },
            "type": "cip66",
          }
        `)
      })
      it('orders fields in RLP as specified by CIP66 when given BN values', () => {
        const CIP66Transaction = {
          ...eip1559Transaction,
          feeCurrency: '0x5409ED021D9299bf6814279A6A1411A7e866A631',
          maxFeeInFeeCurrency: Web3.utils.toBN('100000000010181646104615494635153636353810897'),
        } as const
        const result = rlpEncodedTx(CIP66Transaction)
        expect(result).toMatchInlineSnapshot(`
          {
            "rlpEncode": "0x7af8520280630a63941be31a94361a391bbafb2a4ccd704f57dc04d4bb893635c9adc5dea0000083abcdefc0945409ed021d9299bf6814279a6a1411a7e866a63193047bf19675d5515464c13ea56f3922e602a1d1",
            "transaction": {
              "chainId": 2,
              "data": "0xabcdef",
              "feeCurrency": "0x5409ed021d9299bf6814279a6a1411a7e866a631",
              "from": "0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb",
              "gas": "0x63",
              "maxFeeInFeeCurrency": "0x047bf19675d5515464c13ea56f3922e602a1d1",
              "maxFeePerGas": "0x0a",
              "maxPriorityFeePerGas": "0x63",
              "nonce": 0,
              "to": "0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb",
              "value": "0x3635c9adc5dea00000",
            },
            "type": "cip66",
          }
        `)
      })
      it('orders fields in RLP as specified by CIP66 when given bigInt values', () => {
        const CIP66Transaction = {
          ...eip1559Transaction,
          feeCurrency: '0x5409ED021D9299bf6814279A6A1411A7e866A631',
          maxFeeInFeeCurrency: BigInt('100000000010181646104615494635153636353810897'),
        } as const
        const result = rlpEncodedTx(CIP66Transaction)
        expect(result).toMatchInlineSnapshot(`
          {
            "rlpEncode": "0x7af8520280630a63941be31a94361a391bbafb2a4ccd704f57dc04d4bb893635c9adc5dea0000083abcdefc0945409ed021d9299bf6814279a6a1411a7e866a63193047bf19675d5515464c13ea56f3922e602a1d1",
            "transaction": {
              "chainId": 2,
              "data": "0xabcdef",
              "feeCurrency": "0x5409ed021d9299bf6814279a6a1411a7e866a631",
              "from": "0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb",
              "gas": "0x63",
              "maxFeeInFeeCurrency": "0x047bf19675d5515464c13ea56f3922e602a1d1",
              "maxFeePerGas": "0x0a",
              "maxPriorityFeePerGas": "0x63",
              "nonce": 0,
              "to": "0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb",
              "value": "0x3635c9adc5dea00000",
            },
            "type": "cip66",
          }
        `)
      })
    })

    describe('when maxFeePerGas and maxPriorityFeePerGas are provided', () => {
      it('orders fields in RLP as specified by EIP1559', () => {
        const result = rlpEncodedTx(eip1559Transaction)
        expect(result).toMatchInlineSnapshot(`
          {
            "rlpEncode": "0x02e90280630a63941be31a94361a391bbafb2a4ccd704f57dc04d4bb893635c9adc5dea0000083abcdefc0",
            "transaction": {
              "chainId": 2,
              "data": "0xabcdef",
              "from": "0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb",
              "gas": "0x63",
              "maxFeePerGas": "0x0a",
              "maxPriorityFeePerGas": "0x63",
              "nonce": 0,
              "to": "0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb",
              "value": "0x3635c9adc5dea00000",
            },
            "type": "eip1559",
          }
        `)
      })
    })
  })
  describe('compared to viem', () => {
    it('matches output of viem serializeTransaction with accessList', () => {
      const tx = {
        type: 'eip1559' as const,
        from: ACCOUNT_ADDRESS1,
        to: ACCOUNT_ADDRESS1,
        chainId: 2,
        value: Web3.utils.toWei('1000', 'ether'),
        nonce: 0,
        maxFeePerGas: '1000',
        maxPriorityFeePerGas: '99',
        gas: '9900',
        data: '0xabcdef' as const,
        accessList: [
          {
            address: '0x0000000000000000000000000000000000000000' as const,
            storageKeys: [
              '0x0000000000000000000000000000000000000000000000000000000000000001' as const,
              '0x60fdd29ff912ce880cd3edaf9f932dc61d3dae823ea77e0323f94adb9f6a72fe' as const,
            ],
          },
        ],
      }
      const txViem = {
        ...tx,
        gas: BigInt(tx.gas),
        maxFeePerGas: BigInt(tx.maxFeePerGas),
        maxPriorityFeePerGas: BigInt(tx.maxPriorityFeePerGas),
        value: BigInt(tx.value),
      }
      const viemSerialized = serializeTransaction(txViem)
      const serialized = rlpEncodedTx(tx)

      const parsedCK = parseTransaction(serialized.rlpEncode)
      const parsedViem = parseTransaction(viemSerialized)
      expect(parsedCK).toEqual(parsedViem)
      expect(serialized.rlpEncode).toEqual(viemSerialized)
    })
    it('matches output of viem serializeTransaction without accessList', () => {
      const tx = {
        type: 'eip1559' as const,
        from: ACCOUNT_ADDRESS1,
        to: ACCOUNT_ADDRESS1,
        chainId: 2,
        value: Web3.utils.toWei('1000', 'ether'),
        nonce: 0,
        maxFeePerGas: '1000',
        maxPriorityFeePerGas: '99',
        gas: '9900',
        data: '0xabcdef' as const,
      }
      const txViem = {
        ...tx,
        gas: BigInt(tx.gas),
        maxFeePerGas: BigInt(tx.maxFeePerGas),
        maxPriorityFeePerGas: BigInt(tx.maxPriorityFeePerGas),
        value: BigInt(tx.value),
      }
      const viemSerialized = serializeTransaction(txViem)
      const serialized = rlpEncodedTx(tx)

      const parsedCK = parseTransaction(serialized.rlpEncode)
      const parsedViem = parseTransaction(viemSerialized)
      expect(parsedCK).toEqual(parsedViem)
      expect(serialized.rlpEncode).toEqual(viemSerialized)
    })
  })
})

describe('encode_deprecated_celo_legacy_type_only_for_temporary_ledger_compat', () => {
  test('serializes the deprecated tx type correctly', () => {
    const legacyTransaction = {
      feeCurrency: '0x5409ED021D9299bf6814279A6A1411A7e866A631',
      from: ACCOUNT_ADDRESS1,
      to: ACCOUNT_ADDRESS1,
      chainId: 2,
      value: Web3.utils.toWei('1000', 'ether'),
      nonce: 1,
      gas: '1500000000',
      gasPrice: '9900000000',
      data: '0xabcdef',
    } as const

    const result =
      encode_deprecated_celo_legacy_type_only_for_temporary_ledger_compat(legacyTransaction)
    expect(result).toMatchInlineSnapshot(`
      {
        "rlpEncode": "0xf8490185024e1603008459682f00945409ed021d9299bf6814279a6a1411a7e866a6318080941be31a94361a391bbafb2a4ccd704f57dc04d4bb893635c9adc5dea0000083abcdef028080",
        "transaction": {
          "chainId": 2,
          "data": "0xabcdef",
          "feeCurrency": "0x5409ed021d9299bf6814279a6a1411a7e866a631",
          "from": "0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb",
          "gas": "0x59682f00",
          "gasPrice": "0x024e160300",
          "gatewayFee": "0x",
          "gatewayFeeRecipient": "0x",
          "nonce": 1,
          "to": "0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb",
          "value": "0x3635c9adc5dea00000",
        },
        "type": "celo-legacy",
      }
    `)
  })
})

function ckToViem(tx: CeloTx & { v?: number }) {
  return {
    ...tx,
    gas: BigInt(tx.gas! as string),
    maxFeePerGas: BigInt(tx.maxFeePerGas?.toString()!),
    maxPriorityFeePerGas: BigInt(tx.maxPriorityFeePerGas?.toString()!),
    value: BigInt(tx.value?.toString()!),
    v: BigInt(tx.v?.toString()! === '0x' ? 0 : tx.v?.toString()!),
  }
}

describe('recoverTransaction', () => {
  describe('with EIP1559 transactions', () => {
    test('ok', async () => {
      const account = privateKeyToAccount(PRIVATE_KEY1)
      const hash = await account.signTransaction({
        type: 'eip1559' as const,
        from: ACCOUNT_ADDRESS1,
        to: ACCOUNT_ADDRESS1 as `0x${string}`,
        chainId: 2,
        value: BigInt(1000),
        nonce: 0,
        maxFeePerGas: BigInt('1000'),
        maxPriorityFeePerGas: BigInt('99'),
        gas: BigInt('9900'),
        data: '0xabcdef' as const,
      })

      const [transaction, signer] = recoverTransaction(hash)
      expect(signer.toLowerCase()).toEqual(ACCOUNT_ADDRESS1.toLowerCase())
      expect(transaction).toMatchInlineSnapshot(`
        {
          "accessList": [],
          "chainId": 2,
          "data": "0xabcdef",
          "gas": 9900,
          "maxFeePerGas": 1000,
          "maxPriorityFeePerGas": 99,
          "nonce": 0,
          "r": "0x04ddb2c87a6e0f77aa25da7439c72f978541f74fa1bd20becf2e109301d2f85c",
          "s": "0x2d91eec5c0abca75d4df8322677bf43306e90172b77914494bbb7641b6dfc7e9",
          "to": "0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb",
          "type": "eip1559",
          "v": 28,
          "value": 1000,
          "yParity": 1,
        }
      `)
    })

    it('matches output of viem parseTransaction', () => {
      const encodedByCK1559TX =
        // from packages/sdk/wallets/wallet-local/src/local-wallet.test.ts:211 -- when calling signTransaction succeeds with eip1559
        '0x02f86d82ad5a8063630a94588e4b68193001e4d10928660ab4165b813717c0880de0b6b3a764000083abcdefc080a02c61b97c545c0a59732adbc497e944818da323a508930996383751d17e0b932ea015666dce65f074f12335ab78e1912f8b83fda75f05a002943459598712e6b17c'
      const [transaction, signer] = recoverTransaction(encodedByCK1559TX)
      const parsed = parseTransaction(encodedByCK1559TX)

      expect(ckToViem(transaction)).toMatchObject(parsed)
      expect(signer).toMatchInlineSnapshot(`"0x1Be31A94361a391bBaFB2a4CCd704F57dc04d4bb"`)
    })
    it('can recover (parse) transactions signed by viem', () => {
      // stolen from viems's default eip1559 test result viem/src/accounts/utils/signTransaction.test.ts
      const encodedByViem1559TX =
        '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33'
      const recovered = recoverTransaction(encodedByViem1559TX)
      expect(recovered).toMatchInlineSnapshot(`
        [
          {
            "accessList": [],
            "chainId": 1,
            "data": "0x",
            "gas": 21000,
            "maxFeePerGas": 0,
            "maxPriorityFeePerGas": 0,
            "nonce": 785,
            "r": "0x4012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1",
            "s": "0x4e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33",
            "to": "0x",
            "type": "eip1559",
            "v": 27,
            "value": 0,
            "yParity": 0,
          },
          "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        ]
      `)
    })
  })
  it('handles celo-legacy transactions', () => {
    const celoLegacyTx =
      '0xf88480630a80941be31a94361a391bbafb2a4ccd704f57dc04d4bb82567894588e4b68193001e4d10928660ab4165b813717c0880de0b6b3a764000083abcdef83015ad8a09e121a99dc0832a9f4d1d71500b3c8a69a3c064d437c225d6292577ffcc45a71a02c5efa3c4b58953c35968e42d11d3882dacacf45402ee802824268b7cd60daff'
    expect(recoverTransaction(celoLegacyTx)).toMatchInlineSnapshot(`
      [
        {
          "chainId": "0xad5a",
          "data": "0xabcdef",
          "feeCurrency": "0x",
          "gas": 10,
          "gasPrice": 99,
          "gatewayFee": "0x5678",
          "gatewayFeeRecipient": "0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb",
          "nonce": 0,
          "to": "0x588e4b68193001e4d10928660ab4165b813717c0",
          "type": "celo-legacy",
          "value": "0x0de0b6b3a7640000",
        },
        "0x1Be31A94361a391bBaFB2a4CCd704F57dc04d4bb",
      ]
    `)
  })
  it('handles ethereum-legacy transactions', () => {
    const ethereumLegacyTx =
      '0xf86e82026b85012a05f2008307b3fe9443d72ff17701b2da814620735c39c620ce0ea4a180844e71d92d830149fba0f616cf0a105a0b117b178f6aaa5dc79b9b2aa3898811f99a8f48fb70cece8a33a032a158ab09e32747044e62bd3facd9abd746df23df306dbc31305668da2c7937'
    expect(recoverTransaction(ethereumLegacyTx)).toMatchInlineSnapshot(`
      [
        {
          "chainId": "0xa4ec",
          "data": "0x4e71d92d",
          "gas": 504830,
          "gasPrice": 5000000000,
          "nonce": 619,
          "to": "0x43d72ff17701b2da814620735c39c620ce0ea4a1",
          "type": "ethereum-legacy",
          "value": "0x",
        },
        "0x1daf825EB5C0D9d9FeC33C444e413452A08e04A6",
      ]
    `)
  })
  it('handles cip64 transactions', () => {
    const cip64TX =
      '0x7bf88282ad5a8063630a94588e4b68193001e4d10928660ab4165b813717c0880de0b6b3a764000083abcdefc094cd2a3d9f938e13cd947ec05abc7fe734df8dd82680a091b5504a59e529e7efa42dbb97fbc3311a91d035c873a94ab0789441fc989f84a02e8254d6b3101b63417e5d496833bc84f4832d4a8bf8a2b83e291d8f38c0f62d'
    expect(recoverTransaction(cip64TX)).toMatchInlineSnapshot(`
      [
        {
          "accessList": [],
          "chainId": 44378,
          "data": "0xabcdef",
          "feeCurrency": "0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826",
          "gas": 10,
          "maxFeePerGas": 99,
          "maxPriorityFeePerGas": 99,
          "nonce": 0,
          "r": "0x91b5504a59e529e7efa42dbb97fbc3311a91d035c873a94ab0789441fc989f84",
          "s": "0x2e8254d6b3101b63417e5d496833bc84f4832d4a8bf8a2b83e291d8f38c0f62d",
          "to": "0x588e4b68193001e4d10928660ab4165b813717c0",
          "type": "cip64",
          "v": 27,
          "value": 1000000000000000000,
          "yParity": 0,
        },
        "0x1Be31A94361a391bBaFB2a4CCd704F57dc04d4bb",
      ]
    `)
  })
  it('handles cip66 transactions', () => {
    const cip66TX =
      '0x7af8ce82a4ec01843b9aca00850342770c0083030d409443d72ff17701b2da814620735c39c620ce0ea4a180b844a9059cbb000000000000000000000000bd8be21f6883569ad7d15cc55c87137fcef308c300000000000000000000000000000000000000000000000001605eba271024d6c094765de816845861e75a25fca122bb6898b8b1282a8501a13b860080a02a015905a494549d8a1da26ce769309963e43f407936bbce1ea8276072b08416a072fd12d24c44bc79648bd88f4d8c158f2f0778694557868b3dc7d80e3aa6b539'
    expect(recoverTransaction(cip66TX)).toMatchInlineSnapshot(`
      [
        {
          "accessList": [],
          "chainId": 42220,
          "data": "0xa9059cbb000000000000000000000000bd8be21f6883569ad7d15cc55c87137fcef308c300000000000000000000000000000000000000000000000001605eba271024d6",
          "feeCurrency": "0x765de816845861e75a25fca122bb6898b8b1282a",
          "gas": "200000",
          "maxFeeInFeeCurrency": "0x01a13b8600",
          "maxFeePerGas": "14000000000",
          "maxPriorityFeePerGas": "1000000000",
          "nonce": 1,
          "r": "0x2a015905a494549d8a1da26ce769309963e43f407936bbce1ea8276072b08416",
          "s": "0x72fd12d24c44bc79648bd88f4d8c158f2f0778694557868b3dc7d80e3aa6b539",
          "to": "0x43d72ff17701b2da814620735c39c620ce0ea4a1",
          "type": "cip66",
          "v": 27,
          "value": "0",
          "yParity": 0,
        },
        "0xa94f5374Fce5edBC8E2a8697C15331677e6EbF0B",
      ]
    `)
  })
  it('handles cip42 transactions', () => {
    const cip42TX =
      '0x7cf89a82ad5a8063630a94cd2a3d9f938e13cd947ec05abc7fe734df8dd826941be31a94361a391bbafb2a4ccd704f57dc04d4bb82567894588e4b68193001e4d10928660ab4165b813717c0880de0b6b3a764000083abcdefc01ba0c610507b2ac3cff80dd7017419021196807d605efce0970c18cde48db33c27d1a01799477e0f601f554f0ee6f7ac21490602124801e9f7a99d9605249b90f03112'
    expect(recoverTransaction(cip42TX)).toMatchInlineSnapshot(`
      [
        {
          "accessList": [],
          "chainId": 44378,
          "data": "0xabcdef",
          "feeCurrency": "0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826",
          "gas": 10,
          "gatewayFee": "0x5678",
          "gatewayFeeRecipient": "0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb",
          "maxFeePerGas": 99,
          "maxPriorityFeePerGas": 99,
          "nonce": 0,
          "r": "0xc610507b2ac3cff80dd7017419021196807d605efce0970c18cde48db33c27d1",
          "s": "0x1799477e0f601f554f0ee6f7ac21490602124801e9f7a99d9605249b90f03112",
          "to": "0x588e4b68193001e4d10928660ab4165b813717c0",
          "type": "cip42",
          "v": 28,
          "value": 1000000000000000000,
          "yParity": 1,
        },
        "0x90AB065B949165c47Acac34cA9A43171bBeBb1E1",
      ]
    `)
  })
  test('cip42 serialized by viem', async () => {
    const account = privateKeyToAccount(PRIVATE_KEY1)
    const signed = await account.signTransaction(
      {
        // @ts-ignore -- types on viem dont quite work for setting the tx type but the actual js execution works fine
        type: 'cip42',
        accessList: [],
        chainId: 44378,
        data: '0xabcdef',
        feeCurrency: '0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826',
        gas: BigInt(10),
        gatewayFee: BigInt('0x5678'),
        gatewayFeeRecipient: '0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb',
        maxFeePerGas: BigInt(99),
        maxPriorityFeePerGas: BigInt(99),
        nonce: 0,
        to: '0x588e4b68193001e4d10928660ab4165b813717c0',
        value: BigInt(1000000000000000000),
      },
      { serializer: celo.serializers?.transaction }
    )

    expect(recoverTransaction(signed)).toMatchInlineSnapshot(`
      [
        {
          "accessList": [],
          "chainId": 44378,
          "data": "0xabcdef",
          "feeCurrency": "0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826",
          "gas": 10,
          "gatewayFee": "0x5678",
          "gatewayFeeRecipient": "0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb",
          "maxFeePerGas": 99,
          "maxPriorityFeePerGas": 99,
          "nonce": 0,
          "r": "0xc610507b2ac3cff80dd7017419021196807d605efce0970c18cde48db33c27d1",
          "s": "0x1799477e0f601f554f0ee6f7ac21490602124801e9f7a99d9605249b90f03112",
          "to": "0x588e4b68193001e4d10928660ab4165b813717c0",
          "type": "cip42",
          "v": 27,
          "value": 1000000000000000000,
          "yParity": 0,
        },
        "0x1Be31A94361a391bBaFB2a4CCd704F57dc04d4bb",
      ]
    `)
    expect(recoverTransaction(signed)[1]).toEqual(account.address)
  })
})

describe('isPriceToLow', () => {
  test('maxFee and maxPriorityFee are positive', () => {
    expect(
      isPriceToLow({
        maxFeePerGas: 1_000_000_000,
        maxPriorityFeePerGas: Web3.utils.toBN('50000000000000'),
        gasPrice: undefined,
      })
    ).toBe(false)
  })
  test('gasPrice is positive', () => {
    expect(
      isPriceToLow({
        gasPrice: Web3.utils.toBN('50000000000000'),
      })
    ).toBe(false)
  })
  test('maxFeePerGas is less than 0 but maxPriorityFeePerGas is positive ', () => {
    expect(() =>
      isPriceToLow({
        maxFeePerGas: -1,
        maxPriorityFeePerGas: 1_000_000_000,
        gasPrice: undefined,
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"GasPrice or maxFeePerGas or maxPriorityFeePerGas is less than than 0"`
    )
  })
  test('maxPriorityFeePerGas is less than 0 but maxFeePerGas is positive ', () => {
    expect(() =>
      isPriceToLow({
        maxFeePerGas: 1_000_000_000,
        maxPriorityFeePerGas: -1_000_000_000,
        gasPrice: undefined,
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"GasPrice or maxFeePerGas or maxPriorityFeePerGas is less than than 0"`
    )
  })
  test('gasPrice is less than 0', () => {
    expect(() =>
      isPriceToLow({
        maxFeePerGas: '0x',
        maxPriorityFeePerGas: '0x',
        gasPrice: -1,
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"GasPrice or maxFeePerGas or maxPriorityFeePerGas is less than than 0"`
    )
  })
})

describe('extractSignature', () => {
  it('extracts from celo legacy txs', () => {
    // packages/sdk/wallets/wallet-local/src/local-wallet.test.ts:176 (succeeds with legacy)
    const extracted = extractSignature(
      '0xf88480630a80941be31a94361a391bbafb2a4ccd704f57dc04d4bb82567894588e4b68193001e4d10928660ab4165b813717c0880de0b6b3a764000083abcdef83015ad8a09e121a99dc0832a9f4d1d71500b3c8a69a3c064d437c225d6292577ffcc45a71a02c5efa3c4b58953c35968e42d11d3882dacacf45402ee802824268b7cd60daff'
    )
    expect(extracted).toMatchInlineSnapshot(`
      {
        "r": "0x9e121a99dc0832a9f4d1d71500b3c8a69a3c064d437c225d6292577ffcc45a71",
        "s": "0x2c5efa3c4b58953c35968e42d11d3882dacacf45402ee802824268b7cd60daff",
        "v": "0x015ad8",
      }
    `)
  })
  it('extracts from cip42 txs', () => {
    // packages/sdk/wallets/wallet-local/src/local-wallet.test.ts:274 (succeeds with cip42)
    const extracted = extractSignature(
      '0x7cf89a82ad5a8063630a94cd2a3d9f938e13cd947ec05abc7fe734df8dd826941be31a94361a391bbafb2a4ccd704f57dc04d4bb82567894588e4b68193001e4d10928660ab4165b813717c0880de0b6b3a764000083abcdefc01ba0c610507b2ac3cff80dd7017419021196807d605efce0970c18cde48db33c27d1a01799477e0f601f554f0ee6f7ac21490602124801e9f7a99d9605249b90f03112'
    )
    expect(extracted).toMatchInlineSnapshot(`
      {
        "r": "0xc610507b2ac3cff80dd7017419021196807d605efce0970c18cde48db33c27d1",
        "s": "0x1799477e0f601f554f0ee6f7ac21490602124801e9f7a99d9605249b90f03112",
        "v": "0x1b",
      }
    `)
  })
  it('extracts from eip1559 txs', () => {
    // packages/sdk/wallets/wallet-local/src/local-wallet.test.ts:209 ( succeeds with eip1559)
    const extracted = extractSignature(
      '0x02f87082ad5a8063630a94588e4b68193001e4d10928660ab4165b813717c0880de0b6b3a764000083abcdef8083015ad7a00fd2d0c579a971ebc04207d8c5ff5bb3449052f0c9e946a7146e5ae4d4ec6289a0737423de64cc81a62e700b5ca7970212aaed3d28de4dbce8b054483d361f6ff8'
    )
    expect(extracted).toMatchInlineSnapshot(`
      {
        "r": "0x0fd2d0c579a971ebc04207d8c5ff5bb3449052f0c9e946a7146e5ae4d4ec6289",
        "s": "0x737423de64cc81a62e700b5ca7970212aaed3d28de4dbce8b054483d361f6ff8",
        "v": "0x015ad7",
      }
    `)
  })
  it('fails when length is wrong', () => {
    expect(() =>
      extractSignature(
        '0xf88282ad5a8063630a94588e4b68193001e4d10928660ab4165b813717c0880de0b6b3a764000083abcdefc094cd2a3d9f938e13cd947ec05abc7fe734df8dd82680a091b5504a59e529e7efa42dbb97fbc3311a91d035c873a94ab0789441fc989f84a02e8254d6b3101b63417e5d496833bc84f4832d4a8bf8a2b83e291d8f38c0f62d'
      )
    ).toThrowErrorMatchingInlineSnapshot(
      `"@extractSignature: provided transaction has 13 elements but ethereum-legacy txs with a signature have 9 [{"0":173,"1":90},{},{"0":99},{"0":99},{"0":10},{"0":88,"1":142,"2":75,"3":104,"4":25,"5":48,"6":1,"7":228,"8":209,"9":9,"10":40,"11":102,"12":10,"13":180,"14":22,"15":91,"16":129,"17":55,"18":23,"19":192},{"0":13,"1":224,"2":182,"3":179,"4":167,"5":100,"6":0,"7":0},{"0":171,"1":205,"2":239},[],{"0":205,"1":42,"2":61,"3":159,"4":147,"5":142,"6":19,"7":205,"8":148,"9":126,"10":192,"11":90,"12":188,"13":127,"14":231,"15":52,"16":223,"17":141,"18":216,"19":38},{},{"0":145,"1":181,"2":80,"3":74,"4":89,"5":229,"6":41,"7":231,"8":239,"9":164,"10":45,"11":187,"12":151,"13":251,"14":195,"15":49,"16":26,"17":145,"18":208,"19":53,"20":200,"21":115,"22":169,"23":74,"24":176,"25":120,"26":148,"27":65,"28":252,"29":152,"30":159,"31":132},{"0":46,"1":130,"2":84,"3":214,"4":179,"5":16,"6":27,"7":99,"8":65,"9":126,"10":93,"11":73,"12":104,"13":51,"14":188,"15":132,"16":244,"17":131,"18":45,"19":74,"20":139,"21":248,"22":162,"23":184,"24":62,"25":41,"26":29,"27":143,"28":56,"29":192,"30":246,"31":45}]"`
    )
  })
  it('fails when length is empty', () => {
    expect(() => extractSignature('0x')).toThrowErrorMatchingInlineSnapshot(
      `"Invalid byte sequence"`
    )
  })
})

describe('getSignerFromTx', () => {
  const account = privateKeyToAccount(PRIVATE_KEY1)
  test('extracts signer address from cip42 tx signed by viem', async () => {
    const signed = await account.signTransaction(
      {
        // @ts-ignore
        type: 'cip42',
        accessList: [],
        chainId: 44378,
        data: '0xabcdef',
        feeCurrency: '0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826',
        gas: BigInt(10),
        gatewayFee: BigInt('0x5678'),
        gatewayFeeRecipient: '0x1be31a94361a391bbafb2a4ccd704f57dc04d4bb',
        maxFeePerGas: BigInt(99),
        maxPriorityFeePerGas: BigInt(99),
        nonce: 0,
        to: '0x588e4b68193001e4d10928660ab4165b813717c0',
        value: BigInt(1000000000000000000),
      },
      { serializer: celo.serializers?.transaction }
    )
    expect(getSignerFromTxEIP2718TX(signed)).toEqual(account.address)
  })
})

describe('stringNumberOrBNToHex', () => {
  test('string as base 10 number', () => {
    expect(stringNumberOrBNToHex('1230000000000020')).toEqual('0x045eadb112e014')
    expect(stringNumberOrBNToHex('123')).toEqual('0x7b')
  })
  test('string as base 16 number', () => {
    expect(stringNumberOrBNToHex('0x7b')).toEqual('0x7b')
  })
  test('number', () => {
    expect(stringNumberOrBNToHex(1230000000000020)).toEqual('0x045eadb112e014')
    expect(stringNumberOrBNToHex(123)).toEqual('0x7b')
  })
  test('BN', () => {
    const biggie = Web3.utils.toBN('123')
    expect(stringNumberOrBNToHex(biggie)).toEqual('0x7b')
  })
  test('bigint', () => {
    expect(stringNumberOrBNToHex(BigInt('100293872610573514616'))).toEqual('0x056fdb69c275837778')
  })
})

describe('handleNumber', () => {
  test('handles numbers', () => {
    expect(handleNumber(hexToBytes('cafe0123'))).toEqual(3405644067)
    expect(handleNumber(hexToBytes(''))).toEqual(0)
  })
})

describe('handleBigInt', () => {
  expect(handleBigInt(hexToBytes('ffffffffffffff'))).toEqual(BigInt('72057594037927935'))
  expect(handleBigInt(hexToBytes(''))).toEqual(BigInt(0))
})

describe('handleHexString', () => {
  expect(handleHexString(hexToBytes('cafe0123'))).toEqual('0xcafe0123')
  expect(handleHexString(hexToBytes(''))).toEqual('0x')
})

describe('handleData', () => {
  expect(handleData(hexToBytes('cafe0123'))).toEqual('0xcafe0123')
  expect(handleData(hexToBytes(''))).toEqual('0x')
})
