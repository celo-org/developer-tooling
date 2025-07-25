/** biome-ignore-all lint/suspicious/noDoubleEquals: legacy-test-file */
import {
  Callback,
  CeloTx,
  Connection,
  JsonRpcPayload,
  JsonRpcResponse,
  Provider,
} from '@celo/connect'
import { privateKeyToAddress } from '@celo/utils/lib/address'
import { recoverTransaction } from '@celo/wallet-base'
import debugFactory from 'debug'
import Web3 from 'web3'
import { LocalWallet } from './local-wallet'

const debug = debugFactory('kit:txtest:sign')

// Random private keys
const PRIVATE_KEY1 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
const ACCOUNT_ADDRESS1 = privateKeyToAddress(PRIVATE_KEY1)
const PRIVATE_KEY2 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890fdeccc'
const ACCOUNT_ADDRESS2 = privateKeyToAddress(PRIVATE_KEY2)

debug(`Private key 1: ${PRIVATE_KEY1}`)
debug(`Account Address 1: ${ACCOUNT_ADDRESS1}`)
debug(`Private key 2: ${PRIVATE_KEY2}`)
debug(`Account Address 2: ${ACCOUNT_ADDRESS2}`)

// These tests verify the signTransaction WITHOUT the ParamsPopulator
describe('Transaction Utils', () => {
  // only needed for the eth_coinbase rcp call
  let connection: Connection
  let web3: Web3
  const mockProvider: Provider = {
    send: (payload: JsonRpcPayload, callback: Callback<JsonRpcResponse>): void => {
      if (payload.method === 'eth_coinbase') {
        const response: JsonRpcResponse = {
          jsonrpc: payload.jsonrpc,
          id: Number(payload.id),
          result: '0xc94770007dda54cF92009BFF0dE90c06F603a09f',
        }
        callback(null, response)
      } else if (payload.method === 'eth_gasPrice') {
        const response: JsonRpcResponse = {
          jsonrpc: payload.jsonrpc,
          id: Number(payload.id),
          result: '0x09184e72a000',
        }
        callback(null, response)
      } else {
        callback(new Error(payload.method))
      }
    },
  }

  const setupConnection = async () => {
    web3 = new Web3()
    web3.setProvider(mockProvider as any)
    connection = new Connection(web3)
    connection.wallet = new LocalWallet()
  }
  const verifyLocalSigning = async (celoTransaction: CeloTx): Promise<void> => {
    let recoveredSigner: string | undefined
    let recoveredTransaction: CeloTx | undefined
    let signedTransaction: { raw: string; tx: any } | undefined
    beforeAll(async () => {
      signedTransaction = await web3.eth.signTransaction(celoTransaction)
      const recovery = recoverTransaction(signedTransaction.raw)
      recoveredTransaction = recovery[0]
      recoveredSigner = recovery[1]
    })

    afterAll(async () => {
      signedTransaction = undefined
      recoveredTransaction = undefined
      recoveredSigner = undefined
    })

    test('Signer matches recovered signer', async () => {
      expect(recoveredSigner?.toLowerCase()).toEqual(celoTransaction.from!.toString().toLowerCase())
    })

    test('Checking nonce', async () => {
      if (celoTransaction.nonce != null) {
        expect(recoveredTransaction?.nonce).toEqual(parseInt(celoTransaction.nonce.toString(), 16))
      }
    })

    test('Checking gas', async () => {
      if (celoTransaction.gas != null) {
        expect(recoveredTransaction?.gas).toEqual(parseInt(celoTransaction.gas.toString(), 16))
      }
    })
    test('Checking gas price', async () => {
      if (celoTransaction.gasPrice != null) {
        expect(recoveredTransaction?.gasPrice).toEqual(
          parseInt(celoTransaction.gasPrice.toString(), 16)
        )
      }
    })
    test('Checking maxFeePerGas', async () => {
      if (celoTransaction.maxFeePerGas != null) {
        expect(recoveredTransaction?.maxFeePerGas).toEqual(
          parseInt(celoTransaction.maxFeePerGas.toString(), 16)
        )
      }
    })
    test('Checking maxPriorityFeePerGas', async () => {
      if (celoTransaction.maxPriorityFeePerGas != null) {
        expect(recoveredTransaction?.maxPriorityFeePerGas).toEqual(
          parseInt(celoTransaction.maxPriorityFeePerGas.toString(), 16)
        )
      }
    })
    test('Checking feeCurrency', async () => {
      if (celoTransaction.feeCurrency != null && celoTransaction.maxFeePerGas != null) {
        expect(recoveredTransaction?.feeCurrency!.toLowerCase()).toEqual(
          celoTransaction.feeCurrency.toLowerCase()
        )
      }
    })
    test('Checking maxFeeInFeeCurrency', async () => {
      if (celoTransaction.maxFeeInFeeCurrency != null) {
        expect(recoveredTransaction?.maxFeeInFeeCurrency).toEqual(
          celoTransaction.maxFeeInFeeCurrency
        )
      }
    })
    test('Checking data', async () => {
      if (celoTransaction.data != null) {
        expect(recoveredTransaction?.data!.toLowerCase()).toEqual(
          celoTransaction.data.toLowerCase()
        )
      }
    })
  }

  const verifyLocalSigningInAllPermutations = async (from: string, to: string): Promise<void> => {
    const amountInWei: string = Web3.utils.toWei('1', 'ether')
    const nonce = 0
    const badNonce = 100
    const gas = 10000
    const gasPrice = 99000000000
    const feeCurrency = ACCOUNT_ADDRESS1
    const data = '0xabcdef'
    const chainId = 1

    const transactionDescription = (celoTransaction: CeloTx) => {
      const description: string[] = []
      if (celoTransaction.gasPrice != undefined) {
        description.push(`Testing Legacy with gas price ${celoTransaction.gasPrice}`)
      } else if (celoTransaction.feeCurrency != undefined) {
        description.push('Testing CIP64 with')
      } else if (celoTransaction.maxFeeInFeeCurrency != undefined) {
        description.push('Testing CIP66 with')
      } else {
        description.push(`Testing EIP1559 with maxFeePerGas ${celoTransaction.maxFeePerGas}`)
      }
      if (celoTransaction.data != undefined) {
        description.push(`data: ${celoTransaction.data}`)
      }

      if (celoTransaction.feeCurrency != undefined) {
        description.push(`fee currency: ${celoTransaction.feeCurrency}`)
      }

      if (celoTransaction.maxFeeInFeeCurrency != undefined) {
        description.push(`maxFeeInFeeCurrency currency: ${celoTransaction.maxFeeInFeeCurrency}`)
      }

      return description.join(' ')
    }
    // Test all possible combinations for rigor.
    for (let i = 0; i < 7; i++) {
      const shouldHaveFeeCurrency = i > 1 && i % 2 === 0
      const celoTransaction: CeloTx = {
        from,
        to,
        value: amountInWei,
        nonce,
        gasPrice: i <= 1 ? gasPrice : undefined,
        maxFeePerGas: i > 1 ? gasPrice : undefined,
        maxPriorityFeePerGas: i > 1 ? gasPrice : undefined,
        chainId,
        gas,
        maxFeeInFeeCurrency:
          shouldHaveFeeCurrency && i % 6 === 1 ? BigInt(gasPrice) * BigInt(gas) : undefined,
        feeCurrency: shouldHaveFeeCurrency ? feeCurrency : undefined,
        data: i % 3 === 0 ? data : undefined,
      }
      describe(transactionDescription(celoTransaction), () => {
        verifyLocalSigning(celoTransaction)
      })
    }

    // A special case.
    // An incorrect nonce  will only work, if no implicit calls to estimate gas are required.
    describe('Testing with bad nonce', () => {
      verifyLocalSigning({ from, to, nonce: badNonce, gas, gasPrice, chainId })
    })
  }

  describe('Signer Testing with single local account and pay gas in CELO', () => {
    describe('Test1 should be able to sign and get the signer back with single local account', () => {
      beforeAll(async () => {
        await setupConnection()
        connection.addAccount(PRIVATE_KEY1)
      })
      verifyLocalSigningInAllPermutations(ACCOUNT_ADDRESS1, ACCOUNT_ADDRESS2)
      afterAll(() => connection.stop())
    })
  })

  describe('Signer Testing with multiple local accounts', () => {
    describe('Test2 should be able to sign with first account and get the signer back with multiple local accounts', () => {
      beforeAll(async () => {
        await setupConnection()
        connection.addAccount(PRIVATE_KEY1)
        connection.addAccount(PRIVATE_KEY2)
      })
      verifyLocalSigningInAllPermutations(ACCOUNT_ADDRESS1, ACCOUNT_ADDRESS2)
      afterAll(() => connection.stop())
    })

    describe('Test3 should be able to sign with second account and get the signer back with multiple local accounts', () => {
      beforeAll(async () => {
        await setupConnection()
        connection.addAccount(PRIVATE_KEY1)
        connection.addAccount(PRIVATE_KEY2)
      })
      verifyLocalSigningInAllPermutations(ACCOUNT_ADDRESS2, ACCOUNT_ADDRESS1)
      afterAll(() => connection.stop())
    })
  })
})
