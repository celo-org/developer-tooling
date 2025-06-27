import { newKitFromWeb3 } from '@celo/contractkit'
import { unixSecondsTimestampToDateString } from '@celo/contractkit/lib/wrappers/BaseWrapper'
import { Proposal } from '@celo/contractkit/lib/wrappers/Governance'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import fs from 'fs'
import path from 'node:path'
import Web3 from 'web3'
import { stripAnsiCodesAndTxHashes, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Show from './show'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('governance:show cmd', (web3: Web3) => {
  const PROPOSAL_TRANSACTIONS = [
    {
      to: '0x4200000000000000000000000000000000000018',
      // cast calldata "setValue(uint256,uint256,bool)" 3 4 true
      input:
        '0x319b15bb000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000001',
      value: '0',
    },
  ] as Proposal
  const PROPOSAL_TRANSACTIONS_FILE_PATH = path.join(__dirname, 'show-l2-transactions.json')

  beforeAll(async () => {
    fs.writeFileSync(PROPOSAL_TRANSACTIONS_FILE_PATH, JSON.stringify(PROPOSAL_TRANSACTIONS), {
      flag: 'w',
    })
  })

  afterAll(async () => {
    fs.rmSync(PROPOSAL_TRANSACTIONS_FILE_PATH)
  })

  it('shows a proposal in "Referendum" stage', async () => {
    const kit = newKitFromWeb3(web3)
    const governanceWrapper = await kit.contracts.getGovernance()
    const [proposer, voter] = await web3.eth.getAccounts()
    const minDeposit = (await governanceWrapper.minDeposit()).toFixed()
    const logMock = jest.spyOn(console, 'log')
    const dequeueFrequency = (await governanceWrapper.dequeueFrequency()).toNumber()
    const proposalId = 1

    await governanceWrapper
      .propose(PROPOSAL_TRANSACTIONS, 'URL')
      .sendAndWaitForReceipt({ from: proposer, value: minDeposit })

    const accountWrapper = await kit.contracts.getAccounts()
    const lockedGoldWrapper = await kit.contracts.getLockedGold()

    await accountWrapper.createAccount().sendAndWaitForReceipt({ from: voter })
    await lockedGoldWrapper.lock().sendAndWaitForReceipt({ from: voter, value: minDeposit })

    await timeTravel(dequeueFrequency + 1, web3)

    await governanceWrapper.dequeueProposalsIfReady().sendAndWaitForReceipt({
      from: proposer,
    })

    await (await governanceWrapper.vote(proposalId, 'Yes')).sendAndWaitForReceipt({ from: voter })

    await testLocallyWithWeb3Node(Show, ['--proposalID', proposalId.toString()], web3)

    const schedule = await governanceWrapper.proposalSchedule(proposalId)
    const timestamp = await (await governanceWrapper.getProposalMetadata(proposalId)).timestamp

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
          "All checks passed",
        ],
        [
          "Parsing 1 proposal transactions...",
        ],
        [
          "approvals: 
        approvers: 
          0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
        completion: 0 / 1
        confirmations: 

      approved: false
      metadata: 
        deposit: 100000000000000000000 (~1.000e+20)
        descriptionURL: URL
        proposer: 0x5409ED021D9299bf6814279A6A1411A7e866A631
        timestamp: ${timestamp} (~${timestamp.toExponential(3)})
        transactionCount: 1
      passed: false
      proposal: 
        0: 
          input: 0x319b15bb000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000001
          to: 0x4200000000000000000000000000000000000018
          value: 0
      schedule: 
        Execution: ${unixSecondsTimestampToDateString(schedule.Execution!)}
        Expiration: ${unixSecondsTimestampToDateString(schedule.Expiration!)}
        Referendum: ${unixSecondsTimestampToDateString(schedule.Referendum!)}
      stage: Referendum
      votes: 
        Abstain: 0 
        No: 0 
        Yes: 100000000000000000000 (~1.000e+20)",
        ],
        [
          "Note: required is the minimal amount of yes + abstain votes needed to pass the proposal",
        ],
        [
          "requirements: 
        constitutionThreshold: 0.5 
        required: 300250000000000000000 (~3.003e+20)
        support: 1 
        total: 100000000000000000000 (~1.000e+20)",
        ],
      ]
    `)
  })
})
