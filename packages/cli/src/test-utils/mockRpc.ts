import { HttpRpcCaller } from '@celo/connect'
import { RpcErrorCode } from 'viem'

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

const actualFetch = global.fetch
export const mockRpcFetch = ({
  method,
  result,
  error,
}: {
  method: string | string[]
  result?: any
  error?: { code: RpcErrorCode; message?: string }
}) => {
  const fetchMock = jest.fn(async (...args) => {
    if (args[1]?.body) {
      const body = JSON.parse(args[1].body.toString())
      if (typeof method === 'string' ? body.method === method : method.includes(body.method)) {
        return {
          ok: !error,
          headers: new Map([['Content-Type', 'application/json']]),
          json: () => {
            if (error) {
              return Promise.resolve({ error })
            } else {
              return Promise.resolve({ result, id: 1, jsonrpc: '2.0' })
            }
          },
        }
      }
    }
    // @ts-expect-error
    return actualFetch(...args)
  })
  // @ts-expect-error
  global.fetch = fetchMock

  return function restoreFetch() {
    global.fetch = actualFetch
  }
}
