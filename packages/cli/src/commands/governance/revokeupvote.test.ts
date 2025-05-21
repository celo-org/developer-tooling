import { StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from '../lockedcelo/lock'
import RevokeUpvote from './revokeupvote'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('governance:revokeupvote cmd', (web3: Web3) => {
  let minDeposit: BigNumber
  const kit = newKitFromWeb3(web3)
  const proposalId = '2'

  let accounts: StrongAddress[] = []
  let governance: GovernanceWrapper

  beforeEach(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]
    governance = await kit.contracts.getGovernance()
    minDeposit = await governance.minDeposit()

    for (let i = 1; i <= 2; i++) {
      await governance
        .propose([], `URL${i}`)
        .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit.toFixed() })
    }

    for (let i = 1; i <= 4; i++) {
      await testLocallyWithWeb3Node(Register, ['--from', accounts[i]], web3)
      await testLocallyWithWeb3Node(Lock, ['--from', accounts[i], '--value', i.toString()], web3)

      await (
        await governance.upvote(proposalId, accounts[i])
      ).sendAndWaitForReceipt({ from: accounts[i] })
    }
  })

  it('revoke upvote proposal which cannot be dequeued', async () => {
    // 1 + 2 + 3 + 4 = 10 upvotes
    expect(await governance.getQueue()).toMatchInlineSnapshot(`
      [
        {
          "proposalID": "2",
          "upvotes": "10",
        },
      ]
    `)

    // Revoke upvote from account 2 (2 upvotes)
    await testLocallyWithWeb3Node(RevokeUpvote, ['--from', accounts[2]], web3)

    // 1 + 3 + 4 = 8 upvotes
    expect(await governance.getQueue()).toMatchInlineSnapshot(`
      [
        {
          "proposalID": "2",
          "upvotes": "8",
        },
      ]
    `)
  })
})
