import Web3 from 'web3'
import { Connection } from './connection'

describe('Connection', () => {
  let connection: Connection
  beforeEach(() => {
    const web3 = new Web3('http://localhost:8545')
    connection = new Connection(web3)
  })

  describe('#setFeeMarketGas', () => {
    describe('when fee market gas is set', () => {
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
    describe('when fee market gas is set', () => {
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
      beforeEach(() => {
        connection.rpcCaller.call = jest.fn(async (method) => {
          if (method === 'eth_gasPrice') {
            return {
              result: '300000',
              id: 22,
              jsonrpc: '2.0',
            }
          }
          if (method === 'eth_maxPriorityFeePerGas') {
            return {
              result: '200000',
              id: 23,
              jsonrpc: '2.0',
            }
          }
          if (method === 'eth_getBlockByNumber') {
            return {
              result: { gasLimit: 0, baseFeePerGas: 42 },
              id: 24,
              jsonrpc: '2.0',
            }
          }
          return {
            result: 0,
            id: 25,
            jsonrpc: '2.0',
          }
        })
      })
      it('asked the rpc what they should be w/ feeCurrency', async () => {
        const result = await connection.setFeeMarketGas({ feeCurrency: '0x000001' })
        expect(connection.rpcCaller.call).toHaveBeenCalledWith('eth_maxPriorityFeePerGas', [])
        expect(connection.rpcCaller.call).toHaveBeenCalledWith('eth_gasPrice', ['0x000001'])
        expect(result.maxFeePerGas).toEqual('300000')
        expect(result.maxPriorityFeePerGas).toEqual('200000')
      })
      it('asked the rpc what they should be w/o feeCurrency', async () => {
        const result = await connection.setFeeMarketGas({})
        expect(connection.rpcCaller.call).toHaveBeenCalledWith('eth_maxPriorityFeePerGas', [])
        expect(connection.rpcCaller.call).toHaveBeenCalledWith('eth_getBlockByNumber', [
          'latest',
          true,
        ])
        expect(result.maxFeePerGas).toEqual(`0x${BigInt('200042').toString(16)}`)
        expect(result.maxPriorityFeePerGas).toEqual('200000')
      })
    })
  })
})
