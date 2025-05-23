import { PROXY_ADMIN_ADDRESS } from '@celo/connect'
import { setCode, testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import * as celoGovernance from '@celo/governance'
import fs from 'fs'
import path from 'node:path'
import Web3 from 'web3'
import { stripAnsiCodesAndTxHashes, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import TestProposal from './test-proposal'

process.env.NO_SYNCCHECK = 'true'

// Without "mocking" it it's not possible to spy on 'proposalToJSON' later
jest.mock('@celo/governance', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@celo/governance'),
  }
})

testWithAnvilL2('governance:test-proposal cmd', (web3: Web3) => {
  const PROPOSAL_TRANSACTION_TEST_KEY = '3'
  const PROPOSAL_TRANSACTION_TEST_VALUE = '4'
  const PROPOSAL_TRANSACTIONS = [
    {
      address: '0x4200000000000000000000000000000000000018',
      function: 'setValue(uint256,uint256,bool)',
      args: [PROPOSAL_TRANSACTION_TEST_KEY, PROPOSAL_TRANSACTION_TEST_VALUE, true],
      value: 0,
    },
  ]
  const PROPOSAL_TRANSACTIONS_FILE_PATH = path.join(__dirname, 'test-proposal-l2-transactions.json')
  const TEST_TRANSACTIONS_BYTECODE =
    '0x6080604052348015600f57600080fd5b5060043610603c5760003560e01c80630ff4c916146041578063319b15bb14606d5780635e383d21146097575b600080fd5b605b60048036036020811015605557600080fd5b503560b1565b60408051918252519081900360200190f35b609560048036036060811015608157600080fd5b5080359060208101359060400135151560c3565b005b605b6004803603602081101560ab57600080fd5b503560df565b60009081526020819052604090205490565b8060cc57600080fd5b5060009182526020829052604090912055565b6000602081905290815260409020548156fea265627a7a72315820eeaf588d1fe45f3f80f73f8629f5e307d185ecfede11b603e2fab73439b656cf64736f6c63430005110032'

  beforeAll(async () => {
    fs.writeFileSync(PROPOSAL_TRANSACTIONS_FILE_PATH, JSON.stringify(PROPOSAL_TRANSACTIONS), {
      flag: 'w',
    })
  })

  afterAll(async () => {
    fs.rmSync(PROPOSAL_TRANSACTIONS_FILE_PATH)
    jest.clearAllMocks()
  })

  it('should test a proposal successfuly', async () => {
    const proposalToJSONMock = jest
      .spyOn(celoGovernance, 'proposalToJSON')
      .mockImplementation(async () => {
        return {} as any
      })

    await setCode(web3, PROXY_ADMIN_ADDRESS, TEST_TRANSACTIONS_BYTECODE)

    const [account] = await web3.eth.getAccounts()
    const logMock = jest.spyOn(console, 'log')

    await testLocallyWithWeb3Node(
      TestProposal,
      ['--jsonTransactions', PROPOSAL_TRANSACTIONS_FILE_PATH, '--from', account],
      web3
    )

    // Verify we're passing correct arguments to 'proposalToJSON'
    expect(proposalToJSONMock.mock.calls[0][1]).toMatchInlineSnapshot(`
      [
        {
          "input": "0x319b15bb000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000001",
          "to": "0x4200000000000000000000000000000000000018",
          "value": 0,
        },
      ]
    `)

    expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
      .toMatchInlineSnapshot(`
      [
        [
          "",
        ],
        [
          "Simulating proposal execution",
        ],
        [
          "   ✔  Transaction 0 success!",
        ],
      ]
    `)
  })
})
