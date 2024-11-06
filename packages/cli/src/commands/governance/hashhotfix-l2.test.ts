import { PROXY_ADMIN_ADDRESS } from '@celo/connect'
import { setCode, testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import fs from 'fs'
import path from 'path'
import Web3 from 'web3'
import { stripAnsiCodesAndTxHashes, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import HashHotfix from './hashhotfix'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('governance:hashhotfix cmd', (web3: Web3) => {
  const SALT = '0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658'
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
  const HOTFIX_TRANSACTIONS_FILE_PATH = path.join(__dirname, 'hashhotfix-l2-transactions.json')
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

  it('should hash a hotfix successfuly with --force flag', async () => {
    const logMock = jest.spyOn(console, 'log')

    await testLocallyWithWeb3Node(
      HashHotfix,
      ['--jsonTransactions', HOTFIX_TRANSACTIONS_FILE_PATH, '--salt', SALT, '--force'],
      web3
    )

    expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
      .toMatchInlineSnapshot(`
      [
        [
          "salt: 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658, buf: 614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658",
        ],
        [
          "hash: 0x8ad3719bb2577b277bcafc1f00ac2f1c3fa5e565173303684d0a8d4f3661680c",
        ],
      ]
    `)
  })

  it('should verify and hash a hotfix successfuly', async () => {
    await setCode(web3, PROXY_ADMIN_ADDRESS, TEST_TRANSACTIONS_BYTECODE)

    const logMock = jest.spyOn(console, 'log')

    await testLocallyWithWeb3Node(
      HashHotfix,
      ['--jsonTransactions', HOTFIX_TRANSACTIONS_FILE_PATH, '--salt', SALT],
      web3
    )

    expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
      .toMatchInlineSnapshot(`
      [
        [
          "Simulating proposal execution",
        ],
        [
          "   ✔  Transaction 0 success!",
        ],
        [
          "salt: 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658, buf: 614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658",
        ],
        [
          "hash: 0x8ad3719bb2577b277bcafc1f00ac2f1c3fa5e565173303684d0a8d4f3661680c",
        ],
      ]
    `)
  })

  it('should fail when hotfix does not pass verification', async () => {
    const logMock = jest.spyOn(console, 'log')

    await testLocallyWithWeb3Node(
      HashHotfix,
      ['--jsonTransactions', HOTFIX_TRANSACTIONS_FILE_PATH, '--salt', SALT],
      web3
    )

    expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
      .toMatchInlineSnapshot(`
      [
        [
          "Simulating proposal execution",
        ],
        [
          "   ✘  Transaction 0 failure: Error: EVM error OpcodeNotFound",
        ],
      ]
    `)
  })
})
