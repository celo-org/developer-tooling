import { Hex } from 'viem'
import { TestClientExtended } from './anvil-test'

type Hooks = {
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
export function testWithViem(
  name: string,
  client: TestClientExtended,
  fn: (testClient: TestClientExtended) => void,
  options: {
    hooks?: Hooks
    runIf?: boolean
    skipRevert?: boolean // if true, the snapshot will not be reverted after each test
  } = {}
) {
  // By default we run all the tests
  let describeFn = describe

  // and only skip them if explicitly stated
  if (options.runIf === false) {
    describeFn = describeFn.skip
  }

  describeFn(name, () => {
    let snapId: Hex | null = null

    if (options.hooks?.beforeAll) {
      beforeAll(options.hooks.beforeAll, 15_000)
    }

    beforeEach(async () => {
      if (snapId != null && !options.skipRevert) {
        await client.revert({ id: snapId })
      }
      snapId = await client.snapshot()
    }, 15_000)

    afterAll(async () => {
      if (snapId != null) {
        await client.revert({ id: snapId })
      }
      if (options.hooks?.afterAll) {
        // hook must be awaited here or jest doesnt actually wait for it and complains of open handles
        await options.hooks.afterAll()
      }
    }, 15_000)

    fn(client)
  })
}
