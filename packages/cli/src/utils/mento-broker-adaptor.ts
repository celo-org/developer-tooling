import { CeloTx, Connection } from '@celo/connect'
import { Mento } from '@mento-protocol/mento-sdk'
import { ux } from '@oclif/core'
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

const VALID_SYMBOLS = new Set(['cUSD', 'cEUR', 'cREAL', 'CELO'])

// amount is string representation of a number in wei
export async function getExchangeRates(
  connection: Connection,
  amount: string,
  validSymbols: Set<string> = VALID_SYMBOLS
) {
  const { mento } = await getMentoBroker(connection)

  const pairs = await mento.getTradeablePairs()
  // the cli only supports CELO to stable token pairs
  const celoPairs = pairs.filter((pair) => {
    return validSymbols.has(pair[0].symbol) && validSymbols.has(pair[1].symbol)
  })

  return Promise.all(
    celoPairs.map(async (pair) => {
      try {
        const [buy, sell] = await Promise.all([
          mento.getAmountIn(pair[0].address, pair[1].address, amount),
          mento.getAmountOut(pair[0].address, pair[1].address, amount),
        ])
        return {
          buy,
          sell,
          symbol: pair[0].symbol === 'CELO' ? pair[1].symbol : pair[0].symbol,
        }
      } catch (e) {
        ux.error(`Error Fetching for ${pair[0].symbol} => ${pair[1].symbol}`, e as Error)
      }
    })
  )
}
