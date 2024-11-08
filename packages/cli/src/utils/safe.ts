import { StrongAddress } from '@celo/base'
import { CeloTransactionObject } from '@celo/connect'
import { CeloProvider } from '@celo/connect/lib/celo-provider'
import Safe from '@safe-global/protocol-kit'

export const createSafeFromWeb3 = async (
  web3: any,
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

export const createApproveSafeTransactionIfNotApproved = async (
  safe: Safe,
  tx: CeloTransactionObject<any>,
  toAddress: StrongAddress,
  ownerAddress: StrongAddress
): Promise<ReturnType<Safe['approveTransactionHash']> | null> => {
  const safeTransaction = await safe.createTransaction({
    transactions: [
      {
        to: toAddress,
        data: tx.txo.encodeABI(),
        value: '0',
      },
    ],
  })

  const txHash = await safe.getTransactionHash(safeTransaction)

  if (!(await safe.getOwnersWhoApprovedTx(txHash)).includes(ownerAddress)) {
    return safe.approveTransactionHash(txHash)
  }

  return null
}

export const createExecuteSafeTransactionIfThresholdMet = async (
  safe: Safe,
  tx: CeloTransactionObject<any>,
  toAddress: StrongAddress
): Promise<ReturnType<Safe['executeTransaction']> | null> => {
  const safeTransaction = await safe.createTransaction({
    transactions: [
      {
        to: toAddress,
        data: tx.txo.encodeABI(),
        value: '0',
      },
    ],
  })

  const txHash = await safe.getTransactionHash(safeTransaction)

  if ((await safe.getOwnersWhoApprovedTx(txHash)).length >= (await safe.getThreshold())) {
    return safe.executeTransaction(safeTransaction)
  }

  return null
}
