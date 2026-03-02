import { Provider } from '@celo/connect'
import type { EIP1193RequestFn } from 'viem'
import * as http from 'http'
import migrationOverride from './migration-override.json'

let nextId = 0

class SimpleHttpProvider implements Provider {
  /** Compat with legacy HttpProvider which exposed .host */
  readonly host: string

  constructor(readonly url: string) {
    this.host = url
  }

  request: EIP1193RequestFn = async ({ method, params }) => {
    const body = JSON.stringify({
      id: ++nextId,
      jsonrpc: '2.0',
      method,
      params: Array.isArray(params) ? params : params != null ? [params] : [],
    })
    const parsedUrl = new URL(this.url)

    return new Promise<any>((resolve, reject) => {
      const req = http.request(
        {
          hostname: parsedUrl.hostname,
          port: parsedUrl.port,
          path: parsedUrl.pathname + parsedUrl.search,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body).toString(),
          },
        },
        (res) => {
          let data = ''
          res.on('data', (chunk: string) => {
            data += chunk
          })
          res.on('end', () => {
            try {
              const json = JSON.parse(data)
              if (json.error) {
                reject(
                  new Error(
                    `JSON-RPC error: method: ${method} params: ${JSON.stringify(params)} error: ${JSON.stringify(json.error)}`
                  )
                )
              } else {
                resolve(json.result)
              }
            } catch (e) {
              reject(new Error(`Invalid JSON response: ${data}`))
            }
          })
        }
      )

      req.on('error', (err) => {
        reject(err)
      })

      req.write(body)
      req.end()
    })
  }
}

export const MINUTE = 60
export const HOUR = 60 * 60
export const DAY = 24 * HOUR
export const MONTH = 30 * DAY
export const UNLOCKING_PERIOD = 3 * DAY

export const TEST_MNEMONIC =
  'concert load couple harbor equip island argue ramp clarify fence smart topic'
export const TEST_BALANCE = 1000000
export const TEST_GAS_PRICE = 25001000000 // actual price on celo right now
export const TEST_BASE_FEE = 25000000000 // actual price on celo right now
export const TEST_GAS_LIMIT = 20000000

export const NetworkConfig = migrationOverride

export function jsonRpcCall<O>(provider: Provider, method: string, params: unknown[]): Promise<O> {
  return provider.request({ method, params }) as Promise<O>
}

export function evmRevert(provider: Provider, snapId: string): Promise<void> {
  return jsonRpcCall(provider, 'evm_revert', [snapId])
}

export function evmSnapshot(provider: Provider) {
  return jsonRpcCall<string>(provider, 'evm_snapshot', [])
}

type TestWithProviderHooks = {
  beforeAll?: () => Promise<void>
  afterAll?: () => Promise<void>
}

/**
 * Creates a test suite with a given name and provides the test function with a Provider
 * connected to the given rpcUrl.
 *
 * It is an equivalent of jest `describe` with a Provider. It also provides
 * hooks for beforeAll and afterAll.
 *
 * Optionally if a runIf flag is set to false the test suite will be skipped (useful for
 * conditional test suites). By default all test suites are run normally, but if the runIf
 * flag is set to false the test suite will be skipped by using jest `describe.skip`. It will
 * be reported in the summary as "skipped".
 */
export function testWithProvider(
  name: string,
  rpcUrl: string,
  fn: (provider: Provider) => void,
  options: {
    hooks?: TestWithProviderHooks
    runIf?: boolean
  } = {}
) {
  const provider = new SimpleHttpProvider(rpcUrl)
  // By default we run all the tests
  let describeFn = describe

  // and only skip them if explicitly stated
  if (options.runIf === false) {
    describeFn = describe.skip
  }

  describeFn(name, () => {
    let snapId: string | null = null

    if (options.hooks?.beforeAll) {
      beforeAll(options.hooks.beforeAll, 60_000)
    }

    beforeEach(async () => {
      if (snapId != null) {
        await evmRevert(provider, snapId)
      }
      snapId = await evmSnapshot(provider)
    })

    afterAll(async () => {
      if (snapId != null) {
        await evmRevert(provider, snapId)
      }
      if (options.hooks?.afterAll) {
        // hook must be awaited here or jest doesnt actually wait for it and complains of open handles
        await options.hooks.afterAll()
      }
    })

    fn(provider)
  })
}
