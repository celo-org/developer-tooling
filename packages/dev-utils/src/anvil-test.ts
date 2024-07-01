import { PROXY_ADMIN_ADDRESS } from '@celo/connect'
import { Anvil, CreateAnvilOptions, createAnvil } from '@viem/anvil'
import Web3 from 'web3'
import {
  TEST_BALANCE,
  TEST_GAS_LIMIT,
  TEST_GAS_PRICE,
  TEST_MNEMONIC,
  jsonRpcCall,
  testWithWeb3,
} from './test-utils'

let instance: null | Anvil = null

const ANVIL_PORT = 8546

export const STABLES_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

// Introducing a different name for the same address to avoid confusion
export const DEFAULT_OWNER_ADDRESS = STABLES_ADDRESS

export function createInstance(): Anvil {
  // preparation for not needing to have --runInBand for anvil tests
  const port = ANVIL_PORT + (process.pid - process.ppid)
  const options: CreateAnvilOptions = {
    port,
    loadState: require.resolve('@celo/devchain-anvil/devchain.json'),
    mnemonic: TEST_MNEMONIC,
    balance: TEST_BALANCE,
    gasPrice: TEST_GAS_PRICE,
    gasLimit: TEST_GAS_LIMIT,
  }

  instance = createAnvil(options)

  return instance
}

export function testWithAnvil(name: string, fn: (web3: Web3) => void) {
  const anvil = createInstance()

  // for each test case, we start and stop a new anvil instance
  return testWithWeb3(name, `http://127.0.0.1:${anvil.port}`, fn, {
    beforeAll: () => {
      return anvil.start()
    },
    afterAll: async () => {
      return anvil.stop()
    },
  })
}

export function impersonateAccount(web3: Web3, address: string) {
  return jsonRpcCall(web3, 'anvil_impersonateAccount', [address])
}

export function stopImpersonatingAccount(web3: Web3, address: string) {
  return jsonRpcCall(web3, 'anvil_stopImpersonatingAccount', [address])
}

export const withImpersonatedAccount = async (
  web3: Web3,
  account: string,
  fn: () => Promise<void>
) => {
  await impersonateAccount(web3, account)
  await fn()
  await stopImpersonatingAccount(web3, account)
}

export function setCode(web3: Web3, address: string, code: string) {
  return jsonRpcCall(web3, 'anvil_setCode', [address, code])
}

export function setNextBlockTimestamp(web3: Web3, timestamp: string) {
  return jsonRpcCall(web3, 'evm_setNextBlockTimestamp', [timestamp])
}

// TODO remove this once no longer needed
export const setupL2 = async (web3: Web3) => {
  // Temporarily deploying any bytecode, so it's just there,
  // isCel2 should hence return true as it just checks for bytecode existence
  await setCode(web3, PROXY_ADMIN_ADDRESS, '0x1234567890')
}
