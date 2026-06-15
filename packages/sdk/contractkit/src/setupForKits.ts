import { Provider } from '@celo/connect'
import * as http from 'http'
import * as https from 'https'
import * as net from 'net'
import type { EIP1193RequestFn } from 'viem'
import { webSocket } from 'viem'

export type HttpProviderOptions = {
  headers?: { name: string; value: string }[]
}

export const API_KEY_HEADER_KEY = 'apiKey'

/** @internal */
export function setupAPIKey(apiKey: string) {
  const options: HttpProviderOptions = {}
  options.headers = []
  options.headers.push({
    name: API_KEY_HEADER_KEY,
    value: apiKey,
  })
  return options
}

let nextId = 1

// JSON-RPC quantities may arrive as bigint (e.g. from viem); plain JSON.stringify
// throws "Do not know how to serialize a BigInt", so encode them as hex strings.
const bigintToHexReplacer = (_key: string, value: unknown) =>
  typeof value === 'bigint' ? `0x${value.toString(16)}` : value

/**
 * HTTP/HTTPS provider with custom headers support (e.g. API keys).
 * Implements EIP-1193 request() interface.
 */
class SimpleHttpProvider implements Provider {
  /** Used by cli/src/test-utils/cliUtils.ts:extractHostFromProvider to get the RPC URL */
  readonly host: string

  constructor(
    readonly url: string,
    private options?: HttpProviderOptions
  ) {
    this.host = url
  }

  request: EIP1193RequestFn = async ({ method, params }) => {
    const body = JSON.stringify(
      {
        jsonrpc: '2.0',
        id: nextId++,
        method,
        params: Array.isArray(params) ? params : params != null ? [params] : [],
      },
      bigintToHexReplacer
    )
    const parsedUrl = new URL(this.url)
    const isHttps = parsedUrl.protocol === 'https:'
    const httpModule = isHttps ? https : http

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body).toString(),
    }

    if (this.options?.headers) {
      for (const h of this.options.headers) {
        headers[h.name] = h.value
      }
    }

    return new Promise((resolve, reject) => {
      const req = httpModule.request(
        {
          hostname: parsedUrl.hostname,
          port: parsedUrl.port,
          path: parsedUrl.pathname + parsedUrl.search,
          method: 'POST',
          headers,
        },
        (res) => {
          let data = ''
          res.on('data', (chunk: string) => {
            data += chunk
          })
          res.on('end', () => {
            if (res.statusCode != null && res.statusCode >= 400) {
              reject(new Error(`RPC request failed with status ${res.statusCode}: ${data}`))
              return
            }
            try {
              const json = JSON.parse(data)
              if (json.error) {
                reject(new Error(json.error.message || JSON.stringify(json.error)))
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

class SimpleIpcProvider implements Provider {
  constructor(
    private path: string,
    private netModule: typeof net
  ) {}

  request: EIP1193RequestFn = async ({ method, params }) => {
    const body = JSON.stringify(
      {
        jsonrpc: '2.0',
        id: nextId++,
        method,
        params: Array.isArray(params) ? params : params != null ? [params] : [],
      },
      bigintToHexReplacer
    )

    return new Promise((resolve, reject) => {
      const socket = this.netModule.connect({ path: this.path })
      let data = ''
      let settled = false

      const settle = (fn: () => void) => {
        if (settled) return
        settled = true
        socket.destroy()
        fn()
      }

      const tryParse = (onIncomplete?: () => void) => {
        try {
          const json = JSON.parse(data)
          if (json.error) {
            settle(() => reject(new Error(json.error.message || JSON.stringify(json.error))))
          } else {
            settle(() => resolve(json.result))
          }
        } catch (e) {
          onIncomplete?.()
        }
      }

      socket.on('connect', () => {
        socket.write(body)
      })

      // Node IPC servers (geth) keep the socket open between requests and never
      // emit 'end' after a response — the response is complete once the
      // accumulated buffer parses as JSON.
      socket.on('data', (chunk: Buffer) => {
        data += chunk.toString()
        tryParse()
      })

      socket.on('end', () => {
        tryParse(() => settle(() => reject(new Error(`Invalid JSON response: ${data}`))))
      })

      socket.on('error', (err) => {
        settle(() => reject(err))
      })
    })
  }
}

// web3's `new Web3(url)` auto-detected WebSocket URLs; keep supporting them.
class SimpleWebSocketProvider implements Provider {
  private readonly transport: ReturnType<ReturnType<typeof webSocket>>

  constructor(url: string) {
    this.transport = webSocket(url)({})
  }

  request: EIP1193RequestFn = (args) => (this.transport.request as Provider['request'])(args)

  // viem opens (and caches) the socket lazily on the first request; close it here
  // or stopProvider() can't reach it and the CLI hangs forever.
  stop() {
    void this.transport.value
      ?.getRpcClient()
      .then((client) => client.close())
      .catch(() => {
        // best-effort teardown; nothing to do if the socket never opened
      })
  }
}

/** @internal */
export function getProviderForKit(url: string, options?: HttpProviderOptions): Provider {
  if (url.endsWith('.ipc')) {
    return new SimpleIpcProvider(url, net)
  } else if (url.startsWith('ws://') || url.startsWith('wss://')) {
    return new SimpleWebSocketProvider(url)
  } else {
    return new SimpleHttpProvider(url, options)
  }
}
