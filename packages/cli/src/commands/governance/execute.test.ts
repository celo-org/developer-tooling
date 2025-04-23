import { AbiItem, PROXY_ADMIN_ADDRESS } from '@celo/connect'
import { newKitFromWeb3 } from '@celo/contractkit'
import { Proposal } from '@celo/contractkit/lib/wrappers/Governance'
import {
  DEFAULT_OWNER_ADDRESS,
  setCode,
  testWithAnvilL2,
  withImpersonatedAccount,
} from '@celo/dev-utils/lib/anvil-test'
import { timeTravel } from '@celo/dev-utils/lib/ganache-test'
import fs from 'fs'
import path from 'path'
import Web3 from 'web3'
import { stripAnsiCodesAndTxHashes, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Execute from './execute'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('governance:execute cmd', (web3: Web3) => {
  const PROPOSAL_TRANSACTION_TEST_KEY = '3'
  const PROPOSAL_TRANSACTION_TEST_VALUE = '4'
  const PROPOSAL_TRANSACTIONS = [
    {
      to: '0x4200000000000000000000000000000000000018',
      // cast calldata "setValue(uint256,uint256,bool)" 3 4 true
      input:
        '0x319b15bb000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000001',
      value: '0',
    },
  ] as Proposal
  const PROPOSAL_TRANSACTIONS_FILE_PATH = path.join(__dirname, 'proposal-transactions.json')
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
    fs.writeFileSync(PROPOSAL_TRANSACTIONS_FILE_PATH, JSON.stringify(PROPOSAL_TRANSACTIONS), {
      flag: 'w',
    })
  })

  afterAll(async () => {
    fs.rmSync(PROPOSAL_TRANSACTIONS_FILE_PATH)
  })

  it('should execute a proposal successfuly', async () => {
    const kit = newKitFromWeb3(web3)
    const governanceWrapper = await kit.contracts.getGovernance()
    const [approver, proposer, voter] = await web3.eth.getAccounts()
    const minDeposit = (await governanceWrapper.minDeposit()).toFixed()
    const lockedGold = await kit.contracts.getLockedGold()
    const majorityOfVotes = (await lockedGold.getTotalLockedGold()).multipliedBy(0.6)
    const logMock = jest.spyOn(console, 'log')
    const dequeueFrequency = (await governanceWrapper.dequeueFrequency()).toNumber()
    const proposalId = 1

    await setCode(web3, PROXY_ADMIN_ADDRESS, TEST_TRANSACTIONS_BYTECODE)

    await governanceWrapper
      .propose(PROPOSAL_TRANSACTIONS, 'URL')
      .sendAndWaitForReceipt({ from: proposer, value: minDeposit })

    const accountWrapper = await kit.contracts.getAccounts()
    const lockedGoldWrapper = await kit.contracts.getLockedGold()

    await accountWrapper.createAccount().sendAndWaitForReceipt({ from: voter })
    await lockedGoldWrapper
      .lock()
      .sendAndWaitForReceipt({ from: voter, value: majorityOfVotes.toFixed() })

    await timeTravel(dequeueFrequency + 1, web3)

    await governanceWrapper.dequeueProposalsIfReady().sendAndWaitForReceipt({
      from: proposer,
    })

    expect(await governanceWrapper.getDequeue()).toMatchInlineSnapshot(`
        [
          "1",
        ]
      `)
    expect(await governanceWrapper.getQueue()).toMatchInlineSnapshot(`[]`)

    // send some funds to DEFAULT_OWNER_ADDRESS to execute transactions
    await (
      await kit.sendTransaction({
        to: DEFAULT_OWNER_ADDRESS,
        from: approver,
        value: web3.utils.toWei('1', 'ether'),
      })
    ).waitReceipt()

    await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
      // setApprover to approverAccount
      await (
        await kit.sendTransaction({
          to: governanceWrapper.address,
          from: DEFAULT_OWNER_ADDRESS,
          data: `0x3156560e000000000000000000000000${approver.replace('0x', '').toLowerCase()}`,
        })
      ).waitReceipt()
    })

    await (await governanceWrapper.approve(proposalId)).sendAndWaitForReceipt({ from: approver })

    await lockedGoldWrapper.lock().sendAndWaitForReceipt({ from: voter, value: minDeposit })
    await (await governanceWrapper.vote(proposalId, 'Yes')).sendAndWaitForReceipt({ from: voter })
    await timeTravel((await governanceWrapper.stageDurations())['Referendum'].toNumber() + 1, web3)

    const testTransactionsContract = new web3.eth.Contract(
      TEST_TRANSACTIONS_ABI,
      PROXY_ADMIN_ADDRESS
    )

    // TestTransaction contract returns 0 if a value is not set for a given key
    expect(
      await testTransactionsContract.methods.getValue(PROPOSAL_TRANSACTION_TEST_KEY).call()
    ).toEqual('0')

    logMock.mockClear()

    await testLocallyWithWeb3Node(
      Execute,
      ['--proposalID', proposalId.toString(), '--from', proposer],
      web3
    )

    expect(
      await testTransactionsContract.methods.getValue(PROPOSAL_TRANSACTION_TEST_KEY).call()
    ).toEqual(PROPOSAL_TRANSACTION_TEST_VALUE)

    expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
      .toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  1 is an existing proposal ",
          ],
          [
            "   ✔  1 is in stage Execution ",
          ],
          [
            "   ✔  Proposal 1 is passing corresponding constitutional quorum ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: executeTx",
          ],
          [
            "txHash: 0xtxhash",
          ],
          [
            "ProposalExecuted:",
          ],
          [
            "proposalId: 1",
          ],
        ]
      `)
  })
})
