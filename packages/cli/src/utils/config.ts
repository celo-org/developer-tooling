import { StableToken, StrongAddress, Token } from '@celo/base'
import { ContractKit } from '@celo/contractkit'
import { isValidAddress } from '@celo/utils/lib/address'
import * as fs from 'fs-extra'
import * as path from 'path'

export interface CeloConfigUpdate {
  node?: string
  gasCurrency?: StrongAddress | 'CELO'
}

export interface CeloConfig {
  node: string
  gasCurrency?: Record<number, StrongAddress | undefined>
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

// actually could be legacy atm but lets fix that
export function readConfig(configDir: string): CeloConfig | LegacyCeloConfig {
  if (fs.pathExistsSync(configPath(configDir))) {
    const existingConfig: CeloConfig | LegacyCeloConfig = fs.readJSONSync(configPath(configDir))
    const combinedConfig = { ...defaultConfig, ...existingConfig }
    if (combinedConfig.hasOwnProperty('nodeUrl')) {
      // @ts-expect-error
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
  let config = readConfig(configDir) as CeloConfig | LegacyCeloConfig

  if (typeof config.gasCurrency === 'string') {
    config = await migrateConfig(config as LegacyCeloConfig, kit)
  }
  const modernConfig = config as CeloConfig
  const chainID = await kit.connection.chainId()

  const easyfee = modernConfig.gasCurrency ? modernConfig.gasCurrency[chainID] : undefined
  return easyfee
}

/*
  @dev it is vital that the kit passed in is already connected to the next node
*/
export async function writeConfig(
  configDir: string,
  configUpdate: CeloConfigUpdate,
  kit: ContractKit
) {
  // validate incoming configUpdate

  validateFeeConfigUpdate(configUpdate, kit)
  let previous = readConfig(configDir)

  if (typeof previous.gasCurrency === 'string') {
    previous = await migrateConfig(previous as LegacyCeloConfig, kit)
  }
  const validPrevious = previous as CeloConfig

  const chainId = await kit.connection.chainId()
  const config = updateConfigs(validPrevious, configUpdate, chainId)

  fs.outputJSONSync(configPath(configDir), config)
}

export function updateConfigs(
  last: CeloConfig,
  update: CeloConfigUpdate,
  chainId: number
): CeloConfig {
  const node = update.node ?? last.node

  if (update.gasCurrency === undefined) {
    return { ...last, node }
  }
  if (update.gasCurrency === 'CELO') {
    return { ...last, node, gasCurrency: { ...last.gasCurrency, [chainId]: undefined } }
  }
  return { ...last, node, gasCurrency: { ...last.gasCurrency, [chainId]: update.gasCurrency } }
}

async function validateFeeConfigUpdate(update: CeloConfigUpdate, kit: ContractKit) {
  const gasCurrency = update.gasCurrency
  // there is nothing todo these are both ok
  if (gasCurrency === 'CELO' || gasCurrency === undefined) {
    return true
  } else if (!isValidAddress(gasCurrency)) {
    throw new Error(`Invalid address ${gasCurrency}`)
  }

  const feeCurrencyWhitelist = await kit.contracts.getFeeCurrencyWhitelist()
  const validFeeCurrencies = await feeCurrencyWhitelist.getWhitelist()

  if (!validFeeCurrencies.includes(gasCurrency)) {
    const chainId = await kit.connection.chainId()
    const pairs = (await feeCurrencyWhitelist.getFeeCurrencyInformation(validFeeCurrencies)).map(
      ({ name, symbol, address, adaptedToken }) =>
        `${address} - ${name || 'unknown name'} (${symbol || 'N/A'})${
          adaptedToken ? ` (adapted token: ${adaptedToken})` : ''
        }`
    )
    throw new Error(
      `${
        update.gasCurrency
      } is not a valid fee currency for chain with ID ${chainId}. Available currencies:\n${pairs.join(
        '\n'
      )}`
    )
  }
  // if it gets here its a valid whitelisted fee currency
}

async function migrateConfig(legacy: LegacyCeloConfig, kit: ContractKit): Promise<CeloConfig> {
  const chainId = await kit.connection.chainId()

  const getTokenAddress = async (legacyFeeToken: LegacyCeloConfig['gasCurrency']) => {
    switch (legacyFeeToken) {
      case 'auto':
      case Token.CELO:
        return undefined
      case StableToken.cEUR:
      case StableToken.cUSD:
      case StableToken.cREAL:
        const { address } = await kit.contracts.getStableToken(legacyFeeToken as StableToken)
        return address
    }
  }

  return {
    node: legacy.node,
    gasCurrency: {
      [chainId]: await getTokenAddress(legacy.gasCurrency),
    },
  }
}
