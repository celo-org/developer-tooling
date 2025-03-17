import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { setCommissionUpdateDelay } from '@celo/dev-utils/lib/chain-setup'
import { mineBlocks } from '@celo/dev-utils/lib/ganache-test'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import AccountRegister from '../account/register'
import Lock from '../lockedcelo/lock'
import Commission from './commission'
import ValidatorGroupRegister from './register'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validatorgroup:comission cmd', (web3: Web3) => {
  const registerValidatorGroup = async () => {
    const accounts = await web3.eth.getAccounts()

    await testLocallyWithWeb3Node(AccountRegister, ['--from', accounts[0]], web3)
    await testLocallyWithWeb3Node(
      Lock,
      ['--from', accounts[0], '--value', '10000000000000000000000'],
      web3
    )
    await testLocallyWithWeb3Node(
      ValidatorGroupRegister,
      ['--from', accounts[0], '--commission', '0.1', '--yes'],
      web3
    )
  }

  test('can queue update', async () => {
    const accounts = await web3.eth.getAccounts()
    await registerValidatorGroup()
    await testLocallyWithWeb3Node(
      Commission,
      ['--from', accounts[0], '--queue-update', '0.2'],
      web3
    )
  })
  test('can apply update', async () => {
    const accounts = await web3.eth.getAccounts()
    const kit = newKitFromWeb3(web3)
    const validatorsWrapper = await kit.contracts.getValidators()

    // Set commission update delay to 3 blocks for backwards compatibility
    await setCommissionUpdateDelay(web3, validatorsWrapper.address, 3)

    await registerValidatorGroup()
    await testLocallyWithWeb3Node(
      Commission,
      ['--from', accounts[0], '--queue-update', '0.2'],
      web3
    )

    await mineBlocks(3, web3)

    await testLocallyWithWeb3Node(Commission, ['--from', accounts[0], '--apply'], web3)
  })
})
