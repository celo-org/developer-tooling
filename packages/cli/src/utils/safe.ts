import { StrongAddress } from '@celo/base'
import { CeloTransactionObject, type Provider } from '@celo/connect'
import { CeloProvider } from '@celo/connect/lib/celo-provider'
import Safe from '@safe-global/protocol-kit'
import { MetaTransactionData, TransactionResult } from '@safe-global/types-kit'
import { displaySafeTx } from './cli'

export const createSafeFromWeb3 = async (
  providerOwner: { currentProvider: Provider },
  signer: StrongAddress,
  safeAddress: StrongAddress
) => {
  if (!(providerOwner.currentProvider instanceof CeloProvider)) {
    throw new Error('Unexpected web3 provider')
  }

  return await Safe.init({
    provider: providerOwner.currentProvider.toEip1193Provider(),
    signer,
    safeAddress,
  })
}

export const safeTransactionMetadataFromCeloTransactionObject = async (
  tx: CeloTransactionObject<unknown>,
  toAddress: StrongAddress,
  value = '0'
): Promise<MetaTransactionData> => {
  return {
    to: toAddress,
    data: tx.txo.encodeABI(),
    value,
  }
}

export const performSafeTransaction = async (
  providerOwner: { currentProvider: Provider },
  safeAddress: StrongAddress,
  safeSigner: StrongAddress,
  txData: MetaTransactionData
) => {
  const safe = await createSafeFromWeb3(providerOwner, safeSigner, safeAddress)
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
