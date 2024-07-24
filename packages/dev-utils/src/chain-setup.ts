import { newGovernance } from '@celo/abis/web3/Governance'
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

    const { transactionHash } = await validators.methods
      .setCommissionUpdateDelay(delayInBlocks)
      .send({
        from: DEFAULT_OWNER_ADDRESS,
      })
    await web3.eth.getTransactionReceipt(transactionHash)
  })
}

export async function setDequeueFrequency(
  web3: Web3,
  governanceContractAddress: StrongAddress,
  frequency: number
) {
  withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
    const governance = newGovernance(web3, governanceContractAddress)

    const { transactionHash } = await governance.methods.setDequeueFrequency(frequency).send({
      from: DEFAULT_OWNER_ADDRESS,
    })
    await web3.eth.getTransactionReceipt(transactionHash)
  })
}

export async function setReferendumStageDuration(
  web3: Web3,
  governanceContractAddress: StrongAddress,
  duration: number
) {
  withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
    const governance = newGovernance(web3, governanceContractAddress)

    const { transactionHash } = await governance.methods.setReferendumStageDuration(duration).send({
      from: DEFAULT_OWNER_ADDRESS,
    })
    await web3.eth.getTransactionReceipt(transactionHash)
  })
}
