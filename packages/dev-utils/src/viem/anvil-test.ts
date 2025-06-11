import { StrongAddress } from '@celo/base'
import { Anvil, createAnvil, CreateAnvilOptions } from '@viem/anvil'
import {
  Account,
  Address,
  Client,
  createTestClient,
  Hex,
  http,
  HttpTransport,
  PublicActions,
  publicActions,
  RpcSchema,
  TestActions,
  WalletActions,
  walletActions,
} from 'viem'
import { celo, celoAlfajores } from 'viem/chains'
import { ANVIL_PORT, DEFAULT_OWNER_ADDRESS } from '../anvil-test'
import { TEST_BALANCE, TEST_GAS_LIMIT, TEST_GAS_PRICE, TEST_MNEMONIC } from '../test-utils'
import { celoBaklava } from './chains'
import { testWithViem } from './test-utils'

let instance: null | Anvil = null

type chains = typeof celo | typeof celoAlfajores | typeof celoBaklava
export type TestClientExtended<account extends Account | undefined = Account | undefined> = Client<
  HttpTransport,
  chains,
  account,
  RpcSchema,
  TestActions & PublicActions<HttpTransport, chains, account> & WalletActions<chains, account>
>

function createInstance(opts?: { chainId?: number; forkUrl?: string; forkBlockNumber?: number }): {
  instance: Anvil
  client: TestClientExtended
} {
  const forkUrl = opts?.forkUrl
  const forkBlockNumber = opts?.forkBlockNumber

  const port = ANVIL_PORT + (process.pid - process.ppid)
  const options: CreateAnvilOptions = {
    port,
    mnemonic: TEST_MNEMONIC,
    balance: TEST_BALANCE,
    gasPrice: TEST_GAS_PRICE,
    gasLimit: TEST_GAS_LIMIT,
    blockBaseFeePerGas: 25000000000,
    stopTimeout: 3000,
    chainId: opts?.chainId,
    ...(forkUrl
      ? { forkUrl, forkBlockNumber, forkHeader: { 'User-Agent': 'anvil/devtooling' } }
      : { loadState: require.resolve('@celo/devchain-anvil/devchain.json') }),
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
    .extend(publicActions) as unknown as TestClientExtended

  return {
    instance,
    client,
  }
}

function testWithAnvil(
  name: string,
  fn: (client: TestClientExtended) => void,
  options?: {
    chainId?: number
    forkUrl?: string
    forkBlockNumber?: number
    skipRevert?: boolean // if true, the snapshot will not be reverted after each test
  }
) {
  const { instance, client } = createInstance(options)
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
    skipRevert: options?.skipRevert,
  })
}

function impersonateAccount(
  testClient: TestClientExtended,
  address: Address,
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

function stopImpersonatingAccount(testClient: TestClientExtended, address: Address) {
  return testClient.stopImpersonatingAccount({ address })
}

async function withImpersonatedAccount(
  testClient: TestClientExtended,
  account: Address,
  fn: () => Promise<void>,
  withBalance?: number | bigint
) {
  await impersonateAccount(testClient, account, withBalance)
  await fn()
  await stopImpersonatingAccount(testClient, account)
}

async function asCoreContractsOwner(
  testClient: TestClientExtended,
  fn: (ownerAddress: StrongAddress) => Promise<void>,
  withBalance?: number | bigint
) {
  await withImpersonatedAccount(
    testClient,
    DEFAULT_OWNER_ADDRESS,
    async () => {
      await fn(DEFAULT_OWNER_ADDRESS)
    },
    withBalance
  )
}

function setCode(testClient: TestClientExtended, address: Address, code: Hex) {
  return testClient.setCode({ address, bytecode: code })
}

function setNextBlockTimestamp(testClient: TestClientExtended, timestamp: number | bigint) {
  return testClient.setNextBlockTimestamp({ timestamp: BigInt(timestamp) })
}

function setBalance(testClient: TestClientExtended, address: Address, balance: number | bigint) {
  return testClient.setBalance({ address, value: BigInt(balance) })
}

export {
  asCoreContractsOwner as viem_asCoreContractsOwner,
  impersonateAccount as viem_impersonateAccount,
  setBalance as viem_setBalance,
  setCode as viem_setCode,
  setNextBlockTimestamp as viem_setNextBlockTimestamp,
  stopImpersonatingAccount as viem_stopImpersonatingAccount,
  testWithAnvil as viem_testWithAnvil,
  withImpersonatedAccount as viem_withImpersonatedAccount,
}
