import Web3 from 'web3'
import { JsonRpcResponse } from 'web3-core-helpers'
import migrationOverride from './migration-override.json'

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

export function jsonRpcCall<O>(web3: Web3, method: string, params: any[]): Promise<O> {
  return new Promise<O>((resolve, reject) => {
    if (web3.currentProvider && typeof web3.currentProvider !== 'string') {
      // @ts-expect-error
      web3.currentProvider.send(
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

export function evmRevert(web3: Web3, snapId: string): Promise<void> {
  return jsonRpcCall(web3, 'evm_revert', [snapId])
}

export function evmSnapshot(web3: Web3) {
  return jsonRpcCall<string>(web3, 'evm_snapshot', [])
}

type TestWithWeb3Hooks = {
  beforeAll?: () => Promise<void>
  afterAll?: () => Promise<void>
}

/**
 * Creates a test suite with a given name and provides function with a web3 instance connected to the given rpcUrl.
 *
 * It is an equivalent of jest `describe` with the web3 additioon. It also provides hooks for beforeAll and afterAll.
 *
 * Optionally if a runIf flag is set to false the test suite will be skipped (useful for conditional test suites). By
 * default all test suites are run normally, but if the runIf flag is set to false the test suite will be skipped by using
 * jest `describe.skip`. It will be reported in the summary as "skipped".
 */
export function testWithWeb3(
  name: string,
  rpcUrl: string,
  fn: (web3: Web3) => void,
  options: {
    hooks?: TestWithWeb3Hooks
    runIf?: boolean
  } = {}
) {
  const web3 = new Web3(rpcUrl)

  // @ts-ignore with anvil setup the tx receipt is apparently not immedietaly
  // available after the tx is send, so by default it was waiting for 1000 ms
  // before polling again making the tests slow
  web3.eth.transactionPollingInterval = 10

  // By default we run all the tests
  let describeFn = describe

  // and only skip them if explicitly stated
  if (options.runIf === false) {
    describeFn = describe.skip
  }

  describeFn(name, () => {
    let snapId: string | null = null

    if (options.hooks?.beforeAll) {
      beforeAll(options.hooks.beforeAll)
    }

    beforeEach(async () => {
      if (snapId != null) {
        await evmRevert(web3, snapId)
      }
      snapId = await evmSnapshot(web3)
    })

    afterAll(async () => {
      if (snapId != null) {
        await evmRevert(web3, snapId)
      }
      if (options.hooks?.afterAll) {
        // hook must be awaited here or jest doesnt actually wait for it and complains of open handles
        await options.hooks.afterAll()
      }
    })

    fn(web3)
  })
}
