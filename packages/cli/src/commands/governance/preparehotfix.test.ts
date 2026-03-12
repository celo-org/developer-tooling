import { hexToBuffer } from '@celo/base'
import { newKitFromProvider } from '@celo/contractkit'
import {
  DEFAULT_OWNER_ADDRESS,
  setNextBlockTimestamp,
  testWithAnvilL2,
  withImpersonatedAccount,
} from '@celo/dev-utils/anvil-test'
import { testLocallyWithNode } from '../../test-utils/cliUtils'
import { getCurrentTimestamp } from '../../utils/cli'
import Approve from './approve'
import PrepareHotfix from './preparehotfix'
import { parseEther } from 'viem'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('governance:preparehotfix cmd', (provider) => {
  const HOTFIX_HASH = '0x8ad3719bb2577b277bcafc1f00ac2f1c3fa5e565173303684d0a8d4f3661680c'
  const HOTFIX_BUFFER = hexToBuffer(HOTFIX_HASH)
  const EXECUTION_TIME_LIMIT = 86400

  it('should prepare a hotfix successfuly', async () => {
    const kit = newKitFromProvider(provider)
    const governanceWrapper = await kit.contracts.getGovernance()
    const [approverAccount, securityCouncilAccount] = await kit.connection.getAccounts()
    // arbitrary 100 seconds to the future to avoid
    // Timestamp error: X is lower than or equal to previous block's timestamp
    const nextTimestamp = getCurrentTimestamp() + 100

    // send some funds to DEFAULT_OWNER_ADDRESS to execute transactions
    await kit.sendTransaction({
      to: DEFAULT_OWNER_ADDRESS,
      from: approverAccount,
      value: parseEther('1').toString(),
    })

    await withImpersonatedAccount(provider, DEFAULT_OWNER_ADDRESS, async () => {
      // setHotfixExecutionTimeWindow to EXECUTION_TIME_LIMIT (86400)
      await kit.sendTransaction({
        to: governanceWrapper.address,
        from: DEFAULT_OWNER_ADDRESS,
        data: '0x745407c80000000000000000000000000000000000000000000000000000000000015180',
      })

      // setApprover to 0x5409ED021D9299bf6814279A6A1411A7e866A631
      await kit.sendTransaction({
        to: governanceWrapper.address,
        from: DEFAULT_OWNER_ADDRESS,
        data: `0x3156560e000000000000000000000000${approverAccount
          .replace('0x', '')
          .toLowerCase()}`,
      })

      // setSecurityCouncil to 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb
      await kit.sendTransaction({
        to: governanceWrapper.address,
        from: DEFAULT_OWNER_ADDRESS,
        data: `0x1c1083e2000000000000000000000000${securityCouncilAccount
          .replace('0x', '')
          .toLowerCase()}`,
      })
    })

    await testLocallyWithNode(
      Approve,
      ['--hotfix', HOTFIX_HASH, '--from', approverAccount],
      provider
    )

    await testLocallyWithNode(
      Approve,
      ['--hotfix', HOTFIX_HASH, '--from', securityCouncilAccount, '--type', 'securityCouncil'],
      provider
    )

    await setNextBlockTimestamp(provider, nextTimestamp)

    await testLocallyWithNode(
      PrepareHotfix,
      ['--hash', HOTFIX_HASH, '--from', approverAccount],
      provider
    )

    expect(await governanceWrapper.getHotfixRecord(HOTFIX_BUFFER)).toMatchInlineSnapshot(`
      {
        "approved": true,
        "councilApproved": true,
        "executed": false,
        "executionTimeLimit": "${(nextTimestamp + EXECUTION_TIME_LIMIT).toString()}",
      }
    `)
  })
})
