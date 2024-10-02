import { ensureLeading0x } from '@celo/base'
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
      const ETH_GAS_PRICE = 25001000000
      const BASE_FEE_PER = 25000000000
      const PRIORITYFEE = 200000
      const multiple = BigInt(120)
      beforeEach(() => {
        connection.rpcCaller.call = jest.fn(async (method) => {
          if (method === 'eth_gasPrice') {
            return {
              result: ensureLeading0x(ETH_GAS_PRICE.toString(16)),
              id: 22,
              jsonrpc: '2.0',
            }
          }
          if (method === 'eth_maxPriorityFeePerGas') {
            return {
              result: ensureLeading0x(PRIORITYFEE.toString(16)),
              id: 23,
              jsonrpc: '2.0',
            }
          }
          if (method === 'eth_getBlockByNumber') {
            return {
              result: { gasLimit: 30000000, baseFeePerGas: BASE_FEE_PER },
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
      it('asked the rpc what they should be with feeCurrency', async () => {
        const result = await connection.setFeeMarketGas({ feeCurrency: '0x000001' })
        expect(connection.rpcCaller.call).toHaveBeenCalledWith('eth_maxPriorityFeePerGas', [
          '0x000001',
        ])
        expect(connection.rpcCaller.call).toHaveBeenCalledWith('eth_gasPrice', ['0x000001'])

        expect(BigInt(result.maxPriorityFeePerGas as string)).toEqual(BigInt(PRIORITYFEE))
        expect(BigInt(result.maxFeePerGas as string)).toEqual(
          (BigInt(ETH_GAS_PRICE) * multiple) / BigInt(100) + BigInt(PRIORITYFEE)
        )
      })
      it('asked the rpc what they should be without feeCurrency', async () => {
        const result = await connection.setFeeMarketGas({})
        expect(connection.rpcCaller.call).toHaveBeenCalledWith('eth_maxPriorityFeePerGas', [])
        expect(connection.rpcCaller.call).toHaveBeenCalledWith('eth_getBlockByNumber', [
          'latest',
          true,
        ])
        expect(BigInt(result.maxPriorityFeePerGas as string)).toEqual(BigInt(PRIORITYFEE))
        expect(BigInt(result.maxFeePerGas as string)).toEqual(
          (BigInt(BASE_FEE_PER) * multiple) / BigInt(100) + BigInt(PRIORITYFEE)
        )
      })
    })
  })
})
