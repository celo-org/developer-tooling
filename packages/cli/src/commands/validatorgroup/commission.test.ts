import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { setCommissionUpdateDelay } from '@celo/dev-utils/chain-setup'
import { mineBlocks } from '@celo/dev-utils/ganache-test'
import { testLocallyWithNode } from '../../test-utils/cliUtils'
import AccountRegister from '../account/register'
import Lock from '../lockedcelo/lock'
import Commission from './commission'
import ValidatorGroupRegister from './register'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validatorgroup:comission cmd', (providerOwner) => {
  const registerValidatorGroup = async () => {
    const kit = newKitFromProvider(providerOwner.currentProvider)
    const accounts = await kit.connection.getAccounts()

    await testLocallyWithNode(AccountRegister, ['--from', accounts[0]], providerOwner)
    await testLocallyWithNode(
      Lock,
      ['--from', accounts[0], '--value', '10000000000000000000000'],
      providerOwner
    )
    await testLocallyWithNode(
      ValidatorGroupRegister,
      ['--from', accounts[0], '--commission', '0.1', '--yes'],
      providerOwner
    )
  }

  test('can queue update', async () => {
    const kit = newKitFromProvider(providerOwner.currentProvider)
    const accounts = await kit.connection.getAccounts()
    await registerValidatorGroup()
    await testLocallyWithNode(Commission, ['--from', accounts[0], '--queue-update', '0.2'], providerOwner)
  })
  test('can apply update', async () => {
    const kit = newKitFromProvider(providerOwner.currentProvider)
    const accounts = await kit.connection.getAccounts()
    const validatorsWrapper = await kit.contracts.getValidators()

    // Set commission update delay to 3 blocks for backwards compatibility
    await setCommissionUpdateDelay(providerOwner, validatorsWrapper.address, 3)

    await registerValidatorGroup()
    await testLocallyWithNode(Commission, ['--from', accounts[0], '--queue-update', '0.2'], providerOwner)

    await mineBlocks(3, providerOwner)

    await testLocallyWithNode(Commission, ['--from', accounts[0], '--apply'], providerOwner)
  })
})
