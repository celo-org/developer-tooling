import { StrongAddress } from '@celo/base'
import { Provider, getRandomId } from '@celo/connect'
import { newKitFromWeb3 } from '@celo/contractkit'
import { GovernanceWrapper, ProposalStage } from '@celo/contractkit/lib/wrappers/Governance'
import { testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import { timeTravel } from '@celo/dev-utils/lib/ganache-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import { changeMultiSigOwner } from '../../test-utils/chain-setup'
import { stripAnsiCodes, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Approve from './approve'

process.env.NO_SYNCCHECK = 'true'

testWithAnvil('governance:approve cmd', (web3: Web3) => {
  function sendRawTx(method: string, params: any[]) {
    return new Promise<string>((resolve, reject) => {
      ;(kit.web3.currentProvider as Provider).send(
        {
          id: getRandomId(),
          jsonrpc: '2.0',
          method,
          params,
        },
        (error, resp) => {
          if (error) {
            reject(error)
          } else if (resp) {
            resolve(resp.result as string)
          } else {
            reject(new Error('empty-response'))
          }
        }
      )
    })
  }

  const kit = newKitFromWeb3(web3)
  const proposalID = '1'
  let minDeposit: string

  let accounts: StrongAddress[] = []
  let governance: GovernanceWrapper

  beforeEach(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]
    governance = await kit.contracts.getGovernance()
    minDeposit = (await governance.minDeposit()).toFixed()

    await governance
      .propose([], 'URL')
      .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })

    const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()

    await timeTravel(dequeueFrequency, web3)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('approve fails if approver not passed in', async () => {
    await expect(
      testLocallyWithWeb3Node(Approve, ['--from', accounts[0], '--proposalID', proposalID], web3)
    ).rejects.toThrow("Some checks didn't pass!")
  })

  test('fails when account is not multisig owner', async () => {
    const writeMock = jest.spyOn(ux.write, 'stdout')
    const logMock = jest.spyOn(console, 'log')

    await expect(
      testLocallyWithWeb3Node(
        Approve,
        ['--from', accounts[0], '--proposalID', proposalID, '--useMultiSig'],
        web3
      )
    ).rejects.toThrow("Some checks didn't pass!")

    expect(await governance.isApproved(proposalID)).toEqual(false)
    expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✔  0x1B46C60e8B3B427d91d35df22FCfc3FF36407f35 is approver address ",
        ],
        [
          "   ✘  0x5409ED021D9299bf6814279A6A1411A7e866A631 is multisig signatory ",
        ],
        [
          "   ✔  1 is an existing proposal ",
        ],
        [
          "   ✔  1 is in stage Referendum or Execution ",
        ],
        [
          "   ✔  1 not already approved ",
        ],
      ]
    `)
    expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
  })

  test('can approve with multisig option', async () => {
    await changeMultiSigOwner(kit, accounts[0])

    const writeMock = jest.spyOn(ux.write, 'stdout')
    const logMock = jest.spyOn(console, 'log')

    await testLocallyWithWeb3Node(
      Approve,
      ['--from', accounts[0], '--proposalID', proposalID, '--useMultiSig'],
      web3
    )

    expect(await governance.isApproved(proposalID)).toEqual(true)
    expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✔  0x1B46C60e8B3B427d91d35df22FCfc3FF36407f35 is approver address ",
        ],
        [
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is multisig signatory ",
        ],
        [
          "   ✔  1 is an existing proposal ",
        ],
        [
          "   ✔  1 is in stage Referendum or Execution ",
        ],
        [
          "   ✔  1 not already approved ",
        ],
        [
          "All checks passed",
        ],
        [
          "SendTransaction: approveTx",
        ],
        [
          "txHash: 0x2d94ff2c52c79fe05df141be1e366935bb3e360d03bbc7fce3274bd6324aa707",
        ],
      ]
    `)
    expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
  })

  describe('approve succeeds if stage is "Referendum or Execution" or "Approval"', () => {
    test('can be approved if version >= 3 (default)', async () => {
      const logMock = jest.spyOn(console, 'log')

      await governance
        .propose([], 'https://example.com')
        .sendAndWaitForReceipt({ value: minDeposit })

      const approver = await governance.getApprover()
      await sendRawTx('anvil_impersonateAccount', [approver])
      await sendRawTx('anvil_setBalance', [approver, '0x10000000000000000000'])

      let proposalId = (await governance.getQueue())[0].proposalID
      await expect(governance.getProposalStage(proposalId)).resolves.toBe(ProposalStage.Queued)
      await expect(
        testLocallyWithWeb3Node(
          Approve,
          ['--from', approver, '--proposalID', proposalId.toString()],
          web3
        )
      ).rejects.not.toBeUndefined()
      const schedule = await governance.proposalSchedule(proposalId)
      expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  0x1B46C60e8B3B427d91d35df22FCfc3FF36407f35 is approver address ",
          ],
          [
            "   ✔  2 is an existing proposal ",
          ],
          [
            "Expiration: ${schedule.Expiration?.toString()} (~${schedule.Expiration?.toExponential(
        3
      )})
        Queued: ${schedule.Queued?.toString()} (~${schedule.Queued?.toExponential(3)})",
          ],
          [
            "   ✘  2 is in stage Referendum or Execution ",
          ],
          [
            "   ✔  2 not already approved ",
          ],
        ]
      `)
      logMock.mockClear()

      const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()
      await timeTravel(dequeueFrequency, web3)
      await governance.dequeueProposalsIfReady().sendAndWaitForReceipt()

      await governance.vote(proposalId, 'Yes')
      await expect(governance.getProposalStage(proposalId)).resolves.toBe(ProposalStage.Referendum)
      await testLocallyWithWeb3Node(
        Approve,
        ['--from', approver, '--proposalID', proposalId.toString()],
        web3
      )
      const txHash = stripAnsiCodes(logMock.mock.calls.at(-3)![0].split(':')[1].trim())
      expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  0x1B46C60e8B3B427d91d35df22FCfc3FF36407f35 is approver address ",
          ],
          [
            "   ✔  2 is an existing proposal ",
          ],
          [
            "   ✔  2 is in stage Referendum or Execution ",
          ],
          [
            "   ✔  2 not already approved ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: approveTx",
          ],
          [
            "txHash: ${txHash}",
          ],
          [
            "ProposalApproved:",
          ],
          [
            "proposalId: 2",
          ],
        ]
      `)
    })
  })
})
