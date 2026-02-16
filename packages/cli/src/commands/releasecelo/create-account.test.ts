import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { testLocallyWithNode } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import CreateAccount from './create-account'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:create-account cmd', (client) => {
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

  it('can create an account', async () => {
    const accountWrapper = await kit.contracts.getAccounts()

    expect(await accountWrapper.isAccount(contractAddress)).toBeFalsy()

    await testLocallyWithNode(CreateAccount, ['--contract', contractAddress], client)

    expect(await accountWrapper.isAccount(contractAddress)).toBeTruthy()
  })
})
