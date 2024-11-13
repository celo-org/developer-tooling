import Eth from '@celo/hw-app-eth'
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import { SemVer } from 'semver'
import { tokenInfoByAddressAndChainId } from './tokens.js'
import { Hex } from './types.js'

export const MIN_VERSION_EIP1559 = '1.2.0'

export function transportErrorFriendlyMessage(error: any) {
  if (error.statusCode === 26368 || error.statusCode === 26628 || error.message === 'NoDevice') {
    throw new Error(
      `Possible connection lost with the ledger. Check if still on and connected. ${error.message}`
    )
  }
  throw error
}

export function meetsVersionRequirements(
  version: string | SemVer,
  { minimum, maximum }: { minimum?: SemVer | string; maximum?: SemVer | string }
) {
  const min = minimum ? new SemVer(version).compare(minimum) >= 0 : true
  const max = maximum ? new SemVer(version).compare(maximum) <= 0 : true
  return min && max
}

export async function assertCompat(ledger: Eth.default): Promise<{
  arbitraryDataEnabled: number
  version: string
}> {
  // TODO: check version only for CELO and not ETH if we wanna be eth compatible
  const appConfiguration = await ledger.getAppConfiguration()
  if (!meetsVersionRequirements(appConfiguration.version, { minimum: MIN_VERSION_EIP1559 })) {
    throw new Error(
      `Due to technical issues, we require the users to update their ledger celo-app to >= ${MIN_VERSION_EIP1559}. You can do this on ledger-live by updating the celo-app in the app catalog.`
    )
  }
  if (!appConfiguration.arbitraryDataEnabled) {
    console.warn(
      'Beware, your ledger does not allow the use of contract data. Some features may not work correctly, including token transfers. You can enable it from the ledger app settings.'
    )
  }
  return appConfiguration
}

export async function checkForKnownToken(
  ledger: Eth.default,
  { to, chainId, feeCurrency }: { to: string; chainId: number; feeCurrency?: Hex }
) {
  const tokenInfo = tokenInfoByAddressAndChainId(to, chainId)
  if (tokenInfo) {
    await ledger.provideERC20TokenInformation(`0x${tokenInfo.data.toString('hex')}`)
  }

  if (!feeCurrency || feeCurrency === '0x') return

  const feeTokenInfo = tokenInfoByAddressAndChainId(feeCurrency, chainId)
  if (feeTokenInfo) {
    await ledger.provideERC20TokenInformation(`0x${feeTokenInfo.data.toString('hex')}`)
  }
}

export async function generateLedger(transport: TransportNodeHid.default) {
  const ledger = new Eth.default(transport)
  await assertCompat(ledger)
  return ledger
}
