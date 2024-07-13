import { trimLeading0x } from '@celo/base'
import { newKit } from '@celo/contractkit'
async function main() {
  const networks = [
    { chainId: 42220, nodeUrl: 'https://forno.celo.org', prefix: undefined },
    { chainId: 62320, nodeUrl: 'https://baklava-forno.celo-testnet.org', prefix: 'b' },
    { chainId: 44787, nodeUrl: 'https://alfajores-forno.celo-testnet.org', prefix: 'a' },
  ]

  const json: { ticker: string; chainId: number; address: string; decimals: number }[] = []

  for (const { chainId, nodeUrl, prefix } of networks) {
    const kit = newKit(nodeUrl)

    const feeCurrencyWhitelistWrapper = await kit.contracts.getFeeCurrencyWhitelist()
    const whitelist = await feeCurrencyWhitelistWrapper.getFeeCurrencyInformation()

    json.push(
      ...whitelist.map(({ address, symbol, decimals }) => ({
        ticker: prefix ? `${prefix} ${symbol}` : symbol!,
        address: trimLeading0x(address),
        decimals: decimals!,
        chainId,
      }))
    )
  }

  return JSON.stringify(json, null, 2)
}

main().then(console.log).catch(console.error)
