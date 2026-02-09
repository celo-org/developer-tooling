import { newReleaseGold } from '@celo/abis/web3/ReleaseGold'
import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { ReleaseGoldWrapper } from '@celo/contractkit/lib/wrappers/ReleaseGold'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { getContractFromEvent } from '@celo/dev-utils/ganache-test'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import RefundAndFinalize from './refund-and-finalize'
import Revoke from './revoke'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:refund-and-finalize cmd', (client) => {
  let contractAddress: any
  let kit: ContractKit

  beforeEach(async () => {
    const accounts = (await client.eth.getAccounts()) as StrongAddress[]
    kit = newKitFromWeb3(client)

    contractAddress = await deployReleaseGoldContract(
      client,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      accounts[1],
      accounts[0],
      accounts[2]
    )
  })

  test('can refund celo', async () => {
    await testLocallyWithWeb3Node(Revoke, ['--contract', contractAddress, '--yesreally'], client)
    const releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      newReleaseGold(client, contractAddress),
      kit.contracts
    )
    const refundAddress = await releaseGoldWrapper.getRefundAddress()
    const balanceBefore = await kit.getTotalBalance(refundAddress)
    await testLocallyWithWeb3Node(RefundAndFinalize, ['--contract', contractAddress], client)
    const balanceAfter = await kit.getTotalBalance(refundAddress)
    expect(balanceBefore.CELO!.toNumber()).toBeLessThan(balanceAfter.CELO!.toNumber())
  })

  test('can finalize the contract', async () => {
    const releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      newReleaseGold(client, contractAddress),
      kit.contracts
    )

    expect(await releaseGoldWrapper.isRevoked()).toBe(false)
    await testLocallyWithWeb3Node(Revoke, ['--contract', contractAddress, '--yesreally'], client)
    expect(await releaseGoldWrapper.isRevoked()).toBe(true)

    // Contract still should have some balance
    expect((await kit.getTotalBalance(contractAddress)).CELO).not.toEqBigNumber(0)

    await testLocallyWithWeb3Node(RefundAndFinalize, ['--contract', contractAddress], client)

    const destroyedContractAddress = await getContractFromEvent(
      'ReleaseGoldInstanceDestroyed(address,address)',
      client
    )

    expect(destroyedContractAddress).toBe(contractAddress)
    // Contract should not have any balance left anymore
    expect((await kit.getTotalBalance(contractAddress)).CELO).toEqBigNumber(0)
  })
})
