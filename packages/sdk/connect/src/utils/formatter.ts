import { ensureLeading0x, StrongAddress } from '@celo/base/lib/address'
import { isValidAddress } from '@celo/utils/lib/address'
import { encode } from 'utf8'
import { AccessList, AccessListRaw, BlockNumber, CeloTx, FormattedCeloTx, Hex } from '../types'

/**
 * Formats the input of a transaction and converts all values to HEX
 */
export function inputCeloTxFormatter(tx: CeloTx): FormattedCeloTx {
  const {
    from,
    chainId,
    nonce,
    to,
    gas,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    maxFeeInFeeCurrency,
    feeCurrency,
    data,
    value,
    accessList,
    common,
    chain,
    hardfork,
    ...rest
  } = tx
  const formattedTX: Partial<FormattedCeloTx> = rest
  formattedTX.from = inputAddressFormatter(from?.toString())
  formattedTX.to = inputAddressFormatter(to)

  formattedTX.gas = numberToHex(gas != null ? gas.toString() : undefined)

  formattedTX.value = numberToHex(value?.toString())
  formattedTX.nonce = numberToHex(nonce?.toString())

  if (feeCurrency) {
    formattedTX.feeCurrency = inputAddressFormatter(feeCurrency)
  }

  if (data && !isHex(data)) {
    throw new Error('The data field must be HEX encoded data.')
  } else if (data) {
    formattedTX.data = ensureLeading0x(data)
  }

  if (gasPrice) {
    formattedTX.gasPrice = numberToHex(gasPrice.toString())
  }
  if (maxFeePerGas) {
    formattedTX.maxFeePerGas = numberToHex(maxFeePerGas.toString())
  }
  if (maxPriorityFeePerGas) {
    formattedTX.maxPriorityFeePerGas = numberToHex(maxPriorityFeePerGas.toString())
  }
  if (accessList) {
    formattedTX.accessList = inputAccessListFormatter(accessList)
  }

  if (maxFeeInFeeCurrency) {
    formattedTX.maxFeeInFeeCurrency = numberToHex(maxFeeInFeeCurrency.toString())
  }

  return formattedTX as FormattedCeloTx
}

export function inputDefaultBlockNumberFormatter(blockNumber: BlockNumber | null | undefined) {
  if (blockNumber == null) {
    blockNumber = 'latest'
  }

  return inputBlockNumberFormatter(blockNumber)
}

export function inputBlockNumberFormatter(blockNumber: BlockNumber) {
  if (blockNumber == null) {
    return undefined
  }

  if (isPredefinedBlockNumber(blockNumber)) {
    return blockNumber
  }

  if (blockNumber === 'genesis') {
    return '0x0'
  }

  return isHexStrict(blockNumber.toString())
    ? blockNumber.toString().toLocaleLowerCase()
    : numberToHex(blockNumber.toString())!
}

export function hexToNumber(hex?: string): number | undefined {
  if (hex) {
    return Number(BigInt(hex))
  }
  return undefined
}

function isHash(value: string) {
  return isHex(value) && value.length === 32
}

export function parseAccessList(accessListRaw: AccessListRaw | undefined): AccessList {
  const accessList: AccessList = []
  if (!accessListRaw) {
    return accessList
  }
  for (const entry of accessListRaw) {
    const [address, storageKeys] = entry

    throwIfInvalidAddress(address)

    accessList.push({
      address,
      storageKeys: storageKeys.map((key) => {
        if (isHash(key)) {
          return key
        } else {
          // validate storage key format
          throw new Error(`Invalid storage key: ${key}`)
        }
      }),
    })
  }
  return accessList
}

function throwIfInvalidAddress(address: string) {
  if (!isValidAddress(address)) {
    throw new Error(`Invalid address: ${address}`)
  }
}

export function inputAccessListFormatter(accessList?: AccessList): AccessListRaw {
  if (!accessList || accessList.length === 0) {
    return []
  }
  return accessList.reduce((acc, { address, storageKeys }) => {
    throwIfInvalidAddress(address)

    storageKeys.forEach((storageKey) => {
      if (storageKey.length - 2 !== 64) {
        throw new Error(`Invalid storage key: ${storageKey}`)
      }
    })
    acc.push([address, storageKeys])
    return acc
  }, [] as AccessListRaw)
}

export function inputAddressFormatter(address?: string): StrongAddress | undefined {
  if (!address || address === '0x') {
    return undefined
  }
  if (isValidAddress(address)) {
    return ensureLeading0x(address).toLocaleLowerCase() as StrongAddress
  }
  throw new Error(`Provided address ${address} is invalid, the capitalization checksum test failed`)
}

export function inputSignFormatter(data: string) {
  return isHexStrict(data) ? data : utf8ToHex(data)
}

function utf8ToHex(str: string): string {
  str = encode(str)
  let hex = ''

  // remove \u0000 padding from either side
  str = str.replace(/^(?:\u0000)*/, '')
  str = str.split('').reverse().join('')
  str = str.replace(/^(?:\u0000)*/, '')
  str = str.split('').reverse().join('')

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    // if (code !== 0) {
    const n = code.toString(16)
    hex += n.length < 2 ? '0' + n : n
    // }
  }

  return ensureLeading0x(hex)
}

function isHex(hex: string): boolean {
  return /^(-0x|0x)?[0-9a-f]*$/i.test(hex)
}

function isHexStrict(hex: string): boolean {
  return /^(-)?0x[0-9a-f]*$/i.test(hex)
}

function numberToHex(value?: string | number | bigint): Hex | undefined {
  if (value) {
    const bigValue = BigInt(value)
    const zero = BigInt(0)
    const result = ensureLeading0x(
      bigValue < zero ? (-bigValue).toString(16) : bigValue.toString(16)
    )
    return (bigValue < zero ? `-${result}` : result) as Hex
  }
  return undefined
}

function isPredefinedBlockNumber(blockNumber: BlockNumber) {
  return blockNumber === 'latest' || blockNumber === 'pending' || blockNumber === 'earliest'
}
