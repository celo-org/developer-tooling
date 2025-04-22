import { newReleaseGold } from '@celo/abis/web3/ReleaseGold'
import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { ReleaseGoldWrapper } from '@celo/contractkit/lib/wrappers/ReleaseGold'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import SetLiquidityProvision from './set-liquidity-provision'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:set-liquidity-provision cmd', (web3: Web3) => {
  let contractAddress: string
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

  it('sets liqudity provision', async () => {
    const releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      newReleaseGold(kit.connection.web3, contractAddress),
      kit.contracts
    )

    expect(await releaseGoldWrapper.getLiquidityProvisionMet()).toBeFalsy()

    await testLocallyWithWeb3Node(
      SetLiquidityProvision,
      ['--contract', contractAddress, '--yesreally'],
      web3
    )

    expect(await releaseGoldWrapper.getLiquidityProvisionMet()).toBeTruthy()
  })
})
