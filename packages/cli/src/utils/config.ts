import { DerivationPath, ETHEREUM_DERIVATION_PATH } from '@celo/base'
import * as fs from 'fs-extra'
import * as path from 'node:path'

export interface CeloConfig {
  node: string
  derivationPath: DerivationPath
  telemetry: boolean
}

// NOTE: this mapping should stay updated as CeloConfig evolves
const LEGACY_MAPPING: Record<string, keyof CeloConfig | undefined> = {
  nodeUrl: 'node',
  gasCurrency: undefined,
} as const

export const defaultConfig: CeloConfig = {
  node: 'http://localhost:8545',
  derivationPath: ETHEREUM_DERIVATION_PATH,
  telemetry: true,
}

const configFile = 'config.json'

export function configPath(configDir: string) {
  return path.join(configDir, configFile)
}

export async function configExists(configDir: string): Promise<boolean> {
  return fs.pathExists(configPath(configDir))
}

export function readConfig(configDir: string): CeloConfig {
  if (fs.pathExistsSync(configPath(configDir))) {
    const existingConfig = fs.readJSONSync(configPath(configDir))
    const combinedConfig = { ...defaultConfig, ...existingConfig }

    // NOTE: make sure we don't confuse the user by printing legacy config elements
    for (const [legacyKey, newKey] of Object.entries(LEGACY_MAPPING)) {
      if (newKey && combinedConfig[legacyKey]) {
        combinedConfig[newKey] = combinedConfig[legacyKey]
      }
      delete combinedConfig[legacyKey]
    }

    return combinedConfig
  } else {
    return defaultConfig
  }
}

export function getNodeUrl(configDir: string): string {
  return readConfig(configDir).node
}

export function getDefaultDerivationPath(configDir: string): string {
  return readConfig(configDir).derivationPath
}

export async function writeConfig(configDir: string, configObj: CeloConfig) {
  const config = { ...defaultConfig, ...configObj }

  fs.outputJSONSync(configPath(configDir), {
    node: config.node,
    derivationPath: config.derivationPath,
    telemetry: config.telemetry,
  })
}
