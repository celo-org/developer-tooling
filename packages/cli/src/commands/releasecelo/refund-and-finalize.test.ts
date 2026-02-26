import { releaseGoldABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromProvider } from '@celo/contractkit'
import { ReleaseGoldWrapper } from '@celo/contractkit/lib/wrappers/ReleaseGold'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { getContractFromEvent } from '@celo/dev-utils/ganache-test'
import { testLocallyWithNode } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import RefundAndFinalize from './refund-and-finalize'
import Revoke from './revoke'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:refund-and-finalize cmd', (provider) => {
  let contractAddress: any
  let kit: ContractKit

  beforeEach(async () => {
    kit = newKitFromProvider(provider)
    const accounts = (await kit.connection.getAccounts()) as StrongAddress[]

    contractAddress = await deployReleaseGoldContract(
      provider,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      accounts[1],
      accounts[0],
      accounts[2]
    )
  })

  test('can refund celo', async () => {
    await testLocallyWithNode(Revoke, ['--contract', contractAddress, '--yesreally'], provider)
    const releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      kit.connection.createContract(releaseGoldABI as any, contractAddress),
      kit.contracts
    )
    const refundAddress = await releaseGoldWrapper.getRefundAddress()
    const balanceBefore = await kit.getTotalBalance(refundAddress)
    await testLocallyWithNode(RefundAndFinalize, ['--contract', contractAddress], provider)
    const balanceAfter = await kit.getTotalBalance(refundAddress)
    expect(balanceBefore.CELO!.toNumber()).toBeLessThan(balanceAfter.CELO!.toNumber())
  })

  test('can finalize the contract', async () => {
    const releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      kit.connection.createContract(releaseGoldABI as any, contractAddress),
      kit.contracts
    )

    expect(await releaseGoldWrapper.isRevoked()).toBe(false)
    await testLocallyWithNode(Revoke, ['--contract', contractAddress, '--yesreally'], provider)
    expect(await releaseGoldWrapper.isRevoked()).toBe(true)

    // Contract still should have some balance
    expect((await kit.getTotalBalance(contractAddress)).CELO).not.toEqBigNumber(0)

    await testLocallyWithNode(RefundAndFinalize, ['--contract', contractAddress], provider)

    const destroyedContractAddress = await getContractFromEvent(
      'ReleaseGoldInstanceDestroyed(address,address)',
      provider
    )

    expect(destroyedContractAddress).toBe(contractAddress)
    // Contract should not have any balance left anymore
    expect((await kit.getTotalBalance(contractAddress)).CELO).toEqBigNumber(0)
  })
})
