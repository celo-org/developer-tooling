import { StableToken, StrongAddress, Token } from '@celo/base'
import { ContractKit } from '@celo/contractkit'
import { isValidAddress } from '@celo/utils/lib/address'
import * as fs from 'fs-extra'
import * as path from 'path'

export interface CeloConfig {
  node: string
  gasCurrency?: StrongAddress
}

// This interface handles compatibility with previous version of the CLI where
// gas currency was passed differently
export interface LegacyCeloConfig {
  node: string
  gasCurrency?: StableToken | Token | 'auto'
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
  const config = readConfig(configDir) as CeloConfig | LegacyCeloConfig
  const { gasCurrency } = config

  if (!gasCurrency) return
  if (isValidAddress(gasCurrency)) return gasCurrency

  // Force rewriting the config with Token->Address conversion
  await writeConfig(configDir, config, kit)

  return getGasCurrency(configDir, kit)
}

export async function writeConfig(
  configDir: string,
  configObj: CeloConfig | LegacyCeloConfig,
  kit: ContractKit
) {
  const config = { ...defaultConfig, ...configObj }
  const { gasCurrency } = config

  if (gasCurrency) {
    if (gasCurrency.startsWith('0x')) {
      if (isValidAddress(gasCurrency)) {
        const feeCurrencyWhitelist = await kit.contracts.getFeeCurrencyWhitelist()
        const validFeeCurrencies = await feeCurrencyWhitelist.getWhitelist()

        if (!validFeeCurrencies.includes(gasCurrency)) {
          const pairs = (
            await feeCurrencyWhitelist.getFeeCurrencyInformation(validFeeCurrencies)
          ).map(
            ({ name, symbol, address, adaptedToken }) =>
              `${address} - ${name || 'unknown name'} (${symbol || 'N/A'})${
                adaptedToken ? ` (adapted token: ${adaptedToken})` : ''
              }`
          )
          throw new Error(
            `${config.gasCurrency} is not a valid fee currency. Available currencies:\n${pairs.join(
              '\n'
            )}`
          )
        }
      } else {
        throw new Error(`Invalid address ${gasCurrency}`)
      }
    } else {
      // NOTE: This handles a legacy version of celocli where the gasCurrency
      // was passed as cEUR, cUSD, or cREAL
      switch (gasCurrency) {
        case 'auto':
        case Token.CELO:
          delete config.gasCurrency
          break
        case StableToken.cEUR:
        case StableToken.cUSD:
        case StableToken.cREAL:
          const { address } = await kit.contracts.getStableToken(gasCurrency as StableToken)
          ;(config as CeloConfig).gasCurrency = address
          break
      }
    }
  }

  fs.outputJSONSync(configPath(configDir), config)
}
