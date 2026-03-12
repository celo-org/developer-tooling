import { RpcErrorCode } from 'viem'

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
