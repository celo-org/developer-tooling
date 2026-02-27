import { governanceABI, validatorsABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import { AbiItem, Connection, createViemTxObject, Provider } from '@celo/connect'
import { DEFAULT_OWNER_ADDRESS, withImpersonatedAccount } from './anvil-test'

export async function setCommissionUpdateDelay(
  provider: Provider,
  validatorsContractAddress: StrongAddress,
  delayInBlocks: number
) {
  const conn = new Connection(provider)
  await withImpersonatedAccount(provider, DEFAULT_OWNER_ADDRESS, async () => {
    const validators = conn.getCeloContract(
      validatorsABI as unknown as AbiItem[],
      validatorsContractAddress
    )

    const transactionHash = await createViemTxObject(conn, validators, 'setCommissionUpdateDelay', [
      delayInBlocks,
    ]).send({
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
    const governance = conn.getCeloContract(
      governanceABI as unknown as AbiItem[],
      governanceContractAddress
    )

    const transactionHash = await createViemTxObject(conn, governance, 'setDequeueFrequency', [
      frequency,
    ]).send({
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
    const governance = conn.getCeloContract(
      governanceABI as unknown as AbiItem[],
      governanceContractAddress
    )

    const transactionHash = await createViemTxObject(
      conn,
      governance,
      'setReferendumStageDuration',
      [duration]
    ).send({
      from: DEFAULT_OWNER_ADDRESS,
    })
    await conn.getTransactionReceipt(transactionHash)
  })
}
