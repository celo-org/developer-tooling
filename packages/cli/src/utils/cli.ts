import {
  CeloTransactionObject,
  CeloTx,
  Connection,
  EventLog,
  TransactionResult,
  parseDecodedParams,
} from '@celo/connect'
import { Errors, ux } from '@oclif/core'
import BigNumber from 'bignumber.js'
import chalk from 'chalk'
import { ethers } from 'ethers'
import { convertEthersToCeloTx } from './mento-broker-adaptor'

const CLIError = Errors.CLIError

// TODO: How can we deploy contracts with the Celo provider w/o a CeloTransactionObject?
export async function displayWeb3Tx(name: string, txObj: any, tx?: Omit<CeloTx, 'data'>) {
  ux.action.start(`Sending Transaction: ${name}`)
  const result = await txObj.send(tx)
  console.log(result)
  ux.action.stop()
}
// allows building a tx with ethers but signing and sending with celo Connection
// cant use displaySendTx because it expects a CeloTransactionObject which isnt really possible to convert to from ethers
export async function displaySendEthersTxViaCK(
  name: string,
  txData: ethers.providers.TransactionRequest,
  connection: Connection,
  defaultParams: { gas?: string } = {}
) {
  ux.action.start(`Sending Transaction: ${name}`)
  const tx = convertEthersToCeloTx(txData, defaultParams)
  const txWithPrices = await connection.setFeeMarketGas(tx)
  try {
    const result = await connection.sendTransaction(txWithPrices)
    await innerDisplaySendTx(name, result)
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
        return `${v.toFixed()} ${extra}`
      } else if (v instanceof Error) {
        return '\n' + chalk.red(v.message)
      }
      return '\n' + toStringValueMapRecursive(v, prefix + '  ')
    }
    return chalk`${v}`
  }
  return Object.keys(valueMap)
    .sort()
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
