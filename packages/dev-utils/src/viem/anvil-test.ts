import { StrongAddress } from '@celo/base'
import { Anvil, createAnvil, CreateAnvilOptions } from '@viem/anvil'
import {
  Account,
  Client,
  createTestClient,
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
import { testWithViem } from './test-utils'

let instance: null | Anvil = null

type chains = typeof celo | typeof celoAlfajores
export type TestClientExtended<account extends Account | undefined = Account | undefined> = Client<
  HttpTransport,
  chains,
  account,
  RpcSchema,
  TestActions & PublicActions<HttpTransport, chains, account> & WalletActions<chains, account>
>

function createInstance(chainId?: number): {
  instance: Anvil
  client: TestClientExtended
} {
  const port = ANVIL_PORT + (process.pid - process.ppid)
  const options: CreateAnvilOptions = {
    port,
    loadState: require.resolve('@celo/devchain-anvil/devchain.json'),
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
  }
) {
  const { instance, client } = createInstance(options?.chainId)

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

function impersonateAccount(
  testClient: TestClientExtended,
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

function stopImpersonatingAccount(testClient: TestClientExtended, address: `0x${string}`) {
  return testClient.stopImpersonatingAccount({ address })
}

async function withImpersonatedAccount(
  testClient: TestClientExtended,
  account: `0x${string}`,
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

function setCode(testClient: TestClientExtended, address: `0x${string}`, code: `0x${string}`) {
  return testClient.setCode({ address, bytecode: code })
}

function setNextBlockTimestamp(testClient: TestClientExtended, timestamp: number | bigint) {
  return testClient.setNextBlockTimestamp({ timestamp: BigInt(timestamp) })
}

function setBalance(
  testClient: TestClientExtended,
  address: `0x${string}`,
  balance: number | bigint
) {
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
