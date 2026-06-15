import { ABIDefinition, Address, AbiInput, EventLog } from '@celo/connect'
import { decodeEventLog, toEventSelector, type TransactionReceipt } from 'viem'
import { ContractKit } from '@celo/contractkit'
import { ContractDetails, mapFromPairs, obtainKitContractDetails } from './base'

interface ContractMapping {
  details: ContractDetails
  logMapping: Map<string, ABIDefinition>
}

export async function newLogExplorer(kit: ContractKit) {
  return new LogExplorer(kit, await obtainKitContractDetails(kit))
}

export class LogExplorer {
  private readonly addressMapping: Map<Address, ContractMapping>

  constructor(
    private kit: ContractKit,
    readonly contractDetails: ContractDetails[]
  ) {
    this.addressMapping = mapFromPairs(
      contractDetails.map((cd) => [
        cd.address,
        {
          details: cd,
          logMapping: mapFromPairs(
            (cd.jsonInterface as ABIDefinition[])
              .filter((ad) => ad.type === 'event')
              .map((ad) => [ad.signature, ad])
          ),
        },
      ])
    )

    for (const cd of contractDetails) {
      const fnMapping: Map<string, ABIDefinition> = new Map()
      for (const abiDef of cd.jsonInterface as ABIDefinition[]) {
        if (abiDef.type === 'event') {
          fnMapping.set(abiDef.signature, abiDef)
        }
      }

      this.addressMapping.set(cd.address, {
        details: cd,
        logMapping: fnMapping,
      })
    }
  }

  async fetchTxReceipt(txhash: string): Promise<TransactionReceipt | null> {
    try {
      return await this.kit.connection.viemClient.getTransactionReceipt({
        hash: txhash as `0x${string}`,
      })
    } catch {
      return null
    }
  }

  getKnownLogs(tx: TransactionReceipt): EventLog[] {
    const res: EventLog[] = []
    for (const log of tx.logs || []) {
      const event = this.tryParseLog(log)
      if (event != null) {
        res.push(event)
      }
    }
    return res
  }

  tryParseLog(log: TransactionReceipt['logs'][number]): null | EventLog {
    if (log.topics.length === 0) {
      return null
    }

    const contractMapping = this.addressMapping.get(log.address)
    if (contractMapping == null) {
      return null
    }
    const logSignature = log.topics[0]
    if (logSignature == null) {
      return null
    }
    const matchedAbi = contractMapping.logMapping.get(logSignature)
    if (matchedAbi == null) {
      return null
    }

    const eventInputs = (matchedAbi.inputs || []).map((input: AbiInput) => ({
      ...input,
      indexed: input.indexed ?? false,
    }))
    const eventAbi = [
      { type: 'event' as const, name: matchedAbi.name || 'Event', inputs: eventInputs },
    ]
    // toEventSelector expands tuple components into the canonical signature;
    // joining raw input types would hash 'Event(tuple,...)' and never match
    const eventSigHash = toEventSelector(eventAbi[0] as Parameters<typeof toEventSelector>[0])
    const fullTopics = [eventSigHash, ...log.topics.slice(1)] as [`0x${string}`, ...`0x${string}`[]]
    try {
      const result = decodeEventLog({
        abi: eventAbi,
        data: (log.data || '0x') as `0x${string}`,
        topics: fullTopics,
      })
      const decoded = { ...(result.args as Record<string, unknown>) }
      // bigint to string for backward compat
      for (const key of Object.keys(decoded)) {
        if (typeof decoded[key] === 'bigint') decoded[key] = (decoded[key] as bigint).toString()
      }

      // pending logs carry null block/index fields — Number(null) would
      // silently report block 0
      if (log.blockNumber == null || log.logIndex == null || log.transactionIndex == null) {
        return null
      }

      const logEvent: EventLog & { signature: string } = {
        address: log.address,
        blockHash: log.blockHash,
        blockNumber: Number(log.blockNumber),
        logIndex: log.logIndex,
        transactionIndex: log.transactionIndex,
        transactionHash: log.transactionHash,
        returnValues: decoded,
        event: matchedAbi.name!,
        signature: logSignature,
        raw: {
          data: log.data || '',
          topics: log.topics || [],
        },
      }

      return logEvent
    } catch {
      return null
    }
  }
}
