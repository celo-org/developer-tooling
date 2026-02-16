import { governanceABI, validatorsABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import { AbiItem, Connection } from '@celo/connect'
import { DEFAULT_OWNER_ADDRESS, withImpersonatedAccount } from './anvil-test'
import { type ProviderOwner } from './test-utils'

export async function setCommissionUpdateDelay(
  client: ProviderOwner,
  validatorsContractAddress: StrongAddress,
  delayInBlocks: number
) {
  const conn = new Connection(client.currentProvider)
  await withImpersonatedAccount(client, DEFAULT_OWNER_ADDRESS, async () => {
    const validators = conn.createContract(
      validatorsABI as unknown as AbiItem[],
      validatorsContractAddress
    )

    const { transactionHash } = await validators.methods
      .setCommissionUpdateDelay(delayInBlocks)
      .send({
        from: DEFAULT_OWNER_ADDRESS,
      })
    await conn.getTransactionReceipt(transactionHash)
  })
}

export async function setDequeueFrequency(
  client: ProviderOwner,
  governanceContractAddress: StrongAddress,
  frequency: number
) {
  const conn = new Connection(client.currentProvider)
  await withImpersonatedAccount(client, DEFAULT_OWNER_ADDRESS, async () => {
    const governance = conn.createContract(
      governanceABI as unknown as AbiItem[],
      governanceContractAddress
    )

    const { transactionHash } = await governance.methods.setDequeueFrequency(frequency).send({
      from: DEFAULT_OWNER_ADDRESS,
    })
    await conn.getTransactionReceipt(transactionHash)
  })
}

export async function setReferendumStageDuration(
  client: ProviderOwner,
  governanceContractAddress: StrongAddress,
  duration: number
) {
  const conn = new Connection(client.currentProvider)
  await withImpersonatedAccount(client, DEFAULT_OWNER_ADDRESS, async () => {
    const governance = conn.createContract(
      governanceABI as unknown as AbiItem[],
      governanceContractAddress
    )

    const { transactionHash } = await governance.methods.setReferendumStageDuration(duration).send({
      from: DEFAULT_OWNER_ADDRESS,
    })
    await conn.getTransactionReceipt(transactionHash)
  })
}
