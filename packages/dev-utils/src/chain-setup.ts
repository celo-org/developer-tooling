import { governanceABI, validatorsABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import { DEFAULT_OWNER_ADDRESS, withImpersonatedAccount } from './anvil-test'

export async function setCommissionUpdateDelay(
  web3: any,
  validatorsContractAddress: StrongAddress,
  delayInBlocks: number
) {
  await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
    const validators = new web3.eth.Contract(validatorsABI, validatorsContractAddress)

    const { transactionHash } = await validators.methods
      .setCommissionUpdateDelay(delayInBlocks)
      .send({
        from: DEFAULT_OWNER_ADDRESS,
      })
    await web3.eth.getTransactionReceipt(transactionHash)
  })
}

export async function setDequeueFrequency(
  web3: any,
  governanceContractAddress: StrongAddress,
  frequency: number
) {
  await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
    const governance = new web3.eth.Contract(governanceABI, governanceContractAddress)

    const { transactionHash } = await governance.methods.setDequeueFrequency(frequency).send({
      from: DEFAULT_OWNER_ADDRESS,
    })
    await web3.eth.getTransactionReceipt(transactionHash)
  })
}

export async function setReferendumStageDuration(
  web3: any,
  governanceContractAddress: StrongAddress,
  duration: number
) {
  await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
    const governance = new web3.eth.Contract(governanceABI, governanceContractAddress)

    const { transactionHash } = await governance.methods.setReferendumStageDuration(duration).send({
      from: DEFAULT_OWNER_ADDRESS,
    })
    await web3.eth.getTransactionReceipt(transactionHash)
  })
}
