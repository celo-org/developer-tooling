import { ensureLeading0x } from '@celo/base'
import { Connection } from './connection'
import { Callback, JsonRpcPayload, JsonRpcResponse, Provider } from './types'

function createMockProvider(handler?: (method: string, params: any[]) => any): Provider {
  return {
    send(payload: JsonRpcPayload, callback: Callback<JsonRpcResponse>): void {
      if (handler) {
        try {
          const result = handler(payload.method, payload.params || [])
          callback(null, { id: Number(payload.id), jsonrpc: '2.0', result })
        } catch (error: any) {
          callback(error)
        }
      }
    },
  }
}

describe('Connection', () => {
  describe('#setFeeMarketGas', () => {
    describe('when fee market gas is set', () => {
      let connection: Connection
      beforeEach(() => {
        connection = new Connection(createMockProvider())
      })
      it('returns with gasPrice undefined and feeMarketGas set', async () => {
        const result = await connection.setFeeMarketGas({
          maxFeePerGas: '1',
          maxPriorityFeePerGas: '2',
        })
        expect(result).toEqual({
          gasPrice: undefined,
          maxFeePerGas: '1',
          maxPriorityFeePerGas: '2',
        })
      })
    })
    describe('when fee market gas is set (duplicate)', () => {
      let connection: Connection
      beforeEach(() => {
        connection = new Connection(createMockProvider())
      })
      it('returns with gasPrice undefined and feeMarketGas set', async () => {
        const result = await connection.setFeeMarketGas({
          maxFeePerGas: '1',
          maxPriorityFeePerGas: '2',
        })
        expect(result).toEqual({
          gasPrice: undefined,
          maxFeePerGas: '1',
          maxPriorityFeePerGas: '2',
        })
      })
    })

    describe('when fee market gas is not set', () => {
      const ETH_GAS_PRICE = 25001000000
      const BASE_FEE_PER = 25000000000
      const PRIORITYFEE = 200000
      const multiple = BigInt(120)
      let connection: Connection
      let rpcHandler: jest.Mock
      beforeEach(() => {
        rpcHandler = jest.fn((method: string) => {
          if (method === 'eth_gasPrice') {
            return ensureLeading0x(ETH_GAS_PRICE.toString(16))
          }
          if (method === 'eth_maxPriorityFeePerGas') {
            return ensureLeading0x(PRIORITYFEE.toString(16))
          }
          if (method === 'eth_getBlockByNumber' || method === 'eth_getBlockByHash') {
            return { gasLimit: 30000000, baseFeePerGas: BASE_FEE_PER }
          }
          return 0
        })
        connection = new Connection(createMockProvider(rpcHandler))
      })
      it('asked the rpc what they should be with feeCurrency', async () => {
        const result = await connection.setFeeMarketGas({ feeCurrency: '0x000001' })
        expect(rpcHandler).toHaveBeenCalledWith('eth_maxPriorityFeePerGas', ['0x000001'])
        expect(rpcHandler).toHaveBeenCalledWith('eth_gasPrice', ['0x000001'])

        expect(BigInt(result.maxPriorityFeePerGas as string)).toEqual(BigInt(PRIORITYFEE))
        expect(BigInt(result.maxFeePerGas as string)).toEqual(
          (BigInt(ETH_GAS_PRICE) * multiple) / BigInt(100) + BigInt(PRIORITYFEE)
        )
      })
      it('asked the rpc what they should be without feeCurrency', async () => {
        const result = await connection.setFeeMarketGas({})
        expect(rpcHandler).toHaveBeenCalledWith('eth_maxPriorityFeePerGas', [])
        expect(rpcHandler).toHaveBeenCalledWith(
          expect.stringMatching(/eth_getBlockBy/),
          expect.any(Array)
        )
        expect(BigInt(result.maxPriorityFeePerGas as string)).toEqual(BigInt(PRIORITYFEE))
        expect(BigInt(result.maxFeePerGas as string)).toEqual(
          (BigInt(BASE_FEE_PER) * multiple) / BigInt(100) + BigInt(PRIORITYFEE)
        )
      })
    })
  })
})
