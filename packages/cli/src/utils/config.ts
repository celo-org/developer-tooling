import { StableToken, StrongAddress } from '@celo/base'
import { ContractKit } from '@celo/contractkit'
import { isValidAddress } from '@celo/utils/lib/address'
import * as fs from 'fs-extra'
import * as path from 'path'

export interface CeloConfig {
  node: string
  gasCurrency?: StrongAddress
}

export const defaultConfig: CeloConfig = {
  node: 'http://localhost:8545',
}

const configFile = 'config.json'

export function configPath(configDir: string) {
  return path.join(configDir, configFile)
}

export function readConfig(configDir: string): CeloConfig {
  if (fs.pathExistsSync(configPath(configDir))) {
    const existingConfig = fs.readJSONSync(configPath(configDir))
    const combinedConfig = { ...defaultConfig, ...existingConfig }
    if (combinedConfig.hasOwnProperty('nodeUrl')) {
      combinedConfig.node = combinedConfig.nodeUrl
    }
    return combinedConfig
  } else {
    return defaultConfig
  }
}

export function getNodeUrl(configDir: string): string {
  return readConfig(configDir).node
}

export async function getGasCurrency(
  configDir: string,
  kit: ContractKit
): Promise<StrongAddress | undefined> {
  const { gasCurrency, ...config } = readConfig(configDir) as CeloConfig

  if (!gasCurrency) return

  if (isValidAddress(gasCurrency)) return gasCurrency

  // NOTE: This handles a legacy version of celocli where the gasCurrency
  // was passed as cEUR, cUSD, or cREAL
  switch (gasCurrency) {
    case 'auto':
      return undefined
    case StableToken.cEUR:
    case StableToken.cUSD:
    case StableToken.cREAL:
      const { address } = await kit.contracts.getStableToken(gasCurrency)
      await writeConfig(configDir, { ...config, gasCurrency: address }, kit)
      return
  }
}

export async function writeConfig(configDir: string, configObj: CeloConfig, kit: ContractKit) {
  const feeCurrencyWhitelist = await kit.contracts.getFeeCurrencyWhitelist()
  const validFeeCurrencies = await feeCurrencyWhitelist.getWhitelist()
  if (configObj.gasCurrency && !validFeeCurrencies.includes(configObj.gasCurrency)) {
    const pairs = (await feeCurrencyWhitelist.getFeeCurrencyInformation(validFeeCurrencies)).map(
      ({ name, symbol, address, adaptedToken }) =>
        `${address} - ${name || 'unknown name'} (${symbol || 'N/A'})${
          adaptedToken ? ` (adapted token: ${adaptedToken})` : ''
        }`
    )
    throw new Error(
      `${configObj.gasCurrency} is not a valid fee currency. Available currencies:\n${pairs.join(
        '\n'
      )}`
    )
  }

  fs.outputJSONSync(configPath(configDir), configObj)
}
