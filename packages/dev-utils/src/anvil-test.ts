import { StrongAddress } from '@celo/base'
import { Anvil, CreateAnvilOptions, createAnvil } from '@viem/anvil'
import BigNumber from 'bignumber.js'
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

function createInstance(stateFilePath: string): Anvil {
  const port = ANVIL_PORT + (process.pid - process.ppid)
  const options: CreateAnvilOptions = {
    port,
    loadState: stateFilePath,
    mnemonic: TEST_MNEMONIC,
    balance: TEST_BALANCE,
    gasPrice: TEST_GAS_PRICE,
    gasLimit: TEST_GAS_LIMIT,
    stopTimeout: 1000,
  }

  instance = createAnvil(options)

  return instance
}

export function testWithAnvilL1(name: string, fn: (web3: Web3) => void) {
  return testWithAnvil(require.resolve('@celo/devchain-anvil/devchain.json'), name, fn)
}

export function testWithAnvilL2(name: string, fn: (web3: Web3) => void) {
  return testWithAnvil(require.resolve('@celo/devchain-anvil/l2-devchain.json'), name, fn)
}

function testWithAnvil(stateFilePath: string, name: string, fn: (web3: Web3) => void) {
  const anvil = createInstance(stateFilePath)

  // for each test suite, we start and stop a new anvil instance
  return testWithWeb3(name, `http://127.0.0.1:${anvil.port}`, fn, {
    runIf:
      process.env.RUN_ANVIL_TESTS === 'true' || typeof process.env.RUN_ANVIL_TESTS === 'undefined',
    hooks: {
      beforeAll: async () => {
        await anvil.start()
      },
      afterAll: async () => {
        await anvil.stop()
      },
    },
  })
}

export function impersonateAccount(
  web3: Web3,
  address: string,
  withBalance?: number | bigint | BigNumber
) {
  return Promise.all([
    jsonRpcCall(web3, 'anvil_impersonateAccount', [address]),
    withBalance
      ? jsonRpcCall(web3, 'anvil_setBalance', [address, `0x${withBalance.toString(16)}`])
      : undefined,
  ])
}

export function stopImpersonatingAccount(web3: Web3, address: string) {
  return jsonRpcCall(web3, 'anvil_stopImpersonatingAccount', [address])
}

export const withImpersonatedAccount = async (
  web3: Web3,
  account: string,
  fn: () => Promise<void>,
  withBalance?: number | bigint | BigNumber
) => {
  await impersonateAccount(web3, account, withBalance)
  await fn()
  await stopImpersonatingAccount(web3, account)
}

export const asCoreContractsOwner = async (
  web3: Web3,
  fn: (ownerAddress: StrongAddress) => Promise<void>
) => {
  await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
    await fn(DEFAULT_OWNER_ADDRESS)
  })
}

export function setCode(web3: Web3, address: string, code: string) {
  return jsonRpcCall(web3, 'anvil_setCode', [address, code])
}

export function setNextBlockTimestamp(web3: Web3, timestamp: number) {
  return jsonRpcCall(web3, 'evm_setNextBlockTimestamp', [timestamp.toString()])
}

export function setBalance(
  web3: Web3,
  address: StrongAddress,
  balance: number | bigint | BigNumber
) {
  return jsonRpcCall(web3, 'anvil_setBalance', [address, `0x${balance.toString(16)}`])
}
