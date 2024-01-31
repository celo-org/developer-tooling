import { CeloTx, Connection } from '@celo/connect'
import { Mento } from '@mento-protocol/mento-sdk'
import { ethers } from 'ethers'

export async function getMentoBroker(connection: Connection) {
  const provider = new ethers.providers.Web3Provider(
    connection.web3.currentProvider as unknown as ethers.providers.ExternalProvider
  )
  const mento = await Mento.create(provider)

  const broker = mento.getBroker()

  const brokerAddress = broker.address

  return {
    brokerAddress,
    mento,
  }
}

export function convertEthersToCeloTx(
  tx: ethers.providers.TransactionRequest,
  defaults?: { gas?: string }
): CeloTx {
  const celoTx: CeloTx = {
    from: tx.from,
    to: tx.to,
    nonce: tx.nonce ? Number(tx.nonce.toString()) : undefined,
    gas: tx.gasLimit?.toString() || defaults?.gas,
    gasPrice: tx.gasPrice?.toString(),
    maxFeePerGas: tx.maxFeePerGas?.toString(),
    maxPriorityFeePerGas: tx.maxPriorityFeePerGas?.toString(),
    value: tx.value?.toString(),
    data: tx.data ? tx.data.toString() : undefined,
    chainId: tx.chainId,
  }
  return { ...defaults, ...celoTx }
}
