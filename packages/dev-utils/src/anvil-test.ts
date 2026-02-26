import { StrongAddress } from '@celo/base'
import { Provider } from '@celo/connect'
import { Anvil, CreateAnvilOptions, createAnvil } from '@viem/anvil'
import BigNumber from 'bignumber.js'
import {
  TEST_BALANCE,
  TEST_BASE_FEE,
  TEST_GAS_LIMIT,
  TEST_GAS_PRICE,
  TEST_MNEMONIC,
  jsonRpcCall,
  testWithWeb3,
} from './test-utils'

let instance: null | Anvil = null

export const ANVIL_PORT = 8546

export const STABLES_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

// Introducing a different name for the same address to avoid confusion
export const DEFAULT_OWNER_ADDRESS = STABLES_ADDRESS

export const GROUP_ADDRESSES = [
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
]

// Addresses are generated during migrations and need to be extracted from logs
export enum LinkedLibraryAddress {
  AddressSortedLinkedListWithMedian = '0x5fbdb2315678afecb367f032d93f642f64180aa3',
  Signatures = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
}

function createInstance(stateFilePath: string, chainId?: number): Anvil {
  const port = ANVIL_PORT + (process.pid - process.ppid)
  const options: CreateAnvilOptions = {
    port,
    loadState: stateFilePath,
    mnemonic: TEST_MNEMONIC,
    balance: TEST_BALANCE,
    gasPrice: TEST_GAS_PRICE,
    gasLimit: TEST_GAS_LIMIT,
    blockBaseFeePerGas: TEST_BASE_FEE,
    codeSizeLimit: 50000000,
    startTimeout: 60_000,
    stopTimeout: 1000,
    chainId,
  }

  instance = createAnvil(options)

  return instance
}

type TestWithAnvilOptions = {
  chainId?: number
}

export function testWithAnvilL2(
  name: string,
  fn: (provider: Provider) => void,
  options?: TestWithAnvilOptions
) {
  return testWithAnvil(require.resolve('@celo/devchain-anvil/l2-devchain.json'), name, fn, options)
}

function testWithAnvil(
  stateFilePath: string,
  name: string,
  fn: (provider: Provider) => void,
  options?: TestWithAnvilOptions
) {
  const anvil = createInstance(stateFilePath, options?.chainId)

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
  provider: Provider,
  address: string,
  withBalance?: number | bigint | BigNumber
) {
  return Promise.all([
    jsonRpcCall(provider, 'anvil_impersonateAccount', [address]),
    withBalance
      ? jsonRpcCall(provider, 'anvil_setBalance', [address, `0x${withBalance.toString(16)}`])
      : undefined,
  ])
}

export function stopImpersonatingAccount(provider: Provider, address: string) {
  return jsonRpcCall(provider, 'anvil_stopImpersonatingAccount', [address])
}

export const withImpersonatedAccount = async (
  provider: Provider,
  account: string,
  fn: () => Promise<void>,
  withBalance?: number | bigint | BigNumber
) => {
  await impersonateAccount(provider, account, withBalance)
  await fn()
  await stopImpersonatingAccount(provider, account)
}

export const asCoreContractsOwner = async (
  provider: Provider,
  fn: (ownerAddress: StrongAddress) => Promise<void>,
  withBalance?: number | bigint | BigNumber
) => {
  await withImpersonatedAccount(
    provider,
    DEFAULT_OWNER_ADDRESS,
    async () => {
      await fn(DEFAULT_OWNER_ADDRESS)
    },
    withBalance
  )
}

export function setCode(provider: Provider, address: string, code: string) {
  return jsonRpcCall(provider, 'anvil_setCode', [address, code])
}

export function setNextBlockTimestamp(provider: Provider, timestamp: number) {
  return jsonRpcCall(provider, 'evm_setNextBlockTimestamp', [timestamp.toString()])
}

export function setBalance(
  provider: Provider,
  address: StrongAddress,
  balance: number | bigint | BigNumber
) {
  return jsonRpcCall(provider, 'anvil_setBalance', [address, `0x${balance.toString(16)}`])
}
