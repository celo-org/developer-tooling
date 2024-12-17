import { hexToBuffer } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { HotfixRecord } from '@celo/contractkit/lib/wrappers/Governance'
import {
  DEFAULT_OWNER_ADDRESS,
  setCode,
  setNextBlockTimestamp,
  testWithAnvilL2,
  withImpersonatedAccount,
} from '@celo/dev-utils/lib/anvil-test'
import fs from 'fs'
import path from 'node:path'
import Web3 from 'web3'
import { AbiItem, PROXY_ADMIN_ADDRESS } from '../../../../sdk/connect/lib'
import {
  EXTRA_LONG_TIMEOUT_MS,
  stripAnsiCodesAndTxHashes,
  testLocallyWithWeb3Node,
} from '../../test-utils/cliUtils'
import Approve from './approve'
import ExecuteHotfix from './executehotfix'
import PrepareHotfix from './preparehotfix'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('governance:executehotfix cmd', (web3: Web3) => {
  const HOTFIX_HASH = '0x8ad3719bb2577b277bcafc1f00ac2f1c3fa5e565173303684d0a8d4f3661680c'
  const HOTFIX_BUFFER = hexToBuffer(HOTFIX_HASH)
  const HOTFIX_TRANSACTION_TEST_KEY = '3'
  const HOTFIX_TRANSACTION_TEST_VALUE = '4'
  const HOTFIX_TRANSACTIONS = [
    {
      address: '0x4200000000000000000000000000000000000018',
      function: 'setValue(uint256,uint256,bool)',
      args: [HOTFIX_TRANSACTION_TEST_KEY, HOTFIX_TRANSACTION_TEST_VALUE, true],
      value: 0,
    },
  ]
  const HOTFIX_TRANSACTIONS_FILE_PATH = path.join(__dirname, 'executehotfix-l2-transactions.json')
  const SALT = '0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658'
  const TEST_TRANSACTIONS_ABI = [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'key',
          type: 'uint256',
        },
      ],
      name: 'getValue',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ] as AbiItem[]
  // Bytecode of https://github.com/celo-org/celo-monorepo/blob/soloseng/governance-hotfix/packages/protocol/contracts/governance/test/TestTransactions.sol#L6
  const TEST_TRANSACTIONS_BYTECODE =
    '0x6080604052348015600f57600080fd5b5060043610603c5760003560e01c80630ff4c916146041578063319b15bb14606d5780635e383d21146097575b600080fd5b605b60048036036020811015605557600080fd5b503560b1565b60408051918252519081900360200190f35b609560048036036060811015608157600080fd5b5080359060208101359060400135151560c3565b005b605b6004803603602081101560ab57600080fd5b503560df565b60009081526020819052604090205490565b8060cc57600080fd5b5060009182526020829052604090912055565b6000602081905290815260409020548156fea265627a7a72315820eeaf588d1fe45f3f80f73f8629f5e307d185ecfede11b603e2fab73439b656cf64736f6c63430005110032'
  beforeAll(async () => {
    fs.writeFileSync(HOTFIX_TRANSACTIONS_FILE_PATH, JSON.stringify(HOTFIX_TRANSACTIONS), {
      flag: 'w',
    })
  })

  afterAll(async () => {
    fs.rmSync(HOTFIX_TRANSACTIONS_FILE_PATH)
  })

  it(
    'should execute a hotfix successfuly',
    async () => {
      const kit = newKitFromWeb3(web3)
      const governanceWrapper = await kit.contracts.getGovernance()
      const [approverAccount, securityCouncilAccount] = await web3.eth.getAccounts()
      const logMock = jest.spyOn(console, 'log')

      await setCode(web3, PROXY_ADMIN_ADDRESS, TEST_TRANSACTIONS_BYTECODE)

      // send some funds to DEFAULT_OWNER_ADDRESS to execute transactions
      await (
        await kit.sendTransaction({
          to: DEFAULT_OWNER_ADDRESS,
          from: approverAccount,
          value: web3.utils.toWei('1', 'ether'),
        })
      ).waitReceipt()

      await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
        // setHotfixExecutionTimeWindow to EXECUTION_TIME_LIMIT (86400)
        await (
          await kit.sendTransaction({
            to: governanceWrapper.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: '0x745407c80000000000000000000000000000000000000000000000000000000000015180',
          })
        ).waitReceipt()

        // setApprover to 0x5409ED021D9299bf6814279A6A1411A7e866A631
        await (
          await kit.sendTransaction({
            to: governanceWrapper.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: `0x3156560e000000000000000000000000${approverAccount
              .replace('0x', '')
              .toLowerCase()}`,
          })
        ).waitReceipt()

        // setSecurityCouncil to 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb
        await (
          await kit.sendTransaction({
            to: governanceWrapper.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: `0x1c1083e2000000000000000000000000${securityCouncilAccount
              .replace('0x', '')
              .toLowerCase()}`,
          })
        ).waitReceipt()
      })

      await testLocallyWithWeb3Node(
        Approve,
        ['--hotfix', HOTFIX_HASH, '--from', approverAccount],
        web3
      )

      await testLocallyWithWeb3Node(
        Approve,
        ['--hotfix', HOTFIX_HASH, '--from', securityCouncilAccount, '--type', 'securityCouncil'],
        web3
      )

      await testLocallyWithWeb3Node(
        PrepareHotfix,
        ['--hash', HOTFIX_HASH, '--from', approverAccount],
        web3
      )

      const testTransactionsContract = new web3.eth.Contract(
        TEST_TRANSACTIONS_ABI,
        PROXY_ADMIN_ADDRESS
      )

      // TestTransaction contract returns 0 if a value is not set for a given key
      expect(
        await testTransactionsContract.methods.getValue(HOTFIX_TRANSACTION_TEST_KEY).call()
      ).toEqual('0')

      logMock.mockClear()

      await testLocallyWithWeb3Node(
        ExecuteHotfix,
        [
          '--jsonTransactions',
          HOTFIX_TRANSACTIONS_FILE_PATH,
          '--from',
          approverAccount,
          '--salt',
          SALT,
        ],
        web3
      )

      expect(
        await testTransactionsContract.methods.getValue(HOTFIX_TRANSACTION_TEST_KEY).call()
      ).toEqual(HOTFIX_TRANSACTION_TEST_VALUE)

      expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
        .toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  Hotfix 0x8ad3719bb2577b277bcafc1f00ac2f1c3fa5e565173303684d0a8d4f3661680c is approved by approver ",
          ],
          [
            "   ✔  Hotfix 0x8ad3719bb2577b277bcafc1f00ac2f1c3fa5e565173303684d0a8d4f3661680c is approved by security council ",
          ],
          [
            "   ✔  Hotfix 0x8ad3719bb2577b277bcafc1f00ac2f1c3fa5e565173303684d0a8d4f3661680c is not already executed ",
          ],
          [
            "   ✔  Hotfix 0x8ad3719bb2577b277bcafc1f00ac2f1c3fa5e565173303684d0a8d4f3661680c is still in its execution time limit window ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: executeHotfixTx",
          ],
          [
            "txHash: 0xtxhash",
          ],
          [
            "HotfixExecuted:",
          ],
          [
            "hash: 0x8ad3719bb2577b277bcafc1f00ac2f1c3fa5e565173303684d0a8d4f3661680c",
          ],
        ]
      `)
    },
    EXTRA_LONG_TIMEOUT_MS
  )

  it(
    'fails if execution time limit has been reached',
    async () => {
      const kit = newKitFromWeb3(web3)
      const governanceWrapper = await kit.contracts.getGovernance()
      const [approverAccount, securityCouncilAccount] = await web3.eth.getAccounts()
      const logMock = jest.spyOn(console, 'log')

      await setCode(web3, PROXY_ADMIN_ADDRESS, TEST_TRANSACTIONS_BYTECODE)

      // send some funds to DEFAULT_OWNER_ADDRESS to execute transactions
      await (
        await kit.sendTransaction({
          to: DEFAULT_OWNER_ADDRESS,
          from: approverAccount,
          value: web3.utils.toWei('1', 'ether'),
        })
      ).waitReceipt()

      await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
        // setHotfixExecutionTimeWindow to 1 second
        await (
          await kit.sendTransaction({
            to: governanceWrapper.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: '0x745407c80000000000000000000000000000000000000000000000000000000000000001',
          })
        ).waitReceipt()

        // setApprover to 0x5409ED021D9299bf6814279A6A1411A7e866A631
        await (
          await kit.sendTransaction({
            to: governanceWrapper.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: `0x3156560e000000000000000000000000${approverAccount
              .replace('0x', '')
              .toLowerCase()}`,
          })
        ).waitReceipt()

        // setSecurityCouncil to 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb
        await (
          await kit.sendTransaction({
            to: governanceWrapper.address,
            from: DEFAULT_OWNER_ADDRESS,
            data: `0x1c1083e2000000000000000000000000${securityCouncilAccount
              .replace('0x', '')
              .toLowerCase()}`,
          })
        ).waitReceipt()
      })

      await testLocallyWithWeb3Node(
        Approve,
        ['--hotfix', HOTFIX_HASH, '--from', approverAccount],
        web3
      )

      await testLocallyWithWeb3Node(
        Approve,
        ['--hotfix', HOTFIX_HASH, '--from', securityCouncilAccount, '--type', 'securityCouncil'],
        web3
      )

      await testLocallyWithWeb3Node(
        PrepareHotfix,
        ['--hash', HOTFIX_HASH, '--from', approverAccount],
        web3
      )

      const testTransactionsContract = new web3.eth.Contract(
        TEST_TRANSACTIONS_ABI,
        PROXY_ADMIN_ADDRESS
      )

      // TestTransaction contract returns 0 if a value is not set for a given key
      expect(
        await testTransactionsContract.methods.getValue(HOTFIX_TRANSACTION_TEST_KEY).call()
      ).toEqual('0')

      const timestampAfterExecutionLimit = (
        (await governanceWrapper.getHotfixRecord(HOTFIX_BUFFER)) as HotfixRecord
      ).executionTimeLimit.plus(1)

      jest
        .spyOn(global.Date, 'now')
        .mockImplementation(() => timestampAfterExecutionLimit.multipliedBy(1000).toNumber())

      await setNextBlockTimestamp(web3, timestampAfterExecutionLimit.toNumber())

      logMock.mockClear()

      await expect(
        testLocallyWithWeb3Node(
          ExecuteHotfix,
          [
            '--jsonTransactions',
            HOTFIX_TRANSACTIONS_FILE_PATH,
            '--from',
            approverAccount,
            '--salt',
            SALT,
          ],
          web3
        )
      ).rejects.toThrow("Some checks didn't pass!")

      // Should still return 0 because the hotfix should not have been executed
      expect(
        await testTransactionsContract.methods.getValue(HOTFIX_TRANSACTION_TEST_KEY).call()
      ).toEqual('0')

      expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
        .toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  Hotfix 0x8ad3719bb2577b277bcafc1f00ac2f1c3fa5e565173303684d0a8d4f3661680c is approved by approver ",
          ],
          [
            "   ✔  Hotfix 0x8ad3719bb2577b277bcafc1f00ac2f1c3fa5e565173303684d0a8d4f3661680c is approved by security council ",
          ],
          [
            "   ✔  Hotfix 0x8ad3719bb2577b277bcafc1f00ac2f1c3fa5e565173303684d0a8d4f3661680c is not already executed ",
          ],
          [
            "   ✘  Hotfix 0x8ad3719bb2577b277bcafc1f00ac2f1c3fa5e565173303684d0a8d4f3661680c is still in its execution time limit window ",
          ],
        ]
      `)
    },
    EXTRA_LONG_TIMEOUT_MS
  )
})
