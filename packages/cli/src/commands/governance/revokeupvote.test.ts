import { StrongAddress } from '@celo/base'
import { newKitFromProvider } from '@celo/contractkit'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import { testLocallyWithNode } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from '../lockedcelo/lock'
import RevokeUpvote from './revokeupvote'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('governance:revokeupvote cmd', (provider) => {
  let minDeposit: BigNumber
  const kit = newKitFromProvider(provider)
  const proposalId = '2'

  let accounts: StrongAddress[] = []
  let governance: GovernanceWrapper

  beforeEach(async () => {
    accounts = (await kit.connection.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]
    governance = await kit.contracts.getGovernance()
    minDeposit = await governance.minDeposit()

    for (let i = 1; i <= 2; i++) {
      const proposeHash = await governance.propose([], `URL${i}`, {
        from: accounts[0],
        value: minDeposit.toFixed(),
      })
      await kit.connection.waitForTransactionReceipt(proposeHash)
    }

    for (let i = 1; i <= 4; i++) {
      await testLocallyWithNode(Register, ['--from', accounts[i]], provider)
      await testLocallyWithNode(Lock, ['--from', accounts[i], '--value', i.toString()], provider)

      await governance.upvote(proposalId, accounts[i], {
        from: accounts[i],
      })
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
    await testLocallyWithNode(RevokeUpvote, ['--from', accounts[2]], provider)

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
