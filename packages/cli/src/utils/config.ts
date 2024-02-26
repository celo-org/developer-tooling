import * as fs from 'fs-extra'
import * as path from 'path'
import { gasOptions } from '../base'

export interface CeloConfig {
  node: string
  gasCurrency: string // TODO(Arthur): Nit - Consider typing with hex addresses instead of arbitrary strings
}

export const defaultConfig: CeloConfig = {
  node: 'http://localhost:8545',
  gasCurrency: 'auto',
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

// TODO(Arthur): Nit - Consider typing with hex addresses instead of arbitrary strings
export function getGasCurrency(configDir: string): string {
  return readConfig(configDir).gasCurrency
}

export function writeConfig(configDir: string, configObj: CeloConfig) {
  /**
   * TODO(Arthur): Probably need to either
   * 1. remove this check, because we support arbitrary addresses, and not just strings in a list, or
   * 2. change this check to make a feeCurrencyWhitelist contract call and assert inclusion.
   *    If we use this option, we probably want to make the contract call where `gasOptions` if defined
   *    and pass it here.
   */
  //
  if (!Object.keys(gasOptions).includes(configObj.gasCurrency)) {
    throw new Error('Invalid gas option')
  }
  fs.outputJSONSync(configPath(configDir), configObj)
}
