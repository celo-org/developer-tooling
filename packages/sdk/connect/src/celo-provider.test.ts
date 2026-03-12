import { CeloProvider } from './celo-provider'
import { Connection } from './connection'
import { Address, CeloTx, EncodedTransaction, Provider } from './types'
import { ReadOnlyWallet } from './wallet'

const ACCOUNT_ADDRESS1 = '0x1234567890123456789012345678901234567890'
const ACCOUNT_ADDRESS2 = '0x0987654321098765432109876543210987654321'

class MockWallet implements ReadOnlyWallet {
  private addresses = new Array<Address>()
  addAccount(privateKey: Address): void {
    this.addresses.push(privateKey)
  }
  getAccounts(): Address[] {
    return this.addresses
  }
  hasAccount(address?: string | undefined): boolean {
    return address != null && this.addresses.includes(address)
  }
  signTransaction(_txParams: CeloTx): Promise<EncodedTransaction> {
    return Promise.resolve({
      raw: '0xmock',
      tx: {
        type: 'cip64',
        nonce: 'nonce',
        maxFeePerGas: 'maxFeePerGas',
        maxPriorityFeePerGas: 'maxPriorityFeePerGas',
        gas: 'gas',
        feeCurrency: 'feeCurrency',
        to: 'to',
        value: 'value',
        input: 'input',
        r: 'r',
        s: 's',
        v: 'v',
        hash: 'hash',
      },
    })
  }
  signTypedData(_address: string, _typedData: any): Promise<string> {
    return Promise.resolve('mock')
  }
  signPersonalMessage(_address: string, _data: string): Promise<string> {
    return Promise.resolve('mock')
  }
  decrypt(_address: string, _ciphertext: Buffer): Promise<Buffer> {
    return Promise.resolve(Buffer.from('mock'))
  }
  removeAccount(_address: string): void {
    // noop
  }
  computeSharedSecret(_address: string, _publicKey: string): Promise<Buffer> {
    return Promise.resolve(Buffer.from('mock'))
  }
}

// These tests verify the signTransaction WITHOUT the ParamsPopulator
describe('CeloProvider', () => {
  let mockRequest: jest.Mock
  let mockProvider: Provider
  let connection: Connection
  let celoProvider: CeloProvider
  const interceptedByCeloProvider = [
    'eth_sendTransaction',
    'eth_signTransaction',
    'eth_sign',
    'personal_sign',
    'eth_signTypedData',
    'eth_signTypedData_v1',
    'eth_signTypedData_v3',
    'eth_signTypedData_v4',
  ]

  beforeEach(() => {
    mockRequest = jest.fn(async ({ method, params }: { method: string; params?: any[] }) => {
      return {
        params: params ?? [],
        method,
      }
    })
    mockProvider = {
      request: mockRequest,
    }

    connection = new Connection(mockProvider, new MockWallet())
    celoProvider = connection.currentProvider
  })

  describe("when celo provider don't have any local account", () => {
    interceptedByCeloProvider.forEach((method: string) => {
      test(`forwards the call to '${method}' to the original provider`, async () => {
        await celoProvider.request({ method, params: ['1', '2'] })
        expect(mockRequest.mock.calls.length).toBe(1)
        expect(mockRequest.mock.calls[0][0].method).toBe(method)
      })
    })
  })

  describe('when celo provider has a local account', () => {
    const paramsForMethod = (method: string, from: string, to: string) => {
      const tx: CeloTx = {
        from,
        to,
        value: '1',
        nonce: 0,
        gas: 10,
        gasPrice: 99,
        feeCurrency: '0x124356',
        data: '0xabcdef',
        chainId: 1,
      }
      switch (method) {
        case 'eth_sendTransaction':
        case 'eth_signTransaction':
          return [tx]
        case 'eth_sign':
          return [from, '0x01']
        case 'personal_sign':
          return ['0x01', from]
        case 'eth_signTypedData':
        case 'eth_signTypedData_v1':
        case 'eth_signTypedData_v3':
        case 'eth_signTypedData_v4':
          return [
            from,
            {
              types: {
                EIP712Domain: [
                  { name: 'name', type: 'string' },
                  { name: 'version', type: 'string' },
                  { name: 'chainId', type: 'uint256' },
                  { name: 'verifyingContract', type: 'address' },
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
                  wallet: from,
                },
                to: {
                  name: 'Bob',
                  wallet: to,
                },
                contents: 'Hello, Bob!',
              },
            },
          ]
        default: {
          return []
        }
      }
    }

    beforeEach(() => {
      connection.addAccount(ACCOUNT_ADDRESS1)
    })

    describe('but tries to use it with a different account', () => {
      interceptedByCeloProvider.forEach((method: string) => {
        test(`forwards the call to '${method}' to the original provider`, async () => {
          await celoProvider.request({
            method,
            params: paramsForMethod(method, ACCOUNT_ADDRESS2, ACCOUNT_ADDRESS1),
          })
          expect(mockRequest.mock.calls.length).toBe(1)
          expect(mockRequest.mock.calls[0][0].method).toBe(method)
        })
      })
    })

    describe('using that account', () => {
      test("'eth_sendTransaction' signs and sends eth_sendRawTransaction to the original provider", async () => {
        await celoProvider.request({
          method: 'eth_sendTransaction',
          params: paramsForMethod('eth_sendTransaction', ACCOUNT_ADDRESS1, ACCOUNT_ADDRESS2),
        })
        expect(mockRequest.mock.calls.length).toBe(1)
        expect(mockRequest.mock.calls[0][0].method).toBe('eth_sendRawTransaction')
      })

      test.todo("'eth_signTypedData' signs the message and doesn't call the original provider")

      interceptedByCeloProvider
        .filter((x) => x !== 'eth_sendTransaction' && !x.startsWith('eth_signTypedData'))
        .forEach((method: string) => {
          test(`'${method}' signs the message and doesn't call the original provider`, async () => {
            const result = await celoProvider.request({
              method,
              params: paramsForMethod(method, ACCOUNT_ADDRESS1, ACCOUNT_ADDRESS2),
            })
            expect(result).toBeTruthy()
            expect(mockRequest.mock.calls.length).toBe(0)
          })
        })
    })
  })
})
