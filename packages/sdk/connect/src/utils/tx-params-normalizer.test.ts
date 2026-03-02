import { Connection } from '../connection'
import { CeloTx, Provider } from '../types'
import { TxParamsNormalizer } from './tx-params-normalizer'

function createMockProvider(handler: (method: string, params: any[]) => any): Provider {
  return {
    request: (async ({ method, params }: any) => {
      return handler(method, params || [])
    }) as any,
  }
}

describe('TxParamsNormalizer class', () => {
  let populator: TxParamsNormalizer
  let mockRpcHandler: jest.Mock
  let mockGasEstimation: any
  const completeCeloTx: CeloTx = {
    nonce: 1,
    chainId: 1,
    from: 'test',
    to: 'test',
    data: 'test',
    value: 1,
    gas: 1,
    gasPrice: 1,
    maxFeePerGas: undefined,
    maxPriorityFeePerGas: undefined,
    feeCurrency: undefined,
  }

  beforeEach(() => {
    mockRpcHandler = jest.fn((method: string, _params: any[]) => {
      if (method === 'eth_chainId') {
        // 27 in hex
        return '0x1b'
      }
      // Default hex return for other methods
      return '0x27'
    })
    const mockProvider = createMockProvider(mockRpcHandler)
    const connection = new Connection(mockProvider)
    mockGasEstimation = jest.fn(
      (
        _tx: CeloTx,
        _gasEstimator?: (tx: CeloTx) => Promise<number>,
        _caller?: (tx: CeloTx) => Promise<string>
      ): Promise<number> => {
        return Promise.resolve(27)
      }
    )
    connection.estimateGas = mockGasEstimation
    populator = new TxParamsNormalizer(connection)
  })

  describe('when missing parameters', () => {
    test('will populate the chaindId', async () => {
      const celoTx: CeloTx = { ...completeCeloTx }
      celoTx.chainId = undefined
      const newCeloTx = await populator.populate(celoTx)
      expect(newCeloTx.chainId).toBe(27)
      // viemClient.getChainId() calls eth_chainId
      expect(mockRpcHandler).toHaveBeenCalledWith('eth_chainId', expect.anything())
    })

    test('will retrieve only once the chaindId', async () => {
      const celoTx: CeloTx = { ...completeCeloTx }
      celoTx.chainId = undefined
      const newCeloTx = await populator.populate(celoTx)
      expect(newCeloTx.chainId).toBe(27)

      const newCeloTx2 = await populator.populate(celoTx)
      expect(newCeloTx2.chainId).toBe(27)

      // eth_chainId should only be called once due to caching in Connection
      const chainIdCalls = mockRpcHandler.mock.calls.filter(
        (call: any[]) => call[0] === 'eth_chainId'
      )
      expect(chainIdCalls.length).toBe(1)
    })

    test('will populate the nonce', async () => {
      const celoTx: CeloTx = { ...completeCeloTx }
      celoTx.nonce = undefined
      const newCeloTx = await populator.populate(celoTx)
      expect(newCeloTx.nonce).toBe(39) // 0x27 => 39
      expect(mockRpcHandler).toHaveBeenCalledWith('eth_getTransactionCount', expect.anything())
    })

    test('will populate the gas', async () => {
      const celoTx: CeloTx = { ...completeCeloTx }
      celoTx.gas = undefined
      const newCeloTx = await populator.populate(celoTx)
      expect(newCeloTx.gas).toBe(27)
      expect(mockGasEstimation.mock.calls.length).toBe(1)
    })

    test('will not pop maxFeePerGas and maxPriorityFeePerGas when gasPrice is set', async () => {
      const celoTx: CeloTx = { ...completeCeloTx }
      celoTx.gasPrice = 1
      const newCeloTx = await populator.populate(celoTx)
      expect(newCeloTx.maxFeePerGas).toBe(undefined)
      expect(newCeloTx.maxPriorityFeePerGas).toBe(undefined)
    })
    test('will not pop maxFeePerGas if it is set', async () => {
      const celoTx: CeloTx = { ...completeCeloTx }
      celoTx.maxFeePerGas = 100
      const newCeloTx = await populator.populate(celoTx)
      expect(newCeloTx.maxFeePerGas).toBe(100)
    })
    test('will not pop maxPriorityFeePerGas if it is set', async () => {
      const celoTx: CeloTx = { ...completeCeloTx }
      celoTx.maxPriorityFeePerGas = 2000
      const newCeloTx = await populator.populate(celoTx)
      expect(newCeloTx.maxPriorityFeePerGas).toBe(2000)
    })

    test('will populate the maxFeePerGas and maxPriorityFeePerGas without fee currency', async () => {
      const celoTx: CeloTx = { ...completeCeloTx }
      celoTx.gasPrice = undefined
      celoTx.maxFeePerGas = undefined
      celoTx.maxPriorityFeePerGas = undefined
      celoTx.feeCurrency = undefined
      const newCeloTx = await populator.populate(celoTx)
      expect(newCeloTx.maxFeePerGas).toBe('0x2f')
      expect(newCeloTx.maxPriorityFeePerGas).toBe('0x27')
      expect(mockRpcHandler).toHaveBeenCalledWith('eth_gasPrice', [])
      expect(mockRpcHandler).toHaveBeenCalledWith('eth_maxPriorityFeePerGas', [])
    })

    test('will populate the maxFeePerGas and maxPriorityFeePerGas with fee currency', async () => {
      const celoTx: CeloTx = { ...completeCeloTx }
      celoTx.gasPrice = undefined
      celoTx.maxFeePerGas = undefined
      celoTx.maxPriorityFeePerGas = undefined
      celoTx.feeCurrency = '0x1234'
      const newCeloTx = await populator.populate(celoTx)
      expect(newCeloTx.maxFeePerGas).toBe('0x2f')
      expect(newCeloTx.maxPriorityFeePerGas).toBe('0x27')
      expect(mockRpcHandler).toHaveBeenCalledWith('eth_gasPrice', ['0x1234'])
      expect(mockRpcHandler).toHaveBeenCalledWith('eth_maxPriorityFeePerGas', [])
    })
  })
})
