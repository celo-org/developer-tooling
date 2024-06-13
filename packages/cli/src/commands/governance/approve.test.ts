import { StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import {
  impersonateAccount,
  stopImpersonatingAccount,
  testWithAnvil,
} from '@celo/dev-utils/lib/anvil-test'
import { NetworkConfig, timeTravel } from '@celo/dev-utils/lib/ganache-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import { stripAnsiCodes, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Approve from './approve'

process.env.NO_SYNCCHECK = 'true'

const expConfig = NetworkConfig.governance

testWithAnvil('governance:approve cmd', (web3: Web3) => {
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
    await timeTravel(expConfig.dequeueFrequency, web3)
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
          "   ✔  0x1288C356E8d9F2811F10B8E92dBADbf3bCEC12F8 is approver address ",
        ],
        [
          "   ✘  0x5409ED021D9299bf6814279A6A1411A7e866A631 is multisig signatory ",
        ],
        [
          "   ✔  1 is an existing proposal ",
        ],
        [
          "   ✔  1 is in stage Referendum ",
        ],
        [
          "   ✔  1 not already approved ",
        ],
      ]
    `)
    expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
  })

  test('can approve with multisig option', async () => {
    // replace the original owner in the devchain, so we can act as the multisig owner
    // the transaction needs to be sent by the multisig itself and it needs some funds first
    // TODO possibly create a helper function if needed in more tests
    const multisig = await governance.getApproverMultisig()
    await kit.sendTransaction({
      from: accounts[0],
      to: multisig.address,
      value: web3.utils.toWei('1', 'ether'),
    })
    await impersonateAccount(web3, multisig.address)
    await multisig
      .replaceOwner('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', accounts[0])
      .sendAndWaitForReceipt({ from: multisig.address })
    await stopImpersonatingAccount(web3, multisig.address)

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
          "   ✔  0x1288C356E8d9F2811F10B8E92dBADbf3bCEC12F8 is approver address ",
        ],
        [
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is multisig signatory ",
        ],
        [
          "   ✔  1 is an existing proposal ",
        ],
        [
          "   ✔  1 is in stage Referendum ",
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
          "txHash: 0x10ee79a4404b04c5312fe146f49f1f84dd0ee451f5bebbe5dc2b78b2c0f37520",
        ],
      ]
    `)
    expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
  })
})
