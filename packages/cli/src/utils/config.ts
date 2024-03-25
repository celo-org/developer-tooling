import * as fs from 'fs-extra'
import * as path from 'path'

export interface CeloConfig {
  node: string
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
    const { gasCurrency, existingConfig } = fs.readJSONSync(configPath(configDir))
    const combinedConfig = { ...defaultConfig, ...existingConfig }
    if (combinedConfig.hasOwnProperty('nodeUrl')) {
      combinedConfig.node = combinedConfig.nodeUrl
    }

    // NOTE: make sure we don't confuse the user by printing a gasCurrency
    // that's not being used
    if (gasCurrency) {
      writeConfig(configDir, combinedConfig)
    }

    return combinedConfig
  } else {
    return defaultConfig
  }
}

export function getNodeUrl(configDir: string): string {
  return readConfig(configDir).node
}

export async function writeConfig(configDir: string, configObj: CeloConfig) {
  const config = { ...defaultConfig, ...configObj }

  fs.outputJSONSync(configPath(configDir), config)
}
