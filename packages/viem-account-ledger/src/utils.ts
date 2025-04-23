import Eth from '@celo/hw-app-eth'
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import { SemVer } from 'semver'
import { Address } from 'viem'
import { tokenInfoByAddressAndChainId } from './tokens.js'

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

export async function readAppName(ledger: Eth): Promise<string> {
  const response = await ledger.transport.send(0xb0, 0x01, 0x00, 0x00)
  try {
    let results = [] // (name, version)
    let i = 1
    while (i < response.length + 1) {
      const len = response[i]
      i += 1
      const bufValue = response.subarray(i, i + len)
      i += len
      results.push(bufValue.toString('ascii').trim())
    }

    return results[0]!.toLowerCase()
  } catch (err) {
    console.error('The appName couldnt be infered from the device')
    throw err
  }
}

export async function assertCompat(ledger: Eth): Promise<{
  arbitraryDataEnabled: number
  version: string
}> {
  const appConfiguration = await ledger.getAppConfiguration()
  const appName = await readAppName(ledger)
  if (appName === 'celo') {
    // only check version for Celo
    if (!meetsVersionRequirements(appConfiguration.version, { minimum: MIN_VERSION_EIP1559 })) {
      throw new Error(
        `Due to technical issues, we require the users to update their ledger celo-app to >= ${MIN_VERSION_EIP1559}. You can do this on ledger-live by updating the celo-app in the app catalog.`
      )
    }
  } else if (appName === 'ethereum') {
    console.warn(
      `Beware, you opened the Ethereum app instead of the Celo app. Some features may not work correctly, including token transfers.`
    )
  } else {
    console.error(
      `\n---\nBeware, you opened the ${appName} app instead of the Celo app. We cannot ensure the safety of using this SDK with ${appName}. USE AT YOUR OWN RISK.\n---\n`
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
  ledger: Eth,
  { to, chainId, feeCurrency }: { to: string; chainId: number; feeCurrency?: Address }
) {
  const tokenInfo = tokenInfoByAddressAndChainId(to, chainId)
  if (tokenInfo) {
    await ledger.provideERC20TokenInformation(tokenInfo.data.toString('hex'))
  }

  if (!feeCurrency || feeCurrency === '0x') return

  const feeTokenInfo = tokenInfoByAddressAndChainId(feeCurrency, chainId)
  if (feeTokenInfo) {
    await ledger.provideERC20TokenInformation(feeTokenInfo.data.toString('hex'))
  }
}

export async function generateLedger(transport: TransportNodeHid) {
  const ledger = new Eth(transport)
  await assertCompat(ledger)
  const mutex = new Mutex()

  // NOTE: this is important because ledger doesnt handle concurrent requests
  // due to a USB bus lock, so you can't use Promise.all
  // However consumers may not know this, thus we hide that behind a mutex
  // making sure there's only 1 concurrent promise at a given time
  return new Proxy(ledger, {
    get(target, propertyName, receiver) {
      const originalProperty = Reflect.get(
        target,
        propertyName,
        receiver
      ) as Eth[keyof typeof Eth.prototype]

      if (typeof originalProperty !== 'function') {
        return originalProperty
      }

      return async (...args: unknown[]) => {
        const unlock = await mutex.lock()
        // @ts-expect-error - not sure how to properly type this
        const result = await originalProperty(...args)
        await unlock()
        return result
      }
    },
  })
}

export class Mutex {
  private current: Promise<unknown> = Promise.resolve()
  lock = () => {
    let _resolve: () => Promise<void>
    const p = new Promise<void>((resolve) => {
      _resolve = async () => resolve()
    })
    // Caller gets a promise that resolves when the current outstanding
    // lock resolves
    const rv = this.current.then(() => _resolve)
    // Don't allow the next request until the new promise is done
    this.current = p
    // Return the new promise
    return rv
  }
}
