import { governanceABI, validatorsABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import { Connection, Provider } from '@celo/connect'
import { DEFAULT_OWNER_ADDRESS, withImpersonatedAccount } from './anvil-test'
import { encodeFunctionData } from 'viem'

export async function setCommissionUpdateDelay(
  provider: Provider,
  validatorsContractAddress: StrongAddress,
  delayInBlocks: number
) {
  const conn = new Connection(provider)
  await withImpersonatedAccount(provider, DEFAULT_OWNER_ADDRESS, async () => {
    const data = encodeFunctionData({
      abi: validatorsABI,
      functionName: 'setCommissionUpdateDelay',
      args: [BigInt(delayInBlocks)],
    })
    const transactionHash = await conn.sendTransaction({
      to: validatorsContractAddress,
      data,
      from: DEFAULT_OWNER_ADDRESS,
    })
    await conn.getTransactionReceipt(transactionHash)
  })
}

export async function setDequeueFrequency(
  provider: Provider,
  governanceContractAddress: StrongAddress,
  frequency: number
) {
  const conn = new Connection(provider)
  await withImpersonatedAccount(provider, DEFAULT_OWNER_ADDRESS, async () => {
    const data = encodeFunctionData({
      abi: governanceABI,
      functionName: 'setDequeueFrequency',
      args: [BigInt(frequency)],
    })
    const transactionHash = await conn.sendTransaction({
      to: governanceContractAddress,
      data,
      from: DEFAULT_OWNER_ADDRESS,
    })
    await conn.getTransactionReceipt(transactionHash)
  })
}

export async function setReferendumStageDuration(
  provider: Provider,
  governanceContractAddress: StrongAddress,
  duration: number
) {
  const conn = new Connection(provider)
  await withImpersonatedAccount(provider, DEFAULT_OWNER_ADDRESS, async () => {
    const data = encodeFunctionData({
      abi: governanceABI,
      functionName: 'setReferendumStageDuration',
      args: [BigInt(duration)],
    })
    const transactionHash = await conn.sendTransaction({
      to: governanceContractAddress,
      data,
      from: DEFAULT_OWNER_ADDRESS,
    })
    await conn.getTransactionReceipt(transactionHash)
  })
}
