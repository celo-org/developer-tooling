// Copied from '@ledgerhq/hw-app-eth/erc20' because we need to change the path of the blob and support for address+chainId
import { Address, normalizeAddressWith0x } from '@celo/base/lib/address.js'
import blob from '@celo/ledger-token-signer'
import blobLegacy from './data.js'

/**
 * Retrieve the token information by a given contract address and chainId if any
 */
export const tokenInfoByAddressAndChainId = (
  contract: Address,
  chainId: number
): TokenInfo | null | undefined =>
  get(blob as unknown as string).byContractKey(generateContractKey(contract, chainId))

export const legacyTokenInfoByAddressAndChainId = (
  contract: Address,
  chainId: number
): TokenInfo | null | undefined =>
  get(blobLegacy).byContractKey(generateContractKey(contract, chainId))

/**
 * list all the ERC20 tokens informations
 */
export const list = (): TokenInfo[] => get(blob).list()
export const listLegacy = (): TokenInfo[] => get(blobLegacy).list()

export interface TokenInfo {
  contractAddress: Address
  ticker: string
  decimals: number
  chainId: number
  signature: Buffer
  data: Buffer
}

export interface API {
  byContractKey: (arg0: string) => TokenInfo | null | undefined
  list: () => TokenInfo[]
}

function generateContractKey(contract: Address, chainId: number): string {
  return [normalizeAddressWith0x(contract), chainId].join('-')
}

const get = (data: string): API => {
  const buf = Buffer.from(data, 'base64')
  const byContract: { [id: string]: TokenInfo } = {}
  const entries: TokenInfo[] = []
  let i = 0
  while (i < buf.length) {
    const length = buf.readUInt32BE(i)
    i += 4
    const item = buf.slice(i, i + length)
    let j = 0
    const tickerLength = item.readUInt8(j)
    j += 1
    const ticker = item.slice(j, j + tickerLength).toString('ascii')
    j += tickerLength
    const contractAddress: string = normalizeAddressWith0x(item.slice(j, j + 20).toString('hex'))
    j += 20
    const decimals = item.readUInt32BE(j)
    j += 4
    const chainId = item.readUInt32BE(j)
    j += 4
    const signature = item.slice(j)
    const entry: TokenInfo = {
      ticker,
      contractAddress,
      decimals,
      chainId,
      signature,
      data: item,
    }
    entries.push(entry)
    byContract[generateContractKey(contractAddress, chainId)] = entry
    i += length
  }
  const api = {
    list: () => entries,
    byContractKey: (id: string) => byContract[id],
  }
  return api
}
