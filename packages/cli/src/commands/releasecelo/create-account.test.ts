import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import CreateAccount from './create-account'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:create-account cmd', (client) => {
  let contractAddress: string
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

  it('can create an account', async () => {
    const accountWrapper = await kit.contracts.getAccounts()

    expect(await accountWrapper.isAccount(contractAddress)).toBeFalsy()

    await testLocallyWithWeb3Node(CreateAccount, ['--contract', contractAddress], client)

    expect(await accountWrapper.isAccount(contractAddress)).toBeTruthy()
  })
})
