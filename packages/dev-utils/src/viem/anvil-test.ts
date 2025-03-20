import { StrongAddress } from '@celo/base'
import { Anvil, createAnvil, CreateAnvilOptions } from '@viem/anvil'
import { createTestClient, http, publicActions, TestClient, walletActions } from 'viem'
import { celo } from 'viem/chains'
import { TEST_BALANCE, TEST_GAS_LIMIT, TEST_GAS_PRICE, TEST_MNEMONIC } from '../test-utils'
import { testWithViem } from './test-utils'

let instance: null | Anvil = null

const ANVIL_PORT = 8546

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

function createInstance(stateFilePath: string, chainId?: number) {
  const port = ANVIL_PORT + (process.pid - process.ppid)
  const options: CreateAnvilOptions = {
    port,
    loadState: stateFilePath,
    mnemonic: TEST_MNEMONIC,
    balance: TEST_BALANCE,
    gasPrice: TEST_GAS_PRICE,
    gasLimit: TEST_GAS_LIMIT,
    blockBaseFeePerGas: 0,
    stopTimeout: 1000,
    chainId,
  }

  instance = createAnvil(options)

  const client = createTestClient({
    mode: 'anvil',
    transport: http(),
    chain: {
      ...celo,
      rpcUrls: {
        default: { http: [`http://127.0.0.1:${instance.port}`] },
      },
    },
  })
    .extend(walletActions)
    .extend(publicActions)

  return {
    instance,
    client,
  }
}

type TestWithAnvilOptions = {
  chainId?: number
}

export type CeloTestClient = ReturnType<typeof createInstance>['client']

export function testWithAnvilL1(
  name: string,
  fn: (client: CeloTestClient) => void,
  options?: TestWithAnvilOptions
) {
  return testWithAnvil(require.resolve('@celo/devchain-anvil/devchain.json'), name, fn, options)
}

export function testWithAnvilL2(
  name: string,
  fn: (client: CeloTestClient) => void,
  options?: TestWithAnvilOptions
) {
  return testWithAnvil(require.resolve('@celo/devchain-anvil/l2-devchain.json'), name, fn, options)
}

function testWithAnvil(
  stateFilePath: string,
  name: string,
  fn: (client: CeloTestClient) => void,
  options?: TestWithAnvilOptions
) {
  const { instance, client } = createInstance(stateFilePath, options?.chainId)

  // for each test suite, we start and stop a new anvil instance
  return testWithViem(name, client, fn, {
    runIf:
      process.env.RUN_ANVIL_TESTS === 'true' || typeof process.env.RUN_ANVIL_TESTS === 'undefined',
    hooks: {
      beforeAll: async () => {
        await instance.start()
      },
      afterAll: async () => {
        await instance.stop()
      },
    },
  })
}

export function impersonateAccount(
  testClient: CeloTestClient,
  address: `0x${string}`,
  withBalance?: number | bigint
) {
  return Promise.all([
    testClient.impersonateAccount({ address }),
    withBalance
      ? testClient.setBalance({
          address,
          value: BigInt(withBalance),
        })
      : undefined,
  ])
}

export function stopImpersonatingAccount(testClient: TestClient, address: `0x${string}`) {
  return testClient.stopImpersonatingAccount({ address })
}

export const withImpersonatedAccount = async (
  testClient: CeloTestClient,
  account: `0x${string}`,
  fn: () => Promise<void>,
  withBalance?: number | bigint
) => {
  await impersonateAccount(testClient, account, withBalance)
  await fn()
  await stopImpersonatingAccount(testClient, account)
}

export const asCoreContractsOwner = async (
  testClient: CeloTestClient,
  fn: (ownerAddress: StrongAddress) => Promise<void>,
  withBalance?: number | bigint
) => {
  await withImpersonatedAccount(
    testClient,
    DEFAULT_OWNER_ADDRESS,
    async () => {
      await fn(DEFAULT_OWNER_ADDRESS)
    },
    withBalance
  )
}

export function setCode(testClient: CeloTestClient, address: `0x${string}`, code: `0x${string}`) {
  return testClient.setCode({ address, bytecode: code })
}

export function setNextBlockTimestamp(testClient: CeloTestClient, timestamp: number | bigint) {
  return testClient.setNextBlockTimestamp({ timestamp: BigInt(timestamp) })
}

export function setBalance(
  testClient: CeloTestClient,
  address: `0x${string}`,
  balance: number | bigint
) {
  return testClient.setBalance({ address, value: BigInt(balance) })
}
