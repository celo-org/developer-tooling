import { newReleaseGold } from '@celo/abis/web3/ReleaseGold'
import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { ReleaseGoldWrapper } from '@celo/contractkit/lib/wrappers/ReleaseGold'
import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import RefundAndFinalize from './refund-and-finalize'
import Revoke from './revoke'
import Show from './show'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL1('releasegold:refund-and-finalize cmd', (web3: Web3) => {
  let contractAddress: any
  let kit: ContractKit

  beforeEach(async () => {
    const accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit = newKitFromWeb3(web3)

    contractAddress = await deployReleaseGoldContract(
      web3,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      accounts[1],
      accounts[0],
      accounts[2]
    )
  })

  test('can refund celo', async () => {
    await testLocallyWithWeb3Node(Revoke, ['--contract', contractAddress, '--yesreally'], web3)
    const releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      newReleaseGold(web3, contractAddress),
      kit.contracts
    )
    const refundAddress = await releaseGoldWrapper.getRefundAddress()
    const balanceBefore = await kit.getTotalBalance(refundAddress)
    await testLocallyWithWeb3Node(RefundAndFinalize, ['--contract', contractAddress], web3)
    const balanceAfter = await kit.getTotalBalance(refundAddress)
    expect(balanceBefore.CELO!.toNumber()).toBeLessThan(balanceAfter.CELO!.toNumber())
  })

  test('can finalize the contract', async () => {
    const releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      newReleaseGold(web3, contractAddress),
      kit.contracts
    )

    expect(await releaseGoldWrapper.isRevoked()).toBe(false)
    await testLocallyWithWeb3Node(Revoke, ['--contract', contractAddress, '--yesreally'], web3)
    expect(await releaseGoldWrapper.isRevoked()).toBe(true)

    await testLocallyWithWeb3Node(RefundAndFinalize, ['--contract', contractAddress], web3)

    // TODO: second call should fail because of reentrancy
    await testLocallyWithWeb3Node(RefundAndFinalize, ['--contract', contractAddress], web3)

    // TODO: expectaion is there because there is selfdestruct in the contract
    await expect(
      testLocallyWithWeb3Node(Show, ['--contract', contractAddress], web3)
    ).rejects.toThrow()
  })
})
