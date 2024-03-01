import { StrongAddress } from '@celo/base'
import { ContractKit } from '@celo/contractkit'
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

export function getGasCurrency(configDir: string): StrongAddress {
  return readConfig(configDir).gasCurrency!
}

export async function writeConfig(configDir: string, configObj: CeloConfig, kit: ContractKit) {
  const validFeeCurrencies = await kit.getFeeCurrencyWhitelist()
  if (!validFeeCurrencies.includes(configObj.gasCurrency!)) {
    throw new Error('Invalid gas option')
  }
  fs.outputJSONSync(configPath(configDir), configObj)
}
