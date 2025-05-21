import { governanceABI, validatorsABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import Web3 from 'web3'
import { DEFAULT_OWNER_ADDRESS, withImpersonatedAccount } from './anvil-test'

export async function setCommissionUpdateDelay(
  web3: Web3,
  validatorsContractAddress: StrongAddress,
  delayInBlocks: number
) {
  await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
    // @ts-expect-error
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
  web3: Web3,
  governanceContractAddress: StrongAddress,
  frequency: number
) {
  await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
    // @ts-expect-error
    const governance = new web3.eth.Contract(governanceABI, governanceContractAddress)

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
  await withImpersonatedAccount(web3, DEFAULT_OWNER_ADDRESS, async () => {
    // @ts-expect-error
    const governance = new web3.eth.Contract(governanceABI, governanceContractAddress)

    const { transactionHash } = await governance.methods.setReferendumStageDuration(duration).send({
      from: DEFAULT_OWNER_ADDRESS,
    })
    await web3.eth.getTransactionReceipt(transactionHash)
  })
}
