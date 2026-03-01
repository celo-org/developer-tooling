import { StrongAddress } from '@celo/base'
import { type Provider } from '@celo/connect'
import { CeloProvider } from '@celo/connect/lib/celo-provider'
import Safe from '@safe-global/protocol-kit'
import { MetaTransactionData, TransactionResult } from '@safe-global/types-kit'
import { displaySafeTx } from './cli'

export const createSafe = async (
  provider: Provider,
  signer: StrongAddress,
  safeAddress: StrongAddress
) => {
  if (!(provider instanceof CeloProvider)) {
    throw new Error('Expected CeloProvider')
  }

  return await Safe.init({
    provider: provider.toEip1193Provider(),
    signer,
    safeAddress,
  })
}

export const safeTransactionMetadata = (
  encodedData: `0x${string}`,
  toAddress: StrongAddress,
  value = '0'
): MetaTransactionData => {
  return {
    to: toAddress,
    data: encodedData,
    value,
  }
}

export const performSafeTransaction = async (
  provider: Provider,
  safeAddress: StrongAddress,
  safeSigner: StrongAddress,
  txData: MetaTransactionData
) => {
  const safe = await createSafe(provider, safeSigner, safeAddress)
  const approveTxPromise = await createApproveSafeTransactionIfNotApproved(safe, txData, safeSigner)

  if (approveTxPromise) {
    await displaySafeTx('approveTx', approveTxPromise)
  }

  const executeTxPromise = await createExecuteSafeTransactionIfThresholdMet(safe, txData)

  if (executeTxPromise) {
    await displaySafeTx('executeTx', executeTxPromise)
  }
}

const createApproveSafeTransactionIfNotApproved = async (
  safe: Safe,
  txData: MetaTransactionData,
  ownerAddress: StrongAddress
): Promise<TransactionResult | null> => {
  const txHash = await safe.getTransactionHash(
    await safe.createTransaction({
      transactions: [txData],
    })
  )

  if (!(await safe.getOwnersWhoApprovedTx(txHash)).includes(ownerAddress)) {
    return await safe.approveTransactionHash(txHash)
  }

  return null
}

const createExecuteSafeTransactionIfThresholdMet = async (
  safe: Safe,
  txData: MetaTransactionData
): Promise<TransactionResult | null> => {
  const tx = await safe.createTransaction({
    transactions: [txData],
  })
  const txHash = await safe.getTransactionHash(tx)

  if ((await safe.getOwnersWhoApprovedTx(txHash)).length >= (await safe.getThreshold())) {
    return await safe.executeTransaction(tx)
  }

  return null
}
