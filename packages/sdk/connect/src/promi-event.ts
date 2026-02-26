import { AbiCoder, AbiItem } from './abi-types'
import { viemAbiCoder } from './abi-coder'
import { CeloTx, CeloTxReceipt, EventLog, PromiEvent, Provider } from './types'
import { getRandomId } from './utils/rpc-caller'
import type { Connection } from './connection'

export function createPromiEvent(
  connection: Connection,
  sendTx: CeloTx,
  abi?: AbiItem[]
): PromiEvent<CeloTxReceipt> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listeners: Record<string, ((...args: any[]) => void)[]> = {}

  const promise = new Promise<CeloTxReceipt>(async (resolve, reject) => {
    try {
      const hash = await new Promise<string>((res, rej) => {
        ;(connection.currentProvider as Provider).send(
          {
            id: getRandomId(),
            jsonrpc: '2.0',
            method: 'eth_sendTransaction',
            params: [sendTx],
          },
          (error, resp) => {
            if (error) rej(error)
            else if (resp?.error) rej(new Error(resp.error.message))
            else if (resp) res(resp.result as string)
            else rej(new Error('empty-response'))
          }
        )
      })
      ;(listeners.transactionHash || []).forEach((fn) => fn(hash))

      let receipt = await pollForReceiptHelper(hash, (h) => connection.getTransactionReceipt(h))
      if (abi && abi.length > 0) {
        receipt = decodeReceiptEvents(receipt, abi, viemAbiCoder)
      }
      ;(listeners.receipt || []).forEach((fn) => fn(receipt))

      resolve(receipt)
    } catch (err) {
      ;(listeners.error || []).forEach((fn) => fn(err, false))
      reject(err)
    }
  })

  const pe = promise as PromiEvent<CeloTxReceipt>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(pe as any).on = (event: string, fn: (...args: any[]) => void) => {
    ;(listeners[event] = listeners[event] || []).push(fn)
    return pe
  }
  ;(pe as any).once = (pe as any).on

  return pe
}

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

export function decodeReceiptEvents(
  receipt: CeloTxReceipt,
  abi: AbiItem[],
  coder: AbiCoder
): CeloTxReceipt {
  if (!receipt.logs || !Array.isArray(receipt.logs)) return receipt
  const eventAbis = abi.filter((entry: AbiItem) => entry.type === 'event')
  if (eventAbis.length === 0) return receipt

  const events: { [eventName: string]: EventLog } = {}
  for (const log of receipt.logs) {
    if (!log.topics || log.topics.length === 0) continue
    const topicHash = log.topics[0]
    for (const eventAbi of eventAbis) {
      const signature = coder.encodeEventSignature(eventAbi)
      if (signature === topicHash) {
        let returnValues: Record<string, unknown> = {}
        try {
          returnValues = coder.decodeLog(
            eventAbi.inputs || [],
            log.data,
            log.topics.slice(1)
          ) as unknown as Record<string, unknown>
        } catch {}
        events[eventAbi.name!] = {
          event: eventAbi.name!,
          address: log.address,
          returnValues,
          logIndex: log.logIndex,
          transactionIndex: log.transactionIndex,
          transactionHash: log.transactionHash,
          blockHash: log.blockHash,
          blockNumber: log.blockNumber,
          raw: { data: log.data, topics: log.topics },
        }
        break
      }
    }
  }
  if (Object.keys(events).length > 0) {
    receipt.events = events
  }
  return receipt
}
