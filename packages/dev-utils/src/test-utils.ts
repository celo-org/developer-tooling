import Web3 from 'web3'
import { JsonRpcResponse } from 'web3-core-helpers'
import migrationOverride from './migration-override.json'

export const TEST_MNEMONIC =
  'concert load couple harbor equip island argue ramp clarify fence smart topic'
export const TEST_BALANCE = 1000000
export const TEST_GAS_PRICE = 0
export const TEST_GAS_LIMIT = 20000000
export const TEST_TIMESTAMP = 1718872285

export const NetworkConfig = migrationOverride

export function jsonRpcCall<O>(web3: Web3, method: string, params: any[]): Promise<O> {
  return new Promise<O>((resolve, reject) => {
    if (web3.currentProvider && typeof web3.currentProvider !== 'string') {
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
            // eslint-disable-next-line  @typescript-eslint/no-unsafe-argument
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

export function testWithWeb3(
  name: string,
  rpcUrl: string,
  fn: (web3: Web3) => void,
  hooks?: TestWithWeb3Hooks
) {
  const web3 = new Web3(rpcUrl)

  describe(name, () => {
    let snapId: string | null = null

    if (hooks?.beforeAll) {
      beforeAll(hooks.beforeAll)
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
    })

    if (hooks?.afterAll) {
      afterAll(hooks.afterAll)
    }

    fn(web3)
  })
}
