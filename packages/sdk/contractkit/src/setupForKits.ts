import { Provider } from '@celo/connect'
import type { EIP1193RequestFn } from 'viem'
import * as http from 'http'
import * as https from 'https'
import * as net from 'net'

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
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: nextId++,
      method,
      params: Array.isArray(params) ? params : params != null ? [params] : [],
    })
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
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: nextId++,
      method,
      params: Array.isArray(params) ? params : params != null ? [params] : [],
    })

    return new Promise((resolve, reject) => {
      const socket = this.netModule.connect({ path: this.path })
      let data = ''

      socket.on('connect', () => {
        socket.write(body)
      })

      socket.on('data', (chunk: Buffer) => {
        data += chunk.toString()
      })

      socket.on('end', () => {
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

      socket.on('error', (err) => {
        reject(err)
      })
    })
  }
}

/** @internal */
export function getProviderForKit(url: string, options?: HttpProviderOptions): Provider {
  if (url.endsWith('.ipc')) {
    return new SimpleIpcProvider(url, net)
  } else {
    return new SimpleHttpProvider(url, options)
  }
}
