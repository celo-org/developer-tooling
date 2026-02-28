import { ABIDefinition, Address, AbiInput, CeloTxReceipt, EventLog, Log } from '@celo/connect'
import { decodeEventLog, toEventHash } from 'viem'
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

  async fetchTxReceipt(txhash: string): Promise<CeloTxReceipt | null> {
    return this.kit.connection.getTransactionReceipt(txhash)
  }

  getKnownLogs(tx: CeloTxReceipt): EventLog[] {
    const res: EventLog[] = []
    for (const log of tx.logs || []) {
      const event = this.tryParseLog(log)
      if (event != null) {
        res.push(event)
      }
    }
    return res
  }

  tryParseLog(log: Log): null | EventLog {
    if (log.topics.length === 0) {
      return null
    }

    const contractMapping = this.addressMapping.get(log.address)
    if (contractMapping == null) {
      return null
    }
    const logSignature = log.topics[0]
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
    const sig = `${matchedAbi.name || 'Event'}(${eventInputs.map((i: AbiInput) => i.type).join(',')})`
    const eventSigHash = toEventHash(sig)
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

      const logEvent: EventLog & { signature: string } = {
        address: log.address,
        blockHash: log.blockHash,
        blockNumber: log.blockNumber,
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
