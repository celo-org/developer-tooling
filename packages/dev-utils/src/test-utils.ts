import { Connection, Provider, JsonRpcPayload, JsonRpcResponse, Web3 } from '@celo/connect'
import BigNumber from 'bignumber.js'
import { randomBytes } from 'crypto'
import * as http from 'http'
import {
  encodePacked,
  getAddress,
  isAddress,
  isHex,
  keccak256,
  pad,
  toBytes,
  toHex,
  type Hex,
} from 'viem'
import { privateKeyToAddress } from 'viem/accounts'
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
        (err: Error | null, res?: JsonRpcResponse) => {
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

// -- soliditySha3 / sha3 helpers (mirrors @celo/utils/lib/solidity) --

type SolidityValue =
  | string
  | number
  | bigint
  | boolean
  | { type: string; value: unknown }
  | { t: string; v: unknown }

function soliditySha3(...args: SolidityValue[]): string | null {
  if (args.length === 0) return null

  const types: string[] = []
  const values: unknown[] = []

  for (const arg of args) {
    if (typeof arg === 'object' && arg !== null && 'type' in arg && 'value' in arg) {
      types.push(arg.type as string)
      values.push(arg.value)
    } else if (typeof arg === 'object' && arg !== null && 't' in arg && 'v' in arg) {
      const shorthand = arg as { t: string; v: unknown }
      types.push(shorthand.t)
      values.push(shorthand.v)
    } else if (typeof arg === 'string') {
      if (isHex(arg, { strict: true })) {
        types.push('bytes')
        values.push(arg)
      } else {
        types.push('string')
        values.push(arg)
      }
    } else if (typeof arg === 'number' || typeof arg === 'bigint') {
      types.push('uint256')
      values.push(BigInt(arg))
    } else if (typeof arg === 'boolean') {
      types.push('bool')
      values.push(arg)
    }
  }

  // Coerce values for bytesN types
  for (let i = 0; i < types.length; i++) {
    const bytesMatch = types[i].match(/^bytes(\d+)$/)
    if (bytesMatch && typeof values[i] === 'string') {
      const size = parseInt(bytesMatch[1], 10)
      let hex: Hex
      if (isHex(values[i] as string, { strict: true })) {
        hex = values[i] as Hex
      } else {
        hex = toHex(toBytes(values[i] as string))
      }
      const byteLen = (hex.length - 2) / 2
      if (byteLen < size) {
        values[i] = pad(hex, { size, dir: 'right' })
      } else if (byteLen > size) {
        values[i] = ('0x' + hex.slice(2, 2 + size * 2)) as Hex
      }
    }
  }

  const packed = encodePacked(types, values)
  return keccak256(packed)
}

function sha3(...args: SolidityValue[]): string | null {
  if (args.length === 1 && typeof args[0] === 'string') {
    const input = args[0]
    if (isHex(input, { strict: true })) {
      return keccak256(input as Hex)
    }
    return keccak256(toBytes(input))
  }
  return soliditySha3(...args)
}

function toWei(value: string, unit: string): string {
  const multipliers: Record<string, string> = {
    wei: '1',
    kwei: '1000',
    mwei: '1000000',
    gwei: '1000000000',
    szabo: '1000000000000',
    finney: '1000000000000000',
    ether: '1000000000000000000',
  }
  const multiplier = multipliers[unit] || multipliers.ether
  return new BigNumber(value).times(multiplier).toFixed(0)
}

/**
 * Creates a web3-like shim object backed by a Connection.
 * Provides `currentProvider`, `eth.*`, and `utils.*` for backward compatibility with tests.
 */
function createWeb3Shim(provider: Provider): Web3 {
  const conn = new Connection(provider)

  const shim = {
    currentProvider: conn.currentProvider,
    eth: {
      getAccounts: () => conn.getAccounts(),
      getBalance: (address: string) =>
        conn.rpcCaller
          .call('eth_getBalance', [address, 'latest'])
          .then((r: any) => String(parseInt(r.result, 16))),
      getBlockNumber: () => conn.getBlockNumber(),
      sign: conn.sign.bind(conn),
      call: (tx: any) => conn.rpcCaller.call('eth_call', [tx, 'latest']).then((r: any) => r.result),
      sendTransaction: async (tx: any) => {
        const result = await conn.sendTransaction(tx)
        const receipt = await result.waitReceipt()
        return receipt
      },
      getBlock: (blockHashOrNumber: any) =>
        conn.rpcCaller
          .call('eth_getBlockByNumber', [
            typeof blockHashOrNumber === 'number'
              ? '0x' + blockHashOrNumber.toString(16)
              : blockHashOrNumber,
            false,
          ])
          .then((r: any) => r.result),
      getTransactionReceipt: (txHash: string) => conn.getTransactionReceipt(txHash),
      getChainId: () => conn.chainId(),
      getPastLogs: (params: any) =>
        conn.rpcCaller.call('eth_getLogs', [params]).then((r: any) => r.result),
      Contract: function ContractCompat(this: any, abi: any, address?: string) {
        return conn.createContract(abi, address || '0x0000000000000000000000000000000000000000')
      },
      abi: {
        encodeFunctionCall: (abi: any, params: any[]) =>
          conn.getAbiCoder().encodeFunctionCall(abi, params),
      },
      personal: {
        lockAccount: (address: string) => conn.rpcCaller.call('personal_lockAccount', [address]),
        unlockAccount: (address: string, password: string, duration: number) =>
          conn.rpcCaller.call('personal_unlockAccount', [address, password, duration]),
      },
      accounts: {
        create: () => {
          const privateKey = ('0x' + randomBytes(32).toString('hex')) as `0x${string}`
          const address = privateKeyToAddress(privateKey)
          return { address, privateKey }
        },
      },
    },
    utils: {
      toWei,
      toChecksumAddress: (address: string) => getAddress(address),
      isAddress: (address: string) => isAddress(address),
      soliditySha3: (...args: any[]) => soliditySha3(...args),
      sha3: (...args: any[]) => sha3(...args),
      keccak256: (value: string) => conn.keccak256(value),
    },
  }

  return shim as Web3
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
  const client = createWeb3Shim(provider)

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
