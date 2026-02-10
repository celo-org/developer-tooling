import { Connection, Provider, JsonRpcPayload, JsonRpcResponse, Web3 } from '@celo/connect'
import * as http from 'http'
import migrationOverride from './migration-override.json'

class SimpleHttpProvider implements Provider {
  /** Compat with web3's HttpProvider which exposed .host */
  readonly host: string

  constructor(readonly url: string) {
    this.host = url
  }

  send(payload: JsonRpcPayload, callback: (error: Error | null, result?: JsonRpcResponse) => void) {
    const body = JSON.stringify(payload)
    const parsedUrl = new URL(this.url)

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
            callback(null, JSON.parse(data))
          } catch (e) {
            callback(new Error(`Invalid JSON response: ${data}`))
          }
        })
      }
    )

    req.on('error', (err) => {
      callback(err)
    })

    req.write(body)
    req.end()
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

export function jsonRpcCall<O>(client: Web3, method: string, params: unknown[]): Promise<O> {
  return new Promise<O>((resolve, reject) => {
    const provider = client.currentProvider

    if (provider && typeof provider.send === 'function') {
      provider.send(
        {
          id: new Date().getTime(),
          jsonrpc: '2.0',
          method,
          params,
        },
        (err, res) => {
          if (err) {
            reject(err)
          } else if (!res) {
            reject(new Error('no response'))
          } else if (res.error) {
            reject(
              new Error(
                `Failed JsonRpcResponse: method: ${method} params: ${JSON.stringify(
                  params
                )} error: ${JSON.stringify(res.error)}`
              )
            )
          } else {
            resolve(res.result)
          }
        }
      )
    } else {
      reject(new Error('Invalid provider'))
    }
  })
}

export function evmRevert(client: Web3, snapId: string): Promise<void> {
  return jsonRpcCall(client, 'evm_revert', [snapId])
}

export function evmSnapshot(client: Web3) {
  return jsonRpcCall<string>(client, 'evm_snapshot', [])
}

type TestWithWeb3Hooks = {
  beforeAll?: () => Promise<void>
  afterAll?: () => Promise<void>
}

/**
 * Creates a test suite with a given name and provides function with a Web3 client connected to the given rpcUrl.
 *
 * It is an equivalent of jest `describe` with a Web3 client. It also provides hooks for beforeAll and afterAll.
 *
 * Optionally if a runIf flag is set to false the test suite will be skipped (useful for conditional test suites). By
 * default all test suites are run normally, but if the runIf flag is set to false the test suite will be skipped by using
 * jest `describe.skip`. It will be reported in the summary as "skipped".
 */
export function testWithWeb3(
  name: string,
  rpcUrl: string,
  fn: (client: Web3) => void,
  options: {
    hooks?: TestWithWeb3Hooks
    runIf?: boolean
  } = {}
) {
  const provider = new SimpleHttpProvider(rpcUrl)
  const connection = new Connection(provider)
  const client = connection.web3

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
        await evmRevert(client, snapId)
      }
      snapId = await evmSnapshot(client)
    })

    afterAll(async () => {
      if (snapId != null) {
        await evmRevert(client, snapId)
      }
      if (options.hooks?.afterAll) {
        // hook must be awaited here or jest doesnt actually wait for it and complains of open handles
        await options.hooks.afterAll()
      }
    })

    fn(client)
  })
}
