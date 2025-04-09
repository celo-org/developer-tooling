import { HttpRpcCaller } from '@celo/connect'

export const mockRpc = () =>
  jest.spyOn(HttpRpcCaller.prototype, 'call').mockImplementation(async (method, _args) => {
    if (method === 'eth_maxPriorityFeePerGas') {
      return {
        result: '20000',
        id: 1,
        jsonrpc: '2.0',
      }
    }
    if (method === 'eth_gasPrice') {
      return {
        result: '30000',
        id: 1,
        jsonrpc: '2.0',
      }
    }
    return {
      result: 0,
      id: Math.random(),
      jsonrpc: '2.0',
    }
  })
