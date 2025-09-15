import {
  CeloTransactionObject,
  CeloTx,
  EventLog,
  parseDecodedParams,
  TransactionResult,
} from '@celo/connect'
import { LockedGoldRequirements } from '@celo/contractkit/lib/wrappers/Validators'
import { Errors, ux } from '@oclif/core'
import { TransactionResult as SafeTransactionResult } from '@safe-global/types-kit'
import BigNumber from 'bignumber.js'
import chalk from 'chalk'
import humanizeDuration from 'humanize-duration'

import { PublicCeloClient } from '@celo/actions'
import {
  Abi,
  Address,
  ContractEventName,
  decodeEventLog,
  DecodeEventLogReturnType,
  formatEther,
} from 'viem'

const CLIError = Errors.CLIError

// TODO: How can we deploy contracts with the Celo provider w/o a CeloTransactionObject?
export async function displayWeb3Tx(name: string, txObj: any, tx?: Omit<CeloTx, 'data'>) {
  ux.action.start(`Sending Transaction: ${name}`)
  const result = await txObj.send(tx)
  console.log(result)
  ux.action.stop()
}

export async function displaySafeTx(name: string, safeTxResult: SafeTransactionResult) {
  ux.action.start(`Sending Transaction: ${name}`)

  try {
    if (!safeTxResult.transactionResponse) {
      throw new Error('Transaction failed')
    }

    /**
     * wait() method does not exists in the types, but according to the docs
     * https://docs.safe.global/sdk/protocol-kit/reference/safe#executetransaction
     * this actually exists
     *
     * It is covered by tests though and working fine
     */
    if (
      'wait' in (safeTxResult.transactionResponse as any) &&
      typeof (safeTxResult.transactionResponse as any).wait === 'function'
    ) {
      const receipt = await (safeTxResult.transactionResponse as any).wait()

      printValueMap({ txHash: receipt.transactionHash })
    }

    ux.action.stop()
  } catch (e) {
    ux.action.stop(`failed: ${(e as Error).message}`)

    throw e
  }
}

export async function displayViemTx<const abi extends Abi | undefined = undefined>(
  name: string,
  hash: Promise<Address>,
  client: PublicCeloClient,
  decodeEventsOpts?: abi extends Abi
    ? {
        abi: abi
        displayEventName: ContractEventName<abi> | ContractEventName<abi>[]
      }
    : never
) {
  if (!ux.action.running) {
    ux.action.start(`Sending Transaction: ${name}`)
  }
  try {
    console.log(chalk`SendTransaction: {red.bold ${name}}`)
    const { transactionHash, logs } = await client.waitForTransactionReceipt({ hash: await hash })
    printValueMap({ txHash: transactionHash })

    if (decodeEventsOpts?.displayEventName && logs.length) {
      const { abi, displayEventName } = decodeEventsOpts

      const decodedLogs = logs.map((log) => {
        let decodedLog: DecodeEventLogReturnType | undefined
        try {
          const eventNames =
            typeof displayEventName === 'string' ? [displayEventName] : displayEventName

          decodedLog = eventNames
            .map((eventName) => {
              try {
                return decodeEventLog({
                  abi,
                  data: log.data,
                  topics: log.topics,
                  eventName,
                })
              } catch (e) {
                // unknown event, it's a-ok
              }
            })
            .filter(Boolean)
            .at(0)
        } catch (e) {}

        return decodedLog
      })

      const filteredLogs = decodedLogs.filter(
        (decodedLog): decodedLog is DecodeEventLogReturnType => {
          if (!decodedLog) {
            return false
          }
          return (
            (typeof displayEventName === 'string' && decodedLog.eventName === displayEventName) ||
            displayEventName.includes(decodedLog.eventName)
          )
        }
      )

      filteredLogs.forEach(({ eventName, args }) => {
        console.log(chalk.magenta.bold(`${eventName}:`))
        printValueMap(args!, chalk.magenta)
      })
    }

    ux.action.stop()
  } catch (e) {
    ux.action.stop(`failed: ${(e as Error).message}`)
    throw e
  }
}

export async function displaySendTx<A>(
  name: string,
  txObj: CeloTransactionObject<A>,
  tx?: Omit<CeloTx, 'data'>,
  displayEventName?: string | string[]
) {
  ux.action.start(`Sending Transaction: ${name}`)
  try {
    const txResult = await txObj.send(tx)
    await innerDisplaySendTx(name, txResult, displayEventName)
  } catch (e) {
    ux.action.stop(`failed: ${(e as Error).message}`)
    throw e
  }
}

// to share between displaySendTx and displaySendEthersTxViaCK
async function innerDisplaySendTx(
  name: string,
  txResult: TransactionResult,
  displayEventName?: string | string[] | undefined
) {
  const txHash = await txResult.getHash()

  console.log(chalk`SendTransaction: {red.bold ${name}}`)
  printValueMap({ txHash })

  const txReceipt = await txResult.waitReceipt()
  ux.action.stop()

  if (displayEventName && txReceipt.events) {
    Object.entries(txReceipt.events)
      .filter(
        ([eventName]) =>
          (typeof displayEventName === 'string' && eventName === displayEventName) ||
          displayEventName.includes(eventName)
      )
      .forEach(([eventName, log]) => {
        const { params } = parseDecodedParams((log as EventLog).returnValues)
        console.log(chalk.magenta.bold(`${eventName}:`))
        printValueMap(params, chalk.magenta)
      })
  }
}

export function printValueMap(valueMap: Record<string, any>, color = chalk.yellowBright.bold) {
  console.log(
    Object.keys(valueMap)
      .map((key) => color(`${key}: `) + valueMap[key])
      .join('\n')
  )
}

export function printValueMap2(valueMap: Map<any, any>, color = chalk.yellowBright.bold) {
  valueMap.forEach((value, key) => console.log(color(`${key}: `) + value))
}

export function printValueMapRecursive(valueMap: Record<string, any>) {
  console.log(toStringValueMapRecursive(valueMap, ''))
}

function toStringValueMapRecursive(valueMap: Record<string, any>, prefix: string): string {
  const printValue = (v: any): string => {
    if (typeof v === 'object' && v != null) {
      if (BigNumber.isBigNumber(v)) {
        const extra = v.isGreaterThan(new BigNumber(10).pow(3)) ? `(~${v.toExponential(3)})` : ''
        return `${v.toFixed(0)} ${extra}`
      } else if (v instanceof Error) {
        return '\n' + chalk.red(v.message)
      }
      return '\n' + toStringValueMapRecursive(v, prefix + '  ')
    }

    if (typeof v === 'bigint') {
      const asSciNotation = v > 1000n ? `(~${bigintToExponential(v)})` : ''

      return `${v} ${asSciNotation}`
    }

    return chalk`${v}`
  }
  return Object.keys(valueMap)
    .sort((a, b) => {
      if (isNaN(Number(a)) && isNaN(Number(b))) {
        return a.localeCompare(b)
      }
      return Number(a) - Number(b)
    })
    .map((key) => prefix + chalk.yellowBright.bold(`${key}: `) + printValue(valueMap[key]))
    .join('\n')
}

export function failWith(msg: string): never {
  throw new CLIError(msg)
}

export async function binaryPrompt(promptMessage: string, defaultToNo?: boolean) {
  const resp: string = await ux.prompt(
    promptMessage + ` [y/yes, n/no${defaultToNo ? ' (default)' : ''}]`,
    { required: !defaultToNo }
  )
  return ['y', 'yes'].includes(resp.toLowerCase())
}

export function getCurrentTimestamp() {
  return Math.floor(Date.now() / 1000)
}

export function humanizeRequirements(requirements: LockedGoldRequirements) {
  const requiredCelo = formatEther(BigInt(requirements.value.toFixed()))
  const requiredDays = humanizeDuration(requirements.duration.toNumber() * 1000, {
    round: true,
    maxDecimalPoints: 1,
  })
  return { requiredCelo, requiredDays }
}

// TODO this will have to be refactored not to use BigNumber
// once we drop its usage
function bigintToExponential(value: bigint) {
  return new BigNumber(value.toString()).toExponential()
}
