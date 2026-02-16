import { releaseGoldABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromProvider } from '@celo/contractkit'
import { ReleaseGoldWrapper } from '@celo/contractkit/lib/wrappers/ReleaseGold'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { testLocallyWithNode } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import SetLiquidityProvision from './set-liquidity-provision'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:set-liquidity-provision cmd', (client) => {
  let contractAddress: string
  let kit: ContractKit

  beforeEach(async () => {
    kit = newKitFromProvider(client.currentProvider)
    const accounts = (await kit.connection.getAccounts()) as StrongAddress[]

    contractAddress = await deployReleaseGoldContract(
      client,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      accounts[1],
      accounts[0],
      accounts[2]
    )
  })

  it('sets liqudity provision', async () => {
    const releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      kit.connection.createContract(releaseGoldABI as any, contractAddress),
      kit.contracts
    )

    expect(await releaseGoldWrapper.getLiquidityProvisionMet()).toBeFalsy()

    await testLocallyWithNode(
      SetLiquidityProvision,
      ['--contract', contractAddress, '--yesreally'],
      client
    )

    expect(await releaseGoldWrapper.getLiquidityProvisionMet()).toBeTruthy()
  })
})
