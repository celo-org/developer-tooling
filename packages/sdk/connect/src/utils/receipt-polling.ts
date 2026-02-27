import { CeloTxReceipt } from '../types'

export async function pollForReceiptHelper(
  txHash: string,
  fetchReceipt: (hash: string) => Promise<CeloTxReceipt | null>
): Promise<CeloTxReceipt> {
  const INITIAL_INTERVAL = 100
  const MAX_INTERVAL = 2000
  const TIMEOUT = 60_000
  const start = Date.now()
  let interval = INITIAL_INTERVAL
  while (Date.now() - start < TIMEOUT) {
    const receipt = await fetchReceipt(txHash)
    if (receipt) {
      return receipt
    }
    await new Promise((resolve) => setTimeout(resolve, interval))
    interval = Math.min(interval * 2, MAX_INTERVAL)
  }
  throw new Error(`Transaction receipt not found after ${TIMEOUT}ms: ${txHash}`)
}
