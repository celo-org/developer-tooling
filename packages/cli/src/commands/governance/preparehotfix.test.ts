import { hexToBuffer } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import {
  DEFAULT_OWNER_ADDRESS,
  setNextBlockTimestamp,
  testWithAnvilL2,
  withImpersonatedAccount,
} from '@celo/dev-utils/anvil-test'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { getCurrentTimestamp } from '../../utils/cli'
import Approve from './approve'
import PrepareHotfix from './preparehotfix'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('governance:preparehotfix cmd', (web3: Web3) => {
  const HOTFIX_HASH = '0x8ad3719bb2577b277bcafc1f00ac2f1c3fa5e565173303684d0a8d4f3661680c'
  const HOTFIX_BUFFER = hexToBuffer(HOTFIX_HASH)
  const EXECUTION_TIME_LIMIT = 86400

  it('should prepare a hotfix successfuly', async () => {
    const kit = newKitFromWeb3(web3)
    const governanceWrapper = await kit.contracts.getGovernance()
    const [approverAccount, securityCouncilAccount] = await web3.eth.getAccounts()
    // arbitrary 100 seconds to the future to avoid
    // Timestamp error: X is lower than or equal to previous block's timestamp
    const nextTimestamp = getCurrentTimestamp() + 100

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

    await setNextBlockTimestamp(web3, nextTimestamp)

    await testLocallyWithWeb3Node(
      PrepareHotfix,
      ['--hash', HOTFIX_HASH, '--from', approverAccount],
      web3
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
