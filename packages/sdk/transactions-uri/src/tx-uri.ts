import { trimLeading0x } from '@celo/base/lib/address'
import { zeroRange } from '@celo/base/lib/collections'
import { CeloTx } from '@celo/connect'
import { decodeAbiParameters, encodeAbiParameters, toFunctionHash, type AbiParameter } from 'viem'
import qrcode from 'qrcode'
import querystring from 'querystring'

// see https://solidity.readthedocs.io/en/v0.5.3/abi-spec.html#function-selector-and-argument-encoding
const ABI_TYPE_REGEX = '(u?int(8|16|32|64|128|256)|address|bool|bytes(4|32)?|string)(\\[\\])?'
const FUNCTION_REGEX = `(?<function>\\w+\\((?<inputTypes>(,?${ABI_TYPE_REGEX})*)\\))`
const ADDRESS_REGEX_STR = '(?<address>0x[a-fA-F0-9]{40})'
const CHAIN_ID_REGEX = '(?<chainId>\\d+)'
const TX_PARAMS = ['feeCurrency', 'gas', 'gasPrice', 'value']
const PARAM_REGEX = `(${TX_PARAMS.join('|')})=\\w+`
const ARGS_REGEX = 'args=\\[(,?\\w+)*\\]'
const QUERY_REGEX = `(?<query>(&?(${PARAM_REGEX}|${ARGS_REGEX}))+)`

// URI scheme mostly borrowed from https://github.com/ethereum/EIPs/blob/master/EIPS/eip-681.md
const URI_REGEX_STR = `^celo:${ADDRESS_REGEX_STR}(@${CHAIN_ID_REGEX})?(/${FUNCTION_REGEX})?(\\?${QUERY_REGEX})?$`

const uriRegexp = new RegExp(URI_REGEX_STR)

export function parseUri(uri: string): CeloTx {
  const matchObj = uriRegexp.exec(uri)
  if (matchObj == null) {
    throw new Error(`URI ${uri}\n did not match\n ${URI_REGEX_STR}`)
  }
  const namedGroups = (matchObj as any).groups

  let tx: CeloTx = {
    to: namedGroups.address,
  }

  if (namedGroups.chainId !== undefined) {
    tx.chainId = namedGroups.chainId
  }

  if (namedGroups.query !== undefined) {
    const parsedQuery = querystring.parse(namedGroups.query)

    if (namedGroups.function !== undefined) {
      const functionSig = toFunctionHash(namedGroups.function).slice(0, 10)
      tx.data = functionSig

      if (namedGroups.inputTypes != null && namedGroups.inputTypes !== '') {
        const abiTypes = namedGroups.inputTypes.split(',')
        const rawArgs = (parsedQuery.args || '[]') as string
        const builtArgs = rawArgs.slice(1, rawArgs.length - 1).split(',')
        const callSig = encodeAbiParameters(
          abiTypes.map((t: string) => ({ type: t }) as AbiParameter),
          builtArgs as any
        )

        tx.data += trimLeading0x(callSig)
      }
    }

    const { args, ...txParams } = parsedQuery
    tx = { ...tx, ...txParams }
  }

  return tx
}

export function buildUri(tx: CeloTx, functionName?: string, abiTypes: string[] = []): string {
  if (!tx.to) {
    throw new Error("'to' address must be defined for celo URIs")
  }
  let uri = `celo:${tx.to!}`

  if (tx.chainId) {
    uri += `@${tx.chainId}`
  }

  let functionArgs: string[] | undefined
  if (tx.data !== undefined) {
    if (!functionName) {
      throw new Error("Cannot decode tx 'data' without 'functionName'")
    }

    const functionSelector = `${functionName}(${abiTypes.join(',')})`
    const functionSig = trimLeading0x(toFunctionHash(functionSelector).slice(0, 10))
    const txData = trimLeading0x(tx.data)
    const funcEncoded = txData.slice(0, 8)

    if (functionSig !== funcEncoded) {
      throw new Error("'functionName' and 'abiTypes' do not match first 4 bytes of 'tx.data'")
    }

    uri += `/${functionSelector}`

    if (txData.length > 8) {
      const argsEncoded = txData.slice(8)
      const decoded = decodeAbiParameters(
        abiTypes.map((t: string) => ({ type: t }) as AbiParameter),
        `0x${argsEncoded}` as `0x${string}`
      )
      functionArgs = zeroRange(decoded.length).map((idx) => String(decoded[idx]).toLowerCase())
    }
  }

  const { data, to, chainId, nonce, hardfork, common, chain, ...txQueryParams } = tx

  uri += '?'
  if (functionArgs) {
    uri += `args=[${functionArgs.join(',')}]`
  }
  const params = txQueryParams as { [key: string]: string }
  if (txQueryParams.value != null && typeof txQueryParams.value !== 'string') {
    params.value = txQueryParams.value.toString()
  }
  uri += querystring.stringify({ ...params })

  return uri
}

export function QrFromUri(uri: string, type: 'svg' | 'terminal' | 'utf8') {
  if (!uriRegexp.test(uri)) {
    throw new Error(`Invalid uri ${uri}`)
  }

  return qrcode.toString(uri, { type })
}
