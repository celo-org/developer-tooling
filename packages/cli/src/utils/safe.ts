import { StrongAddress } from '@celo/base'
import { CeloTransactionObject } from '@celo/connect'
import { CeloProvider } from '@celo/connect/lib/celo-provider'
import Safe from '@safe-global/protocol-kit'
import { MetaTransactionData, TransactionResult } from '@safe-global/types-kit'
import Web3 from 'web3'
import { displaySendSafeTx } from './cli'

// TODO require CeloProvider directly
export const createSafeFromWeb3 = async (
  web3: Web3,
  signer: StrongAddress,
  safeAddress: StrongAddress
) => {
  if (!(web3.currentProvider instanceof CeloProvider)) {
    throw new Error('Unexpected web3 provider')
  }

  return await Safe.init({
    provider: web3.currentProvider.toEip1193Provider(),
    signer,
    safeAddress,
  })
}

export const safeTransactionMetadataFromCeloTransactionObject = async (
  tx: CeloTransactionObject<any>,
  toAddress: StrongAddress
): Promise<MetaTransactionData> => {
  return {
    to: toAddress,
    data: tx.txo.encodeABI(),
    value: '0',
  }
}

export const performSafeTransaction = async (
  web3: Web3,
  safeAddress: StrongAddress,
  safeSigner: StrongAddress,
  txData: MetaTransactionData
) => {
  const safe = await createSafeFromWeb3(web3, safeSigner, safeAddress)

  const approveTx = await createApproveSafeTransactionIfNotApproved(safe, txData, safeSigner)

  if (approveTx !== null) {
    // @ts-ignore
    await displaySendSafeTx('approveTx', approveTx)
  }

  const executeTx = await createExecuteSafeTransactionIfThresholdMet(safe, txData)

  if (executeTx !== null) {
    // @ts-expect-error
    await displaySendSafeTx('executeTx', executeTx)
  }
}

const createApproveSafeTransactionIfNotApproved = async (
  safe: Safe,
  txData: MetaTransactionData,
  ownerAddress: StrongAddress
): Promise<Promise<TransactionResult> | null> => {
  const txHash = await safe.getTransactionHash(
    await safe.createTransaction({
      transactions: [txData],
    })
  )

  if (!(await safe.getOwnersWhoApprovedTx(txHash)).includes(ownerAddress)) {
    return safe.approveTransactionHash(txHash)
  }

  return null
}

const createExecuteSafeTransactionIfThresholdMet = async (
  safe: Safe,
  txData: MetaTransactionData
): Promise<Promise<TransactionResult> | null> => {
  const tx = await safe.createTransaction({
    transactions: [txData],
  })
  const txHash = await safe.getTransactionHash(tx)

  if ((await safe.getOwnersWhoApprovedTx(txHash)).length >= (await safe.getThreshold())) {
    return safe.executeTransaction(tx)
  }

  return null
}
