import { hexToBuffer } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import {
  DEFAULT_OWNER_ADDRESS,
  setNextBlockTimestamp,
  setupL2,
  testWithAnvil,
  withImpersonatedAccount,
} from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Approve from './approve'
import PrepareHotfix from './preparehotfix'

process.env.NO_SYNCCHECK = 'true'

testWithAnvil('governance:preparehotfix cmd', (web3: Web3) => {
  const HOTFIX_HASH = '0xbf670baa773b342120e1af45433a465bbd6fa289a5cf72763d63d95e4e22482d'
  const HOTFIX_BUFFER = hexToBuffer(HOTFIX_HASH)
  const EXECUTION_TIME_LIMIT = 86400

  it('should prepare a hotfix successfuly', async () => {
    const kit = newKitFromWeb3(web3)
    const governanceWrapper = await kit.contracts.getGovernance()
    const [approverAccount, securityCouncilAccount] = await web3.eth.getAccounts()
    // arbitrary 100 seconds to the future to avoid
    // Timestamp error: X is lower than or equal to previous block's timestamp
    const nextTimestamp = Math.floor(Date.now() / 1000) + 100

    await setupL2(web3)

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

    await setNextBlockTimestamp(web3, nextTimestamp.toString())

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
