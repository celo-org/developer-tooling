import { Provider, JsonRpcPayload, JsonRpcResponse } from '@celo/connect'
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
/** @internal */
export function ensureCurrentProvider(providerOrWeb3: any) {
  const provider =
    providerOrWeb3 != null && providerOrWeb3.currentProvider != null
      ? providerOrWeb3.currentProvider
      : providerOrWeb3
  if (!provider) {
    throw new Error('Must have a valid Provider')
  }
}

class SimpleHttpProvider implements Provider {
  /** Compat with web3's HttpProvider which exposed .host */
  readonly host: string

  constructor(
    readonly url: string,
    private options?: HttpProviderOptions
  ) {
    this.host = url
  }

  send(payload: JsonRpcPayload, callback: (error: Error | null, result?: JsonRpcResponse) => void) {
    const body = JSON.stringify(payload)
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

class SimpleIpcProvider implements Provider {
  constructor(
    private path: string,
    private netModule: typeof net
  ) {}

  send(payload: JsonRpcPayload, callback: (error: Error | null, result?: JsonRpcResponse) => void) {
    const body = JSON.stringify(payload)
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
        callback(null, JSON.parse(data))
      } catch (e) {
        callback(new Error(`Invalid JSON response: ${data}`))
      }
    })

    socket.on('error', (err) => {
      callback(err)
    })
  }
}

/** @internal */
export function getProviderForKit(url: string, options: HttpProviderOptions | undefined): Provider {
  if (url.endsWith('.ipc')) {
    return new SimpleIpcProvider(url, net)
  } else {
    return new SimpleHttpProvider(url, options)
  }
}

/**
 * @deprecated Use getProviderForKit instead
 * @internal
 */
export function getWeb3ForKit(url: string, options: HttpProviderOptions | undefined): any {
  // Return an object that looks like Web3 for backward compat with Connection constructor
  const provider = getProviderForKit(url, options)
  return { currentProvider: provider }
}
