import { newValidators } from '@celo/abis/web3/Validators'
import { StrongAddress } from '@celo/base'
import Web3 from 'web3'
import { DEFAULT_OWNER_ADDRESS, withImpersonatedAccount } from './anvil-test'

export async function setCommissionUpdateDelay(
  web3: Web3,
  validatorsContractAddress: StrongAddress,
  delayInBlocks: number
) {
  withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
    const validators = newValidators(web3, validatorsContractAddress)

    await validators.methods.setCommissionUpdateDelay(delayInBlocks).send({
      from: DEFAULT_OWNER_ADDRESS,
    })
  })
}
